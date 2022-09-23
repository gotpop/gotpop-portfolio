import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { postquery, configQuery } from "@lib/groq";
import ProjectList from "@components/projectlist";
import Head from 'next/head'

export default function GitHub(props) {
  const { postdata, siteconfig, preview } = props;
  const router = useRouter();

  // const githubUser = 'gotpop';
  // const url ="https://api.github.com/users/gotpop/repos"

  // const fetchData = () => {
  //   return fetch(`https://api.github.com/users/${githubUser}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('ello', data);
  //     });
  // }

  // fetchData()

  // const fetchData2 = () => {
  //   return fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('oi', data);
  //     });
  // }

  // fetchData2()

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  return (
    <>
     <Head>
        <title>GitHub</title>
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
      postdata: project,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
