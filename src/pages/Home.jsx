import React from "react";

const Home = () => {
  return (
    <div style={{ maxWidth: "30rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {/* รูปโปรไฟล์ */}
        <img
          src="./public/pic/tt.jpg"   // ✅ แก้แล้ว
          alt="Student Profile"
          width={150}
          height={150}
          style={{
            borderRadius: "9999px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            border: "4px solid #3b82f6",
            marginBottom: "1rem",
          }}
        />

        {/* ข้อมูลนักศึกษา */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>นายรัชภูมิ ธรรมประชา</h2>
        <p style={{ color: "#6b7280", margin: "0.5rem 0" }}>รหัสนักศึกษา: 67159224</p>

        {/* โลโก้ Facebook */}
        <div style={{ marginTop: "1rem" }}>
          <a href="https://www.facebook.com/rachapoom.thampracha" title="Facebook">
            <img
              src="./public/pic/OIP.webp"   // ✅ แก้แล้ว
              alt="Facebook"
              width={60}
              height={60}
              style={{ display: "inline-block" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
