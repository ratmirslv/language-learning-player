import { Modal, Group, Button, SimpleGrid, FileInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import { usePlayerStore } from '@/stores/usePlayerStore'

const languages = [
	{ value: 'English', label: '🇺🇸 English' },
	{ value: 'Russian', label: '🇷🇺 Russian' },
]

export function ModalOpenMedia() {
	const [opened, { open, close }] = useDisclosure(false)
	const { content, setPlayerContent } = usePlayerStore(state => state)

	interface ContentPlayerForm {
		video: Blob | null
		subtitle: Blob | null
		userLanguage: string
		learningLanguage: string
	}

	const form = useForm<ContentPlayerForm>({
		initialValues: {
			video: null,
			subtitle: null,
			userLanguage: content.userLanguage,
			learningLanguage: content.learningLanguage,
		},
		validate: {
			video: value => (value ? null : 'You should choose video'),
			userLanguage: value => (value ? null : 'You should choose your language'),
			learningLanguage: value => (value ? null : 'You should choose learning language'),
		},
	})

	return (
		<>
			<Modal opened={opened} onClose={close} title="Open media" centered>
				<form
					onSubmit={form.onSubmit(() => {
						setPlayerContent({
							...form.values,
							video: form.values.video ? URL.createObjectURL(form.values.video) : null,
							subtitle: form.values.subtitle
								? URL.createObjectURL(form.values.subtitle)
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
							accept="text/vtt"
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
							label="Select learning language"
							placeholder="Learning language"
							data={languages}
							name="learningLanguage"
							variant="filled"
							required
							{...form.getInputProps('learningLanguage')}
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
