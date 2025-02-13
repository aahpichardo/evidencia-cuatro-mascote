import { body, validationResult } from 'express-validator';

export const sanitizeLoginInput = [
  body('correo')
    .notEmpty().withMessage('El correo no puede estar vacío.')
    .bail() // Detiene la validación si el campo está vacío
    .isEmail().withMessage('El correo debe ser un correo electrónico válido.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña no puede estar vacía.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map(error => error.msg) });
    }
    next();
  }
];