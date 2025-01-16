const { expect } = require('@playwright/test')
export class LandingPage {
	constructor(page) {
		this.page = page
	}

	async visit() {
		//Entrou na aplicação
		await this.page.goto('http://localhost:3000')
	}

	async openLeadModal() {
		//Abrir o modal
		await this.page.getByRole('button', { name: /Aperte o play/ }).click()

		//Validando se é o modal correto pelo titulo
		await expect(
			this.page.getByTestId('modal').getByRole('heading')
		).toHaveText('Fila de espera')
	}

	async submitLeadFrom(name, email) {
		//Preencheu os inputs
		await this.page.locator('input[name=name]').fill(name)
		await this.page.locator('input[name=email]').fill(email)

		//Clicou no botão
		await this.page
			.getByTestId('modal')
			.getByText('Quero entrar na fila!')
			.click()
	}

	// toHaveText pode ser um texto simples ou uma lista
	async alertHaveText(target) {
		await expect(this.page.locator('.alert')).toHaveText(target)
	}
}
