import { useState } from "react";
import { Props } from "./types";
import { cn } from "@/lib/utils";

export const Tabs: React.FC<Props> = ({
  tabs,
  defaultValue,
  value,
  onChange,
  contentClassName,
  tabsClassName,
  tabClassName,
}) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(
    defaultValue || tabs?.[0]?.value
  );

  const activeValue = isControlled ? value : internalValue;
  const activeTab = tabs.find((tab) => tab.value === activeValue);

  if (!tabs?.length) return null;

  const handleTabClick = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  return (
    <div className="max-w-full">
      <div className={tabsClassName}>
        <div className="w-full overflow-x-auto">
          <div className={cn("flex bg-white rounded-lg", tabClassName)}>
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={cn(
                  "flex-1 duration-150 ease-in-out rounded-lg px-1 py-2 flex items-center justify-center text-[15px] font-bold leading-[130%]",
                  activeValue === tab.value
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-main"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab?.children && (
        <div className={contentClassName}>{activeTab.children}</div>
      )}
    </div>
  );
};
