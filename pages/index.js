import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import ProjectList from "@components/projectlist";
import Head from 'next/head'

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;
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
  

  const router = useRouter();
  //console.log(router.query.category);

  const { data: projects } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(projects);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
     <Head>
        <title>My page title</title>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
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
  
  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: project,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
