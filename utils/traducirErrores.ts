// Función para traducir errores de Supabase
export function traducirError(errorMessage: string): string {
  const traducciones: { [key: string]: string } = {
    "Invalid login credentials": "Credenciales de inicio de sesión inválidas",
    "Email not confirmed": "Email no confirmado",
    "User already registered": "El usuario ya está registrado",
    "Password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres",
    "Unable to validate email address: invalid format":
      "Formato de email inválido",
    "Signup requires a valid password":
      "El registro requiere una contraseña válida",
    "User not found": "Usuario no encontrado",
    "Email rate limit exceeded":
      "Límite de intentos excedido, intenta más tarde",
    "Invalid email or password": "Email o contraseña inválidos",
  };

  // Buscar una traducción exacta
  if (traducciones[errorMessage]) {
    return traducciones[errorMessage];
  }

  // Buscar por palabras clave
  for (const [key, value] of Object.entries(traducciones)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  // Si no hay traducción, retornar mensaje genérico
  return "Ha ocurrido un error. Por favor, intenta de nuevo.";
}
