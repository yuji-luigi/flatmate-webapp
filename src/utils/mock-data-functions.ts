// get random item from an array
export const getRandomItemFromArray = (array: any[]) => {
  let path = array[Math.floor(Math.random() * array.length)];
  path = typeof path === 'string' ? path : Object.values(path)[0];
  return path;
};
