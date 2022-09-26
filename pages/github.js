import Head from 'next/head'
import Layout from "@components/layout";
import Container from "@components/container";
import IconGitHub from "@components/icons/github";
import Link from "next/link";
import GitHubRepo from "@components/github/github-repo";
import Intro from "@components/ui/intro";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { configQuery } from "@lib/groq";

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
              title={`${profile.company} / GitHub`}
              profile={profile}
              left={
                <p className="text-gray-500 mb-2 max-w-prose">{profile.bio}</p>
              }
              right={
                <>
                  <Link href={profile.html_url}>
                    <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View profile on GitHub
                      <IconGitHub color={'green'} />
                    </a>
                  </Link>
                  <Link href="https://gist.github.com/gotpop">
                    <a className="flex items-center mb-3 justify-between px-6 py-2 text-gray-800 font-medium text-xs leading-tight rounded bg-white hover:bg-cool focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View {profile.public_gists} Gists on GitHub
                      <IconGitHub color={'green'} />
                    </a>
                  </Link>
                </>
              }
            />
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
