const fs = require("fs");

module.exports = function registerFiles() {
    const GET = new Map();
    const POST = new Map();
    const DELETE = new Map();
    
    fs.readdirSync("./Routes")
    .forEach((folder) => {
        fs.readdirSync(`./Routes/${folder}`).forEach((folderFile) => {
            const file = require(`../Routes/${folder}/${folderFile}`)
            switch(folder) {
                case "GET":
                    GET.set(file.name, file)
                    break;

                case "DELETE":
                    DELETE.set(file.name, file)
                    break;

                case "POST":
                    POST.set(file.name, file)
                    break;
            }
        })
    })

    return { GET: GET, POST: POST, DELETE: DELETE}
}