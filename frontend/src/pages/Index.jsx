import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="container">
      <h1>Bienvenido</h1>
      <p>Elige una opción:</p>
      <Link to="/login"><button>Iniciar Sesión</button></Link>
      <br />
      <br />
      <Link to="/register"><button>Registrarse</button></Link>
    </div>
  );
}

export default Index;
