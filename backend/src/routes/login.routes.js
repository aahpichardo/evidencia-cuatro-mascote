import { Router } from "express";
import { checkUserInDatabase } from "../controllers/users.controllers.js";
import { sanitizeLoginInput } from '../middlewares/sanitizeLoginInput.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', sanitizeLoginInput, async (req, res) => {
  const { correo, password } = req.body;

  // Llamada a la función que verifica que el usuario exista en la base de datos
  const user = await checkUserInDatabase(correo);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  // Validar la contraseña
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).json({ error: 'La contraseña no es correcta.' });
  }

  // Envío de respuesta de éxito
  res.status(200).json({ message: 'Acceso concedido.' });
});

export default router;