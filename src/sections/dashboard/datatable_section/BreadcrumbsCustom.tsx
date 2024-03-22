import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import classes from "./BreadcrumbsCustom.module.css";

export function BreadcrumbsCustom() {
  const { breadcrumbs } = useLayoutContext();
  const items = breadcrumbs.map((item, index) => (
    <Link className={classes.link} href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </div>
  );
}
