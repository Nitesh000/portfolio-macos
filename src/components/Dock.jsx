import { dockApps, locations } from "#constants";
import React, { useRef, useCallback, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { useMemo } from "react";

const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

const Dock = React.memo(() => {
  // Optimized selectors - only subscribe to what we need
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const windows = useWindowStore((state) => state.windows);
  const setActiveLocation = useLocationStore(
    (state) => state.setActiveLocation,
  );

  const dockRef = useRef(null);

  const minimizedWindowIds = useMemo(() => {
    let ids = [];
    Object.entries(windows).forEach(([k, v]) => {
      if (v?.isMinimized) {
        ids.push(k);
      }
    });

    return ids;
  }, [windows]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return () => {};

    // Skip hover animations on mobile for better performance
    if (isMobile) return () => {};

    // Dynamically import GSAP only on desktop
    Promise.all([import("gsap"), import("@gsap/react")]).then(([{ gsap }]) => {
      const icons = dock.querySelectorAll(".dock-icon");

      const animateIcons = (mouseX) => {
        const { left } = dock.getBoundingClientRect();

        icons.forEach((icon) => {
          const { left: iconLeft, width } = icon.getBoundingClientRect();
          const center = iconLeft - left + width / 2;
          const distance = Math.abs(mouseX - center);

          const intensity = Math.exp(-(distance ** 2.5) / 150000);

          gsap.to(icon, {
            scale: 1 + 0.25 * intensity,
            y: -20 * intensity,
            duration: 0.2,
            ease: "power1.out",
          });
        });
      };

      const handleMouseMove = (e) => {
        const { left } = dock.getBoundingClientRect();

        animateIcons(e.clientX - left);
      };

      const resetIcons = () =>
        icons.forEach((icon) =>
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          }),
        );

      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", resetIcons);
    });
  }, []);

  const toggleApp = useCallback(
    (app) => {
      if (!app.canOpen) return;

      // Special case: Trash icon should open Finder focused on Trash
      if (app.action === "trash") {
        // Ensure Finder window opens and switch Finder to Trash location
        openWindow("finder");
        setActiveLocation(locations.trash);
        return;
      }

      // Special case: Finder icon should open Finder focused on Work
      if (app.id === "finder") {
        openWindow("finder");
        setActiveLocation(locations.work);
        return;
      }

      const win = windows[app.id];

      if (!win) {
        console.log(`Window not found for app: ${app.id}`);
        return;
      }

      if (win.isOpen) {
        if (win.isMinimized) {
          focusWindow(app.id);
        } else {
          // Find if this window is currently focused (highest zIndex among open non-minimized windows)
          const openWindows = Object.values(windows).filter(
            (w) => w.isOpen && !w.isMinimized,
          );
          const maxZ = openWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);

          if (win.zIndex === maxZ) {
            minimizeWindow(app.id);
          } else {
            focusWindow(app.id);
          }
        }
      } else {
        openWindow(app.id);
      }
    },
    [openWindow, closeWindow, windows, setActiveLocation],
  );

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen, action }) => (
          <div key={id} className="flex relative justify-center">
            <button
              type="button"
              className="dock-icon"
              data-id={id}
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen, action })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
            {minimizedWindowIds.includes(id) && (
              <div className="absolute -bottom-1 w-1 h-1 bg-gray-400 rounded-full" />
            )}
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
});

Dock.displayName = "Dock";

export default Dock;

