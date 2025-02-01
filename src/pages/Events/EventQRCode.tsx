import React, { useRef } from 'react';
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
  // creates react reference that can point to an svg element
  // useRef is react hook that creates mutable reference to object
  const qrRef = useRef<SVGSVGElement>(null);

  const baseUrl = import.meta.env.DEV
    ? 'http://127.0.0.1:8080' // development frontend URL
    : 'https://points.illinoiswcs.org'; // production frontend URL

  const loadingUrl = `${baseUrl}/loading/${eventKey}`; // redirect

  // download as svg
  const downloadSVG = (): void => {
    if (!qrRef.current) {
      return;
    }

    // turns qr code visual (svg) into xml code
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    // creates binary large object (blob) containing svg image data as xml
    const svgBlob = new Blob([svgData], {
      type: 'image/svg_xml;charset=utf-8'
    });
    // creates temp url pointing to blob
    const svgUrl = URL.createObjectURL(svgBlob);

    // link element
    const downloadLink = document.createElement('a');
    // points link to temp url containing blob info
    downloadLink.href = svgUrl;
    // names the link
    downloadLink.download = `qr-code-${eventKey}.svg`;
    // adds link to page
    document.body.appendChild(downloadLink);
    // clicks link to start download
    downloadLink.click();
    // removes link from page
    document.body.removeChild(downloadLink);
    // removes temp url created
    URL.revokeObjectURL(svgUrl);
  };

  // download as png
  const downloadPNG = (): void => {
    if (!qrRef.current) {
      return;
    }

    // creates drawing canvas in memory
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    // tools for drawing on canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // creates new image object
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const img = new Image();

    // after image loads, draws it onto the canvas
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      // converts into png format
      const pngUrl = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${eventKey}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div>
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
          ref={qrRef}
          value={loadingUrl}
          size={size}
          fgColor="#f76692"
          bgColor={inNotification ? '#d1fae5' : '#ffffff'}
          level="M"
          title={`QR Code for event ${eventKey}`}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={downloadSVG} style={{ marginRight: '10px' }}>
          Download SVG
        </button>
        <button onClick={downloadPNG}>Download PNG</button>
      </div>
    </div>
  );
};

export default EventQRCode;
