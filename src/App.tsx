import { SoundCloudPlayer } from "./SoundCloudPlayer";

declare global {
  interface Window {
    SC: {
      Widget: (element: HTMLIFrameElement) => any;
    };
  }
}

export function App() {
  return (
    <SoundCloudPlayer trackUrl="https://soundcloud.com/atomxxl/summer-time?si=cf6c2819011543aab47674f9a8193c30&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
  );
}
