import Container from "@components/container";
import ThemeSwitch from "@components/themeSwitch";
import Social from "@components/social";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <Social />  
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="flex items-center justify-between mt-2">
        <ThemeSwitch />
      </div>
    </Container>
  );
}
