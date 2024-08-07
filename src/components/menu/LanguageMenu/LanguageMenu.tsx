import { useEffect, useState } from "react";
import { UnstyledButton, Menu, Image, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./LanguageMenu.module.css";
import { PATH_IMAGE } from "../../../lib/image-paths";
import { useLocale } from "../../../../hooks/useLocale";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpoint } from "../../../path/path-api";

const { LOCALE_IMAGES } = PATH_IMAGE;
const data = [
  { label: "English", image: LOCALE_IMAGES.english, value: "en" },
  // { label: 'German', image: LOCALE_IMAGES.german },
  { label: "Italian", image: LOCALE_IMAGES.italian, value: "it" },
  // { label: 'French', image: LOCALE_IMAGES.french },
  // { label: 'Polish', image: LOCALE_IMAGES.polish },
] as const;
type Language = (typeof data)[number];
export function LanguageMenu() {
  const [opened, setOpened] = useState(false);
  const { changeLanguage, locale } = useLocale("common");
  const [selected, setSelected] = useState<Language>(data[0]);
  const handleSelected = (item: Language) => {
    setSelected(item);
    changeLanguage(item.value);
    axiosInstance.post(apiEndpoint.users.changeLocale, { locale: item.value });
  };
  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => handleSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));
  useEffect(() => {
    setSelected(data.find((item) => item.value === locale) || data[0]);
  }, [locale]);
  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal={false}
      // classNames={classNames}
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
        {/* <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton> */}
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
