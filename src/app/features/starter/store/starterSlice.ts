import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { RootState } from '../../../store';
import { createItem, deleteItem, getItems, updateItem } from '../../../utils/api';

const initialState: InitialStateType<Starter> = {
  items: [],
  isLoading: false,
  isLoaded: false,
  selectedFeatureId: '',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getStartersAsync = createAsyncThunk(
  'starter/getStarters',
  async () => {
    // The value we return becomes the `fulfilled` action payload
    const response = await getItems<Starter>({
      featureName: camelCase(Labels.STARTER),
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const createStarterAsync = createAsyncThunk(
  'starter/createStarter',
  async (newItem: Starter) => {
    // The value we return becomes the `fulfilled` action payload
    const response = await createItem<Starter>({
      featureName: camelCase(Labels.STARTER),
      newItem,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateStarterAsync = createAsyncThunk(
  'starter/updateStarter',
  async (updatedItem: Starter) => {
    // The value we return becomes the `fulfilled` action payload
    const response = await updateItem<Starter>({
      featureName: camelCase(Labels.STARTER),
      updatedItem,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteStarterAsync = createAsyncThunk(
  'starter/deleteStarter',
  async (id: string) => {
    // The value we return becomes the `fulfilled` action payload
    const response = await deleteItem({
      featureName: camelCase(Labels.STARTER),
      id,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const starterSlice = createSlice({
  name: 'starter',
  initialState,
  reducers: {
    setSelectedFeatureId: (state, action: PayloadAction<string>) => {
      state.selectedFeatureId = action.payload;
    },
    deleteFeature: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getStartersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStartersAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(getStartersAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = false;
      })
      .addCase(createStarterAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStarterAsync.fulfilled, (state, action) => {
        state.items = state.items.concat(action.payload);
        state.isLoading = false;
        state.isLoaded = true;
        state.selectedFeatureId = action?.payload[0].id || '';
      })
      .addCase(createStarterAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = false;
      })
      .addCase(updateStarterAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStarterAsync.fulfilled, (state, action) => {
        const updatedIds = action.payload.map((item) => item.id);

        state.items = [
          ...state.items
            .filter((item) => !updatedIds.includes(item.id))
            .concat(action.payload),
        ];
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(updateStarterAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = false;
      })
      .addCase(deleteStarterAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStarterAsync.fulfilled, (state, action) => {
        // TODO Remove this test code
        console.log('ELITEST delete starter async', {
          payload: action.payload,
        });
        //^ TODO Remove this test code
        state.items = [
          ...state.items.filter((item) => item.id !== action.payload.id),
        ];
        state.isLoading = false;
        state.isLoaded = true;

        if (state.selectedFeatureId === action.payload.id) {
          state.selectedFeatureId = '';
        }
      })
      .addCase(deleteStarterAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = false;
      });
  },
});

export const { deleteFeature, setSelectedFeatureId } = starterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.starter.value)`
export const selectStarters = (state: RootState) => state.starter.items;
export const selectStarterIsLoading = (state: RootState) =>
  state.starter.isLoading;
export const selectStarterIsLoaded = (state: RootState) =>
  state.starter.isLoaded;
export const selectSelectedStarterId = (state: RootState) =>
  state.starter.selectedFeatureId;
export const selectSelectedStarter = (state: RootState) =>
  state.starter.items.find(
    (item) => item.id === selectSelectedStarterId(state)
  );

export default starterSlice.reducer;
