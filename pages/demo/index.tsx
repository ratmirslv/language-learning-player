import { SimpleGrid, Container, Title } from '@mantine/core'
import { useEffect } from 'react'

import { VideoJS } from '@/components/VideoJS'
import { usePlayerStore } from '@/stores/usePlayerStore'

export default function Demo() {
	const { setPlayerContent } = usePlayerStore(({ setPlayerContent }) => ({
		setPlayerContent,
	}))

	useEffect(() => {
		setPlayerContent({
			userLanguage: 'de',
			subtitleLanguage: 'en',
			video: '',
			subtitle: '',
		})
	}, [setPlayerContent])

	return (
		<Container fluid w={900} mt={20}>
			<SimpleGrid cols={1} spacing="sm">
				<Title order={3} mx="auto">
					Subtitle translation into german
				</Title>
				<VideoJS
					options={{
						sources: [
							{
								src: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4',
								type: 'video/mp4',
							},
						],
						tracks: [
							{
								src: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.en.vtt',
								srclang: 'en',
								mode: 'hidden',
								kind: 'subtitles',
							},
						],
					}}
				/>
			</SimpleGrid>
		</Container>
	)
}
