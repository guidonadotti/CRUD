const USUARIOS = "https://6364250f8a3337d9a2f256de.mockapi.io/users/"
let input = document.getElementById("inputGet1Id")

function buscar(datos) {
    document.getElementById("results").innerHTML = ""
    if (input.value == "") {
        for (let usuario of datos) {
            document.getElementById("results").innerHTML +=
                `
                <li>ID: ${usuario.id}</li>
                <li>name: ${usuario.name}</li>
                <li>lastname: ${usuario.lastname}</li>
                <hr>
            `
        }
    } else {
        document.getElementById("results").innerHTML =
            `
        <li>ID: ${datos.id}</li>
        <li>name: ${datos.name}</li>
        <li>lastname: ${datos.lastname}</li>
        `
    }


}



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnGet1").addEventListener("click", function () {
        fetch(USUARIOS + input.value)
            .then(response => response.json())
            .then(data => buscar(data)
            )
    })

    let inputsIngresar = document.getElementById("post-box").querySelectorAll("input[type=text]")
    inputsIngresar.forEach(input => {
        input.addEventListener("input", function () {
            document.getElementById("btnPost").disabled = !(inputsIngresar[0].value != "" && inputsIngresar[1].value != "")
        })
    })

    document.getElementById("btnPost").addEventListener("click",function(){
        fetch(USUARIOS,
            {method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify({
                name:inputsIngresar[0].value,
                lastname:inputsIngresar[0].value
                })          
            }
        )
    })

    let inputModificar=document.getElementById("inputPutId")
    inputModificar.addEventListener("input",function(){
        document.getElementById("btnPut").disabled=inputModificar.value==""
    })

    let inputsModal = document.getElementById("dataModal").querySelectorAll("input[type=text]")
    inputsModal.forEach(input => {
        input.addEventListener("input", function () {
            document.getElementById("btnSendChanges").disabled = !(inputsModal[0].value != "" && inputsModal[1].value != "")
        })
    })

    document.getElementById("btnSendChanges").addEventListener("click",function(){
        let idAModificar=document.getElementById("inputPutId").value
        fetch(USUARIOS+idAModificar,
            {method:"PUT",
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify({
                name:inputsModal[0].value,
                lastname:inputsModal[1].value
                })          
            }
        )
    })
})
