# 🚀 Guía Completa: MotoMarket con MongoDB

## 📋 PASO A PASO COMPLETO

### **PASO 1: Configurar MongoDB Atlas (5 minutos)** ☁️

1. **Crear cuenta:**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Crea cuenta gratuita
   - Verifica tu email

2. **Crear Cluster:**
   - Click en "Build a Database"
   - Elige "FREE" (M0 Sandbox)
   - Selecciona región (cualquiera)
   - Click "Create"

3. **Configurar Acceso:**
   - Ve a "Database Access" (menú izquierdo)
   - Click "Add New Database User"
   - Username: `motimarket`
   - Password: Crea una contraseña (guárdala)
   - Click "Add User"

4. **Configurar Network Access:**
   - Ve a "Network Access" (menú izquierdo)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Obtener Connection String:**
   - Ve a "Database" → "Connect"
   - Click "Connect your application"
   - Copia el string (algo como: `mongodb+srv://motimarket:password@cluster0.xxxxx.mongodb.net/`)
   - Reemplaza `<password>` con tu contraseña real

---

### **PASO 2: Instalar Node.js** 💻

1. Descarga Node.js: https://nodejs.org/
2. Instala (siguiente, siguiente, siguiente)
3. Verifica instalación:
   ```bash
   node --version
   npm --version
   ```

---

### **PASO 3: Configurar Backend** 📁

1. **Abrir terminal en la carpeta del proyecto:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Crear archivo .env:**
   - Copia `.env.example` y renómbralo a `.env`
   - O crea un archivo `.env` con:
   ```
   MONGO_URI=tu_connection_string_aqui_con_password
   PORT=3000
   ```
   - Ejemplo: `MONGO_URI=mongodb+srv://motimarket:mipassword123@cluster0.xxxxx.mongodb.net/motimarket?retryWrites=true&w=majority`

---

### **PASO 4: Iniciar el Servidor** 🚀

1. **En la terminal (carpeta backend):**
   ```bash
   node server.js
   ```

2. **Deberías ver:**
   ```
   ✅ Conectado a MongoDB
   🚀 Servidor corriendo en http://localhost:3000
   ```

3. **Probar la API:**
   - Abre en navegador: http://localhost:3000
   - Deberías ver: `{"message":"🚀 API de MotoMarket funcionando!"}`

---

### **PASO 5: Probar el Frontend** 🌐

1. **Abrir index.html:**
   - Abre `index.html` en tu navegador
   - O usa un servidor local (VS Code Live Server)

2. **Probar funcionalidades:**
   - Ver productos (deberían cargar desde MongoDB)
   - Crear producto
   - Editar producto
   - Eliminar producto

---

## 🧪 PROBAR LA API MANUALMENTE

### Con Postman o navegador:

**GET todos los productos:**
```
http://localhost:3000/api/products
```

**POST crear producto:**
```
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "title": "Yamaha MT-03",
  "description": "Moto deportiva 300cc",
  "value": 12500000,
  "images": ["https://ejemplo.com/moto.jpg"]
}
```

**GET un producto:**
```
http://localhost:3000/api/products/ID_DEL_PRODUCTO
```

**PATCH actualizar:**
```
PATCH http://localhost:3000/api/products/ID_DEL_PRODUCTO
Content-Type: application/json

{
  "title": "Yamaha MT-03 Actualizada"
}
```

**DELETE eliminar:**
```
DELETE http://localhost:3000/api/products/ID_DEL_PRODUCTO
```

---

## 👤 USUARIOS Y LOGIN

### Registrar usuario:
```javascript
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "123456",
  "name": "Juan Pérez"
}
```

### Login:
```javascript
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "123456"
}
```

---

## ⚠️ PROBLEMAS COMUNES

### Error: "Cannot find module"
```bash
cd backend
npm install
```

### Error: "MongoServerError: Authentication failed"
- Verifica que el password en `.env` sea correcto
- Asegúrate de reemplazar `<password>` en el connection string

### Error: "ECONNREFUSED"
- Verifica que MongoDB Atlas esté activo
- Verifica que el connection string sea correcto
- Verifica que Network Access permita tu IP

### Frontend no carga productos:
- Verifica que el servidor esté corriendo (`node server.js`)
- Abre la consola del navegador (F12) y revisa errores
- Verifica que la URL en `main.js` sea `http://localhost:3000/api`

---

## 📁 ESTRUCTURA FINAL

```
MoticosAzarosas2/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── products.js
│   │   └── users.js
│   ├── .env (crear tú)
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── index.html
├── style.css
├── main.js
└── README_MONGODB.md
```

---

## ✅ CHECKLIST

- [ ] MongoDB Atlas creado
- [ ] Connection string obtenido
- [ ] Archivo `.env` creado con MONGO_URI
- [ ] `npm install` ejecutado en backend/
- [ ] Servidor corriendo (`node server.js`)
- [ ] Frontend abierto y funcionando
- [ ] Productos se cargan desde MongoDB
- [ ] Puedes crear/editar/eliminar productos

---

## 🎓 PARA TU PROYECTO UNIVERSITARIO

**Lo que tienes ahora:**
- ✅ Backend con MongoDB
- ✅ API REST completa
- ✅ CRUD de productos
- ✅ Sistema de usuarios básico
- ✅ Frontend conectado

**Puedes agregar fácilmente:**
- Carrito de compras (nueva colección `carts`)
- Órdenes (nueva colección `orders`)
- Mensajes (nueva colección `messages`)

**Para la presentación:**
- Muestra que los datos se guardan en MongoDB
- Muestra que puedes crear/editar/eliminar
- Muestra el login funcionando
- Explica la arquitectura (Frontend → Backend → MongoDB)

---

## 🚀 ¡LISTO!

Tu proyecto ahora tiene:
- ✅ Base de datos MongoDB
- ✅ Backend con Express
- ✅ API REST funcional
- ✅ Frontend conectado

¡Éxito en tu proyecto universitario! 🎉

