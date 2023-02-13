import Container from "@components/container";
import Social from "@components/social";
import ThemeSwitch from "@components/themeSwitch";

export default function Footer(props) {
  return (
    <Container>
      <Social />  
      <div className="p-10 text-sm text-center border-t border-gray-100 dark:border-gray-800">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="flex items-center justify-end pt-8 border-t border-gray-100 dark:border-gray-800">
        <ThemeSwitch />
      </div>
    </Container>
  );
}
