import { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from '@mui/material'
import { podium } from '../stats'
import { TrophyIcon } from './icons'

interface PodiumProps {
    data: RunDataType[]
    year: number
    onSelectRunner?: (name: string) => void
}

const PLACE_STYLES = [
    { medal: '#e6a817', tint: 'rgba(230, 168, 23, 0.12)', label: '1' },
    { medal: '#9aa5ab', tint: 'rgba(154, 165, 171, 0.14)', label: '2' },
    { medal: '#cd7f44', tint: 'rgba(205, 127, 68, 0.14)', label: '3' },
]

export default function Podium({ data, year, onSelectRunner }: PodiumProps) {
    const [open, setOpen] = useState(false)
    const top = podium(data, year)
    if (top.length === 0) return null

    const winner = top[0]

    function handleSelect(name: string) {
        setOpen(false)
        onSelectRunner?.(name)
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                fullWidth
                variant="outlined"
                startIcon={
                    <Box
                        sx={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            bgcolor: PLACE_STYLES[0].medal,
                            color: 'common.white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TrophyIcon sx={{ fontSize: 16 }} />
                    </Box>
                }
                sx={{
                    justifyContent: 'space-between',
                    textTransform: 'none',
                    py: 1,
                    px: 1.5,
                    borderColor: 'divider',
                    color: 'text.primary',
                }}
            >
                <Box sx={{ flex: 1, textAlign: 'left', ml: 0.5 }}>
                    <Typography component="span" sx={{ fontWeight: 700 }}>
                        Podium · {year}
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                        {winner.name} · {winner.time}
                    </Typography>
                </Box>
                <Typography component="span" variant="caption" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                    View
                </Typography>
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ pr: 6 }}>
                    Podium · {year}
                    <IconButton
                        aria-label="Close"
                        onClick={() => setOpen(false)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                            ×
                        </Box>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: `repeat(${top.length}, 1fr)` },
                            gap: 1.5,
                            alignItems: 'stretch',
                        }}
                    >
                        {top.map((row, index) => {
                            const style = PLACE_STYLES[index]
                            const isWinner = index === 0
                            return (
                                <Paper
                                    key={row.name + row.time}
                                    variant="outlined"
                                    onClick={onSelectRunner ? () => handleSelect(row.name) : undefined}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        bgcolor: style.tint,
                                        borderColor: isWinner ? 'secondary.main' : 'divider',
                                        borderWidth: isWinner ? 2 : 1,
                                        cursor: onSelectRunner ? 'pointer' : 'default',
                                        transition: 'transform 0.12s ease',
                                        '&:hover': onSelectRunner ? { transform: 'translateY(-2px)' } : undefined,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: '50%',
                                            bgcolor: style.medal,
                                            color: 'common.white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            mx: 'auto',
                                            mb: 1,
                                        }}
                                    >
                                        {isWinner ? <TrophyIcon fontSize="small" /> : style.label}
                                    </Box>
                                    <Typography sx={{ fontWeight: 700 }}>{row.name}</Typography>
                                    <Typography sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.secondary' }}>
                                        {row.time}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {row.category}
                                        {isWinner ? ' · winner' : ''}
                                    </Typography>
                                </Paper>
                            )
                        })}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
