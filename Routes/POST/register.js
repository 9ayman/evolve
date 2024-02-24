module.exports = {
    name: "register",
    execute: async function(req, res, database) {
        const { username, email, password } = req.body;
        
        console.log(req)

        try {
            const existingUser = await database.get(username);
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }

            const newUser = {
                username,
                email,
                password
            };

            await database.set(username, newUser);

            res.json({ message: "Succes", data: newUser });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Error' });
        }
    }
};
