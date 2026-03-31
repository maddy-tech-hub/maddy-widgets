import styled from 'styled-components';
import { cardInfo } from '@src/interfaces/card';
import SurfaceCard from '@src/shared/ui/SurfaceCard';
import SmartLink from '@src/shared/ui/SmartLink';
import { tokens } from '@src/shared/theme/tokens';

const CardFrame = styled(SurfaceCard)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
`;

const TypeBadge = styled.span<{ $variant?: string }>`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0.3rem 0.72rem;
  border-radius: ${tokens.radius.pill};
  background: ${({ $variant }) =>
    $variant === 'personal'
      ? 'rgba(25, 184, 155, 0.12)'
      : 'rgba(17, 126, 255, 0.1)'};
  color: ${({ $variant }) =>
    $variant === 'personal' ? tokens.color.success : tokens.color.brandDark};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const Duration = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0.3rem 0.7rem;
  border-radius: ${tokens.radius.pill};
  background: rgba(17, 126, 255, 0.08);
  color: ${tokens.color.brandDark};
  font-size: 0.82rem;
  font-weight: 700;
`;

const Title = styled.h3`
  margin: 0;
  color: ${tokens.color.ink};
  font-size: 1.2rem;
`;

const Subtitle = styled.h4`
  margin: 0;
  color: ${tokens.color.inkMuted};
  font-size: 0.98rem;
  font-weight: 600;
`;

const Summary = styled.p`
  margin: 0.8rem 0 0;
  color: ${tokens.color.inkMuted};
  line-height: 1.75;
`;

const DetailList = styled.ul`
  display: grid;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 1rem;
    color: ${tokens.color.inkMuted};
    line-height: 1.7;

    &::before {
      content: '';
      position: absolute;
      top: 0.65rem;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${tokens.color.brand};
    }
  }
`;

const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const DetailPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0.35rem 0.75rem;
  border-radius: ${tokens.radius.pill};
  background: ${tokens.color.surfaceMuted};
  color: ${tokens.color.ink};
  font-size: 0.86rem;
  font-weight: 600;
`;

const CardLink = styled(SmartLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  color: ${tokens.color.brandDark};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${tokens.color.brand};
  }
`;

const Card: React.FC<cardInfo & { borderColor?: string }> = ({
  title,
  subTitle,
  summary,
  details = [],
  stack = [],
  duration,
  linkTitle,
  url,
  borderColor,
  type,
}) => {
  const compactDetails = details.every((detail) => detail.length <= 28);
  const typeLabel =
    type === 'personal'
      ? 'Personal Build'
      : type === 'professional'
        ? 'Production Project'
        : null;

  return (
    <CardFrame accentColor={borderColor}>
      <MetaRow>
        {typeLabel ? <TypeBadge $variant={type}>{typeLabel}</TypeBadge> : null}
        {duration ? <Duration>{duration}</Duration> : null}
      </MetaRow>
      <div>
        <Title>{title}</Title>
        {subTitle ? <Subtitle>{subTitle}</Subtitle> : null}
        {summary ? <Summary>{summary}</Summary> : null}
      </div>

      {stack.length > 0 ? (
        <PillList>
          {stack.map((item, index) => (
            <DetailPill key={`${item}-${index}`}>{item}</DetailPill>
          ))}
        </PillList>
      ) : null}

      {compactDetails ? (
        <PillList>
          {details.map((detail, index) => (
            <DetailPill key={`${detail}-${index}`}>{detail}</DetailPill>
          ))}
        </PillList>
      ) : (
        <DetailList>
          {details.map((detail, index) => (
            <li key={`${detail}-${index}`}>{detail.trim()}</li>
          ))}
        </DetailList>
      )}

      {url ? <CardLink href={url}>{linkTitle || 'View details'}</CardLink> : null}
    </CardFrame>
  );
};

export default Card;
