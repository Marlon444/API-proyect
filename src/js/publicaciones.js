// Variables globales para publicaciones
let allProducts = [];
let filteredProducts = [];
let currentView = 'grid';
let currentSort = '';

// Cargar productos desde MongoDB
function loadProducts() {
    showLoading(true);
    
    getProducts()
        .then(data => {
            console.log('Productos cargados:', data);
            allProducts = data;
            filteredProducts = [...allProducts];
            renderProducts();
            showLoading(false);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            showError('Error al cargar los productos. Asegúrate de que el servidor esté corriendo.');
            showLoading(false);
        });
}

function renderProducts() {
    const container = document.getElementById('productsContainer');
    const noProductsMessage = document.getElementById('noProductsMessage');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        if (noProductsMessage) {
            noProductsMessage.style.display = 'block';
        }
        return;
    }
    
    if (noProductsMessage) {
        noProductsMessage.style.display = 'none';
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    attachProductEventListeners();
}

function createProductCard(product) {
    const images = product.images || [];
    const mainImage = images[0] || 'default-image.jpg';
    
    // Obtener cilindraje
    const engineCC = product.engineCC || 'N/A';
    
    // Obtener año (si existe createdAt, usar ese año, sino año actual)
    let year = new Date().getFullYear();
    if (product.createdAt) {
        year = new Date(product.createdAt).getFullYear();
    }
    
    // Determinar si es nueva o usada (por defecto nueva)
    const status = product.status === 'sold' ? 'Usada' : 'Nueva';
    const badgeClass = product.status === 'sold' ? 'bg-secondary' : 'bg-success';
    
    const col = document.createElement('div');
    col.className = 'col-md-4';
    
    col.innerHTML = `
        <div class="card position-relative" style="border: none; border-radius: 12px; transition: transform 0.3s, box-shadow 0.3s;" data-id="${product._id}">
            <span class="badge ${badgeClass}" style="position: absolute; top: 10px; left: 10px; padding: 6px 10px; border-radius: 8px; font-size: 0.8rem;">${status}</span>
            <img src="${mainImage}" class="card-img-top" alt="${product.title}" style="border-radius: 12px 12px 0 0; height: 200px; object-fit: cover;" loading="lazy">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-muted">Motor ${engineCC}cc | Año ${year}</p>
                <p class="fw-bold text-dark">$${product.value.toLocaleString()} COP</p>
                <button class="btn btn-outline-dark w-100 view-details-btn" data-id="${product._id}">Ver detalles</button>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-warning edit-btn flex-fill" data-id="${product._id}" data-bs-toggle="modal" data-bs-target="#editModal" style="font-size: 0.85rem; padding: 0.4rem 0.5rem;">
                        <i class="bi bi-pencil-square me-1"></i>Editar
                    </button>
                    <button class="btn btn-danger delete-btn flex-fill" data-id="${product._id}" style="font-size: 0.85rem; padding: 0.4rem 0.5rem;">
                        <i class="bi bi-trash me-1"></i>Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function attachProductEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEditClick);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteClick);
    });

    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', handleViewDetails);
    });
}

function handleEditClick(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    
    getProduct(id)
        .then(product => {
            document.getElementById('editProductId').value = product._id;
            document.getElementById('editProductTitle').value = product.title;
            document.getElementById('editProductDescription').value = product.description;
            document.getElementById('editProductValue').value = product.value;
            document.getElementById('editProductImage').value = product.images[0] || '';
            document.getElementById('editProductEngineCC').value = product.engineCC || '';
        })
        .catch(error => {
            console.error('Error al cargar los datos del producto:', error);
            showError('Error al cargar los datos del producto');
        });
}

function handleDeleteClick(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const productTitle = event.target.closest('.card').querySelector('.card-title').textContent;

    if (!confirm(`¿Estás seguro de que quieres eliminar "${productTitle}"?`)) {
        return;
    }

    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Eliminando...';
    button.disabled = true;

    deleteProduct(id)
        .then(data => {
            allProducts = allProducts.filter(p => p._id != id);
            filteredProducts = filteredProducts.filter(p => p._id != id);
            renderProducts();
            showSuccess('Producto eliminado exitosamente');
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
            showError('Error al eliminar el producto. Intenta de nuevo.');
            button.innerHTML = originalText;
            button.disabled = false;
        });
}

function handleViewDetails(event) {
    event.preventDefault();
    const id = event.target.closest('.view-details-btn').getAttribute('data-id');
    const product = allProducts.find(p => p._id === id);
    
    if (!product) {
        showError('Producto no encontrado');
        return;
    }

    // Llenar el modal genérico con los datos del producto
    showProductDetailsModal(product);
}

function showProductDetailsModal(product) {
    const images = product.images || [];
    const mainImage = images[0] || 'default-image.jpg';
    
    // Obtener cilindraje del campo engineCC o usar N/A si no existe
    const engineCC = product.engineCC || 'N/A';
    
    // Extraer marca del título (simple, puedes mejorarlo)
    const brandMatch = product.title.match(/^(Hero|Yamaha|Suzuki|Honda|Kawasaki|AKT|TVS)/i);
    const brand = brandMatch ? brandMatch[1] : 'MotoMarket';
    
    // Crear o actualizar el modal
    let modal = document.getElementById('dynamicProductModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dynamicProductModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content product-modal-crema">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body product-modal-body-crema">
                    <div class="row g-0">
                        <!-- Columna de imagen -->
                        <div class="col-md-6">
                            <div class="product-image-wrapper-crema">
                                <img src="${mainImage}" alt="${product.title}" class="product-main-image-crema">
                            </div>
                        </div>
                        
                        <!-- Columna de información -->
                        <div class="col-md-6">
                            <div class="product-info-wrapper-crema">
                                <!-- Marca -->
                                <div class="brand-name-crema">${brand} Motos</div>
                                
                                <!-- Título -->
                                <h2 class="product-title-crema">${product.title}</h2>
                                
                                <!-- Precio -->
                                <div class="product-price-crema">
                                    <div class="price-label-crema">Desde</div>
                                    <div class="price-value-crema">$ ${product.value.toLocaleString()}</div>
                                </div>
                                
                                <!-- Especificaciones -->
                                <div class="product-spec-crema">
                                    <span class="spec-badge-crema">Moto Mecánica · ${engineCC}cc</span>
                                </div>
                                
                                <!-- Descripción -->
                                <div class="product-description-crema mt-3">
                                    <p>${product.description}</p>
                                </div>
                                
                                <!-- Botones de acción -->
                                <div class="product-actions-crema mt-4">
                                    <button class="btn btn-crema btn-lg me-2">Cotizar</button>
                                    <button class="btn btn-vinotinto btn-lg">Más información</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar el modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts();
}

function handleSort() {
    const sortValue = document.getElementById('sortSelect').value;
    currentSort = sortValue;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.value - b.value);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.value - a.value);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            filteredProducts = [...allProducts];
    }
    
    renderProducts();
}

function handleFilter() {
    console.log('Filtros avanzados - por implementar');
}

function switchView(view) {
    currentView = view;
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (view === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    }
    
    renderProducts();
}

// Configurar event listeners para publicaciones
function setupPublicacionesEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Filtros
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', handleFilter);
    }
    
    // Formulario de crear producto
    const createProductForm = document.getElementById('createProductForm');
    if (createProductForm) {
        createProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const title = document.getElementById('productTitle').value.trim();
            const description = document.getElementById('productDescription').value.trim();
            const value = parseFloat(document.getElementById('productValue').value);
            const image = document.getElementById('productImage').value.trim();
            const engineCC = parseInt(document.getElementById('productEngineCC').value);

            if (!title || !description || !value || !image || !engineCC) {
                showError('Por favor completa todos los campos');
                return;
            }

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Creando...';
            submitBtn.disabled = true;

            createProduct({
                title,
                description,
                value,
                images: [image],
                engineCC
            })
            .then(data => {
                if (data.error) {
                    showError(data.error);
                } else {
                    allProducts.unshift(data);
                    filteredProducts = [...allProducts];
                    const modal = bootstrap.Modal.getInstance(document.getElementById('createProductModal'));
                    modal.hide();
                    event.target.reset();
                    renderProducts();
                    showSuccess('Producto creado exitosamente');
                }
            })
            .catch(error => {
                console.error('Error al crear el producto:', error);
                showError('Error al crear el producto. Intenta de nuevo.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Formulario de editar producto
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const id = document.getElementById('editProductId').value;
            const title = document.getElementById('editProductTitle').value.trim();
            const description = document.getElementById('editProductDescription').value.trim();
            const value = parseFloat(document.getElementById('editProductValue').value);
            const image = document.getElementById('editProductImage').value.trim();
            const engineCC = parseInt(document.getElementById('editProductEngineCC').value);

            if (!title || !description || !value || !image || !engineCC) {
                showError('Por favor completa todos los campos');
                return;
            }

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Guardando...';
            submitBtn.disabled = true;

            updateProduct(id, {
                title,
                description,
                value,
                images: [image],
                engineCC
            })
            .then(data => {
                if (data.error) {
                    showError(data.error);
                } else {
                    const productIndex = allProducts.findIndex(p => p._id === id);
                    if (productIndex !== -1) {
                        allProducts[productIndex] = data;
                    }
                    const filteredIndex = filteredProducts.findIndex(p => p._id === id);
                    if (filteredIndex !== -1) {
                        filteredProducts[filteredIndex] = data;
                    }
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                    modal.hide();
                    renderProducts();
                    showSuccess('Producto actualizado exitosamente');
                }
            })
            .catch(error => {
                console.error('Error al actualizar el producto:', error);
                showError('Error al actualizar el producto. Intenta de nuevo.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

