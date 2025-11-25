// migrate.js - Script para migrar productos de la API externa a MongoDB
const mongoose = require('mongoose');
const https = require('https');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mailon:201191@cluster0.falcuez.mongodb.net/?appName=Cluster0';
const OLD_API_URL = 'https://fake-api-vq1l.onrender.com/posts';
const OLD_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0';

// Función para hacer petición HTTPS
function fetchData(url, token) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname,
            method: 'GET',
            headers: {
                'Authorization': token
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function migrateProducts() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Conectado a MongoDB');

        // Obtener productos de la API antigua
        console.log('📥 Obteniendo productos de la API externa...');
        const oldProducts = await fetchData(OLD_API_URL, OLD_API_TOKEN);
        console.log(`📦 Encontrados ${oldProducts.length} productos para migrar`);

        // Migrar cada producto
        let migrated = 0;
        let skipped = 0;

        for (const oldProduct of oldProducts) {
            try {
                // Verificar si el producto ya existe (por título)
                const existing = await Product.findOne({ title: oldProduct.title });
                
                if (existing) {
                    console.log(`⏭️  Producto "${oldProduct.title}" ya existe, saltando...`);
                    skipped++;
                    continue;
                }

                // Parsear imágenes
                let images = [];
                try {
                    images = JSON.parse(oldProduct.images || '[]');
                } catch (e) {
                    images = oldProduct.images || [];
                }

                // Crear nuevo producto en MongoDB
                const newProduct = new Product({
                    title: oldProduct.title,
                    description: oldProduct.description,
                    value: oldProduct.value,
                    images: Array.isArray(images) ? images : [images],
                    status: 'available'
                });

                await newProduct.save();
                console.log(`✅ Migrado: ${oldProduct.title}`);
                migrated++;

            } catch (error) {
                console.error(`❌ Error migrando producto "${oldProduct.title}":`, error.message);
            }
        }

        console.log('\n📊 Resumen de migración:');
        console.log(`   ✅ Migrados: ${migrated}`);
        console.log(`   ⏭️  Saltados: ${skipped}`);
        console.log(`   📦 Total procesados: ${oldProducts.length}`);

        // Cerrar conexión
        await mongoose.connection.close();
        console.log('\n✅ Migración completada!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error en la migración:', error);
        process.exit(1);
    }
}

// Ejecutar migración
migrateProducts();

