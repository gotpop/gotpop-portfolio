import React from "react";
import Head from "next/head";
import GetImage from "@utils/getImage";
import Navbar from "@components/navbar";
import Footer from "@components/footer";

export default function Layout(props) {
  const { children } = props;
  const ogimage = GetImage(props?.openGraphImage)?.src ?? "";
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
      </Head>
      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Navbar {...props} />
        <div className="mamain">{children}</div>

        <Footer {...props} />
      </div>
    </>
  );
}
