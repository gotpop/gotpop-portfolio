import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteconfig',
  type: 'document',
  title: 'Site Settings',
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Social Media',
      name: 'social',
    },
    {
      title: 'Website Logo',
      name: 'logos',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    }),
    defineField({
      name: 'copyright',
      type: 'string',
      title: 'Copyright Name',
      description: 'Enter company name to appear in footer after ©',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: "What's App Business Phone",
      description: 'Enter full number with country code, minus spaces or zeros.',
    }),
    defineField({
      name: 'w3ckey',
      type: 'string',
      title: 'Web3Forms Access Key',
      description:
        'Enter Access key obtained from web3forms.com. It is required to make the form work.',
    }),
    defineField({
      name: 'social',
      type: 'array',
      title: 'Social Links',
      description: 'Enter your Social Media URLs',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'media',
              title: 'Choose Social Media',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'CodePen', value: 'codepen' },
                ],
              },
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full Profile URL',
            },
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      title: 'Meta Description',
      name: 'description',
      fieldset: 'metadata',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.min(20).max(200),
      description: 'Enter SEO Meta Description',
    }),
    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    }),
  ],
})
