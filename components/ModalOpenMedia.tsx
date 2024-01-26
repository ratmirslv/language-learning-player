import { Modal, Group, Button, SimpleGrid, FileInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import { usePlayerStore } from '@/stores/usePlayerStore'
import { convertToVTT } from '@/utils/convertToVTT'

const languages = [
	{ value: 'en', label: '🇺🇸 English' },
	{ value: 'ru', label: '🇷🇺 Russian' },
]

export function ModalOpenMedia() {
	const [opened, { open, close }] = useDisclosure(false)
	const { content, setPlayerContent } = usePlayerStore(state => state)

	interface ContentPlayerForm {
		video: Blob | null
		subtitle: Blob | null
		userLanguage: string
		subtitleLanguage: string
	}

	const form = useForm<ContentPlayerForm>({
		initialValues: {
			video: null,
			subtitle: null,
			userLanguage: content.userLanguage,
			subtitleLanguage: content.subtitleLanguage,
		},
		validate: {
			video: value => (value ? null : 'You should choose video'),
			userLanguage: value => (value ? null : 'You should choose your language'),
			subtitleLanguage: value => (value ? null : 'You should choose subtitle language'),
		},
	})

	return (
		<>
			<Modal opened={opened} onClose={close} title="Open media" centered>
				<form
					onSubmit={form.onSubmit(async () => {
						setPlayerContent({
							...form.values,
							video: form.values.video ? URL.createObjectURL(form.values.video) : null,
							subtitle: form.values.subtitle
								? await convertToVTT(form.values.subtitle)
								: null,
						})
						close()
					})}
				>
					<SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
						<FileInput
							label="Video"
							placeholder="Your video"
							name="video"
							variant="filled"
							required
							clearable
							accept="video/mp4,video/webm"
							{...form.getInputProps('video')}
						/>
						<FileInput
							label="Subtitle"
							placeholder="Your subtitle"
							name="subtitle"
							variant="filled"
							clearable
							accept=".srt,text/vtt"
							{...form.getInputProps('subtitle')}
						/>
					</SimpleGrid>
					<SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
						<Select
							label="Select your language"
							placeholder="Your language"
							data={languages}
							name="userLanguage"
							variant="filled"
							required
							{...form.getInputProps('userLanguage')}
						/>
						<Select
							label="Select subtitle language"
							placeholder="Subtitle language"
							data={languages}
							name="subtitleLanguage"
							variant="filled"
							required
							{...form.getInputProps('subtitleLanguage')}
						/>
					</SimpleGrid>
					<Group position="center" mt="xl">
						<Button type="submit" size="md">
							Play video
						</Button>
					</Group>
				</form>
			</Modal>
			<Group position="center">
				<Button onClick={open}>Open video</Button>
			</Group>
		</>
	)
}
