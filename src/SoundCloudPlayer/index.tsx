import { useEffect, useRef, useState } from "react";
import { Seekbar } from "../Seekbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface SoundCloudPlayerProps {
  trackUrl: string;
}

export const SoundCloudPlayer = ({ trackUrl }: SoundCloudPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handlePlay = () => {
    if (socket) {
      socket.send(JSON.stringify({ isPlaying: true }));
    }
  };

  const handlePause = () => {
    if (socket) {
      socket.send(JSON.stringify({ isPlaying: false }));
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);
      if (data.isPlaying) {
        setIsPlaying(true);
        widgetRef.current.play();
      } else {
        setIsPlaying(false);
        widgetRef.current.pause();
      }
    };

    setSocket(socket);

    widgetRef.current = window.SC.Widget(iframeRef.current!);

    widgetRef.current.bind("ready", () => {
      setIsReady(true);
      console.log("ready");
      widgetRef.current.getCurrentSound((sound: any) => {
        setSound(sound);
        console.log("sound", sound);
      });
    });

    widgetRef.current.bind("playProgress", (e: any) => {
      setPosition(e.currentPosition);
    });

    return () => {
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
      {sound && (
        <div className="controls">
          {isPlaying ? (
            <button
              className="control-button"
              onClick={handlePause}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
          ) : (
            <button
              className="control-button"
              onClick={handlePlay}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          <Seekbar
            position={position}
            duration={sound.duration}
            widget={widgetRef.current}
          />
        </div>
      )}
    </div>
  );
};
