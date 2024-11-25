import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface EventQRCodeProps {
  eventKey: string;
  size?: number;
  inNotification?: boolean;
}

const EventQRCode: React.FC<EventQRCodeProps> = ({
  eventKey,
  size = 128,
  inNotification = false
}) => {
  const baseUrl = import.meta.env.DEV
    ? 'http://127.0.0.1:8080' // development frontend URL
    : 'https://points.illinoiswcs.org'; // production frontend URL

  const loadingUrl = `${baseUrl}/loading/${eventKey}`;

  return (
    <div
      style={
        inNotification
          ? {
              marginLeft: 'auto',
              backgroundColor: '#c6f6d5',
              padding: '4px',
              borderRadius: '4px'
            }
          : {}
      }
    >
      <QRCodeSVG
        value={loadingUrl}
        size={size}
        fgColor="#f76692"
        bgColor={inNotification ? '#d1fae5' : '#ffffff'}
        level="M"
        title={`QR Code for event ${eventKey}`}
      />
    </div>
  );
};

export default EventQRCode;
