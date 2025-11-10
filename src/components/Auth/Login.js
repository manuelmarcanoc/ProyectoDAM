export default function Login({ onSwitch, onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar usuario o pedir datos reales
    onLogin(); // <-- cambia a Dashboard
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <div className="bg-white bg-opacity-70 rounded-3xl shadow-lg w-80 p-6 text-center">
        <img src="/logo.png" alt="Vibbe" className="mx-auto w-20 mb-4" />
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">Bienvenido</h1>
        <p className="text-gray-600 mb-5">Accede a tu cuenta Vibbe</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" className="input" required />
          <input type="password" placeholder="Contraseña" className="input" required />
          <button type="submit" className="btn-primary mt-2">
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <span onClick={onSwitch} className="text-emerald-600 font-semibold cursor-pointer">
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}
