const jumlahForm = 20;

for (let i = 0; i < jumlahForm; i++) {
    document.write(`
        <div class="col-12 col-md-6">
            <label id="panjang${i}" for="data${i}" class="form-label font-weight-light mt-2 mb-0">Essay ke ${i + 1}</label>
            <textarea id="data${i}" class="form-control shadow"></textarea>
        </div>
    `);
}

// Fungsi untuk menghitung karakter dan mengupdate span
function updateCharacterCount(id) {
    const textarea = document.getElementById(`data${id}`);
    const characterCountSpan = document.getElementById(`panjang${id}`);

    return () => {
        const text = textarea.value;
        const characterCount = text.length;
        const nomor = id + 1;
        characterCountSpan.textContent = `Essay ke ${nomor} => Panjang ${characterCount} karakter.`;
    };
}

// Fungsi untuk menyimpan data ke localStorage
function saveDataToLocalStorage(id) {
    const textarea = document.getElementById(`data${id}`);
    const text = textarea.value;
    localStorage.setItem(`savedData${id}`, text);
}

// Loop untuk menambahkan event listener dan set interval untuk setiap elemen
for (let i = 0; i < jumlahForm; i++) {
    const textarea = document.getElementById(`data${i}`);

    // Event listener untuk mengupdate karakter saat pengguna mengetik di textarea
    textarea.addEventListener("input", updateCharacterCount(i));

    // Event listener untuk menyimpan data ke localStorage setiap 5 detik
    setInterval(() => {
        saveDataToLocalStorage(i);
    }, 1000);

    // Fungsi untuk memeriksa dan memasukkan data dari localStorage saat halaman dimuat
    function loadDataFromLocalStorage(id) {
        const savedData = localStorage.getItem(`savedData${id}`);
        if (savedData) {
            textarea.value = savedData;
            updateCharacterCount(id)();
        }
    }

    // Panggil fungsi loadDataFromLocalStorage saat halaman dimuat
    loadDataFromLocalStorage(i);
}
