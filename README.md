Este es el frontend de la aplicación Team Manager, desarrollado en Angular. Permite gestionar usuarios con autenticación JWT, incluyendo creación, edición, eliminación y login seguro.

🚀 Tecnologías utilizadas
Angular

TypeScript

HTML / CSS (diseño personalizado sin librerías externas)

JWT (consumo desde backend .NET)

Angular Router

HttpClient

📁 Estructura principal
src/
├── app/
│ ├── modules/usuarios/
│ │ ├── pages/
│ │ │ ├── list/ → Lista de usuarios
│ │ │ ├── form/ → Formulario crear/editar
│ │ │ ├── login/ → Página de login
│ ├── services/
│ ├── auth.service.ts
│ ├── usuario.service.ts

📦 Instalación y ejecución
Clonar el repositorio: git clone https://github.com/usuario/team-manager-front.git
cd team-manager-front

Instalar dependencias: npm install

Levantar el servidor Angular: ng serve

Abrir en el navegador: http://localhost:4200

🔐 Autenticación
Al iniciar sesión con admin@gmail.com (credenciales válidas del backend), se almacena un JWT en localStorage.

Las peticiones al backend incluyen el token en los headers para autenticación.

✅ Funcionalidades
Login seguro con JWT

Lista de usuarios (solo si estás logueado)

Crear usuario

Editar usuario

Eliminar usuario (con confirmación)

Control visual de errores y alertas

📌 Notas
No usa librerías externas como Bootstrap o SweetAlert.

Puedes cambiar la URL del backend en auth.service.ts y usuario.service.ts según tu entorno.
