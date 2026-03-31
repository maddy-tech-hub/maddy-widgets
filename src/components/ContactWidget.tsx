import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactWidgetProps } from '@src/interfaces/ContactWidget';
import Button from '@src/shared/ui/Button';
import SectionHeading from '@src/shared/ui/SectionHeading';
import '../styles/css/ContactWidget.css';

const ContactWidget: React.FC<ContactWidgetProps> = ({
  title,
  submitTitle,
  formFields,
  contactInfo,
  emailConfig,
  externalApiUrl,
  setLoading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<boolean | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const updatedData = { ...formData, [id]: value };

    setFormData(updatedData);
    validateForm(updatedData);
  };

  const validateForm = (data: Record<string, string>) => {
    const isValid = formFields.every(
      (field) => !field.required || (data[field.id]?.trim() || '').length > 0
    );
    setIsFormValid(isValid);
  };

  const setTransientMessage = (message: string, status: boolean) => {
    setPopupMessage(message);
    setPopupStatus(status);
    window.setTimeout(() => setPopupMessage(null), 5000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading?.(true);

    try {
      if (emailConfig) {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          formData,
          emailConfig.userId
        );
        setTransientMessage('Thank you. Your message has been sent.', true);
      } else if (externalApiUrl) {
        const response = await fetch(externalApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (response.ok) {
          setTransientMessage('Thank you. Your message has been sent.', true);
        } else {
          setTransientMessage(
            `Request failed: ${responseData.message || 'An error occurred.'}`,
            false
          );
        }
      }

      setFormData({});
      setIsFormValid(false);
    } catch (error) {
      console.error('Error during submission:', error);
      setTransientMessage('Something went wrong. Please try again.', false);
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <div className="contact-widget">
      {popupMessage ? (
        <div
          className={`thank-you-popup ${popupStatus ? 'success' : 'failure'}`}
        >
          {popupMessage}
        </div>
      ) : null}

      <div className="contact-form-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <SectionHeading title={title} />
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
          <Button
            type="submit"
            className="submit-button"
            disabled={!isFormValid}
          >
            {submitTitle}
          </Button>
        </form>
      </div>

      <div className="contact-info-section">
        {contactInfo.map((info, index) => (
          <div key={index} className="contact-info-item">
            <span className="contact-icon">{info.icon}</span>
            <div>
              <h4>{info.label}</h4>
              {typeof info.value === 'string' ? (
                <p>{info.value}</p>
              ) : (
                <div>{info.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactWidget;
