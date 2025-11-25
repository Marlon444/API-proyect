# ⚡ INSTRUCCIONES RÁPIDAS - MotoMarket con MongoDB

## 🎯 PASOS RÁPIDOS (10 minutos)

### 1️⃣ **MongoDB Atlas (5 min)**
1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea cuenta → Crea cluster FREE
3. Database Access → Crea usuario (username: `motimarket`, password: tu password)
4. Network Access → Allow from anywhere (0.0.0.0/0)
5. Database → Connect → Connect your application
6. Copia el connection string

### 2️⃣ **Backend (2 min)**
```bash
cd backend
npm install
```

Crea archivo `backend/.env`:
```
MONGO_URI=tu_connection_string_aqui_con_password
PORT=3000
```

### 3️⃣ **Iniciar Servidor (1 min)**
```bash
cd backend
node server.js
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:3000
```

### 4️⃣ **Abrir Frontend (1 min)**
- Abre `index.html` en tu navegador
- Los productos se cargarán desde MongoDB

---

## ✅ VERIFICAR QUE FUNCIONA

1. **Servidor corriendo:** http://localhost:3000 → Debe mostrar mensaje JSON
2. **API funcionando:** http://localhost:3000/api/products → Debe mostrar array (vacío al inicio)
3. **Frontend:** Abre index.html → Debe cargar sin errores en consola

---

## 🧪 PROBAR FUNCIONALIDADES

### Crear Producto:
1. Click en "Publicar moto"
2. Llena el formulario
3. Submit
4. El producto aparece en la lista

### Ver en MongoDB:
1. Ve a MongoDB Atlas
2. Database → Browse Collections
3. Deberías ver la colección `products` con tus datos

---

## 📁 ARCHIVOS CREADOS

```
backend/
├── server.js          ✅ Servidor principal
├── models/
│   ├── Product.js     ✅ Modelo de productos
│   └── User.js        ✅ Modelo de usuarios
├── routes/
│   ├── products.js    ✅ Rutas CRUD productos
│   └── users.js       ✅ Rutas login/registro
└── .env               ⚠️ CREAR TÚ (con tu connection string)
```

---

## 🔧 COMANDOS ÚTILES

```bash
# Instalar dependencias
cd backend && npm install

# Iniciar servidor
cd backend && node server.js

# Ver productos en consola
curl http://localhost:3000/api/products
```

---

## ⚠️ PROBLEMAS COMUNES

**Error: "Cannot find module"**
→ Ejecuta: `cd backend && npm install`

**Error: "Authentication failed"**
→ Verifica el password en `.env` (debe ser el password de MongoDB, no el de tu cuenta)

**Frontend no carga productos**
→ Verifica que el servidor esté corriendo (`node server.js`)
→ Abre consola del navegador (F12) y revisa errores

**CORS Error**
→ El servidor ya tiene CORS habilitado, pero verifica que uses `http://localhost:3000`

---

## 🎓 PARA TU PRESENTACIÓN

**Muestra:**
1. ✅ Servidor corriendo
2. ✅ Productos en MongoDB Atlas (Database → Browse Collections)
3. ✅ Crear producto desde el frontend
4. ✅ Ver producto en MongoDB
5. ✅ Login/Registro funcionando

**Explica:**
- Frontend (HTML/CSS/JS) → Backend (Node.js/Express) → MongoDB
- CRUD completo funcionando
- Datos persistentes en la nube (MongoDB Atlas)

---

## 🚀 ¡LISTO!

Tu proyecto ahora tiene:
- ✅ MongoDB como base de datos
- ✅ Backend con Express
- ✅ API REST completa
- ✅ Frontend conectado
- ✅ Login/Registro básico

¡Éxito! 🎉

