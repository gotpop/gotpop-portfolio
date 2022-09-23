import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { postquery, configQuery } from "@lib/groq";
import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function GitHub(props) {
  const { profile, repos, siteconfig, preview } = props;
  const router = useRouter();

  useEffect(() => {
    console.log('profile :', profile);
    console.log('repos :', repos);
  }, [profile, repos])

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
            <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
              Github - {profile.company}
            </h1>
            <p>{profile.bio}</p>
            <p>{profile.avatar_url}</p>
            {/* {profile.hireable && (<h1>Hello<h1/>)} */}
            <p>{profile.location}</p>
            <p>{profile.public_gists}</p>
            <p>{profile.gists_url}</p>
            <p>{profile.public_repos}</p>
            <p>{profile.repos_url}</p>

            {repos.map(repo => (
              <>
                <h2>{repo.full_name}</h2>
                <p>{repo.description}</p>
              </>
            ))}
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
  const getRepos = await fetch(url + '/repos')
  const getRepoData = await getRepos.json()

  return {
    props: {
      profile: getProfileData,
      repos: getRepoData,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  }
}
