document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Selektor Elemen Penting ---
    const productButtons = document.querySelectorAll('.tambah-keranjang');
    const paymentRadios = document.querySelectorAll('input[name="metode_bayar"]');
    const detailContainers = document.querySelectorAll('.detail-bayar');
    
    // Elemen Tampilan Checkout
    const cartList = document.getElementById('daftar-keranjang');
    const totalBelanjaSpan = document.getElementById('total-belanja');
    const ongkirSpan = document.getElementById('ongkir');
    const grandTotalSpan = document.getElementById('grand-total');
    
    // Elemen Form dan Peringatan
    const checkoutForm = document.getElementById('pembayaran-form');
    const checkoutButton = document.getElementById('checkout-button');
    const keranjangPeringatan = document.getElementById('peringatan-keranjang');
    
    // --- 2. Variabel Status Keranjang & Biaya ---
    let cart = [];
    const SHIPPING_COST = 10000;
    const COD_FEE = 5000;
    let currentOngkir = SHIPPING_COST;
    let currentFee = 0;


    // --- 3. Fungsi Utility: Formatting Harga ---

    // Fungsi untuk memformat harga ke Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }

    // --- 4. Fungsi Logika Keranjang & Total ---

    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const finalTotal = subtotal + currentOngkir + currentFee;
        
        // Update Tampilan
        totalBelanjaSpan.textContent = formatRupiah(subtotal);
        ongkirSpan.textContent = formatRupiah(currentOngkir);
        grandTotalSpan.textContent = formatRupiah(finalTotal);

        // Kontrol Tombol dan Peringatan
        if (subtotal > 0) {
            checkoutButton.disabled = false;
            keranjangPeringatan.style.display = 'none';
        } else {
            checkoutButton.disabled = true;
            keranjangPeringatan.style.display = 'block';
        }
        
        return { subtotal, finalTotal };
    }

    function updateCartList() {
        cartList.innerHTML = ''; // Kosongkan daftar keranjang
        
        if (cart.length === 0) {
            cartList.innerHTML = '<li>Keranjang belanja Anda masih kosong.</li>';
        }

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} (${formatRupiah(item.price)}) x ${item.quantity} 
                = <strong>${formatRupiah(item.price * item.quantity)}</strong> 
                <button class="hapus-item" data-index="${index}">[X]</button>
            `;
            cartList.appendChild(listItem);
        });

        // Tambahkan event listener untuk tombol hapus
        document.querySelectorAll('.hapus-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemIndex = parseInt(this.getAttribute('data-index'));
                cart.splice(itemIndex, 1); // Hapus 1 item dari array
                updateCartList();
                calculateTotals();
            });
        });
    }

    // Event Listener untuk tombol "Tambah ke Keranjang"
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-nama');
            const productPrice = parseInt(this.getAttribute('data-harga'));

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            alert(`${productName} berhasil ditambahkan!`);
            updateCartList();
            calculateTotals();
        });
    });
    
    // --- 5. Logika Pilihan Pembayaran & Biaya ---

    function hideAllDetails() {
        detailContainers.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            hideAllDetails(); 
            const selectedValue = event.target.value;
            const detailElement = document.querySelector(`.${selectedValue}-detail`);
            
            currentFee = 0;
            if (selectedValue === 'cod') {
                currentFee = COD_FEE;
            }
            
            if (detailElement) {
                detailElement.style.display = 'block';
            }
            
            calculateTotals(); 
        });
    });

    hideAllDetails();
    
    // --- 6. Simulasi Proses Checkout (Form Submit) ---

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const { subtotal, finalTotal } = calculateTotals();
        
        if (subtotal === 0) {
             alert('Keranjang belanja Anda masih kosong.');
             return;
        }

        const selectedMethod = document.querySelector('input[name="metode_bayar"]:checked');
        const deliveryInfo = {
            nama: document.getElementById('nama').value,
            alamat: document.getElementById('alamat').value,
            telepon: document.getElementById('telepon').value
        };
        const method = selectedMethod.value.toUpperCase();
        
        // KIRIM KE WHATSAPP
        sendToWhatsApp(deliveryInfo, method, subtotal, finalTotal);
        
        alert(`Pesanan berhasil diproses! Silakan cek WhatsApp Anda untuk detail pesanan dan pembayaran.`);

        // Reset state setelah simulasi checkout
        cart = [];
        currentFee = 0;
        updateCartList();
        calculateTotals();
        checkoutForm.reset();
        hideAllDetails();
    });
    
    // --- 7. Fungsi Pengiriman ke WhatsApp (DIUPDATE) ---
    
    function getPackagingRecommendation(subtotal) {
        if (subtotal > 80000) {
            return "Karena jumlah pesanan besar, kami merekomendasikan **Kardus Ramah Lingkungan** agar buah aman (free biaya packaging).";
        } else if (subtotal > 40000) {
            return "Pilih salah satu: **(A) Paper Bag Ramah Lingkungan** atau **(B) Kantong Plastik Kuat**.";
        } else {
            return "Pilih salah satu: **(A) Paper Bag** atau **(B) Kantong Plastik** (standar).";
        }
    }

    function sendToWhatsApp(info, method, subtotal, finalTotal) {
        const date = new Date().toLocaleDateString('id-ID');
        
        // 1. Buat detail item
        let itemDetails = cart.map(item => 
            `  - ${item.name} (${formatRupiah(item.price)}) x ${item.quantity} = ${formatRupiah(item.price * item.quantity)}`
        ).join('\n');
        
        // 2. Tentukan deskripsi pembayaran
        let paymentDescription = `Metode Pembayaran: *${method}*`;
        let paymentInstruction = "";
        
        if (method === 'TRANSFER') {
            paymentDescription = `Transfer Bank`;
            paymentInstruction = `*Instruksi:* Segera transfer ${formatRupiah(finalTotal)} ke BCA 1234567890 (a.n. Toko Buah Segar) dan kirim bukti transfer.`;
        } else if (method === 'COD') {
            paymentDescription = `Cash On Delivery (COD)`;
            paymentInstruction = `*Instruksi:* Siapkan uang tunai sebesar ${formatRupiah(finalTotal)} saat kurir tiba. Biaya COD: ${formatRupiah(COD_FEE)}.`;
        } else if (method === 'EWALLET') {
            paymentDescription = `E-Wallet`;
            paymentInstruction = `*Instruksi:* Link pembayaran E-Wallet akan dikirim setelah konfirmasi pesanan.`;
        }
        
        // 3. Tentukan rekomendasi packaging
        const packaging = getPackagingRecommendation(subtotal);

        // 4. Susun teks pesan
        const messageText = `
