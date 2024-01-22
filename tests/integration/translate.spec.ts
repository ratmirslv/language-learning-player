import { expect, test } from '@playwright/test'

test.describe('/api/translate API Endpoint', () => {
	test('Should return No valid request if wrong request', async ({ request }) => {
		const translateResponse = await request.post('http://localhost:3000/api/translate', {
			data: {
				from: 1,
			},
		})

		const createJson = await translateResponse.json()
		expect(translateResponse.status()).toBe(500)
		expect(createJson).toStrictEqual({ message: 'No valid request' })
	})
	test('Should return correct response', async ({ request }) => {
		const translateResponse = await request.post('http://localhost:3000/api/translate', {
			data: {
				from: 'en',
				to: 'ru',
				text: 'peace',
			},
		})

		const createJson = await translateResponse.json()
		expect(translateResponse.status()).toBe(200)
		expect(createJson).toStrictEqual({ text: 'мир' })
	})
})
