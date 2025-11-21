import React from 'react';
interface MerchRectangleProps {
  color: string;
  image: string;
}
function MerchRectangle({
  color,
  image
}: MerchRectangleProps): React.ReactElement {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '10px',
        justifyItems: 'center',
        padding: '0px'
      }}
    >
      <img
        src={image}
        alt="box content"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px'
        }}
      />
    </div>
  );
}

export default MerchRectangle;
