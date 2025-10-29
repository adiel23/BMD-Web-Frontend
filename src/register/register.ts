import { API_BASE_URL } from "../apiconfig.js";
import type { CreateUserDTO } from "./dtos.js";

const form = document.querySelector('.form');

if (form instanceof HTMLFormElement) {
    const nameInput = document.getElementById('name-input');

    const emailInput = document.getElementById('email-input');

    const passwordInput = document.getElementById('password-input');

    if (
        nameInput instanceof HTMLInputElement &&
        emailInput instanceof HTMLInputElement &&
        passwordInput instanceof HTMLInputElement
    ) {
        const registerMessageElement = document.getElementById('register-message');

        if (registerMessageElement instanceof HTMLParagraphElement) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                try {
                    const response = await registerUser(`${API_BASE_URL}/auth/register`, {name, email, password});

                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem('token', data.token);
                        let i = 3;
                        registerMessageElement.textContent = `Usuario creado. Redirecting in ${i}...`;
                        registerMessageElement.classList.add('form__message--success');
                        setInterval(() => {
                            i -= 1;
                            registerMessageElement.textContent = `Usuario creado. Redirecting in ${i}...`;
                        }, 1000)
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 3000);
                    } else {
                        registerMessageElement.textContent = data.message;
                        registerMessageElement.classList.add('form__message--error');
                    }
                } catch (error) {
                    console.error('Error during registrartion:', error);
                }
            })
        }
    } else {
        console.error('one or more inputs not found');
    }

} else {
    console.error('Form element not found');
}

async function registerUser(url: string, body: CreateUserDTO) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}