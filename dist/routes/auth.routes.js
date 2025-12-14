import { Router } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const router = Router();
router.post("/login", async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: "Senha obrigatória" });
    }
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;
    const isValid = await bcrypt.compare(password, passwordHash);
    if (!isValid) {
        return res.status(401).json({ error: "Senha inválida" });
    }
    const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "1h" });
    return res.json({ token });
});
export default router;
