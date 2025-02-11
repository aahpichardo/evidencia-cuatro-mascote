import { Router } from "express";
import { isEmailUnique, validatePassword, addUserToDatabase } from "../controllers/users.controllers.js";
import { sanitizeRegisterInput } from '../middlewares/sanitizeRegisterInput.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', sanitizeRegisterInput, async (req, res) => {
  const { correo, password, nombre_completo } = req.body;

  // Verificar que el correo no esté registrado previamente
  const emailUnique = await isEmailUnique(correo);
  if (!emailUnique) {
    return res.status(400).json({ error: 'El correo ya está registrado.' });
  }

  // Validar la contraseña
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'La contraseña no cumple con los requisitos de seguridad.' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Agregar el nuevo usuario a la base de datos
  const newUser = { correo, password: hashedPassword, nombre_completo };
  await addUserToDatabase(newUser);

  res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});

export default router;