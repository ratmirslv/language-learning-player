import React from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'

type VideoJsProps = {
	options: VideoJsPlayerOptions
	onReady?: (player: VideoJsPlayer) => null
}
export const VideoJS = ({ options, onReady }: VideoJsProps) => {
	const videoRef = React.useRef<HTMLDivElement | null>(null)
	const playerRef = React.useRef<VideoJsPlayer | null>(null)

	React.useEffect(() => {
		if (!playerRef.current) {
			const videoElement = document.createElement('video-js')
			videoElement.classList.add('vjs-big-play-centered')
			videoRef.current?.appendChild(videoElement)
			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player)
			}))
			player.volume(0.25)
		} else {
			const player = playerRef.current

			if (options.autoplay) {
				player.autoplay(options.autoplay)
			}
			if (options.sources) {
				player.src(options.sources)
			}
			player.removeRemoteTextTrack
			if (options.tracks) {
				player.addRemoteTextTrack(
					{
						src: options.tracks[0]?.src,
						srclang: options.tracks[0]?.srclang,
						mode: 'showing',
					},
					false,
				)
			}
		}
	}, [onReady, options, videoRef])

	React.useEffect(() => {
		const player = playerRef.current
		return () => {
			if (player && !player.isDisposed()) {
				player.dispose()
				playerRef.current = null
			}
		}
	}, [playerRef])

	return (
		<div data-vjs-player>
			<div ref={videoRef} />
		</div>
	)
}

export default VideoJS
