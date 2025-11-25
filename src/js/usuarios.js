// Funciones relacionadas con usuarios

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginUser(email, password)
        .then(data => {
            if (data.error) {
                showError(data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(data.user));
                showSuccess('Login exitoso');
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                updateNavbarForLoggedUser(data.user);
            }
        })
        .catch(error => {
            console.error('Error en login:', error);
            showError('Error al iniciar sesión');
        });
}

function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value;

    registerUser(email, password, name)
        .then(data => {
            if (data.error) {
                showError(data.error);
            } else {
                showSuccess('Usuario registrado exitosamente');
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                modal.hide();
            }
        })
        .catch(error => {
            console.error('Error en registro:', error);
            showError('Error al registrar usuario');
        });
}

function updateNavbarForLoggedUser(user) {
    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
    if (loginBtn && user) {
        loginBtn.textContent = user.name;
        loginBtn.onclick = () => {
            localStorage.removeItem('user');
            location.reload();
        };
    }
}

