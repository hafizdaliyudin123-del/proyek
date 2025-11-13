// --- 7. Fungsi Pengiriman ke WhatsApp (DIUPDATE) ---
    
    function getPackagingRecommendation(subtotal) {
        if (subtotal > 80000) {
            // Untuk pesanan besar, langsung rekomendasikan Kardus tanpa opsi A/B.
            return {
                recommendation: "Karena jumlah pesanan besar, kami merekomendasikan **Kardus Ramah Lingkungan** agar buah aman (free biaya packaging).",
                prompt: "Mohon balas pesan ini untuk mengkonfirmasi penggunaan Kardus Ramah Lingkungan."
            };
        } else if (subtotal > 40000) {
            // Untuk pesanan sedang, berikan pilihan eksplisit: Paper Bag atau Kantong Plastik Kuat.
            return {
                recommendation: "Pilih salah satu jenis kemasan: > **Paper Bag Ramah Lingkungan** atau > **Kantong Plastik Kuat**.",
                prompt: "Mohon balas pesan ini dengan pilihan packaging Anda (Paper Bag / Plastik)."
            };
        } else {
            // Untuk pesanan kecil, berikan pilihan Paper Bag atau Kantong Plastik standar.
            return {
                recommendation: "Pilih salah satu jenis kemasan: > **Paper Bag** atau > **Kantong Plastik** (standar).",
                prompt: "Mohon balas pesan ini dengan pilihan packaging Anda (Paper Bag / Plastik)."
            };
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
        
        // 3. Tentukan rekomendasi packaging yang sudah diperbaiki
        const { recommendation, prompt } = getPackagingRecommendation(subtotal);

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
> ${recommendation}
> ${prompt}

Terima kasih atas pesanannya! Kami akan segera memproses.
        `.trim();

        // 5. Buat link WhatsApp
        const waNumber = info.telepon.startsWith('0') ? '62' + info.telepon.substring(1) : info.telepon;
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;
        
        window.open(waLink, '_blank');
    }

// ... (lanjutkan dengan kode JS lainnya di bawah)
