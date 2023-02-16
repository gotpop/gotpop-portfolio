import { cx } from "@utils/all";

export default function Label(props) {
  const color = {
    green: "border-emerald-700",
    blue: "border-blue-600",
    orange: "border-orange-700",
    purple: "border-purple-600",
    pink: "border-pink-600"
  };
  
  return (
    <span
      className={cx(
        "inline-flex text-xs font-medium tracking-wider uppercase text-white px-2 rounded border-r-4 bg-slate-400",
        color[props.color] ||  "border-pink-600"
      )}>
      {props.children}
    </span>
  );
}
