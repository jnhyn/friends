"use client";

import { useEffect, useState } from "react";

export function useHeaderVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const nextVisible = currentScroll < 24 || currentScroll < lastScroll;

      setVisible(nextVisible);
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return visible;
}
