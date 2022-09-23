import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { postquery, configQuery } from "@lib/groq";
import Head from 'next/head'

export default function GitHub(props) {
  const { postdata, siteconfig, preview } = props;
  const router = useRouter();

  const githubUser = 'gotpop';
  const url ="https://api.github.com/users/gotpop/repos"

  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('ello', data);
      });
  }

  fetchData()

  const fetchData2 = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('oi', data);
      });
  }

  fetchData2()

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
              Github
            </h1>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const project = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: project,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
