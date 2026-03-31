import styled from 'styled-components';
import Card from './Card';
import { cardInfo } from '@src/interfaces/card';
import SectionHeading from '@src/shared/ui/SectionHeading';

const Section = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 0 0.5rem;
`;

const Header = styled.div`
  margin-bottom: 1.75rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
`;

const CardSection: React.FC<{
  title: string;
  subtitle: string;
  cardInfoList: cardInfo[];
  borderColor?: string;
}> = ({ title, subtitle, cardInfoList, borderColor }) => {
  return (
    <Section>
      <Header>
        <SectionHeading title={title} subtitle={subtitle} />
      </Header>
      <Grid>
        {cardInfoList.map((cardInfo, index) => (
          <Card key={index} {...cardInfo} borderColor={borderColor} />
        ))}
      </Grid>
    </Section>
  );
};

export default CardSection;
