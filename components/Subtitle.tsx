import { useRef } from 'react'
import { VideoJsPlayer } from 'video.js'

import Word from './Word'

import { getCleanSubText } from 'utils/getCleanSubText'

type SubtitleProps = {
	subtitle: string
	className: string
	player: VideoJsPlayer | null
}

function getSubWords(subtitleText: string) {
	return subtitleText
		.split(' ')
		.map((word: string, wordIndex: number) => <Word word={word} key={word + wordIndex} />)
}

export const Subtitle = ({ subtitle, className, player }: SubtitleProps) => {
	const autoPause = useRef(false)

	const cleanedText = getCleanSubText(subtitle)

	function handleOnMouseEnter() {
		if (!player?.paused()) {
			autoPause.current = true
			player?.pause()
		}
	}

	function handleOnMouseLeave() {
		if (player && autoPause.current) {
			autoPause.current = false
			player.play()
		}
	}

	return (
		<div
			onFocus={handleOnMouseEnter}
			onBlur={handleOnMouseLeave}
			onMouseEnter={handleOnMouseEnter}
			className={className}
			onMouseOver={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
			role="menuitem"
			tabIndex={0}
		>
			{getSubWords(cleanedText)}
		</div>
	)
}
