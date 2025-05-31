const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/getToken", async (req, res) => {
    try {
        const { email, haslo } = req.body;

        console.log(email, haslo);

        const user = await User.getUser(email, haslo);

        console.log("a", user);

        if (!user) {
            return res.status(400).send({ ok: false, message: "Invalid email or password" });
        }

        console.log("id: ", user.osoba_id);
        console.log("rola: ", user.rola);

        const token = jwt.sign(
            { id: user.osoba_id, role: user.rola },
            "123456",
            { expiresIn: "24h" }
        );

        res.send({
            ok: true,
            token: token
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ ok: false, message: "Internal server error" });
    }
});


module.exports = router;
