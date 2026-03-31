import styled, { keyframes } from 'styled-components';
import { tokens } from '@src/shared/theme/tokens';

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${tokens.gradient.hero};
  color: ${tokens.color.inkInverse};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8rem 1.5rem 5rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(16px);
    pointer-events: none;
  }

  &::before {
    width: 24rem;
    height: 24rem;
    top: 6rem;
    right: -5rem;
    background: rgba(17, 126, 255, 0.2);
  }

  &::after {
    width: 18rem;
    height: 18rem;
    left: -4rem;
    bottom: 4rem;
    background: rgba(255, 142, 95, 0.16);
  }

  @media (max-width: 980px) {
    padding: 6.5rem 1rem 4rem;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 18px rgba(17, 126, 255, 0.42), 0 0 44px rgba(17, 126, 255, 0.28), 0 0 88px rgba(255, 142, 95, 0.18);
  }
  50% {
    box-shadow: 0 0 22px rgba(25, 184, 155, 0.3), 0 0 56px rgba(255, 142, 95, 0.24), 0 0 102px rgba(17, 126, 255, 0.16);
  }
  100% {
    box-shadow: 0 0 18px rgba(17, 126, 255, 0.42), 0 0 44px rgba(17, 126, 255, 0.28), 0 0 88px rgba(255, 142, 95, 0.18);
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  grid-template-areas: 'text image';
  align-items: center;
  gap: clamp(2rem, 4vw, 4rem);
  max-width: 1200px;
  width: 100%;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'text';
    text-align: center;
  }
`;

export const Text = styled.div`
  grid-area: text;

  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    display: inline-flex;
    align-items: center;
    margin: 0 0 1rem;
    padding: 0.55rem 0.95rem;
    border-radius: ${tokens.radius.pill};
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(248, 251, 255, 0.92);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: #7fdfff;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0.95rem 0 0;
    font-size: clamp(2.5rem, 5vw, 4.25rem);
    color: ${tokens.color.inkInverse};
    font-weight: 800;
    line-height: 1.02;
  }

  h3 {
    margin: 1rem 0 0;
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    font-weight: 500;
    line-height: 1.45;

    span {
      color: #53d8ff;
      font-weight: 800;
    }
  }

  p {
    margin: 1.2rem 0 0;
    max-width: 39rem;
    color: rgba(248, 251, 255, 0.78);
    font-size: 1rem;
    line-height: 1.9;
  }
`;

export const ImageContainer = styled.div`
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 980px) {
    margin-bottom: 2.5rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: min(420px, 82vw);
  height: min(420px, 82vw);
  border-radius: 50%;
  background: linear-gradient(135deg, #53d8ff, #117eff 45%, #ff8e5f);
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  animation: ${glow} 3s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    inset: 18px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: min(310px, 78vw);
    height: min(310px, 78vw);
  }

  @media (max-width: 480px) {
    width: min(240px, 72vw);
    height: min(240px, 72vw);
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 18%;
  border-radius: 50%;
`;

export const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;

  @media (max-width: 980px) {
    justify-content: center;
  }
`;

export const HighlightPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.5rem 0.95rem;
  border-radius: ${tokens.radius.pill};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(248, 251, 255, 0.92);
  font-size: 0.92rem;
  font-weight: 600;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.45rem;
  margin-top: 1.8rem;

  a {
    width: 46px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: #7fdfff;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  a:hover {
    color: ${tokens.color.inkInverse};
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
  }

  @media (max-width: 980px) {
    justify-content: center;
  }
`;

export const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.9rem;
  width: 100%;
  margin-top: 1.8rem;
`;

export const MetricCard = styled.div`
  padding: 1rem 1.1rem;
  border-radius: ${tokens.radius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
`;

export const MetricValue = styled.strong`
  display: block;
  color: ${tokens.color.inkInverse};
  font-size: 1.3rem;
  font-weight: 800;
`;

export const MetricLabel = styled.span`
  display: block;
  margin-top: 0.35rem;
  color: rgba(248, 251, 255, 0.76);
  font-size: 0.9rem;
`;

export const ButtonIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 980px) {
    align-items: center;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 1.45rem;

  @media (max-width: 980px) {
    justify-content: center;
  }

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
  }
`;
