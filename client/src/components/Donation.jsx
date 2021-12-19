import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
let baseUrl = "http://192.168.100.2:5000";
// let baseUrl = "http://localhost:8000";

function Donation() {
  useEffect(() => {
    document.body.classList.add("donate-bg");
    return () => {
      document.body.classList.remove("donate-bg");
    };
  });
  const [inputData, setInputData] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setInputData({ ...inputData, [e.target.name]: value });
    console.log(inputData);
  };
  // Razor Pay
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(e) {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(`${baseUrl}/api/v1/payment/pay`, {
      amount: inputData.amount,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_NtEOx5syqQ1lru", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Darul Hikma",
      description: "Hidaya Nagar, Chemmad",
      image: "",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          email: inputData.email,
          phone: inputData.phone,
          name: inputData.name,
          amount: inputData.amount,
        };

        await axios.post(`${baseUrl}/api/v1/payment/success`, data);
      },
      prefill: {
        name: inputData.name,
        email: inputData.email,
        contact: inputData.phone,
      },
      notes: {
        address: "Janish Nehyan",
      },
      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <section id="login">
      <HelmetProvider>
        <Helmet>
          <title>Darul Hikma | Donation</title>
        </Helmet>
      </HelmetProvider>
      <div className="login">
        <div className="form">
          <h1>Donate A Book </h1>
          <form className="login-form">
            <input
              type="text"
              placeholder="name"
              required
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="email"
              required
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={handleChange}
            />
            <input
              type="phone"
              placeholder="phone"
              required
              name="phone"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={handleChange}
            />
            <label htmlFor="">Amount </label>
            <input
              type="text"
              name="amount"
              onChange={handleChange}
              className="amount"
            />
            <button
              className="donate-btn"
              type="submit"
              onClick={displayRazorpay}
            >
              Donate{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Donation;
