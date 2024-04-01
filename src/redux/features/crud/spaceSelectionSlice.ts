import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import {
  FetchSpaceSelectionPayload,
  fetchSpaceSelections,
  selectSpaceSelection,
} from "../spaceSelectionAsyncthunks";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks/useRedux";
import { NOTIFICATIONS } from "../../../data/showNofification/notificationObjects";
import { SpaceModel } from "../../../types/models/space-model";

const initialState: {
  data: {
    spaceSelections: SpaceModel[];
  };
  status: string;
  submitting: boolean;
  error?: string | null;
  message?: string | null;
} = {
  data: {
    spaceSelections: [],
  },
  status: "idle",
  submitting: false,
  error: null,
  message: null,
};

//TODO: ONDELETE GET REQUEST/ SOME UPDATE REDUX STORE LOGIC IN BACKEND OR IN FRONTEND

export const spaceSelectionSlice = createSlice({
  name: "spaceSelection",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpaceSelections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpaceSelections.fulfilled, (state, action) => {
        const { documents } = action.payload;
        state.status = "succeed";
        state.data.spaceSelections = documents;
      })
      .addCase(fetchSpaceSelections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(selectSpaceSelection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectSpaceSelection.fulfilled, (state, action) => {
        const { documents } = action.payload;
        state.status = "succeed";
        state.data.spaceSelections = documents;
      })
      .addCase(selectSpaceSelection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSubmitting, resetStatus } = spaceSelectionSlice.actions;

export default spaceSelectionSlice.reducer;

export const useSpaceSelectionSliceStore = () => {
  const appDispatch = useAppDispatch();

  return {
    fetchSpaceSelections(data: FetchSpaceSelectionPayload) {
      appDispatch(fetchSpaceSelections(data));
    },

    selectSpaceSelection(id: string) {
      appDispatch(selectSpaceSelection(id));
    },
  };
};

const useCrudMessage = () => useAppSelector((state) => state.spaceSelection.message);
const useCrudStatus = () => useAppSelector((state) => state.spaceSelection.status);
const useCrudError = () => useAppSelector((state) => state.spaceSelection.error);
const useSpaceSelections = () =>
  useAppSelector((state) => state.spaceSelection.data.spaceSelections) || {};

export const useSpaceSelectionSelectors = () => {
  const spaceSelections = useSpaceSelections();
  const spaceSelectionMessage = useCrudMessage();
  const spaceSelectionStatus = useCrudStatus();
  const spaceSelectionError = useCrudError();

  const submitting = useAppSelector((state) => state.spaceSelection.submitting);

  useEffect(() => {
    if (spaceSelectionError) {
      showNotification(NOTIFICATIONS.ERROR.general({ data: spaceSelectionError, ms: 5000 }));
    }
  }, [spaceSelectionError, submitting]);

  return {
    spaceSelections,
    spaceSelectionError,
    spaceSelectionMessage,
    spaceSelectionStatus,
    submitting,
  };
};
