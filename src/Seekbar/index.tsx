import "./index.css";

interface SeekbarProps {
  position: number;
  duration: number;
  widget: any;
}

export const Seekbar = ({ position, duration, widget }: SeekbarProps) => {
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    var offset = e.currentTarget.getClientRects()[0];
    console.log(e.clientX - offset.left);
    widget.seekTo(
      ((e.clientX - offset.left) / e.currentTarget.clientWidth) * duration
    );
  };

  return (
    <div className="seekbar" onClick={handleSeek}>
      <div
        className="seeker"
        style={{ left: `${(position / duration) * 100}%` }}
      />
    </div>
  );
};
