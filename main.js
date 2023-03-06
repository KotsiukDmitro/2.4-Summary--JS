document.addEventListener('DOMContentLoaded', function () {
    rangeSlider()
    document.getElementById('submit').addEventListener('click', function (event) {
        event.preventDefault()
        onSubmit()
    })
})
function rangeSlider() {
    document.getElementById('fillRangeValue').innerHTML = document.getElementById('rangeValue').value;
}
// Валидация
class ValidateForm {

    static isEmpty(value) {
        return value == ''
    }
    static isEmailValid(value) {
        const PATTERN_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return PATTERN_EMAIL.test(value)
    }
    static isPasswordSecure(value) {
        return value.length >= 5
    }
    static checkConfirmPassword(value, confirmValue) {
        return value === confirmValue
    }
}
const errorMesseges = {
    firstNameInvalid: 'Поле не может быть пустым',
    emailInvalid: 'Поле не заполнено либо заполнено не верно',
    passwordInvalid: 'Поле не может быть пустым и должно содержать не менее 5 символов',
    confirmPasswordInvslid: 'Подтвертите пароль'
}

function onSubmit() {
    reset()
    let isValid = true
    const firstName = document.getElementById('fName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('cPassword').value

    if (ValidateForm.isEmpty(firstName)) {
        showValidationError('#fName', errorMesseges.firstNameInvalid)
        isValid = false
    }

    if (ValidateForm.isEmpty(email) || !ValidateForm.isEmailValid(email)) {
        showValidationError('#email', errorMesseges.emailInvalid)
        isValid = false
    }

    if (ValidateForm.isEmpty(password) || !ValidateForm.isPasswordSecure(password)) {
        showValidationError('#password', errorMesseges.passwordInvalid)
        isValid = false
    }
    if (!ValidateForm.checkConfirmPassword(password, confirmPassword)) {
        showValidationError('#cPassword', errorMesseges.confirmPasswordInvslid)
        isValid = false
    }

    if (isValid) {
        alert('Данные успешно отправленны !')
    }

}
function reset() {
    document.querySelectorAll('#formId input').forEach((elem) => {
        elem.classList.remove('invalid')
    })
    document.querySelectorAll('#formId .text-error').forEach((text) => {
        text.innerText = ''
    })
}
function showValidationError(id, text) {
    const elem = document.querySelector(id)
    elem.classList.add('invalid')
    const textError = document.querySelector(id + '~.text-error')
    textError.classList.add('text-error', 'show')
    textError.innerText = text
}





