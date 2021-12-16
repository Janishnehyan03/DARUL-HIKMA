import React from "react";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1
        style={{ fontSize: "100px", fontWeight: "bold", textAlign: "center" }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "50px", fontWeight: "bold", textAlign: "center" }}>
        NOT FOUND
      </h2>
      <p style={{ textAlign: "center" }}>
        <span>{window.location.href}</span>    is not a valid URL
      </p>
    </div>
  );
}
