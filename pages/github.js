import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { postquery, configQuery } from "@lib/groq";
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from "next/link";

export default function GitHub(props) {
  const { profile, repos, gists, siteconfig, preview } = props;
  const router = useRouter();

  useEffect(() => {
    console.log('profile :', profile);
    console.log('repos :', repos);
    console.log('gists :', gists);
  }, [profile, repos, gists])

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  return (
    <>
      <Head>
        <title>GitHub</title>
      </Head>
      {siteConfig && (
        <Layout {...siteConfig}>
          <Container className="lg:pt-8 lg:pb-14">
            <div className="mb-8 bg-white rounded p-6">
              <div className="flex">
                <div className="w-3/6">
                  <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                    GitHub / {profile.company}
                  </h1>
                  <p className="text-gray-500 mb-2">{profile.bio}</p>
                  <p className="text-xs">Location: {profile.location}</p>
                </div>
                <div className="w-2/6 flex flex-col justify-between items-start">


                  <Link href={profile.html_url}>
                    <a className="inline-flex items-center justify-between px-6 py-2 border-2 border-gray-600 text-gray-800 font-medium text-xs leading-tight rounded bg-gray-100 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View profile on GitHub
                      <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg></span></a>
                  </Link>
                  <Link href="https://gist.github.com/gotpop">
                    <a className="flex items-center justify-between px-6 py-2 border-2 border-gray-600 text-gray-800 font-medium text-xs leading-tight rounded bg-gray-100 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View {profile.public_gists} Gists on GitHub
                      <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg></span></a>
                  </Link>


                </div>
                <div className="w-1/6 flex justify-end items-start">
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
              {/* {profile.hireable && ( <Image
                    // loader={myLoader}
                    className="rounded-full w-32"
                    src={profile.avatar_url}
                    alt="Profile avatar"
                    width={100}
                    height={100}
                  />)} */}
            </div>
            <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {repos.map((repo, index) => (

                <div className="bg-white p-4 rounded" key={index}>
                  <div className="flex justify-between mb-4">
                    <h2 className="capitalize text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                      {repo.name}
                    </h2>






                    <Link href={repo.html_url}>
                      <a className="flex items-center justify-between px-6 py-2 border-2 border-gray-600 text-gray-800 font-medium text-xs leading-tight rounded bg-gray-100 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        View repo on GitHub


                        <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="github"><path fill="currentColor" d="M25 0C11.2 0 0 11.5 0 25.6 0 37 7.2 46.6 17.1 50c1.2.2 1.7-.6 1.7-1.2V44c-7 1.6-8.4-3-8.4-3-1.1-3-2.8-3.8-2.8-3.8-2.3-1.6.2-1.6.2-1.6 2.5.2 3.8 2.6 3.8 2.6 2.2 3.9 5.8 2.8 7.3 2.1.2-1.7.9-2.8 1.6-3.4C14.9 36.3 9 34.1 9 24.3c0-2.8 1-5.1 2.6-6.9-.3-.6-1.1-3.3.2-6.8 0 0 2.1-.7 6.9 2.6 2-.6 4.1-.9 6.3-.9 2.1 0 4.3.3 6.3.9 4.8-3.3 6.9-2.6 6.9-2.6 1.4 3.5.5 6.1.2 6.8 1.6 1.8 2.6 4.1 2.6 6.9 0 9.8-5.8 12-11.4 12.6.9.8 1.7 2.4 1.7 4.7v7c0 .7.4 1.5 1.7 1.2 9.8-3.2 17-12.8 17-24.2C50 11.5 38.8 0 25 0z"></path></svg></span>


                      </a>
                    </Link>
                  </div>

                  <p className="text-sm text-gray-500 mb-2">{repo.description}</p>
                  <p className="text-sm text-gray-500 mb-4">Licence: {repo?.license?.name}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.map((topic, index) => {
                      const list = (
                        <span key={index} className="block-inline rounded bg-gray-100 py-1 px-4 text-sm">{topic}</span>
                      )
                      return list;
                    })}
                  </div>
                  <div className="m-1 bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                    <div id="header-buttons" className="py-3 px-4 flex">
                      <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                      <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                      <div className="rounded-full w-3 h-3 bg-green-500"></div>
                    </div>
                    <div id="code-area" className="py-4 px-4 mt-1 text-white text-sm">
                      <div className="mb-2">
                        <span className="text-yellow-300">git</span> <span className="text-blue-400">clone</span> <span className="text-green-400">{repo.ssh_url}</span>
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const url = "https://api.github.com/users/gotpop"
  const config = await getClient(preview).fetch(configQuery)
  const getProfile = await fetch(url)
  const getProfileData = await getProfile.json()


  const getRepos = await fetch(getProfileData.repos_url)
  const getRepoData = await getRepos.json()

  const getGists = await fetch(url + '/gists')
  const getGistsData = await getGists.json()


  // <p>{profile.repos_url}</p>

  return {
    props: {
      profile: getProfileData,
      repos: getRepoData,
      gists: getGistsData,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  }
}
