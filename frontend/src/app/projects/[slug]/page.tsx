import GetImage from '@/utils/getImage'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import { PortableText } from '@portabletext/react'
import ProjectSingle from '@/components/projectSingle'
import SkillsList from '@/components/skillsList'
import { client } from 'client'
import { groq } from 'next-sanity'
import styles from './project.module.css'

async function getProject(idVar: any) {
  const query = groq`*[_type == "project" && slug.current == "${idVar}" && !(_id in path("drafts.**"))]`
  const data = await client.fetch(query)

  return data
}

async function getProjectSkills(idVar: any) {
  const query4 = groq`*[_type == "project" && slug.current == "${idVar}"]{categories[]->{title, slug {current}}}`

  const data = await client.fetch(query4)

  return data
}

async function getProjects() {
  const query = groq`*[_type == "project"]`
  const data = await client.fetch(query)

  return data
}

export default async function Project({ params }: any) {
  const { slug } = params
  const project = await getProject(slug)
  const singleProject = project[0]

  const projectSkills = await getProjectSkills(slug)
  const categories = await projectSkills[0].categories

  const projects = await getProjects()

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <article className={styles.content}>
            <h2 className={styles.title}>{singleProject.title}</h2>
            <SkillsList skills={categories} />
            <PortableText value={singleProject.body} />
          </article>
          <figure>
            <ProjectSingle project={singleProject} />
          </figure>
        </div>
        <Pagination post={singleProject} projects={projects} />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const query = groq`*[_type == "project"]`
  const data = await client.fetch(query)

  const theMap = data.map((project: { slug: any }) => ({
    slug: project.slug.current
  }))

  return theMap
}
