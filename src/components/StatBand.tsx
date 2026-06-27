import { Box, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react'
import {
    appearanceCounts,
    biggestField,
    fastestEver,
    uniqueRunnerCount,
} from '../stats'
import { StopwatchIcon, UsersIcon, FlameIcon, TrophyIcon } from './icons'

interface StatBandProps {
    data: RunDataType[]
}

interface StatCardProps {
    icon: ReactNode
    label: string
    value: string
    hint?: string
}

function StatCard({ icon, label, value, hint }: StatCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                flex: '1 1 140px',
                minWidth: 140,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                <Box sx={{ display: 'flex', color: 'secondary.main' }}>{icon}</Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {value}
            </Typography>
            {hint && (
                <Typography variant="caption" color="text.secondary">
                    {hint}
                </Typography>
            )}
        </Paper>
    )
}

export default function StatBand({ data }: StatBandProps) {
    if (data.length === 0) return null

    const fastest = fastestEver(data)
    const mostLoyal = appearanceCounts(data)[0]
    const biggest = biggestField(data)

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {fastest && (
                <StatCard
                    icon={<StopwatchIcon fontSize="small" />}
                    label="Course record"
                    value={fastest.time}
                    hint={`${fastest.name} · ${fastest.year}`}
                />
            )}
            <StatCard
                icon={<UsersIcon fontSize="small" />}
                label="Total finishers"
                value={String(data.length)}
                hint={`${uniqueRunnerCount(data)} unique runners`}
            />
            {mostLoyal && (
                <StatCard
                    icon={<FlameIcon fontSize="small" />}
                    label="Most loyal"
                    value={`${mostLoyal.count}×`}
                    hint={mostLoyal.name}
                />
            )}
            {biggest && (
                <StatCard
                    icon={<TrophyIcon fontSize="small" />}
                    label="Biggest field"
                    value={String(biggest.count)}
                    hint={String(biggest.year)}
                />
            )}
        </Box>
    )
}
