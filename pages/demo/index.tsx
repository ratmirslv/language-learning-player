import { SimpleGrid, Container, Title } from '@mantine/core'
import React from 'react'
import { VideoJsPlayerOptions } from 'video.js'

import { VideoJS } from '@/components/VideoJS'

const videoJsOptions: VideoJsPlayerOptions = {
	autoplay: false,
	controls: true,
	responsive: true,
	fluid: true,
	aspectRatio: '16:9',
	controlBar: {
		pictureInPictureToggle: false,
	},
	html5: {
		nativeTextTracks: false,
	},
}

export default function Demo() {
	return (
		<Container fluid w={900} mt={20}>
			<SimpleGrid cols={1} spacing="sm">
				<Title order={3} mx="auto">
					Subtitle translation into german
				</Title>
				<VideoJS
					options={{
						...videoJsOptions,
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
