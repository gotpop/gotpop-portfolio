import { cx } from "@utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container px-8 py-5 lg:pt-8 lg:pb-14 mx-auto xl:px-5 max-w-screen-lg",
        props.className
      )}>
      {props.children}
    </div>
  );
}
