// main.js

// Xử lý mở tab đăng nhập / đăng ký
function openAuthTab(type) {
  const authUrl = type === 'login' ? 'login.html' : 'register.html';
  const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');
  const checkLogin = setInterval(() => {
      if (authWindow.closed) {
          clearInterval(checkLogin);
          if (localStorage.getItem('user')) {
              alert('Đăng nhập thành công!');
              location.reload();
          }
      }
  }, 1000);
}

document.querySelector('.login').addEventListener('click', () => openAuthTab('login'));
document.querySelector('.register').addEventListener('click', () => openAuthTab('register'));

// Xử lý tìm kiếm toàn trang
function searchContent() {
  const query = document.querySelector('.search-bar input').value.toLowerCase();
  const elements = document.querySelectorAll('h1, h2, h3, p, a');
  elements.forEach(el => {
      if (el.innerText.toLowerCase().includes(query)) {
          el.style.background = 'yellow';
          el.scrollIntoView({ behavior: 'smooth' });
      }
  });
}

document.querySelector('.search-bar button').addEventListener('click', searchContent);

// Gợi ý bệnh viện gần nhất
function suggestHospital() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          const hospitals = [
              { name: 'Bệnh viện Phương Đông', lat: 21.0285, lng: 105.8542, booking: 'booking-phuongdong.html' },
              { name: 'Phòng khám Đa khoa 5 Sao Hà Nội', lat: 21.015, lng: 105.850, booking: 'booking-5sao.html' }
          ];
          let nearest = hospitals[0];
          let minDistance = Number.MAX_VALUE;
          hospitals.forEach(hospital => {
              let distance = Math.sqrt(
                  Math.pow(userLocation.lat - hospital.lat, 2) +
                  Math.pow(userLocation.lng - hospital.lng, 2)
              );
              if (distance < minDistance) {
                  minDistance = distance;
                  nearest = hospital;
              }
          });
          if (confirm(`Vị trí của bạn gần ${nearest.name}, bạn có muốn đặt lịch không?`)) {
              window.location.href = nearest.booking;
          }
      });
  } else {
      alert('Trình duyệt không hỗ trợ định vị!');
  }function verifyEmail() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('emailPassword').value;
    if (email && password) {
        document.getElementById('registerDetails').style.display = 'block';
    } else {
        alert('Vui lòng nhập email và mật khẩu email trước!');
    }
}
}
