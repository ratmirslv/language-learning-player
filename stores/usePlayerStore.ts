import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

export const usePlayerStore = create<PlayerStore>()(
	persist(
		(set, get) => ({
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
		}),
		{
			name: 'player-storage',
			skipHydration: true,
			partialize: (store: PlayerStore) => ({
				content: {
					userLanguage: store.content.userLanguage || 'de',
					subtitleLanguage: store.content.subtitleLanguage || 'en',
				},
			}),
			storage: createJSONStorage(() => localStorage),
		},
	),
)
