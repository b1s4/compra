// Datos de ejemplo para autenticación
const usuarios = {
    "usuario1": "contraseña123",
    "usuario2": "miContraseña456"
};

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificar credenciales
    if (usuarios[username] && usuarios[username] === password) {
        // Ocultar la pantalla de login y mostrar la lista
        document.getElementById("login-container").style.display = "none";
        document.getElementById("shopping-list-container").style.display = "block";
    } else {
        // Mostrar error
        document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos.";
    }
});

// Habilitar la edición de la lista
document.getElementById("edit-button").addEventListener("click", function() {
    const listItems = document.querySelectorAll(".shopping-list li");

    // Alternar la capacidad de editar la lista (marcar/desmarcar)
    listItems.forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        checkbox.disabled = !checkbox.disabled;
        const label = item.querySelector("label");
        label.style.cursor = checkbox.disabled ? 'pointer' : 'text';
    });
});

// Para permitir que el usuario edite los textos (si se activa el modo de edición)
const shoppingList = document.getElementById("shopping-list");
shoppingList.addEventListener("dblclick", function(event) {
    if (event.target.tagName.toLowerCase() === 'label' && event.target.style.cursor === 'text') {
        const newText = prompt("Editar elemento:", event.target.textContent);
        if (newText !== null) {
            event.target.textContent = newText;
        }
    }
});
