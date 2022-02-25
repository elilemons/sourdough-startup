import { Add, Clear, Save } from '@mui/icons-material';
import { Stack, TextField } from '@mui/material';
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik';
import { useLayoutEffect } from 'react';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppButton } from '../../../shared/AppButton/AppButton';
import {
  createFeature,
  selectSelectedFeatureItem,
  setSelectedFeatureId,
  updateFeature,
} from '../store/feedingSlice';

interface Props {
  isLoading: boolean;
  selectedFeeding?: Feeding;
}

interface FeedingFormValues {
  amount: string;
  date: string;
  notes: string;
  starterId: string;
}

export function FeedingForm({ isLoading, selectedFeeding }: Props) {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  // const selectedFeeding = useAppSelector(selectSelectedFeatureItem);
  /* Page Logic */
  const initialValues = selectedFeeding
    ? {
        amount: selectedFeeding?.amount || '',
        date: selectedFeeding?.date || '',
        notes: selectedFeeding?.notes || '',
        starterId: selectedFeeding?.starterId || '',
      }
    : {
        amount: '',
        date: '',
        notes: '',
        starterId: '',
      };

  const onAdd = (values: FeedingFormValues) => {
    dispatch(createFeature({ ...values } as Feeding));
  };

  const onSubmit = (values: FeedingFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST', { values });
    //^ TODO Remove this test code
    dispatch(updateFeature({ ...selectedFeeding, ...values } as Feeding));
  };

  const onReset = () => dispatch(setSelectedFeatureId(''));

  return (
    <AppBox title='Feeding Form'>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(props: FormikProps<FeedingFormValues>) => (
          <Form id='feeding-form'>
            <Stack spacing={2}>
              <Stack direction='row' spacing={2}>
                <Field
                  name='starterId'
                  as={TextField}
                  label={Labels.STARTER}
                  fullWidth
                />
                <Field
                  name={camelCase(Labels.AMOUNT)}
                  as={TextField}
                  label={Labels.AMOUNT}
                  fullWidth
                />
                <Field
                  name={camelCase(Labels.DATE)}
                  as={TextField}
                  label={Labels.DATE}
                  fullWidth
                />
              </Stack>
              <Field
                name={camelCase(Labels.NOTES)}
                as={TextField}
                label={Labels.NOTES}
                multiline
                minRows={2}
                maxRows={4}
              />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='space-between'>
              <AppButton
                color='primary'
                isLoading={isLoading}
                startIcon={<Add />}
                label={Labels.ADD}
                onClick={() => onAdd(props.values)}
                type='button'
              />
              <Stack direction='row'>
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
            </Stack>
          </Form>
        )}
      </Formik>
    </AppBox>
  );
}
