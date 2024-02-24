const jwt = require('jsonwebtoken');

module.exports = {
    name: "login",
    execute: async function(req, res, database) {
        const password = req.query?.password;
        const user = req.query?.username;

        const userData = await database.get(user);
        if (userData) {
            if (userData.password === password) {
                const token = jwt.sign({ username: user }, 'evolve', { expiresIn: '14d' });

                userData.token = token;
                await database.set(user, userData);

                res.json({ message: "Success", token: token, data: userData });
            } else {
                res.json({ message: "Invalid password" });
            }
        } else {
            res.json({ message: "Invalid user" });
        }
    }
};
