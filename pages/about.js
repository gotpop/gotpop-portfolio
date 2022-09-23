import Container from "@components/container";
import Layout from "@components/layout";
import Link from "next/link";
import Head from 'next/head';
import { authorsquery, configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";

export default function About({ authors, siteconfig }) {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout {...siteconfig}>
        <Container>
          <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
            About GotPop
          </h1>
          <div className="mx-auto prose text-center dark:prose-invert mt-14">
            <p>
              I build enterprise websites that perform well on all devices, focusing on responsive design, aesthetics, clean code & page speed.
            </p>
            <p>
              <Link href="/contact">Get in touch</Link>
            </p>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const authors = await getClient(preview).fetch(authorsquery);
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      authors: authors,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
