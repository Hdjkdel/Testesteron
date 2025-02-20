document.addEventListener('DOMContentLoaded', () => {
    // Tüm link tıklamalarını yakala
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && !link.target && !link.hasAttribute('download')) {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Korumalı sayfalara yönlendirme
            if (href.endsWith('.html') && !href.includes('index.html')) {
                const token = localStorage.getItem('token');
                if (token) {
                    fetch(href, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                window.location.href = href;
                            } else {
                                window.location.href = 'index.html';
                            }
                        })
                        .catch(() => {
                            window.location.href = 'index.html';
                        });
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                window.location.href = href;
            }
        }
    });
});