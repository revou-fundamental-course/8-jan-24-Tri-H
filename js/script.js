const inputField = document.getElementById('input-field')
const submitButton = document.getElementById('submit-button')
const resetButton = document.getElementById('reset-button')
const tabs = document.querySelectorAll('.tab')
const alertMessage = document.querySelector('.alert-message')
const cardTitle = document.querySelector('.card-title')
const formula = document.querySelector('.formula')
const result = document.querySelector('.result')

tabs.forEach((tab) => {
	tab.addEventListener('click', handleTabClick)
})

inputField.addEventListener('input', handleInputChange)
submitButton.addEventListener('click', handleSubmitButtonClick)
resetButton.addEventListener('click', handleResetButtonClick)

function handleInputChange() {
	const inputValue = inputField.value.trim()

	if (validateInput(inputValue)) {
		enableSubmitButton()
		hideAlert()
	} else {
		disableSubmitButton()
		showAlert('Harap masukkan angka!')
	}
}

function handleSubmitButtonClick(event) {
	event.preventDefault()

	showResult()
}

function handleResetButtonClick(event) {
	event.preventDefault()

	disableSubmitButton()
	inputField.value = ''
	result.innerHTML = ''
}

function validateInput(input) {
	const integerRegex = /^-?\d+$/

	return integerRegex.test(input)
}

function showResult() {
	const sisi = inputField.value
	const persegi = new Persegi(sisi)
	const luas = persegi.hitungLuas()
	const keliling = persegi.hitungKeliling()

	const activeTab = document.querySelector('.tab-active')

	if (activeTab.dataset.tab === 'luas') {
		result.innerHTML = luas
	} else {
		result.innerHTML = keliling
	}
}

function handleTabClick(event) {
	const clickedTab = event.target

	if (clickedTab.classList.contains('tab')) {
		const tabType = clickedTab.dataset.tab

		tabs.forEach((tab) => {
			tab.classList.remove('tab-active')
		})

		clickedTab.classList.add('tab-active')

		if (tabType === 'luas') {
			formula.innerHTML = 'Luas = Sisi x Sisi'
			cardTitle.innerHTML = 'Luas Persegi'
		} else {
			formula.innerHTML = 'Keliling = 4 x Sisi'
			cardTitle.innerHTML = 'Keliling Persegi'
		}
	}
}

function enableSubmitButton() {
	submitButton.disabled = false
}

function disableSubmitButton() {
	submitButton.disabled = true
}

function showAlert(message) {
	alertMessage.classList.remove('hidden')
	alertMessage.innerHTML = message
}

function hideAlert() {
	alertMessage.classList.add('hidden')
	alertMessage.innerHTML = ''
}

class Persegi {
	constructor(sisi) {
		this.sisi = sisi
	}

	hitungLuas() {
		return this.sisi * this.sisi
	}

	hitungKeliling() {
		return 4 * this.sisi
	}
}
