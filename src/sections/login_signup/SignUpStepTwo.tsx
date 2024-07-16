import { TextInput, Select, Switch, Text, Tooltip, Transition } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IInitialValues } from "./defaultValues";
import { useLocale } from "../../../hooks/useLocale";

const Roles = [
  { label: "User/inhabitant", value: "inhabitant" },
  { label: "maintainer", value: "maintainer" },
  { label: "property_manager", value: "property_manager" },
];
const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  const { t } = useLocale("sign-up");
  return (
    <>
      <Select
        data={Roles}
        name="role"
        label={t("step2.label1")}
        size="md"
        mt={10}
        required
        {...form.getInputProps("role")}
      />

      <Transition
        mounted={!!(form.values.role && form.values.role !== "maintainer")}
        duration={800}
        transition="slide-up"
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <>
              <TextInput
                required
                label={t("step2.label2")}
                name="space.name"
                placeholder="<La Perla> Condominio: Roma 2"
                {...form.getInputProps("space.name")}
              />
              <TextInput
                required
                label={t("spaceLabel2")}
                name="space.address"
                placeholder="gold street 3, 20888"
                {...form.getInputProps("space.address")}
              />
              <TextInput
                required
                label={t("passLabel")}
                name="space.password"
                placeholder="secret777"
                {...form.getInputProps("space.password")}
              />
            </>
          </div>
        )}
      </Transition>
      <Transition
        mounted={!!form.values.role}
        duration={800}
        transition="slide-up"
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <Switch name="isPublic" label={<SwitchLabel />} {...form.getInputProps("isPublic")} />
          </div>
        )}
      </Transition>
    </>
  );
};

export default SignUpStepTwo;

function SwitchLabel() {
  const { t } = useLocale("sign-up");
  return (
    <Text>
      {t("switchLabel")}{" "}
      <Tooltip label={t("Not share any details. only name surname email")}>
        <span className="detail-helper-text">detail</span>
      </Tooltip>
    </Text>
  );
}
