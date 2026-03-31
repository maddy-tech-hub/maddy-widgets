import Card from './Card';
import '../../styles/css/CardSection.css';
import { cardInfo } from '@src/interfaces/card';
import SectionHeading from '@src/shared/ui/SectionHeading';

const CardSection: React.FC<{
  title: string;
  subtitle: string;
  cardInfoList: cardInfo[];
  borderColor?: string;
}> = ({ title, subtitle, cardInfoList, borderColor }) => {
  return (
    <section className="card-section">
      <div className="card-section-header">
        <SectionHeading title={title} subtitle={subtitle} />
      </div>
      <div className="card-section-grid">
        {cardInfoList.map((cardInfo, index) => (
          <Card key={index} {...cardInfo} borderColor={borderColor} />
        ))}
      </div>
    </section>
  );
};

export default CardSection;
