import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@chakra-ui/react';

interface EventQRCodeProps {
  eventKey: string;
  size?: number;
  color?: string;
  inNotification?: boolean;
  layout?: 'default' | 'alternate';
}

const EventQRCode: React.FC<EventQRCodeProps> = ({
  eventKey,
  size = 128,
  color = '#d4696a', // does this set a default color
  inNotification = false,
  layout = 'default'
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

    const clonedSvg = qrRef.current.cloneNode(true) as SVGSVGElement;

    // set attributes on the cloned SVG
    clonedSvg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    clonedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    clonedSvg.setAttribute('width', `${size}px`); // Add px unit
    clonedSvg.setAttribute('height', `${size}px`); // Add px unit

    // add style to force size
    clonedSvg.style.width = `${size}px`;
    clonedSvg.style.height = `${size}px`;

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
    const scale = 4;
    const canvas = document.createElement('canvas');
    canvas.width = size * scale;
    canvas.height = size * scale;

    // tools for drawing on canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.scale(scale, scale);

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

  if (layout === 'default') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: window.innerWidth < 600 ? 'flex-end' : 'center',
          flexDirection: window.innerWidth < 600 ? 'column' : 'row',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            backgroundColor: inNotification ? '#c6f6d5' : 'transparent',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex-end',
            justifyContent: 'center'
          }}
        >
          <QRCodeSVG
            ref={qrRef}
            value={loadingUrl}
            size={size}
            fgColor={color}
            bgColor={inNotification ? '#d1fae5' : '#ffffff'}
            level="H"
            title={`QR Code for event ${eventKey}`}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
            marginLeft: window.innerWidth < 600 ? '0px' : '20px',
            marginTop: window.innerWidth < 600 ? '10px' : '0px',
            gap: '5px'
          }}
        >
          <Button onClick={downloadPNG}>Download as PNG</Button>
          <Button onClick={downloadSVG} style={{ marginTop: '5px' }}>
            Download as SVG
          </Button>
        </div>
      </div>
    );
  }
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
          fgColor={color}
          bgColor={inNotification ? '#d1fae5' : '#ffffff'}
          level="H"
          title={`QR Code for event ${eventKey}`}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button onClick={downloadPNG} mr={3} mt={5}>
          Download as PNG
        </Button>
        <Button onClick={downloadSVG} mt={5}>
          Download as SVG
        </Button>
      </div>
    </div>
  );
};
export default EventQRCode;
