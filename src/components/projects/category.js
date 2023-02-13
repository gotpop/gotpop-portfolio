import Label from "@components/ui/label";
import Link from "next/link";

export default function CategoryLabel({ categories }) {
  return (
    <>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/skills/${category.slug.current}`}
            className="flex mr-2 mb-2"
            key={index}>
              <Label color={category.color}>{category.title}</Label>
          </Link>
        ))}
    </>
  );
}
