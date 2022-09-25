import Container from "@components/container";
import Layout from "@components/layout";
import Link from "next/link";
import Head from 'next/head';
import Image from 'next/image';
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
          <div className="mb-8 bg-white rounded flex justify-between">
            <div className="w-3/6 p-6">
              <div className="flex mb-4">
                <h1 className="inline-block mr-2 text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium">
                  About / {profile.company}
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
              <p className="text-gray-500 mb-2 max-w-prose">I build enterprise websites that perform well on all devices, focusing on responsive design, aesthetics, clean code & page speed.</p>

            </div>
            {/* <div className="w-2/6 flex flex-col items-start justify-between">

          <Link href={profile.html_url}>
            <a className="flex items-center  mb-3 justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              View profile on GitHub
              <IconGitHub color={'green'} />
            </a>
          </Link>
          <Link href="https://gist.github.com/gotpop">
            <a className="flex items-center justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              View {profile.public_gists} Gists on GitHub
              <IconGitHub color={'green'} />
            </a>
          </Link>
          <p className="text-xs mb-2">Location: {profile.location} {profile.hireable && <Hire color={'green'} />}</p>
          <Link href={'https://www.' + profile.blog}>{profile.blog}</Link>

        </div> */}
            <div className="relative clippy w-3/6 flex flex-col items-end bg-red-500 justify-end p-4">
              {/* <p className="text-xs mb-4 text-white font-bold">Location: {profile.location} {profile.hireable && <Hire color={'green'} />}</p> */}
              {/* <Link href={'https://www.' + profile.blog}>{profile.blog}</Link> */}
              <Link href={'/contact'}>
                <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Get in touch
                          <MailIcon className="w-6 h-6 ml-2" />
                </a>
              </Link>
              <Link href="skills">
                <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  View projects
                          <CodeIcon className="w-6 h-6 ml-2" />
                </a>
              </Link>
              {/* <Image
                // loader={myLoader}
                className="absolute top-0 right-0"
                src={profile.avatar_url}
                alt="Profile avatar"
                width={200}
                height={200}
              /> */}
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

