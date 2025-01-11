import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SoundCloudPlayer } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SoundCloudPlayer trackUrl="https://soundcloud.com/fy300/carti-blick-summ?si=8c1e8d38aa0744dda76c3dbb8ff75c82&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
  </StrictMode>
);
