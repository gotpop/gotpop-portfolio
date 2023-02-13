import { CodeIcon, MailIcon } from "@heroicons/react/outline";

import Container from "@components/container";
import Head from "next/head";
import Intro from "@components/ui/intro";
import Layout from "@components/layout";
import Link from "next/link";
import { configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";

export default function About({ siteconfig, profile }) {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout {...siteconfig}>
        <Container>
          <Intro
            title={"About"}
            profile={profile}
            // skills={false}
            left={
              <p className="mb-2 text-gray-500 max-w-prose">
                I build enterprise websites that perform well on all
                devices, focusing on responsive design, aesthetics,
                clean code & page speed.
              </p>
            }
            right={
              <>
                <Link
                  className="flex items-center justify-between px-6 py-2 mb-3 text-xs font-medium leading-tight text-gray-800 transition duration-150 ease-in-out bg-white rounded hover:bg-cool focus:outline-none focus:ring-0"
                  href={"/contact"}>
                  Get in touch
                  <MailIcon className="w-6 h-6 ml-2" />
                </Link>
                <Link
                  href={"/skills"}
                  className="flex items-center justify-between px-6 py-2 mb-3 text-xs font-medium leading-tight text-gray-800 transition duration-150 ease-in-out bg-white rounded hover:bg-cool focus:outline-none focus:ring-0">
                  View projects
                  <CodeIcon className="w-6 h-6 ml-2" />
                </Link>
              </>
            }
          />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const url = "https://api.github.com/users/gotpop";
  const config = await getClient(preview).fetch(configQuery);

  const getProfile = await fetch(url);
  const getProfileData = await getProfile.json();

  return {
    props: {
      profile: getProfileData,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
