var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearField() {
  document.querySelector("#judul").value = "";
  document.querySelector("#penerbit").value = "";
  document.querySelector("#desc").value = "";
}

// Add Data
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Masukkan Nilai
  const judul = document.querySelector("#judul").value;
  const penerbit = document.querySelector("#penerbit").value;
  const desc = document.querySelector("#desc").value;

  // validasi
  if (judul == "" || penerbit == "" || desc == "") {
    showAlert("Masukkan tidak boleh Kosong", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#book-list");
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${judul}</td>
            <td>${penerbit}</td>
            <td>${desc}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Buku di tambahkan", "success");
    } else {
      selectedRow.children[0].textContent = judul;
      selectedRow.children[1].textContent = penerbit;
      selectedRow.children[2].textContent = desc;
      selectedRow = null;
      showAlert("Info ubah data Buku", "info");
    }
    clearField();
  }
});

// Edit Data
document.querySelector("#book-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#judul").value = selectedRow.children[0].textContent;
    document.querySelector("#penerbit").value = selectedRow.children[1].textContent;
    document.querySelector("#desc").value = selectedRow.children[2].textContent;
  }
});

// Delete Data
document.querySelector("#book-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Data Buku Deleted", "danger");
  }
});
