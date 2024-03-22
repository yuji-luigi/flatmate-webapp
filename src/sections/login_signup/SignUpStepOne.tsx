import { TextInput, PasswordInput } from "@mantine/core";
import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { PasswordStrength } from "../../components/input/Password.Strength";
import { RegisterData } from "../../types/context/auth/useAuth";
import { IInitialValues, initialValues } from "./defaultValues";
import { useLocale } from "../../../hooks/useLocale";

const SignUpStepOne = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  const { t } = useLocale("sign-up");
  return (
    <>
      <TextInput
        label={t("Name")}
        placeholder={t("First name")}
        required
        {...form.getInputProps("name")}
      />
      <TextInput
        label={t("Surname")}
        placeholder={t("Surname")}
        required
        {...form.getInputProps("surname")}
      />
      <TextInput
        label={t("Email")}
        placeholder="you@mantine.dev"
        required
        {...form.getInputProps("email")}
      />
      <PasswordStrength formControl={form.getInputProps("password")} />
      <PasswordInput
        label={t("confirm password")}
        placeholder={t("Confirm password")}
        required
        mt="md"
        {...form.getInputProps("password2")}
      />
    </>
  );
};

export default SignUpStepOne;
