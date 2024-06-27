import React, { useState } from "react";
import NiceSelect from "../ui/nice-select";
import axios from 'axios';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:54321/send-email', {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
      });
      console.log(response.data);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('There was an error sending the email!', error);
      alert('Error sending email.');
    }
  };

  const selectHandler = (e) => {};

  return (
    <>
      <form onSubmit={handleSubmit} className="box">
        <div className="row gx-20">
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                type="text"
                className="inputText"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Full Name</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                type="email"
                className="inputText"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Your Email</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-35">
              <input
                type="text"
                className="inputText"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Phone Number</span>
            </div>
          </div>
          {/* <div className="col-12">
            <div className="postbox__select mb-30">
              <NiceSelect
                options={[
                  { value: "Your Inquiry about", text: "Your Inquiry about" },
                  { value: "01 Year", text: "01 Year" },
                  { value: "02 Year", text: "02 Year" },
                  { value: "03 Year", text: "03 Year" },
                  { value: "04 Year", text: "04 Year" },
                  { value: "05 Year", text: "05 Year" },
                ]}
                defaultCurrent={0}
                onChange={selectHandler}
              />
            </div>
          </div> */}
          <div className="col-xxl-12">
            <div className="postbox__comment-input mb-30">
              <textarea
                className="textareaText"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <span className="floating-label-2">Message...</span>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__btn-box">
              <button className="submit-btn w-100">Send your Request</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactUsForm;
