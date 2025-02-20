// Key ekleme fonksiyonu
function addKey() {
    let key = document.getElementById("keyInput").value;
    let file = document.getElementById("fileInput").value;

    if (!key || !file) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // LocalStorage'dan eski veriyi al
    let data = localStorage.getItem("keys");
    let keys = data ? JSON.parse(data) : {};

    // Yeni keyi ekle
    keys[key] = file;

    // Güncellenmiş veriyi kaydet
    localStorage.setItem("keys", JSON.stringify(keys));

    // JSON çıktısını güncelle
    showJson();
}

// JSON çıktısını ekranda göster
function showJson() {
    let data = localStorage.getItem("keys");
    let jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.textContent = data ? data : "{}";
}

// Sayfa açıldığında JSON verisini göster
showJson();
