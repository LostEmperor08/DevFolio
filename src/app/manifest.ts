import { MetadataRoute } from "next";
import { profile } from "@/config/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.personal.name,
    short_name: "Portfolio",
    description: profile.personal.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/images/profile-logo.jpg",
        sizes: "1024x1024",
        type: "image/jpeg",
      },
    ],
  };
}
