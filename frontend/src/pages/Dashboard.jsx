import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <img 
        src="https://media.makeameme.org/created/hola-bienvenidos.jpg" 
        style={{ height: "90vh", objectFit: "cover" }} 
        alt="Bienvenida"
      />
      <button 
        onClick={handleLogout} 
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
