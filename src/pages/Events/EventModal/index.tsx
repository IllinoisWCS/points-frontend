import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
  HStack,
  Button,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Checkbox,
  Stack,
  Select,
  Input
} from '@chakra-ui/react';
import { useMutation } from 'react-query';

import axiosInstance from '../../../api';
import { EventCategoryType, NewEvent } from '../../../types/event';
import { EventModalProps, StringFieldProps, SameDayFieldProps } from './types';

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

  const handleNameChange = (props: StringFieldProps): void => {
    setName(props.target.value);
  };

  const handleCategoryChange = (props: any): void => {
    setCategory(props.target.value);
  };

  const handlePointsChange = (_: string, valueAsNumber: number): void => {
    setPoints(valueAsNumber);
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
    if (pointsErr) setPointsErr(false);
    if (startDateErr) setStartDateErr(false);
    if (endDateErr) setEndDateErr(false);
    if (startTimeErr) setStartTimeErr(false);
    if (endTimeErr) setEndTimeErr(false);
    toggleModal();
  };

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
          reloadOnClose();
        })
        .catch(() => {
          setSuccess(false);
          setError(true);
          setMsg(
            'Internal Error: event creation was unsuccessful.' +
              'Please contact the current WCS infra chair for help.'
          );
        });
    }
  });

  const validateEvent = (): void => {
    if (validateFields()) {
      const start = new Date(`${startDate} ${startTime}`);
      const end = new Date(`${sameDay ? startDate : endDate} ${endTime}`);

      const event = {
        name,
        category,
        points,
        start,
        end,
        private: visibility === 'private'
      };
      createEvent.mutate(event);
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
    <Modal isOpen={open} onClose={clearAndToggle} isCentered>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent p="10" minW="50%">
        <ModalHeader>Create a New Event</ModalHeader>
        <ModalBody>
          <Stack spacing="3">
            <FormControl isRequired width="100%">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="i.e. October General Meeting"
                onChange={handleNameChange}
                value={name}
              />
            </FormControl>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select onChange={handleCategoryChange} value={category}>
                  {categories.map((category, id) => (
                    <option value={category.value} key={id}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Visibility</FormLabel>
                <Select onChange={handleVisibilityChange} value={visibility}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Select>
              </FormControl>
            </HStack>
            <FormControl isInvalid={pointsErr} isRequired>
              <FormLabel>Points</FormLabel>
              <NumberInput min={0.5} max={4} onChange={handlePointsChange}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <HStack>
              <FormControl isRequired isInvalid={startDateErr}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  onChange={handleStartDateChange}
                  value={startDate}
                  type="date"
                />
              </FormControl>
              <FormControl isRequired isInvalid={startTimeErr}>
                <FormLabel>Start Time</FormLabel>
                <Input
                  onChange={handleStartTimeChange}
                  value={startTime}
                  type="time"
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired={!sameDay} isInvalid={endDateErr}>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  onChange={handleEndDateChange}
                  value={sameDay ? startDate : endDate}
                  disabled={sameDay}
                />
              </FormControl>
              <FormControl isRequired isInvalid={endTimeErr}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  onChange={handleEndTimeChange}
                  value={endTime}
                />
              </FormControl>
            </HStack>
            <FormControl>
              <HStack>
                <Checkbox onChange={handleSameDayChange} isChecked={sameDay} />
                <FormLabel>Same day</FormLabel>
              </HStack>
            </FormControl>
            {success && (
              <Alert status="success" variant="left-accent">
                <AlertIcon />
                {msg}
              </Alert>
            )}
            {error && (
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                {msg}
              </Alert>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={validateEvent}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
