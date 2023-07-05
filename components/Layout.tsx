import {
	AppShell,
	Header,
	MediaQuery,
	Burger,
	useMantineTheme,
	ActionIcon,
	useMantineColorScheme,
} from '@mantine/core'
import { IconBrandGithub, IconMoonStars, IconSun } from '@tabler/icons-react'
import { ReactNode, useState } from 'react'

import { Navbar } from '@/components/Navbar'

export function Layout({ children }: { children: ReactNode }) {
	const theme = useMantineTheme()
	const { toggleColorScheme } = useMantineColorScheme()

	const [isOpen, setIsOpen] = useState(false)
	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			navbar={<Navbar isOpen={isOpen} handleClick={setIsOpen} />}
			header={
				<Header height={{ base: 50 }} p="md">
					<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
							<Burger
								opened={isOpen}
								onClick={() => setIsOpen(!isOpen)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>
						<ActionIcon
							ml={'auto'}
							component="a"
							size="md"
							color={theme.colorScheme === 'dark' ? 'yellow' : 'blue'}
							variant="outline"
							href="https://github.com/ratmirslv/language-learning-player.git"
							target="_blank"
						>
							<IconBrandGithub stroke={1.25} />
						</ActionIcon>
						<ActionIcon
							ml={'lg'}
							variant="outline"
							color={theme.colorScheme === 'dark' ? 'yellow' : 'blue'}
							onClick={() =>
								theme.colorScheme === 'dark'
									? toggleColorScheme('light')
									: toggleColorScheme('dark')
							}
							title="Toggle color scheme"
						>
							{theme.colorScheme === 'dark' ? (
								<IconSun stroke={1.25} />
							) : (
								<IconMoonStars stroke={1.25} />
							)}
						</ActionIcon>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	)
}
