export interface Tab {
  label: string;
  value: string;
  children: React.ReactNode;
}

export interface Props {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  contentClassName?: string;
  tabsClassName?: string;
  tabClassName?: string;
}
