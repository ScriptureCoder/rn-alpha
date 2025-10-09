import React, { useMemo } from 'react';
import { TextProps, Text as Char, TextStyle } from 'react-native';
import { ColorProps } from "../../constants/colors";
import useColor from "../../hooks/use-color";
import { Weight } from '../../types';

export type SpacingProps = {
    padding?: number;
    margin?: number;
    p?: number;
    m?: number;
    ph?: number; pv?: number; pt?: number; pb?: number; pl?: number; pr?: number;
    mh?: number; mv?: number; mt?: number; mb?: number; ml?: number; mr?: number;
    px?: number; py?: number;
}

export type TypographyProps = {
    color?: ColorProps | string;
    align?: 'right' | 'left' | 'center' | 'justify' | 'auto';
    size?: number;
    weight?: Weight;
    lineHeight?: number;
    letterSpacing?: number;
    tt?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    td?: "none" | "underline" | "line-through" | "underline line-through";
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    textShadow?: {
        color?: string;
        offset?: { width: number; height: number };
        radius?: number;
    };
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    selectable?: boolean;
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
    maxFontSizeMultiplier?: number;
    allowFontScaling?: boolean;
}

export type AnimationProps = {
    opacity?: number;
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
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

export type Props = TextProps & SpacingProps & TypographyProps & AnimationProps & LayoutProps;

// Font weight mapping for better performance
const FONT_WEIGHTS: Record<Weight, string> = {
    'Regular': 'NunitoSans-Regular',
    'Bold': 'NunitoSans-Bold',
    'SemiBold': 'NunitoSans-SemiBold',
    'Light': 'NunitoSans-Light',
    'Medium': 'NunitoSans-Medium',
    'ExtraLight': 'NunitoSans-ExtraLight',
    'Italic': 'NunitoSans-Italic',
    'ExtraBold': 'NunitoSans-ExtraBold',
} as const;

// Text size presets
const TEXT_SIZES = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
} as const;

const Text: React.FC<Props> = React.forwardRef<Char, Props>((props, ref) => {
    const { colors } = useColor();
    
    const {
        style,
        color = "text",
        align,
        size,
        weight,
        lineHeight,
        letterSpacing,
        tt,
        td,
        fontFamily,
        fontStyle,
        textShadow,
        numberOfLines,
        ellipsizeMode,
        selectable,
        adjustsFontSizeToFit,
        minimumFontScale,
        maxFontSizeMultiplier,
        allowFontScaling,
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
        // Animation props
        opacity,
        scale,
        rotate,
        translateX,
        translateY,
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
        let finalWidth = size ?? width ?? w;
        let finalHeight = size ?? height ?? h;
        
        if (fullWidth) finalWidth = '100%';
        if (fullHeight) finalHeight = '100%';

        // Handle center shortcuts
        let centerStyles = {};
        if (center) {
            centerStyles = { textAlign: 'center' };
        } else {
            if (centerX) centerStyles = { ...centerStyles, textAlign: 'center' };
            if (centerY) centerStyles = { ...centerStyles, textAlignVertical: 'center' };
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

        // Create base text style
        const textStyle: TextStyle = {
            fontFamily: fontFamily || (weight ? FONT_WEIGHTS[weight] : FONT_WEIGHTS.Regular),
            color: resolveColor(color),
            textAlign: align,
            fontSize: size,
            lineHeight,
            letterSpacing,
            textTransform: tt,
            textDecorationLine: td,
            fontStyle,
            textShadowColor: textShadow?.color,
            textShadowOffset: textShadow?.offset,
            textShadowRadius: textShadow?.radius,
            ...centerStyles,
        };

        // Create layout style (separate from text style)
        const layoutStyle = {
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
            flex,
            width: finalWidth as any, // Cast to any to handle string values like '100%'
            height: finalHeight as any, // Cast to any to handle string values like '100%'
            minWidth: minW as any,
            maxWidth: maxW as any,
            minHeight: minH as any,
            maxHeight: maxH as any,
            position: finalPosition,
            opacity: finalOpacity,
            transform: transform.length > 0 ? transform : undefined,
        };

        return [textStyle, layoutStyle];
    }, [
        color, align, size, weight, lineHeight, letterSpacing, tt, td,
        fontFamily, fontStyle, textShadow, opacity, scale, rotate,
        translateX, translateY, flex, width, w, height, h,
        minW, maxW, minH, maxH, fullWidth, fullHeight,
        center, centerX, centerY, absolute, relative,
        hidden, visible, disabled,
        padding, p, margin, m, mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr, px, py,
        colors
    ]);

    return (
        <Char
            ref={ref}
            {...otherProps}
            style={[...computedStyle, style]}
        />
    );
});

export default Text;