*--- 🧾 DETAIL PESANAN TOKO BUAH SEGAR ---*
Tanggal: ${date}

*INFORMASI PELANGGAN*
Nama: ${info.nama}
Telepon: ${info.telepon}
Alamat: ${info.alamat}

*ITEM PESANAN*
${itemDetails}

*RINGKASAN BIAYA*
Subtotal: ${formatRupiah(subtotal)}
Ongkos Kirim: ${formatRupiah(SHIPPING_COST)}
Biaya Layanan (${paymentDescription === 'Cash On Delivery (COD)' ? 'COD' : 'Lain-lain'}): ${formatRupiah(currentFee)}
*TOTAL BAYAR: ${formatRupiah(finalTotal)}*

*INSTRUKSI PEMBAYARAN*
Metode: ${paymentDescription}
${paymentInstruction}

*REKOMENDASI PACKAGING*
> ${packaging}
> Mohon balas pesan ini dengan pilihan packaging Anda (A/B/Kardus).

Terima kasih atas pesanannya! Kami akan segera memproses.
        `.trim();

        // 5. Buat link WhatsApp
        // Menggunakan nomor telepon yang dimasukkan user sebagai tujuan (jika valid, kalau tidak, ganti dengan nomor toko)
        const waNumber = info.telepon.startsWith('0') ? '62' + info.telepon.substring(1) : info.telepon;
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;
        
        // Buka jendela baru ke WhatsApp (Simulasi)
        window.open(waLink, '_blank');
    }
    
    // Inisialisasi awal
    updateCartList();
    calculateTotals();
});
