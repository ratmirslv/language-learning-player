import { Text, createStyles } from '@mantine/core'
import { useEffect, useState } from 'react'

import UserNotification from 'components/UserNotification'
import { usePlayerStore } from 'stores/usePlayerStore'

interface TranslateWordPopupProps {
	word: string
}
const useStyles = createStyles(theme => {
	return {
		translatedWorld: {
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			p: {
				fontSize: '1.1rem;',
			},
		},
	}
})
function TranslateWordPopup(props: TranslateWordPopupProps) {
	const [translatedWorld, setTranslatedWorld] = useState<null | string>(null)

	const { classes } = useStyles()
	const { subtitleLanguage, userLanguage } = usePlayerStore(state => state.content)
	useEffect(() => {
		const abortController = new AbortController()
		fetch('/api/translate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			signal: abortController.signal,
			body: JSON.stringify({
				text: props.word,
				from: subtitleLanguage,
				to: userLanguage,
			}),
		})
			.then(response => {
				return response.json().then(json => {
					return response.ok ? json : Promise.reject(json)
				})
			})
			.then(response => {
				setTranslatedWorld(response.text)
			})
			.catch((err: unknown) => {
				if (err instanceof Error) {
					if (err.name === 'AbortError') return
					UserNotification.error({ message: err.message })
				} else {
					UserNotification.error({ message: JSON.stringify(err, null, ' ') })
				}
			})

		return () => {
			abortController.abort()
		}
	}, [subtitleLanguage, props.word, userLanguage])

	return (
		<Text className={classes.translatedWorld}>
			<p>{translatedWorld ?? 'Loading...'}</p>
		</Text>
	)
}

export default TranslateWordPopup
