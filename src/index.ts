import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Hooks exports
export { default as useQuery } from './hooks/use-query';
export { default as useQueryAsync } from './hooks/use-query-async';
export { default as useColor } from './hooks/use-color';
export { default as useMutation } from './hooks/use-mutation';
export { default as useMutationAsync } from './hooks/use-mutation-async';
export { default as useDispatch } from './hooks/use-dispatch';
export { default as useSelector } from './hooks/use-selector';
export { default as useCache } from './hooks/use-cache';
export { useApp } from './store/contexts/app-context';
export { dayjs };

// Store exports
export { default as AppProvider } from './store/contexts/app-context';
export { store } from './store';
export type { AppDispatch, RootState } from './store';

export { default as Colors, scheme as colorScheme } from './constants/colors';
export type { ColorsProps, ColorProps } from './constants/colors';
export { elevation } from './constants/elevation';
export { width, height, ios, android, isSmallDevice, statusHeight } from './constants/layout';

export { config as alphaConfig} from './config';
export { default as PATHS } from './paths';
export * from './types';

export { default as formatMoney } from './utils/money';
export * from './utils/crypto';
export { default as storage } from './utils/storage';
