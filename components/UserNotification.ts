import { notifications } from '@mantine/notifications'

type UserNotification = {
	message: string
	title?: string
}

const UserNotification = {
	error({ message, title = 'Error' }: UserNotification) {
		notifications.show({
			message,
			title,
			autoClose: 10000,
			color: 'red',
		})
	},
	warning({ message, title = 'Attention' }: UserNotification) {
		notifications.show({
			message,
			title,
		})
	},
	success({ message, title = 'Error' }: UserNotification) {
		notifications.show({
			message,
			title,
			color: 'green',
		})
	},
}

export default UserNotification
