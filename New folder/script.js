const BATAS_AMAN = 25;
const BATAS_MAKSIMUM = 50;

// Load data saat halaman dibuka
document.addEventListener("DOMContentLoaded", function () {
    tampilkanRiwayat();
});

// Fungsi utama
function hitungGula() {
    const makanan = document.getElementById("makanan").value;
    const gula = parseFloat(document.getElementById("gula").value);

    if (!makanan || isNaN(gula) || gula <= 0) {
        alert("Lengkapi data dengan benar.");
        return;
    }

    let status = "";
    if (gula <= BATAS_AMAN) {
        status = "Aman";
    } else if (gula <= BATAS_MAKSIMUM) {
        status = "Waspada";
    } else {
        status = "Berlebih";
    }

    const data = {
        tanggal: new Date().toLocaleDateString(),
        makanan: makanan,
        gula: gula,
        status: status
    };

    simpanRiwayat(data);
    tampilkanHasil(gula, status);
    updateIndikator(gula);
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
        `Total konsumsi gula: ${total} gram (${status})`;
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
