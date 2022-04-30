import { Close, Upload } from '@mui/icons-material';
import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import { SyntheticEvent, useState } from 'react';

interface AppUploadProps {
  onUpload: (file: File, fileUrl: string) => void;
}

export function AppUpload({ onUpload }: AppUploadProps) {
  const Input = styled('input')({
    display: 'none',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  return (
    <>
      {selectedImage && (
        <div>
          <img
            alt='Amazing loaf of sourdough'
            width={'250px'}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <Button startIcon={<Close />} onClick={() => setSelectedImage(null)}>
            Remove
          </Button>
        </div>
      )}
      <label htmlFor='contained-button-file'>
        <Input
          accept='image/*'
          id='contained-button-file'
          type='file'
          onChange={(event: SyntheticEvent) => {
            if (event && event.target) {
              const target = event.target as HTMLInputElement;
              if (target.files && target.files[0]) {
                // TODO Remove this test code
                console.log('ELITEST file uploaded', {
                  event,
                  'event.target.files[0]': target.files[0],
                });
                // ^ TODO Remove this test code
                setSelectedImage(target.files[0]);
                onUpload(target.files[0], target.value);
              }
            }
          }}
        />
        <Button component='span' startIcon={<Upload />}>
          Upload a Photo of the Loaf
        </Button>
      </label>
    </>
  );
}
