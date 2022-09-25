import Head from 'next/head'
import Layout from "@components/layout";
import Container from "@components/container";
import GitHubRepo from "@components/github/github-repo";
import GitHubIntro from '@components/github/github-intro';
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { configQuery } from "@lib/groq";
import { useEffect, useState } from 'react';

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
            <GitHubIntro profile={profile} />
            {/* <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {repos.map((repo, index) => (
                <GitHubRepo repo={repo} key={index}/>
              ))}
            </div> */}
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
