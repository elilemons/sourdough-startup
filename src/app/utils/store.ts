import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

export const getFeatureItemsAsync = <T>({
  actionType,
  featureItemsGet,
}: GetFeatureItemsAsyncParams<T>): AsyncThunk<T[], void, {}> =>
  createAsyncThunk(actionType, async () => {
    // TODO Remove this test code
    console.log('ELITEST getFeatureItemsAsync called');
    //^ TODO Remove this test code

    const response = await featureItemsGet();
    return response.data;
  });
