import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import ChartLine from './ChartLine'
import { runnerProfile } from '../stats'
import { MedalIcon } from './icons'

interface RunnerProfileProps {
    data: RunDataType[]
    name: string | null
    onClose: () => void
}

function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? '')
        .join('')
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>
                {value}
            </Typography>
            {hint && (
                <Typography variant="caption" color="text.secondary">
                    {hint}
                </Typography>
            )}
        </Box>
    )
}

export default function RunnerProfile({ data, name, onClose }: RunnerProfileProps) {
    const profile = name ? runnerProfile(data, name) : null

    return (
        <Dialog open={Boolean(name)} onClose={onClose} maxWidth="sm" fullWidth>
            {profile && (
                <>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 6 }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                color: 'common.white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {initials(profile.name)}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" noWrap>
                                {profile.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {profile.years[0].year}–{profile.years[profile.years.length - 1].year}
                            </Typography>
                        </Box>
                        <Chip
                            icon={<MedalIcon />}
                            label={`${profile.appearances}× finisher`}
                            color="secondary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                        <IconButton
                            aria-label="Close"
                            onClick={onClose}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                                ×
                            </Box>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack direction="row" spacing={3} sx={{ mb: 2, flexWrap: 'wrap', gap: 2 }}>
                            <Metric label="Personal best" value={profile.personalBest.time} hint={String(profile.personalBest.year)} />
                            <Metric
                                label="Best finish"
                                value={`${profile.bestFinish.placeOverall}${ordinal(profile.bestFinish.placeOverall)}`}
                                hint={`of ${profile.bestFinish.fieldOverall} · ${profile.bestFinish.year}`}
                            />
                            <Metric label="Editions run" value={String(profile.appearances)} />
                        </Stack>

                        {profile.years.length > 1 && (
                            <Box sx={{ mb: 2 }}>
                                <ChartLine filteredData={profile.years.map(toRunData.bind(null, profile.name))} />
                            </Box>
                        )}

                        <Divider sx={{ mb: 1 }} />
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>Time</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>Overall</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>Category</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profile.years.map(run => (
                                    <TableRow key={run.year}>
                                        <TableCell>{run.year}</TableCell>
                                        <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>{run.time}</TableCell>
                                        <TableCell align="right">
                                            {run.placeOverall} / {run.fieldOverall}
                                        </TableCell>
                                        <TableCell align="right">
                                            {run.placeInCategory} / {run.fieldInCategory}{' '}
                                            <Typography component="span" variant="caption" color="text.secondary">
                                                {run.category}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </>
            )}
        </Dialog>
    )
}

function ordinal(n: number): string {
    const mod100 = n % 100
    if (mod100 >= 11 && mod100 <= 13) return 'th'
    switch (n % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

function toRunData(name: string, run: { year: number; time: string; category: string }): RunDataType {
    return { name, year: run.year, time: run.time, category: run.category }
}
