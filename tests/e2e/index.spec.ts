import path from 'path'

import { test, expect } from '@playwright/test'

test.describe('Main page, open video', () => {
	test('Should open video and show translated word', async ({ page }) => {
		await page.route('http://localhost:3000/api/translate', route =>
			route.fulfill({
				status: 200,
				body: JSON.stringify({ text: 'год' }),
			}),
		)

		await page.goto('http://localhost:3000/')

		//open modal
		await page.getByRole('button', { name: 'Open video' }).click()

		//open subtitle
		const subtitleFileChooserPromise = page.waitForEvent('filechooser')
		await page.getByLabel('Subtitle', { exact: true }).click()
		const subtitleFileChooser = await subtitleFileChooserPromise
		await subtitleFileChooser.setFiles(path.join(__dirname, '../mocks/sample_video.vtt'))

		//check required params
		await page.getByRole('button', { name: 'Play video' }).click()
		await expect(page.getByText('You should choose video')).toBeVisible()
		await expect(page.getByText('You should choose your language')).toBeVisible()
		await expect(page.getByText('You should choose subtitle language')).toBeVisible()

		//open video
		const videoFileChooserPromise = page.waitForEvent('filechooser')
		await page.getByLabel('Video').click()
		const videoFileChooser = await videoFileChooserPromise
		await videoFileChooser.setFiles(path.join(__dirname, '../mocks/sample_video.mp4'))

		//select languages
		await page.getByPlaceholder('Your language').click()
		await page.getByRole('option', { name: '🇷🇺 Russian' }).click()
		await page.getByPlaceholder('Subtitle language').click()
		await page.getByRole('option', { name: '🇺🇸 English' }).click()

		//open video
		await page.getByRole('button', { name: 'Play video' }).click()
		await expect(page.getByText('You should choose video')).not.toBeVisible()
		await expect(page.getByText('You should choose your language')).not.toBeVisible()
		await expect(page.getByText('You should choose subtitle language')).not.toBeVisible()
		await expect(page.getByLabel('Video Player', { exact: true })).toBeVisible()
		await page.waitForTimeout(200)

		//play video
		await page.getByRole('button', { name: 'Play Video' }).click()

		//hover subtitle
		await expect(page.getByText('year')).toBeVisible()
		await page.getByText('year').hover()

		//pause
		await expect(page.locator('video')).toHaveJSProperty('paused', true)

		//show translate
		await expect(page.getByText('год')).toBeVisible()

		//move mouse
		await page.mouse.move(0, 0)
		await expect(page.getByText('год')).not.toBeVisible()
		await expect(page.locator('video')).toHaveJSProperty('paused', false)
	})

	test('Should show error notification when bad response', async ({ page }) => {
		await page.route('http://localhost:3000/api/translate', route =>
			route.fulfill({
				status: 401,
				contentType: 'text/plain',
				body: JSON.stringify({ message: 'Response error message' }),
			}),
		)

		await page.goto('http://localhost:3000/')

		//open modal
		await page.getByRole('button', { name: 'Open video' }).click()

		//open subtitle
		const subtitleFileChooserPromise = page.waitForEvent('filechooser')
		await page.getByLabel('Subtitle', { exact: true }).click()
		const subtitleFileChooser = await subtitleFileChooserPromise
		await subtitleFileChooser.setFiles(path.join(__dirname, '../mocks/sample_video.vtt'))

		//check required params
		await page.getByRole('button', { name: 'Play video' }).click()
		await expect(page.getByText('You should choose video')).toBeVisible()
		await expect(page.getByText('You should choose your language')).toBeVisible()
		await expect(page.getByText('You should choose subtitle language')).toBeVisible()

		//open video
		const videoFileChooserPromise = page.waitForEvent('filechooser')
		await page.getByLabel('Video').click()
		const videoFileChooser = await videoFileChooserPromise
		await videoFileChooser.setFiles(path.join(__dirname, '../mocks/sample_video.mp4'))

		//select languages
		await page.getByPlaceholder('Your language').click()
		await page.getByRole('option', { name: '🇷🇺 Russian' }).click()
		await page.getByPlaceholder('Subtitle language').click()
		await page.getByRole('option', { name: '🇺🇸 English' }).click()

		//open video
		await page.getByRole('button', { name: 'Play video' }).click()
		await expect(page.getByText('You should choose video')).not.toBeVisible()
		await expect(page.getByText('You should choose your language')).not.toBeVisible()
		await expect(page.getByText('You should choose subtitle language')).not.toBeVisible()
		await expect(page.getByLabel('Video Player', { exact: true })).toBeVisible()
		await page.waitForTimeout(200)

		//play video
		await page.getByRole('button', { name: 'Play Video' }).click()

		//hover subtitle
		await expect(page.getByText('year')).toBeVisible()
		await page.getByText('year').hover()

		//pause
		await expect(page.locator('video')).toHaveJSProperty('paused', true)

		//show error
		await expect(page.getByText('Response error message')).toBeVisible()
	})
})