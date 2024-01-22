export const getCleanSubText = (text: string): string =>
	text
		.replace(/<\d+:\d+:\d+.\d+><c>/g, '')
		.replace(/<\/c>/g, '')
		.replace(/(\r\n|\n|\r)/gm, ' ')
		.replace(/\\n/g, ' ')
