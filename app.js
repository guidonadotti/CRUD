const express = require("express")
const app = express()
const fs = require("fs")
const puerto = 3000

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
})

app.get("/", (req, res) => {
    res.send("<h1>Hola</h1>")
})
app.get("/usuarios", (req, res) => {
    res.sendFile(__dirname + "/usuarios.json")
})
app.get("/usuarios/:id", (req, res) => {
    let id = req.params.id
    let json = __dirname + "/usuarios.json"
    fs.readFile(json, (error, contenido) => {
        if (error) {
            throw error
        }
        json = JSON.parse(contenido)
        json = json.find(usuario => usuario.id == id)
        res.send(json)
    })
})
app.post("/usuarios", (req, res) => {
    let json = __dirname + "/usuarios.json"
    fs.readFile(json, (error, contenido) => {
        if (error) {
            throw error
        }
        json = JSON.parse(contenido)

        let maximo = 0
        json.forEach(element => {
            element.id = parseInt(element.id)
            if (element.id > maximo) {
                maximo = element.id
            }
        });
        let body = {
            ...req.body,
            id: maximo + 1
        }
        json.push(body)
        json = JSON.stringify(json, null, 4)
        fs.writeFile(__dirname + "/usuarios.json", json, error => {
            if (error) {
                throw error
            }
            res.send(body)

        })
    })
})
app.put("/usuarios/:id", (req, res) => {
    let id = req.params.id
    let body = {
        ...req.body,
        id: id
    }

    let json = __dirname + "/usuarios.json"
    fs.readFile(json, (error, contenido) => {
        if (error) {
            throw error
        }
        json = JSON.parse(contenido)
        let usuarioAModificar=json.find(usuario=>{
            return usuario.id==id
        })
        console.log(json.indexOf(usuarioAModificar)); 
        usuarioAModificar=body

        console.log(json);
    })
})


app.listen(puerto, () => {
    console.log(`http://localhost:${puerto}/`);
})