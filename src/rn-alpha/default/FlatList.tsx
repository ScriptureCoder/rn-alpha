import React, { useMemo } from 'react';
import { Animated, FlatListProps, FlatList as Parent, NativeScrollEvent, NativeSyntheticEvent, ViewStyle, RefreshControl, AccessibilityRole } from 'react-native';
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

export type FlatListCustomProps = {
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
  getItemLayout?: (data: any, index: number) => { length: number; offset: number; index: number };
  
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
  accessibilityRole?: AccessibilityRole;
  
  // Animation
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  
  // List specific props
  numColumns?: number;
  columnWrapperStyle?: ViewStyle;
  keyExtractor?: (item: any, index: number) => string;
  renderItem?: ({ item, index, separators }: { item: any; index: number; separators: any }) => React.ReactElement;
  ItemSeparatorComponent?: React.ComponentType<any> | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponentStyle?: ViewStyle;
  ListFooterComponentStyle?: ViewStyle;
  ItemSeparatorComponentStyle?: ViewStyle;
  
  // Data and loading
  data?: any[];
  extraData?: any;
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshColor?: ColorProps | string;
  refreshTintColor?: ColorProps | string;
  refreshTitle?: string;
  refreshTitleColor?: ColorProps | string;
  
  // End reached
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  onEndReachedThreshold?: number;
  
  // Viewability
  onViewableItemsChanged?: (info: { viewableItems: any[]; changed: any[] }) => void;
  viewabilityConfig?: any;
  viewabilityConfigCallbackPairs?: any[];
  
  // Legacy
  legacyImplementation?: boolean;
}

export type Props<T = any> = FlatListProps<T> & SpacingProps & LayoutProps & FlatListCustomProps;

const FlatList = React.forwardRef<Parent<any>, Props<any>>((props, ref) => {
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
    // FlatList props
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
    getItemLayout,
    keyboardShouldPersistTaps = "handled",
    keyboardDismissMode,
    bounces,
    alwaysBounceHorizontal,
    alwaysBounceVertical,
    canCancelContentTouches,
    centerContent,
    automaticallyAdjustContentInsets,
    contentInsetAdjustmentBehavior,
    pagingEnabled,
    decelerationRate,
    horizontal,
    directionalLockEnabled,
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
    // List specific props
    numColumns,
    columnWrapperStyle,
    keyExtractor,
    renderItem,
    ItemSeparatorComponent,
    ListEmptyComponent,
    ListHeaderComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    ListFooterComponentStyle,
    ItemSeparatorComponentStyle,
    // Data and loading
    data,
    extraData,
    refreshing,
    onRefresh,
    refreshColor,
    refreshTintColor,
    refreshTitle,
    refreshTitleColor,
    // End reached
    onEndReached,
    onEndReachedThreshold,
    // Viewability
    onViewableItemsChanged,
    viewabilityConfig,
    viewabilityConfigCallbackPairs,
    // Legacy
    legacyImplementation,
    // Other props
    style,
    ...otherProps
  } = props;

  // Memoized style calculation for better performance
  const computedStyle = useMemo(() => {
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
    let finalPosition: 'absolute' | 'relative' | 'static' | undefined = undefined;
    if (absolute) finalPosition = 'absolute';
    if (relative) finalPosition = 'relative';

    // Create base view style
    const viewStyle: any = {
      flex,
      width: finalWidth as any, // Cast to any to handle string values like '100%'
      height: finalHeight as any, // Cast to any to handle string values like '100%'
      minWidth: minW as any, // Cast to any to handle string values
      maxWidth: maxW as any, // Cast to any to handle string values
      minHeight: minH as any, // Cast to any to handle string values
      maxHeight: maxH as any, // Cast to any to handle string values
      ...centerStyles,
      // Spacing
      padding: finalPadding as any, // Cast to any to handle string values
      margin: finalMargin as any, // Cast to any to handle string values
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

    return viewStyle;
  }, [
    flex, width, w, height, h, minW, maxW, minH, maxH,
    fullWidth, fullHeight, center, centerX, centerY,
    absolute, relative, hidden, visible, disabled,
    padding, p, margin, m, mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    opacity, scale, rotate, translateX, translateY
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

  // Determine if we need Animated.FlatList
  const animated = scrollX || scrollY;
  const Comp = animated ? Animated.FlatList : Parent;

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
      style={[computedStyle, style] as any}
      contentContainerStyle={contentContainerStyle as any}
      showsVerticalScrollIndicator={svs}
      showsHorizontalScrollIndicator={shs}
      refreshControl={refreshControl}
      onScroll={handleScroll}
    />
  );
});

export default FlatList;
