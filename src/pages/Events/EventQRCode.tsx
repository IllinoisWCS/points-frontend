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
  const baseUrl = 'https://en.wikipedia.org/wiki/Moo_Deng';
  const eventUrl = `${baseUrl}${eventKey}`;

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
        value={eventUrl}
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
