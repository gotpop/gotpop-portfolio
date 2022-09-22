import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, { getClient, usePreviewSubscription } from "@lib/sanity";
import { configQuery, pathquery, catquery, allcatquery } from "@lib/groq";
import { useEffect, useState } from 'react';
import ProjectList from "@components/projectlist";
import CategoryLabel from "@components/projects/category";

export default function Post(props) {
  const { siteconfig, preview, projectdata, categorydata } = props;
  const router = useRouter();
  const { slug } = router.query;
  const [title, setTitle] = useState();

  const { data: projects } = usePreviewSubscription(catquery, {
    params: { slug: slug },
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: categories } = usePreviewSubscription(allcatquery, {
    initialData: categorydata,
    enabled: preview || router.query.preview !== undefined
  });

  useEffect(() => {
    categories?.forEach(category => {
      if (category.slug.current !== slug) return
      
      setTitle(category.title)
    });
  }, [categories, slug])

  return (
    <>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <Container>
            <h2 className="text-gray-900 text-xl leading-tight font-medium mb-2">{title}</h2>
            <CategoryLabel categories={categories} />
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
  const config = await getClient(preview).fetch(configQuery);
  const categoriesList = await getClient(preview).fetch(allcatquery);
  const projects = await getClient(preview).fetch(catquery, {
    slug: params.slug
  });

  return {
    props: {
      projectdata: projects,
      categorydata: categoriesList,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths({ params }) {
  const allPosts = await client.fetch(pathquery);

  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug.current
        }
      })) || [],
    fallback: true
  }
}
