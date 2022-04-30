import { Field, Form, Formik, FormikProps } from 'formik';

import { Add, Clear, Save } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { MenuItem, Rating, Stack, TextField } from '@mui/material';

import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppButton } from '../../../shared/AppButton/AppButton';
import {
  createLoafAsync,
  setSelectedFeatureId,
  updateLoafAsync,
} from '../store/loafSlice';
import { AppUpload } from '../../../shared/AppUpload/AppUpload';
import { deleteImage, uploadFile } from '../../../utils/api';
import { useState } from 'react';

interface Props {
  isLoading: boolean;
  selectedLoaf?: Loaf;
  starters?: Starter[];
}

interface LoafFormValues {
  date: string;
  name: string;
  rating: number;
  starterId: string;
  image?: AirTableAttachment[];
  notes?: string;
}

export function LoafForm({ isLoading, selectedLoaf, starters }: Props) {
  /* State */
  const [deleteImageHash, setDeleteImageHash] = useState<string>('');
  const [imageData, setImageData] = useState<File>();

  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Page Logic */
  const initialValues = selectedLoaf
    ? {
        date: selectedLoaf?.date || new Date().toString(),
        image: selectedLoaf?.image,
        name: selectedLoaf?.name || '',
        rating: selectedLoaf?.rating || 1,
        starterId: selectedLoaf?.starterId || '',
        notes: selectedLoaf?.notes || '',
      }
    : {
        date: new Date().toString(),
        image: [],
        name: '',
        rating: 1,
        starterId: '',
        notes: '',
      };

  const onAdd = (values: LoafFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST onAdd', { selectedLoaf, values });
    //^ TODO Remove this test code
    dispatch(createLoafAsync(values));
  };

  const onSubmit = (values: LoafFormValues) => {
    // TODO Remove this test code
    console.log('ELITEST onSubmit', { selectedLoaf, values });
    //^ TODO Remove this test code
    if (imageData) {
      // TODO Verify the image changed
      uploadFile(imageData).then((result) => {
        setDeleteImageHash(result.data.deletehash);
        values.image = [
          {
            url: result.data.link,
            filename: imageData.name,
          },
        ];

        // TODO Remove this test code
        console.log('ELITEST uploadFile', { result, deleteImageHash });
        // ^ TODO Remove this test code

        if (selectedLoaf) {
          dispatch(updateLoafAsync(values)).then(() =>
            deleteImage(result.data.deletehash)
          );
        } else {
          dispatch(createLoafAsync(values)).then(() =>
            deleteImage(result.data.deletehash)
          );
        }
      });
    } else {
      if (selectedLoaf) {
        dispatch(updateLoafAsync(values));
      } else {
        dispatch(createLoafAsync(values));
      }
    }
  };

  const onReset = () => dispatch(setSelectedFeatureId(''));

  return (
    <AppBox title='Loaf Form'>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(props: FormikProps<LoafFormValues>) => (
          <Form id='loaf-form'>
            <Stack spacing={2}>
              <Stack direction='row' spacing={2}>
                <Field
                  name={camelCase(Labels.NAME)}
                  as={TextField}
                  label={Labels.NAME}
                  fullWidth
                />
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
              </Stack>
              <Stack direction='row' spacing={2}>
                <Field
                  name={camelCase(Labels.RATING)}
                  as={Rating}
                  label={Labels.RATING}
                  type='number'
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
                name={camelCase(Labels.IMAGE)}
                as={AppUpload}
                onUpload={(file: File) => {
                  setImageData(file);
                }}
                label={Labels.IMAGE}
                fullWidth
              />
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
              {selectedLoaf && (
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
                  startIcon={selectedLoaf ? <Save /> : <Add />}
                  label={selectedLoaf ? Labels.SAVE : Labels.ADD}
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
