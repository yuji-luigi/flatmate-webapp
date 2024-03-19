import { Overlay, Container, Title, Button, Text, Box } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import classes from "./hero.module.css";
import { PATH_CLIENT } from "../../path/path-frontend";
import { useLocale } from "../../../hooks/useLocale";

export function HeroSection() {
  const { t } = useLocale("common");
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{t("Flatmates condominium manager")}</Title>
        <Box className={classes.descriptionSection}>
          <Text className={classes.description} size="xl" mt="xl">
            {t(
              "Where everyone can manage spending of condominiums and enables all kinds of communications within condominium."
            )}
          </Text>

          <Button
            component={Link}
            href={PATH_CLIENT.signup}
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            Get started
          </Button>
        </Box>
      </Container>
    </div>
  );
}
