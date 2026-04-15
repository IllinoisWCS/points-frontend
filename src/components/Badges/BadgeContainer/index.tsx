import React from 'react';
import styles from '../../../styles/Components/BadgeContainer.module.css';

interface BadgeContainerProps {
  badgeId: string;
  image: string;
  isEarned: boolean;
  onClick: () => void;
}

const BadgeContainer = ({
  badgeId,
  image,
  isEarned,
  onClick
}: BadgeContainerProps): React.ReactElement => {
  return (
    <div className={`${styles.container}`} onClick={onClick}>
      <img src={image} alt={`badge-${badgeId}`} className={styles.image} />
    </div>
  );
};

export default BadgeContainer;
