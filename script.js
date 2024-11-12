// Datos de ejemplo para autenticación
const usuarios = {
    "admin": "admin",
    "usuario2": "miContraseña456"
};

// Mostrar el formulario de login al hacer clic en el botón
document.getElementById("login-toggle").addEventListener("click", function() {
    document.getElementById("login-container").style.display = "block";
});

// Cerrar el formulario de login
document.getElementById("close-login").addEventListener("click", function() {
    document.getElementById("login-container").style.display = "none";
});

// Función para autenticar usuario
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificar credenciales
    if (usuarios[username] && usuarios[username] === password) {
        // Ocultar formulario de login y mostrar botones de edición
        document.getElementById("login-container").style.display = "none";
        document.getElementById("edit-button").style.display = "block";
        document.getElementById("add-item-button").style.display = "block";
    } else {
        // Mostrar mensaje de error
        document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos.";
    }
});

// Funcionalidad para añadir un elemento a la lista
document.getElementById("add-item-button").addEventListener("click", function() {
    const newItem = prompt("¿Qué quieres añadir a la lista?");
    if (newItem) {
        const newLi = document.createElement("li");
        const newId = `item${document.querySelectorAll(".shopping-list li").length + 1}`;
        newLi.innerHTML = `<input type="checkbox" id="${newId}"> <label for="${newId}">${newItem}</label>`;
        document.getElementById("shopping-list").appendChild(newLi);
    }
});

// Funcionalidad para eliminar un elemento de la lista
document.getElementById("shopping-list").addEventListener("dblclick", function(event) {
    if (event.target.tagName.toLowerCase() === 'label') {
        const liToDelete = event.target.closest('li');
        liToDelete.remove();
    }
});

// Habilitar/deshabilitar la edición de la lista
document.getElementById("edit-button").addEventListener("click", function() {
    const checkboxes = document.querySelectorAll(".shopping-list input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.disabled = !checkbox.disabled;
    });
    const labels = document.querySelectorAll(".shopping-list label");
    labels.forEach(label => {
        label.style.cursor = label.style.cursor === "text" ? "pointer" : "text";
    });
});
