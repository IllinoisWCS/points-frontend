import React from 'react';
import BadgeContainer from '../../components/Badges/BadgeContainer';

const Badges = (): React.ReactElement => {
  return (
    <>
      <BadgeContainer
        badgeId={''}
        image={''}
        isEarned={false}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default Badges;
