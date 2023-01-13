import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

import { Layout } from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: 'Roboto, sans-serif',
			}}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MantineProvider>
	)
}
