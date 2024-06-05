document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemIdField = document.getElementById('itemId');
    const itemNameField = document.getElementById('itemName');
    const itemPriceField = document.getElementById('itemPrice');
    const itemDetailsField = document.getElementById('itemDetails');
    const itemImageField = document.getElementById('itemImage');
    const itemTableBody = document.getElementById('itemTableBody');
    const logoutButton = document.getElementById('logoutButton');

    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemTableBody.innerHTML = items.map((item, index) => `
            <tr>
                <td data-label="Image"><img src="${item.image}" alt="${item.name}" height="50"></td>
                <td data-label="Name">${item.name}</td>
                <td data-label="Price">${item.price} đ</td>
                <td data-label="Details">${item.details}</td>
                <td data-label="Actions" class="actions">
                    <button class="edit" onclick="editItem(${index})">Chỉnh sửa</button>
                    <button class="delete" onclick="deleteItem(${index})">Xóa</button>
                </td>
            </tr>
        `).join('');
    };

    const saveItem = (event) => {
        event.preventDefault();
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const itemId = itemIdField.value;
        const itemName = itemNameField.value;
        const itemPrice = parseFloat(itemPriceField.value);
        const itemDetails = itemDetailsField.value;
        const itemImage = itemImageField.files[0];

        if (itemPrice < 0) {
            alert('Giá tiền không được là số âm.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;

            if (itemId) {
                items[itemId] = { name: itemName, price: itemPrice, details: itemDetails, image: imageSrc };
            } else {
                items.push({ name: itemName, price: itemPrice, details: itemDetails, image: imageSrc });
            }

            localStorage.setItem('items', JSON.stringify(items));
            itemForm.reset();
            loadItems();
        };
        reader.readAsDataURL(itemImage);
    };

    window.editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items[index];
        itemIdField.value = index;
        itemNameField.value = item.name;
        itemPriceField.value = item.price;
        itemDetailsField.value = item.details;
    };

    window.deleteItem = (index) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            const items = JSON.parse(localStorage.getItem('items'));
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            loadItems();
        }
    };

    logoutButton.addEventListener('click', () => {
        window.location.href = 'TrangChu.html';
    });

    itemForm.addEventListener('submit', saveItem);
    loadItems();
});