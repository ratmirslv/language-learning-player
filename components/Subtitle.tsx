import { Popover, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRef } from 'react'
import { VideoJsPlayer } from 'video.js'

import TranslateWordPopup from './TranslateWordPopup'
import Word from './Word'

import { clearWord } from '@/utils/clearWord'
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
	const [opened, { close, open }] = useDisclosure(false)
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
			if (opened) {
				close()
			}
		}
	}
	function handleClick() {
		open()
	}

	return (
		<Popover
			position="top"
			withArrow
			shadow="md"
			opened={opened}
			offset={{ mainAxis: 0, crossAxis: 5 }}
			clickOutsideEvents={['mouseup', 'touchend']}
		>
			<Popover.Target>
				<Text
					onFocus={handleOnMouseEnter}
					onBlur={handleOnMouseLeave}
					onMouseEnter={handleOnMouseEnter}
					className={className}
					onMouseOver={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
					role="menuitem"
					tabIndex={0}
					onClick={handleClick}
				>
					{getSubWords(cleanedText)}
					<Popover.Dropdown py={0} px={10}>
						<TranslateWordPopup word={clearWord(cleanedText)} />
					</Popover.Dropdown>
				</Text>
			</Popover.Target>
		</Popover>
	)
}
