import { Title, Center, SimpleGrid, Container } from '@mantine/core'
import React from 'react'
import { VideoJsPlayerOptions } from 'video.js'

import { ModalOpenMedia } from '@/components/ModalOpenMedia'
import { VideoJS } from '@/components/VideoJS'
import { usePlayerStore } from '@/stores/usePlayerStore'

const videoJsOptions: VideoJsPlayerOptions = {
	autoplay: true,
	controls: true,
	responsive: true,
	fluid: true,
	aspectRatio: '16:9',
}
export default function Media() {
	const { learningLanguage, video, subtitle } = usePlayerStore(state => state.content)

	return (
		<Container fluid>
			<SimpleGrid cols={1} spacing="sm">
				<Center>
					<Title order={1}>Media page</Title>
				</Center>
				<ModalOpenMedia />

				{video && (
					<VideoJS
						options={{
							...videoJsOptions,
							sources: [{ src: video, type: 'video/mp4' }],
							tracks: subtitle
								? [{ src: subtitle, srclang: learningLanguage, mode: 'showing' }]
								: undefined,
						}}
					/>
				)}
			</SimpleGrid>
		</Container>
	)
}
