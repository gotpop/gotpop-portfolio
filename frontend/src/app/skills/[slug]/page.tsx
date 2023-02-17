import ProjectList from '@/components/ProjectItem'
import { client } from 'client'
import { groq } from 'next-sanity'
import styles from './skill.module.css'

async function getSkill(slug: any) {
  const query = groq`*[_type == "project" && "${slug}" in categories[]->slug.current]{
    title,
    slug,
    mainImage
    }
    `

  const data = await client.fetch(query)

  return data
}

async function getTitle(slug: any) {
  const query = groq`*[_type == "category" && slug.current == "${slug}"]`
  const data = await client.fetch(query)

  return data[0]
}

export default async function Skill({ params }: any) {
  const { slug } = params
  const projects = await getSkill(slug)
  const { title } = await getTitle(slug)

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {projects.map((project: any, i: number) => (
          <ProjectList key={i} project={project} />
        ))}
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const query = groq`*[_type == "category"]`
  const data = await client.fetch(query)

  const theMap = data.map((category: { slug: any }) => ({
    slug: category.slug.current
  }))

  return theMap
}
