import { cn } from "@/lib/utils"

interface Props {
    text?: string,
    className?: string
}

export const Title = ({ text, className }: Props) => {
    return (
        <p className={cn("text-[24px] font-semibold", className)}>
            {text}
        </p>
    )
}
