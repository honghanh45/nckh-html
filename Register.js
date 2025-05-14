import React from "react";

function Register() {
  return (
    <div className="register-container">
      <h2>Đăng Ký</h2>
      <input type="text" placeholder="Họ và Tên" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      <button>Đăng Ký</button>
    </div>
  );
}

export default Register;