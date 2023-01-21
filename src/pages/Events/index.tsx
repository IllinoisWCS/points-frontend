import React, { useEffect, useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';

import EventModal from './EventModal';
import axiosInstance from '../../api';
import { getEventDate } from '../../utils/eventDate';
import { Event } from '../../types/event';

import './style.css';

const Events = (): React.ReactElement => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState(false);
  const [reloadOnClose, setReloadOnClose] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/events').then((res) => {
      setEvents(res.data);
    });
  }, []);

  const handleToggleModal = (): void => {
    setModal(!modal);
    if (reloadOnClose) {
      window.location.reload();
    }
  };

  const handleReloadOnClose = (): void => {
    setReloadOnClose(!reloadOnClose);
  };

  return (
    <div>
      <EventModal
        open={modal}
        toggleModal={handleToggleModal}
        reloadOnClose={handleReloadOnClose}
      />
      <Button onClick={handleToggleModal}>Create New Event</Button>
      <Segment.Group>
        {events.map((event, idx) => (
          <Segment padded key={idx}>
            <div className="flex">
              <div>
                <h3>{event.name}</h3>
                <h5 className="muted">{getEventDate(event)}</h5>
              </div>
            </div>
          </Segment>
        ))}
      </Segment.Group>
    </div>
  );
};

export default Events;
