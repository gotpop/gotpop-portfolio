import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import ErrorPage from "next/error";
import { singlequery, configQuery, pathquery, postquery, catquery } from "@lib/groq";
import React, { useEffect } from 'react';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";
import ProjectList from "@components/projectlist";

export default function Post(props) {
// console.log('props :', props);
  const { postdata, siteconfig, preview, projectdata } = props;
  const router = useRouter();
  const { slug } = router.query;
  const [next, setNext] = React.useState();
  const [previous, setPrevious] = React.useState();

  const { data: projects } = usePreviewSubscription(catquery, {
    params: { slug: slug },
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  // if (!router.iFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <Container>
           <h1>Category</h1>
           <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {projects.map(project => (
                <ProjectList
                  key={project._id}
                  project={project}
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
  console.log('params.slug :', params.slug);

  const config = await getClient(preview).fetch(configQuery);
  const projects = await getClient(preview).fetch(catquery, {
    slug: params.slug
  });
  
  return {
    props: {
      projectdata: projects,
      // projectdata: {...projects},
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths({params}) {
  // const allPosts = await client.fetch(catquery, {
  //   slug: params.slug
  // });
  // console.log('allPosts :', allPosts);

  const allPosts = await client.fetch(pathquery);

  const liam = {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug.current
        }
      })) || [],
    fallback: true
  };

  // console.log('liam :', JSON.stringify(liam));

  return liam
}
