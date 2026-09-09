import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = React.memo((props) => {
    const focusWindow = useWindowStore((state) => state.focusWindow);
    const moveWindow = useWindowStore((state) => state.moveWindow);
    const resizeWindow = useWindowStore((state) => state.resizeWindow);
    const windowState = useWindowStore((state) => state.windows[windowKey]);
    const { isOpen, isMaximized, isMinimized, zIndex, size, position } =
      windowState || {};
    const ref = useRef(null);

    // Auto-maximize on tablet/small desktop — mirrors real macOS full-screen on small displays
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
    useEffect(() => {
      const h = () => setIsMobile(window.innerWidth < 1024);
      window.addEventListener("resize", h);
      return () => window.removeEventListener("resize", h);
    }, []);

    const effectiveMaximized = isMaximized || (isMobile && !!isOpen);

    // open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power4.out",
          force3D: true,
        },
      );
    }, [isOpen]);

    // draggable handling (disable when maximized or closed)
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (!isOpen || effectiveMaximized) {
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
        cursor: "grab",
        activeCursor: "grabbing",
      });

      return () => instance.kill();
    }, [isOpen, effectiveMaximized, focusWindow]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // Synchronize position to DOM via GSAP
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || effectiveMaximized || isMinimized) return;
      gsap.set(el, { x: position?.x || 0, y: position?.y || 0 });
    }, [effectiveMaximized, isMinimized, position]);

    // Genie minimize/restore animation
    const prevMinimizedRef = useRef(isMinimized);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const dockIcon =
        document.querySelector(`.dock-icon[data-id="${windowKey}"]`) ||
        document.querySelector(`#dock`);
      const iconRect = dockIcon
        ? dockIcon.getBoundingClientRect()
        : {
            left: window.innerWidth / 2,
            top: window.innerHeight,
            width: 40,
            height: 40,
          };

      const elRect = el.getBoundingClientRect();
      const currentX = effectiveMaximized ? 0 : position?.x || 0;
      const currentY = effectiveMaximized ? 0 : position?.y || 0;

      const width = effectiveMaximized
        ? window.innerWidth
        : size?.width || elRect.width;
      const height = effectiveMaximized
        ? window.innerHeight
        : size?.height || elRect.height;

      const dx =
        iconRect.left + (iconRect.width || 40) / 2 - (elRect.left + width / 2);
      const dy = iconRect.top - (elRect.top + height);

      if (isMinimized) {
        gsap.to(el, {
          x: currentX + dx,
          y: currentY + dy,
          scaleX: 0.01,
          scaleY: 0.01,
          opacity: 0,
          transformOrigin: "center bottom",
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else if (prevMinimizedRef.current && !isMinimized) {
        el.style.display = "block";

        gsap.fromTo(
          el,
          {
            x: currentX + dx,
            y: currentY + dy,
            scaleX: 0.01,
            scaleY: 0.01,
            opacity: 0,
            transformOrigin: "center bottom",
          },
          {
            x: currentX,
            y: currentY,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            transformOrigin: "center bottom",
            duration: 0.5,
            ease: "power2.out",
            force3D: true,
            clearProps: effectiveMaximized ? "transform" : "transformOrigin",
          },
        );
      }

      prevMinimizedRef.current = isMinimized;
    }, [isMinimized, effectiveMaximized, windowKey, position, size]);

    // Keep window within viewport boundaries during browser resize
    useEffect(() => {
      const handleBrowserResize = () => {
        const el = ref.current;
        if (!el || effectiveMaximized) return;

        const elRect = el.getBoundingClientRect();
        const currentX = position?.x || 0;
        const currentY = position?.y || 0;
        const width = size?.width || elRect.width;
        const height = size?.height || elRect.height;

        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - height;
        const clampedX = Math.max(0, Math.min(maxX, currentX));
        const clampedY = Math.max(0, Math.min(maxY, currentY));

        if (clampedX !== currentX || clampedY !== currentY) {
          moveWindow(windowKey, { x: clampedX, y: clampedY });
        }
      };

      window.addEventListener("resize", handleBrowserResize);
      return () => window.removeEventListener("resize", handleBrowserResize);
    }, [effectiveMaximized, windowKey, position, size, moveWindow]);

    useEffect(() => {
      const el = ref.current;
      if (!el || effectiveMaximized) return;

      const handle = el.querySelector(".resize-handle");
      if (!handle) return;

      let startX, startY, startW, startH;

      const onMouseMove = (e) => {
        const newW = Math.max(300, startW + (e.clientX - startX));
        const newH = Math.max(200, startH + (e.clientY - startY));
        el.style.width = `${newW}px`;
        el.style.height = `${newH}px`;
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
        if (e.button !== 0) return;
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
    }, [isOpen, effectiveMaximized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          position: effectiveMaximized ? "fixed" : "absolute",
          top: effectiveMaximized ? "0px" : undefined,
          left: effectiveMaximized ? "0px" : undefined,
          right: effectiveMaximized ? "0px" : undefined,
          bottom: effectiveMaximized ? "0px" : undefined,
          width: effectiveMaximized
            ? "100dvw"
            : size?.width
              ? `${size.width}px`
              : undefined,
          height: effectiveMaximized
            ? "100dvh"
            : size?.height
              ? `${size.height}px`
              : undefined,
          maxWidth: effectiveMaximized ? "none" : undefined,
          transform: effectiveMaximized ? "none" : undefined,
        }}
        className="absolute window-root"
        onClick={() => focusWindow(windowKey)}
      >
        <Component {...props} />
        {!effectiveMaximized && <div className="resize-handle" />}
      </section>
    );
  });

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
