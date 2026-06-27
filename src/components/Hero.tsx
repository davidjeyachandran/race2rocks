import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import { CalendarIcon, FlameIcon } from './icons'

interface HeroProps {
    title: string
    editions: number
    firstYear?: number
    lastYear?: number
    /** Set this to the next race date (e.g. new Date('2027-01-01')) to show a countdown. */
    nextRace?: Date
}

function daysUntil(date: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24
    return Math.ceil((date.getTime() - Date.now()) / msPerDay)
}

export default function Hero(props: HeroProps) {
    const { title, editions, firstYear, lastYear, nextRace } = props
    const countdown = nextRace ? daysUntil(nextRace) : null

    return (
        <Box
            component="header"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'primary.dark',
                color: 'common.white',
                borderBottom: '1px solid',
                borderColor: 'rgba(255,255,255,0.08)',
            }}
        >
            <Box
                aria-hidden
                component="svg"
                viewBox="0 0 1200 320"
                preserveAspectRatio="xMidYMax slice"
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
                <circle cx="1000" cy="78" r="34" fill="#e57b53" opacity="0.85" />
                <path
                    d="M0,320 L0,210 L130,150 L250,196 L400,96 L560,176 L700,70 L860,158 L980,108 L1120,180 L1200,134 L1200,320 Z"
                    fill="#52646e"
                    opacity="0.55"
                />
                <path
                    d="M0,320 L0,250 L170,206 L320,244 L470,176 L640,238 L800,160 L960,232 L1100,190 L1200,232 L1200,320 Z"
                    fill="#d8572a"
                    opacity="0.45"
                />
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', py: { xs: 4, sm: 5 } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' }}
                >
                    Annual race{firstYear ? ` · est. ${firstYear}` : ''}
                </Typography>
                <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 34, sm: 44 }, lineHeight: 1.05 }}>
                    {title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    {countdown !== null && countdown >= 0 && (
                        <Chip
                            icon={<CalendarIcon />}
                            label={countdown === 0 ? 'Race day!' : `Next race in ${countdown} days`}
                            sx={{ bgcolor: 'secondary.main', color: 'common.white', fontWeight: 600, '& .MuiChip-icon': { color: 'common.white' } }}
                        />
                    )}
                    <Chip
                        icon={<FlameIcon />}
                        label={`${editions} editions${firstYear && lastYear ? ` · ${firstYear}–${lastYear}` : ''}`}
                        variant="outlined"
                        sx={{ color: 'common.white', borderColor: 'rgba(255,255,255,0.3)', '& .MuiChip-icon': { color: 'rgba(255,255,255,0.85)' } }}
                    />
                </Stack>
            </Container>
        </Box>
    )
}
