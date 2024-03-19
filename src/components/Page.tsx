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

const Page = forwardRef<void, props>(({ children, title = "", meta, ...other }, ref) => (
  <>
    <Head>
      <title>{` Flatmates | ${title} `}</title>
      {meta}
    </Head>
    <div {...other}>{children}</div>
  </>
));

export default Page;
