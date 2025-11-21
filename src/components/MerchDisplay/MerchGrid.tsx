import React from 'react';
import MerchRectangle from './MerchRectangle';

interface MerchGridProps {
  items: Array<{
    color: string;
    image: string;
  }>;
}

function MerchGrid({ items }: MerchGridProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        justifyItems: 'center',
        padding: '0px'
      }}
    >
      {items.map((item, index) => (
        <MerchRectangle key={index} color={item.color} image={item.image} />
      ))}
    </div>
  );
}

export default MerchGrid;
