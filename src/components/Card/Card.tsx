import { cardInfo } from '@src/interfaces/card';
import SurfaceCard from '@src/shared/ui/SurfaceCard';

const Card: React.FC<cardInfo & { borderColor?: string }> = ({
  title,
  subTitle,
  details = [],
  duration,
  linkTitle,
  url,
  borderColor,
}) => {
  return (
    <SurfaceCard className="card" accentColor={borderColor}>
      <h3 className="card-title">{title}</h3>
      {subTitle && <h4 className="card-subtitle">{subTitle}</h4>}
      <ul className="card-details">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <p className="card-duration">{duration}</p>
      {url && (
        <a
          href={url}
          className="card-link"
          style={{ color: `${borderColor || '#003366'}` }}
          rel="noopener noreferrer"
          target="_blank"
        >
          {`${linkTitle || 'View'}`}
        </a>
      )}
    </SurfaceCard>
  );
};

export default Card;
