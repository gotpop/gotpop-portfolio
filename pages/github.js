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
              <div className="flex mb-4 border-b pb-6 border-gray-100 dark:border-gray-800">
                <div className="w-5/6">
                  <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                    Github - {profile.company}
                  </h1>
                  <p>{profile.bio}</p>
                  <p>Location: {profile.location}</p>
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
              <p>Number of repos: {profile.public_repos}</p>
              <Link href={profile.html_url}>
                <a className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  View profile on GitHub
                  <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg></span></a>
              </Link>
              <p>Number of public Gists: {profile.public_gists}</p>
              <Link href="https://gist.github.com/gotpop">
                <a className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  View Gists on GitHub
                  <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg></span></a>
              </Link>
            </div>
            <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {repos.map((repo, index) => (
                <Link key={index} href={repo.html_url}>
                  <a>
                    <div className="bg-white p-4 rounded" key={index}>
                      <h2 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                        {repo.name}
                      </h2>
                      <p>{repo.description}</p>
                      <p>SSH: {repo.git_url}</p>
                      <p>Licence: {repo?.license?.name}</p>
                      {/* {repo.topics.map((topic, index) => (
                        <>
                          <span key={index}>{topic}</span>
                        </>
                      ))} */}
                    </div>
                  </a>
                </Link>
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
