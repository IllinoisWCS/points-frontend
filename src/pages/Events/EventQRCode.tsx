/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, HStack, VStack } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

interface EventQRCodeProps {
  eventKey: string;
  size?: number;
  color?: string;
  inNotification?: boolean;
}

const EventQRCode: React.FC<EventQRCodeProps> = ({
  eventKey,
  size = 128,
  color = '#d4696a', // does this set a default color
  inNotification = false
}) => {
  // creates react reference that can point to an svg element
  // useRef is react hook that creates mutable reference to object
  const qrRef = useRef<SVGSVGElement>(null);

  const baseUrl = import.meta.env.DEV
    ? 'http://127.0.0.1:8080' // development frontend URL
    : 'https://points.illinoiswcs.org'; // production frontend URL

  // const loadingUrl = `${baseUrl}/#/loading/${eventKey}`;
  const loadingUrl =
    `${baseUrl}?action=checkin&eventKey=${eventKey}` + `&t=${Date.now()}`;

  // download as svg
  const downloadSVG = (): void => {
    if (!qrRef.current) {
      return;
    }

    const clonedSvg = qrRef.current.cloneNode(true) as SVGSVGElement;

    // set attributes on the cloned SVG
    clonedSvg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    clonedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    clonedSvg.setAttribute('width', `${size}px`);
    clonedSvg.setAttribute('height', `${size}px`);

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
        <HStack ml="auto" spacing={4}>
          <QRCodeSVG
            ref={qrRef}
            value={loadingUrl}
            size={size}
            fgColor={color}
            bgColor={inNotification ? '#d1fae5' : '#ffffff'}
            level="H"
            title={`QR code for event key ${eventKey}`}
          />
          <VStack justifyContent={'space-between'} mt={8}>
            <Button onClick={downloadPNG} size={{ base: 'sm', md: 'md' }}>
              <FiDownload />
              &nbsp;Save as PNG
            </Button>
            <Button onClick={downloadSVG} size={{ base: 'sm', md: 'md' }}>
              <FiDownload />
              &nbsp;Save as SVG
            </Button>
          </VStack>
        </HStack>
      </div>
    </div>
  );
};

export default EventQRCode;
