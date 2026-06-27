import { SvgIcon, SvgIconProps } from '@mui/material'

// Small inline icon set so we avoid pulling in @mui/icons-material.

export function TrophyIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M18 2H6v2H2v3a4 4 0 0 0 4 4h.34A6 6 0 0 0 11 15.91V18H7v2h10v-2h-4v-2.09A6 6 0 0 0 17.66 11H18a4 4 0 0 0 4-4V4h-4V2zM6 9a2 2 0 0 1-2-2V6h2v3zm14-2a2 2 0 0 1-2 2V6h2v1z" />
        </SvgIcon>
    )
}

export function CalendarIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 7v10H5V9h14z" />
        </SvgIcon>
    )
}

export function FlameIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c0-.7-.2-1.3-.4-1.9C16 8.5 18 11 18 14a6 6 0 0 1-12 0c0-4 3-6 4-9 .7-1.8 1.5-2.4 2-3z" />
        </SvgIcon>
    )
}

export function StopwatchIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M9 1h6v2H9V1zm3 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm1 5v4.6l3 1.8-.8 1.3L11 15V10h2z" />
        </SvgIcon>
    )
}

export function UsersIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3 0-8 1.5-8 4.5V20h9v-2.5c0-1.3.5-2.5 1.4-3.4A11 11 0 0 0 8 13zm8 0c-.5 0-1 0-1.6.1A5.7 5.7 0 0 1 17 17.5V20h7v-2.5c0-3-5-4.5-8-4.5z" />
        </SvgIcon>
    )
}

export function SearchIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
        </SvgIcon>
    )
}

export function MedalIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M12 2 8 8h8l-4-6zm0 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 2.5 1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3L12 10.5z" />
        </SvgIcon>
    )
}
