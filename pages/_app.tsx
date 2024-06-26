import '@/styles/globals.css'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { Layout } from '@/components/Layout'
import { usePlayerStore } from '@/stores/usePlayerStore'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		usePlayerStore.persist.rehydrate()
	}, [])

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true,
	})

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					fontFamily: 'Roboto, sans-serif',
					colorScheme,
				}}
			>
				<Notifications />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
