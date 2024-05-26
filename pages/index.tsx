import { Title, Center, SimpleGrid, Container } from '@mantine/core'
import React from 'react'

import { ModalOpenMedia } from '@/components/ModalOpenMedia'
import { VideoJS } from '@/components/VideoJS'
import { usePlayerStore } from '@/stores/usePlayerStore'

export default function Media() {
	const { subtitleLanguage, video, subtitle } = usePlayerStore(state => state.content)

	return (
		<Container fluid>
			<SimpleGrid cols={1} spacing="sm">
				<ModalOpenMedia />
				{video ? (
					<VideoJS
						options={{
							sources: [{ src: video, type: 'video/mp4' }],
							tracks: subtitle
								? [
										{
											src: subtitle,
											srclang: subtitleLanguage,
											mode: 'hidden',
											kind: 'subtitles',
										},
								  ]
								: undefined,
						}}
					/>
				) : (
					<Center>
						<Title order={3}>Please choose video for play</Title>
					</Center>
				)}
			</SimpleGrid>
		</Container>
	)
}
