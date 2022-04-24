import { Add, Clear, CopyAll, Save } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Field, Form, Formik, FormikProps } from 'formik';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppButton } from '../../../shared/AppButton/AppButton';
import {
  createStarterAsync,
  setSelectedFeatureId,
  updateStarterAsync,
} from '../store/starterSlice';

interface Props {
  isLoading: boolean;
  selectedStarter?: Starter;
}

interface StarterFormValues {
  acquired: string;
  name: string;
  notes: string;
}

export function StarterForm({ isLoading, selectedStarter }: Props) {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  // const selectedStarter = useAppSelector(selectSelectedFeatureItem);
  /* Page Logic */
  const initialValues = selectedStarter
    ? {
        acquired: selectedStarter?.acquired || new Date().toString(),
        name: selectedStarter?.name || '',
        notes: selectedStarter?.notes || '',
      }
    : {
        acquired: new Date().toString(),
        name: '',
        notes: '',
      };

  const onAdd = (values: StarterFormValues) => {
    dispatch(createStarterAsync({ ...values } as Starter));
  };

  const onSubmit = (values: StarterFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST onSubmit', { values });
    //^ TODO Remove this test code
    if (selectedStarter) {
      dispatch(updateStarterAsync({ ...selectedStarter, ...values }));
    } else {
      dispatch(createStarterAsync(values));
    }
  };

  const onReset = () => dispatch(setSelectedFeatureId(''));

  return (
    <AppBox title='Starter Form'>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(props: FormikProps<StarterFormValues>) => (
          <Form id='starter-form'>
            <Stack spacing={2}>
              <Stack direction='row' spacing={2}>
                <Field
                  name={camelCase(Labels.NAME)}
                  as={TextField}
                  label={Labels.NAME}
                  fullWidth
                />
                <Field
                  as={DatePicker}
                  name={camelCase(Labels.ACQUIRED)}
                  label={Labels.ACQUIRED}
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
              <AppButton
                color='primary'
                isLoading={isLoading}
                startIcon={selectedStarter ? <CopyAll /> : <Add />}
                label={selectedStarter ? Labels.DUPLICATE : Labels.ADD}
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
