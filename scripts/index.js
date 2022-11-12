const USUARIOS = "https://6364250f8a3337d9a2f256de.mockapi.io/users/";
const BOTON_BUSCAR = document.getElementById("btnGet1");
const BOTON_AGREGAR = document.getElementById("btnPost");
const BOTON_MODIFICAR = document.getElementById("btnSendChanges");
const BOTON_BORRAR = document.getElementById("btnDelete");

const INPUT_BUSCAR = document.getElementById("inputGet1Id");
const INPUT_MODIFICAR = document.getElementById("inputPutId");
const INPUT_BORRAR = document.getElementById("inputDelete");
const INPUTS_INGRESAR = document.getElementById("post-box").querySelectorAll("input[type=text]");
const INPUTS_MODAL = document.getElementById("dataModal").querySelectorAll("input[type=text]");

// Función que muestra la lista de usuarios en el HTML.
function mostrarLista(datos) {
    document.getElementById("results").innerHTML = ""
    if (INPUT_BUSCAR.value == "") {
        for (let usuario of datos) {
            document.getElementById("results").innerHTML += `
            <li>ID: ${usuario.id}</li>
            <li>name: ${usuario.name}</li>
            <li>lastname: ${usuario.lastname}</li>
            <hr>
            `
        }
    } else {
        document.getElementById("results").innerHTML = `
        <li>ID: ${datos.id}</li>
        <li>name: ${datos.name}</li>
        <li>lastname: ${datos.lastname}</li>
        `
    }
}

// Funciones para spinner de carga.
let showSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "block";
}
let hideSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "none";
}

// Función para alertas de error.
let mostrarAlerta = function () {
    swal("Algo salió mal", "¡Te mandaste cualquiera!", "error", { button: "😢", });
}

document.addEventListener("DOMContentLoaded", function () {

    // Funciones para el botón buscar.
    BOTON_BUSCAR.addEventListener("click", function () {
        showSpinner();
        fetch(USUARIOS + INPUT_BUSCAR.value)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    mostrarAlerta();
                    hideSpinner();
                }
            })
            .then((data) => {
                mostrarLista(data);
                hideSpinner();
            })
    })

    // Habilitar o deshabilitar el botón ingresar.
    INPUTS_INGRESAR.forEach(input => {
        input.addEventListener("input", function () {
            BOTON_AGREGAR.disabled = !(INPUTS_INGRESAR[0].value != "" && INPUTS_INGRESAR[1].value != "")
        })
    })

    // Funciones para el botón agregar.
    BOTON_AGREGAR.addEventListener("click", function () {
        showSpinner();
        fetch(USUARIOS,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: INPUTS_INGRESAR[0].value,
                    lastname: INPUTS_INGRESAR[1].value
                })
            }
        ).then(function (data) {
            if (data.ok) {
                fetch(USUARIOS)
                    .then(response => response.json())
                    .then(data => mostrarLista(data))
                hideSpinner()
            } else {
                mostrarAlerta();
                hideSpinner();
            }
        }
        ).catch(function (error) {
            mostrarAlerta();
            hideSpinner();
        })
    })

    // Habilitar o deshabilitar el botón modificar.
    INPUT_MODIFICAR.addEventListener("input", function () {
        document.getElementById("btnPut").disabled = INPUT_MODIFICAR.value == "";
    })

    // Habilitar o deshabilitar el botón guardar (dentro del modal).
    INPUTS_MODAL.forEach(input => {
        input.addEventListener("input", function () {
            BOTON_MODIFICAR.disabled = !(INPUTS_MODAL[0].value != "" && INPUTS_MODAL[1].value != "")
        })
    })

    // Funciones para el botón modificar.
    BOTON_MODIFICAR.addEventListener("click", function () {
        showSpinner();
        let idAModificar = document.getElementById("inputPutId").value
        fetch(USUARIOS + idAModificar,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: INPUTS_MODAL[0].value,
                    lastname: INPUTS_MODAL[1].value
                })
            }
        ).then(function (data) {
            if (data.ok) {
                fetch(USUARIOS)
                    .then(response => response.json())
                    .then(data => mostrarLista(data))
                hideSpinner();
            } else {
                mostrarAlerta();
                hideSpinner();
            }
        })
            .catch(function (error) {
                mostrarAlerta();
                hideSpinner();
            })
    })

    // Habilitar o deshabilitar el botón eliminar.
    INPUT_BORRAR.addEventListener("input", function () {
        BOTON_BORRAR.disabled = this.value == "";
    })

    // Funciones para el botón borrar. 
    BOTON_BORRAR.addEventListener("click", function () {
        showSpinner();
        let idAEliminar = INPUT_BORRAR.value
        fetch(USUARIOS + idAEliminar,
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            }
        ).then(function (data) {
            if (data.ok) {
                fetch(USUARIOS)
                    .then(response => response.json())
                    .then(data => mostrarLista(data))
                hideSpinner();
            } else {
                mostrarAlerta();
                hideSpinner();
            }
        }).catch(function (error) {
            mostrarAlerta();
            hideSpinner();
        })
    })
})