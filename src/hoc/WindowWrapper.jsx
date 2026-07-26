import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = React.memo((props) => {
    const focusWindow = useWindowStore((state) => state.focusWindow);
    const moveWindow = useWindowStore((state) => state.moveWindow);
    const resizeWindow = useWindowStore((state) => state.resizeWindow);
    const windowState = useWindowStore((state) => state.windows[windowKey]);
    const { isOpen, isMaximized, zIndex, size, position } = windowState || {};
    const ref = useRef(null);

    // open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    }, [isOpen]);

    // draggable handling (disable when maximized or closed)
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (!isOpen || isMaximized) {
        // ensure any previous Draggable is killed
        Draggable.get(el)?.kill();
        return;
      }

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        onDragEnd: function () {
          moveWindow(windowKey, { x: this.x, y: this.y });
        },
        trigger: el.querySelector(".window-drag-handle"),
        ignore: "input[type='range'], button, .sliders",
        cursor: "grab", // More visible on white backgrounds
        activeCursor: "grabbing",
      });

      return () => instance.kill();
    }, [isOpen, isMaximized, focusWindow]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      // visibility based on open state
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    useEffect(() => {
      const el = ref.current;
      if (!el || isMaximized) return;

      const handle = el.querySelector(".resize-handle");
      if (!handle) return;

      let startX, startY, startW, startH;

      const onMouseMove = (e) => {
        const newW = startW + (e.clientX - startX);
        const newH = startH + (e.clientY - startY);

        el.style.width = `${Math.max(300, newW)}px`;
        el.style.height = `${Math.max(300, newH)}px`;
      };

      const onMouseUp = () => {
        resizeWindow(windowKey, {
          width: el.offsetWidth,
          height: el.offsetHeight,
        });

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      const onMouseDown = (e) => {
        if (e.button !== 0) return; // Only allow left click
        e.preventDefault();

        startX = e.clientX;
        startY = e.clientY;
        startW = el.offsetWidth;
        startH = el.offsetHeight;

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      };

      handle.addEventListener("mousedown", onMouseDown);
      return () => handle.removeEventListener("mousedown", onMouseDown);
    }, [isOpen, isMaximized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          position: isMaximized ? "fixed" : "absolute",
          top: isMaximized ? "0px" : undefined,
          left: isMaximized ? "0px" : undefined,
          right: isMaximized ? "0px" : undefined,
          bottom: isMaximized ? "0px" : undefined,
          width: isMaximized ? "100dvw" : (size?.width ? `${size.width}px` : undefined),
          height: isMaximized ? "100dvh" : (size?.height ? `${size.height}px` : undefined),
          maxWidth: isMaximized ? "none" : undefined,
          transform: isMaximized ? "none" : (position ? `translate3d(${position.x}px, ${position.y}px, 0px)` : undefined),
        }}
        className="absolute window-root"
        onClick={() => focusWindow(windowKey)}
      >
        <Component {...props} />
        {!isMaximized && <div className="resize-handle" />}
      </section>
    );
  });

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
