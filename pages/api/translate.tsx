import type { NextApiRequest, NextApiResponse } from 'next'
import { object, string, z } from 'zod'

import { googleTranslate } from '@/utils/googleTranslate'

export interface Translate extends NextApiRequest {
	body: z.infer<typeof translateSchemaRequest>
}

const translateSchemaRequest = object({
	text: string(),
	from: string(),
	to: string(),
})

const translateSchemaResponse = object({
	text: string(),
})

export default function handler(req: Translate, res: NextApiResponse) {
	const { text, from, to } = req.body
	if (req.method === 'POST') {
		const validBody = translateSchemaRequest.safeParse(req.body)
		if (!validBody.success) {
			return res.status(500).send({
				message: 'No valid request',
			})
		}

		return googleTranslate(from, to, text)
			.then(resp => {
				const validResponse = translateSchemaResponse.safeParse(resp)
				if (validResponse.success) {
					return res.status(200).json(resp)
				} else {
					throw new Error('No valid server response')
				}
			})
			.catch((err: unknown) => {
				if (err instanceof Error) {
					return res.status(400).send({
						message: `Request error translate word. ${err.message}`,
					})
				} else {
					return res.status(400).send({
						message: `Request error translate word. ${String(err)}`,
					})
				}
			})
	} else {
		return res.status(405).send({ message: 'Method not allowed.' })
	}
}
