import { orderRankField } from '@sanity/orderable-document-list';

export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    orderRankField({
      type: 'project'
    }),
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Image caption",
          description: "Appears below image.",
          options: {
            isHighlighted: true
          }
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true
          }
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      title: 'LinkedIn button',
      name: 'linkedin',
      type: 'object',
      fields: [
        {
          title: 'Display LinkedIn button',
          name: 'displaylinkedin',
          type: 'boolean'
        },
        {
          title: 'LinkedIn button url',
          name: 'href',
          type: 'url',
          hidden: ({ document }) => !document?.linkedin.displaylinkedin,
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage"
    }
  }
};
