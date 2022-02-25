import { Clear, Save } from '@mui/icons-material';
import { Stack, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppButton } from '../../../shared/AppButton/AppButton';
import { setSelectedFeatureId } from '../store/feedingSlice';

interface Props {
  isLoading: boolean;
  selectedFeeding?: Feeding;
}

export function FeedingForm({ isLoading, selectedFeeding }: Props) {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Page Logic */
  const initialValues = [
    {
      amount: '',
      date: '',
      notes: '',
      starterId: '',
    },
  ];

  const onSubmit = (values: { [key: string]: string }[]) => {
    // TODO Remove this test code
    console.log('ELITEST', { values });
    //^ TODO Remove this test code
  };

  const onReset = () => dispatch(setSelectedFeatureId(''));

  return (
    <AppBox title='Feeding Form'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={onReset}
        enableReinitialize={true}
      >
        <Form id='feeding-form'>
          <Stack spacing={2}>
            <Stack direction='row' spacing={2}>
              <Field
                as={TextField}
                name={camelCase(Labels.STARTER_ID)}
                label={Labels.STARTER}
                value={selectedFeeding?.starterId || ''}
                fullWidth
              />
              <Field
                as={TextField}
                name={camelCase(Labels.AMOUNT)}
                label={Labels.AMOUNT}
                value={selectedFeeding?.amount || ''}
                fullWidth
              />
              <Field
                as={TextField}
                name={camelCase(Labels.DATE)}
                label={Labels.DATE}
                value={selectedFeeding?.date || ''}
                fullWidth
              />
            </Stack>
            <Field
              as={TextField}
              name={camelCase(Labels.NOTES)}
              label={Labels.NOTES}
              multiline
              minRows={2}
              maxRows={4}
              value={selectedFeeding?.notes || ''}
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <AppButton
              color='success'
              isLoading={isLoading}
              startIcon={<Save />}
              label={Labels.SAVE}
              type='submit'
            />
            <AppButton
              color='warning'
              startIcon={<Clear />}
              label={Labels.CLEAR}
              type='button'
              onClick={() => onReset()}
            />
          </Stack>
        </Form>
      </Formik>
    </AppBox>
  );
}
