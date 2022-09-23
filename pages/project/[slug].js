import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import ErrorPage from "next/error";
import CategoryLabel from "@components/projects/category";
import Pagination from "@components/pagination";
import { useRouter } from "next/router";
import { singlequery, configQuery, pathquery, postquery } from "@lib/groq";
import client, { getClient, usePreviewSubscription, PortableText } from "@lib/sanity";

export default function Post(props) {
  const { postdata, siteconfig, preview, projectdata } = props;
  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: projects } = usePreviewSubscription(postquery, {
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

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
                <h5 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">{post.title}</h5>
                <div className="text-gray-700 dark:text-gray-400 text-base mb-6">
                  {post.body && <PortableText value={post.body} />}
                </div>
                <div className="flex my-6">
                  <CategoryLabel categories={post.categories} />
                </div>
                {post.linkedin.displaylinkedin && (
                  <Link href={post.linkedin.href}>
                    <a className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      View on LinkedIn
                      <span className="icon social__icon ml-4 flex"><svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg></span>
                    </a>
                  </Link>
                )}
              </div>
              <div className="bg-white relative z-0 max-w-screen-lg shadow-md overflow-hidden lg:rounded-lg aspect-video m-6">
                {post.imageUrl && <img src={post.imageUrl} alt="main image" />}
              </div>
            </div>
          </Container>
          <Pagination projects={projects} post={post} />
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
  }
}
