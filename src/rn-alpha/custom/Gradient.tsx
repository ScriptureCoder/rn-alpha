import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native';

export type GradientProps = {
  style?: ViewStyle | ViewStyle[];
  radius?: boolean;
  borderRadius?: number;
  children?: React.ReactNode;
};

const Gradient: React.FC<GradientProps> = ({
  children,
  style,
  radius,
  borderRadius,
}) => {
  const gradientStyle = Array.isArray(style)
    ? [...style]
    : style
      ? [style]
      : [];

  if (radius || borderRadius) {
    gradientStyle.push({borderRadius: borderRadius ?? 12});
  }

  return (
    <LinearGradient
      colors={['#00C918', '#008E10']}
      style={gradientStyle}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
