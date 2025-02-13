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
    <div className="dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 6px rgba(100, 100, 100, 100)", 
        textAlign: "center" 
      }}>
        <img 
          src="https://media.makeameme.org/created/hola-bienvenidos.jpg" 
          style={{ width: "750px", height: "center", borderRadius: "10px" }} 
          alt="Bienvenida"
        />
      </div>
      <button 
      onClick={handleLogout} 
      onMouseOver={(e) => e.target.style.backgroundColor = "#c92c1c"} 
      onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"} 
      style={{
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 15px",
        cursor: "pointer"
      }}
    >
      Cerrar sesión
    </button>

    </div>
  );
}

export default Dashboard;
