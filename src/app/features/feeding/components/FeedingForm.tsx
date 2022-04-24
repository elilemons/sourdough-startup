import { Add, Clear, CopyAll, Save } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { Field, Form, Formik, FormikProps } from 'formik';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppButton } from '../../../shared/AppButton/AppButton';
import {
  createFeedingAsync,
  setSelectedFeatureId,
  updateFeedingAsync,
} from '../store/feedingSlice';

interface Props {
  isLoading: boolean;
  selectedFeeding?: Feeding;
  starters?: Starter[];
}

interface FeedingFormValues {
  amount: number;
  date: string;
  notes: string;
  starterId: string;
}

export function FeedingForm({ isLoading, selectedFeeding, starters }: Props) {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  // const selectedFeeding = useAppSelector(selectSelectedFeatureItem);
  /* Page Logic */
  const initialValues = selectedFeeding
    ? {
        amount: selectedFeeding?.amount || 0,
        date: selectedFeeding?.date || new Date().toString(),
        notes: selectedFeeding?.notes || '',
        starterId: selectedFeeding?.starterId || '',
      }
    : {
        amount: 0,
        date: new Date().toString(),
        notes: '',
        starterId: '',
      };

  const onAdd = (values: FeedingFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST onAdd', { selectedFeeding, values });
    //^ TODO Remove this test code
    dispatch(createFeedingAsync(values));
  };

  const onSubmit = (values: FeedingFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST onSubmit', { selectedFeeding, values });
    //^ TODO Remove this test code
    if (selectedFeeding) {
      dispatch(updateFeedingAsync({ ...selectedFeeding, ...values }));
    } else {
      dispatch(createFeedingAsync(values));
    }
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
                  label={Labels.STARTER}
                  as={TextField}
                  select
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    props.setFieldValue('starterId', e.target.value)
                  }
                  fullWidth
                >
                  {starters?.map((starter) => (
                    <MenuItem key={starter.id} value={starter.id}>
                      {starter.name}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  name={camelCase(Labels.AMOUNT)}
                  as={TextField}
                  label={Labels.AMOUNT}
                  fullWidth
                  InputProps={{
                    type: 'number',
                  }}
                />
                <Field
                  as={DatePicker}
                  name={camelCase(Labels.DATE)}
                  label={Labels.DATE}
                  fullWidth
                  onChange={(params: any) =>
                    props.setFieldValue(camelCase(Labels.DATE), params)
                  }
                  renderInput={(params: any) => (
                    <TextField {...params} sx={{ width: '100%' }} />
                  )}
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
              {selectedFeeding && (
                <div style={{ width: '100%' }}>
                  <AppButton
                    color='info'
                    isLoading={isLoading}
                    startIcon={<Add />}
                    label={Labels.ADD_NEW}
                    type='button'
                    onClick={() => onAdd(props.values)}
                  />
                </div>
              )}
              <Stack
                direction='row'
                justifyContent='flex-end'
                sx={{ width: '100%' }}
              >
                <AppButton
                  color='success'
                  isLoading={isLoading}
                  startIcon={selectedFeeding ? <Save /> : <Add />}
                  label={selectedFeeding ? Labels.SAVE : Labels.ADD}
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
