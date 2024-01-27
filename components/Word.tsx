import { Popover, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRef } from 'react'

import TranslateWordPopup from './TranslateWordPopup'

import useDebounce from '@/hooks/useDebounce'
import { clearWord } from 'utils/clearWord'

interface WordProps {
	word: string
}

function Word(props: WordProps) {
	const [opened, { close, open }] = useDisclosure(false)
	const wordRef = useRef<HTMLDivElement>(null)
	const debouncedOpen = useDebounce(opened, 400)

	const handleMouseEnter = () => {
		if (wordRef.current) {
			wordRef.current.style.color = '#359dff'
		}
		open()
	}

	const handleMouseLeave = () => {
		if (wordRef.current) {
			wordRef.current.style.color = '#ffffff'
		}
		close()
	}

	return (
		<Popover
			width={200}
			position="top-start"
			opened={opened ? debouncedOpen : false}
			offset={{ mainAxis: 0, crossAxis: 5 }}
		>
			<Popover.Target>
				<Text
					span
					size="xl"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					ref={wordRef}
				>
					{`${props.word} `}
					<Popover.Dropdown>
						<TranslateWordPopup word={clearWord(props.word)} />
					</Popover.Dropdown>
				</Text>
			</Popover.Target>
		</Popover>
	)
}

export default Word
