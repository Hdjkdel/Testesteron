function checkAuth() {
    const username = localStorage.getItem('username');
    const loginTime = localStorage.getItem('loginTime');

    if (!username || !loginTime) {
        window.location.href = 'index.html';
        return false;
    }

    const lastLogin = new Date(loginTime);
    const now = new Date();
    const hoursSinceLogin = (now - lastLogin) / (1000 * 60 * 60);

    if (hoursSinceLogin > 24) {
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// Sayfa yüklendiğinde kontrol et
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('index.html') || currentPath === '/' || currentPath === '';
    const token = localStorage.getItem('token');

    // Login sayfasında ve token varsa coins.html'e yönlendir
    if (isLoginPage && token) {
        window.location.replace('coins.html');
        return;
    }

    // Korumalı sayfalarda token yoksa login'e yönlendir
    if (!isLoginPage && !token) {
        window.location.replace('index.html');
        return;
    }
});