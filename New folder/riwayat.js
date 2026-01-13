let chart;

// Saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    tampilkanRiwayat();
    tampilkanGrafik();
});

// Ambil data dari localStorage
function ambilData() {
    return JSON.parse(localStorage.getItem("riwayatGula")) || [];
}

// Urutkan berdasarkan tanggal
function urutkanTanggal(data) {
    return data.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
}

// Tampilkan tabel
function tampilkanRiwayat() {
    const tbody = document.getElementById("tabelRiwayat");
    let data = urutkanTanggal(ambilData());

    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Belum ada data</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.tanggal}</td>
            <td>${item.makanan}</td>
            <td>${item.gula}</td>
            <td>${item.status}</td>
            <td>
                <button onclick="hapusSatu(${index})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hapus satu data
function hapusSatu(index) {
    let data = urutkanTanggal(ambilData());
    data.splice(index, 1);
    localStorage.setItem("riwayatGula", JSON.stringify(data));
    refresh();
}

// Hapus semua data
function hapusSemua() {
    if (confirm("Yakin ingin menghapus semua riwayat?")) {
        localStorage.removeItem("riwayatGula");
        refresh();
    }
}

// Refresh tabel dan grafik
function refresh() {
    tampilkanRiwayat();
    tampilkanGrafik();
}

// Grafik Chart.js
function tampilkanGrafik() {
    const ctx = document.getElementById("grafikGula").getContext("2d");
    const data = urutkanTanggal(ambilData());

    const labels = data.map(item => item.tanggal);
    const values = data.map(item => item.gula);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Total Konsumsi Gula (gram)",
                data: values,
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Gram"
                    }
                }
            }
        }
    });
}
