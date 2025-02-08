// src/utils/getSocialIcon.tsx (Renamed to .tsx)
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaReddit,
  FaSnapchat,
  FaDiscord,
  FaTelegram,
  FaEnvelope,
} from 'react-icons/fa';

// Function to return the appropriate icon based on the platform name
export const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'whatsapp':
      return <FaWhatsapp />;
    case 'instagram':
      return <FaInstagram />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'gmail':
      return <FaEnvelope />;
    case 'github':
      return <FaGithub />;
    case 'facebook':
      return <FaFacebook />;
    case 'twitter':
      return <FaTwitter />;
    case 'youtube':
      return <FaYoutube />;
    case 'tiktok':
      return <FaTiktok />;
    case 'pinterest':
      return <FaPinterest />;
    case 'reddit':
      return <FaReddit />;
    case 'snapchat':
      return <FaSnapchat />;
    case 'discord':
      return <FaDiscord />;
    case 'telegram':
      return <FaTelegram />;
    default:
      return null;
  }
};
