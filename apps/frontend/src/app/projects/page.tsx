import ProjectList from '@app/ProjectItem'
import { ProjectType } from '@lib/sanity.types'
import { client } from '@lib/sanity.client'
import { getProjectsData } from '@lib/sanity.queries'

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Projects() {
  const projects = await getProjects()

  return (
    <>
      <section className="projects">
        {projects.map((project: ProjectType) => (
          <>
            <ProjectList key={project.slug.current} project={project} />
          </>
        ))}
      </section>
    </>
  )
}
