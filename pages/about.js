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
            <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-8">
              About GotPop
            </h1>
            <div className="prose dark:prose-invert">
              <p>I build enterprise websites that perform well on all devices, focusing on responsive design, aesthetics, clean code & page speed.</p>
              <Link href={"/contact"}>
                <a className="inline-flex items-center no-underline justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Get in touch
                </a>
              </Link>
              <Image
                // loader={myLoader}
                className="rounded-full w-32"
                src={profile.avatar_url}
                alt="Profile avatar"
                width={100}
                height={100}
              />
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

