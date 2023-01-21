import React, { useEffect, useState } from 'react';
import { Segment, Card } from 'semantic-ui-react';

import axiosInstance from '../../api';
import { Event } from '../../types/event';
import { getEventDate } from '../../utils';

import './style.css';

// TOOD: migrate to react query
const Points = (): React.ReactElement => {
  const [events, setEvents] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/profile').then((res) => {
      setEvents(res.data.events);
      setPoints(res.data.points);
    });
  }, []);

  const renderAttendedEvents = (attendedEvents: Event[]): React.ReactElement[] =>
    (attendedEvents.map((event, id) => (
    // TODO: change key
    // eslint-disable-next-line react/no-array-index-key
    <Segment className="event-detail" padded key={id}>
      <div>
        <h3>{event.name}</h3>
        <h5 className="muted">{getEventDate(event)}</h5>
      </div>
      <div className="event-point">
        <h3>{event.points}</h3>
        <h5 className="muted">{event.points === 1 ? 'point' : 'points'}</h5>
      </div>
    </Segment>)
    ));

  return (
    <div>
      <h1>Points</h1>
      <Card fluid className="Points">
        <Card.Content>
          <div className="points-message">
            <h1>
              {`You have ${points} ${
                points === 1 ? 'point' : 'points'
              }.`}
            </h1>
          </div>
          {renderAttendedEvents(events)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Points;
