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
        width: '200px',
        height: '200px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
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
