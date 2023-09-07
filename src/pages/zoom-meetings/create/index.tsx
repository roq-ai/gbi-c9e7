import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createZoomMeeting } from 'apiSdk/zoom-meetings';
import { zoomMeetingValidationSchema } from 'validationSchema/zoom-meetings';
import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { getCourses } from 'apiSdk/courses';
import { getUsers } from 'apiSdk/users';
import { ZoomMeetingInterface } from 'interfaces/zoom-meeting';

function ZoomMeetingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ZoomMeetingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createZoomMeeting(values);
      resetForm();
      router.push('/zoom-meetings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ZoomMeetingInterface>({
    initialValues: {
      meeting_link: '',
      meeting_date: new Date(new Date().toDateString()),
      status: '',
      course_id: (router.query.course_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: zoomMeetingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Zoom Meetings',
              link: '/zoom-meetings',
            },
            {
              label: 'Create Zoom Meeting',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Zoom Meeting
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.meeting_link}
            label={'Meeting Link'}
            props={{
              name: 'meeting_link',
              placeholder: 'Meeting Link',
              value: formik.values?.meeting_link,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="meeting_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Meeting Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.meeting_date ? new Date(formik.values?.meeting_date) : null}
              onChange={(value: Date) => formik.setFieldValue('meeting_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CourseInterface>
            formik={formik}
            name={'course_id'}
            label={'Select Course'}
            placeholder={'Select Course'}
            fetcher={getCourses}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/zoom-meetings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'zoom_meeting',
    operation: AccessOperationEnum.CREATE,
  }),
)(ZoomMeetingCreatePage);
