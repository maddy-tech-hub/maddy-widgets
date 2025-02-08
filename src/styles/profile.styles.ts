import styled, { keyframes } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Section = styled.section`
  background: linear-gradient(135deg, #0a192f, #020c1b);
  color: #ffffff;
  min-height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Stack content vertically */
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem; /* Add extra padding for smaller screens */
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #ff0066, 0 0 90px #ff0066;
  }
  50% {
    box-shadow: 0 0 25px #ff0066, 0 0 50px #ff0066, 0 0 100px #00d4ff, 0 0 150px #00d4ff;
  }
  100% {
    box-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #ff0066, 0 0 90px #ff0066;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'text image';
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Mobile layout: Single column */
    grid-template-areas:
      'image'
      'text';
    text-align: center;
  }
`;

export const Text = styled.div`
  grid-area: text; /* Assign this area to Text */
  h1 {
    font-size: 2.5rem;
    color: #ffffff;
    font-weight: 300;
  }

  h2 {
    font-size: 3rem;
    color: #00aaff;
    font-weight: bold;
  }

  h3 {
    font-size: 2rem;
    margin-top: 1rem;

    span {
      color: #00d4ff;
      font-weight: bold;
    }
  }

  p {
    margin-top: 1rem;
    color: #d9d9d9;
    line-height: 1.8;
    max-width: 500px;
  }
`;

export const ImageContainer = styled.div`
  grid-area: image; /* Assign to the grid area */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem; /* Space below the image to prevent overlap */

  @media (max-width: 768px) {
    margin-bottom: 3rem; /* Increase margin for smaller screens */
  }
`;

export const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(to right, #00aaff, #ff0066);
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${glow} 3s infinite ease-in-out;

  @media (max-width: 768px) {
    width: 250px; /* Reduce size for mobile */
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px; /* Further reduce size for very small screens */
    height: 200px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem; /* Consistent space between icons */
  font-size: 2rem;
  margin-top: 2rem;

  svg {
    color: #00aaff;
    cursor: pointer;
    transition: transform 0.3s, color 0.3s;

    &:hover {
      color: #ffffff;
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start; /* Keep icons aligned consistently */
    margin-top: 1rem; /* Slightly reduce margin on mobile */
  }
`;

export const ButtonIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const buttonStyles = `
  padding: 0.75rem 2rem;
  background: linear-gradient(to right, #00aaff, #0077cc);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(to right, #0077cc, #005f99);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex-shrink: 0; /* Prevent button shrinkage in mobile */
  }
`;

export const InternalLink = styled(RouterLink)`
  ${buttonStyles};
`;

export const ExternalLink = styled.a`
  ${buttonStyles}
`;
