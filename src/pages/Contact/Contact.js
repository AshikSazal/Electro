import React from "react";

import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-us">
    <h1>Contact Us</h1>
      <div>
      <p>
        Thank you for visiting our website! We're always here to help with any
        questions or concerns you may have about our products or services.
        Here's how you can get in touch with us:
      </p>

      <h2>Email</h2>
      <p>
        You can reach us via email at{" "}
        <a href="mailto:info@store.com">info@store.com</a>. We'll do our
        best to respond to your inquiry as soon as possible.
      </p>

      <h2>Phone</h2>
      <p>
        If you prefer to speak to someone directly, you can give us a call at{" "}
        <a href="tel:+15551234567">+1 (555) 123-4567</a>. Our customer service
        team is available Monday through Friday from 9am to 5pm EST.
      </p>

      <h2>Live Chat</h2>
      <p>
        For immediate assistance, you can also chat with us live on our website.
        Simply click on the chat icon in the bottom right-hand corner of your
        screen and one of our representatives will be happy to assist you.
      </p>

      <h2>Social Media</h2>
      <p>
        You can also connect with us on social media. Follow us on Twitter (
        <a href="https://twitter.com/ourstore">@ourstore</a>) to stay up-to-date
        on the latest products, promotions, and news from our store. Feel free
        to send us a direct message on social media if you have any questions or
        concerns.
      </p>

      <p>
        At our store, we are committed to providing you with exceptional
        service, and we welcome any feedback you may have about your shopping
        experience with us. If you have any suggestions or comments, please
        don't hesitate to let us know.
      </p>

      <p>
        Thank you for choosing our e-commerce website for all your electronic
        product needs. We look forward to serving you and providing you with the
        best products and service possible.
      </p>
      </div>
    </div>
  );
};

export default Contact;
