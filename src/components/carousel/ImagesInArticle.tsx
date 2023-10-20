import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { UploadModel } from '../../types/models/upload-model';
import classes from './ImagesInArticle.module.css';

function ImagesInArticle({ images }: { images: File[] | UploadModel[] }) {
  if (!images.length) {
    return null;
  }

  let size = images.length === 1 ? 300 : 110;
  size = images.length === 2 ? 165 : size;

  return (
    <Box className={classes.gridWrapper}>
      <Grid className={classes.imagesGrid}>
        {images.map((image, i) => {
          console.log(image);
          const isFile = image instanceof File;
          size = i > 2 ? 169 : size;
          return (
            <Grid.Col span="auto" key={isFile ? image.name : image._id} className={classes.column}>
              <Image
                src={isFile ? URL.createObjectURL(image) : image.url}
                width={size}
                height={size}
                alt={isFile ? image.name : image.originalFileName}
                style={{ objectFit: 'cover' }}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ImagesInArticle;
