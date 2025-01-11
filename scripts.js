document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login');
    const registerSection = document.getElementById('register');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Tampilkan Form Daftar
    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    // Tampilkan Form Login
    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    // Proses Pendaftaran
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const regUsername = document.getElementById('reg-username').value.trim();
        const regPassword = document.getElementById('reg-password').value.trim();

        if (!regUsername || !regPassword) {
            showMessage('Username dan password harus diisi.', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === regUsername);

        if (userExists) {
            showMessage('Username sudah digunakan. Gunakan username lain.', 'error');
        } else {
            users.push({ username: regUsername, password: regPassword });
            localStorage.setItem('users', JSON.stringify(users));
            showMessage('Pendaftaran berhasil! Silakan login.', 'success');
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        }
    });

    // Proses Login (Selalu Berhasil)
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();

        // Simpan status login di localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username || 'Guest'); // Default ke "Guest" jika username kosong
        showMessage(`Login berhasil! Selamat datang, ${username || 'Guest'}.`, 'success');

        // Alihkan ke halaman beranda setelah berhasil login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
});

// Fungsi untuk menampilkan pesan
function showMessage(message, type) {
    const existingMessage = document.querySelector('.message-box');
    if (existingMessage) existingMessage.remove(); // Hapus pesan sebelumnya jika ada.

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    // Hapus pesan setelah 3 detik
    setTimeout(() => {
        if (messageBox) messageBox.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    const formTransaksi = document.getElementById('transaksiForm'); // Formulir transaksi
    const transaksiTable = document.querySelector('#daftar-transaksi table'); // Tabel transaksi

    // Fungsi untuk menangani submit form
    formTransaksi.addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah refresh halaman

        // Ambil nilai dari input form
        const namaTransaksi = document.getElementById('namaTransaksi').value.trim();
        const jumlah = document.getElementById('jumlah').value.trim();
        const kategori = document.getElementById('kategori').value.trim();

        // Validasi input
        if (!namaTransaksi || !jumlah || !kategori) {
            alert('Harap isi semua kolom!');
            return;
        }

        // Tambahkan baris baru ke tabel
        const tbody = transaksiTable.querySelector('tbody') || document.createElement('tbody');
        if (!transaksiTable.contains(tbody)) {
            transaksiTable.appendChild(tbody);
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${namaTransaksi}</td>
            <td>${jumlah}</td>
            <td>${kategori}</td>
            <td><button class="delete-btn">Hapus</button></td>
        `;

        // Tambahkan event listener untuk tombol hapus
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            row.remove(); // Hapus baris dari tabel
        });

        // Masukkan baris ke tabel
        tbody.appendChild(row);

        // Reset form setelah transaksi ditambahkan
        formTransaksi.reset();
    });
});
