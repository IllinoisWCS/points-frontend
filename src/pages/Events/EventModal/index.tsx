import React, { useState, useEffect } from 'react';
import {
  Field,
  NumberInput,
  Alert,
  HStack,
  Button,
  Dialog,
  Portal,
  Checkbox,
  Stack,
  Select,
  Input,
  Box
} from '@chakra-ui/react';
import { useMutation } from 'react-query';

import EventQRCode from '../EventQRCode';

import axiosInstance from '../../../api';
import { EventCategoryType, NewEvent, Event } from '../../../types/event';
import { EventModalProps, StringFieldProps, SameDayFieldProps } from './types';

const EventModal = (props: EventModalProps): React.ReactElement => {
  const { open, event, toggleModal, reloadOnClose } = props;
  const [_id, setId] = useState('');
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategoryType>('explorations');
  const [points, setPoints] = useState(0.5);
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
  const [eventKey, setEventKey] = useState<string | null>(null);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleNameChange = (props: StringFieldProps): void => {
    setName(props.target.value);
  };

  const handleCategoryChange = (props: any): void => {
    setCategory(props.target.value);
  };

  const handlePointsChange = (_: string, valueAsNumber: number): void => {
    setPoints(valueAsNumber);
    console.log(points);
  };

  const handleStartDateChange = (props: StringFieldProps): void => {
    const newStartDate = props.target.value;
    if (
      new Date(newStartDate).getTime() > new Date(endDate).getTime() ||
      (new Date(newStartDate).getTime() === new Date(endDate).getTime() &&
        startTime &&
        endTime &&
        startTime >= endTime)
    )
      setStartDateErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (props: StringFieldProps): void => {
    const newEndDate = props.target.value;
    if (
      new Date(newEndDate).getTime() < new Date(startDate).getTime() ||
      (new Date(newEndDate).getTime() === new Date(startDate).getTime() &&
        startTime &&
        endTime &&
        startTime >= endTime)
    )
      setEndDateErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setEndDate(newEndDate);
  };

  const handleStartTimeChange = (props: StringFieldProps): void => {
    const newStartTime = props.target.value;
    if (sameDay && endTime && newStartTime >= endTime) setStartTimeErr(true);
    else if (
      new Date(startDate).getTime() === new Date(endDate).getTime() &&
      endTime &&
      newStartTime >= endTime
    )
      setStartTimeErr(true);
    else {
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (props: StringFieldProps): void => {
    const newEndTime = props.target.value;
    if (sameDay && newEndTime && startTime >= newEndTime) setEndTimeErr(true);
    else if (
      new Date(startDate).getTime() === new Date(endDate).getTime() &&
      startTime &&
      startTime >= newEndTime
    )
      setEndTimeErr(true);
    else {
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
    setEndTime(newEndTime);
  };

  const handleVisibilityChange = (props: StringFieldProps): void => {
    setVisibility(props.target.value);
  };

  const handleSameDayChange = (props: SameDayFieldProps): void => {
    if (props.target.checked !== undefined) setSameDay(props.target.checked);
    if (endTime && startTime && startTime >= endTime) setEndTimeErr(true);
    else {
      setStartDateErr(false);
      setEndDateErr(false);
      setStartTimeErr(false);
      setEndTimeErr(false);
    }
  };

  const clearAndToggle = (): void => {
    setHasSubmitted(false);
    if (pointsErr) setPointsErr(false);
    if (startDateErr) setStartDateErr(false);
    if (endDateErr) setEndDateErr(false);
    if (startTimeErr) setStartTimeErr(false);
    if (endTimeErr) setEndTimeErr(false);
    toggleModal();
  };

  useEffect(() => {
    if (event) {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const eventStartYear = eventStart.getFullYear();
      // eslint-disable-next-line max-len
      const eventStartMonth = String(eventStart.getMonth() + 1).padStart(
        2,
        '0'
      );
      const eventStartDay = String(eventStart.getDate()).padStart(2, '0');
      const eventStartHour = String(eventStart.getHours()).padStart(2, '0');
      const eventStartMinute = String(eventStart.getMinutes()).padStart(2, '0');

      const eventEndYear = eventEnd.getFullYear();
      const eventEndMonth = String(eventEnd.getMonth() + 1).padStart(2, '0');
      const eventEndDay = String(eventEnd.getDate()).padStart(2, '0');
      const eventEndHour = String(eventEnd.getHours()).padStart(2, '0');
      const eventEndMinute = String(eventEnd.getMinutes()).padStart(2, '0');

      setId(event._id);
      setKey(event._id);
      setName(event.name);
      setCategory(event.category);
      setPoints(event.points);
      setStartDate(`${eventStartYear}-${eventStartMonth}-${eventStartDay}`);
      setEndDate(`${eventEndYear}-${eventEndMonth}-${eventEndDay}`);
      setSameDay(
        eventStartYear === eventEndYear &&
          eventStartMonth === eventEndMonth &&
          eventStartDay === eventEndDay
      );
      setStartTime(`${eventStartHour}:${eventStartMinute}`);
      setEndTime(`${eventEndHour}:${eventEndMinute}`);
      setVisibility(event.private ? 'private' : 'public');
    } else {
      setId('');
      setKey('');
      setName('');
      setCategory('explorations');
      setPoints(0.5);
      setStartDate('');
      setEndDate('');
      setSameDay(false);
      setStartTime('');
      setEndTime('');
      setVisibility('public');
    }
    setSuccess(false);
    setError(false);
    setMsg('');
  }, [event]);

  const validateFields = (): boolean => {
    if (success) setSuccess(false);
    if (pointsErr || startDateErr || endDateErr || startTimeErr || endTimeErr) {
      return false;
    }
    return true;
  };

  const createEvent = useMutation({
    mutationFn: async (event: NewEvent): Promise<void> => {
      await axiosInstance
        .post('/events', event)
        .then((res) => {
          setSuccess(true);
          setError(false);
          setMsg(`Success! Event key is ${String(res.data.key)}.`);
          setEventKey(String(res.data.key));
          reloadOnClose();
        })
        .catch(() => {
          setSuccess(false);
          setError(true);
          setMsg(
            'Internal Error: event creation was unsuccessful. ' +
              'Please contact the current WCS infra chair for help.'
          );
        });
    }
  });

  const editEvent = useMutation({
    mutationFn: async (event: Event): Promise<void> => {
      await axiosInstance
        .patch(`/events/${event._id}`, event)
        .then((res) => {
          setSuccess(true);
          setError(false);
          setMsg(`Success! ${event.name} has been edited.`);
          reloadOnClose();
        })
        .catch(() => {
          setSuccess(false);
          setError(true);
          setMsg(
            'Internal Error: event edit was unsuccessful. ' +
              'Please contact the current WCS infra chair for help.'
          );
          setEventKey(null);
        });
    }
  });

  const validateEvent = (): void => {
    if (validateFields()) {
      const start = new Date(`${startDate} ${startTime}`);
      const end = new Date(`${sameDay ? startDate : endDate} ${endTime}`);

      const cEvent = {
        name,
        category,
        points,
        start,
        end,
        private: visibility === 'private'
      };

      const eEvent: Event = {
        _id,
        key,
        name,
        category,
        points,
        start,
        end,
        private: visibility === 'private'
      };

      if (!event?._id) {
        if (!hasSubmitted) {
          setHasSubmitted(true);
          createEvent.mutate(cEvent);
        }
      } else {
        editEvent.mutate(eEvent);
      }
    }
  };

  const categories = [
    { value: 'corporate', label: 'Corporate' },
    { value: 'social', label: 'Social' },
    { value: 'outreach', label: 'Outreach' },
    { value: 'mentoring', label: 'Mentoring' },
    { value: 'explorations', label: 'Explorations' },
    { value: 'generalMeeting', label: 'General Meeting' },
    { value: 'other', label: 'Other' }
  ];

  return (
    // <Dialog.Root open={open} onClose={clearAndToggle} isCentered>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Create New Event</Button>
      </Dialog.Trigger>
      <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p="10" minW="50%">
          <Dialog.Header>
            {' '}
            {!event?._id ? 'Create a New Event' : 'Edit Event'}{' '}
            <Dialog.CloseTrigger />
          </Dialog.Header>
          <Dialog.Body>
            <Stack gap="3px">
              <Field.Root required width="100%">
                <Field.Label>Name</Field.Label>
                <Input
                  placeholder="i.e. October General Meeting"
                  onChange={handleNameChange}
                  value={name}
                />
              </Field.Root>
              <HStack>
                <Field.Root required>
                  <Field.Label>Category</Field.Label>
                  <Select.Root onChange={handleCategoryChange} value={category}>
                    <Select.Content>
                      {categories.map((category, id) => (
                        <Select.Item value={category.value} key={id}>
                          {category.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Field.Root>
                <Field.Root required>
                  <Field.Label>Visibility</Field.Label>
                  <Select.Root
                    onChange={handleVisibilityChange}
                    value={visibility}
                  >
                    <Select.Content>
                      <Select.Item value="public">Public</Select.Item>
                      <Select.Item value="private">Private</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Field.Root>
              </HStack>
              <Field.Root invalid={pointsErr} required>
                <Field.Label>Points</Field.Label>
                <NumberInput.Root
                  min={0.5}
                  max={4}
                  value={points}
                  onValueChange={handlePointsChange}
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Field.Root>
              <HStack>
                <Field.Root required invalid={startDateErr}>
                  <Field.Label>Start Date</Field.Label>
                  <Input
                    onChange={handleStartDateChange}
                    value={startDate}
                    type="date"
                  />
                </Field.Root>
                <Field.Root required invalid={startTimeErr}>
                  <Field.Label>Start Time</Field.Label>
                  <Input
                    onChange={handleStartTimeChange}
                    value={startTime}
                    type="time"
                  />
                </Field.Root>
              </HStack>
              <HStack>
                <Field.Root required={!sameDay} invalid={endDateErr}>
                  <Field.Label>End Date</Field.Label>
                  <Input
                    type="date"
                    onChange={handleEndDateChange}
                    value={sameDay ? startDate : endDate}
                    disabled={sameDay}
                  />
                </Field.Root>
                <Field.Root required invalid={endTimeErr}>
                  <Field.Label>End Time</Field.Label>
                  <Input
                    type="time"
                    onChange={handleEndTimeChange}
                    value={endTime}
                  />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Checkbox.Root
                  onCheckedChange={handleSameDayChange}
                  checked={sameDay}
                  colorPalette="pink"
                >
                  <Checkbox.Label>Same day</Checkbox.Label>
                </Checkbox.Root>
              </Field.Root>
              {success && (
                <Alert.Root status="success">
                  <HStack w="100%" alignItems="center" gap="4px">
                    <Alert.Indicator />
                    <Box>{msg}</Box>
                    {eventKey && (
                      <Box ml="auto">
                        <EventQRCode
                          eventKey={eventKey}
                          size={84}
                          color={'#d4696a'}
                          inNotification={true}
                        />
                      </Box>
                    )}
                  </HStack>
                </Alert.Root>
              )}
              {error && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  {msg}
                </Alert.Root>
              )}
            </Stack>
          </Dialog.Body>
          <Dialog.Footer>
            <Button
              type="submit"
              onClick={validateEvent}
              disabled={!event?._id && hasSubmitted}
            >
              Submit
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EventModal;
