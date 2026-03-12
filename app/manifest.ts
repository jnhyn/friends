import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Friends Memory",
    short_name: "Friends",
    description: "Memorize Friends scripts and save useful lines and words.",
    start_url: "/scripts",
    display: "standalone",
    background_color: "#fffcf4",
    theme_color: "#ffd84d",
    icons: [],
  };
}
