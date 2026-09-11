export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  sections: NavSection[];
  isCompact?: boolean;
  onToggleCompact?: () => void;
  className?: string;
}
