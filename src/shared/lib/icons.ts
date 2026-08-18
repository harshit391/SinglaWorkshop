import {
  Hammer,
  FlaskConical,
  Cog,
  BookOpen,
  FolderOpen,
  StickyNote,
  User,
  LayoutDashboard,
  Folder,
  Code,
  Terminal,
  Wrench,
  PenTool,
  FileText,
  Lightbulb,
  Rocket,
  Database,
  Globe,
  Heart,
  Star,
  Zap,
  Film,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  FlaskConical,
  Cog,
  BookOpen,
  FolderOpen,
  StickyNote,
  User,
  LayoutDashboard,
  Folder,
  Code,
  Terminal,
  Wrench,
  PenTool,
  FileText,
  Lightbulb,
  Rocket,
  Database,
  Globe,
  Heart,
  Star,
  Zap,
  Film,
  Gamepad2,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Folder;
}

export const ICON_NAMES = Object.keys(ICON_MAP);
