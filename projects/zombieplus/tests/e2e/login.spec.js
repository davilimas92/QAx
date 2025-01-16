const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')

let login
let toast

test.beforeEach(async ({ page }) => {
	login = new LoginPage(page)
	toast = new Toast(page)
})

test('Deve fazer login como Administrador', async ({ page }) => {
	await login.visitLogin()
	await login.submit('admin@zombieplus.com', 'pwd123')
	await login.isLoggedIn()
})

test('Não deve fazer login como usuario incorreta', async ({ page }) => {
	await login.visitLogin()
	await login.submit('adminzero@zombieplus.com', 'pwd123')

	const message =
		'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
	await toast.haveText(message)
})
