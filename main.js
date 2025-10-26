document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    fetch("https://fake-api-vq1l.onrender.com/posts", {
        headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const list = document.getElementById("list");
        list.innerHTML = '';

        data.forEach(product => {
            const images = JSON.parse(product.images) || [];

            const myhtml = `
                <div class="card" style="width: 18rem; margin: 10px;">
                    <img src="${images[0] || 'default-image.jpg'}" class="card-img-top" alt="..." >
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Valor: ${product.value}</p>
                        <a href="#" class="btn btn-warning edit-btn" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#editModal">Editar</a>
                        <a href="#" class="btn btn-danger delete-btn" data-id="${product.id}">Eliminar</a>
                    </div>
                </div
            `;

            const il = document.createElement("li");
            il.innerHTML = myhtml;
            list.appendChild(il);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEditClick);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDeleteClick);
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });
}


function handleEditClick(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0"
        }
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductTitle').value = product.title;
        document.getElementById('editProductDescription').value = product.description;
        document.getElementById('editProductValue').value = product.value;
        document.getElementById('editProductImage').value = JSON.parse(product.images)[0] || '';
    })
    .catch(error => {
        console.error('Error al cargar los datos del producto:', error);
    });
}

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('editProductId').value;
    const title = document.getElementById('editProductTitle').value;
    const description = document.getElementById('editProductDescription').value;
    const value = parseFloat(document.getElementById('editProductValue').value);
    const image = document.getElementById('editProductImage').value;

    const body = JSON.stringify({
        title: title,
        description: description,
        value: value,
        images: [image]
    });

    console.log("Datos enviados para actualizar:", body);

    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0"
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        if (data) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            modal.hide();
            loadProducts();  // Recargar los productos después de actualizar
        } else {
            alert('Error al guardar cambios');
        }
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
    });
});

function handleDeleteClick(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');

    console.log('ID del producto a eliminar:', id);

    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0"
        }
    })
    .then(response => {
        if (response.ok) {
            // Eliminar el producto del DOM
            event.target.closest('.card').parentElement.remove();
        } else {
            alert('Error al eliminar el producto');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
    });
}

// Agregar la funcionalidad para crear productos
document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const value = parseFloat(document.getElementById('productValue').value);
    const image = document.getElementById('productImage').value;

    const body = JSON.stringify({
        title: title,
        description: description,
        value: value,
        images: [image]
    });

    console.log("Datos enviados para crear:", body);

    fetch('https://fake-api-vq1l.onrender.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoicy5jYWJhbGxlcm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNjcwNTYwOSwiZXhwIjoxNzQzOTg1NjA5fQ.Z6zJ0iXgU9k_DrriwksKbBeD06t0Q5FgGGlql3NGaB0"
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        if (data) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('createProductModal'));
            modal.hide();
            loadProducts();  // Recargar los productos después de crear
        } else {
            alert('Error al crear el producto');
        }
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
    });
});

// Funcionalidad para el desplegable de ciudades
document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.getElementById('citySelect');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');
    const filterBtn = document.getElementById('filterBtn');
    
    // Event listener para el cambio de ciudad
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            const selectedCity = this.value;
            console.log('Ciudad seleccionada:', selectedCity);
            
            if (selectedCity) {
                // Aquí puedes agregar lógica para filtrar por ciudad
                filterByCity(selectedCity);
            } else {
                // Mostrar todos los productos si no hay ciudad seleccionada
                loadProducts();
            }
        });
    }
    
    // Event listener para búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Buscando:', searchTerm);
            
            if (searchTerm.length >= 2) {
                searchProducts(searchTerm);
            } else if (searchTerm.length === 0) {
                loadProducts();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            searchProducts(searchTerm);
        });
    }
    
    // Event listener para ordenamiento
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            console.log('Ordenando por:', sortValue);
            sortProducts(sortValue);
        });
    }
    
    // Event listener para filtros avanzados
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            showAdvancedFilters();
        });
    }
});

// Función para filtrar por ciudad
function filterByCity(city) {
    // Esta función se puede expandir para filtrar productos por ciudad
    console.log('Filtrando por ciudad:', city);
    
    // Por ahora, solo mostramos un mensaje
    const container = document.getElementById('list');
    if (container) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info" role="alert">
                    <h5>Filtro por ciudad activado</h5>
                    <p>Mostrando motos disponibles en: <strong>${getCityName(city)}</strong></p>
                    <button class="btn btn-outline-primary btn-sm" onclick="loadProducts()">Ver todas las motos</button>
                </div>
            </div>
        `;
    }
}

// Función para obtener el nombre de la ciudad
function getCityName(cityValue) {
    const cityNames = {
        'bogota': 'Bogotá D.C.',
        'medellin': 'Medellín',
        'cali': 'Cali',
        'barranquilla': 'Barranquilla',
        'cartagena': 'Cartagena',
        'bucaramanga': 'Bucaramanga',
        'pereira': 'Pereira',
        'santa-marta': 'Santa Marta',
        'ibague': 'Ibagué',
        'pasto': 'Pasto',
        'manizales': 'Manizales',
        'villavicencio': 'Villavicencio',
        'neiva': 'Neiva',
        'armenia': 'Armenia',
        'valledupar': 'Valledupar',
        'monteria': 'Montería',
        'santa-rosa': 'Santa Rosa de Cabal',
        'tunja': 'Tunja',
        'florencia': 'Florencia',
        'popayan': 'Popayán',
        'sincelejo': 'Sincelejo',
        'riohacha': 'Riohacha',
        'quibdo': 'Quibdó',
        'arauca': 'Arauca',
        'yopal': 'Yopal',
        'mocoa': 'Mocoa',
        'leticia': 'Leticia',
        'inirida': 'Inírida',
        'san-jose': 'San José del Guaviare',
        'puerto-carreno': 'Puerto Carreño',
        'mitú': 'Mitú'
    };
    
    return cityNames[cityValue] || cityValue;
}

// Función para buscar productos
function searchProducts(searchTerm) {
    console.log('Buscando productos con término:', searchTerm);
    
    // Esta función se puede expandir para buscar en los productos cargados
    const container = document.getElementById('list');
    if (container) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <h5>Búsqueda activada</h5>
                    <p>Buscando: <strong>"${searchTerm}"</strong></p>
                    <button class="btn btn-outline-primary btn-sm" onclick="loadProducts()">Ver todos los productos</button>
                </div>
            </div>
        `;
    }
}

// Función para ordenar productos
function sortProducts(sortValue) {
    console.log('Ordenando productos por:', sortValue);
    
    // Esta función se puede expandir para ordenar los productos cargados
    const container = document.getElementById('list');
    if (container) {
        let sortText = '';
        switch(sortValue) {
            case 'price-low':
                sortText = 'Precio: Menor a Mayor';
                break;
            case 'price-high':
                sortText = 'Precio: Mayor a Menor';
                break;
            case 'name':
                sortText = 'Nombre A-Z';
                break;
        }
        
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-success" role="alert">
                    <h5>Ordenamiento aplicado</h5>
                    <p>Ordenando por: <strong>${sortText}</strong></p>
                    <button class="btn btn-outline-primary btn-sm" onclick="loadProducts()">Ver productos originales</button>
                </div>
            </div>
        `;
    }
}

// Función para mostrar filtros avanzados
function showAdvancedFilters() {
    alert('Filtros avanzados - Funcionalidad en desarrollo');
}