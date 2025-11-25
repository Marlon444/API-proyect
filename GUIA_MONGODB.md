# 🚀 Guía Paso a Paso: Conectar MotoMarket con MongoDB

## 📋 Requisitos Previos
- Node.js instalado (descarga de nodejs.org)
- MongoDB Atlas (gratis) o MongoDB local
- Editor de código (VS Code recomendado)

---

## PASO 1: Configurar MongoDB Atlas (Gratis) ☁️

### 1.1 Crear cuenta en MongoDB Atlas
1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratuita
3. Crea un cluster (elige la opción FREE)
4. Espera a que se cree (5-10 minutos)

### 1.2 Obtener String de Conexión
1. Click en "Connect" en tu cluster
2. Elige "Connect your application"
3. Copia el connection string (algo como: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
4. Reemplaza `<password>` con tu contraseña de MongoDB

---

## PASO 2: Crear Estructura del Backend 📁

### 2.1 Crear carpeta backend
En la raíz de tu proyecto, crea:
```
MoticosAzarosas2/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── index.html
├── style.css
└── main.js
```

### 2.2 Inicializar proyecto Node.js
```bash
cd backend
npm init -y
```

### 2.3 Instalar dependencias
```bash
npm install express mongoose cors dotenv
```

---

## PASO 3: Crear Archivos del Backend 📝

### 3.1 Crear `.env` (variables de entorno)
Crea `backend/.env`:
```
MONGO_URI=tu_connection_string_aqui
PORT=3000
```

### 3.2 Crear `backend/server.js`
Este será el servidor principal.

### 3.3 Crear `backend/models/Product.js`
Modelo para los productos/motos.

### 3.4 Crear `backend/routes/products.js`
Rutas para CRUD de productos.

---

## PASO 4: Modificar Frontend 🔄

### 4.1 Cambiar URLs en `main.js`
Cambiar de la API externa a tu backend local.

### 4.2 Agregar funcionalidad de autenticación básica

---

## PASO 5: Probar y Ejecutar ✅

### 5.1 Iniciar el servidor
```bash
cd backend
node server.js
```

### 5.2 Abrir el frontend
Abre `index.html` en el navegador o usa un servidor local.

---

## 🎯 Notas Importantes

- **Sin seguridad avanzada**: Para proyecto universitario, usaremos autenticación básica
- **CORS habilitado**: Para que el frontend pueda hacer peticiones
- **Sin validaciones complejas**: Solo lo esencial
- **Datos en texto plano**: Para simplificar (en producción usarías hash)

---

## 📚 Siguiente: Crear los archivos

