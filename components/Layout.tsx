import {
	AppShell,
	Header,
	Footer,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
} from '@mantine/core'
import { ReactNode, useState } from 'react'

import { Navbar } from '@/components/Navbar'

export function Layout({ children }: { children: ReactNode }) {
	const theme = useMantineTheme()
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
			footer={
				<Footer height={50} p="md">
					Application footer
				</Footer>
			}
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
						<Text>Application header</Text>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	)
}
