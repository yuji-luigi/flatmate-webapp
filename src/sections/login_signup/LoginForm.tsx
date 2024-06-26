import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm } from "@mantine/form";

import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
import { LoginFormValues } from "../../types/context/auth/formData";

import { Icons } from "../../data/icons/icons";
import { PATH_CLIENT, _PATH_FRONTEND } from "../../path/path-frontend";
import { useCookieContext } from "../../context/CookieContext";
import { Role } from "../../types/models/space-model";

function LoginForm({ role }: { role: Role }) {
  const { resetCurrentSpace, setCurrentOrganization } = useCookieContext();
  const { login, user } = useAuth();
  const router = useRouter();
  const { push, query } = router;

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      resetCurrentSpace();
      setCurrentOrganization(null);
      // the hook handle the redirect see jwt-context.tsx
      const meUser = await login(values.email, values.password, role);
      if (meUser) {
        router.push(_PATH_FRONTEND.pathAfterLogin(meUser.loggedAs));
        return;
      }
      throw new Error("Login failed");
    } catch (error: any) {
      notifications.show({
        title: "Error",
        color: "red",
        icon: <Icons.alert />,
        message: error.message || error || "connection error",
        autoClose: 2000,
      });
      console.error(error.message || error);
    }
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        name="email"
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Your password"
        mt="md"
        size="md"
        {...form.getInputProps("password")}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth type="submit" mt="xl" size="md">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
