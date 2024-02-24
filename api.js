const express = require("express");
const config = require("./config.json")
const registerFiles = require("./Outils/handler")
const { QuickDB } = require("quick.db");
const cors = require("cors");
const bodyParser = require('body-parser');
const database = new QuickDB(); 
const app = express()

const routes = registerFiles()

app.use(cors());
app.use(bodyParser.json());

app.delete('*', async function (req, res) {
    const url = req.url.split("?")[0].replace("/", "");
    const route = routes.DELETE.get(url)

    try {
        if(route) {
            await route.execute(req, res, database)
        } else {
            res.send("Chemin pas trouvé.")
        }
    } catch(e) {
        console.log(e)
        res.send("Une erreur est survenue.")
    }
})

app.post('*', async function (req, res) {
    const url = req.url.split("?")[0].replace("/", "");
    const route = routes.POST.get(url)

    try {
        if(route) {
            await route.execute(req, res, database)
        } else {
            res.send("Chemin pas trouvé.")
        }
    } catch(e) {
        console.log(e)
        res.send("Une erreur est survenue.")
    }
})

app.get('*', async function (req, res) {
    const url = req.url.split("?")[0].replace("/", "");
    const route = routes.GET.get(url)
    console.log(url)

    try {
        if(route) {
            await route.execute(req, res, database)
        } else {
            res.send("Chemin pas trouvé.")
        }
    } catch(e) {
        res.send("Utilisation de la route /" + route.name + " invalide.")
        console.log(e)
    }
})

app.listen(config.port,() => {
    console.log("En route")
});