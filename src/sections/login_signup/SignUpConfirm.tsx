import { UseFormReturnType } from "@mantine/form";
import { IInitialValues } from "./defaultValues";
import SimpleRow from "../../components/list/SimpleRow";
import { useLocale } from "../../../hooks/useLocale";

const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  const { t } = useLocale("sign-up");
  return (
    <>
      <SimpleRow title={t("name")} content={form.values.name} top />
      <SimpleRow title={t("surname")} content={form.values.surname} />
      <SimpleRow title={t("email")} content={form.values.email} />
      <SimpleRow title={t("role")} content={form.values.role} />
      <SimpleRow title={t("password")} content="****" />
      {form.values.role !== "maintainer" && (
        <>
          <SimpleRow title={t("Name of the place")} content={form.values.space.name} />
          <SimpleRow title={t("Address of the place")} content={form.values.space.address} />
          <SimpleRow title={t("Password of building")} content={form.values.space.password} />
        </>
      )}
    </>
  );
};

export default SignUpStepTwo;
