// @ts-check
const { test } = require('@playwright/test')
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
	landingPage = new LandingPage(page)
	toast = new Toast(page)
})

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
	await landingPage.visit()
	await landingPage.openLeadModal()
	await landingPage.submitLeadFrom('Davi limas', 'daviharu@gmail.com')

	const message =
		'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
	await toast.haveText(message)
})

test('Não deve cadastrar com email incorreto', async ({ page }) => {
	await landingPage.visit()
	await landingPage.openLeadModal()
	await landingPage.submitLeadFrom('Davi limas', 'daviharu.com.br')
	await landingPage.alertHaveText('Email incorreto')
})

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
	await landingPage.visit()
	await landingPage.openLeadModal()
	await landingPage.submitLeadFrom('', 'daviharu@gmail.com')
	await landingPage.alertHaveText('Campo obrigatório')
})

test('Não deve cadastrar quando o Email não é preenchido', async ({ page }) => {
	await landingPage.visit()
	await landingPage.openLeadModal()
	await landingPage.submitLeadFrom('Davi limas', '')
	await landingPage.alertHaveText('Campo obrigatório')
})

test('Não deve cadastrar quando nem um campo é preenchido', async ({
	page,
}) => {
	await landingPage.visit()
	await landingPage.openLeadModal()
	await landingPage.submitLeadFrom('', '')
	await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
