import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/css/ContactWidget.css';
import { ContactWidgetProps } from '@src/interfaces/ContactWidget';

const ContactWidget: React.FC<ContactWidgetProps> = ({
  title,
  submitTitle,
  formFields,
  contactInfo,
  emailConfig,
  externalApiUrl,
  setLoading, // Passed from parent component to manage loading state
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<boolean | null>(null);

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const updatedData = { ...formData, [id]: value };

    setFormData(updatedData);
    validateForm(updatedData);
  };

  // Validate the form - all required fields must be filled
  const validateForm = (data: { [key: string]: string }) => {
    const isValid = formFields.every((field) => {
      return !field.required || (data[field.id]?.trim() || '').length > 0;
    });
    setIsFormValid(isValid);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set loading to true before making the API call
    if (setLoading) {
      setLoading(true);
    }

    try {
      if (emailConfig) {
        // Send with Email.js
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          formData,
          emailConfig.userId
        );
        setPopupMessage(
          '🎉 Thank you! Your message has been sent via Email.js.'
        );
        setPopupStatus(true);
      } else if (externalApiUrl) {
        // Send to external API
        const response = await fetch(externalApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        if (response.ok) {
          setPopupMessage(
            '🎉 Thank you! Your message has been sent successfully.'
          );
          setPopupStatus(true);
        } else {
          setPopupMessage(
            `❌ Failed: ${responseData.message || 'An error occurred.'}`
          );
          setPopupStatus(false);
        }
      }

      setFormData({}); // Reset form fields
    } catch (error) {
      console.error('Error during submission:', error);
      setPopupMessage('❌ Something went wrong. Please try again.');
      setPopupStatus(false);
    } finally {
      // Set loading to false after the API call is completed
      if (setLoading) {
        setLoading(false);
      }

      // Clear popup message after 5 seconds
      setTimeout(() => setPopupMessage(null), 5000);
    }
  };

  return (
    <div className="contact-widget">
      {popupMessage && (
        <div
          className={`thank-you-popup ${popupStatus ? 'success' : 'failure'}`}
        >
          {popupMessage}
        </div>
      )}

      {/* Contact Form Section */}
      <div className="contact-form-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>{title}</h2>
          {formFields.map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid} // Disable submit if the form is invalid
          >
            {submitTitle}
          </button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info-section">
        {contactInfo.map((info, index) => (
          <div key={index} className="contact-info-item">
            <span className="contact-icon">{info.icon}</span>
            <div>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactWidget;
