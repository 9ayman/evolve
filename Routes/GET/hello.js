module.exports = {
    name: "hello",
    execute: async function(req, res) {
        res.json({ message: "Hello World"})
    }
}