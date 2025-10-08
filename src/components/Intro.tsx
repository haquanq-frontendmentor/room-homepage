import { Show } from "solid-js";
import { ArrowIcon } from "../assets/images";
import { Paragraph } from "./common/Paragraph";

interface IntroProps {
  currentIndex: number;
}

export const Intro = (props: IntroProps) => {
  const data = [
    {
      title: "Discover innovative ways to decorate",
      content:
        "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    },

    {
      title: "We are available all across the globe",
      content:
        "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    },
    {
      title: "Manufactured with the best materials",
      content:
        "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    },
  ];
  return (
    <section>
      <h2 class="sr-only">Why choose us?</h2>

      <ul class="pl-8 pr-6 pt-15 pb-18 md:py-16 md:px-12 lg:pb-32 lg:pt-30 lg:pl-[clamp(3rem,-5.8511rem+13.8298vw,6.25rem)] lg:pr-[clamp(3rem,-4.1489rem+11.1702vw,5.625rem)]">
        {data.map((v, index) => (
          <Show when={index === props.currentIndex}>
            <li>
              <h3 class="tracking-tighter mb-4 text-[2.5rem] leading-[2.3125rem] md:text-5xl md:leading-[2.8125rem] md:mb-[1.375rem]">
                {v.title}
              </h3>
              <Paragraph xClass="mb-[2.625rem] md:mb-6">{v.content}</Paragraph>
              <div class="flex gap-[1.125rem] items-center hover:opacity-50 transition-opacity">
                <a class="text-[0.9375rem] tracking-[0.83em] leading-none uppercase" href="">
                  Shop now
                </a>
                <div>
                  <img class="" src={ArrowIcon} alt="" />
                </div>
              </div>
            </li>
          </Show>
        ))}
      </ul>
    </section>
  );
};
