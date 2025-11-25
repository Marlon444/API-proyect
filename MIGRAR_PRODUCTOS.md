# 📦 Cómo Migrar tus Productos Antiguos a MongoDB

## 🎯 Problema
Los productos que creaste anteriormente están en la API externa (`fake-api-vq1l.onrender.com`), pero ahora tu proyecto usa MongoDB que está vacío.

## ✅ Solución: Script de Migración

He creado un script que trae todos tus productos antiguos a MongoDB.

---

## 🚀 PASOS PARA MIGRAR (2 minutos)

### **Paso 1: Asegúrate de que el servidor NO esté corriendo**
Si tienes `node server.js` corriendo, deténlo (Ctrl+C)

### **Paso 2: Ejecutar el script de migración**
```bash
cd backend
npm run migrate
```

### **Paso 3: Ver los resultados**
El script te mostrará:
- ✅ Cuántos productos se migraron
- ⏭️ Cuántos se saltaron (si ya existían)
- 📦 Total procesados

### **Paso 4: Verificar en MongoDB Atlas**
1. Ve a MongoDB Atlas
2. Database → Browse Collections
3. Deberías ver la colección `products` con todos tus productos

### **Paso 5: Reiniciar el servidor**
```bash
cd backend
node server.js
```

### **Paso 6: Recargar el frontend**
- Recarga `index.html` en tu navegador
- Ahora deberías ver todos tus productos antiguos

---

## 🎨 NUEVA FUNCIONALIDAD: Ver Detalles

Ahora los productos dinámicos (los que vienen de MongoDB) tienen un botón **"Ver detalles"** que abre un modal con toda la información, igual que las motos estáticas.

### **Cómo funciona:**
1. Cada producto tiene un botón "Ver detalles" (azul)
2. Al hacer click, se abre un modal con:
   - Imagen grande
   - Marca y modelo
   - Precio destacado
   - Especificaciones
   - Descripción completa
   - Botones de acción

---

## ⚠️ NOTAS IMPORTANTES

- **El script NO duplica productos**: Si un producto ya existe (mismo título), lo salta
- **Puedes ejecutarlo varias veces**: Es seguro ejecutarlo múltiples veces
- **Los productos antiguos se mantienen**: La API externa sigue funcionando, pero ahora también están en MongoDB

---

## 🔍 VERIFICAR QUE FUNCIONÓ

1. **En la consola del script:**
   ```
   ✅ Migrado: Nombre del producto
   📊 Resumen de migración:
      ✅ Migrados: X
   ```

2. **En MongoDB Atlas:**
   - Ve a Database → Browse Collections
   - Click en `products`
   - Deberías ver todos tus productos

3. **En el frontend:**
   - Recarga la página
   - Deberías ver tus productos en la sección "Productos Disponibles"
   - Cada uno tiene botón "Ver detalles"

---

## 🐛 Si algo sale mal

### Error: "Cannot find module"
```bash
cd backend
npm install
```

### Error: "Connection failed"
- Verifica que tu `.env` tenga el `MONGO_URI` correcto
- Verifica que MongoDB Atlas esté activo

### No aparecen productos después de migrar
- Verifica que el servidor esté corriendo
- Abre la consola del navegador (F12) y revisa errores
- Verifica que la URL en `main.js` sea `http://localhost:3000/api`

---

## ✅ ¡LISTO!

Después de migrar:
- ✅ Todos tus productos antiguos están en MongoDB
- ✅ Puedes ver los detalles de cada producto
- ✅ Puedes seguir creando nuevos productos
- ✅ Todo funciona con MongoDB

¡Disfruta tu proyecto completo! 🚀

