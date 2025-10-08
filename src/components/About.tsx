import { Paragraph } from "./common/Paragraph";

export const About = () => {
  return (
    <article class="py-12 px-8 lg:col-span-2  md:pt-[4.0625rem] md:px-12">
      <h2 class="text-sm mb-4 uppercase tracking-[0.42em] leading-5 font-semi-bold md:text-base md:mb-[0.8125rem]">
        About our furniture
      </h2>
      <Paragraph>
        Our multifunctional collection blends design and function to suit your individual taste. Make each room unique,
        or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you
        need, from traditional to contemporary styles or anything in between. Product specialists are available to help
        you create your dream space.
      </Paragraph>
    </article>
  );
};
