import qs from 'qs'
import { object, string, ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export async function googleTranslate(
	source: string,
	target: string,
	text: string,
): Promise<{ text: string }> {
	const url = 'https://translate.googleapis.com/translate_a/single?'

	const params = {
		client: 'gtx',
		dt: 't',
		sl: source,
		tl: target,
		q: text,
	}

	try {
		const googleResponse = await fetch(`${url}${qs.stringify(params)}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!googleResponse.ok) {
			if (googleResponse.status === 429) {
				const memoryTranslateResponse = await myMemoryTranslate(source, target, text)
				return memoryTranslateResponse
			} else {
				throw new Error(`Request failed: ${googleResponse.url}: ${googleResponse.status}`)
			}
		}

		const GoogleTranslateSchema = z
			.tuple([
				z
					.array(
						z
							.tuple([string()])
							.rest(
								z.union([
									z.string(),
									z.null(),
									z.number(),
									z.array(z.array(z.unknown())),
									z.array(z.array(z.array(z.string()))),
								]),
							),
					)
					.nonempty(),
			])
			.rest(z.union([z.null(), z.string(), z.array(z.unknown())]))

		const googleResult = GoogleTranslateSchema.parse(await googleResponse.json())

		return { text: googleResult[0][0][0] }
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			throw new Error(fromZodError(error).message)
		}
		if (error instanceof Error) {
			throw new Error(error.message)
		} else {
			throw new Error(JSON.stringify(error, null, ' '))
		}
	}
}

const MyMemoryTranslateSchema = object({
	responseData: object({
		translatedText: string(),
	}),
})

async function myMemoryTranslate(
	source: string,
	target: string,
	text: string,
): Promise<{ text: string }> {
	const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`
	const response = await fetch(url)

	const myMemoryTranslateResult = MyMemoryTranslateSchema.parse(await response.json())

	return {
		text: myMemoryTranslateResult.responseData.translatedText,
	}
}
