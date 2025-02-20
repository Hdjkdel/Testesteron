document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            // Token'ı kaydet
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('loginTime', new Date().toISOString());

            // Yönlendirme yap
            document.location = 'coins.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
});

// Hata mesajı stili için CSS ekleyelim
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background: rgba(220, 38, 38, 0.1);
        color: #ef4444;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        border: 1px solid rgba(220, 38, 38, 0.2);
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);