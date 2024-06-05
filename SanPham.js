document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchProducts);
});

function searchProducts() {
    // Lấy giá trị loại trang phục và mức giá từ các trường input
    const productType = document.getElementById('productType').value;
    const priceRange = document.querySelector('input[name="priceRange"]:checked').value;

    // Gọi hàm hiển thị sản phẩm dựa trên các giá trị đã chọn
    displayFilteredProducts(productType, priceRange);
}

function displayFilteredProducts(productType, priceRange) {
    // Lấy danh sách tất cả các sản phẩm
    const allProducts = document.querySelectorAll('.new-product-box-wrapper');

    // Lặp qua từng sản phẩm để kiểm tra điều kiện và ẩn hoặc hiển thị tương ứng
    allProducts.forEach(product => {
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.querySelector('.gia').textContent);
        const [minPrice, maxPrice] = priceRange.split('-').map(parseFloat);

        // Kiểm tra điều kiện
        const matchesCategory = productCategory === productType || productType === 'all';
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

        // Ẩn hoặc hiển thị sản phẩm tùy thuộc vào điều kiện
        if (matchesCategory && matchesPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}