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
    const { isOpen, isMaximized, isMinimized, zIndex, size, position } =
      windowState || {};
    const ref = useRef(null);

    // open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        {
          scale: 0.85,
          opacity: 0,
          y: 30,
        },
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

    // Synchronize position to DOM via GSAP to prevent React inline style conflicts and jitters
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || isMaximized || isMinimized) return;

      gsap.set(el, { x: position?.x || 0, y: position?.y || 0 });
    }, [isMaximized, isMinimized, position]);

    // Genie minimize/restore animation
    const prevMinimizedRef = useRef(isMinimized);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const dockIcon = document.querySelector(`.dock-icon[data-id="${windowKey}"]`) || document.querySelector(`#dock`);
      const iconRect = dockIcon 
        ? dockIcon.getBoundingClientRect() 
        : { left: window.innerWidth / 2, top: window.innerHeight, width: 40, height: 40 };

      const elRect = el.getBoundingClientRect();
      const currentX = isMaximized ? 0 : (position?.x || 0);
      const currentY = isMaximized ? 0 : (position?.y || 0);
      
      const width = isMaximized ? window.innerWidth : (size?.width || elRect.width);
      const height = isMaximized ? window.innerHeight : (size?.height || elRect.height);

      const dx = (iconRect.left + (iconRect.width || 40) / 2) - (elRect.left + width / 2);
      const dy = iconRect.top - (elRect.top + height);

      if (isMinimized) {
        // Minimize animation
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
          }
        });
      } else if (prevMinimizedRef.current && !isMinimized) {
        // Restore animation
        el.style.display = "block";

        gsap.fromTo(el,
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
            clearProps: isMaximized ? "transform" : "transformOrigin",
          }
        );
      }

      prevMinimizedRef.current = isMinimized;
    }, [isMinimized, isMaximized, windowKey, position, size]);

    // Keep window within viewport boundaries during browser resize
    useEffect(() => {
      const handleBrowserResize = () => {
        const el = ref.current;
        if (!el || isMaximized) return;

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
    }, [isMaximized, windowKey, position, size, moveWindow]);

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
          width: isMaximized
            ? "100dvw"
            : size?.width
              ? `${size.width}px`
              : undefined,
          height: isMaximized
            ? "100dvh"
            : size?.height
              ? `${size.height}px`
              : undefined,
          maxWidth: isMaximized ? "none" : undefined,
          transform: isMaximized ? "none" : undefined,
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
