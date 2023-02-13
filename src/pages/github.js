import { getClient, usePreviewSubscription } from "@lib/sanity";

import Container from "@components/container";
import GitHubRepo from "@components/github/github-repo";
import Head from "next/head";
import IconGitHub from "@components/icons/github";
import Intro from "@components/ui/intro";
import Layout from "@components/layout";
import Link from "next/link";
import { configQuery } from "@lib/groq";
import { useRouter } from "next/router";

export default function GitHub(props) {
  const { profile, repos, gists, siteconfig, preview } = props;
  const router = useRouter();

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
            <Intro
              title={"GitHub"}
              profile={profile}
              left={
                <p className="mb-2 text-gray-500 max-w-prose">
                  {profile.bio}
                </p>
              }
              right={
                <>
                  <Link
                    className="flex items-center justify-between px-6 py-2 mb-3 text-xs font-medium leading-tight text-gray-800 transition duration-150 ease-in-out bg-white rounded hover:bg-cool focus:outline-none focus:ring-0"
                    href={profile.html_url}>
                    View profile on GitHub
                    <IconGitHub color={"green"} />
                  </Link>
                  <Link
                    className="flex items-center justify-between px-6 py-2 mb-3 text-xs font-medium leading-tight text-gray-800 transition duration-150 ease-in-out bg-white rounded hover:bg-cool focus:outline-none focus:ring-0"
                    href="https://gist.github.com/gotpop">
                    View {profile.public_gists} Gists on GitHub
                    <IconGitHub color={"green"} />
                  </Link>
                </>
              }
            />
            {/* TODO: Complete development of GH repos */}
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
  const config = await getClient(preview).fetch(configQuery);

  const url = "https://api.github.com/users/gotpop";
  const getProfile = await fetch(url);
  const getProfileData = await getProfile.json();

  const getRepos = await fetch(getProfileData.repos_url);
  const getRepoData = await getRepos.json();

  const getGists = await fetch(url + "/gists");
  const getGistsData = await getGists.json();

  return {
    props: {
      profile: getProfileData,
      repos: getRepoData,
      gists: getGistsData,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
