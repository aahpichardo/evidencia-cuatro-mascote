import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [nombre_completo, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};

    // Validar nombre completo (sin caracteres especiales)
    if (!nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(nombre_completo)) {
      newErrors.nombre_completo = "El nombre solo puede contener letras y espacios.";
    }

    // Validar correo electrónico
    if (!correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      newErrors.correo = "El formato del correo no es válido.";
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      newErrors.password = "Debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Debe incluir al menos una mayúscula.";
    } else if (!/\d/.test(password)) {
      newErrors.password = "Debe incluir al menos un número.";
    }

    // Confirmar contraseña
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna `true` si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password, nombre_completo }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Usuario registrado exitosamente.");
        setNombreCompleto("");
        setCorreo("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrors({ server: data.errors || "Ocurrió un error al registrar." });
      }
    } catch (error) {
      setErrors({ server: "Error al conectar con el servidor." });
    }
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre Completo"
          value={nombre_completo}
          onChange={(e) => setNombreCompleto(e.target.value)}
        />
        {errors.nombre_completo && <p className="error">{errors.nombre_completo}</p>}

        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {errors.correo && <p className="error">{errors.correo}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        {errors.server && <p className="error">{errors.server}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
}

export default Register;
