import { allcatquery, configQuery, postquery } from "@lib/groq";
import { getClient, usePreviewSubscription } from "@lib/sanity";

import CategoryLabel from "@components/projects/category";
import Container from "@components/container";
import Intro from "@components/ui/intro";
import Layout from "@components/layout";
import ProjectList from "@components/projectlist";
import { useRouter } from "next/router";

export default function Skills(props) {
  const { postdata, siteconfig, preview, categorydata, profile } = props;
  const router = useRouter();

  const { data: projects } = usePreviewSubscription(postquery, {
    initialData: postdata,
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

  return (
    <>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <Container>
            <Intro
              title={'Skills'}
              profile={profile}
              left={<CategoryLabel categories={categories} />}
            />
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
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);
  const categoriesList = await getClient(preview).fetch(allcatquery);

  const url = "https://api.github.com/users/gotpop"
  const getProfile = await fetch(url)
  const getProfileData = await getProfile.json()

  return {
    props: {
      postdata: post,
      profile: getProfileData,
      categorydata: categoriesList,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
