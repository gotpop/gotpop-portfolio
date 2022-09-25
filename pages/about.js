import Container from "@components/container";
import Layout from "@components/layout";
import Link from "next/link";
import Head from 'next/head';
import Image from 'next/image';
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
          <div className="mb-8 bg-white rounded p-6">
            <div className="flex mb-4">
              <h1 className="inline-block mr-2 text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium">
                About GotPop
              </h1>
              <Image
                // loader={myLoader}
                className="rounded-full"
                src={profile.avatar_url}
                alt="Profile avatar"
                width={30}
                height={30}
              />
            </div>
            <div className="prose dark:prose-invert">
              <p>I build enterprise websites that perform well on all devices, focusing on responsive design, aesthetics, clean code & page speed.</p>
              <Link href={"/contact"}>
                <a className="inline-flex mr-4 items-center no-underline justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Get in touch
                </a>
              </Link>
              <Link href={"/skills"}>
                <a className="inline-flex items-center no-underline justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  View projects
                </a>
              </Link>
            </div>
          </div>
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

