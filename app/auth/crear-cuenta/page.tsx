"use client";

export default function NuevaCuenta() {
  return (
    <div>
      <form>
        <h2>Crear cuenta</h2>
        <label>Correo electronico:</label>
        <input
          type="email"
          name="Correo electronico"
          placeholder="Correo electronico"
        />
        <label>Contraseña:</label>
        <input type="password" name="Contraseña" placeholder="Contraseña" />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
