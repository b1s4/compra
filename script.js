// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3UcbJVe4kB540WIkDE7xN7N-sUgvmPIA",
  authDomain: "compra-343e9.firebaseapp.com",
  projectId: "compra-343e9",
  storageBucket: "compra-343e9.firebasestorage.app",
  messagingSenderId: "83772003264",
  appId: "1:83772003264:web:0779c9feb6f09902af6e25"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);  // Inicializa Firestore

// Función para cargar la lista desde Firestore
function cargarLista() {
    const listaGuardada = document.getElementById("shopping-list");
    listaGuardada.innerHTML = ''; // Limpiar lista actual

    db.collection("listasCompra").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const newLi = document.createElement("li");
                const newId = `item-${doc.id}`;
                const item = doc.data();
                newLi.innerHTML = `<input type="checkbox" id="${newId}" ${item.checked ? 'checked' : ''}> <label for="${newId}">${item.name}</label>`;
                listaGuardada.appendChild(newLi);
            });
        })
        .catch((error) => {
            console.error("Error al cargar la lista:", error);
        });
}

// Función para guardar la lista en Firestore
function guardarLista() {
    const items = [];
    document.querySelectorAll(".shopping-list li").forEach((li) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const label = li.querySelector("label");
        items.push({
            name: label.textContent,
            checked: checkbox.checked
        });
    });

    // Guardar en Firestore
    db.collection("listasCompra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete(); // Eliminar datos antiguos
        });

        items.forEach(item => {
            db.collection("listasCompra").add(item); // Añadir elementos nuevos
        });
    });
}

// Funcionalidad para añadir un elemento a la lista
document.getElementById("add-item-button").addEventListener("click", function() {
    const newItem = prompt("¿Qué quieres añadir a la lista?");
    if (newItem) {
        db.collection("listasCompra").add({
            name: newItem,
            checked: false
        }).then(() => {
            cargarLista(); // Recargar lista después de añadir un nuevo elemento
        });
    }
});

// Funcionalidad para eliminar un elemento de la lista
document.getElementById("shopping-list").addEventListener("dblclick", function(event) {
    if (event.target.tagName.toLowerCase() === 'label') {
        const liToDelete = event.target.closest('li');
        const itemName = event.target.textContent;

        // Eliminar de Firestore
        db.collection("listasCompra").where("name", "==", itemName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            liToDelete.remove();
        });
    }
});

// Cargar lista al cargar la página
document.addEventListener("DOMContentLoaded", cargarLista);
