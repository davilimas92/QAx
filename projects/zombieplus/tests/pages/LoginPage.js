const { expect } = require('@playwright/test')
export class LoginPage {
	constructor(page) {
		this.page = page
	}

	async visitLogin() {
		//Entrar como admin
		await this.page.goto('http://localhost:3000/admin/login')
	}
	async loginForm() {
		//Garanti que estamos na pagina certa
		const loginForm = this.page.locator('.login-from')
		await expect(loginForm).toBeVisible()
	}

	async submit(email, senha) {
		await this.page.getByPlaceholder('E-mail').fill(email)
		await this.page.getByPlaceholder('Senha').fill(senha)

		await this.page.getByRole('button', { name: /Entrar/ }).click()
	}

	async isLoggedIn() {
		//Espera a pagina carregar para depois fazer a validação na URL
		await this.page.waitForLoadState('networkidle')
		//Vereficando se a URL esta correta e logado como admin fazendo uma expreção regular
		await expect(this.page).toHaveURL(/.*admin/)
	}
}
