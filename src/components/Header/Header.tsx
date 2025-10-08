import { SiteLogo } from "../../assets/images";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header class="bg-gray-100 absolute bsolute top-12 left-0 right-0 flex flex-row-reverse z-20 px-6 md:flex-row md:gap-14 md:pl-16 md:top-[3.625rem]">
      <div class="w-full flex justify-center items-center pr-5 md:w-auto md:p-0">
        <a href="" aria-label="Homepage">
          <img src={SiteLogo} alt="" />
        </a>
      </div>
      <Nav />
    </header>
  );
};
