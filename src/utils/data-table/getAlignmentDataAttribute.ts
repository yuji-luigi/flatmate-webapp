export const getAlignmentDataAttribute = (alignment: 'left' | 'center' | 'right' = 'left') => {
  // Construct the data attribute based on the alignment value
  return { [`data-align-${alignment}`]: true };
};
