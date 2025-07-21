import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_walecpd",
        "template_pv6qe21",
        form.current,
        "zEFgvzt9ZxWipYL_z"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current.reset();
          setFormTouched(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        () => {
          toast.error("Failed to send message. Try again later.");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formTouched) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formTouched]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const handleInputChange = () => {
    if (!formTouched) setFormTouched(true);
  };

  return (
    <div className="contact-section" onKeyDown={handleKeyDown}>
      <Navbar />
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>
          Have a question, feedback, or reservation inquiry? We'd love to hear from you!
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <div className="form-parent-container">
        <div className="form-container">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          borderRadius: "12px",
          background: "#1E1E1E",
          color: "#FFD700",
          boxShadow: "0 6px 20px rgba(253, 198, 0, 0.12)",
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
          fontSize: "1.1rem",
        }}
      />
    </div>
  );
};

export default Contact;
