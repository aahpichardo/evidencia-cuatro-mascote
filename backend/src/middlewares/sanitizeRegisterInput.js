import { body, validationResult } from 'express-validator';

export const sanitizeRegisterInput = [
  body('correo')
    .notEmpty().withMessage('El correo no puede estar vacío.')
    .bail() // Detiene la validación si el campo está vacío
    .isEmail().withMessage('El correo debe ser un correo electrónico válido.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña no puede estar vacía.')
    .bail() // Detiene la validación si el campo está vacío
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'),
  body('nombre_completo')
    .notEmpty().withMessage('El nombre completo no puede estar vacío.')
    .bail() // Detiene la validación si el campo está vacío
    .matches(/^[A-Za-z\s]+$/).withMessage('El nombre completo solo puede contener letras y espacios.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map(error => error.msg) });
    }
    next();
  }
];