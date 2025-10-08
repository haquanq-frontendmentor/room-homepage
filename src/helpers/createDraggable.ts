import { getClientPosition } from "../utils/getClientPosition";

type Movement = {
    startX: number;
    startY: number;
    moveX: number;
    moveY: number;
};

type DraggableOptions = {
    lock?: "x-axis" | "y-axis";
    onDragStart?: () => void;
    onDrag?: (element: HTMLElement, movement: Movement) => void;
    onDragEnd?: (element: HTMLElement, movement: Movement) => void;
    disable?: () => boolean;
};

export const createDraggable = (element: HTMLElement, options: DraggableOptions) => {
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;

    const handleDragStart = (e: Event) => {
        if (options.disable?.()) return;
        element.style.transition = "";

        const clienPosition = getClientPosition(e);
        startX = clienPosition.x;
        startY = clienPosition.y;

        options.onDragStart?.();

        element.addEventListener("mousemove", handleDrag);
        element.addEventListener("mouseup", handleDragEnd);
        element.addEventListener("mouseleave", handleDragEnd);
        element.addEventListener("touchmove", handleDrag);
        element.addEventListener("touchend", handleDragEnd);
        element.addEventListener("touchcancel", handleDragEnd);
    };

    const handleDrag = (e: Event) => {
        const clientPosition = getClientPosition(e);

        moveX = clientPosition.x - startX;
        moveY = clientPosition.y - startY;

        if (options.lock && options.lock === "x-axis") moveY = 0;
        if (options.lock && options.lock === "y-axis") moveX = 0;

        element.style.transform = `translate3d(${moveX}px,${moveY},0)`;
        options.onDrag?.(element, { moveX, moveY, startX, startY });
    };

    const handleDragEnd = () => {
        element.style.transition = "300ms ease";
        element.style.transform = "translate3d(0,0,0)";

        options.onDragEnd?.(element, { moveX, moveY, startX, startY });

        element.removeEventListener("mousemove", handleDrag);
        element.removeEventListener("mouseup", handleDragEnd);
        element.removeEventListener("mouseleave", handleDragEnd);
        element.removeEventListener("touchmove", handleDrag);
        element.removeEventListener("touchend", handleDragEnd);
        element.removeEventListener("touchcancel", handleDragEnd);
    };

    element.addEventListener("mousedown", handleDragStart);
    element.addEventListener("touchstart", handleDragStart);
};
