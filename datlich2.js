// Danh sách chuyên khoa theo bệnh viện
const chuyenKhoaData = {
  "phuongDong": ["Nội tổng quát", "Ngoại khoa", "Sản phụ khoa"],
  "5saoHaNoi": ["Nhi khoa", "Tim mạch", "Tai Mũi Họng"]
};

// Cập nhật chuyên khoa khi chọn bệnh viện
function capNhatChuyenKhoa() {
  let facility = document.getElementById("facility").value;
  let specialty = document.getElementById("specialty");
  
  chuyenKhoa.innerHTML = '<option value="">Chọn chuyên khoa</option>';
  
  if (facility && chuyenKhoaData[facility]) {
      chuyenKhoaData[facility].forEach(khoa => {
          let option = document.createElement("option");
          option.value = khoa;
          option.textContent = khoa;
          chuyenKhoa.appendChild(option);
      });
  }
}

// Kiểm tra vị trí và tìm bệnh viện gần nhất
function timBenhVienGanNhat() {
  fetch("https://ipapi.co/json/")
      .then(response => response.json())
      .then(data => {
          let khuVuc = data.region; // Lấy thông tin khu vực
          let benhVienGanNhat = document.getElementById("benhVienGanNhat");

          if (khuVuc.includes("Bắc Từ Liêm")) {
              // Giả sử vị trí cố định của 2 bệnh viện
              let viTriBenhVien = {
                  "phuongDong": { lat: 21.056, lon: 105.783 },
                  "5saoHaNoi": { lat: 21.050, lon: 105.770 }
              };

              let latUser = data.latitude;
              let lonUser = data.longitude;

              let khoangCach = (lat1, lon1, lat2, lon2) => 
                  Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2);

              let benhVienGan =
                  khoangCach(latUser, lonUser, viTriBenhVien.phuongDong.lat, viTriBenhVien.phuongDong.lon) <
                  khoangCach(latUser, lonUser, viTriBenhVien["5saoHaNoi"].lat, viTriBenhVien["5saoHaNoi"].lon)
                      ? "phuongDong"
                      : "5saoHaNoi";

              benhVienGanNhat.innerHTML = `
                  Bệnh viện gần nhất: <strong>${benhVienGan === "phuongDong" ? "Bệnh viện Phương Đông" : "Bệnh viện 5 Sao Hà Nội"}</strong>
                  <br><a href="#">Đặt lịch khám tại bệnh viện này</a>
              `;
          } else {
              benhVienGanNhat.innerHTML = "Nằm ngoài khu vực tìm kiếm";
          }
      })
      .catch(() => {
          document.getElementById("benhVienGanNhat").innerHTML = "Không thể xác định vị trí.";
      });
}

// Gọi hàm khi trang tải
window.onload = timBenhVienGanNhat;

