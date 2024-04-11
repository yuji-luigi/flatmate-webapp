import { forwardRef, ReactNode } from "react";
// next
import Head from "next/head";

// ----------------------------------------------------------------------
interface props {
  children?: ReactNode;
  title?: string;
  meta?: any;
  other?: any;
}

const Page = forwardRef<void, props>(({ children, title = "", meta, ...other }, ref) => {
  const _title = ` Flatmates | ${title} `;
  return (
    <>
      <Head>
        <title>{_title}</title>
        {meta}
      </Head>
      <main {...other}>{children}</main>
    </>
  );
});

Page.displayName = "Page";

export default Page;
