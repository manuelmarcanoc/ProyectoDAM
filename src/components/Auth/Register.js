export default function Register({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Usuario registrado correctamente ✅");
    onSwitch(); // vuelve al login
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <div className="bg-white bg-opacity-70 rounded-3xl shadow-lg w-80 p-6 text-center">
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">Crear cuenta</h1>
        <p className="text-gray-600 mb-5">Únete al programa Vibbe</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre completo" className="input" required />
          <input type="email" placeholder="Correo electrónico" className="input" required />
          <input type="password" placeholder="Contraseña" className="input" required />
          <input type="password" placeholder="Confirmar contraseña" className="input" required />
          <button type="submit" className="btn-primary mt-2">
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <span onClick={onSwitch} className="text-emerald-600 font-semibold cursor-pointer">
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
