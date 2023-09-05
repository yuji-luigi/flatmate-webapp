interface CurrentSpaceContextState {
  currentSpace?: CurrentSpace | null;
  setCurrentSpace: (space: CurrentSpace | null) => void;
}
