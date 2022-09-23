import Link from "next/link";
import Label from "@components/ui/label";

export default function CategoryLabel({ categories }) {
  return (
    <>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/skills/${category.slug.current}`}
            key={index}>
            <a className="flex mr-2 mb-2">
              <Label color={category.color}>{category.title}</Label>
            </a>
          </Link>
        ))}
    </>
  );
}
