const BATAS_AMAN = 25;
const BATAS_MAKSIMUM = 50;

// Load data saat halaman dibuka
document.addEventListener("DOMContentLoaded", function () {
    tampilkanRiwayat();
});

// Fungsi utama
function hitungGula() {
    const tanggal = document.getElementById("tanggal").value;
    const makanan = document.getElementById("makanan").value;
    const gulaPerSajian = parseFloat(document.getElementById("gula").value);
    const jumlahSajian = parseFloat(document.getElementById("sajian").value);

    if (!tanggal || !makanan || isNaN(gulaPerSajian) || gulaPerSajian <= 0) {
        alert("Lengkapi tanggal, makanan, dan gula per sajian dengan benar.");
        return;
    }

    // LOGIKA OPSIONAL
    let totalGula = gulaPerSajian;
    if (!isNaN(jumlahSajian) && jumlahSajian > 0) {
        totalGula = gulaPerSajian * jumlahSajian;
    }

    let status = "";
    if (totalGula <= BATAS_AMAN) {
        status = "Aman";
    } else if (totalGula <= BATAS_MAKSIMUM) {
        status = "Waspada";
    } else {
        status = "Berlebih";
    }

    const data = {
        tanggal: tanggal,
        makanan: makanan,
        gula: totalGula,
        status: status
    };

    simpanRiwayat(data);
    tampilkanHasil(totalGula, status);
    updateIndikator(totalGula);
    tampilkanRiwayat();
}



// Simpan ke localStorage (array)
function simpanRiwayat(dataBaru) {
    let riwayat = JSON.parse(localStorage.getItem("riwayatGula")) || [];
    riwayat.push(dataBaru);
    localStorage.setItem("riwayatGula", JSON.stringify(riwayat));
}

// Tampilkan hasil
function tampilkanHasil(total, status) {
    document.getElementById("hasil").innerText =
        `Total konsumsi gula: ${total} gram — Status: ${status}`;
}

// Update progress bar
function updateIndikator(total) {
    const bar = document.getElementById("bar");
    let persen = (total / BATAS_MAKSIMUM) * 100;
    if (persen > 100) persen = 100;

    bar.style.width = persen + "%";

    if (total <= BATAS_AMAN) {
        bar.style.backgroundColor = "green";
    } else if (total <= BATAS_MAKSIMUM) {
        bar.style.backgroundColor = "orange";
    } else {
        bar.style.backgroundColor = "red";
    }
}

// Tampilkan riwayat
function tampilkanRiwayat() {
    const list = document.getElementById("riwayat");
    const riwayat = JSON.parse(localStorage.getItem("riwayatGula")) || [];

    list.innerHTML = "";

    if (riwayat.length === 0) {
        list.innerHTML = "<li>Belum ada riwayat</li>";
        return;
    }

    riwayat.forEach(item => {
        const li = document.createElement("li");
        li.textContent =
            `${item.tanggal} - ${item.makanan} (${item.gula} gram, ${item.status})`;
        list.appendChild(li);
    });
}
