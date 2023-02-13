import { groq } from "next-sanity";

export const postquery = groq`
*[_type == "project"] | order(orderRank) {
  ...,
  author->,
  categories[]->
}
`;

export const catquery = groq`
*[count((categories[]->slug.current)[@ in [$slug]]) > 0] 
`;

export const allcatquery = groq`
*[_type == "category"] 
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`;

export const singlequery = groq`
*[_type == "project" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "imageUrl": mainImage.asset->url
}
`;

export const pathquery = groq`
*[_type == "post"] {
  'slug': slug.current,
}
`;

export const authorsquery = groq`
*[_type == "author"] {
 ...
}
`;

// test below
// to delete later

export const listquery = groq`
*[_type == "listing"] | order(_createdAt desc) [$start..$end] {
  ...,
  category->
 }
`;

export const productquery = groq`
*[_type == "listing" && slug.current == $slug][0] {
  ...,
  category-> {
    ...,
    enqform->,
    vendorform->
  }
 }
`;
