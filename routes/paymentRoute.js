const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");


const instance = new Razorpay({
  key_id: "rzp_test_NtEOx5syqQ1lru",
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/pay", async (req, res) => {
  try {
    let payData = await instance.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    res.status(200).json(payData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/success", async (req, res) => {
  try {
    // getting the details back from our font-end
    console.log(req.body);
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      name,
      email,
      phone,
      amount
    } = req.body;
    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

      await 
    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
