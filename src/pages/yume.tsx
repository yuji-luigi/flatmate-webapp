import { Box, Button, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';

const nextColors: Record<string, string> = {
  yellow: 'green',
  green: 'pink',
  pink: 'lightblue',
  lightblue: 'red',
  red: 'teal',
  teal: 'black',
  black: 'white',
  white: 'gray',
  gray: 'yellow',
};

const Yume = () => {
  const [color, setColor] = useState<string>('yellow');

  const handleClick = () => {
    // alert('夢ボタンが押されました');

    setColor(nextColors[color]);
  };
  return (
    <>
      <Box
        className="yumePage"
        style={{
          display: 'grid',
          placeContent: 'center',
          width: '100%',
          height: '100vh',
          // display: 'flex',
          backgroundColor: color,
          transition: 'background-color 0.5s',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="gridContainer">
          <input type="checkbox" />
          <input type="text" />
        </div>
        <h1>
          This is the yume page
          <p>p in h1</p>
        </h1>
        <p className="paragraph">pragraph with class</p>
        <h1>this is h1 without p</h1>
        <div className="gridContainer cards">
          <div className="card">
            <p>text</p>
          </div>
          <div className="card">
            <p>text</p>
          </div>
          <div className="card">
            <p>text</p>
          </div>
          <div className="card">
            <p>text</p>
          </div>
          <div className="card">
            <p>text</p>
          </div>
          <div className="card">
            <p>text</p>
          </div>
        </div>
        <Stack>
          <Text color="blue" fw={900} fz={60}>
            yume
          </Text>
          <Button onClick={handleClick}>夢ボタン</Button>
        </Stack>
      </Box>
    </>
  );
};

export default Yume;
