import { createEffect, createSignal, onMount } from "solid-js";
import { cn } from "../../utils/cn";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = createSignal(false);

  let menu: HTMLDivElement | undefined;

  const handleBackgroundClick = (e: Event) => {
    e.stopPropagation();
  };

  const handleBackgroundKeydown = (e: KeyboardEvent) => {
    if (!e.shiftKey && e.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const handleBackdropClick = (_: Event) => {
    setMenuOpen(false);
  };

  const handleMenuButtonClick = (_: Event) => {
    setMenuOpen((v) => !v);
  };

  onMount(() => {
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 48em)").matches) {
        if (menuOpen()) setMenuOpen(false);
      }
    });
    if (!menu) return;

    const focusableElements = menu.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;

    focusableElements[0].addEventListener("keydown", (e) => {
      if (e.shiftKey && e.key === "Tab" && menuOpen()) {
        requestAnimationFrame(() => {
          focusableElements[focusableElements.length - 1].focus();
        });
      }
    });

    focusableElements[focusableElements.length - 1].addEventListener("keydown", (e) => {
      if (!e.shiftKey && e.key === "Tab" && menuOpen()) {
        requestAnimationFrame(() => {
          focusableElements[0].focus();
        });
      }
    });

    createEffect(() => {
      if (menuOpen()) {
        focusableElements[0].focus();
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.body.style.overflow = "";
      }
    });
  });

  return (
    <nav>
      <button
        class={cn(
          "group relative z-100 flex h-[1.375rem] flex-col items-center justify-center *:h-[0.125rem] *:w-5 *:bg-white md:hidden",
          menuOpen() && "*:bg-black",
        )}
        type="button"
        aria-label="Mobile menu"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen()}
        onClick={handleMenuButtonClick}
      >
        <span class="transition-transform group-aria-expanded:rotate-45"></span>
        <span class="my-1 group-aria-expanded:hidden"></span>
        <span class="transition-transform group-aria-expanded:-mt-[0.125rem] group-aria-expanded:-rotate-45"></span>
      </button>

      <div
        class={cn(
          "fixed inset-0 z-50 hidden [background:rgba(0,0,0,0.5)] md:static md:inset-0 md:block md:[background:initial]",
          menuOpen() && "block",
        )}
        id="mobile-menu"
        ref={menu}
        onClick={handleBackdropClick}
      >
        <ul
          class="bg-white py-12 flex gap-8 pl-25 md:p-0 md:bg-transparent [&_a]:hover:underline md:pb-[0.125rem] md:[&_a]:text-white md:gap-[1.875rem]"
          onClick={handleBackgroundClick}
          onKeyDown={handleBackgroundKeydown}
        >
          <li>
            <a href="">home</a>
          </li>
          <li>
            <a href="">shop</a>
          </li>
          <li>
            <a href="">about</a>
          </li>
          <li>
            <a href="">contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
