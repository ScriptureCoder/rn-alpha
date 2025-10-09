import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import SafeAreaView, { SafeAreaProps } from './SafeAreaView';
import useColor from '../../hooks/use-color';
import { ColorProps } from '../../constants/colors';

export type PageProps = SafeAreaProps & {
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: ColorProps | string;
  statusTextColor?: 'light' | 'dark' | StatusBarStyle;
};

const Page: React.FC<PageProps> = ({
  children,
  statusBarStyle,
  statusBarColor,
  statusTextColor,
  edges,
  containerStyle,
  color = 'background',
  flex = 1,
  ...rest
}) => {
  const { colors, colorMode } = useColor();

  const resolvedStatusColor = statusBarColor
    ? (typeof statusBarColor === 'string' && colors[statusBarColor as ColorProps]
        ? colors[statusBarColor as ColorProps]
        : statusBarColor)
    : (typeof color === 'string' && colors[color as ColorProps]
        ? colors[color as ColorProps]
        : undefined);

  const inferredStatusStyle: StatusBarStyle =
    statusTextColor === 'light'
      ? 'light-content'
      : statusTextColor === 'dark'
        ? 'dark-content'
        : (statusTextColor as StatusBarStyle | undefined) ?? (colorMode === 'dark' ? 'light-content' : 'dark-content');

  const barStyle: StatusBarStyle = statusBarStyle ?? inferredStatusStyle;

  return (
    <SafeAreaView
      edges={edges}
      containerStyle={containerStyle}
      color={color}
      flex={flex}
      {...rest}
    >
      <StatusBar
        translucent={false}
        barStyle={barStyle}
        backgroundColor={typeof resolvedStatusColor === 'string' ? resolvedStatusColor : undefined}
      />
      {children}
    </SafeAreaView>
  );
};

export default Page;
