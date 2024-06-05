document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fullName = document.getElementById('full_name').value.trim();
    var password = document.getElementById('password').value;
    var notification = document.getElementById('notification');

    if (fullName.toLowerCase() === 'admin' && password === 'Password') {
        notification.textContent = 'Đăng nhập thành công';
        notification.className = 'notification success';
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
            window.location.href = 'AdminPanel.html';
        }, 2000);
    } else {
        notification.textContent = 'Tên tài khoản/Mật khẩu không đúng';
        notification.className = 'notification error';
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000);
    }
});