import { onMount } from "solid-js";
import {
  HeroImage1Desktop,
  HeroImage1Mobile,
  HeroImage2Desktop,
  HeroImage2Mobile,
  HeroImage3Desktop,
  HeroImage3Mobile,
  LeftAngleIcon,
  RightAngleIcon,
} from "../assets/images";
import { createDraggable } from "../helpers/createDraggable";
import { requestAnimatinoFrameAfter } from "../utils/requestAnimationFrameAfter";
import { rotateIndex } from "../utils/rotateNumber";

interface SliderProps {
  setSlideIndex: (callback: (value: number) => number) => void;
  slideIndex: number;
  slideLength: number;
}

export const Slider = (props: SliderProps) => {
  let container: HTMLDivElement | undefined;
  const images: Array<HTMLElement> = [];
  let animating = false;

  const rotateSlideIndex = (steps: number) => {
    return rotateIndex(props.slideIndex, steps, props.slideLength);
  };

  const handlePrevClick = () => {
    if (animating) return;
    props.setSlideIndex(() => rotateSlideIndex(-1));
    resetImageStyles(1);
  };

  const handleNextClick = () => {
    if (animating) return;
    props.setSlideIndex(() => rotateSlideIndex(1));
    resetImageStyles(-1);
  };

  const resetImageStyles = (offsetX: number) => {
    if (animating) return;
    animating = true;
    const prevImage = images[rotateSlideIndex(-1)];
    const currentImage = images[props.slideIndex];
    const nextImage = images[rotateSlideIndex(1)];

    const fn = () => {
      animating = false;

      currentImage.style.cssText = "";
      prevImage.style.cssText = "position:absolute; right:100%;";
      nextImage.style.cssText = "position:absolute; left:100%;";
    };

    images.forEach((image) => {
      image.style.transition = "300ms";
      image.style.transform = `translate3d(${offsetX}px,0,0)`;
    });

    if (offsetX !== 0) {
      requestAnimationFrame(() => {
        const sign = offsetX > 0 ? 1 : -1;
        const width = container?.clientWidth || 0;
        images.forEach((image) => {
          image.style.transform = `translate3d(${width * sign}px,0,0)`;
        });
        requestAnimatinoFrameAfter(300, () => fn());
      });
    } else {
      fn();
    }
  };

  onMount(() => {
    if (!container) return;
    container.querySelectorAll("picture").forEach((element) => {
      images.push(element);
    });

    createDraggable(container, {
      lock: "x-axis",
      disable: () => animating,
      onDragStart: () => {},
      onDragEnd: (element, movement) => {
        const width = element.clientWidth;
        if (Math.abs(movement.moveX) < width * 0.35) return;
        props.setSlideIndex(() => rotateSlideIndex(movement.moveX > 0 ? -1 : 1));
        resetImageStyles(movement.moveX);
      },
    });

    resetImageStyles(0);
  });

  return (
    <div class="relative h-full">
      <div class="overflow-hidden h-full">
        <div
          class="*:select-none [&_img]:w-full [&_img]:h-full [&_img]:object-cover flex *:pointer-events-none *:h-full *:w-full relative h-full"
          ref={container}
        >
          <picture>
            <source srcset={HeroImage1Desktop} media="(min-width: 48em)" />
            <img src={HeroImage1Mobile} alt="" />
          </picture>
          <picture>
            <source srcset={HeroImage2Desktop} media="(min-width: 48em)" />
            <img src={HeroImage2Mobile} alt="" />
          </picture>
          <picture>
            <source srcset={HeroImage3Desktop} media="(min-width: 48em)" />
            <img src={HeroImage3Mobile} alt="" />
          </picture>
        </div>
      </div>
      <div class="absolute bottom-0 right-0 *:w-14 *:aspect-square *:bg-black *:flex *:items-center flex *:justify-center *:hover:bg-gray-800 *:transition-colors md:*:w-20 lg:left-full lg:right-auto">
        <button type="button" onClick={handlePrevClick}>
          <img src={LeftAngleIcon} alt="" />
        </button>
        <button type="button" onClick={handleNextClick}>
          <img src={RightAngleIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
