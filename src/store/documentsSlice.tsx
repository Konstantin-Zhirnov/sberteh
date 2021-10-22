import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDocuments, IFeatures, ISecondDocuments, IState, ITitleForFeatures } from '../types';
import { RootState } from './index';

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=20');
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSecondDocuments = createAsyncThunk(
  'documents/fetchSecondDocuments',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${id}`);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFeatures = createAsyncThunk(
  'documents/fetchFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchPatchFeatures = createAsyncThunk(
  'documents/fetchPatchFeatures',
  async (id, { rejectWithValue, dispatch, getState }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const text = getState().documents.newTitleForFeatures.text;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: text,
        }),
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      dispatch(patchFeatures({ id, text }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState: IState = {
  documents: [],
  secondDocuments: [],
  features: [],
  searchTextDocuments: '',
  searchTextFeatures: '',
  newTitleForFeatures: { id: null, text: '' },
  status: null,
  error: null,
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      if (action.payload.flag === 'documents') {
        state.searchTextDocuments = action.payload.text;
      } else {
        state.searchTextFeatures = action.payload.text;
      }
    },
    patchFeatures(state, action) {
      const feature = state.features.find((item) => item.id === action.payload.id);
      if (feature) feature.title = action.payload.text;
    },
    setNewTitleForFeatures: (state, action) => {
      state.newTitleForFeatures = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, pending)
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(fetchSecondDocuments.pending, pending)
      .addCase(fetchSecondDocuments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.secondDocuments = action.payload;
      })
      .addCase(fetchSecondDocuments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(fetchFeatures.pending, pending)
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(fetchPatchFeatures.pending, pending)
      .addCase(fetchPatchFeatures.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(fetchPatchFeatures.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  },
});

function pending(state: IState) {
  state.status = 'loading';
  state.error = null;
}

export const { setSearchText, patchFeatures, setNewTitleForFeatures } = documentsSlice.actions;

export const getDocuments = (state: RootState): IDocuments[] => state.documents.documents;
export const getSecondDocuments = (state: RootState): ISecondDocuments[] =>
  state.documents.secondDocuments;
export const getFeatures = (state: RootState): IFeatures[] => state.documents.features;

export const getStatus = (state: RootState): string | null => state.documents.status;
export const getError = (state: RootState): string | null => state.documents.error;
export const getSearchTextDocuments = (state: RootState): string | '' =>
  state.documents.searchTextDocuments;
export const getSearchTextFeatures = (state: RootState): string | '' =>
  state.documents.searchTextFeatures;
export const getNewTitleForFeatures = (state: RootState): ITitleForFeatures =>
  state.documents.newTitleForFeatures;

export default documentsSlice.reducer;
