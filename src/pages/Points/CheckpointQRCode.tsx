/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CheckpointQRCodeProps {
  checkpointKey?: string;
  netId?: string;
  size?: number;
  color?: string;
  inNotification?: boolean;
}

const CheckpointQRCode: React.FC<CheckpointQRCodeProps> = ({
  netId = '',
  size = 128,
  color = '#d4696a',
  inNotification = false
}) => {
  const qrRef = useRef<SVGSVGElement>(null);

  const baseUrl = import.meta.env.DEV
    ? 'http://127.0.0.1:8080' // development frontend URL
    : 'https://points.illinoiswcs.org'; // production frontend URL

  const loadingUrl =
    `${baseUrl}?action=vintage-redeem` + `&netId=${netId}` + `&t=${Date.now()}`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '45px',
        marginBottom: '30px'
      }}
    >
      <QRCodeSVG
        ref={qrRef}
        value={loadingUrl}
        size={size}
        fgColor={color}
        bgColor={'#ffffff'}
        level="H"
        title={'Vintage Merchandise Point Tracker Redemption QR Code'}
      />
    </div>
  );
};

export default CheckpointQRCode;
