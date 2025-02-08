import React from 'react';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import ContactWidget from '../components/ContactWidget';
const Contact: React.FC = () => {
  const formFields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Your Name',
      required: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Your Phone Number',
      required: true,
    },
    {
      id: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Your Message',
      required: true,
    },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: 'Our Location',
      value:
        'No.143, 4th Cross, Prasanth Extension, Whitefield, Bangalore - 560066',
    },
    {
      icon: <FaPhoneAlt />,
      label: 'Urgent Call',
      value: (
        <>
          <p>+91 6362411428</p>
          <p>+91 9885414558</p>
        </>
      ),
    },
    {
      icon: <FaEnvelope />,
      label: 'Email Address',
      value: (
        <>
          <p>hr@irasah.com</p>
          <p>www.irasah.com</p>
        </>
      ),
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      value: 'Irasah_Innovations',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'Irasah Innovations',
    },
  ];

  return (
    <div className="parent-component">
      <ContactWidget
        title="Contact Me"
        submitTitle="Send Message"
        formFields={formFields}
        contactInfo={contactInfo}
        emailConfig={{
          serviceId: 'service_xyz',
          templateId: 'template_abc',
          userId: 'user_123',
        }}
        externalApiUrl="https://api.example.com/contact"
      />
    </div>
  );
};

export default Contact;
