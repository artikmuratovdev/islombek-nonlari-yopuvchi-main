import { cn } from "@/lib/utils";

export const Loader = ({
  className,
  dark,
}: {
  className?: string;
  dark?: boolean;
}) => {
  return (
    <div
      className={`${
        dark && "bg-[#1c2c57] [mask:url(/loader.svg)] max-w-max mx-auto"
      }`}
    >
      <img
        src="/loader.svg"
        alt="loading"
        className={cn(` w-[30px] h-[30px] ${dark && "opacity-0"}`, className)}
      />
    </div>
  );
};
