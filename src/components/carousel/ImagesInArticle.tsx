import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { UploadModel } from "../../types/models/upload-model";
import classes from "./ImagesInArticle.module.css";

function getImageSize({ length, index }: { length: number; index: number }) {
  let size = length === 1 ? 300 : 110;
  size = length === 2 ? 165 : size;
  size = index > 2 ? 169 : size;
  size = length >= 4 ? 100 : size;
  return size;
}

function ImagesInArticle({ images }: { images: File[] | UploadModel[] }) {
  if (!images.length) {
    return null;
  }
  let size = images.length === 1 ? 300 : 110;
  size = images.length === 2 ? 165 : size;
  size = images.length === 3 ? 190 : size;
  size = images.length >= 4 ? 165 : size;

  return (
    <Box className={classes.gridWrapper}>
      {/* <Grid className={classes.imagesGrid}> */}
      {images.map((image, i) => {
        if (i > 2) return null;
        const isFile = image instanceof File;
        // size = getImageSize({ length: images.length, index: i });
        // size = i > 2 ? 169 : size;

        return (
          <Box key={isFile ? image.name : image._id} className={classes.column}>
            <Image
              src={isFile ? URL.createObjectURL(image) : image.url}
              width={size}
              height={size}
              alt={isFile ? image.name : image.originalFileName}
              className={classes.image}
            />
          </Box>
        );
      })}
      {/* </Grid> */}
    </Box>
  );
}

export default ImagesInArticle;
