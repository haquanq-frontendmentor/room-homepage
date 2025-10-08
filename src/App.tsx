import { createSignal } from "solid-js";
import { AboutImageDark, AboutImageLight } from "./assets/images";
import { About } from "./components/About";
import { Header } from "./components/Header/Header";
import { Intro } from "./components/Intro";
import { Slider } from "./components/Slider";

export const App = () => {
  let [currentIndex, setCurrentIndex] = createSignal(0);

  const setSlideIndex = (callback: (v: number) => number) => {
    setCurrentIndex(callback);
  };

  return (
    <div class="w-[min(100vw,90rem)] mx-auto relative">
      <Header />
      <main class="grid lg:grid-cols-[clamp(8rem,-41.7021rem+77.6596vw,26.25rem)_26.25rem_10rem_1fr] lg:grid-rows-[auto_16.625rem]">
        <div class="lg:col-span-2">
          <Slider setSlideIndex={setSlideIndex} slideIndex={currentIndex()} slideLength={3} />
        </div>

        <h1 class="sr-only">Room Furniture</h1>

        <div class="lg:col-span-2">
          <Intro currentIndex={currentIndex()} />
        </div>

        <img class="w-full h-full object-cover" src={AboutImageDark} alt="" />
        <About />
        <img class="w-full h-full object-cover" src={AboutImageLight} alt="" />
      </main>
    </div>
  );
};
