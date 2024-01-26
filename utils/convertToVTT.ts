import toWebVTT from 'srt-webvtt'

import UserNotification from '@/components/UserNotification'

export async function convertToVTT(subtitle: Blob): Promise<string | null> {
	try {
		const subtitleExtension = subtitle.name.substring(subtitle.name.lastIndexOf('.') + 1)

		return subtitleExtension === 'srt'
			? await toWebVTT(subtitle)
			: URL.createObjectURL(subtitle)
	} catch (err: unknown) {
		if (err instanceof Error) {
			UserNotification.error({
				title: 'Subtitle conversion error',
				message: err.message,
			})
		} else {
			UserNotification.error({
				title: 'Subtitle conversion error',
				message: JSON.stringify(err, null, ' '),
			})
		}
	}
	return null
}
