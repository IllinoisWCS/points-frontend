import React from 'react';
import BadgeContainer from '../../components/Badges/BadgeContainer';
import BadgeModal from '../../components/Badges/BadgeModal';
import allrounder from '../../assets/badges/all_rounder.png';

const Badges = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <BadgeContainer
        badgeId={''}
        image={''}
        isEarned={false}
        onClick={() => {
          setModalOpen(true);
        }}
      />
      <BadgeModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        titleText={'Template Badge Title'}
        image={allrounder}
        descriptionText={'This is a template badge description.'}
      />
    </>
  );
};

export default Badges;
