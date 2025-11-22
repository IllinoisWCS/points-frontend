import React from 'react';
import MerchGrid from './MerchGrid';
import { Button, Center } from '@chakra-ui/react';
import merchItems from '../../utils/merchItems';

function MerchToggle(): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMerchDisplay = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Center>
        <Button onClick={toggleMerchDisplay} style={{ marginBottom: '20px' }}>
          {isOpen ? 'Hide Available Items ▲' : 'View Available Items ▼'}
        </Button>
      </Center>
      {isOpen && (
        <div>
          <Center mb="8s">{<MerchGrid items={merchItems} />}</Center>
          <p
            style={{
              alignItems: 'center',
              marginBottom: '20px',
              textAlign: 'left',
              marginLeft: '20px',
              marginRight: '20px',
              fontStyle: 'italic'
            }}
          >
            Note: Vintage merchandise displayed here are examples of past
            merchandise, can’t guarantee that we have stock of all of these
            items, but you are free to get any merchandise we have available
            when you come in!
          </p>
        </div>
      )}
    </div>
  );
}

export default MerchToggle;
