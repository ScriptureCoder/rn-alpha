import React, { useMemo } from 'react';
import {
  Animated,
  RefreshControl,
  ScrollView as Scroll,
  ScrollViewProps,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ColorProps } from "../../constants/colors";
import useColor from "../../hooks/use-color";

export type SpacingProps = {
  padding?: number | string;
  margin?: number | string;
  p?: number | string;
  m?: number | string;
  ph?: number; pv?: number; pt?: number; pb?: number; pl?: number; pr?: number;
  mh?: number; mv?: number; mt?: number; mb?: number; ml?: number; mr?: number;
  px?: number; py?: number;
}

export type LayoutProps = {
  flex?: number;
  width?: number | string;
  height?: number | string;
  w?: number | string;
  h?: number | string;
  minW?: number | string;
  maxW?: number | string;
  minH?: number | string;
  maxH?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  absolute?: boolean;
  relative?: boolean;
  hidden?: boolean;
  visible?: boolean;
  disabled?: boolean;
}

export type ScrollProps = {
  // Refresh props
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshColor?: ColorProps | string;
  refreshTintColor?: ColorProps | string;
  refreshTitle?: string;
  refreshTitleColor?: ColorProps | string;
  
  // Scroll indicators
  svs?: boolean;
  shs?: boolean;
  
  // Content styling
  cs?: ViewStyle;
  contentPadding?: number | string;
  contentPaddingHorizontal?: number;
  contentPaddingVertical?: number;
  contentPaddingTop?: number;
  contentPaddingBottom?: number;
  contentPaddingLeft?: number;
  contentPaddingRight?: number;
  
  // Animation props
  scrollX?: any;
  scrollY?: any;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  
  // Performance props
  scrollEventThrottle?: number;
  removeClippedSubviews?: boolean;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
  initialNumToRender?: number;
  windowSize?: number;
  
  // Keyboard props
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
  
  // Scroll behavior
  bounces?: boolean;
  alwaysBounceHorizontal?: boolean;
  alwaysBounceVertical?: boolean;
  canCancelContentTouches?: boolean;
  centerContent?: boolean;
  automaticallyAdjustContentInsets?: boolean;
  contentInsetAdjustmentBehavior?: 'automatic' | 'scrollableAxes' | 'never' | 'always';
  
  // Paging
  pagingEnabled?: boolean;
  decelerationRate?: 'fast' | 'normal' | number;
  
  // Direction
  horizontal?: boolean;
  directionalLockEnabled?: boolean;
  
  // Zoom
  maximumZoomScale?: number;
  minimumZoomScale?: number;
  zoomScale?: number;
  bouncesZoom?: boolean;
  
  // Content offset
  contentOffset?: { x: number; y: number };
  
  // Content size
  contentSize?: { width: number; height: number };
  
  // Inset
  contentInset?: { top: number; left: number; bottom: number; right: number };
  
  // Safe area
  automaticallyAdjustsScrollIndicatorInsets?: boolean;
  
  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  
  // Animation
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
}

export type Props = ScrollViewProps & SpacingProps & LayoutProps & ScrollProps;

