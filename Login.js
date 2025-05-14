import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123456") {
      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang Home
    } else {
      alert("Sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center">Đăng nhập</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Mật khẩu:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
        </form>
        <hr />
        <p className="text-center">Hoặc đăng nhập bằng</p>
        <button className="btn btn-danger w-100">Google</button>
        <button className="btn btn-primary w-100 mt-2">Facebook</button>
      </div>
    </div>
  );
}

export default Login;