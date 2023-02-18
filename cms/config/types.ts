import { SchemaTypeDefinition, defineField } from "sanity"
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

import { schemaTypes } from "../schemas"

export const handleSchemaTypes = (previousTypes: SchemaTypeDefinition<any>[]) => {
    return [
        ...schemaTypes,
        ...previousTypes,
        {
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
        },
        {
            name: "project",
            title: "Projects",
            type: "document",
            orderings: [orderRankOrdering],
            fields: [
                orderRankField({ type: "project" }),
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                }),
                defineField({
                    name: 'categories',
                    title: 'Categories',
                    type: 'array',
                    of: [{ type: 'reference', to: { type: 'category' } }],
                }),
                defineField({
                    name: "body",
                    title: "Body",
                    type: "blockContent"
                }),
                defineField({
                    name: "excerpt",
                    title: "Excerpt",
                    description:
                        "The excerpt is used in blog feeds, and also for search results",
                    type: "text",
                    validation: Rule => Rule.max(200)
                }),
                defineField({
                    name: "mainImage",
                    title: "Main image",
                    type: "image",
                    options: {
                        hotspot: true
                    }
                }),
                defineField({
                    name: "slug",
                    title: "Slug",
                    type: "slug",
                    options: {
                        source: "title",
                        maxLength: 96
                    }
                })
            ],
        },
    ]
}