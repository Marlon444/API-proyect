// Archivo principal que inicializa la aplicación

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupPublicacionesEventListeners();
    setupLoginForm();
    setupRegisterForm();
    setupViewToggle();
});

function setupViewToggle() {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => switchView('grid'));
    }
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => switchView('list'));
    }
}

