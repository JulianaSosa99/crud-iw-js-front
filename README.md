
**TEAM MANAGER - FRONTEND**
--


Este es el frontend de la aplicación Team Manager, desarrollado en Angular. Permite gestionar usuarios con autenticación JWT, incluyendo creación, edición, eliminación y login seguro.

**DELPLOY: https://crud-iw-js-front.onrender.com/**

**PROBAR USUARIO: usuariol@gmail.com/ testing01**

**Reto:**
Reporte del backend: 

![image](https://github.com/user-attachments/assets/703a5e46-7444-4b4f-bde7-f1bc3234d10d)# 


🚀 Tecnologías utilizadas
Angular

TypeScript

HTML / CSS (diseño personalizado sin librerías externas)

JWT (consumo desde backend .NET)

Angular Router

HttpClient

## 📁 Estructura principal

```plaintext
src/
├── app/
│   ├── modules/usuarios/
│   │   ├── pages/
│   │   │   ├── list/       → Lista de usuarios
│   │   │   ├── form/       → Formulario crear/editar
│   │   │   ├── login/      → Página de login
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── usuario.service.ts
```


📦 Instalación y ejecución
Clonar el repositorio: git clone https://github.com/usuario/team-manager-front.git
cd team-manager-front

Instalar dependencias: npm install

Levantar el servidor Angular: ng serve

Backend Deployado: https://servicio-web-academico.onrender.com

Abrir en el navegador: http://localhost:4200

Abrir Backend: https://github.com/JulianaSosa99/crud-iw-sjk.git

🔐 Autenticaciónd

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
