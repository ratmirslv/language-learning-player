import { createStyles } from '@mantine/core'
import React, { startTransition, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

import 'video.js/dist/video-js.css'
import { Portal } from './Portal'
import { Subtitle } from './Subtitle'

type VideoJsProps = {
	options: VideoJsPlayerOptions
	onReady?: (player: VideoJsPlayer) => void
}

const useStyles = createStyles(() => ({
	videojs: {
		'.vjs-text-track-cue': {
			display: 'none',
		},
		'.vjs-control-bar': {
			fontSize: '130%',
		},
		'video::-webkit-media-text-track-display': {
			display: 'none',
		},
	},
	subtitle: {
		p: {
			fontSize: '2.2vw',
			margin: '5px',
		},
		padding: '0 7vw',
		zIndex: 1,
		position: 'absolute',
		bottom: '15px',
		marginLeft: 'auto',
		marginRight: 'auto',
		left: 0,
		right: 0,
		textAlign: 'center',
		userSelect: 'none',
		lineHeight: '1.25',
		cursor: 'pointer',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
}))
export const VideoJS = ({ options, onReady }: VideoJsProps) => {
	const videoRef = React.useRef<HTMLDivElement | null>(null)
	const playerRef = React.useRef<VideoJsPlayer | null>(null)
	const [subtitle, setSubtitle] = useState<string>()

	const { classes } = useStyles()
	React.useEffect(() => {
		if (!playerRef.current) {
			const videoElement = document.createElement('video-js')
			videoElement.classList.add('vjs-big-play-centered', classes.videojs)
			videoRef.current?.appendChild(videoElement)
			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player)
			}))
			player.volume(0.25)
			player.textTracks().onaddtrack = (event): void => {
				const track = event.track
				if (track) {
					track.oncuechange = (): void => {
						const cue = track.activeCues![0] as VTTCue
						setSubtitle(undefined)
						if (cue) {
							startTransition(() => {
								setSubtitle(cue.text)
							})
						}
					}
				}
			}
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
						mode: 'hidden',
					},
					false,
				)
			}
		}
	}, [classes.videojs, onReady, options, videoRef])

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
			{subtitle && (
				<Portal>
					<Subtitle className={classes.subtitle} subtitle={subtitle} />
				</Portal>
			)}
		</div>
	)
}

export default VideoJS
