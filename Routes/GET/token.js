const jwt = require('jsonwebtoken');

module.exports = {
    name: "token",
    execute: async function(req, res, database) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        try {
            const decoded = jwt.verify(token, 'evolve');
            const user = decoded.username;
            const userData = await database.get(user);

            if (userData) {
                const userInfo = {
                    username: userData.username,
                    email: userData.email,
                };
                res.json(userInfo);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    }
};
