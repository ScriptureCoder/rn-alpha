import React, { useMemo } from 'react';
import { ImageSourcePropType, ViewStyle, ImageStyle, AccessibilityRole } from "react-native";
import { ColorProps } from "../../constants/colors";
import useColor from "../../hooks/use-color";
import { View } from "../index";
import FastImage from '@d11/react-native-fast-image';

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
    size?: number | string;
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

export type PositionProps = {
    position?: 'absolute' | 'relative';
    inset?: number;
    insetX?: number;
    insetY?: number;
    top?: number; bottom?: number; right?: number; left?: number;
}

export type BorderProps = {
    br?: number;
    bc?: ColorProps | string;
    bw?: number;
    bbw?: number;
    btw?: number;
    blw?: number;
    brw?: number;
    brc?: ColorProps | string;
    blc?: ColorProps | string;
    btc?: ColorProps | string;
    bbc?: ColorProps | string;
    btrr?: number;
    btlr?: number;
    bbrr?: number;
    bblr?: number;
    bs?: "solid" | "dotted" | "dashed";
}

export type AnimationProps = {
    opacity?: number;
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
    skewX?: number;
    skewY?: number;
    perspective?: number;
}

export interface CustomImageProps extends React.ComponentProps<typeof FastImage> {
    // Layout props
    w?: number;
    h?: number;
    size?: number;
    flex?: number;
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
    
    // Border props
    br?: number;
    bc?: ColorProps | string;
    bw?: number;
    bbw?: number;
    btw?: number;
    blw?: number;
    brw?: number;
    brc?: ColorProps | string;
    blc?: ColorProps | string;
    btc?: ColorProps | string;
    bbc?: ColorProps | string;
    btrr?: number;
    btlr?: number;
    bbrr?: number;
    bblr?: number;
    bs?: "solid" | "dotted" | "dashed";
    
    // Color props
    color?: ColorProps | string;
    tintColor?: ColorProps | string;
    
    // Animation props
    opacity?: number;
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
    skewX?: number;
    skewY?: number;
    perspective?: number;
    
    // Image props
    source: ImageSourcePropType | any;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
    priority?: 'low' | 'normal' | 'high';
    cache?: 'immutable' | 'web' | 'cacheOnly';
    
    // Loading and error handling
    onLoad?: () => void;
    onError?: () => void;
    onLoadStart?: () => void;
    onLoadEnd?: () => void;
    onProgress?: (event: any) => void;
    
    // Accessibility
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: AccessibilityRole;
    
    // Performance
    fadeDuration?: number;
    shouldRasterizeIOS?: boolean;
    renderToHardwareTextureAndroid?: boolean;
}

export type Props = CustomImageProps & SpacingProps & LayoutProps & PositionProps & BorderProps & AnimationProps;

