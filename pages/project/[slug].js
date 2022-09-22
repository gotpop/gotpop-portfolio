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
import { singlequery, configQuery, pathquery, postquery } from "@lib/groq";
import React, { useEffect } from 'react';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";

export default function Post(props) {
  const { postdata, siteconfig, preview, projectdata } = props;
  const router = useRouter();
  const { slug } = router.query;
  const [next, setNext] = React.useState();
  const [previous, setPrevious] = React.useState();

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: projects } = usePreviewSubscription(postquery, {
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

  useEffect(() => {    
    projects?.forEach((project, index) => {
      if (post._id !== project._id) return

      let positionPrev
      let positionNext
      
      index === 0 ? positionPrev = projects.length - 1 : positionPrev = index - 1
      index === projects.length - 1 ? positionNext = 0: positionNext = index + 1
      
      const previous = projects[positionPrev].slug.current
      const next = projects[positionNext].slug.current
      
      setPrevious(previous)
      setNext(next)
    })
  })
  
  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig}>
          <Container>
            <div className="project flex justify-center rounded-lg">
              <div className="block p-6 max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{post.title}</h5>
                <div className="text-gray-700 text-base mb-6">
                  {post.body && <PortableText value={post.body} />}
                </div>
                <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View on LinkedIn</a>
              </div>
              <div className="bg-white relative z-0 max-w-screen-lg shadow-md overflow-hidden lg:rounded-lg aspect-video m-6">
                {post.imageUrl && <img src={post.imageUrl} alt="main image" />}
              </div>
            </div>
          </Container>
          <Container>
            <article className="max-w-screen-md mx-auto ">
              <div className="flex justify-center mt-7 mb-7">
                <Link href={`/project/${previous}`}>
                  <a className="flex px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                  <ArrowCircleLeftIcon className="w-5 h-5 mr-2" /> Previous       
                  </a>
                </Link>
                <Link href={`/project/${next}`}>
                  <a className="flex px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                    Next <ArrowCircleRightIcon className="w-5 h-5 mr-2" />
                  </a>
                </Link>
              </div>
            </article>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug
  });

  const project = await getClient(preview).fetch(postquery);
  
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      projectdata: project,
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
