// Function to make an AJAX request
function fetchProducts() {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    // Clear the product list
    productList.innerHTML = '';
    // Fetch the products.json file
    fetch('https://cynthiaesthermetilda.github.io/Xhrdemo/products.json')
    .then(response => response.json())
    .then(data => {
        // Filter products based on search keyword
        const keyword = searchInput.value.toLowerCase();
        const filteredProducts = data.filter(product =>
            product.name.toLowerCase().includes(keyword) ||product.description.toLowerCase().includes(keyword));
            // Sort products based on the selected sorting option
            const sortingOption = sortSelect.value;
            if (sortingOption === 'name') {
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortingOption === 'price') {
                filteredProducts.sort((a, b) => a.price - b.price);
            }
            // Generate HTML elements for each product
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                const productName = document.createElement('h2');
                productName.textContent = product.name;
                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;
                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.name;
                productDiv.appendChild(productName);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productImage);
                productList.appendChild(productDiv);
            });
         })
         .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    // Add event listeners for search and sort
     document.getElementById('searchInput').addEventListener('input', fetchProducts);
      document.getElementById('sortSelect').addEventListener('change', fetchProducts);
      // Initial fetch to load products
      fetchProducts();