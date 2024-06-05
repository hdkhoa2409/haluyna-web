document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();

    document.querySelectorAll('input[name="payment-method"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var cardInfo = document.getElementById('card-info');
            var confirmOrderBtn = document.getElementById('confirm-order-btn');

            if (this.value === 'card') {
                cardInfo.style.display = 'block';
                checkCardInfo();
            } else {
                cardInfo.style.display = 'none';
                confirmOrderBtn.disabled = false;
            }
        });
    });

    document.querySelector('form.customer-info').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Xóa tất cả món hàng trong giỏ hàng
        clearCart();
    
        // Hiển thị thông báo đặt hàng thành công
        var successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';
    
        // Chuyển hướng về trang chủ sau 3 giây
        setTimeout(function() {
            window.location.href = 'TrangChu.html';
        }, 3000);
    });

    function checkCardInfo() {
        var cardInputs = document.querySelectorAll('#card-info input');
        var confirmOrderBtn = document.getElementById('confirm-order-btn');
        var allFilled = true;

        cardInputs.forEach(function(input) {
            if (!input.value) {
                allFilled = false;
            }
        });

        confirmOrderBtn.disabled = !allFilled;
    }

    document.querySelectorAll('#card-info input').forEach(function(input) {
        input.addEventListener('input', checkCardInfo);
    });
});

function displayCartItems() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        var orderItemsContainer = document.getElementById("order-items");
        var totalPrice = 0;
        var totalQuantity = 0;

        cart.forEach(function(item) {
            var itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <div class="order-item">
                    <img src="${item.productImg}" alt="${item.productName}">
                    <div class="item-details">
                        <h3>${item.productName}</h3>
                        <p>Giá tiền: ${item.productPrice} đ</p>
                        <p>Số lượng: ${item.productQuantity}</p>
                    </div>
                </div>
            `;
            orderItemsContainer.appendChild(itemElement);

            totalPrice += parseFloat(item.productPrice.replace(/\./g, '')) * parseInt(item.productQuantity);
            totalQuantity += parseInt(item.productQuantity);
        });

        var totalAmountElement = document.getElementById("total-amount");
        totalAmountElement.querySelector("span").textContent = totalPrice.toLocaleString("de-DE");

        var totalQuantityElement = document.getElementById("total-quanity");
        totalQuantityElement.querySelector("span").textContent = totalQuantity;
    }
}

function clearCart() {
    localStorage.removeItem("cart");
}