import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

import { defineField } from 'sanity'

const theCategory = {
  name: "category",
  title: "Category",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "category" }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField(
      {
        name: "color",
        title: "Color",
        type: "string",
        description: "Color of the category",
        options: {
          list: [
            { title: "Green", value: "green" },
            { title: "Blue", value: "blue" },
            { title: "Purple", value: "purple" },
            { title: "Orange", value: "orange" }
          ]
        }
      },
    ),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    })
  ],
}


export default theCategory