declare global {
  interface Window {
    SC: {
      Widget: (element: HTMLIFrameElement) => any;
    };
  }
}

import { useEffect, useRef, useState } from "react";

interface SoundCloudPlayerProps {
  trackUrl: string;
}

export const SoundCloudPlayer = ({ trackUrl }: SoundCloudPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    widgetRef.current = window.SC.Widget(iframeRef.current!);

    widgetRef.current.bind("ready", () => {
      setIsReady(true);
    });

    widgetRef.current.bind("play", () => {
      console.log("play");
      setIsPlaying(true);
    });

    widgetRef.current.bind("pause", () => {
      console.log("pause");
      setIsPlaying(false);
    });

    return () => {
      socket.close();
      if (widgetRef.current) {
        widgetRef.current.unbind("ready");
        widgetRef.current.unbind("play");
        widgetRef.current.unbind("pause");
      }
    };
  }, []);

  return (
    <div>
      <iframe
        className="soundcloud-player"
        ref={iframeRef}
        scrolling="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      ></iframe>
      {isReady && (
        <>
          {isPlaying ? (
            <button onClick={() => widgetRef.current.pause()}>Pause</button>
          ) : (
            <button onClick={() => widgetRef.current.play()}>Play</button>
          )}
        </>
      )}
    </div>
  );
};

export function App() {
  return <div>Hello World</div>;
}
