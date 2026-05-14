import type { TablerIcon } from '@tabler/icons-react';
import {
  IconSun, IconMoon, IconCloud, IconCloudRain, IconCloudSnow,
  IconCloudStorm, IconCloudFog, IconMist, IconCloudFilled,
  IconQuestionMark, IconDroplets,
} from '@tabler/icons-react';

interface Props {
  iconName: string;
  size?: number;
  stroke?: number;
  className?: string;
}

const iconMap: Record<string, TablerIcon> = {
  'sun': IconSun,
  'moon': IconMoon,
  'cloud': IconCloud,
  'cloud-filled': IconCloudFilled,
  'cloud-rain': IconCloudRain,
  'cloud-snow': IconCloudSnow,
  'cloud-storm': IconCloudStorm,
  'cloud-drizzle': IconCloudRain,
  'cloud-moon': IconMoon,
  'cloud-fog': IconCloudFog,
  'mist': IconMist,
  'snowflake': IconCloudSnow,
  'droplets': IconDroplets,
  'question-mark': IconQuestionMark,
};

export function WeatherIcon({ iconName, size = 24, stroke = 1.5, className }: Props) {
  const Icon = iconMap[iconName] ?? IconQuestionMark;
  return <Icon size={size} stroke={stroke} className={className} />;
}