const ScrollView: React.FC<Props> = React.forwardRef<Scroll, Props>((props, ref) => {
  const { colors } = useColor();
  
    const {
    // Spacing props
    padding, p,
    margin, m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr,
    px, py,
    // Layout props
    flex,
    width, w,
    height, h,
    minW, maxW, minH, maxH,
    fullWidth, fullHeight,
    center, centerX, centerY,
    absolute, relative,
    hidden, visible, disabled,
    // Scroll props
      refreshing,
      onRefresh,
    refreshColor,
    refreshTintColor,
    refreshTitle,
    refreshTitleColor,
      svs,
      shs,
    cs,
    contentPadding,
    contentPaddingHorizontal,
    contentPaddingVertical,
    contentPaddingTop,
    contentPaddingBottom,
    contentPaddingLeft,
    contentPaddingRight,
    scrollX,
      scrollY,
      onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    scrollEventThrottle = 16,
    removeClippedSubviews,
    maxToRenderPerBatch,
    updateCellsBatchingPeriod,
    initialNumToRender,
    windowSize,
    keyboardShouldPersistTaps = "handled",
    keyboardDismissMode,
    bounces,
    alwaysBounceHorizontal,
    alwaysBounceVertical,
    bouncesZoom,
    canCancelContentTouches,
    centerContent,
    automaticallyAdjustContentInsets,
    contentInsetAdjustmentBehavior,
    pagingEnabled,
    decelerationRate,
    horizontal,
    directionalLockEnabled,
    maximumZoomScale,
    minimumZoomScale,
    zoomScale,
    contentOffset,
    contentSize,
    contentInset,
    automaticallyAdjustsScrollIndicatorInsets,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    // Other props
    style,
    children,
      ...otherProps
    } = props;

  // Memoized style calculation for better performance
  const computedStyle = useMemo(() => {
    // Helper function to resolve colors
    const resolveColor = (colorValue?: ColorProps | string) => {
      if (!colorValue) return undefined;
      return colors[colorValue as ColorProps] || colorValue;
    };

    // Handle width/height shortcuts
    let finalWidth = width ?? w;
    let finalHeight = height ?? h;
    
    if (fullWidth) finalWidth = '100%';
    if (fullHeight) finalHeight = '100%';

    // Handle center shortcuts
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: 'center', justifyContent: 'center' };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: 'center' };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: 'center' };
    }

    // Handle spacing shortcuts
    let finalPadding = padding ?? p;
    let finalMargin = margin ?? m;

    // Transform array for animations
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });

    // Handle visibility
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;

    // Handle position
    let finalPosition = undefined;
    if (absolute) finalPosition = 'absolute';
    if (relative) finalPosition = 'relative';

    return {
      flex,
      width: finalWidth,
      height: finalHeight,
      minWidth: minW,
      maxWidth: maxW,
      minHeight: minH,
      maxHeight: maxH,
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      margin: finalMargin,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv ?? py,
      paddingHorizontal: ph ?? px,
      paddingLeft: pl,
      paddingRight: pr,
      // Layout
      position: finalPosition,
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : undefined,
    };
  }, [
    flex, width, w, height, h, minW, maxW, minH, maxH,
    fullWidth, fullHeight, center, centerX, centerY,
    absolute, relative, hidden, visible, disabled,
    padding, p, margin, m, mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    opacity, scale, rotate, translateX, translateY,
    colors
  ]);

  // Memoized content container style
  const contentContainerStyle = useMemo(() => {
    const baseStyle = {
      paddingBottom: contentPaddingBottom ?? pb ?? 40,
      paddingTop: contentPaddingTop ?? pt ?? 0,
      paddingHorizontal: contentPaddingHorizontal ?? ph,
      paddingVertical: contentPaddingVertical ?? pv,
      paddingLeft: contentPaddingLeft ?? pl,
      paddingRight: contentPaddingRight ?? pr,
      padding: contentPadding,
    };

    return { ...baseStyle, ...cs };
  }, [
    contentPaddingBottom, pb, contentPaddingTop, pt,
    contentPaddingHorizontal, ph, contentPaddingVertical, pv,
    contentPaddingLeft, pl, contentPaddingRight, pr,
    contentPadding, cs
  ]);

  // Memoized refresh control
  const refreshControl = useMemo(() => {
    if (!onRefresh) return undefined;

    return (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
        tintColor={refreshTintColor ? colors[refreshTintColor as ColorProps] || refreshTintColor : undefined}
        colors={refreshColor ? [colors[refreshColor as ColorProps] || refreshColor] : undefined}
        title={refreshTitle}
        titleColor={refreshTitleColor ? colors[refreshTitleColor as ColorProps] || refreshTitleColor : undefined}
      />
    );
  }, [refreshing, onRefresh, refreshTintColor, refreshColor, refreshTitle, refreshTitleColor, colors]);

  // Determine if we need Animated.ScrollView
  const animated = scrollX || scrollY;
  const Comp = animated ? Animated.ScrollView : Scroll;

  // Handle scroll events
  const handleScroll = animated
            ? Animated.event(
                [
                  {
                    nativeEvent: {
              contentOffset: {
                x: scrollX,
                y: scrollY,
              },
                    },
                  },
                ],
        { useNativeDriver: true, listener: onScroll }
      )
    : onScroll;

  return (
    <Comp
      ref={ref}
      {...(otherProps as any)}
      style={[computedStyle, style]}
      contentContainerStyle={contentContainerStyle}
      refreshControl={refreshControl}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={svs}
      showsHorizontalScrollIndicator={shs}
    >
        {children}
      </Comp>
    );
});

export default ScrollView;
