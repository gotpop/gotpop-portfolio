import { configQuery, postquery } from "@lib/groq";
import { getClient, usePreviewSubscription } from "@lib/sanity";

import Container from "@components/container";
import Head from 'next/head'
import Layout from "@components/layout";
import ProjectList from "@components/projectlist";
import { useRouter } from "next/router";

export default function Home(props) {
  const { projectsdata, siteconfig, preview } = props;
  const router = useRouter();

  const { data: projects } = usePreviewSubscription(postquery, {
    initialData: projectsdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  return (
    <>
      <Head>
        <title>GotPop</title>
      </Head>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <Container className="lg:pt-8 lg:pb-14">
            <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {projects.slice(0, 2).map(project => (
                <ProjectList
                  key={project._id}
                  project={project}
                  aspect="landscape"
                  preloadImage={true}
                  objectFit={'cover'}
                />
              ))}
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {projects.slice(2).map(project => (
                <ProjectList
                  key={project._id}
                  project={project}
                  objectFit={'cover'}
                  aspect="square"
                />
              ))}
            </div>
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
      projectsdata: project,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
