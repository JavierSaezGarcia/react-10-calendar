import { useAuthStore } from "../../hooks"

export const NavBar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt" sx={{ color:'#fff', marginRight: '5px'}}></i>&nbsp;
            {user.name}
        </span>
        <button 
            onClick={startLogout}
            className="btn btn-danger">
            <i className="fas fa-sign-out-alt"></i>&nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
