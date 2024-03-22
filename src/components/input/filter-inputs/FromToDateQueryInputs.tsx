import { Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";

type FromToDateQueryInputsProps = {
  endpoint: string;
  fromName: string;
  toName: string;
  onChangeCallback?: (value: { [key: string]: null | Date }) => void;
  defaultValues?: {
    from: Date;
    to: Date;
  };
};
export const FromToDateQueryInputs = (props: FromToDateQueryInputsProps) => {
  const { t } = useLocale("common");
  const { endpoint, fromName, toName, onChangeCallback, defaultValues } = props;
  const form = useForm<{
    [key: string]: null | Date;
  }>({
    initialValues: {
      [fromName]: defaultValues?.from || null,
      [toName]: defaultValues?.to || null,
    },
  });
  const { values, setValues } = form;
  useEffect(() => {
    if (values[fromName] || (values[toName] && onChangeCallback)) {
      onChangeCallback?.(values);
    }
  }, [values]);
  useEffect(() => {
    if (defaultValues?.from || defaultValues?.to) {
      onChangeCallback?.(values);
    }
  }, [values]);
  return (
    <form>
      <Group justify="end">
        {t("from")}
        <MonthPickerInput
          value={values[fromName]}
          placeholder="from"
          onChange={(value) => setValues({ ...values, [fromName]: value })}
          style={{ width: "30%" }}
          rightSectionPointerEvents="none"
          rightSection={<Icons.calendar />}
        />
        {t("to")}
        <MonthPickerInput
          value={values[toName]}
          placeholder="to"
          onChange={(value) => setValues({ ...values, [toName]: value })}
          style={{ width: "30%" }}
          rightSectionPointerEvents="none"
          rightSection={<Icons.calendar />}
        />
      </Group>
    </form>
  );
};