const Image: React.FC<Props> = (props) => {
    const { colors } = useColor();
    
    const {
        // Layout props
        w, h, size, flex,
        fullWidth, fullHeight,
        center, centerX, centerY,
        absolute, relative,
        hidden, visible, disabled,
        // Border props
        br, bc, bw, bbw, btw, blw, brw,
        brc, blc, btc, bbc,
        btrr, btlr, bbrr, bblr, bs,
        // Color props
        color, tintColor,
        // Animation props
        opacity, scale, rotate, translateX, translateY,
        skewX, skewY, perspective,
        // Image props
        source, resizeMode = "cover", priority, cache,
        // Loading and error handling
        onLoad, onError, onLoadStart, onLoadEnd, onProgress,
        // Accessibility
        accessibilityLabel, accessibilityHint, accessibilityRole,
        // Performance
        fadeDuration, shouldRasterizeIOS, renderToHardwareTextureAndroid,
        // Spacing props
        padding, p, margin, m,
        mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr, px, py,
        // Position props
        position, inset, insetX, insetY, top, right, bottom, left,
        // Other props
        style, ...otherProps
    } = props;

    // Memoized style calculation for better performance
    const computedStyle = useMemo(() => {
        // Helper function to resolve colors
        const resolveColor = (colorValue?: ColorProps | string) => {
            if (!colorValue) return undefined;
            return colors[colorValue as ColorProps] || colorValue;
        };

        // Handle width/height shortcuts
        let finalWidth: number | string | undefined = size ?? w;
        let finalHeight: number | string | undefined = size ?? h;
        
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
        if (skewX) transform.push({ skewX: `${skewX}deg` });
        if (skewY) transform.push({ skewY: `${skewY}deg` });

        // Handle visibility
        let finalOpacity = opacity;
        if (hidden) finalOpacity = 0;
        if (visible) finalOpacity = 1;
        if (disabled) finalOpacity = 0.5;

        // Handle position
        let finalPosition = position;
        if (absolute) finalPosition = 'absolute';
        if (relative) finalPosition = 'relative';
        
        // Handle position shortcuts
        let positionProps: any = { position: finalPosition, top, right, bottom, left };
        
        if (insetY !== undefined) {
            positionProps = { position: "absolute", top: insetY, bottom: insetY };
        }
        if (insetX !== undefined) {
            positionProps = { position: "absolute", right: insetX, left: insetX };
        }
        if (inset !== undefined) {
            positionProps = {
                position: "absolute",
                right: inset,
                left: inset,
                top: inset,
                bottom: inset
            };
        }

        // Create base image style
        const imageStyle: any = {
            flex,
            width: typeof finalWidth === 'string' ? undefined : finalWidth,
            height: typeof finalHeight === 'string' ? undefined : finalHeight,
            borderRadius: typeof br === 'string' ? undefined : br,
            backgroundColor: resolveColor(color),
            tintColor: resolveColor(tintColor),
            ...centerStyles,
            // Spacing
            padding: typeof finalPadding === 'string' ? undefined : finalPadding,
            margin: typeof finalMargin === 'string' ? undefined : finalMargin,
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
            // Position
            ...positionProps,
            // Border
            borderWidth: bw,
            borderBottomWidth: bbw,
            borderTopWidth: btw,
            borderLeftWidth: blw,
            borderRightWidth: brw,
            borderColor: resolveColor(bc),
            borderRightColor: resolveColor(brc),
            borderLeftColor: resolveColor(blc),
            borderTopColor: resolveColor(btc),
            borderBottomColor: resolveColor(bbc),
            borderTopRightRadius: typeof btrr === 'string' ? undefined : btrr,
            borderTopLeftRadius: typeof btlr === 'string' ? undefined : btlr,
            borderBottomLeftRadius: typeof bblr === 'string' ? undefined : bblr,
            borderBottomRightRadius: typeof bbrr === 'string' ? undefined : bbrr,
            borderStyle: bs,
            // Animation
            opacity: finalOpacity,
            transform: transform.length > 0 ? transform : undefined,
        };

        return imageStyle;
    }, [
        w, h, size, flex, fullWidth, fullHeight,
        center, centerX, centerY, absolute, relative,
        hidden, visible, disabled,
        br, bc, bw, bbw, btw, blw, brw,
        brc, blc, btc, bbc, btrr, btlr, bbrr, bblr, bs,
        color, tintColor, opacity, scale, rotate,
        translateX, translateY, skewX, skewY, perspective,
        padding, p, margin, m, mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr, px, py,
        position, inset, insetX, insetY, top, right, bottom, left,
        colors
    ]);

    // Handle image source validation
    const isValidSource = source && source.uri && !source.uri.includes('undefined');

    // Memoized FastImage props
    const fastImageProps = useMemo(() => ({
        ...otherProps,
        source: isValidSource ? { uri: source.uri } : source,
        style: computedStyle,
        resizeMode: FastImage.resizeMode[resizeMode],
        priority: priority ? FastImage.priority[priority] : undefined,
        cache: cache ? FastImage.cacheControl[cache] : undefined,
        onLoad,
        onError,
        onLoadStart,
        onLoadEnd,
        onProgress,
        fadeDuration,
        shouldRasterizeIOS,
        renderToHardwareTextureAndroid,
        accessibilityLabel,
        accessibilityHint,
        accessibilityRole,
    }), [
        otherProps, source, computedStyle, resizeMode, priority, cache,
        onLoad, onError, onLoadStart, onLoadEnd, onProgress,
        fadeDuration, shouldRasterizeIOS, renderToHardwareTextureAndroid,
        accessibilityLabel, accessibilityHint, accessibilityRole, isValidSource
    ]);

    return (
        <>
            {isValidSource ? (
                <FastImage {...fastImageProps} />
            ) : (
                <View style={computedStyle} fd={"flex-center"}>
                    {/* Placeholder for invalid or missing image */}
                </View>
            )}
        </>
    );
};

export default Image;
