import { useEffect, useState } from "react";

export const TimeAgo = ({ createdAt }: { createdAt: string }) => {
  const [time, setTime] = useState("00:00:00");

  const formatTime = (ms: number) => {
    let totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // HH:MM:SS format
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date().getTime() - new Date(createdAt).getTime();
      setTime(formatTime(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <h3 className="text-blue-950 text-sm font-semibold">{time}</h3>;
};