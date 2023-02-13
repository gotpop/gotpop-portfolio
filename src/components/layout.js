import Footer from "@components/footer";
import Head from "next/head";
import Navbar from "@components/navbar";
import React from "react";

export default function Layout(props) {
  const { children } = props;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
      </Head>
      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Navbar {...props} />
        <div className="min-h-[60vh] bg-cool dark:bg-black ">{children}</div>
        <Footer {...props} />
      </div>
    </>
  );
}
