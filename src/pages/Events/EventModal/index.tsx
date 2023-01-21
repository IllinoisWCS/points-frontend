import React, { useState } from 'react';
import {
  Input,
  Button,
  Modal,
  Form,
  Select,
  Message,
  Checkbox
} from 'semantic-ui-react';
import './style.css';
import axiosInstance from '../../../api';
import { EventCategoryType, NewEvent } from '../../../types/event';
import { EventModalProps, StringFieldProps, CategoryFieldProps, NumberFieldProps, SameDayFieldProps, DropdownProps } from './types';

const EventModal = (props: EventModalProps): React.ReactElement => {
  const { open, toggleModal, reloadOnClose } = props;
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategoryType>('explorations');
  const [points, setPoints] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sameDay, setSameDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [visibility, setVisibility] = useState('public');

  const [pointsErr, setPointsErr] = useState(false);
  const [startDateErr, setStartDateErr] = useState(false);
  const [endDateErr, setEndDateErr] = useState(false);
  const [startTimeErr, setStartTimeErr] = useState(false);
  const [endTimeErr, setEndTimeErr] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const handleNameChange = (_: any, data: StringFieldProps): void => {
    setName(data.value);
  };

  const handleCategoryChange = (_: any, data: CategoryFieldProps): void => {
    setCategory(data.value);
  };

  const handlePointsChange = (_: any, data: NumberFieldProps): void => {
    if (!(data.value > 0 && data.value <= 5)) setPointsErr(true);
    else setPointsErr(false);
    setPoints(data.value);
  };

  const handleStartDateChange = (_: any, data: StringFieldProps): void => {
    const newStartDate = data.value;
    if (
      new Date(newStartDate).getTime() > new Date(endDate).getTime() ||
      (new Date(newStartDate).getTime() === new Date(endDate).getTime() &&
        startTime &&
        endTime &&
        startTime >= endTime)
    ) setStartDateErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (_: any, data: StringFieldProps): void => {
    const newEndDate = data.value;
    if (
      new Date(newEndDate).getTime() < new Date(startDate).getTime() ||
      (new Date(newEndDate).getTime() === new Date(startDate).getTime() &&
        startTime &&
        endTime &&
        startTime >= endTime)
    ) setEndDateErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setEndDate(newEndDate);
  };

  const handleStartTimeChange = (_: any, data: StringFieldProps): void => {
    const newStartTime = data.value;
    if (sameDay && endTime && newStartTime >= endTime) setStartTimeErr(true);
    else if (
      new Date(startDate).getTime() === new Date(endDate).getTime() &&
      endTime &&
      newStartTime >= endTime
    ) setStartTimeErr(true);
    else {
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (_: any, data: StringFieldProps): void => {
    const newEndTime = data.value;
    if (sameDay && newEndTime && startTime >= newEndTime) setEndTimeErr(true);
    else if (
      new Date(startDate).getTime() === new Date(endDate).getTime() &&
      startTime &&
      startTime >= newEndTime
    ) setEndTimeErr(true);
    else {
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setEndTime(newEndTime);
  };

  const handleVisibilityChange = (_: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps): void => {
    if (data && typeof data.value === 'string') setVisibility(data.value);
  };

  const handleSameDayChange = (_: any, data: SameDayFieldProps): void => {
    if (data.checked !== undefined) setSameDay(data.checked);
    if (endTime && startTime && startTime >= endTime) setEndTimeErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
  };

  const clearAndToggle = (): void => {
    if (pointsErr) setPointsErr(false);
    if (startDateErr) setStartDateErr(false);
    if (endDateErr) setEndDateErr(false);
    if (startTimeErr) setStartTimeErr(false);
    if (endTimeErr) setEndTimeErr(false);
    toggleModal();
  };

  const validateFields = (): boolean => {
    if (success) setSuccess(false);
    if (pointsErr) return false;
    if (startDateErr) return false;
    if (endDateErr) return false;
    if (startTimeErr) return false;
    if (endTimeErr) return false;
    return true;
  };

  const createEvent = (event: NewEvent): void => {
    axiosInstance
      .post('/events', event)
      .then((res) => {
        setSuccess(true);
        setError(false);
        setMsg(`Success! Event key is ${String(res.data.key)}.`);
        reloadOnClose();
      })
      .catch(() => {
        setSuccess(false);
        setError(true);
        setMsg(
          'Internal Error: event creation was unsuccessful. Please contact the current WCS infra chair for help.'
        );
      });
  };

  const validateEvent = async (): Promise<void> => {
    if (validateFields()) {
      const start = new Date(`${startDate} ${startTime}`);
      const end = new Date(
        `${sameDay ? startDate : endDate} ${endTime}`
      );

      const event = {
        name,
        category,
        points,
        start,
        end,
        private: visibility === 'private'
      };
      createEvent(event);
    }
  };

  const categories = [
    { key: 'c', text: 'Corporate', value: 'corporate' },
    { key: 's', text: 'Social', value: 'social' },
    { key: 'o', text: 'Outreach', value: 'outreach' },
    { key: 'm', text: 'Mentoring', value: 'mentoring' },
    { key: 't', text: 'Explorations', value: 'explorations' },
    { key: 'g', text: 'General Meeting', value: 'generalMeeting' },
    { key: 'x', text: 'Other', value: 'other' }
  ];

  return (
    <Modal open={open} onClose={clearAndToggle} closeIcon>
      <Modal.Content>
        <h3 className="modal-heading">All fields are required.</h3>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Form onSubmit={validateEvent} success={success} error={error}>
          <Form.Field
            required
            id="name"
            control={Input}
            label="Name"
            placeholder="i.e. October General Meeting"
            onChange={handleNameChange}
            value={name}
          />
          <Form.Group widths="equal">
            <Form.Field
              required
              id="category"
              control={Select}
              label='Category'
              placeholder="Category"
              options={categories}
              search
              searchInput={{ id: 'category' }}
              onChange={handleCategoryChange}
            />
            <Form.Select
              required
              fluid
              id="visibility"
              label="Visibility"
              options={[
                { key: 'public', text: 'Public', value: 'public' },
                { key: 'private', text: 'Private', value: 'private' }
              ]}
              defaultValue="public"
              onChange={handleVisibilityChange}
            />
          </Form.Group>
          <Form.Field
            required
            id="points"
            control={Input}
            label="Points"
            onChange={handlePointsChange}
            error={pointsErr}
            value={points}
          />

          <Form.Group widths="equal">
            <Form.Field
              required
              id="startDate"
              control={Input}
              label="Start Date"
              type="date"
              onChange={handleStartDateChange}
              error={startDateErr}
              value={startDate}
            />
            <Form.Field
              required
              id="startTime"
              control={Input}
              label="Start Time"
              type="time"
              onChange={handleStartTimeChange}
              error={startTimeErr}
              value={startTime}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required={!sameDay}
              id="endDate"
              control={Input}
              label="End Date"
              type="date"
              onChange={handleEndDateChange}
              error={endDateErr}
              value={sameDay ? startDate : endDate}
              disabled={sameDay}
              className={sameDay ? 'inactive' : ''}
            />

            <Form.Field
              required
              id="endTime"
              control={Input}
              label="End Time"
              type="time"
              onChange={handleEndTimeChange}
              error={endTimeErr}
              value={endTime}
            />
          </Form.Group>

          <Form.Field>
            <Checkbox
              required
              id="sameDay"
              label="Same day"
              onChange={handleSameDayChange}
              checked={sameDay}
            />
          </Form.Field>

          <Message success content={msg} />
          <Message error content={msg} />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EventModal;
