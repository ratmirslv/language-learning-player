import { createStyles } from '@mantine/core'
import React, { startTransition, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

import 'videojs-hotkeys'
import 'video.js/dist/video-js.css'
import { Portal } from './Portal'
import { Subtitle } from './Subtitle'

export const videoJsDefaultOptions: VideoJsPlayerOptions = {
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
	plugins: {
		hotkeys: {
			volumeStep: 0.1,
			seekStep: 5,
			enableModifiersForNumbers: false,
			enableVolumeScroll: false,
		},
	},
}

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
			'.vjs-subs-caps-button': {
				display: 'none',
			},
			'fontSize': '125%',
			'zIndex': 5,
		},
		'video::-webkit-media-text-track-display': {
			display: 'none',
		},
	},
	subtitle: {
		padding: '0 7vw',
		zIndex: 1,
		position: 'absolute',
		bottom: '5vh',
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
			const player = (playerRef.current = videojs(
				videoElement,
				{ ...videoJsDefaultOptions, ...options },
				() => {
					onReady && onReady(player)
				},
			))
			player.volume(0.25)
			player.textTracks().onaddtrack = (event): void => {
				const track = event.track
				if (track) {
					track.oncuechange = (): void => {
						const cue = track.activeCues![0] as VTTCue
						if (cue) {
							const subtitleText = cue.getCueAsHTML()?.textContent
							startTransition(() => {
								subtitleText && setSubtitle(subtitleText)
							})
						} else setSubtitle(undefined)
					}
				}
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
	}, [playerRef, options])

	return (
		<div data-vjs-player>
			<div ref={videoRef} />
			{subtitle && (
				<Portal>
					<Subtitle
						className={classes.subtitle}
						subtitle={subtitle}
						player={playerRef.current}
					/>
				</Portal>
			)}
		</div>
	)
}

export default VideoJS
