import { Popover, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import TranslateWordPopup from './TranslateWordPopup'

import { clearWord } from 'utils/clearWord'

interface WordProps {
	word: string
}

function Word(props: WordProps) {
	const [opened, { close, open }] = useDisclosure(false)

	return (
		<Popover
			width={200}
			position="top-start"
			opened={opened}
			offset={{ mainAxis: 0, crossAxis: 5 }}
		>
			<Popover.Target>
				<Text span size="xl" onMouseEnter={open} onMouseLeave={close}>
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
