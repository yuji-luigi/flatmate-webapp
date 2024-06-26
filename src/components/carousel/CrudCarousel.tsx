import { Carousel } from "@mantine/carousel";
import { ActionIcon, Box, Button, Group, Overlay } from "@mantine/core";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { Icons } from "../../data/icons/icons";
import { apiEndpointRootsEnum } from "../../path/path-api";
import { useCrudSelectors } from "../../redux/features/crud/crudSlice";
import axiosInstance from "../../utils/axios-instance";
import ImageSlide from "./ImageSlide";
import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";
import { UploadModel } from "../../types/models/upload-model";
import { Entity } from "../../types/redux/CrudSliceInterfaces";
// import { Image } from '@mantine/core';

type ImageType = File | UploadModel;

function CrudCarousel({
  images,
  entity,
  formField,
}: {
  images: File[] | UploadModel[];
  entity: Entity;
  formField: FormFieldTypes;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const currentImage= useRef<File | UploadModel>()
  const currentImage = images[currentImageIndex];
  const { crudDocument } = useCrudSelectors(entity);
  const handleDelete = async (image: ImageType) => {
    const isFile = image instanceof File;
    console.log(`root entity for the deleting image is ${entity}`);
    if (isFile) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this image?") && crudDocument) {
      const res = await axiosInstance.delete(
        `${apiEndpointRootsEnum.uploads}/${entity}/${crudDocument._id}/${formField.name}/${image._id}`
      );
      console.log(res.data.data);
    }
  };

  const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "gray"];

  if (true) {
    return (
      <Carousel maw={600} mx="auto" slideGap="md" withIndicators height={500}>
        {images.map((image, i) => (
          <ImageSlide image={image} handleDelete={handleDelete} />
        ))}
      </Carousel>
    );
  }
}

export default CrudCarousel;
