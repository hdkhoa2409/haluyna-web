document.addEventListener("DOMContentLoaded", function() {
    loadCartFromLocalStorage();
    updateCartCount();
});

const btn = document.querySelectorAll("button[name='addToCart']");

btn.forEach(function(button, index) {
    button.addEventListener("click", function(event) {
        var btnItem = event.target;
        var product = btnItem.closest(".product");
        var productImg = product.querySelector(".hinh img").src;
        var productName = product.querySelector(".ten").innerText;
        var productPrice = product.querySelector(".gia").innerText;
        var productQuantity = parseInt(product.querySelector("input").value);
        addcart(productPrice, productImg, productName, productQuantity);
    });
});

function addcart(productPrice, productImg, productName, productQuantity) {
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".title");
        if (productT[i].innerHTML === productName) {
            alert("Sản phẩm đã tồn tại trong giỏ hàng. Mời bạn đến phần giỏ hàng để chỉnh số lượng");
            return;
        }
    }

    var addtr = document.createElement("tr");
    var trcontent = '<tr><td style="display: flex; align-items: center;"><img style="width: 70px;" src="' + productImg + '" alt><span class="title">' + productName + '</span></td><td><p><span class="prices">' + productPrice + '</span><sup>đ</sup></p></td><td class="quantity"><input style="width: 30px; outline: none;" type="number" value="' + productQuantity + '" min="1"></td><td style="cursor: pointer;"><span class="delete-product">Xóa</span></td></tr>';

    addtr.innerHTML = trcontent;
    var cartTable = document.querySelector("tbody");
    cartTable.prepend(addtr);

    saveCartToLocalStorage();
    cartTotal();
    deleteCart();
    inputChange();
    updateCartCount();
}

function cartTotal() {
    var cartItem = document.querySelectorAll("tbody tr");
    var totalA = 0;
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        var cProductPrice = cartItem[i].querySelector(".prices").innerHTML.replace(/\./g, '');
        totalA += (inputValue * parseInt(cProductPrice));
    }
    var cartTotalA = document.querySelector(".price-total span");
    var cartPrice = document.querySelector(".cart-icon span");
    cartTotalA.innerHTML = totalA.toLocaleString("de-DE");
    cartPrice.innerHTML = cartItem.length;
    saveCartToLocalStorage();
}

function deleteCart() {
    var cartItem = document.querySelectorAll("tbody tr");
    cartItem.forEach(function(item) {
        var deleteBtn = item.querySelector(".delete-product");
        deleteBtn.addEventListener("click", function() {
            item.remove();
            saveCartToLocalStorage();
            cartTotal();
            updateCartCount();
        });
    });
}

function inputChange() {
    var cartItem = document.querySelectorAll("tbody tr");
    cartItem.forEach(function(item) {
        var inputValue = item.querySelector("input");
        inputValue.addEventListener("change", function() {
            cartTotal();
        });
    });
}

function saveCartToLocalStorage() {
    var cartItems = document.querySelectorAll("tbody tr");
    var cart = [];
    cartItems.forEach(function(item) {
        var productImg = item.querySelector("img").src;
        var productName = item.querySelector(".title").innerText;
        var productPrice = item.querySelector(".prices").innerText;
        var productQuantity = item.querySelector("input").value;
        cart.push({ productImg, productName, productPrice, productQuantity });
    });
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        cart.forEach(function(item) {
            var addtr = document.createElement("tr");
            var trcontent = '<tr><td style="display: flex; align-items: center;"><img style="width: 70px;" src="' + item.productImg + '" alt><span class="title">' + item.productName + '</span></td><td><p><span class="prices">' + item.productPrice + '</span><sup>đ</sup></p></td><td class="quantity"><input style="width: 30px; outline: none;" type="number" value="' + item.productQuantity + '" min="1"></td><td style="cursor: pointer;"><span class="delete-product">Xóa</span></td></tr>';
            addtr.innerHTML = trcontent;
            var cartTable = document.querySelector("tbody");
            cartTable.prepend(addtr);
        });
        cartTotal();
        deleteCart();
        inputChange();
    }
}

function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var cartCount = 0;
    if (cart) {
        cartCount = cart.length;
    }
    var cartIconCount = document.querySelector(".cart-icon span");
    if (cartIconCount) {
        cartIconCount.innerText = cartCount;
    }
}

const cartbtn = document.querySelector(".fa-times")
const cartshow = document.querySelector(".fa-shopping-cart")
cartshow.addEventListener("click",function(){
    //console.log(cartshow)
    document.querySelector(".cart").style.right = "0"
})

cartbtn.addEventListener("click", function(){
    document.querySelector(".cart").style.right = "-100%"
})

document.querySelector("button[name='placeOrder']").addEventListener("click", function() {
    // Lấy dữ liệu từ localStorage
    var cart = JSON.parse(localStorage.getItem("cart"));

    // Kiểm tra nếu giỏ hàng đang trống
    if (!cart || cart.length === 0) {
        // Hiển thị thông báo
        alert("Giỏ hàng đang trống!");

        // Không chuyển đến trang xác nhận đặt hàng
        return;
    }

    // Nếu giỏ hàng không trống, lưu thông tin giỏ hàng vào localStorage
    saveCartToLocalStorage();

    // Chuyển sang trang xác nhận đặt hàng
    window.location.href = "XacNhanDatHang.html";
});

var endTime = new Date('2024-06-16T23:59:59').getTime();

// Cập nhật đồng hồ đếm ngược mỗi giây
var countdownClock = document.getElementById('countdown');
setInterval(function() {
    // Lấy thời gian hiện tại
    var now = new Date().getTime();

    // Tính thời gian còn lại
    var distance = endTime - now;

    // Tính toán các đơn vị thời gian
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị đồng hồ đếm ngược
    countdownClock.innerHTML = '<span style="color: red;">' + days + '</span> ngày ' +
                           '<span style="color: red;">' + hours + '</span> giờ ' +
                           '<span style="color: red;">' + minutes + '</span> phút ' +
                           '<span style="color: red;">' + seconds + '</span> giây ';

    // Kiểm tra nếu thời gian đã kết thúc
    if (distance < 0) {
        clearInterval(countdown);
        countdownClock.innerHTML = "Khuyến mãi đã kết thúc";
    }
}, 1000);

