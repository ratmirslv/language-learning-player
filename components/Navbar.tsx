import { createStyles, Navbar as NavbarMantine, Group, Code, Text } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { IconPlayerPlay, IconSettings, IconBook2 } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

import packageJson from '@/package.json'

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon')
	return {
		logo: {
			paddingBottom: theme.spacing.md,
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
			}`,
		},
		navbar: {
			width: '200px',
		},

		link: {
			...theme.fn.focusStyles(),
			'display': 'flex',
			'alignItems': 'center',
			'textDecoration': 'none',
			'fontSize': theme.fontSizes.sm,
			'color': theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
			'padding': `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			'borderRadius': theme.radius.sm,
			'fontWeight': 500,
			'&:hover': {
				backgroundColor:
					theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,
				[`& .${icon}`]: {
					color: theme.colorScheme === 'dark' ? theme.white : theme.black,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
					.background,
				color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
				[`& .${icon}`]: {
					color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
				},
			},
		},
	}
})

const navbarLinks = [
	{ link: '/', label: 'Media', icon: IconPlayerPlay },
	{ link: '/vocabulary', label: 'Vocabulary', icon: IconBook2 },
	{ link: '/settings', label: 'Settings', icon: IconSettings },
]
type NavbarProps = {
	isOpen: boolean
	handleClick: (value: boolean) => void
}
export function Navbar({ isOpen, handleClick }: NavbarProps) {
	const { classes, cx } = useStyles()
	const ref = useClickOutside<HTMLDivElement>(() => handleClick(false))
	const router = useRouter()
	const links = navbarLinks.map(item => (
		<Link href={item.link} key={item.link} legacyBehavior>
			<a
				className={cx(classes.link, {
					[classes.linkActive]: item.link === router.pathname,
				})}
				href={item.link}
				key={item.label}
				onClick={() => handleClick(false)}
			>
				<item.icon className={classes.linkIcon} stroke={1.5} />
				<span>{item.label}</span>
			</a>
		</Link>
	))

	return (
		<NavbarMantine
			height={700}
			width={{ sm: 200 }}
			hidden={!isOpen}
			hiddenBreakpoint="sm"
			className={classes.navbar}
			ref={ref}
		>
			<NavbarMantine.Section grow>
				<Group className={classes.logo}>
					<Text px={5}>Language learning player</Text>
					<Code sx={{ fontWeight: 500 }} px={5}>
						v{packageJson.version}
					</Code>
				</Group>
				{links}
			</NavbarMantine.Section>
		</NavbarMantine>
	)
}
