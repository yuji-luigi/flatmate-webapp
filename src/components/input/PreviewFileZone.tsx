import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio, Box, Group, Modal, Overlay, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import OverlayCustom from "../OverlayCustom";
import { Icons } from "../../data/icons/icons";
import ImagesInArticle from "../carousel/ImagesInArticle";
import CrudCarousel from "../carousel/CrudCarousel";
import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";
import { Entity } from "../../types/redux/CrudSliceInterfaces";
// import ImagesInArticle from '../carousel/ImagesInArticle';

interface Prop {
  form: UseFormReturnTypeWithMedia;
  formField: FormFieldTypes;
  /** @Link ./CreationToolBar.tsx */
  entity: Entity;
}
const PreviewFileZone = ({ form, formField, entity }: Prop) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const files = form.values.mediaPreview?.[formField?.name || ''] || [];
  const files = form.values.media?.[formField?.name || ""] || [];
  if (!files.length) {
    return null;
  }
  return (
    <Stack mt={10} gap={0}>
      <Text mb={0} size="md" fw={500}>
        {formField?.label}
      </Text>
      <OverlayCustom icon={<Icons.image />} onClick={open}>
        {!!files.length &&
          files.map((upload) => {
            /** is File object created when select file from machine, otherwise upload model from DB */
            const isFile = upload instanceof File;
            return (
              <Image
                key={isFile ? upload.name : upload._id}
                src={isFile ? URL.createObjectURL(upload) : upload.url}
                alt={formField?.label || "preview"}
                style={{ objectFit: "contain", marginInline: 20 }}
                width="150"
                height="150"
              />
            );
          })}
      </OverlayCustom>
      {/* this carousel must be somewhere out side of the drawer. lets put this on top level component.  */}
      <Modal opened={opened} onClose={close} withOverlay size={900} centered>
        <CrudCarousel entity={entity} images={files} formField={formField} />
      </Modal>
      {opened && <Overlay />}
    </Stack>
  );
};

export default PreviewFileZone;
