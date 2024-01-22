import { create } from 'zustand'

interface ContentPlayer {
	video: string | null
	subtitle: string | null
	userLanguage: string
	subtitleLanguage: string
}

interface PlayerStore {
	content: ContentPlayer
	setPlayerContent: (content: ContentPlayer) => void
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
	content: {
		video: null,
		subtitle: null,
		userLanguage: '',
		subtitleLanguage: '',
	},
	setPlayerContent: content =>
		set(state => {
			const prevVideo = get().content.video
			const prevSubtitle = get().content.subtitle

			if (prevVideo) URL.revokeObjectURL(prevVideo)

			if (prevSubtitle) URL.revokeObjectURL(prevSubtitle)

			return {
				content: {
					...state.content,
					...content,
				},
			}
		}),
}))
