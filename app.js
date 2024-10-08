// app.js

// Função para obter produtos do LocalStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Função para salvar produtos no LocalStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para adicionar novo produto
function addProduct(product) {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
    displayProducts();
}

// Função para listar produtos na tabela
function displayProducts() {
    const products = getProducts();
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para deletar produto
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    displayProducts();
}

// Função para editar produto
function editProduct(index) {
    const products = getProducts();
    const product = products[index];

    document.getElementById('name').value = product.name;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('price').value = product.price;

    // Remove produto antigo
    deleteProduct(index);
}

// Captura o evento de submissão do formulário
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    const product = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price)
    };

    addProduct(product);

    // Limpa o formulário
    document.getElementById('productForm').reset();
});

// Inicializa a tabela com os produtos
displayProducts();
