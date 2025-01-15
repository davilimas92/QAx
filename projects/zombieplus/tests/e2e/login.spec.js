// @ts-check
const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')

let login

test.beforeEach(async ({ page }) => {
	login = new LoginPage(page)
})

test('Deve fazer login como Administrador', async ({ page }) => {
	await login.visitLogin()
	await login.submit('admin@zombieplus.com', 'pwd123')
})
