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

// Drop the group photo in at public/banner.jpg to use it as the banner background.
const BANNER_IMAGE = `${process.env.PUBLIC_URL}/banner.jpg`

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
            {/* Blurred photo: protects the privacy of everyone in shot while keeping the energy. */}
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${BANNER_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 35%',
                    filter: 'blur(2.5px) saturate(1.08)',
                    transform: 'scale(1.06)',
                }}
            />
            {/* Darkening gradient: lifts text contrast and deepens the privacy blur. */}
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(90deg, rgba(20,28,33,0.82) 0%, rgba(20,28,33,0.45) 45%, rgba(20,28,33,0.15) 100%)',
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', py: { xs: 5, sm: 7 } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em' }}
                >
                    Annual race{firstYear ? ` · est. ${firstYear}` : ''}
                </Typography>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ fontSize: { xs: 34, sm: 44 }, lineHeight: 1.05, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
                >
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
                        sx={{ color: 'common.white', borderColor: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(2px)', '& .MuiChip-icon': { color: 'rgba(255,255,255,0.85)' } }}
                    />
                </Stack>
            </Container>
        </Box>
    )
}
