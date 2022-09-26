import Container from "@components/container";
import Layout from "@components/layout";
import Link from "next/link";
import Head from 'next/head';
import Intro from "@components/ui/intro";
import { configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import { MailIcon, CodeIcon } from "@heroicons/react/outline";

export default function About({ siteconfig, profile }) {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout {...siteconfig}>
        <Container>
          <Intro
            title={'About'}
            profile={profile}
            // skills={false}
            left={
              <p className="text-gray-500 mb-2 max-w-prose">I build enterprise websites that perform well on all devices, focusing on responsive design, aesthetics, clean code & page speed.</p>
            }
            right={
              <>
                <Link href={'/contact'}>
                  <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Get in touch
                    <MailIcon className="w-6 h-6 ml-2" />
                  </a>
                </Link>
                <Link href={"/skills"}>
                  <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    View projects
                    <CodeIcon className="w-6 h-6 ml-2" />
                  </a>
                </Link>
              </>
            } />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const url = "https://api.github.com/users/gotpop"
  const config = await getClient(preview).fetch(configQuery);

  const getProfile = await fetch(url)
  const getProfileData = await getProfile.json()

  return {
    props: {
      profile: getProfileData,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}

