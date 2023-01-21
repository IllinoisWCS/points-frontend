import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { Tab, Input, Button } from 'semantic-ui-react';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';
import './style.css';

const CheckIn = (): React.ReactElement => {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);

  useEffect(() => {
    // Temporary patch to ensure users are authenticated before checking in
    // TODO: Remove after implementing proper login flow
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/profile');
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const isEventKeyError = eventKey === '';
    setEventKeyError(isEventKeyError);
    if (isEventKeyError) {
      return;
    }

    axiosInstance
      .patch('/profile', { eventKey })
      .then((res) => {
        toastSuccess(res.data.message);
      })
      .catch((err) => {
        toastError(err.response.data.message);
        console.log(err);
      });
  };

  const handleEnter = async (tgt: React.KeyboardEvent): Promise<void> => {
    if (tgt.charCode === 13) {
      await handleSubmit();
    }
  };

  const handleChangeKey = (event: BaseSyntheticEvent): void => {
    setEventKey(event.target.value);
  };

  return (
    <div className="check-in">
      <h2>Check-in</h2>
      <br />
      {/* <Notifications /> */}
      <Tab.Pane>
        <h4>Event Key</h4>

        <Input
          fluid
          error={eventKeyError}
          placeholder="Enter the event key..."
          value={eventKey}
          onChange={handleChangeKey}
          onKeyPress={handleEnter}
        />

        <br />

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button fluid onClick={async () => { await handleSubmit(); }}>
          Check-in
        </Button>
      </Tab.Pane>
    </div>
  );
};

export default CheckIn;
