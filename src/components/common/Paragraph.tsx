import type { JSX } from "solid-js/jsx-runtime";
import { cn } from "../../utils/cn";

interface ParagraphProps {
  xClass?: string;
  children?: JSX.Element;
}

export const Paragraph = (props: ParagraphProps) => {
  return <p class={cn("text-base tracking-[-0.02em] leading-[1.375rem]", props.xClass)}>{props.children}</p>;
};
