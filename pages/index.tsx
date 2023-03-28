import { Title, Center, SimpleGrid, Container } from '@mantine/core'
import React, { useState } from 'react'
import { VideoJsPlayerOptions } from 'video.js'

import { VideoJS } from '@/components/VideoJS'

const videoJsOptions: VideoJsPlayerOptions = {
	autoplay: true,
	controls: true,
	responsive: true,
	fluid: true,
}
export default function Media() {
	const [srcVideo, setSrcVideo] = useState<string>()

	return (
		<Container>
			<SimpleGrid cols={1} spacing="sm">
				<Center>
					<Title order={1}>Media page</Title>
				</Center>
				<input
					type="file"
					onChange={e => {
						if (e.target.files !== null && e.target.files[0]) {
							setSrcVideo(URL.createObjectURL(e.target.files[0]))
						}
					}}
				/>
				{srcVideo && (
					<VideoJS
						options={{
							...videoJsOptions,
							sources: [{ src: srcVideo, type: 'video/mp4' }],
						}}
					/>
				)}
			</SimpleGrid>
		</Container>
	)
}
