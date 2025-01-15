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
}
