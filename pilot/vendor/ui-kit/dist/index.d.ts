/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default, { ComponentPropsWithRef, ComponentPropsWithoutRef, JSX as JSX$1, FormEvent, ReactNode, MouseEventHandler, AnchorHTMLAttributes, RefObject, MutableRefObject } from 'react';
import dayjs from 'dayjs';
import { ComponentPropsWithRefFix as ComponentPropsWithRefFix$1 } from '@v-uik/common/src';
import { FactoryOpts, InputMask as InputMask$1 } from 'imask';
import { DebouncedFunc } from 'lodash';
import { Props as Props$3 } from 'simplebar-react';

/**
 * Направление (раскладка) элемента.
 *
 * @value horizontal - горизонтальная раскладка элемента, слева направо.
 * @value vertical - вертикальная раскладка элемента, сверху вниз.
 */
declare const Direction: {
    readonly horizontal: "horizontal";
    readonly vertical: "vertical";
};
declare type DirectionType = keyof typeof Direction;

/**
 * Размеры элементов.
 *
 * SM - small. Маленький размер
 * MD - medium. Средний размер
 * LG - large. Большой размер.
 */
declare const ElementSize: {
    readonly sm: "sm";
    readonly md: "md";
    readonly lg: "lg";
};
declare type ElementSizeType = keyof typeof ElementSize;

declare const breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
};
declare type Breakpoints = typeof breakpoints;

declare const palette: {
    white: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    black: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    greyWarm: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    greyCold: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    blue: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    yellow: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    red: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    purple: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    lightBlue: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
    green: {
        $0: string;
        $5: string;
        $10: string;
        $20: string;
        $30: string;
        $40: string;
        $50: string;
        $60: string;
        $70: string;
        $80: string;
        $90: string;
        $100: string;
    };
};
interface Color {
    /**
     *
     * @inner
     */
    $0: string;
    /**
     *
     * @inner
     */
    $5: string;
    /**
     *
     * @inner
     */
    $10: string;
    /**
     *
     * @inner
     */
    $20: string;
    /**
     *
     * @inner
     */
    $30: string;
    /**
     *
     * @inner
     */
    $40: string;
    /**
     *
     * @inner
     */
    $50: string;
    /**
     *
     * @inner
     */
    $60: string;
    /**
     *
     * @inner
     */
    $70: string;
    /**
     *
     * @inner
     */
    $80: string;
    /**
     *
     * @inner
     */
    $90: string;
    /**
     *
     * @inner
     */
    $100: string;
}
declare type PaletteTypes = typeof palette;
declare type Palette = {
    [K in keyof PaletteTypes]: Color;
};

declare type Colors = {
    /**
     *
     * @inner
     */
    text: {
        /**
         *
         * @inner
         */
        inverse: string;
        /**
         *
         * @inner
         */
        default: string;
        /**
         *
         * @inner
         */
        disabled: string;
    };
    /**
     *
     * @inner
     */
    primary: Color;
    /**
     *
     * @inner
     */
    success: Color;
    /**
     *
     * @inner
     */
    monochrome: Color;
    /**
     *
     * @inner
     */
    warn: Color;
    /**
     *
     * @inner
     */
    error: Color;
    /**
     *
     * @inner
     */
    info: Color;
};

declare const colourway: {
    /**
     * Primary.
     */
    primary: string;
    primaryHover: string;
    primarySelected: string;
    primaryActive: string;
    primaryHighlight: string;
    onPrimaryHigh: string;
    onPrimaryMedium: string;
    onPrimaryLow: string;
    onPrimaryDisabled: string;
    onPrimaryOverDisabled: string;
    primaryOverlayHover: string;
    primaryOverlaySelected: string;
    primaryOverlayActive: string;
    /**
     * Overlay.
     */
    overlay: string;
    overlayHover: string;
    overlaySelected: string;
    overlayActive: string;
    /**
     * Secondary.
     */
    secondary: string;
    secondaryHover: string;
    secondarySelected: string;
    secondaryActive: string;
    secondaryHighlight: string;
    onSecondaryHigh: string;
    onSecondaryMedium: string;
    onSecondaryLow: string;
    onSecondaryDisabled: string;
    secondaryOverlayHover: string;
    secondaryOverlaySelected: string;
    secondaryOverlayActive: string;
    /**
     * Mono.
     */
    mono01: string;
    mono02: string;
    mono03: string;
    mono04: string;
    mono05: string;
    mono06: string;
    mono07: string;
    mono08: string;
    /**
     * Background.
     */
    background01: string;
    background02: string;
    background03: string;
    backgroundComponent: string;
    onBackgroundHigh: string;
    onBackgroundMedium: string;
    onBackgroundLow: string;
    onBackgroundDisabled: string;
    /**
     * Link.
     */
    link: string;
    linkHover: string;
    linkActive: string;
    linkVisited: string;
    /**
     * Success.
     */
    success: string;
    successHover: string;
    successSelected: string;
    successActive: string;
    onSuccessHigh: string;
    onSuccessMedium: string;
    onSuccessLow: string;
    onSuccessDisabled: string;
    /**
     * Error.
     */
    error: string;
    errorHover: string;
    errorSelected: string;
    errorActive: string;
    onErrorHigh: string;
    onErrorMedium: string;
    onErrorLow: string;
    onErrorDisabled: string;
    /**
     * Warning.
     */
    warning: string;
    warningHover: string;
    warningSelected: string;
    warningActive: string;
    onWarningHigh: string;
    onWarningMedium: string;
    onWarningLow: string;
    onWarningDisabled: string;
    /**
     * Support.
     */
    support: string;
    supportHover: string;
    supportSelected: string;
    supportActive: string;
    onSupportHigh: string;
    onSupportMedium: string;
    onSupportLow: string;
    onSupportDisabled: string;
    /**
     * Info.
     */
    info: string;
    infoHover: string;
    infoSelected: string;
    infoActive: string;
    onInfoHigh: string;
    onInfoMedium: string;
    onInfoLow: string;
    onInfoDisabled: string;
    /**
     * Disabled.
     */
    disabledMajor: string;
    disabledMinor: string;
    disabledOpaque: string;
    /**
     * Focus.
     */
    focus: string;
    focusPocus: string;
    /**
     * Skeleton.
     */
    skeleton: string;
    /**
     * Inverse.
     */
    inverse: string;
    onInverseHigh: string;
    onInverseMedium: string;
    onInverseLow: string;
    onInverseDisabled: string;
    inverseOverlayHover: string;
    inverseOverlaySelected: string;
    inverseOverlayActive: string;
    /**
     * Colors.
     */
    red: string;
    onRed: string;
    yellow: string;
    onYellow: string;
    green: string;
    onGreen: string;
    azure: string;
    onAzure: string;
    blue: string;
    onBlue: string;
    violet: string;
    onViolet: string;
    gray: string;
    onGray: string;
    /**
     * Shadows.
     */
    shadow01: string;
    shadow02: string;
    shadow03: string;
    /**
     * Bar colors.
     */
    bar: {
        dark: {
            bg01: string;
            subBg01: string;
            subBg02: string;
            gap: string;
            gapDisabled: string;
            onBgHigh: string;
            onBgMedium: string;
            onBgLow: string;
            onBgDisabled: string;
            selector: string;
            mn01: string;
            mn02: string;
            mn03: string;
            mn04: string;
            mn05: string;
            mn06: string;
            mn07: string;
            /**
             * Overlay.
             */
            mn08: string;
            logo: string;
            focus: string;
            focusPocus: string;
            error: string;
            skeleton: string;
        };
        light: {
            bg01: string;
            subBg01: string;
            subBg02: string;
            gap: string;
            gapDisabled: string;
            onBgHigh: string;
            onBgMedium: string;
            onBgLow: string;
            onBgDisabled: string;
            selector: string;
            mn01: string;
            mn02: string;
            mn03: string;
            mn04: string;
            mn05: string;
            mn06: string;
            mn07: string;
            mn08: string;
            logo: string;
            focus: string;
            focusPocus: string;
            error: string;
            skeleton: string;
        };
        primary: {
            bg01: string;
            gap: string;
            gapDisabled: string;
            onBgHigh: string;
            onBgMedium: string;
            onBgLow: string;
            onBgDisabled: string;
            selector: string;
            mn01: string;
            mn02: string;
            mn03: string;
            mn04: string;
            mn05: string;
            mn06: string;
            mn07: string;
            mn08: string;
            logo: string;
            focus: string;
            focusPocus: string;
            error: string;
            skeleton: string;
        };
    };
};
declare type Colourway = typeof colourway;

declare const shape: {
    borderRadius: number;
    borderWidth: number;
    borderStyle: string;
    outline: string;
};
declare type Shape = typeof shape;

interface FontFamily {
    /**
     *
     * @inner
     */
    headings?: string;
    /**
     *
     * @inner
     */
    text: string;
    /**
     *
     * @inner
     */
    code?: string;
}
interface FontWeight {
    /**
     *
     * @inner
     */
    light: number;
    /**
     *
     * @inner
     */
    regular: number;
    /**
     *
     * @inner
     */
    semibold: number;
}
interface FontSize {
    /**
     *
     * @inner
     */
    h1: number | string;
    /**
     *
     * @inner
     */
    h2: number | string;
    /**
     *
     * @inner
     */
    h3: number | string;
    /**
     *
     * @inner
     */
    h4: number | string;
    /**
     *
     * @inner
     */
    h5: number | string;
    /**
     *
     * @inner
     */
    h6: number | string;
    /**
     *
     * @inner
     */
    subtitle1: number | string;
    /**
     *
     * @inner
     */
    subtitle2: number | string;
    /**
     *
     * @inner
     */
    body1: number | string;
    /**
     *
     * @inner
     */
    body2: number | string;
    /**
     *
     * @inner
     */
    button: number | string;
    /**
     *
     * @inner
     */
    caption: number | string;
    /**
     *
     * @inner
     */
    overline: number | string;
    /**
     *
     * @inner
     */
    code1: number | string;
    /**
     *
     * @inner
     */
    code2: number | string;
}
interface Font {
    /**
     *
     * @inner
     */
    fontFamily: FontFamily;
    /**
     *
     * @inner
     */
    fontWeight: FontWeight;
    /**
     *
     * @inner
     */
    fontSize: FontSize;
    /**
     *
     * @inner
     */
    letterSpacing: FontSize;
    /**
     *
     * @inner
     */
    lineHeight: FontSize;
}
declare type Typography = Font;

declare const zIndex: {
    zero: number;
    default: number;
    bar: number;
    drawer: number;
    modal: number;
    popup: number;
    notification: number;
    invisible: number;
};
declare type ZIndex = typeof zIndex | Record<string, number>;

declare const ref: {
    alpha: {
        channel0: number;
        channel5: number;
        channel10: number;
        channel15: number;
        channel20: number;
        channel25: number;
        channel30: number;
        channel35: number;
        channel40: number;
        channel45: number;
        channel50: number;
        channel55: number;
        channel60: number;
        channel65: number;
        channel70: number;
        channel75: number;
        channel80: number;
        channel85: number;
        channel90: number;
        channel95: number;
        channel100: number;
    };
    palette: {
        red10: string;
        red15: string;
        red20: string;
        red30: string;
        red40: string;
        red50: string;
        red60: string;
        red70: string;
        red80: string;
        red90: string;
        red95: string;
        red99: string;
        orange10: string;
        orange15: string;
        orange20: string;
        orange30: string;
        orange40: string;
        orange50: string;
        orange60: string;
        orange70: string;
        orange80: string;
        orange90: string;
        orange95: string;
        orange99: string;
        amber10: string;
        amber15: string;
        amber20: string;
        amber30: string;
        amber40: string;
        amber50: string;
        amber60: string;
        amber70: string;
        amber80: string;
        amber90: string;
        amber95: string;
        amber99: string;
        gold10: string;
        gold15: string;
        gold20: string;
        gold30: string;
        gold40: string;
        gold50: string;
        gold60: string;
        gold70: string;
        gold80: string;
        gold90: string;
        gold95: string;
        gold99: string;
        sunny10: string;
        sunny15: string;
        sunny20: string;
        sunny30: string;
        sunny40: string;
        sunny50: string;
        sunny60: string;
        sunny70: string;
        sunny80: string;
        sunny90: string;
        sunny95: string;
        sunny99: string;
        spring10: string;
        spring15: string;
        spring20: string;
        spring30: string;
        spring40: string;
        spring50: string;
        spring60: string;
        spring70: string;
        spring80: string;
        spring90: string;
        spring95: string;
        spring99: string;
        herbal10: string;
        herbal15: string;
        herbal20: string;
        herbal30: string;
        herbal40: string;
        herbal50: string;
        herbal60: string;
        herbal70: string;
        herbal80: string;
        herbal90: string;
        herbal95: string;
        herbal99: string;
        green10: string;
        green15: string;
        green20: string;
        green30: string;
        green40: string;
        green50: string;
        green60: string;
        green70: string;
        green80: string;
        green90: string;
        green95: string;
        green99: string;
        arctic10: string;
        arctic15: string;
        arctic20: string;
        arctic30: string;
        arctic40: string;
        arctic50: string;
        arctic60: string;
        arctic70: string;
        arctic80: string;
        arctic90: string;
        arctic95: string;
        arctic99: string;
        malachite10: string;
        malachite15: string;
        malachite20: string;
        malachite30: string;
        malachite40: string;
        malachite50: string;
        malachite60: string;
        malachite70: string;
        malachite80: string;
        malachite90: string;
        malachite95: string;
        malachite99: string;
        skyBlue10: string;
        skyBlue15: string;
        skyBlue20: string;
        skyBlue30: string;
        skyBlue40: string;
        skyBlue50: string;
        skyBlue60: string;
        skyBlue70: string;
        skyBlue80: string;
        skyBlue90: string;
        skyBlue95: string;
        skyBlue99: string;
        blue10: string;
        blue15: string;
        blue20: string;
        blue30: string;
        blue40: string;
        blue50: string;
        blue60: string;
        blue70: string;
        blue80: string;
        blue90: string;
        blue95: string;
        blue99: string;
        electricBlue10: string;
        electricBlue15: string;
        electricBlue20: string;
        electricBlue30: string;
        electricBlue40: string;
        electricBlue50: string;
        electricBlue60: string;
        electricBlue70: string;
        electricBlue80: string;
        electricBlue90: string;
        electricBlue95: string;
        electricBlue99: string;
        orchid10: string;
        orchid15: string;
        orchid20: string;
        orchid30: string;
        orchid40: string;
        orchid50: string;
        orchid60: string;
        orchid70: string;
        orchid80: string;
        orchid90: string;
        orchid95: string;
        orchid99: string;
        fuchsia10: string;
        fuchsia15: string;
        fuchsia20: string;
        fuchsia30: string;
        fuchsia40: string;
        fuchsia50: string;
        fuchsia60: string;
        fuchsia70: string;
        fuchsia80: string;
        fuchsia90: string;
        fuchsia95: string;
        fuchsia99: string;
        pink10: string;
        pink15: string;
        pink20: string;
        pink30: string;
        pink40: string;
        pink50: string;
        pink60: string;
        pink70: string;
        pink80: string;
        pink90: string;
        pink95: string;
        pink99: string;
        gray10: string;
        gray15: string;
        gray20: string;
        gray30: string;
        gray40: string;
        gray50: string;
        gray60: string;
        gray70: string;
        gray80: string;
        gray90: string;
        gray95: string;
        gray99: string;
        coldGray10: string;
        coldGray15: string;
        coldGray20: string;
        coldGray30: string;
        coldGray40: string;
        coldGray50: string;
        coldGray60: string;
        coldGray70: string;
        coldGray80: string;
        coldGray90: string;
        coldGray95: string;
        coldGray99: string;
        black: string;
        white: string;
    };
    radius: {
        none: number;
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
        circle: number;
    };
    shadow: {
        _10: string;
        _20: string;
        _30: string;
        _40: string;
        _50: string;
        _60: string;
        _70: string;
        _80: string;
    };
    typography: {
        fontFamily: {
            brand: string;
            base: string;
            uiText: string;
            code: string;
        };
        fontWeight: {
            thin: number;
            extraLight: number;
            light: number;
            regular: number;
            medium: number;
            semiBold: number;
            bold: number;
            extraBold: number;
            black: number;
            extraBlack: number;
        };
    };
};
declare type Ref = typeof ref;

declare const createSys: (theme: Theme) => {
    color: {
        backgroundAlpha: string;
        backgroundBeta: string;
        backgroundGamma: string;
        backgroundComponent: string;
        onBackgroundHigh: string;
        onBackgroundMedium: string;
        onBackgroundLow: string;
        onBackgroundOverlayToning: string;
        onBackgroundOverlaySelect: string;
        onBackgroundOverlayHover: string;
        onBackgroundOverlayActive: string;
        inverseBackgroundAlpha: string;
        inverseBackgroundBeta: string;
        inverseOnBackgroundHigh: string;
        inverseOnBackgroundMedium: string;
        inverseOnBackgroundLow: string;
        inverseOnBackgroundOverlayToning: string;
        inverseOnBackgroundOverlaySelect: string;
        inverseOnBackgroundOverlayHover: string;
        inverseOnBackgroundOverlayActive: string;
        primaryAlpha: string;
        primaryBeta: string;
        primaryGamma: string;
        onPrimaryHigh: string;
        onPrimaryMedium: string;
        onPrimaryLow: string;
        primaryOverlayToning: string;
        primaryOverlaySelect: string;
        primaryOverlayHover: string;
        primaryOverlayActive: string;
        onPrimaryOverlayToning: string;
        onPrimaryOverlaySelect: string;
        onPrimaryOverlayHover: string;
        onPrimaryOverlayActive: string;
        inversePrimaryAlpha: string;
        inversePrimaryBeta: string;
        inversePrimaryGamma: string;
        inverseOnPrimaryHigh: string;
        inverseOnPrimaryMedium: string;
        inverseOnPrimaryLow: string;
        secondaryAlpha: string;
        secondaryBeta: string;
        secondaryGamma: string;
        onSecondaryHigh: string;
        onSecondaryMedium: string;
        onSecondaryLow: string;
        secondaryOverlayToning: string;
        secondaryOverlaySelect: string;
        secondaryOverlayHover: string;
        secondaryOverlayActive: string;
        onSecondaryOverlayToning: string;
        onSecondaryOverlaySelect: string;
        onSecondaryOverlayHover: string;
        onSecondaryOverlayActive: string;
        neutralAlpha: string;
        neutralBeta: string;
        neutralGamma: string;
        onNeutralHigh: string;
        onNeutralMedium: string;
        onNeutralLow: string;
        inverseNeutralAlpha: string;
        successAlpha: string;
        onSuccessHigh: string;
        warningAlpha: string;
        onWarningHigh: string;
        infoAlpha: string;
        onInfoHigh: string;
        errorAlpha: string;
        errorBeta: string;
        errorGamma: string;
        onErrorHigh: string;
        onErrorMedium: string;
        onErrorLow: string;
        disabled: string;
        disabledHigh: string;
        disabledMedium: string;
        disabledLow: string;
        inverseDisabled: string;
        inverseDisabledHigh: string;
        inverseDisabledMedium: string;
        inverseDisabledLow: string;
        focus: string;
        focusPocus: string;
        inverseFocus: string;
        inverseFocusPocus: string;
        separationMajor: string;
        separationMinor: string;
        inverseSeparationMajor: string;
        inverseSeparationMinor: string;
        backdropColorBackground: string;
        skeleton: string;
    };
    elevation: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    shape: {
        borderRadiusNone: number;
        borderRadiusSm: number;
        borderRadiusMd: number;
        borderRadiusLg: number;
        borderRadiusXl: number;
        borderRadiusCircle: number;
        borderWidthBase: number;
        borderWidthThick: number;
    };
    typography: {
        displayLg: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        displayMd: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        displaySm: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        headline1: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        headline2: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        headline3: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        headline4: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        headline5: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        titleLg: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        titleMd: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        titleSm: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        bodyXl: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        bodyLg: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        bodyMd: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        bodySm: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        uiTextLg: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        uiTextMd: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        uiTextSm: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: number;
        };
        codeLg: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        codeMd: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
        codeSm: {
            fontFamily: string;
            fontWeight: number;
            fontSize: number;
            lineHeight: string;
            letterSpacing: string;
        };
    };
};
declare type Sys = ReturnType<typeof createSys>;

declare const createComp: (theme: Theme, customProps?: ThemeOptions) => {
    accordion: {
        widthBorder: number;
        colorBorder: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
    };
    accordionItem: {
        colorText: string;
        colorTextDisabled: string;
        widthBorder: number;
        colorBorder: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        contentColorText: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        contentTypographyFontFamily: string;
        contentTypographyFontWeight: number;
        contentTypographyFontSize: string | number;
        contentTypographyLineHeight: string | number;
        contentTypographyLetterSpacing: string | number;
    };
    avatar: {
        colorBackground: string;
        colorText: string;
        widthBorder: number;
        colorBorder: string;
        elevationShadow: string;
        shapeBorderRadiusTopLeftCircle: number;
        shapeBorderRadiusTopRightCircle: number;
        shapeBorderRadiusBottomLeftCircle: number;
        shapeBorderRadiusBottomRightCircle: number;
        shapeBorderRadiusTopLeftRounded: number;
        shapeBorderRadiusTopRightRounded: number;
        shapeBorderRadiusBottomLeftRounded: number;
        shapeBorderRadiusBottomRightRounded: number;
        shapeBorderRadiusTopLeftSquare: number;
        shapeBorderRadiusTopRightSquare: number;
        shapeBorderRadiusBottomLeftSquare: number;
        shapeBorderRadiusBottomRightSquare: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        avatarGroupWidthBorder: number;
        avatarGroupColorBorder: string;
    };
    badge: {
        widthShadow: number;
        colorShadow: string;
        colorBackgroundSuccess: string;
        colorBackgroundError: string;
        colorBackgroundNeutral: string;
        colorBackgroundInfo: string;
        colorBackgroundWarning: string;
        colorBackgroundDisabled: string;
        colorTextSuccess: string;
        colorTextError: string;
        colorTextNeutral: string;
        colorTextInfo: string;
        colorTextWarning: string;
        colorTextDisabled: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        dotShapeBorderRadiusTopLeft: string | number;
        dotShapeBorderRadiusTopRight: string | number;
        dotShapeBorderRadiusBottomLeft: string | number;
        dotShapeBorderRadiusBottomRight: string | number;
    };
    bar: {
        colorBackgroundDark: string;
        colorBackgroundLight: string;
        colorBackgroundPrimary: string;
        widthBorderShadow: number;
        colorBorderShadowDark: string;
        colorBorderShadowLight: string;
        colorBorderShadowPrimary: string;
        shapeBorderRadiusTopLeftHorizontal: number;
        shapeBorderRadiusTopRightHorizontal: number;
        shapeBorderRadiusBottomLeftHorizontal: number;
        shapeBorderRadiusBottomRightHorizontal: number;
        shapeBorderRadiusTopLeftVertical: number;
        shapeBorderRadiusTopRightVertical: number;
        shapeBorderRadiusBottomLeftVertical: number;
        shapeBorderRadiusBottomRightVertical: number;
    };
    barButton: {
        colorTextDark: string;
        colorTextDarkDisabled: string;
        colorTextLight: string;
        colorTextLightDisabled: string;
        colorTextPrimary: string;
        colorTextPrimaryDisabled: string;
        colorBackgroundDarkHover: string;
        colorBackgroundDarkActive: string;
        colorBackgroundLightHover: string;
        colorBackgroundLightActive: string;
        colorBackgroundPrimaryHover: string;
        colorBackgroundPrimaryActive: string;
        widthShadowFocus: number;
        colorShadowDarkFocus: string;
        colorShadowLightFocus: string;
        colorShadowPrimaryFocus: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
    };
    barDate: {
        dateColorTextDark: string;
        dateColorTextLight: string;
        dateColorTextPrimary: string;
        timeColorTextDark: string;
        timeColorTextLight: string;
        timeColorTextPrimary: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
    };
    barDivider: {
        widthBorder: number;
        colorBackgroundDarkMajor: string;
        colorBackgroundDarkMinor: string;
        colorBackgroundLightMajor: string;
        colorBackgroundLightMinor: string;
        colorBackgroundPrimaryMajor: string;
        colorBackgroundPrimaryMinor: string;
    };
    barDropdown: {
        listColorBackgroundDark: string;
        listColorBackgroundLight: string;
        listColorBackgroundPrimary: string;
        listWidthBorder: number;
        listColorBorderDark: string;
        listColorBorderLight: string;
        listColorBorderPrimary: string;
        listShapeBorderRadiusTopLeftMd: number;
        listShapeBorderRadiusTopRightMd: number;
        listShapeBorderRadiusBottomLeftMd: number;
        listShapeBorderRadiusBottomRightMd: number;
        listShapeBorderRadiusTopLeftSm: number;
        listShapeBorderRadiusTopRightSm: number;
        listShapeBorderRadiusBottomLeftSm: number;
        listShapeBorderRadiusBottomRightSm: number;
        listShapeBorderRadiusTopLeftLg: number;
        listShapeBorderRadiusTopRightLg: number;
        listShapeBorderRadiusBottomLeftLg: number;
        listShapeBorderRadiusBottomRightLg: number;
    };
    barDropdownItem: {
        colorTextDark: string;
        colorTextDarkDisabled: string;
        colorTextLight: string;
        colorTextLightDisabled: string;
        colorTextPrimary: string;
        colorTextPrimaryDisabled: string;
        colorBackgroundDarkHover: string;
        colorBackgroundDarkFocus: string;
        colorBackgroundLightHover: string;
        colorBackgroundLightFocus: string;
        colorBackgroundPrimaryHover: string;
        colorBackgroundPrimaryFocus: string;
        listColorBackgroundDark: string;
        listColorBackgroundLight: string;
        listColorBackgroundPrimary: string;
        listColorBorderDark: string;
        listColorBorderLight: string;
        listColorBorderPrimary: string;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
    };
    barMenuItem: {
        colorTextDark: string;
        colorTextDarkDisabled: string;
        colorTextDarkSelected: string;
        colorTextLight: string;
        colorTextLightDisabled: string;
        colorTextLightSelected: string;
        colorTextPrimary: string;
        colorTextPrimaryDisabled: string;
        colorTextPrimarySelected: string;
        colorBackgroundDarkHover: string;
        colorBackgroundDarkActive: string;
        colorBackgroundDarkSelected: string;
        colorBackgroundLightHover: string;
        colorBackgroundLightActive: string;
        colorBackgroundLightSelected: string;
        colorBackgroundPrimaryHover: string;
        colorBackgroundPrimaryActive: string;
        colorBackgroundPrimarySelected: string;
        indicatorColorBackgroundDark: string;
        indicatorColorBackgroundLight: string;
        indicatorColorBackgroundPrimary: string;
        widthShadowFocus: number;
        colorShadowDarkFocus: string;
        colorShadowLightFocus: string;
        colorShadowPrimaryFocus: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
    };
    barSearch: {
        inputColorTextLightDisabled: string;
        inputColorTextDarkDisabled: string;
        inputColorTextPrimaryDisabled: string;
        inputWidthBorder: number;
        inputColorBorderDark: string;
        inputColorBorderDarkHover: string;
        inputColorBorderLight: string;
        inputColorBorderLightHover: string;
        inputColorBorderPrimary: string;
        inputColorBorderPrimaryHover: string;
        inputColorBackgroundDarkHover: string;
        inputColorBackgroundLightHover: string;
        inputColorBackgroundPrimaryHover: string;
        inputWidthShadowFocus: number;
        inputColorShadowDarkFocus: string;
        inputColorShadowLightFocus: string;
        inputColorShadowPrimaryFocus: string;
        inputColorTextDark: string;
        inputColorTextLight: string;
        inputColorTextPrimary: string;
        placeholderColorTextDark: string;
        placeholderColorTextLight: string;
        placeholderColorTextPrimary: string;
        prefixColorTextDark: string;
        prefixColorTextLight: string;
        prefixColorTextPrimary: string;
        suffixColorTextDark: string;
        suffixColorTextLight: string;
        suffixColorTextPrimary: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
    };
    barSelect: {
        colorTextDark: string;
        colorTextLight: string;
        colorTextPrimary: string;
        placeholderColorTextDark: string;
        placeholderColorTextLight: string;
        placeholderColorTextPrimary: string;
        widthBorder: number;
        colorBorderDark: string;
        colorBorderDarkHover: string;
        colorBorderLight: string;
        colorBorderLightHover: string;
        colorBorderPrimary: string;
        colorBorderPrimaryHover: string;
        colorBackgroundDarkHover: string;
        colorBackgroundLightHover: string;
        colorBackgroundPrimaryHover: string;
        widthShadowFocus: number;
        colorShadowDarkFocus: string;
        colorShadowLightFocus: string;
        colorShadowPrimaryFocus: string;
        listColorBackgroundDark: string;
        listColorBackgroundLight: string;
        listColorBackgroundPrimary: string;
        listWidthBorder: number;
        listColorBorderDark: string;
        listColorBorderLight: string;
        listColorBorderPrimary: string;
        optionColorTextDark: string;
        optionColorTextLight: string;
        optionColorTextPrimary: string;
        optionColorBackgroundDarkHover: string;
        optionColorBackgroundLightHover: string;
        optionColorBackgroundPrimaryHover: string;
        inputShapeBorderRadiusTopLeft: number;
        inputShapeBorderRadiusTopRight: number;
        inputShapeBorderRadiusBottomLeft: number;
        inputShapeBorderRadiusBottomRight: number;
        listShapeBorderRadiusTopLeftMd: number;
        listShapeBorderRadiusTopRightMd: number;
        listShapeBorderRadiusBottomLeftMd: number;
        listShapeBorderRadiusBottomRightMd: number;
        listShapeBorderRadiusTopLeftSm: number;
        listShapeBorderRadiusTopRightSm: number;
        listShapeBorderRadiusBottomLeftSm: number;
        listShapeBorderRadiusBottomRightSm: number;
        listShapeBorderRadiusTopLeftLg: number;
        listShapeBorderRadiusTopRightLg: number;
        listShapeBorderRadiusBottomLeftLg: number;
        listShapeBorderRadiusBottomRightLg: number;
        optionShapeBorderRadiusTopLeftMd: number;
        optionShapeBorderRadiusTopRightMd: number;
        optionShapeBorderRadiusBottomLeftMd: number;
        optionShapeBorderRadiusBottomRightMd: number;
        optionShapeBorderRadiusTopLeftSm: number;
        optionShapeBorderRadiusTopRightSm: number;
        optionShapeBorderRadiusBottomLeftSm: number;
        optionShapeBorderRadiusBottomRightSm: number;
        optionShapeBorderRadiusTopLeftLg: number;
        optionShapeBorderRadiusTopRightLg: number;
        optionShapeBorderRadiusBottomLeftLg: number;
        optionShapeBorderRadiusBottomRightLg: number;
    };
    subBar: {
        colorBackgroundDark: string;
        colorBackgroundDarker: string;
        colorBackgroundLight: string;
        colorBackgroundLighter: string;
        widthBorderShadow: number;
        colorBorderShadowDark: string;
        colorBorderShadowDarker: string;
        colorBorderShadowLight: string;
        colorBorderShadowLighter: string;
        shapeBorderRadiusTopLeftHorizontal: number;
        shapeBorderRadiusTopRightHorizontal: number;
        shapeBorderRadiusBottomLeftHorizontal: number;
        shapeBorderRadiusBottomRightHorizontal: number;
        shapeBorderRadiusTopLeftVertical: number;
        shapeBorderRadiusTopRightVertical: number;
        shapeBorderRadiusBottomLeftVertical: number;
        shapeBorderRadiusBottomRightVertical: number;
    };
    breadcrumbs: {
        colorTextLastChild: string;
        dividerColorText: string;
        typographyFontFamilyLastChild: string;
        typographyFontWeightLastChild: number;
        typographyFontSizeLastChild: string | number;
        typographyLineHeightLastChild: string | number;
        typographyLetterSpacingLastChild: string | number;
        dividerTypographyFontFamily: string;
        dividerTypographyFontWeight: number;
        dividerTypographyFontSize: string | number;
        dividerTypographyLineHeight: string | number;
        dividerTypographyLetterSpacing: string | number;
    };
    button: {
        colorBackgroundContainedPrimary: string;
        colorBackgroundContainedPrimaryHover: string;
        colorBackgroundContainedPrimaryActive: string;
        colorBackgroundContainedPrimaryDisabled: string;
        colorBackgroundContainedSecondary: string;
        colorBackgroundContainedSecondaryHover: string;
        colorBackgroundContainedSecondaryActive: string;
        colorBackgroundContainedSecondaryDisabled: string;
        colorBackgroundContainedError: string;
        colorBackgroundContainedErrorHover: string;
        colorBackgroundContainedErrorActive: string;
        colorBackgroundContainedErrorDisabled: string;
        colorBackgroundOutlinedPrimaryFocus: string;
        colorBackgroundOutlinedPrimaryHover: string;
        colorBackgroundOutlinedPrimaryActive: string;
        colorBackgroundOutlinedSecondaryFocus: string;
        colorBackgroundOutlinedSecondaryHover: string;
        colorBackgroundOutlinedSecondaryActive: string;
        colorBackgroundOutlinedErrorFocus: string;
        colorBackgroundOutlinedErrorHover: string;
        colorBackgroundOutlinedErrorActive: string;
        colorBackgroundGhostPrimaryHover: string;
        colorBackgroundGhostPrimaryActive: string;
        colorBackgroundGhostSecondaryHover: string;
        colorBackgroundGhostSecondaryActive: string;
        colorBackgroundGhostErrorHover: string;
        colorBackgroundGhostErrorActive: string;
        colorTextContainedPrimary: string;
        colorTextContainedPrimaryDisabled: string;
        colorTextContainedSecondary: string;
        colorTextContainedSecondaryDisabled: string;
        colorTextContainedError: string;
        colorTextContainedErrorDisabled: string;
        colorTextOutlinedPrimary: string;
        colorTextOutlinedPrimaryFocus: string;
        colorTextOutlinedPrimaryHover: string;
        colorTextOutlinedPrimaryActive: string;
        colorTextOutlinedPrimaryDisabled: string;
        colorTextOutlinedSecondary: string;
        colorTextOutlinedSecondaryFocus: string;
        colorTextOutlinedSecondaryHover: string;
        colorTextOutlinedSecondaryActive: string;
        colorTextOutlinedSecondaryDisabled: string;
        colorTextOutlinedError: string;
        colorTextOutlinedErrorFocus: string;
        colorTextOutlinedErrorHover: string;
        colorTextOutlinedErrorActive: string;
        colorTextOutlinedErrorDisabled: string;
        colorTextGhostPrimary: string;
        colorTextGhostPrimaryHover: string;
        colorTextGhostPrimaryActive: string;
        colorTextGhostPrimaryDisabled: string;
        colorTextGhostSecondary: string;
        colorTextGhostSecondaryHover: string;
        colorTextGhostSecondaryActive: string;
        colorTextGhostSecondaryDisabled: string;
        colorTextGhostError: string;
        colorTextGhostErrorHover: string;
        colorTextGhostErrorActive: string;
        colorTextGhostErrorDisabled: string;
        widthBorderOutlined: number;
        colorBorderOutlinedPrimary: string;
        colorBorderOutlinedPrimaryDisabled: string;
        colorBorderOutlinedSecondary: string;
        colorBorderOutlinedSecondaryDisabled: string;
        colorBorderOutlinedError: string;
        colorBorderOutlinedErrorDisabled: string;
        widthBorderFocus: number;
        colorBorderFocus: string;
        colorShadowFocus: string;
        widthShadowFocus: number;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    buttonGroup: {
        colorTextPrimarySelected: string;
        colorTextSecondarySelected: string;
        colorBackgroundPrimarySelected: string;
        colorBackgroundSecondarySelected: string;
    };
    card: {
        elevationShadow: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBackgroundContainer: string;
        colorBackgroundClickable: string;
        colorBackgroundClickableHover: string;
        colorBackgroundClickableActive: string;
        colorBackgroundClickableDisabled: string;
        colorBackgroundSelectable: string;
        colorBackgroundSelectableHover: string;
        colorBackgroundSelectableActive: string;
        colorBackgroundSelectableDisabled: string;
        colorBackgroundSelectableChecked: string;
        colorBackgroundSelectableCheckedHover: string;
        colorBackgroundSelectableCheckedActive: string;
        colorBackgroundSelectableCheckedDisabled: string;
        bodyColorText: string;
        headerColorText: string;
        subtitleColorText: string;
        headerColorTextDisabled: string;
        subtitleColorTextDisabled: string;
        bodyColorTextDisabled: string;
        widthBorder: number;
        colorBorderContainer: string;
        colorBorderClickable: string;
        colorBorderClickableHover: string;
        colorBorderClickableActive: string;
        colorBorderClickableDisabled: string;
        colorBorderSelectable: string;
        colorBorderSelectableHover: string;
        colorBorderSelectableActive: string;
        colorBorderSelectableDisabled: string;
        colorBorderSelectableChecked: string;
        colorBorderSelectableCheckedHover: string;
        colorBorderSelectableCheckedActive: string;
        colorBorderSelectableCheckedDisabled: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        bodyTypographyFontSize: string | number;
        bodyTypographyFontWeight: number;
        bodyTypographyLetterSpacing: string | number;
        bodyTypographyLineHeight: string | number;
        bodyTypographyFontFamily: string;
        headerTypographyFontSize: string | number;
        headerTypographyFontWeight: number;
        headerTypographyLetterSpacing: string | number;
        headerTypographyLineHeight: string | number;
        headerTypographyFontFamily: string | undefined;
        subtitleTypographyFontSize: string | number;
        subtitleTypographyFontWeight: number;
        subtitleTypographyLetterSpacing: string | number;
        subtitleTypographyLineHeight: string | number;
        subtitleTypographyFontFamily: string;
    };
    checkbox: {
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundDisabled: string;
        iconColorText: string;
        colorMark: string;
        colorBorder: string;
        colorBorderHover: string;
        colorBorderActive: string;
        colorBorderDisabled: string;
        colorBackgroundChecked: string;
        colorBackgroundCheckedHover: string;
        colorBackgroundCheckedActive: string;
        colorBackgroundCheckedDisabled: string;
        colorBorderChecked: string;
        colorBorderCheckedHover: string;
        colorBorderCheckedActive: string;
        colorBorderCheckedDisabled: string;
        iconColorTextChecked: string;
        colorMarkChecked: string;
        iconColorTextCheckedHover: string;
        colorMarkCheckedHover: string;
        iconColorTextCheckedActive: string;
        colorMarkCheckedActive: string;
        iconColorTextCheckedDisabled: string;
        colorMarkCheckedDisabled: string;
        colorBackgroundIndeterminate: string;
        colorBorderIndeterminate: string;
        iconColorTextIndeterminate: string;
        colorBackgroundIndeterminateHover: string;
        colorBorderIndeterminateHover: string;
        colorMarkIndeterminate: string;
        iconColorTextIndeterminateHover: string;
        colorBackgroundIndeterminateActive: string;
        colorBorderIndeterminateActive: string;
        colorMarkIndeterminateHover: string;
        iconColorTextIndeterminateActive: string;
        colorBackgroundIndeterminateDisabled: string;
        colorBorderIndeterminateDisabled: string;
        colorMarkIndeterminateActive: string;
        iconColorTextIndeterminateDisabled: string;
        colorMarkIndeterminateDisabled: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
    };
    comboBox: {
        inputColorText: string;
        inputColorTextDisabled: string;
        inputColorBackground: string;
        inputColorBackgroundDisabled: string;
        inputColorBackgroundHover: string;
        inputColorBackgroundSearchableHover: string;
        inputColorBackgroundError: string;
        inputWidthBorder: number;
        inputColorBorder: string;
        inputColorBorderHover: string;
        inputColorBorderError: string;
        inputColorBorderDisabled: string;
        inputWidthShadowFocus: number;
        inputColorShadowFocus: string;
        placeholderColorText: string;
        placeholderColorTextDisabled: string;
        alertIconColorText: string;
        listColorBackground: string;
        listWidthBorder: number;
        listColorBorder: string;
        listElevationShadow: string;
        optionColorBackgroundHover: string;
        optionColorBackgroundSelected: string;
        inputShapeBorderRadiusTopLeftMd: number;
        inputShapeBorderRadiusTopRightMd: number;
        inputShapeBorderRadiusBottomLeftMd: number;
        inputShapeBorderRadiusBottomRightMd: number;
        inputShapeBorderRadiusTopLeftSm: number;
        inputShapeBorderRadiusTopRightSm: number;
        inputShapeBorderRadiusBottomLeftSm: number;
        inputShapeBorderRadiusBottomRightSm: number;
        inputShapeBorderRadiusTopLeftLg: number;
        inputShapeBorderRadiusTopRightLg: number;
        inputShapeBorderRadiusBottomLeftLg: number;
        inputShapeBorderRadiusBottomRightLg: number;
        inputTypographyFontFamily: string;
        inputTypographyFontWeight: number;
        inputTypographyLetterSpacing: string | number;
        inputTypographyFontSizeSm: string;
        inputTypographyLineHeightSm: string;
        inputTypographyFontSizeMd: string;
        inputTypographyLineHeightMd: string;
        inputTypographyFontSizeLg: string;
        inputTypographyLineHeightLg: string;
        inputTypographyFontSize: string | number;
        inputTypographyLineHeight: string | number;
        optionShapeBorderRadiusTopLeftMd: number;
        optionShapeBorderRadiusTopRightMd: number;
        optionShapeBorderRadiusBottomLeftMd: number;
        optionShapeBorderRadiusBottomRightMd: number;
        optionShapeBorderRadiusTopLeftSm: number;
        optionShapeBorderRadiusTopRightSm: number;
        optionShapeBorderRadiusBottomLeftSm: number;
        optionShapeBorderRadiusBottomRightSm: number;
        optionShapeBorderRadiusTopLeftLg: number;
        optionShapeBorderRadiusTopRightLg: number;
        optionShapeBorderRadiusBottomLeftLg: number;
        optionShapeBorderRadiusBottomRightLg: number;
        listShapeBorderRadiusTopLeftMd: number;
        listShapeBorderRadiusTopRightMd: number;
        listShapeBorderRadiusBottomLeftMd: number;
        listShapeBorderRadiusBottomRightMd: number;
        listShapeBorderRadiusTopLeftSm: number;
        listShapeBorderRadiusTopRightSm: number;
        listShapeBorderRadiusBottomLeftSm: number;
        listShapeBorderRadiusBottomRightSm: number;
        listShapeBorderRadiusTopLeftLg: number;
        listShapeBorderRadiusTopRightLg: number;
        listShapeBorderRadiusBottomLeftLg: number;
        listShapeBorderRadiusBottomRightLg: number;
    };
    datePicker: {
        dropdownColorBackground: string;
        dropdownWidthBorder: number;
        dropdownColorBorder: string;
        dropdownElevationShadow: string;
        dropdownShapeBorderRadiusTopLeft: number;
        dropdownShapeBorderRadiusTopRight: number;
        dropdownShapeBorderRadiusBottomLeft: number;
        dropdownShapeBorderRadiusBottomRight: number;
    };
    divider: {
        colorBorder: string;
        widthBorder: number;
        styleBorder: string;
        colorText: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
    };
    rangePicker: {
        dropdownColorBackground: string;
        dropdownWidthBorder: number;
        dropdownColorBorder: string;
        dropdownElevationShadow: string;
        inputColorBackground: string;
        inputColorBackgroundError: string;
        inputColorBackgroundDisabled: string;
        inputWidthBorder: number;
        inputColorBorder: string;
        inputColorBorderHover: string;
        inputColorBorderError: string;
        inputColorBorderDisabled: string;
        inputWidthShadowFocus: number;
        inputColorShadowFocus: string;
        dividerColorText: string;
        dividerColorTextDisabled: string;
        iconColorText: string;
        iconColorTextDisabled: string;
        infinityPanelColorBackground: string;
        infinityPanelColorText: string;
        inputShapeBorderRadiusTopLeftMd: number;
        inputShapeBorderRadiusTopRightMd: number;
        inputShapeBorderRadiusBottomLeftMd: number;
        inputShapeBorderRadiusBottomRightMd: number;
        inputShapeBorderRadiusTopLeftSm: number;
        inputShapeBorderRadiusTopRightSm: number;
        inputShapeBorderRadiusBottomLeftSm: number;
        inputShapeBorderRadiusBottomRightSm: number;
        inputShapeBorderRadiusTopLeftLg: number;
        inputShapeBorderRadiusTopRightLg: number;
        inputShapeBorderRadiusBottomLeftLg: number;
        inputShapeBorderRadiusBottomRightLg: number;
        dropdownShapeBorderRadiusTopLeft: number;
        dropdownShapeBorderRadiusTopRight: number;
        dropdownShapeBorderRadiusBottomLeft: number;
        dropdownShapeBorderRadiusBottomRight: number;
    };
    calendarPicker: {
        monthButtonColorTextSelected: string;
        monthButtonColorBackgroundSelected: string;
        yearButtonColorTextSelected: string;
        yearButtonColorBackgroundSelected: string;
        buttonShapeBorderRadiusTopLeft: number;
        buttonShapeBorderRadiusTopRight: number;
        buttonShapeBorderRadiusBottomLeft: number;
        buttonShapeBorderRadiusBottomRight: number;
    };
    dayView: {
        weekDayColorText: string;
        dayButtonColorText: string;
        dayButtonColorTextDisabled: string;
        dayButtonColorTextSelected: string;
        dayButtonColorTextSelectedDisabled: string;
        dayButtonColorTextToday: string;
        dayButtonColorTextTodayDisabled: string;
        dayButtonColorTextTodaySelected: string;
        dayButtonColorTextNotInMonth: string;
        dayButtonColorBackgroundHover: string;
        dayButtonColorBackgroundActive: string;
        dayButtonColorBackgroundSelected: string;
        dayButtonColorBackgroundSelectedHover: string;
        dayButtonColorBackgroundSelectedActive: string;
        dayButtonColorBackgroundSelectedDisabled: string;
        dayButtonWidthShadowFocus: number;
        dayButtonColorShadowFocus: string;
        dayButtonWidthBorder: number;
        dayButtonColorBorderFocus: string;
        dayButtonColorBackgroundWithinRange: string;
        dayButtonColorBackgroundWithinRangeHover: string;
        dayButtonColorBorderHover: string;
        dividerWidthBorder: number;
        dividerColorBorder: string;
        dayButtonShapeBorderRadiusTopLeft: number;
        dayButtonShapeBorderRadiusTopRight: number;
        dayButtonShapeBorderRadiusBottomLeft: number;
        dayButtonShapeBorderRadiusBottomRight: number;
        weekDayTypographyFontFamily: string;
        weekDayTypographyFontSize: string | number;
        weekDayTypographyLineHeight: string | number;
        weekDayTypographyLetterSpacing: string | number;
        weekDayTypographyFontWeight: number;
        dayButtonTypographyFontFamily: string;
        dayButtonTypographyFontSize: string | number;
        dayButtonTypographyLineHeight: string | number;
        dayButtonTypographyLetterSpacing: string | number;
        dayButtonTypographyFontWeight: number;
    };
    /**
     * @deprecated Будет удалено, используйте dayView.
     */
    rangeDayView: {
        weekDayColorText: string;
        dayButtonColorTextToday: string;
        dayButtonColorTextTodayDisabled: string;
        dayButtonColorTextTodaySelected: string;
        dayButtonColorTextNotInMonth: string;
        dayButtonColorBackgroundWithinRange: string;
        dayButtonColorBackgroundWithinRangeHover: string;
        dayButtonColorBorderHover: string;
        dividerColorBorder: string;
        dayButtonShapeBorderRadiusTopLeft: string;
        dayButtonShapeBorderRadiusTopRight: string;
        dayButtonShapeBorderRadiusBottomLeft: string;
        dayButtonShapeBorderRadiusBottomRight: string;
    };
    monthView: {
        monthButtonColorText: string;
        monthButtonColorTextDisabled: string;
        monthButtonColorTextSelected: string;
        monthButtonColorTextSelectedDisabled: string;
        monthButtonColorBackgroundHover: string;
        monthButtonColorBackgroundActive: string;
        monthButtonColorBackgroundSelected: string;
        monthButtonColorBackgroundSelectedHover: string;
        monthButtonColorBackgroundSelectedActive: string;
        monthButtonColorBackgroundSelectedDisabled: string;
        monthButtonWidthShadowFocus: number;
        monthButtonColorShadowFocus: string;
        monthButtonWidthBorder: number;
        monthButtonColorBorderFocus: string;
        monthButtonColorBorderHover: string;
        monthButtonColorBackgroundWithinRange: string;
        monthButtonColorBackgroundWithinRangeHover: string;
        monthButtonShapeBorderRadiusTopLeft: number;
        monthButtonShapeBorderRadiusTopRight: number;
        monthButtonShapeBorderRadiusBottomLeft: number;
        monthButtonShapeBorderRadiusBottomRight: number;
        monthButtonTypographyFontFamily: string;
        monthButtonTypographyFontSize: string | number;
        monthButtonTypographyLineHeight: string | number;
        monthButtonTypographyLetterSpacing: string | number;
        monthButtonTypographyFontWeight: number;
    };
    yearView: {
        yearButtonColorText: string;
        yearButtonColorTextDisabled: string;
        yearButtonColorTextSelected: string;
        yearButtonColorTextSelectedDisabled: string;
        yearButtonColorBackgroundHover: string;
        yearButtonColorBackgroundActive: string;
        yearButtonColorBackgroundSelected: string;
        yearButtonColorBackgroundSelectedHover: string;
        yearButtonColorBackgroundSelectedActive: string;
        yearButtonColorBackgroundSelectedDisabled: string;
        yearButtonWidthShadowFocus: number;
        yearButtonColorShadowFocus: string;
        yearButtonWidthBorder: number;
        yearButtonColorBorderFocus: string;
        yearButtonColorBorderHover: string;
        yearButtonColorBackgroundWithinRange: string;
        yearButtonColorBackgroundWithinRangeHover: string;
        yearButtonShapeBorderRadiusTopLeft: number;
        yearButtonShapeBorderRadiusTopRight: number;
        yearButtonShapeBorderRadiusBottomLeft: number;
        yearButtonShapeBorderRadiusBottomRight: number;
        yearButtonTypographyFontFamily: string;
        yearButtonTypographyFontSize: string | number;
        yearButtonTypographyLineHeight: string | number;
        yearButtonTypographyLetterSpacing: string | number;
        yearButtonTypographyFontWeight: number;
    };
    quarterView: {
        quarterButtonColorText: string;
        quarterButtonColorTextDisabled: string;
        quarterButtonColorTextSelected: string;
        quarterButtonMonthsColorText: string;
        quarterButtonMonthsColorTextSelected: string;
        quarterButtonColorTextSelectedDisabled: string;
        quarterButtonColorBackgroundHover: string;
        quarterButtonColorBackgroundActive: string;
        quarterButtonColorBackgroundSelected: string;
        quarterButtonColorBackgroundSelectedHover: string;
        quarterButtonColorBackgroundSelectedActive: string;
        quarterButtonColorBackgroundSelectedDisabled: string;
        quarterButtonColorShadowFocus: string;
        quarterButtonWidthShadowFocus: number;
        quarterButtonColorBorderFocus: string;
        quarterButtonWidthBorderFocus: number;
        quarterButtonColorBorderHover: string;
        quarterButtonShapeBorderRadiusTopLeft: number;
        quarterButtonShapeBorderRadiusTopRight: number;
        quarterButtonShapeBorderRadiusBottomLeft: number;
        quarterButtonShapeBorderRadiusBottomRight: number;
        quarterButtonTypographyFontFamily: string;
        quarterButtonMonthsTypographyFontFamily: string;
        quarterButtonTypographyFontSize: string | number;
        quarterButtonMonthsTypographyFontSize: string | number;
        quarterButtonTypographyLineHeight: string | number;
        quarterButtonMonthsTypographyLineHeight: string | number;
        quarterButtonTypographyLetterSpacing: string | number;
        quarterButtonMonthsTypographyLetterSpacing: string | number;
        quarterButtonTypographyFontWeight: number;
        quarterButtonMonthsTypographyFontWeight: number;
    };
    drawer: {
        colorText: string;
        colorBackground: string;
        widthBorder: number;
        colorBorder: string;
        backdropColorBackground: string;
        elevationShadow: string;
        shapeBorderRadiusTopLeftPlacementTop: number;
        shapeBorderRadiusTopRightPlacementTop: number;
        shapeBorderRadiusBottomLeftPlacementTop: number;
        shapeBorderRadiusBottomRightPlacementTop: number;
        shapeBorderRadiusTopLeftPlacementBottom: number;
        shapeBorderRadiusTopRightPlacementBottom: number;
        shapeBorderRadiusBottomLeftPlacementBottom: number;
        shapeBorderRadiusBottomRightPlacementBottom: number;
        shapeBorderRadiusTopLeftPlacementLeft: number;
        shapeBorderRadiusTopRightPlacementLeft: number;
        shapeBorderRadiusBottomLeftPlacementLeft: number;
        shapeBorderRadiusBottomRightPlacementLeft: number;
        shapeBorderRadiusTopLeftPlacementRight: number;
        shapeBorderRadiusTopRightPlacementRight: number;
        shapeBorderRadiusBottomLeftPlacementRight: number;
        shapeBorderRadiusBottomRightPlacementRight: number;
    };
    drawerHeader: {
        subtitleColorText: string;
        closeButtonColorText: string;
        closeButtonColorTextHover: string;
        closeButtonColorTextActive: string;
        closeButtonColorBackgroundHover: string;
        closeButtonColorBackgroundActive: string;
        dividerWidthBorder: number;
        dividerColorBorder: string;
        typographyFontFamily: string | undefined;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
        subtitleTypographyFontFamily: string;
        subtitleTypographyFontSize: string | number;
        subtitleTypographyLineHeight: string | number;
        subtitleTypographyLetterSpacing: string | number;
        subtitleTypographyFontWeight: number;
    };
    drawerFooter: {
        dividerWidthBorder: number;
        dividerColorBorder: string;
    };
    dropdownMenu: {
        colorBackground: string;
        widthBorder: number;
        colorBorder: string;
        elevationShadow: string;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
    };
    dropdownMenuItem: {
        colorBackground: string;
        colorBorder: string;
        elevationShadow: string;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
    };
    dropzone: {
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        widthBorder: number;
        colorBorder: string;
        colorBorderHover: string;
        colorBorderActive: string;
        contentColorText: string;
        colorBackgroundDisabled: string;
        colorBorderDisabled: string;
        contentColorTextDisabled: string;
        colorBorderError: string;
        colorBackgroundDragEnter: string;
        colorBorderDragEnter: string;
        colorBorderFocus: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomRight: number;
        contentTypographyFontFamily: string | undefined;
        contentTypographyFontSize: string | number;
        contentTypographyLineHeight: string | number;
        contentTypographyFontWeight: number;
        contentTypographyLetterSpacing: string | number;
    };
    fileItem: {
        colorText: string;
        colorBackground: string;
        colorBackgroundProgress: string;
        widthBorder: number;
        colorBorder: string;
        infoColorText: string;
        buttonColorIcon: string;
        buttonColorBackground: string;
        buttonColorBackgroundHover: string;
        buttonColorBackgroundActive: string;
        dividerWidthBorder: number;
        dividerColor: string;
        colorBorderError: string;
        errorTextColorText: string;
        iconColorTextError: string;
        iconColorTextSuccess: string;
        buttonWidthShadowFocus: number;
        buttonShadowFocus: string;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomRightLg: number;
        typographyFontFamily: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
        errorTextTypographyFontFamily: string;
        errorTextTypographyFontWeight: number;
        errorTextTypographyFontSize: string | number;
        errorTextTypographyLineHeight: string | number;
        errorTextTypographyLetterSpacing: string | number;
        infoTypographyFontFamily: string;
        infoTypographyFontSize: string | number;
        infoTypographyLineHeight: string | number;
        infoTypographyLetterSpacing: string | number;
        infoTypographyFontWeight: number;
    };
    inlineNotification: {
        widthBorder: number;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        indicatorColorBackgroundNeutral: string;
        indicatorColorBackgroundSuccess: string;
        indicatorColorBackgroundInfo: string;
        indicatorColorBackgroundWarning: string;
        indicatorColorBackgroundError: string;
        iconColorTextNeutral: string;
        iconColorTextSuccess: string;
        iconColorTextInfo: string;
        iconColorTextWarning: string;
        iconColorTextError: string;
        titleColorTextError: string;
        titleColorTextWarning: string;
        titleColorTextSuccess: string;
        titleColorTextNeutral: string;
        titleColorTextInfo: string;
        titleTypographyFontFamily: string;
        titleTypographyFontWeight: number;
        titleTypographyFontSize: string | number;
        titleTypographyLineHeight: string | number;
        titleTypographyLetterSpacing: string | number;
        contentColorTextError: string;
        contentColorTextWarning: string;
        contentColorTextSuccess: string;
        contentColorTextNeutral: string;
        contentColorTextInfo: string;
        contentTypographyFontFamily: string;
        contentTypographyFontWeight: number;
        contentTypographyFontSize: string | number;
        contentTypographyLineHeight: string | number;
        contentTypographyLetterSpacing: string | number;
        colorBackgroundOutlined: string;
        colorBorderOutlinedError: string;
        colorBorderOutlinedWarning: string;
        colorBorderOutlinedSuccess: string;
        colorBorderOutlinedInfo: string;
        colorBorderOutlinedNeutral: string;
        colorBackgroundFilledError: string;
        colorBackgroundFilledWarning: string;
        colorBackgroundFilledSuccess: string;
        colorBackgroundFilledInfo: string;
        colorBackgroundFilledNeutral: string;
        colorBorderFilledError: string;
        colorBorderFilledWarning: string;
        colorBorderFilledSuccess: string;
        colorBorderFilledInfo: string;
        colorBorderFilledNeutral: string;
        elevationShadowFilled: string;
    };
    input: {
        colorBackground: string;
        colorBackgroundDisabled: string;
        colorBackgroundError: string;
        widthBorder: number;
        colorBorder: string;
        colorBorderHover: string;
        colorBorderError: string;
        colorBorderDisabled: string;
        colorText: string;
        colorTextDisabled: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        placeholderColorText: string;
        placeholderColorTextDisabled: string;
        alertIconColorText: string;
        prefixColorText: string;
        prefixColorTextDisabled: string;
        suffixColorText: string;
        suffixColorTextDisabled: string;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    inputHelperText: {
        colorText: string;
        colorTextError: string;
        colorTextDisabled: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    inputPassword: {
        typographyFontFamilyHidden: string;
        typographyFontWeightHidden: number;
        typographyFontSizeHidden: string | number;
        typographyLineHeightHidden: string | number;
        typographyLetterSpacingHidden: string;
    };
    inputLabel: {
        colorText: string;
        colorTextDisabled: string;
        descriptionColorText: string;
        descriptionColorTextDisabled: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        descriptionTypographyFontFamily: string;
        descriptionTypographyFontWeight: number;
        descriptionTypographyLetterSpacing: string | number;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        descriptionTypographyFontSizeSm: string;
        descriptionTypographyLineHeightSm: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        descriptionTypographyFontSizeMd: string;
        descriptionTypographyLineHeightMd: string;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        descriptionTypographyFontSizeLg: string;
        descriptionTypographyLineHeightLg: string;
        typographyFontSize: string | number;
        descriptionTypographyFontSize: string | number;
        typographyLineHeight: string | number;
        descriptionTypographyLineHeight: string | number;
        requiredColorText: string;
    };
    labelControl: {
        colorText: string;
        colorTextDisabled: string;
        typographyFontFamilyLg: string;
        typographyFontWeightLg: number;
        typographyFontSizeLg: string | number;
        typographyLineHeightLg: string | number;
        typographyLetterSpacingLg: string | number;
        typographyFontFamilyMd: string;
        typographyFontWeightMd: number;
        typographyFontSizeMd: string | number;
        typographyLineHeightMd: string | number;
        typographyLetterSpacingMd: string | number;
        typographyFontFamilySm: string;
        typographyFontWeightSm: number;
        typographyFontSizeSm: string | number;
        typographyLineHeightSm: string | number;
        typographyLetterSpacingSm: string | number;
    };
    link: {
        colorText: string;
        colorTextHover: string;
        colorTextActive: string;
        colorTextDisabled: string;
        colorTextVisited: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
    };
    listItem: {
        colorText: string;
        colorTextDisabled: string;
        colorTextCritical: string;
        colorTextCriticalHover: string;
        colorTextCriticalActive: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundCriticalHover: string;
        colorBackgroundCriticalActive: string;
        widthBorder: number;
        colorBorder: string;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
        typographyFontFamily: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
    };
    listItemGroup: {
        colorText: string;
        typographyFontFamily: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
    };
    modal: {
        colorText: string;
        colorBackground: string;
        elevationShadow: string;
        backdropColorBackground: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        widthBorder: number;
        colorBorder: string;
    };
    modalHeader: {
        subtitleColorText: string;
        closeButtonColorText: string;
        closeButtonColorTextHover: string;
        closeButtonColorTextActive: string;
        closeButtonColorBackgroundHover: string;
        closeButtonColorBackgroundActive: string;
        subtitleTypographyFontFamily: string;
        subtitleTypographyFontSize: string | number;
        subtitleTypographyLineHeight: string | number;
        subtitleTypographyLetterSpacing: string | number;
        subtitleTypographyFontWeight: number;
        typographyFontFamily: string | undefined;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
    };
    notification: {
        colorText: string;
        titleColorTextError: string;
        titleColorTextWarning: string;
        titleColorTextSuccess: string;
        titleColorTextNeutral: string;
        titleColorTextInfo: string;
        contentColorTextError: string;
        contentColorTextWarning: string;
        contentColorTextSuccess: string;
        contentColorTextNeutral: string;
        contentColorTextInfo: string;
        widthBorder: number;
        colorBorderError: string;
        colorBorderWarning: string;
        colorBorderSuccess: string;
        colorBorderInfo: string;
        colorBorderNeutral: string;
        colorBackground: string;
        elevationShadow: string;
        indicatorColorBackgroundNeutral: string;
        indicatorColorBackgroundSuccess: string;
        indicatorColorBackgroundInfo: string;
        indicatorColorBackgroundWarning: string;
        indicatorColorBackgroundError: string;
        iconColorTextNeutral: string;
        iconColorTextSuccess: string;
        iconColorTextInfo: string;
        iconColorTextWarning: string;
        iconColorTextError: string;
        closeButtonColorText: string;
        closeButtonColorTextHover: string;
        closeButtonColorTextActive: string;
        closeButtonColorBackgroundHover: string;
        closeButtonColorBackgroundActive: string;
        closeButtonColorShadowFocus: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        titleTypographyFontFamily: string;
        titleTypographyFontWeight: number;
        titleTypographyFontSize: string | number;
        titleTypographyLineHeight: string | number;
        titleTypographyLetterSpacing: string | number;
        next_contentTypographyFontFamily: string;
        next_contentTypographyFontWeight: number;
        next_contentTypographyFontSize: string | number;
        next_contentTypographyLineHeight: string | number;
        next_contentTypographyLetterSpacing: string | number;
        contentTypographyFontFamily: string;
        contentTypographyFontWeight: number;
        contentTypographyFontSize: string | number;
        contentTypographyLineHeight: string | number;
        contentTypographyLetterSpacing: string | number;
    };
    linearProgress: {
        pathColorBackground: string;
        trackColorBackground: string;
        pathShapeBorderRadiusTopLeft: number;
        pathShapeBorderRadiusTopRight: number;
        pathShapeBorderRadiusBottomLeft: number;
        pathShapeBorderRadiusBottomRight: number;
        trackShapeBorderRadiusTopLeft: number;
        trackShapeBorderRadiusTopRight: number;
        trackShapeBorderRadiusBottomLeft: number;
        trackShapeBorderRadiusBottomRight: number;
    };
    circularProgress: {
        colorText: string;
        pathColorBackground: string;
        trackColorBackground: string;
        overlayColorBackground: string;
        backdropColorBackground: string;
        trackBackdropColorBackground: string;
        pathBackdropColorBackground: string;
        typographyFontFamily: string | undefined;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
    };
    radio: {
        next_colorBackground: string;
        next_colorBackgroundHover: string;
        next_colorBackgroundActive: string;
        next_colorBackgroundDisabled: string;
        colorBorder: string;
        colorBorderHover: string;
        colorBorderActive: string;
        colorBorderDisabled: string;
        colorBackgroundChecked: string;
        colorBackgroundCheckedHover: string;
        colorBackgroundCheckedActive: string;
        colorBackgroundCheckedDisabled: string;
        colorBorderChecked: string;
        colorBorderCheckedHover: string;
        colorBorderCheckedActive: string;
        colorBorderCheckedDisabled: string;
        colorMark: string;
        colorMarkHover: string;
        colorMarkActive: string;
        colorMarkDisabled: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundDisabled: string;
    };
    rating: {
        colorText: string;
        colorTextDisabled: string;
        colorTextSelected: string;
        colorTextSelectedHover: string;
        colorTextSelectedFocus: string;
        colorTextSelectedActive: string;
        colorTextSelectedDisabled: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeSm: string | number;
        typographyFontSizeXs: string | number;
        typographyLineHeightSm: string | number;
        typographyLineHeightXs: string | number;
        shapeBorderRadiusTopLeftXs: number;
        shapeBorderRadiusBottomLeftXs: number;
        shapeBorderRadiusTopRightXs: number;
        shapeBorderRadiusBottomRightXs: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomRightSm: number;
    };
    select: {
        inputColorText: string;
        inputColorTextDisabled: string;
        inputColorBackground: string;
        inputColorBackgroundDisabled: string;
        inputColorBackgroundHover: string;
        inputColorBackgroundError: string;
        inputWidthBorder: number;
        inputColorBorder: string;
        inputColorBorderHover: string;
        inputColorBorderError: string;
        inputColorBorderDisabled: string;
        inputWidthShadowFocus: number;
        inputColorShadowFocus: string;
        placeholderColorText: string;
        placeholderColorTextDisabled: string;
        alertIconColorText: string;
        listColorBackground: string;
        listWidthBorder: number;
        listColorBorder: string;
        listWidthBorderMultiple: number;
        listColorBorderMultiple: string;
        listColorBorderMultipleError: string;
        listWidthShadowMultipleFocus: number;
        listColorShadowMultipleFocus: string;
        listElevationShadow: string;
        optionColorBackgroundHover: string;
        optionColorBackgroundSelected: string;
        inputShapeBorderRadiusTopLeftMd: number;
        inputShapeBorderRadiusTopRightMd: number;
        inputShapeBorderRadiusBottomLeftMd: number;
        inputShapeBorderRadiusBottomRightMd: number;
        inputShapeBorderRadiusTopLeftSm: number;
        inputShapeBorderRadiusTopRightSm: number;
        inputShapeBorderRadiusBottomLeftSm: number;
        inputShapeBorderRadiusBottomRightSm: number;
        inputShapeBorderRadiusTopLeftLg: number;
        inputShapeBorderRadiusTopRightLg: number;
        inputShapeBorderRadiusBottomLeftLg: number;
        inputShapeBorderRadiusBottomRightLg: number;
        inputTypographyFontFamily: string;
        inputTypographyFontWeight: number;
        inputTypographyLetterSpacing: string | number;
        inputTypographyFontSizeSm: string;
        inputTypographyLineHeightSm: string;
        inputTypographyFontSizeMd: string;
        inputTypographyLineHeightMd: string;
        inputTypographyFontSizeLg: string;
        inputTypographyLineHeightLg: string;
        inputTypographyFontSize: string | number;
        inputTypographyLineHeight: string | number;
        optionShapeBorderRadiusTopLeftMd: number;
        optionShapeBorderRadiusTopRightMd: number;
        optionShapeBorderRadiusBottomLeftMd: number;
        optionShapeBorderRadiusBottomRightMd: number;
        optionShapeBorderRadiusTopLeftSm: number;
        optionShapeBorderRadiusTopRightSm: number;
        optionShapeBorderRadiusBottomLeftSm: number;
        optionShapeBorderRadiusBottomRightSm: number;
        optionShapeBorderRadiusTopLeftLg: number;
        optionShapeBorderRadiusTopRightLg: number;
        optionShapeBorderRadiusBottomLeftLg: number;
        optionShapeBorderRadiusBottomRightLg: number;
        listShapeBorderRadiusTopLeftMd: number;
        listShapeBorderRadiusTopRightMd: number;
        listShapeBorderRadiusBottomLeftMd: number;
        listShapeBorderRadiusBottomRightMd: number;
        listShapeBorderRadiusTopLeftSm: number;
        listShapeBorderRadiusTopRightSm: number;
        listShapeBorderRadiusBottomLeftSm: number;
        listShapeBorderRadiusBottomRightSm: number;
        listShapeBorderRadiusTopLeftLg: number;
        listShapeBorderRadiusTopRightLg: number;
        listShapeBorderRadiusBottomLeftLg: number;
        listShapeBorderRadiusBottomRightLg: number;
    };
    slider: {
        trackColorBackground: string;
        trackColorBackgroundDisabled: string;
        rangeColorBackground: string;
        rangeColorBackgroundActive: string;
        rangeColorBackgroundDisabled: string;
        tooltipColorBackground: string;
        tooltipColorText: string;
        tooltipColorBorder: string;
        tickColorBackground: string;
        tickLabelColorText: string;
        markerColorBackground: string;
        markerColorBackgroundHover: string;
        markerColorBackgroundActive: string;
        markerColorBackgroundFocus: string;
        markerColorBackgroundDisabled: string;
        markerWidthShadowFocus: number;
        markerColorShadowFocus: string;
        markerWidthBorderShadowFocus: number;
        markerColorBorderShadowFocus: string;
        trackShapeBorderRadiusTopLeft: number;
        trackShapeBorderRadiusTopRight: number;
        trackShapeBorderRadiusBottomLeft: number;
        trackShapeBorderRadiusBottomRight: number;
        markerShapeBorderRadiusTopLeft: string | number;
        markerShapeBorderRadiusTopRight: string | number;
        markerShapeBorderRadiusBottomLeft: string | number;
        markerShapeBorderRadiusBottomRight: string | number;
        tickLabelTypographyFontFamily: string;
        tickLabelTypographyFontSize: string | number;
        tickLabelTypographyLineHeight: string | number;
        tickLabelTypographyLetterSpacing: string | number;
        tickLabelTypographyFontWeight: number;
    };
    step: {
        iconColorText: string;
        iconColorTextError: string;
        iconColorTextErrorHover: string;
        iconColorTextErrorActive: string;
        iconColorTextCurrent: string;
        iconColorTextCompleted: string;
        iconColorTextCompletedHover: string;
        iconColorTextCompletedActive: string;
        iconColorTextDisabled: string;
        iconNumberColorTextCurrent: string;
        labelColorText: string;
        labelColorTextError: string;
        labelColorTextErrorHover: string;
        labelColorTextErrorActive: string;
        labelColorTextDisabled: string;
        badgeColorBackgroundError: string;
        badgeColorBackgroundErrorHover: string;
        badgeColorBackgroundErrorActive: string;
        badgeColorBackgroundDisabled: string;
        connectorColorBackground: string;
        connectorColorBackgroundError: string;
        connectorColorBackgroundErrorHover: string;
        connectorColorBackgroundErrorActive: string;
        connectorColorBackgroundCompleted: string;
        connectorColorBackgroundCompletedHover: string;
        connectorColorBackgroundCompletedActive: string;
        connectorColorBackgroundDisabled: string;
        descriptionColorText: string;
        descriptionColorTextDisabled: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        colorText: string;
        colorTextHover: string;
        colorTextActive: string;
        colorTextDisabled: string;
        colorTextError: string;
        colorTextErrorActive: string;
        colorTextErrorDisabled: string;
        colorTextErrorHover: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundErrorActive: string;
        colorBackgroundErrorHover: string;
        iconNumberTypographyFontFamily: string;
        iconNumberTypographyFontSize: string | number;
        iconNumberTypographyLineHeight: string | number;
        iconNumberTypographyLetterSpacing: string | number;
        iconNumberTypographyFontWeight: number;
        labelTypographyFontFamily: string;
        labelTypographyFontSize: string | number;
        labelTypographyLineHeight: string | number;
        labelTypographyLetterSpacing: string | number;
        labelTypographyFontWeight: number;
        descriptionTypographyFontFamily: string;
        descriptionTypographyFontSize: string | number;
        descriptionTypographyLineHeight: string | number;
        descriptionTypographyLetterSpacing: string | number;
        descriptionTypographyFontWeight: number;
    };
    switch: {
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundDisabled: string;
        colorBorderFocus: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBackgroundChecked: string;
        colorBackgroundCheckedHover: string;
        colorBackgroundCheckedActive: string;
        thumbColorBackground: string;
        thumbColorBackgroundDisabled: string;
        shapeBorderRadiusTopLeft: string | number;
        shapeBorderRadiusTopRight: string | number;
        shapeBorderRadiusBottomLeft: string | number;
        shapeBorderRadiusBottomRight: string | number;
        thumbShapeBorderRadiusTopLeft: string | number;
        thumbShapeBorderRadiusTopRight: string | number;
        thumbShapeBorderRadiusBottomLeft: string | number;
        thumbShapeBorderRadiusBottomRight: string | number;
    };
    table: {
        colorText: string;
        headerCellWidthBorder: number;
        bodyCellWidthBorder: number;
        colorBorder: string;
        cellElevationShadowFixedStart: string;
        cellElevationShadowFixedEnd: string;
        headerColorBackground: string;
        headerWidthBorder: number;
        headerColorBorder: string;
        headerCellElevationShadowFixed: string;
        headerCellColorBackgroundSortableHover: string;
        sorterColorBackground: string;
        sorterColorBackgroundHover: string;
        sorterUpArrowColorBackgroundAscHover: string;
        sorterUpArrowColorBackgroundDesc: string;
        sorterDownArrowColorBackgroundAsc: string;
        sorterUpDownColorBackgroundDescHover: string;
        treeExpandButtonColorText: string;
        treeExpandButtonWidthShadowFocus: number;
        treeExpandButtonColorShadowFocus: string;
        treeExpandButtonColorBackgroundHover: string;
        expandButtonColorText: string;
        expandButtonWidthShadowFocus: number;
        expandButtonColorShadowFocus: string;
        expandButtonColorBackgroundHover: string;
        bodyRowColorBackgroundHasFixedColumnsHover: string;
        bodyRowColorBackgroundHover: string;
        bodyRowColorBackgroundHasFixedColumnsStripe: string;
        bodyRowColorBackgroundStripe: string;
        bodyCellFixedColorBackground: string;
        bodyCellFixedColorBackgroundHover: string;
        bodyCellFixedColorBackgroundStripe: string;
        paginationColorText: string;
        paginationWidthBorder: number;
        paginationColorBorderBottom: string;
        paginationColorBorderTop: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        headerTypographyFontFamily: string;
        headerTypographyFontWeight: number;
        headerTypographyFontSize: string | number;
        headerTypographyLineHeight: string | number;
        headerTypographyLetterSpacing: string | number;
        bodyTypographyFontFamily: string;
        bodyTypographyFontWeight: number;
        bodyTypographyFontSize: string | number;
        bodyTypographyLineHeight: string | number;
        bodyTypographyLetterSpacing: string | number;
        paginationTypographyFontFamily: string;
        paginationTypographyFontWeight: number;
        paginationTypographyFontSize: string | number;
        paginationTypographyLineHeight: string | number;
        paginationTypographyLetterSpacing: string | number;
    };
    tabs: {
        rootColorText: string;
        tabColorText: string;
        tabColorTextDisabled: string;
        tabColorTextHover: string;
        tabColorBackgroundHover: string;
        tabWidthShadowFocus: number;
        tabColorShadowFocus: string;
        tabColorTextSelected: string;
        tabIndicatorColorBackgroundSelected: string;
        contentWidthShadow: number;
        contentColorShadow: string;
        tabWidthShadowFilledSelected: number;
        tabColorShadowFilledSelected: string;
        tabColorShadowFilledFocus: string;
        tabColorBackgroundFilledSelected: string;
        contentColorBackgroundFilled: string;
        contentWidthBorderFilled: number;
        contentColorBorderFilled: string;
        tabShapeBorderRadiusTopLeftHorizontal: number;
        tabShapeBorderRadiusTopRightHorizontal: number;
        tabShapeBorderRadiusBottomLeftHorizontal: number;
        tabShapeBorderRadiusBottomRightHorizontal: number;
        tabShapeBorderRadiusTopLeftVertical: number;
        tabShapeBorderRadiusTopRightVertical: number;
        tabShapeBorderRadiusBottomLeftVertical: number;
        tabShapeBorderRadiusBottomRightVertical: number;
        tabShapeBorderRadiusTopLeftFilledVertical: number;
        tabShapeBorderRadiusTopRightFilledVertical: number;
        tabShapeBorderRadiusBottomLeftFilledVertical: number;
        tabShapeBorderRadiusBottomRightFilledVertical: number;
        tabShapeBorderRadiusTopLeftFilledHorizontal: number;
        tabShapeBorderRadiusTopRightFilledHorizontal: number;
        tabShapeBorderRadiusBottomLeftFilledHorizontal: number;
        tabShapeBorderRadiusBottomRightFilledHorizontal: number;
        contentShapeBorderRadiusTopLeftFilledVertical: number;
        contentShapeBorderRadiusTopRightFilledVertical: number;
        contentShapeBorderRadiusBottomLeftFilledVertical: number;
        contentShapeBorderRadiusBottomRightFilledVertical: number;
        contentShapeBorderRadiusTopLeftFilledHorizontal: number;
        contentShapeBorderRadiusTopRightFilledHorizontal: number;
        contentShapeBorderRadiusBottomLeftFilledHorizontal: number;
        contentShapeBorderRadiusBottomRightFilledHorizontal: number;
        tabTypographyFontFamily: string;
        tabTypographyFontWeight: number;
        tabTypographyFontSize: string | number;
        tabTypographyLineHeight: string | number;
        tabTypographyLetterSpacing: string | number;
    };
    tag: {
        colorTextLite: string;
        colorBorderLite: string;
        colorBackgroundLiteFocus: string;
        colorBackgroundLiteHover: string;
        colorTextLiteDisabled: string;
        colorBorderLiteDisabled: string;
        colorTextLiteDragged: string;
        colorBackgroundLiteDragged: string;
        colorBorderLiteDragged: string;
        closeButtonColorBackgroundLiteHover: string;
        closeButtonColorBackgroundLiteActive: string;
        closeButtonColorBackgroundLiteSelectedHover: string;
        closeButtonColorBackgroundLiteSelectedActive: string;
        colorBackgroundLiteActive: string;
        colorBackgroundLiteSelected: string;
        colorTextLiteSelectedDisabled: string;
        colorBackgroundLiteSelectedDisabled: string;
        colorBackgroundLiteSelectedDragged: string;
        colorTextSecondary: string;
        colorBorderSecondary: string;
        colorTextSecondaryFocus: string;
        colorBackgroundSecondaryFocus: string;
        colorTextSecondaryHover: string;
        colorBackgroundSecondaryHover: string;
        colorTextSecondaryActive: string;
        colorBackgroundSecondaryActive: string;
        closeButtonColorBackgroundSecondaryHover: string;
        closeButtonColorBackgroundSecondaryActive: string;
        closeButtonColorBackgroundSecondarySelectedHover: string;
        closeButtonColorBackgroundSecondarySelectedActive: string;
        colorTextSecondaryDisabled: string;
        colorBorderSecondaryDisabled: string;
        colorBorderSecondaryDragged: string;
        colorTextSecondaryDragged: string;
        colorBackgroundSecondaryDragged: string;
        colorTextSecondarySelected: string;
        colorTextSecondarySelectedDisabled: string;
        colorBackgroundSecondarySelected: string;
        colorBackgroundSecondarySelectedDisabled: string;
        colorBackgroundSecondarySelectedDragged: string;
        colorTextPrimary: string;
        colorBorderPrimary: string;
        colorTextPrimaryFocus: string;
        colorBackgroundPrimaryFocus: string;
        colorTextPrimaryHover: string;
        colorBackgroundPrimaryHover: string;
        colorTextPrimaryActive: string;
        colorBackgroundPrimaryActive: string;
        closeButtonColorBackgroundPrimaryHover: string;
        closeButtonColorBackgroundPrimaryActive: string;
        closeButtonColorBackgroundPrimarySelectedHover: string;
        closeButtonColorBackgroundPrimarySelectedActive: string;
        colorTextPrimaryDisabled: string;
        colorBorderPrimaryDisabled: string;
        colorBorderPrimaryDragged: string;
        colorTextPrimaryDragged: string;
        colorBackgroundPrimaryDragged: string;
        colorTextPrimarySelected: string;
        colorTextPrimarySelectedDisabled: string;
        colorBackgroundPrimarySelected: string;
        colorBackgroundPrimarySelectedDisabled: string;
        colorBackgroundPrimarySelectedDragged: string;
        colorTextRed: string;
        colorBackgroundRed: string;
        colorTextYellow: string;
        colorBackgroundYellow: string;
        colorTextGreen: string;
        colorBackgroundGreen: string;
        colorTextAzure: string;
        colorBackgroundAzure: string;
        colorTextBlue: string;
        colorBackgroundBlue: string;
        colorTextViolet: string;
        colorBackgroundViolet: string;
        colorTextGray: string;
        colorBackgroundGray: string;
        widthBorder: number;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBorderFocus: string;
        elevationShadowDragged: string;
        shapeBorderRadiusTopLeft: string | number;
        shapeBorderRadiusTopRight: string | number;
        shapeBorderRadiusBottomLeft: string | number;
        shapeBorderRadiusBottomRight: string | number;
        closeButtonShapeBorderRadiusTopLeft: string | number;
        closeButtonShapeBorderRadiusTopRight: string | number;
        closeButtonShapeBorderRadiusBottomLeft: string | number;
        closeButtonShapeBorderRadiusBottomRight: string | number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeXs: string;
        typographyLineHeightXs: string;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    tagInput: {
        containerWidthBorder: number;
        containerColorBorder: string;
        containerColorBorderDisabled: string;
        containerColorBackgroundHover: string;
        containerWidthShadowFocus: number;
        containerColorBorderFocus: string;
        tagColorText: string;
        tagColorTextDisabled: string;
        inputColorText: string;
        inputPlaceholderColorText: string;
        inputColorBackground: string;
        iconColorText: string;
        iconColorTextDisabled: string;
        iconColorTextFocusEmpty: string;
        shapeBorderRadiusTopLeft: string | number;
        shapeBorderRadiusTopRight: string | number;
        shapeBorderRadiusBottomLeft: string | number;
        shapeBorderRadiusBottomRight: string | number;
        shapeBorderRadiusTopLeftFocused: number;
        shapeBorderRadiusTopRightFocused: number;
        shapeBorderRadiusBottomLeftFocused: number;
        shapeBorderRadiusBottomRightFocused: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeXs: string;
        typographyLineHeightXs: string;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    textarea: {
        colorBackground: string;
        colorBackgroundDisabled: string;
        colorBackgroundError: string;
        widthBorder: number;
        colorBorder: string;
        colorBorderDisabled: string;
        colorBorderHover: string;
        colorBorderError: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorText: string;
        colorTextDisabled: string;
        placeholderColorText: string;
        placeholderColorTextDisabled: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeLg: string;
        typographyLineHeightLg: string;
        typographyFontSizeMd: string;
        typographyLineHeightMd: string;
        typographyFontSizeSm: string;
        typographyLineHeightSm: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
    };
    timeView: {
        timeButtonTypographyFontSize: string;
        timeButtonTypographyFontFamily: string;
        timeButtonTypographyFontWeight: string;
        timeButtonTypographyLineHeight: string;
        timeButtonTypographyLetterSpacing: string;
        timeButtonColorBackgroundHover: string;
        timeButtonColorTextDisabled: string;
        timeButtonColorShadowFocus: string;
        timeButtonColorBackgroundActive: string;
        timeButtonColorBackgroundSelectedHover: string;
        timeButtonColorBackgroundSelectedActive: string;
        timeButtonColorBorderFocus: string;
        dividerColorBorder: string;
    };
    tooltip: {
        colorBackground: string;
        colorText: string;
        widthBorder: number;
        colorBorder: string;
        indicatorColorBackground: string;
        arrowColorBorder: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        typographyFontFamily: string;
        typographyFontSize: string | number;
        typographyLineHeight: string | number;
        typographyLetterSpacing: string | number;
        typographyFontWeight: number;
    };
    tree: {
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftXs: number;
        shapeBorderRadiusTopRightXs: number;
        shapeBorderRadiusBottomLeftXs: number;
        shapeBorderRadiusBottomRightXs: number;
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundDisabled: string;
        colorText: string;
        colorTextHover: string;
        colorTextActive: string;
        colorTextDisabled: string;
        colorBackgroundSelected: string;
        colorBackgroundSelectedHover: string;
        colorBackgroundSelectedActive: string;
        colorBackgroundSelectedDisabled: string;
        colorTextSelected: string;
        colorTextSelectedHover: string;
        colorTextSelectedActive: string;
        colorTextSelectedDisabled: string;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeMd: string | number;
        typographyLineHeightMd: string | number;
        typographyFontSizeSm: string | number;
        typographyLineHeightSm: string | number;
        typographyFontSizeXs: string | number;
        typographyLineHeightXs: string | number;
        expandIconColor: string;
        expandIconColorHover: string;
        expandIconColorActive: string;
        expandIconColorDisabled: string;
        expandIconColorSelected: string;
        expandIconColorSelectedHover: string;
        expandIconColorSelectedActive: string;
        expandIconColorSelectedDisabled: string;
        iconColor: string;
        iconColorHover: string;
        iconColorActive: string;
        iconColorDisabled: string;
        iconColorSelected: string;
        iconColorSelectedHover: string;
        iconColorSelectedActive: string;
        iconColorSelectedDisabled: string;
        trailsColor: string;
        trailsBorderRadius: number;
        selectedIndicatorColorBackground: string;
        selectedIndicatorColorBackgroundHover: string;
        selectedIndicatorColorBackgroundActive: string;
        selectedIndicatorColorBackgroundDisabled: string;
        selectedIndicatorShapeBorderRadiusTopLeft: string;
        selectedIndicatorShapeBorderRadiusTopRight: number;
        selectedIndicatorShapeBorderRadiusBottomLeft: string;
        selectedIndicatorShapeBorderRadiusBottomRight: number;
        widthShadowFocus: number;
        colorShadowFocus: string;
        dropTargetWidthBorder: number;
        dropTargetColorBorder: string;
        dropTargetParentWidthBorder: number;
        dropTargetParentColorBorder: string;
        draggableColorBackground: string;
        dropBetweenIndicatorColorBorder: string;
    };
    underlay: {
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
        widthBorder: number;
        colorBackgroundOutlined: string;
        colorBorderOutlinedError: string;
        colorBorderOutlinedWarning: string;
        colorBorderOutlinedSuccess: string;
        colorBorderOutlinedInfo: string;
        colorBorderOutlinedNeutral: string;
        colorBackgroundFilledError: string;
        colorBackgroundFilledWarning: string;
        colorBackgroundFilledSuccess: string;
        colorBackgroundFilledInfo: string;
        colorBackgroundFilledNeutral: string;
        colorBorderFilledError: string;
        colorBorderFilledWarning: string;
        colorBorderFilledSuccess: string;
        colorBorderFilledInfo: string;
        colorBorderFilledNeutral: string;
    };
    closeButton: {
        colorText: string;
        colorTextHover: string;
        colorTextActive: string;
        colorTextDisabled: string;
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        widthShadowFocus: number;
        colorShadowFocus: string;
        colorBackgroundDisabled: string;
        shapeBorderRadiusTopLeft: number;
        shapeBorderRadiusTopRight: number;
        shapeBorderRadiusBottomLeft: number;
        shapeBorderRadiusBottomRight: number;
    };
    pagination: {
        colorText: string;
        colorTextHover: string;
        colorTextActive: string;
        colorTextDisabled: string;
        colorTextSelected: string;
        colorTextSelectedHover: string;
        colorTextSelectedActive: string;
        colorTextSelectedDisabled: string;
        colorBackground: string;
        colorBackgroundHover: string;
        colorBackgroundActive: string;
        colorBackgroundDisabled: string;
        colorBackgroundSelected: string;
        colorBackgroundSelectedHover: string;
        colorBackgroundSelectedActive: string;
        colorBackgroundSelectedDisabled: string;
        widthBorder: number;
        colorBorder: string;
        colorBorderHover: string;
        colorBorderActive: string;
        colorBorderDisabled: string;
        colorBorderSelected: string;
        colorBorderSelectedHover: string;
        colorBorderSelectedActive: string;
        colorBorderSelectedDisabled: string;
        overflowColorText: string;
        overflowColorTextHover: string;
        overflowColorTextActive: string;
        overflowColorTextDisabled: string;
        overflowColorBackground: string;
        overflowColorBackgroundHover: string;
        overflowColorBackgroundActive: string;
        overflowColorBackgroundDisabled: string;
        overflowColorBorder: string;
        overflowColorBorderHover: string;
        overflowColorBorderActive: string;
        overflowColorBorderDisabled: string;
        selectedIndicatorColorBackground: string;
        selectedIndicatorColorBackgroundDisabled: string;
        selectedIndicatorShapeBorderRadiusTopLeft: number;
        selectedIndicatorShapeBorderRadiusTopRight: number;
        selectedIndicatorShapeBorderRadiusBottomLeft: number;
        selectedIndicatorShapeBorderRadiusBottomRight: number;
        widthShadowFocus: number;
        colorShadowFocus: string;
        shapeBorderRadiusTopLeftSmall: number;
        shapeBorderRadiusTopRightSmall: number;
        shapeBorderRadiusBottomLeftSmall: number;
        shapeBorderRadiusBottomRightSmall: number;
        shapeBorderRadiusTopLeftMedium: number;
        shapeBorderRadiusTopRightMedium: number;
        shapeBorderRadiusBottomLeftMedium: number;
        shapeBorderRadiusBottomRightMedium: number;
        shapeBorderRadiusTopLeftLarge: number;
        shapeBorderRadiusTopRightLarge: number;
        shapeBorderRadiusBottomLeftLarge: number;
        shapeBorderRadiusBottomRightLarge: number;
        typographyFontFamily: string;
        typographyFontWeight: number;
        typographyLetterSpacing: string | number;
        typographyFontSizeSmall: string | number;
        typographyLineHeightSmall: string | number;
        typographyFontSizeMedium: string | number;
        typographyLineHeightMedium: string | number;
        typographyFontSizeLarge: string | number;
        typographyLineHeightLarge: string | number;
    };
    skeleton: {
        colorBackground: string;
        shapeBorderRadiusTopLeftNone: number;
        shapeBorderRadiusTopRightNone: number;
        shapeBorderRadiusBottomLeftNone: number;
        shapeBorderRadiusBottomRightNone: number;
        shapeBorderRadiusTopLeftSm: number;
        shapeBorderRadiusTopRightSm: number;
        shapeBorderRadiusBottomLeftSm: number;
        shapeBorderRadiusBottomRightSm: number;
        shapeBorderRadiusTopLeftMd: number;
        shapeBorderRadiusTopRightMd: number;
        shapeBorderRadiusBottomLeftMd: number;
        shapeBorderRadiusBottomRightMd: number;
        shapeBorderRadiusTopLeftLg: number;
        shapeBorderRadiusTopRightLg: number;
        shapeBorderRadiusBottomLeftLg: number;
        shapeBorderRadiusBottomRightLg: number;
        shapeBorderRadiusTopLeftXl: number;
        shapeBorderRadiusTopRightXl: number;
        shapeBorderRadiusBottomLeftXl: number;
        shapeBorderRadiusBottomRightXl: number;
        shapeBorderRadiusTopLeftCircle: number;
        shapeBorderRadiusTopRightCircle: number;
        shapeBorderRadiusBottomLeftCircle: number;
        shapeBorderRadiusBottomRightCircle: number;
    };
};
declare type CompLayer = ReturnType<typeof createComp>;
declare type Comp = {
    /**
     *
     * @inner
     */
    backwardCompatibilityMode?: boolean;
} & {
    [key in keyof CompLayer]: CompLayer[key] & {
        /**
         *
         * @inner
         */
        backwardCompatibilityMode?: boolean;
    };
};

interface Theme {
    /**
     *
     * @inner
     */
    ref: Ref;
    /**
     *
     * @inner
     */
    sys: Sys;
    /**
     *
     * @inner
     */
    comp: Comp;
    /**
     *
     * @inner
     */
    shape: Shape;
    /**
     *
     * @inner
     */
    zIndex: ZIndex;
    /**
     *
     * @inner
     *
     * @deprecated Будет удалено, используйте comp и sys.
     */
    colors: Colors;
    /**
     * @inner
     *
     * @deprecated Будет удалено, используйте comp и sys.
     */
    colourway: Colourway;
    /**
     *
     * @inner
     */
    palette: Palette;
    /**
     *
     * @inner
     */
    typography: Typography;
    /**
     *
     * @inner
     */
    breakpoints: Breakpoints;
}
/**
 * Пользователь может явно переопределить все или некоторые токены.
 */
declare type ThemeOptions = DeepPartial<Theme>;
declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

declare global {
  namespace Jss {
    /** You can use the global `Jss.Theme` interface to define a project-wide default theme. */
    export interface Theme {}
  }
}

/**
 * Декларация глобальной переменной для задания дефолтной темы без использования ThemeProvider на клиенте.
 */
declare global {
    namespace globalThis {
        var DEFAULT_UIK_THEME: ThemeOptions;
    }
}

declare type ComponentPropsWithRefFix<T extends React.ElementType> = Omit<ComponentPropsWithRef<T>, 'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'> & {
    /**
     *
     */
    placeholder?: string;
};
declare type ComponentPropsWithoutRefFix<T extends React.ElementType> = Omit<ComponentPropsWithoutRef<T>, 'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'> & {
    /**
     *
     */
    placeholder?: string;
};
declare type ComponentPropsWithAttributes<T> = T & {
    [key: string]: unknown;
};

declare type Classes$u = {
    /** Стиль, применяемый к кнопке очистки поля  */
    clearButton?: string;
    /** Стиль, применяемый с `disabled='true'` */
    disabled?: string;
    /** Стиль, применяемый к элементу с `size='sm` */
    small?: string;
};
interface ClearButtonProps {
    /**
     * Список классов.
     */
    classes?: Classes$u;
    /**
     * Кнопка заблокирована для нажатия и фокусировки.
     */
    disabled?: boolean;
    /**
     * Размер кнопки.
     */
    size?: ElementSizeType;
    /**
     * Свойства для div контейнера кнопки.
     */
    innerProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
    /**
     * Иконка для кнопки очистки.
     */
    clearIcon?: React$1.ReactNode;
}

interface AccordionProps extends ComponentPropsWithRefFix<'div'> {
}

declare type AccordionIconProps = Omit<AccordionItemProps, 'components'>;

declare type AccordionComponents = {
    Icon: React.ComponentType<AccordionIconProps>;
};
declare type AccordionComponentsConfig = Partial<AccordionComponents>;

declare type Classes$t = {
    /** Стиль, применяемый к основному элементу */
    root?: string;
    /** Стиль, применяемый к раскрытому элементу */
    expanded?: string;
    /** Стиль, применяемый к заголовку элемента */
    header?: string;
    /** Стиль, применяемый к тексту в заголовке элемента */
    headerText?: string;
    /** Стиль, применяемый к иконке в заголовке элемента */
    headerIcon?: string;
    /** Стиль, применяемый к содержимому элемента */
    content?: string;
};

interface HeaderProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React$1.RefCallback<HTMLButtonElement>;
}
interface ContentProps extends ComponentPropsWithRefFix<'div'> {
    ref?: React$1.RefCallback<HTMLDivElement>;
}
interface AccordionItemProps extends Omit<ComponentPropsWithRefFix<'div'>, 'onClick'> {
    /**
     * JSS-классы для стилизации.
     */
    classes?: Partial<Classes$t>;
    /**
     * Состояние активности элемента
     */
    disabled?: boolean;
    /**
     * Заголовок аккордеона
     */
    header: React$1.ReactNode;
    /**
     * Состояние элемента "скрыт"/"раскрыт"
     */
    expanded?: boolean;
    /**
     * Набор пользовательских свойств для заголовка элемента
     */
    headerProps?: HeaderProps;
    /**
     * Набор пользовательских свойств для контента элемента
     */
    contentProps?: ContentProps;
    /**
     * Обработчик события клика по кнопке
     */
    onClick?(e: React$1.MouseEvent<HTMLButtonElement>): void;
    /**
     * Свойство для переопределения элементов AccordionItem
     */
    components?: AccordionComponentsConfig;
}

interface IAccordionProps extends AccordionProps {
    fullWidth?: boolean;
    variant?: 'view' | 'edit';
}
interface IAccordionItemProps extends Omit<AccordionItemProps, 'onChange'> {
    onChange?: (expanded: boolean) => void;
}
declare const Accordion: (props: IAccordionProps) => react_jsx_runtime.JSX.Element;
declare const AccordionItem: (props: IAccordionItemProps) => react_jsx_runtime.JSX.Element;

type SvgIconProperties = React__default.SVGProps<SVGSVGElement> & {
    children?: React__default.ReactNode;
};
type SvgIconComponent = (properties: SvgIconProperties) => React__default.ReactElement;
declare enum EIconName {
    arrowDownSmall = "arrowDownSmall",
    arrowLeftSmall = "arrowLeftSmall",
    arrowRightSmall = "arrowRightSmall",
    arrowUpSmall = "arrowUpSmall",
    arrowDown = "arrowDown",
    arrowLeft = "arrowLeft",
    arrowRight = "arrowRight",
    arrowUp = "arrowUp",
    arrowUpTriangle = "arrowUpTriangle",
    arrowDownTriangle = "arrowDownTriangle",
    arrowUpDoubleTriangle = "arrowUpDoubleTriangle",
    arrowUpDouble = "arrowUpDouble",
    arrowDownDouble = "arrowDownDouble",
    arrowRightDouble = "arrowRightDouble",
    arrowLeftDouble = "arrowLeftDouble",
    chevronFillDown = "chevronFillDown",
    chevronFillLeft = "chevronFillLeft",
    chevronFillRight = "chevronFillRight",
    chevronFillUp = "chevronFillUp",
    down = "down",
    downSmall = "downSmall",
    next = "next",
    nextLarge = "nextLarge",
    previousLarge = "previousLarge",
    previous = "previous",
    up = "up",
    upSmall = "upSmall",
    ruble = "ruble",
    acts = "acts",
    analytics = "analytics",
    home = "home",
    limits = "limits",
    measure = "measure",
    risk = "risk",
    incident = "incident",
    knowledge = "knowledge",
    admin = "admin",
    monitoring = "monitoring",
    limitCampaign = "limitCampaign",
    contragents = "contragents",
    sidebarAi = "sidebarAi",
    analitic = "analitic",
    archiveBox = "archiveBox",
    arrBorderCollapse = "arrBorderCollapse",
    arrBorderDown = "arrBorderDown",
    arrBorderExpand = "arrBorderExpand",
    arrBorderLeft = "arrBorderLeft",
    arrBorderRight = "arrBorderRight",
    arrBorderUp = "arrBorderUp",
    arrowAction = "arrowAction",
    assistant = "assistant",
    attach = "attach",
    attention = "attention",
    banknote = "banknote",
    benchmark = "benchmark",
    bookmark = "bookmark",
    bookmarkFill = "bookmarkFill",
    bookmarks = "bookmarks",
    bookmarksFill = "bookmarksFill",
    box = "box",
    budgetDollar = "budgetDollar",
    budgetRubl = "budgetRubl",
    bulb = "bulb",
    burgerMenu = "burgerMenu",
    business = "business",
    calendar = "calendar",
    calendarAdd = "calendarAdd",
    cancel = "cancel",
    chart = "chart",
    check = "check",
    city = "city",
    clock = "clock",
    clone = "clone",
    codepen = "codepen",
    codesandbox = "codesandbox",
    collapsed = "collapsed",
    columns = "columns",
    comment = "comment",
    compass = "compass",
    confirm = "confirm",
    converting = "converting",
    convertCurrency = "convertCurrency",
    copy = "copy",
    cross = "cross",
    crossBig = "crossBig",
    cut = "cut",
    dashboard = "dashboard",
    delivery = "delivery",
    desktop = "desktop",
    detail = "detail",
    diamond = "diamond",
    direct = "direct",
    draft = "draft",
    drag = "drag",
    dollar = "dollar",
    dots = "dots",
    downloadArrow = "downloadArrow",
    edit = "edit",
    equally = "equally",
    expanded = "expanded",
    external = "external",
    eyeOff = "eyeOff",
    eyeOn = "eyeOn",
    feedback = "feedback",
    fileEdit = "fileEdit",
    fileTransfer = "fileTransfer",
    fill = "fill",
    filter = "filter",
    filterLine = "filterLine",
    filterSort = "filterSort",
    fire = "fire",
    flag = "flag",
    forward = "forward",
    folderNoFill = "folderNoFill",
    fullScreen = "fullScreen",
    generate = "generate",
    graph = "graph",
    graphSquare = "graphSquare",
    hashtag = "hashtag",
    history = "history",
    kebabMenu = "kebabMenu",
    key = "key",
    laptop = "laptop",
    lightning = "lightning",
    lightningRounded = "lightningRounded",
    like = "like",
    likeFill = "likeFill",
    link = "link",
    list = "list",
    listAdd = "listAdd",
    listOff = "listOff",
    lock = "lock",
    mail = "mail",
    mailRss = "mailRss",
    mapPin = "mapPin",
    meatballMenu = "meatballMenu",
    message = "message",
    messageOff = "messageOff",
    methodology = "methodology",
    micOn = "micOn",
    micOff = "micOff",
    minus = "minus",
    minimumScreen = "minimumScreen",
    moonDark = "moonDark",
    net = "net",
    news = "news",
    notification = "notification",
    orm = "orm",
    normViolet = "normViolet",
    normOutlined = "normOutlined",
    passport = "passport",
    pause = "pause",
    penEdit = "penEdit",
    percent = "percent",
    pin = "pin",
    pinOff = "pinOff",
    phone = "phone",
    photo = "photo",
    play = "play",
    plane = "plane",
    plus = "plus",
    print = "print",
    prize = "prize",
    sidebarProducts = "sidebarProducts",
    process = "process",
    product = "product",
    question = "question",
    range = "range",
    rangeSetting = "rangeSetting",
    rating = "rating",
    ratingFill = "ratingFill",
    ratingOff = "ratingOff",
    refresh = "refresh",
    rhomb = "rhomb",
    rocket = "rocket",
    row = "row",
    save = "save",
    search = "search",
    searchMonitoring = "searchMonitoring",
    secur = "secur",
    securCheck = "securCheck",
    secure = "secure",
    send = "send",
    server = "server",
    settings = "settings",
    signIn = "signIn",
    signOut = "signOut",
    shop = "shop",
    smileHappy = "smileHappy",
    smileSad = "smileSad",
    sortAscending = "sortAscending",
    sortDefault = "sortDefault",
    sortDescending = "sortDescending",
    sortHoriz = "sortHoriz",
    sortVert = "sortVert",
    stamp = "stamp",
    sunLight = "sunLight",
    support = "support",
    tag = "tag",
    tagNofill = "tagNofill",
    tarif = "tarif",
    tarifGraph = "tarifGraph",
    task = "task",
    taskCheck = "taskCheck",
    taskClose = "taskClose",
    taskGraph = "taskGraph",
    taskSearch = "taskSearch",
    taskList = "taskList",
    time = "time",
    thumpsDown = "thumpsDown",
    thumpsUp = "thumpsUp",
    trash = "trash",
    user = "user",
    userAdd = "userAdd",
    users = "users",
    update = "update",
    upload = "upload",
    uploadFile = "uploadFile",
    video = "video",
    viewCard = "viewCard",
    viewCompact = "viewCompact",
    warning = "warning",
    wallet = "wallet",
    world = "world",
    userSwap = "userSwap",
    file = "file",
    fileAdd = "fileAdd",
    archive = "archive",
    excel = "excel",
    image = "image",
    pdf = "pdf",
    powerPoint = "powerPoint",
    word = "word",
    folder = "folder",
    archiveFill = "archiveFill",
    excelFill = "excelFill",
    imageFill = "imageFill",
    pdfFill = "pdfFill",
    powerPointFill = "powerPointFill",
    wordFill = "wordFill",
    assistantGradient = "assistantGradient",
    assistantStatus = "assistantStatus",
    error = "error",
    errorRounded = "errorRounded",
    generateGradient = "generateGradient",
    info = "info",
    infoOutlined = "infoOutlined",
    infoRounded = "infoRounded",
    infoSquare = "infoSquare",
    success = "success",
    track = "track",
    thinking = "thinking",
    questionFill = "questionFill",
    warningRounded = "warningRounded",
    tagStatus = "tagStatus",
    upStatus = "upStatus",
    downStatus = "downStatus",
    priorityStatus = "priorityStatus",
    bankStatus = "bankStatus",
    priorityPositive = "priorityPositive",
    priorityNegative = "priorityNegative",
    incidentRounded = "incidentRounded",
    riskRounded = "riskRounded",
    unknownRounded = "unknownRounded",
    systemMeasure = "systemMeasure",
    suorPlan = "suorPlan"
}
declare const iconMap: {
    acts: SvgIconComponent;
    analytics: SvgIconComponent;
    archive: SvgIconComponent;
    arrowAction: SvgIconComponent;
    arrowDown: SvgIconComponent;
    arrowLeft: SvgIconComponent;
    arrowRight: SvgIconComponent;
    arrowUp: SvgIconComponent;
    arrowDownSmall: SvgIconComponent;
    arrowLeftSmall: SvgIconComponent;
    arrowRightSmall: SvgIconComponent;
    arrowUpSmall: SvgIconComponent;
    arrowUpDoubleTriangle: SvgIconComponent;
    arrowUpTriangle: SvgIconComponent;
    arrowDownTriangle: SvgIconComponent;
    assistant: SvgIconComponent;
    assistantGradient: SvgIconComponent;
    assistantStatus: SvgIconComponent;
    box: SvgIconComponent;
    business: SvgIconComponent;
    calendar: SvgIconComponent;
    chevronFillDown: SvgIconComponent;
    chevronFillLeft: SvgIconComponent;
    chevronFillRight: SvgIconComponent;
    chevronFillUp: SvgIconComponent;
    check: SvgIconComponent;
    clock: SvgIconComponent;
    collapsed: SvgIconComponent;
    comment: SvgIconComponent;
    contragents: SvgIconComponent;
    copy: SvgIconComponent;
    cross: SvgIconComponent;
    dots: SvgIconComponent;
    down: SvgIconComponent;
    downSmall: SvgIconComponent;
    downloadArrow: SvgIconComponent;
    drag: SvgIconComponent;
    edit: SvgIconComponent;
    error: SvgIconComponent;
    errorRounded: SvgIconComponent;
    excel: SvgIconComponent;
    expanded: SvgIconComponent;
    eyeOn: SvgIconComponent;
    eyeOff: SvgIconComponent;
    file: SvgIconComponent;
    fileAdd: SvgIconComponent;
    fill: SvgIconComponent;
    filter: SvgIconComponent;
    fullScreen: SvgIconComponent;
    generate: SvgIconComponent;
    home: SvgIconComponent;
    image: SvgIconComponent;
    info: SvgIconComponent;
    incidentRounded: SvgIconComponent;
    riskRounded: SvgIconComponent;
    unknownRounded: SvgIconComponent;
    systemMeasure: SvgIconComponent;
    suorPlan: SvgIconComponent;
    infoOutlined: SvgIconComponent;
    infoRounded: SvgIconComponent;
    infoSquare: SvgIconComponent;
    kebabMenu: SvgIconComponent;
    limits: SvgIconComponent;
    list: SvgIconComponent;
    lock: SvgIconComponent;
    mapPin: SvgIconComponent;
    measure: SvgIconComponent;
    meatballMenu: SvgIconComponent;
    minimumScreen: SvgIconComponent;
    minus: SvgIconComponent;
    monitoring: SvgIconComponent;
    next: SvgIconComponent;
    nextLarge: SvgIconComponent;
    pdf: SvgIconComponent;
    phone: SvgIconComponent;
    plus: SvgIconComponent;
    powerPoint: SvgIconComponent;
    previous: SvgIconComponent;
    previousLarge: SvgIconComponent;
    priorityNegative: SvgIconComponent;
    priorityPositive: SvgIconComponent;
    question: SvgIconComponent;
    questionFill: SvgIconComponent;
    sidebarProducts: SvgIconComponent;
    range: SvgIconComponent;
    refresh: SvgIconComponent;
    rhomb: SvgIconComponent;
    risk: SvgIconComponent;
    ruble: SvgIconComponent;
    search: SvgIconComponent;
    secure: SvgIconComponent;
    settings: SvgIconComponent;
    sidebarAi: SvgIconComponent;
    signIn: SvgIconComponent;
    signOut: SvgIconComponent;
    success: SvgIconComponent;
    support: SvgIconComponent;
    tag: SvgIconComponent;
    tagStatus: SvgIconComponent;
    tarifGraph: SvgIconComponent;
    thumpsDown: SvgIconComponent;
    thumpsUp: SvgIconComponent;
    track: SvgIconComponent;
    trash: SvgIconComponent;
    uploadFile: SvgIconComponent;
    users: SvgIconComponent;
    warningRounded: SvgIconComponent;
    word: SvgIconComponent;
    folder: SvgIconComponent;
    wordFill: SvgIconComponent;
    excelFill: SvgIconComponent;
    pdfFill: SvgIconComponent;
    powerPointFill: SvgIconComponent;
    imageFill: SvgIconComponent;
    archiveFill: SvgIconComponent;
    incident: SvgIconComponent;
    knowledge: SvgIconComponent;
    admin: SvgIconComponent;
    thinking: SvgIconComponent;
    orm: SvgIconComponent;
    normViolet: SvgIconComponent;
    normOutlined: SvgIconComponent;
    video: SvgIconComponent;
    fileEdit: SvgIconComponent;
    fileTransfer: SvgIconComponent;
    draft: SvgIconComponent;
    listAdd: SvgIconComponent;
    listOff: SvgIconComponent;
    rangeSetting: SvgIconComponent;
    sortAscending: SvgIconComponent;
    sortDefault: SvgIconComponent;
    sortDescending: SvgIconComponent;
    burgerMenu: SvgIconComponent;
    filterLine: SvgIconComponent;
    filterSort: SvgIconComponent;
    fire: SvgIconComponent;
    upload: SvgIconComponent;
    link: SvgIconComponent;
    notification: SvgIconComponent;
    analitic: SvgIconComponent;
    external: SvgIconComponent;
    confirm: SvgIconComponent;
    cancel: SvgIconComponent;
    attention: SvgIconComponent;
    smileHappy: SvgIconComponent;
    smileSad: SvgIconComponent;
    world: SvgIconComponent;
    userSwap: SvgIconComponent;
    update: SvgIconComponent;
    history: SvgIconComponent;
    budgetRubl: SvgIconComponent;
    budgetDollar: SvgIconComponent;
    warning: SvgIconComponent;
    secur: SvgIconComponent;
    securCheck: SvgIconComponent;
    sunLight: SvgIconComponent;
    moonDark: SvgIconComponent;
    calendarAdd: SvgIconComponent;
    clone: SvgIconComponent;
    user: SvgIconComponent;
    userAdd: SvgIconComponent;
    searchMonitoring: SvgIconComponent;
    product: SvgIconComponent;
    chart: SvgIconComponent;
    converting: SvgIconComponent;
    crossBig: SvgIconComponent;
    equally: SvgIconComponent;
    graph: SvgIconComponent;
    graphSquare: SvgIconComponent;
    forward: SvgIconComponent;
    play: SvgIconComponent;
    pause: SvgIconComponent;
    row: SvgIconComponent;
    columns: SvgIconComponent;
    viewCard: SvgIconComponent;
    viewCompact: SvgIconComponent;
    sortVert: SvgIconComponent;
    sortHoriz: SvgIconComponent;
    arrBorderCollapse: SvgIconComponent;
    arrBorderDown: SvgIconComponent;
    arrBorderExpand: SvgIconComponent;
    arrBorderLeft: SvgIconComponent;
    arrBorderRight: SvgIconComponent;
    arrBorderUp: SvgIconComponent;
    pin: SvgIconComponent;
    pinOff: SvgIconComponent;
    message: SvgIconComponent;
    messageOff: SvgIconComponent;
    micOn: SvgIconComponent;
    micOff: SvgIconComponent;
    generateGradient: SvgIconComponent;
    bookmark: SvgIconComponent;
    bookmarkFill: SvgIconComponent;
    bookmarks: SvgIconComponent;
    bookmarksFill: SvgIconComponent;
    like: SvgIconComponent;
    likeFill: SvgIconComponent;
    rating: SvgIconComponent;
    ratingFill: SvgIconComponent;
    ratingOff: SvgIconComponent;
    convertCurrency: SvgIconComponent;
    photo: SvgIconComponent;
    desktop: SvgIconComponent;
    laptop: SvgIconComponent;
    lightning: SvgIconComponent;
    lightningRounded: SvgIconComponent;
    dashboard: SvgIconComponent;
    banknote: SvgIconComponent;
    archiveBox: SvgIconComponent;
    methodology: SvgIconComponent;
    mail: SvgIconComponent;
    mailRss: SvgIconComponent;
    task: SvgIconComponent;
    taskCheck: SvgIconComponent;
    taskList: SvgIconComponent;
    taskClose: SvgIconComponent;
    taskGraph: SvgIconComponent;
    taskSearch: SvgIconComponent;
    percent: SvgIconComponent;
    tarif: SvgIconComponent;
    codesandbox: SvgIconComponent;
    codepen: SvgIconComponent;
    process: SvgIconComponent;
    direct: SvgIconComponent;
    net: SvgIconComponent;
    cut: SvgIconComponent;
    shop: SvgIconComponent;
    delivery: SvgIconComponent;
    plane: SvgIconComponent;
    rocket: SvgIconComponent;
    city: SvgIconComponent;
    compass: SvgIconComponent;
    diamond: SvgIconComponent;
    server: SvgIconComponent;
    passport: SvgIconComponent;
    prize: SvgIconComponent;
    wallet: SvgIconComponent;
    attach: SvgIconComponent;
    send: SvgIconComponent;
    print: SvgIconComponent;
    detail: SvgIconComponent;
    stamp: SvgIconComponent;
    feedback: SvgIconComponent;
    save: SvgIconComponent;
    penEdit: SvgIconComponent;
    hashtag: SvgIconComponent;
    tagNofill: SvgIconComponent;
    bulb: SvgIconComponent;
    time: SvgIconComponent;
    benchmark: SvgIconComponent;
    news: SvgIconComponent;
    dollar: SvgIconComponent;
    key: SvgIconComponent;
    flag: SvgIconComponent;
    arrowUpDouble: SvgIconComponent;
    arrowDownDouble: SvgIconComponent;
    arrowLeftDouble: SvgIconComponent;
    arrowRightDouble: SvgIconComponent;
    folderNoFill: SvgIconComponent;
    limitCampaign: SvgIconComponent;
    up: SvgIconComponent;
    upSmall: SvgIconComponent;
    upStatus: SvgIconComponent;
    downStatus: SvgIconComponent;
    priorityStatus: SvgIconComponent;
    bankStatus: SvgIconComponent;
};

type TButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'ghost' | 'ellipse' | 'function' | 'ai';
type TButtonSizes = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL';
interface IButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: TButtonVariants;
    loading?: boolean;
    size?: TButtonSizes;
    iconOnly?: boolean;
    icon?: keyof typeof EIconName;
    iconAfter?: keyof typeof EIconName;
    children?: React.ReactNode | React.ReactNode[];
    link?: boolean;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
}

declare const Button: React$1.ForwardRefExoticComponent<IButtonProperties & React$1.RefAttributes<HTMLButtonElement>>;

declare enum EAlertStatus {
    success = "success",
    danger = "danger",
    error = "error",
    info = "info",
    warning = "warning",
    discovery = "discovery",
    ai = "ai"
}
type TAlertStatus = keyof typeof EAlertStatus;
type TAlertAction = Omit<IButtonProperties, 'variant'> & {
    title?: string;
};
interface IAlertProperties {
    status: TAlertStatus;
    title?: string;
    actions?: TAlertAction[];
    message?: string | JSX$1.Element;
    mb?: number;
    onClose?(event?: React__default.MouseEvent): void;
    id?: string;
    isOpen?: boolean;
    customIcon?: EIconName;
}

declare const Alert: React__default.FC<IAlertProperties>;

declare enum EComponentColors {
    gray = "gray",
    blue = "blue",
    green = "green",
    brand = "brand",
    yellow = "yellow",
    red = "red",
    violet = "violet",
    outlined = "outlined"
}

type TComponentSizes = 'S' | 'M' | 'L' | 'XL';

declare enum EBadgeSize {
    /**
     * @deprecated Use "xxs" instead
     */
    md = "md",
    /**
     * @deprecated Use "xxxs" instead
     */
    sm = "sm",
    xxs = "xxs",
    xxxs = "xxxs"
}
interface IBadgePropsDefault {
    mb?: number;
}
interface IBadgeProps extends IBadgePropsDefault, Omit<React__default.HTMLAttributes<HTMLDivElement>, keyof IBadgePropsDefault> {
    size?: EBadgeSize;
    variant?: keyof typeof EComponentColors;
    thin?: boolean;
}

declare const Badge: (props: IBadgeProps) => react_jsx_runtime.JSX.Element;

interface IBarChartProperties {
    percents: number;
    withoutLimit?: boolean;
    size?: number;
    withoutAnimation?: boolean;
}
declare const BarChart: (properties: IBarChartProperties) => react_jsx_runtime.JSX.Element;

declare type Classes$s = {
    /** Стиль, применяемый к обертке основного элемента */
    control?: string;
    /** Стиль, применяемый к элементу с `indeterminate='true'` */
    indeterminate?: string;
    /** Стиль, применяемый к элементу с `disabled='true'` */
    disabled?: string;
    /** Стиль, применяемый к элементу с `checked='true'` */
    checked?: string;
    /** Стиль, применяемый к элементу `input` */
    input?: string;
    /** Стиль, применяемый к обертке иконки выбора */
    checkbox?: string;
    /** Стиль, применяемый к иконке выбора */
    checkboxIcon?: string;
};

interface CheckboxProps extends Omit<React$1.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
    /**
     * Список классов
     */
    classes?: Partial<Classes$s>;
    /**
     * Элемент выбран
     */
    checked?: boolean;
    /**
     * Элемент отключен
     */
    disabled?: boolean;
    /**
     * Неопределенное состояние чекбокса
     */
    indeterminate?: boolean;
    /**
     * Атрибут name элемента input
     */
    name?: string;
    /**
     * Обработчик, вызываемый при изменении состояния
     */
    onChange?: (event: React$1.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Свойства элемента input type="checkbox", кроме onChange, name и disabled
     * @param inputProps.onBlur - обработчик потери фокуса с элемента
     * @param inputProps.onFocus — обработчик onFocus
     * @param inputProps — остальные нативные атрибуты элемента input
     */
    inputProps?: ComponentPropsWithRefFix<'input'>;
}

interface ICheckboxProperties extends CheckboxProps {
    error?: boolean;
    errorText?: string;
    readonly?: boolean;
    helperText?: string;
    label?: string;
}
declare const Checkbox: (properties: ICheckboxProperties) => react_jsx_runtime.JSX.Element;

/**
 * Для типизации внешних компонентов.
 */
declare type PolymorphicComponentProps<E extends React$1.ElementType, P> = P & BoxProps<E>;
declare type BoxOwnProps<E extends React$1.ElementType = React$1.ElementType> = {
    /**
     * HTML-тег, отображаемый компонентом.
     */
    as?: E;
};
declare type BoxProps<E extends React$1.ElementType> = BoxOwnProps<E> & Omit<React$1.ComponentProps<E>, keyof BoxOwnProps | 'onPointerEnterCapture' | 'onPointerLeaveCapture'>;

declare const TagKinds: {
    readonly lite: "lite";
    readonly secondary: "secondary";
    readonly primary: "primary";
    readonly color: "color";
};
declare const TagColor: {
    readonly red: "red";
    readonly yellow: "yellow";
    readonly green: "green";
    readonly azure: "azure";
    readonly blue: "blue";
    readonly violet: "violet";
    readonly gray: "gray";
};

declare type TTagKinds = keyof typeof TagKinds;
declare type TTagColor = keyof typeof TagColor;

interface ICheckboxChipsProps {
    disabled?: boolean;
    value: string[];
    items: {
        title: React__default.ReactNode;
        counter?: number;
        color?: EComponentColors;
        id: string;
    }[];
    kind?: Exclude<TTagKinds, 'color'>;
    wrap?: boolean;
    onChange?: (value: string[], event: FormEvent<HTMLElement>) => void;
    error?: boolean;
    labelBold?: boolean;
    inline?: boolean;
    required?: boolean;
    label?: string;
    helperText?: string;
    readonly?: boolean;
    testId?: string;
}

declare const CheckboxChips: ({ disabled, error, helperText, inline, items, kind, label, labelBold, onChange, readonly, required, value, wrap, testId, }: ICheckboxChipsProps) => react_jsx_runtime.JSX.Element;

type TChipsVariant = 'fill' | 'outline';
type TChipsSize = 'XXS' | 'XS' | 'S';
interface IChipsItem {
    title: React__default.ReactNode;
    id: string;
    count?: number;
}
interface IChipsProps {
    disabled?: boolean;
    item: IChipsItem;
    selected?: boolean;
    onChange?: (id: string, event: FormEvent<HTMLElement>) => void;
    onRemove?: (id: string, event: FormEvent<HTMLElement>) => void;
    variant?: TChipsVariant;
    size?: TChipsSize;
    fullWidth?: boolean;
    testId?: string;
    nowrap?: boolean;
}
declare const Chips: ({ disabled, fullWidth, item, onChange, onRemove, selected, size, variant, testId, nowrap, }: IChipsProps) => react_jsx_runtime.JSX.Element;

declare const top: "top";
declare const bottom: "bottom";
declare const right: "right";
declare const left: "left";
declare type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;
declare type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
declare type AutoPlacement = "auto" | "auto-start" | "auto-end";
declare type Placement = AutoPlacement | BasePlacement | VariationPlacement;
declare const beforeRead: "beforeRead";
declare const read: "read";
declare const afterRead: "afterRead";
declare const beforeMain: "beforeMain";
declare const main: "main";
declare const afterMain: "afterMain";
declare const beforeWrite: "beforeWrite";
declare const write: "write";
declare const afterWrite: "afterWrite";
declare type ModifierPhases = typeof beforeRead | typeof read | typeof afterRead | typeof beforeMain | typeof main | typeof afterMain | typeof beforeWrite | typeof write | typeof afterWrite;

declare type Obj = {
    [key: string]: any;
};
declare type VisualViewport = EventTarget & {
    width: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
    scale: number;
};
declare type Window$1 = {
    innerHeight: number;
    offsetHeight: number;
    innerWidth: number;
    offsetWidth: number;
    pageXOffset: number;
    pageYOffset: number;
    getComputedStyle: typeof getComputedStyle;
    addEventListener(type: any, listener: any, optionsOrUseCapture?: any): void;
    removeEventListener(type: any, listener: any, optionsOrUseCapture?: any): void;
    Element: Element;
    HTMLElement: HTMLElement;
    Node: Node;
    toString(): "[object Window]";
    devicePixelRatio: number;
    visualViewport?: VisualViewport;
    ShadowRoot: ShadowRoot;
};
declare type Rect = {
    width: number;
    height: number;
    x: number;
    y: number;
};
declare type Offsets = {
    y: number;
    x: number;
};
declare type PositioningStrategy = "absolute" | "fixed";
declare type StateRects = {
    reference: Rect;
    popper: Rect;
};
declare type OffsetData = {
    [key in Placement]?: Offsets;
};
declare type State = {
    elements: {
        reference: Element | VirtualElement;
        popper: HTMLElement;
        arrow?: HTMLElement;
    };
    options: OptionsGeneric<any>;
    placement: Placement;
    strategy: PositioningStrategy;
    orderedModifiers: Array<Modifier<any, any>>;
    rects: StateRects;
    scrollParents: {
        reference: Array<Element | Window$1 | VisualViewport>;
        popper: Array<Element | Window$1 | VisualViewport>;
    };
    styles: {
        [key: string]: Partial<CSSStyleDeclaration>;
    };
    attributes: {
        [key: string]: {
            [key: string]: string | boolean;
        };
    };
    modifiersData: {
        arrow?: {
            x?: number;
            y?: number;
            centerOffset: number;
        };
        hide?: {
            isReferenceHidden: boolean;
            hasPopperEscaped: boolean;
            referenceClippingOffsets: SideObject;
            popperEscapeOffsets: SideObject;
        };
        offset?: OffsetData;
        preventOverflow?: Offsets;
        popperOffsets?: Offsets;
        [key: string]: any;
    };
    reset: boolean;
};
declare type Instance = {
    state: State;
    destroy: () => void;
    forceUpdate: () => void;
    update: () => Promise<Partial<State>>;
    setOptions: (options: Partial<OptionsGeneric<any>>) => Promise<Partial<State>>;
};
declare type ModifierArguments<Options extends Obj> = {
    state: State;
    instance: Instance;
    options: Partial<Options>;
    name: string;
};
declare type Modifier<Name, Options> = {
    name: Name;
    enabled: boolean;
    phase: ModifierPhases;
    requires?: Array<string>;
    requiresIfExists?: Array<string>;
    fn: (arg0: ModifierArguments<Options>) => State | void;
    effect?: (arg0: ModifierArguments<Options>) => (() => void) | void;
    options?: Partial<Options>;
    data?: Obj;
};
declare type Options$2 = {
    placement: Placement;
    modifiers: Array<Partial<Modifier<any, any>>>;
    strategy: PositioningStrategy;
    onFirstUpdate?: (arg0: Partial<State>) => void;
};
declare type OptionsGeneric<TModifier> = {
    placement: Placement;
    modifiers: Array<TModifier>;
    strategy: PositioningStrategy;
    onFirstUpdate?: (arg0: Partial<State>) => void;
};
declare type SideObject = {
    top: number;
    left: number;
    right: number;
    bottom: number;
};
declare type VirtualElement = {
    getBoundingClientRect: () => ClientRect | DOMRect;
    contextElement?: Element;
};

interface PortalProps$1 {
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children.
     *
     * @returns
     */
    container?: (() => HTMLElement | null) | HTMLElement | null;
    /**
     * Потомки компонента.
     *
     * @inner
     */
    children?: React$1.ReactNode;
}

interface PopupProps$1 extends ComponentPropsWithRefFix<'div'> {
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, относительно которого рендерится Popup.
     */
    anchor: (() => HTMLElement | VirtualElement) | HTMLElement | VirtualElement | null;
    /**
     * Расположение Popup.
     *
     * @inner
     */
    placement?: Placement;
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится Popup.
     *
     * @inner
     */
    container?: PortalProps$1['container'];
    /**
     * Отменить рендер попапа в контейнер и рендерить в текущем родителе.
     *
     * @inner
     */
    disablePortal?: boolean;
    /**
     * Оставить элемент в DOM при закрытии.
     *
     * @inner
     */
    keepMounted?: boolean;
    /**
     * Показать/скрыть попап.
     *
     * @inner
     */
    open?: boolean;
    /**
     * Модификаторы экземпляра popper.js.
     *
     * @inner
     */
    modifiers?: Array<Partial<Modifier<string, {
        [key: string]: any;
    }>>>;
    /**
     * Порядок наложения компонента `Popup` на контент.
     */
    /**
     *
     * @inner
     */
    zIndex?: number;
    /**
     * Свойства экземпляра popper.js.
     *
     * @inner
     */
    popperOptions?: Partial<Options$2>;
    /**
     * Ссылка на экземпляр popper.js.
     */
    popperRef?: React$1.Ref<Instance>;
}

declare const DropdownTriggerType: {
    readonly hover: "hover";
    readonly click: "click";
    readonly focus: "focus";
    readonly contextMenu: "contextMenu";
};
declare type TDropdownTriggerType = keyof typeof DropdownTriggerType;
interface DropdownProps extends Partial<PopupProps$1> {
    /**
     * Тип события, по которому срабатывает триггер.
     *
     * @inner
     */
    action?: TDropdownTriggerType | TDropdownTriggerType[];
    /**
     * Содержимое дропдауна.
     *
     * @inner
     */
    content?: React$1.ReactNode;
    /**
     * Задержка при открытии с hover (в миллисекундах).
     *
     * @inner
     */
    mouseEnterDelay?: number;
    /**
     * Задержка при закрытии с hover (в миллисекундах).
     *
     * @inner
     */
    mouseLeaveDelay?: number;
    /**
     * Обработчик изменения состояния открытия/закрытия.
     *
     * @returns
     */
    onStateChange?: (open: boolean) => void;
    /**
     * HTML-элемент, который будет триггером.
     *
     * @inner
     */
    children: React$1.ReactElement<React$1.HTMLAttributes<HTMLElement>>;
}

declare type Classes$r = {
    /**
     * Стиль, применяемый к элементу `Tooltip`.
     *
     * @inner
     */
    tooltip?: string;
    /**
     * Стиль, применяемый к элементу с `single='true'`.
     *
     * @inner
     */
    single?: string;
    /**
     * Стиль, применяемый к стрелке в содержимом `Tooltip`.
     *
     * @inner
     */
    arrow?: string;
    /**
     * Стиль, применяемый к элементу с `indicator='true'`.
     *
     * @inner
     */
    indicator?: string;
    /**
     * Стиль, применяемый к контенту внутри `Tooltip`.
     *
     * @inner
     */
    tooltipContent?: string;
};
interface TooltipProps extends ComponentPropsWithRefFix<'div'> {
    /**
     * JSS-классы для стилизации.
     *
     * @inner
     */
    classes?: Partial<Classes$r>;
    /**
     * Компактное отображение содержимого в одну строку.
     *
     * @inner
     */
    single?: boolean;
    /**
     * Добавить иконку-индикатор в `Tooltip`.
     *
     * @inner
     */
    indicator?: boolean;
    /**
     * Свойства компонента `Dropdown`.
     *
     * @inner
     */
    dropdownProps?: ComponentPropsWithAttributes<Omit<DropdownProps, 'children' | 'zIndex'>>;
    /**
     * HTML-элемент, который будет триггером.
     *
     * @inner
     */
    children: React$1.ReactElement<React$1.HTMLAttributes<HTMLElement>>;
    /**
     * Показывать `Tooltip`, когда триггер получает фокус.
     *
     * @inner
     */
    showOnChildFocus?: boolean;
    /**
     * Должен быть true, если в `Tooltip` есть интерактивные элементы.
     *
     * @inner
     */
    interactive?: boolean;
    /**
     * Флаг указания стрелки `Tooltip` на центр элемента.
     *
     * @inner
     */
    pointAtCenter?: boolean;
    /**
     * Порядок наложения компонента `Tooltip` на контент.
     *
     * @inner
     */
    /**
     *
     * @inner
     */
    zIndex?: number;
}

declare type TooltipContextValue = {
    /**
     *
     */
    close?: () => void;
};
declare const TooltipContext: React$1.Context<TooltipContextValue>;

declare type ListOwnProps = {
    /**
     * Размер элементов списка
     */
    size?: ElementSizeType;
    /**
     * Сделать список интерактивным
     */
    interactive?: boolean;
    /**
     * @internal
     * Получить активный элемент списка
     */
    getActiveElement?: () => HTMLElement | null;
    /**
     * Между опций отображается разделитель
     */
    stripe?: boolean;
};
declare type ListProps<E extends React$1.ElementType> = PolymorphicComponentProps<E, ListOwnProps>;

declare type EllipsisSymbolProps = Omit<React__default.HTMLAttributes<HTMLElement>, 'children'>;

declare type EllipsisExpandButtonProps = Omit<React$1.HTMLAttributes<HTMLElement>, 'children'> & {
    /**
     * Флаг текущего состояния раскрытия.
     *
     * @inner
     */
    expanded?: boolean;
};

declare type TextComponents = {
    /**
     * Компонент для раскрытия текста.
     *
     * @inner
     */
    ExpandButton: React__default.ComponentType<EllipsisExpandButtonProps>;
    /**
     * Компонент для замены символа "...".
     *
     * @inner
     */
    EllipsisSymbol: React__default.ComponentType<EllipsisSymbolProps>;
    /**
     * Компонент для отображения иконки копирования
     */
    CopyIcon: React__default.FC<React__default.SVGAttributes<SVGElement>> | null;
    /**
     * Компонент для отображения иконки копирования при скопированом тексте
     */
    CopiedIcon: React__default.FC<React__default.SVGAttributes<SVGElement>> | null;
};
declare type TextComponentsConfig = Partial<TextComponents>;

declare type EllipsisConfig = {
    /**
     * Максимальное количество строк для контента перед тем, как он начнет обрезаться.
     *
     * @inner
     */
    rows?: number;
    /**
     * Возможно ли показать весь текст, collapsible - позволяет свернуть текст обратно.
     *
     * @inner
     */
    expandable?: 'expandable' | 'collapsible';
    /**
     * Значение по умолчанию для текста с возможностью открытия\закрытия.
     *
     * @inner
     */
    defaultExpanded?: boolean;
    /**
     * Свойство для контролируемого открытия\закрытия текста. Если undefined, то работает неконтролируемо.
     *
     * @inner
     */
    expanded?: boolean;
    /**
     * Функция обратного вызова срабатывающий при нажатии на символ открытия/закрытия.
     *
     * @inner
     */
    onExpand?: (expanded: boolean, e: React$1.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * Функция обратного вызова, срабатывающий при изменении состояния ellipsis (например, когда контейнер стал шире или уже).
     *
     * @inner
     */
    onEllipsis?: (ellipsis: boolean) => void;
    /**
     * Отвечает за показ Tooltip в случае, если текст уходит в эллипсис
     * Контент по умолчанию берется из children если не задан иной контент.
     *
     * @inner
     */
    tooltip?: boolean | ComponentPropsWithAttributes<Omit<TooltipProps, 'children'>>;
    /**
     * Свойства кнопки разворачивания/сворачивания текста.
     *
     * @inner
     */
    expandButtonProps?: ComponentPropsWithAttributes<Omit<React$1.HTMLAttributes<HTMLElement>, 'children'>>;
};

declare type Classes$q = Partial<Record<'displayLg' | 'displayMd' | 'displaySm' | 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'titleLg' | 'titleMd' | 'titleSm' | 'bodyXl' | 'bodyLg' | 'bodyMd' | 'bodySm' | 'uiTextLg' | 'uiTextMd' | 'uiTextSm' | 'codeLg' | 'codeMd' | 'codeSm' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline' | 'code1' | 'code2' | 'ellipsis' | 'gutterBottom' | 'root' | 'copy' | 'copyIcon' | 'copiedIcon', string>>;
declare const TextKinds: {
    readonly displayLg: "displayLg";
    readonly displayMd: "displayMd";
    readonly displaySm: "displaySm";
    readonly headline1: "headline1";
    readonly headline2: "headline2";
    readonly headline3: "headline3";
    readonly headline4: "headline4";
    readonly headline5: "headline5";
    readonly titleLg: "titleLg";
    readonly titleMd: "titleMd";
    readonly titleSm: "titleSm";
    readonly bodyXl: "bodyXl";
    readonly bodyLg: "bodyLg";
    readonly bodyMd: "bodyMd";
    readonly bodySm: "bodySm";
    readonly uiTextLg: "uiTextLg";
    readonly uiTextMd: "uiTextMd";
    readonly uiTextSm: "uiTextSm";
    readonly codeLg: "codeLg";
    readonly codeMd: "codeMd";
    readonly codeSm: "codeSm";
    readonly h1: "h1";
    readonly h2: "h2";
    readonly h3: "h3";
    readonly h4: "h4";
    readonly h5: "h5";
    readonly h6: "h6";
    readonly subtitle1: "subtitle1";
    readonly subtitle2: "subtitle2";
    readonly body1: "body1";
    readonly body2: "body2";
    readonly button: "button";
    readonly caption: "caption";
    readonly overline: "overline";
    readonly code1: "code1";
    readonly code2: "code2";
};
declare type TTextKinds = keyof typeof TextKinds;
interface TextProps<TCanCopy extends boolean | undefined = false> extends Omit<React$1.HTMLAttributes<HTMLElement>, 'onCopy'> {
    /**
     * JSS-классы для стилизации.
     *
     * @inner
     */
    classes?: Classes$q;
    /**
     * Стиль текста.
     *
     * @inner
     */
    kind?: TTextKinds;
    /**
     * HTML тег, который будет отрисован вместо заданных по умолчанию.
     *
     * @inner
     */
    as?: keyof React$1.ReactHTML;
    /**
     * Свойство для переопределения элементов `Text`.
     *
     * @inner
     */
    components?: TextComponentsConfig;
    /**
     * Добавить отступ под текстом.
     *
     * @inner
     */
    gutterBottom?: boolean;
    /**
     * Обрезает текст с многоточием в конце.
     * Обратите внимание, что при использовании свойства `dangerouslySetInnerHTML` конфигурация `ellipsis` с помощью объекта работать не будет.
     *
     * @inner
     */
    ellipsis?: boolean | EllipsisConfig;
    /**
     * Устанавливает HTML-содержимое элемента напрямую.
     *
     * @inner
     */
    dangerouslySetInnerHTML?: React$1.DOMAttributes<HTMLElement>['dangerouslySetInnerHTML'];
    /**
     * Добавляет возможность копирования текста по нажатию.
     *
     * @inner
     */
    withCopy?: TCanCopy | boolean;
    /**
     * Функция обратного вызова, срабатывающая в момент копирования текста.
     *
     * @param {string} text Копируемый текст.
     *
     * @returns
     */
    onCopy?: TCanCopy extends true ? (text: string) => void : never;
    /**
     * Функция обратного вызова, срабатывающая перед копированием текста.
     *
     * @param {string} text Копируемый текст.
     *
     * @returns
     */
    onBeforeCopy?: TCanCopy extends true ? (text: string) => void : never;
    /**
     * Функция обратного вызова, позволяющая изменить текст, копируемый в буфер обмена.
     *
     * @param {string} text Копируемый текст.
     *
     * @returns
     */
    getCopyText?: TCanCopy extends true ? (text: string) => string : never;
    /**
     * Текст всплывающей подсказки при наведении на текст после копирования.
     *
     * @inner
     */
    copiedTooltipText?: TCanCopy extends true ? string : never;
    /**
     * Текст всплывающей подсказки при наведении на текст перед копированием.
     *
     * @inner
     */
    copyTooltipText?: TCanCopy extends true ? string : never;
    /**
     * Свойства элемента всплывающей подсказки.
     *
     * @inner
     */
    copyTooltipProps?: TCanCopy extends true ? Omit<TooltipProps, 'children'> : never;
    /**
     * Продолжительность показа состояния "скопировано" в миллисекундах.
     *
     * @inner
     */
    copiedDuration?: TCanCopy extends true ? number : never;
    /**
     * Свойства компонента иконки копирования текста.
     *
     * @inner
     */
    copyIconWrapperProps?: TCanCopy extends true ? React$1.ComponentProps<'span'> : never;
    /**
     * Функция обратного вызова, отвечающая за обработку ошибки при копировании текста.
     *
     * @param error Объект ошибки при копировании.
     *
     * @returns
     */
    onCopyError?: TCanCopy extends true ? (error: Error) => void : never;
}

declare type Classes$p = {
    /** Стиль, применяемый к элементу suffix и prefix */
    affix?: string;
    /** Стиль, применяемый к элементу с `critical='true'` */
    critical?: string;
    /** Стиль, применяемый к элементу с `disabled='true'` */
    disabled?: string;
    /** Стиль, применяемый к элементу с `interactive='true'` */
    interactive?: string;
    /** Стиль, применяемый к основному элементу */
    listItem?: string;
    /** Стиль, применяемый к элементу prefix */
    prefix?: string;
    /** Стиль, применяемый к элементу с `selected='true'` */
    selected?: string;
    /** Стиль, применяемый к элементу с `size='sm'` */
    small?: string;
    /** Стиль, применяемый к элементу с `size='md'` */
    medium?: string;
    /** Стиль, применяемый к элементу с `size='lg'` */
    large?: string;
    /** Стиль, применяемый к элементу с `stripe='true'` */
    stripe?: string;
    /** Стиль, применяемый к элементу suffix */
    suffix?: string;
    /** Стиль, применяемый к элементу текста внутри элемента */
    text?: string;
    /** Стиль, применяемый к элементу текста внутри элемента при отсутствии `textProps`*/
    textTypography?: string;
};

interface ListItemOwnProps {
    /**
     * JSS-классы для стилизации
     */
    classes?: Partial<Classes$p>;
    /**
     * Размер элементов списка
     */
    size?: ElementSizeType;
    /**
     * Отметить элемент выбранным
     */
    selected?: boolean;
    /**
     * Сделать элемент интерактивным
     */
    interactive?: boolean;
    /**
     * Отключить элемент
     */
    disabled?: boolean;
    /**
     * Выделение критически важного элемента
     */
    critical?: boolean;
    /**
     * Свойства компонента Text
     */
    textProps?: TextProps;
    /**
     * Вспомогательный элемент после поля ввода
     */
    suffix?: React$1.ReactNode;
    /**
     * Между опций отображается разделитель
     */
    stripe?: boolean;
}
declare type ListItemProps<E extends React$1.ElementType> = Omit<PolymorphicComponentProps<E, ListItemOwnProps>, 'prefix'> & {
    /**
     * Вспомогательный элемент перед полем ввода
     */
    prefix?: React$1.ReactNode;
};

declare const useStyles: (data?: {
    theme?: Theme | undefined;
} | undefined) => Record<"label" | "text" | "textTypography" | "groupList", string>;
interface ListItemGroupOwnProps {
    /**
     * CSS классы для стилизации.
     */
    classes?: ReturnType<typeof useStyles>;
    /**
     * Имя группы, которое будет отображено заголовком для группы.
     */
    label: string;
}
declare type ListItemGroupProps<E extends React$1.ElementType> = PolymorphicComponentProps<E, ListItemGroupOwnProps>;

declare type FilterOption<Option> = {
    label: string;
    value: string;
    option: Option;
};

declare type Classes$o = {
    /**
     *  Стиль, применяемый к основному элементу.
     *
     *  @inner
     */
    label?: string;
    /**
     *  Стиль, применяемый к элементу `span`.
     *
     *  @inner
     */
    text?: string;
    /**
     *  Стиль, применяемый к элементу `span` с `size='sm'`.
     *
     *  @inner
     */
    textSmall?: string;
    /**
     *  Стиль, применяемый к элементу `span` с `size='md'`.
     *
     *  @inner
     */
    textMedium?: string;
    /**
     *  Стиль, применяемый к элементу `span` с `size='lg'`.
     *
     *  @inner
     */
    textLarge?: string;
    /**
     *  Стиль, применяемый к элементу с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу иконки в Tooltip.
     *
     *  @inner
     */
    tooltipIcon?: string;
    /**
     *  Стиль, применяемый к контейнеру suffix.
     *
     *  @inner
     */
    suffix?: string;
    /**
     *  Стиль, применяемый к контейнеру suffix с `size='sm'`.
     *
     *  @inner
     */
    suffixSmall?: string;
    /**
     *  Стиль, применяемый к контейнеру suffix с `size='md'`.
     *
     *  @inner
     */
    suffixMedium?: string;
    /**
     *  Стиль, применяемый к контейнеру suffix с `size='lg'`.
     *
     *  @inner
     */
    suffixLarge?: string;
};
interface InputLabelProps extends React$1.LabelHTMLAttributes<HTMLLabelElement> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$o>;
    /**
     * Применить стили для disabled состояния.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Текст всплывающей подсказки подписи.
     *
     * @inner
     */
    tooltipText?: React$1.ReactNode;
    /**
     * Свойства компонента Tooltip.
     *
     * @inner
     */
    tooltipProps?: ComponentPropsWithAttributes<Omit<TooltipProps, 'children'>>;
    /**
     * Вспомогательный элемент после текста.
     *
     * @inner
     */
    suffix?: React$1.ReactNode;
    /**
     * Размер надписи.
     *
     * @inner
     */
    size?: ElementSizeType;
}

declare type Classes$n = {
    /**
     *  Стиль, применяемый к основному элементу.
     *
     *  @inner
     */
    helperText?: string;
    /**
     *  Стиль, применяемый к основному элементу с `size='sm'`.
     *
     *  @inner
     */
    helperTextSmall?: string;
    /**
     *  Стиль, применяемый к основному элементу с `size='md'`.
     *
     *  @inner
     */
    helperTextMedium?: string;
    /**
     *  Стиль, применяемый к основному элементу с `size='lg'`.
     *
     *  @inner
     */
    helperTextLarge?: string;
    /**
     *  Стиль, применяемый к элементу с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу с `error='true'`.
     *
     *  @inner
     */
    error?: string;
};
interface InputHelperTextProps extends Omit<ComponentPropsWithRefFix<'div'>, 'ref'> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$n>;
    /**
     * Применить стили для disabled состояния.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Применить стили для error состояния.
     *
     * @inner
     */
    error?: boolean;
    /**
     * Размер подписи.
     *
     * @inner
     */
    size?: ElementSizeType;
}

declare type Classes$m = {
    /**
     * Стиль, применяемый к элементу Description.
     *
     * @inner
     */
    description?: string;
    /**
     * Стиль, применяемый к элементу Description с `size='sm'`.
     *
     * @inner
     */
    descriptionSmall?: string;
    /**
     * Стиль, применяемый к элементу Description с `size='md'`.
     *
     * @inner
     */
    descriptionMedium?: string;
    /**
     * Стиль, применяемый к элементу Description с `size='lg'`.
     *
     * @inner
     */
    descriptionLarge?: string;
    /**
     * Стиль, применяемый к контейнеру с Label и Description.
     *
     * @inner
     */
    topLabels?: string;
    /**
     * Стиль, применяемый к контейнеру с Label, Description и Required.
     *
     * @inner
     */
    topLabelsWrapper?: string;
    /**
     * Стиль, применяемый к элементу Required.
     *
     * @inner
     */
    required?: string;
    /**
     * Стиль, применяемый к элементу Required с `size='sm'`.
     *
     * @inner
     */
    requiredSmall?: string;
    /**
     * Стиль, применяемый к элементу Required с `size='md'`.
     *
     * @inner
     */
    requiredMedium?: string;
    /**
     * Стиль, применяемый к элементу Required с `size='lg'`.
     *
     * @inner
     */
    requiredLarge?: string;
    /**
     * Стиль, применяемый к элементу Description с `disabled='true'`.
     *
     * @inner
     */
    descriptionDisabled?: string;
};

declare type LabelledProps = {
    /**
     * CSS классы компонента.
     *
     * @inner
     */
    classes?: Partial<Classes$m>;
    /**
     * Подпись над полем ввода.
     *
     * @inner
     */
    label?: React$1.ReactNode;
    /**
     * Свойства компонента InputLabel.
     *
     * @inner
     */
    labelProps?: ComponentPropsWithAttributes<InputLabelProps>;
    /**
     * Подпись под полем ввода.
     *
     * @inner
     */
    helperText?: React$1.ReactNode;
    /**
     * Свойства компонента InputHelperText.
     *
     * @inner
     */
    helperTextProps?: ComponentPropsWithAttributes<InputHelperTextProps>;
    /**
     * Подпись под ярлыком.
     *
     * @inner
     */
    description?: React$1.ReactNode;
    /**
     * Признак обязательности поля.
     *
     * @inner
     */
    required?: boolean;
    /**
     * Применить стили для disabled состояния.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Поле содержит ошибку.
     *
     * @inner
     */
    error?: boolean;
    /**
     * Оставить минимальную высоту контейнера для `helperText`.
     *
     * @inner
     */
    keepHelperTextMinHeight?: boolean;
    /**
     * Дочерний контент.
     *
     * @inner
     */
    children?: React$1.ReactNode | undefined;
    /**
     * Размер надписи.
     *
     * @inner
     */
    size?: ElementSizeType;
};

declare type Options$1<Option> = Option[];
declare type SingleValue<Option> = Option | null;
declare type MultiValue<Option> = Option[];
declare type CommonProps$1<Option> = {
    canClear?: boolean;
    hasValue: boolean;
    clearValue: (e: ComboboxEvent) => void;
    error?: boolean;
    isMulti: boolean;
    onOpen: (value: boolean) => void;
    opened: boolean;
    options: Options$1<Option>;
    withTags: boolean;
    selectedValue: Options$1<Option>;
    isSearchable?: boolean;
};
interface BaseComboBoxProps<Option, ListElement extends React$1.ElementType> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>, Omit<LabelledProps, 'children' | 'classes'> {
    /**
     * Список классов для компонента Labelled
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Можно ли очищать всё поле (нажатием по крестику, через Backspace, повторным нажатием на выбранную опцию)
     */
    canClear?: boolean;
    /**
     * Отключить отображение выбранных опций внутри поля
     */
    disableVisibleSelectedValue?: boolean;
    /**
     * Разделитель для опций в режиме `multiple`, без тегов
     */
    delimiter?: string;
    /**
     * Заблокировать поле
     */
    disabled?: boolean;
    /**
     * Свойства компонента Dropdown
     */
    dropdownProps?: Partial<DropdownProps>;
    /**
     * Индикатор ошибки
     */
    error?: boolean;
    /**
     * Свойства компонента Tooltip для иконки ошибки
     */
    errorIconTooltipProps?: Omit<TooltipProps, 'children'>;
    /**
     * Функция для переопределения логики поиска
     */
    filterOption?: (option: FilterOption<Option>, inputValue: string) => boolean;
    /**
     * Функция переопределения заголовка опции
     * @default option.label
     */
    getOptionLabel?: (option: Option) => string;
    /**
     * Функция переопределения префикса выводимого в элементе опции
     * @default option.prefix
     */
    getOptionPrefix?: (option: Option) => React$1.ReactNode;
    /**
     * Функция переопределения суффикса выводимого в элементе опции
     * @default option.suffix
     */
    getOptionSuffix?: (option: Option) => React$1.ReactNode;
    /**
     * Функция переопределения значения опции
     * @default option.value
     */
    getOptionValue?: (option: Option) => string;
    /**
     * Группировка опций по признаку
     */
    groupBy?: (option: Option) => string;
    /**
     * Пропсы innerProps для компонента Input
     */
    inputInnerProps?: Partial<ComponentPropsWithoutRefFix<'input'>>;
    /**
     * Значение текстового поля
     */
    inputValue?: string;
    /**
     * Вспомогательный элемент перед полем ввода
     */
    inputPrefix?: React$1.ReactNode;
    /**
     * Вспомогательный элемент после поля ввода
     */
    inputSuffix?: React$1.ReactNode;
    /**
     * Функция переопределения логики блокировки опции
     * @default option.disabled
     */
    isOptionDisabled?: (option: Option) => boolean;
    /**
     * Разрешен ли поиск. Неактуален для Creatable/Autocomplete.
     */
    isSearchable?: boolean;
    /**
     * Данный флаг устанавливает максимальную ширину выпадашки равной ширине самого селекта
     */
    limitByWidth?: boolean;
    /**
     * Свойства компонента List
     */
    listProps?: ListProps<ListElement>;
    /**
     * Текст если ничего не найдено
     */
    noOptionsText?: React$1.ReactNode;
    /**
     * Обработчик изменения текстового поля
     */
    onInputChange?: (value: string, event?: ComboBoxInputEvent) => void;
    /**
     * Если true, всплывающее окно откроется при фокусе на поле
     */
    openOnFocus?: boolean;
    /**
     * Если true, всплывающее окно откроется при клике на поле
     */
    openOnClick?: boolean;
    /**
     * Список опций
     */
    options?: Options$1<Option>;
    /**
     * Заполнитель поля (подсказка внутри поля)
     */
    placeholder?: string;
    /**
     * Количество отображаемых строк за раз внутри выпадашки
     */
    rows?: number;
    /**
     * Показать дополнительную иконку ошибки
     */
    showErrorIcon?: boolean;
    /**
     * Размер поля
     */
    size?: ElementSizeType;
    /**
     * Скрывать дропдаун при скроле вне дропдауна
     */
    hideDropdownOnOutsideScroll?: boolean;
    /**
     * Функция задает, как отображать label внутри списка
     */
    formatOptionLabel?: (label: string, inputValue?: string) => React$1.ReactNode;
    /**
     * Дополнительное условие, которое отвечает за раскрытость дропдауна
     */
    opened?: boolean;
    /**
     * Показывать ли стрелку раскрывающегося списка
     */
    showArrow?: boolean;
    /**
     * Показывать ли чек-марку при выборе опции
     */
    showCheckMark?: boolean;
    /**
     * Идет ли процесс загрузки
     */
    loading?: boolean;
    /**
     * Показывается в процессе загрузки
     */
    loadingLabel?: React$1.ReactNode;
    /**
     * Пропсы innerProps для компонента Control
     * @param controlInnerProps.onBlur - обработчик потери фокуса с элемента
     * @param controlInnerProps.onFocus — обработчик onFocus
     * @param controlInnerProps — остальные нативные атрибуты элемента div
     */
    controlInnerProps?: Partial<ComponentPropsWithRefFix<'div'>>;
    /**
     * Cбрасывает введенное значение, при событии blur. Актуален только для isSearchable
     */
    clearInputOnBlur?: boolean;
    /**
     * Показывать ли разделитель у создаваемой опции. Актуален только для Creatable
     */
    isCreatableDivided?: boolean;
    /**
     * Функция, которая будет вызываться перед каждым открытием меню
     */
    onMenuOpen?: () => void;
    /**
     * Функция, которая будет вызываться перед каждым закрытием меню
     */
    onMenuClose?: () => void;
    /**
     * Свойства для нативного элемента input
     */
    inputProps?: ComponentPropsWithRefFix<'input'>;
    /**
     * Функция для переопределения свойств компонента ListItemGroup
     * @param {string} groupName название группы опций
     * @param {Option[]} options массив опций переданный в компонент ComboBox
     * @returns пропсы компонента ListItemGroup
     */
    getListItemGroupProps?: OptionListProps<Option, ListElement, 'li'>['getListItemGroupProps'];
}
declare type ComboboxEvent = React$1.MouseEvent<HTMLElement> | React$1.KeyboardEvent<HTMLDivElement> | React$1.MouseEvent<HTMLSpanElement>;
declare type ComboBoxInputEvent = ComboBoxClearEvent | 'input';
declare type ComboBoxClearEvent = 'select-clear' | 'delete-clear';
declare type ComboboxChangeReason = 'clear' | 'force-clear' | 'select' | 'select-enter' | 'select-arrows' | 'delete';
declare type MultiChoiceProps<Option> = {
    /**
     * Текущее значение
     */
    value?: Options$1<Option> | string[] | null;
    /**
     * Значение по умолчанию
     */
    defaultValue?: Options$1<Option> | string[];
    /**
     * Обработчик события выбора опции
     *
     * @param {string} value - массив значений строк с применением функции getOptionValue
     * @param {ComboboxEvent} e — эвент события
     * @param {Options<Option>} fullValue - массив полных значений
     * @param {ComboboxChangeReason} reason - тип изменения значения поля
     */
    onChange?(value: string[], e: ComboboxEvent, fullValue?: MultiValue<Option>, reason?: ComboboxChangeReason): void;
    /**
     * Отключить закрытие при выборе опции. Неактуален для одиночного выбора/Autocomplete
     */
    disableCloseOnSelect?: boolean;
    /**
     * Выбранные опции отображаются в виде тегов. Неактуален для одиночного выбора
     */
    withTags?: boolean;
    /**
     * Включить мультивыбор. Неактуален для Autocomplete
     */
    multiple: true;
    /**
     * Настраивает количество отображаемых тегов, если включена опция `withTags`
     * для отображения тегов в поле ввода.
     *
     * Если опций будет больше указанного лимита, они будут скрыты и появится тег
     * с указанием скрытых опций, формата `+n`.
     */
    limitTags?: number;
    selectOnFocus?: never;
};
declare type SingleChoiceProps<Option> = {
    /**
     * Текущее значение
     */
    value?: Option | string | null;
    /**
     * Значение по умолчанию
     */
    defaultValue?: Option | string;
    /**
     * Обработчик события выбора опции
     *
     * @param {string} value - значение отдаваемое по функции getOptionValue
     * @param {ComboboxEvent} e — эвент события
     * @param {Option} fullValue - полное значение (объект)
     * @param {ComboboxChangeReason} reason - тип изменения значения поля
     */
    onChange?(value: string, e: ComboboxEvent, fullValue?: SingleValue<Option>, reason?: ComboboxChangeReason): void;
    multiple?: false;
    disableCloseOnSelect?: never;
    withTags?: never;
    limitTags?: never;
    /**
     * Выделять слово в текстовом поле при фокусе. Неактуален для множественного выбора.
     */
    selectOnFocus?: boolean;
};
declare type TruncateProps<Option> = SingleChoiceProps<Option> | MultiChoiceProps<Option>;
declare type GroupType<Option> = {
    key: number;
    index: number;
    group: string;
    options: Options$1<Option>;
};
declare type Classes$l = {
    /** Стиль, применяемый к контейнеру основного элемента  */
    root?: string;
    /** Стиль, применяемый к контейнеру основного элемента с `size='sm` */
    small?: string;
    /** Стиль, применяемый к контейнеру основного элемента с `size='md` */
    medium?: string;
    /** Стиль, применяемый к контейнеру основного элемента с `size='lg`  */
    large?: string;
    /** Стиль, применяемый к основному элементу, в состоянии error */
    error?: string;
    /** Стиль, применяемый к иконке ошибки */
    errorIcon?: string;
    /** Стиль, применяемый к полю ввода, в состоянии isSearchable */
    input?: string;
    /** Стиль, применяемый к вспомогательному элементу перед полем ввода */
    inputPrefix?: string;
    /** Стиль, применяемый к вспомогательному элементу после поля ввода */
    inputSuffix?: string;
    /** Стиль, применяемый к иконке стрелки, в состоянии showArrow */
    inputArrowIcon?: string;
    /** Стиль, применяемый к обертке поля ввода */
    inputContent?: string;
    /** Стиль, применяемый к обертке индикаторов */
    inputIndicatorContainer?: string;
    /** Стиль, применяемый к иконке ошибки */
    inputErrorIcon?: string;
    /** Стиль, применяемый к основной форме ввода и выбора значений */
    inputRoot?: string;
    /** Стиль, применяемый к полю ввода в состоянии disabled */
    inputDisabled?: string;
    /** Стиль, применяемый к обертке (списку) отображаемых элементов */
    list?: string;
    /** Стиль, применяемый к каждому отображаемому элементу */
    option?: string;
    /** Стиль, применяемый к каждому отображаемому элементу с `size='sm` */
    optionSmall?: string;
    /** Стиль, применяемый к каждому отображаемому элементу с `size='md` */
    optionMedium?: string;
    /** Стиль, применяемый к каждому отображаемому элементу с `size='lg` */
    optionLarge?: string;
    /** Стиль, применяемый к каждому отображаемому элементу, в состоянии active */
    optionActive?: string;
    /** Стиль, применяемый к каждому отображаемому элементу, в состоянии disabled */
    optionDisabled?: string;
    /** Стиль, применяемый к тексту каждого отображаемого элемента` */
    optionText?: string;
    /** Стиль, применяемый к типографии текста каждого отображаемого элемента` */
    optionTextTypography?: string;
    /** Стиль, применяемый к обёртке чекбокса каждого отображаемого элемента, в состоянии multiple` */
    optionMultiPrefix?: string;
    /** Стиль, применяемый к каждому отображаемому элементу, в состоянии selected */
    selectedOption?: string;
    /** Стиль, применяемый к индикатору процесса загрузки, в состоянии loading */
    loading?: string;
    /** Стиль, применяемый к текстовому содержимому выводимого элемента,
     *  или к содержимому каждого элемента, выводимого через запятую внутри формы ввода */
    text?: string;
    /** Стиль, применяемый к каждому выводимому элементу, при выводе через теги, в состоянии multiple */
    tag?: string;
    /** Стиль, применяемый к чекбоксу, в состоянии multiple */
    checkBox?: string;
    /** Стиль, применяемый к разделителю у создаваемой опции, в состоянии Creatable */
    creatableDivider?: string;
    /** Стиль, применяемый к счетчику тегов, в состоянии withTags и Counter */
    counter?: string;
    /** Стиль, применяемый к фокусированному тегу, при управлении стрелками лево/право */
    focused?: string;
};

declare type Classes$k = Partial<Record<'root', string>>;
declare type SelectContainerProps<Option> = {
    children: React$1.ReactNode;
    classes: Classes$k;
    innerProps: ComponentPropsWithRefFix<'div'>;
    isDisabled?: boolean;
    isFocused: boolean;
} & CommonProps$1<Option>;

declare type Classes$j = Partial<Record<'rootControl' | 'disabled' | 'error' | 'small' | 'large' | 'focused', string>>;
declare type ControlProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$j;
    innerProps: ComponentPropsWithRefFix<'div'>;
    isDisabled?: boolean;
    isFocused: boolean;
    isSearchable?: boolean;
    size: ElementSizeType;
} & CommonProps$1<Option>;

declare type Classes$i = Partial<Record<'valueContainer', string>>;
declare type ValueContainerProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$i;
    isDisabled?: boolean;
    isFocused: boolean;
    withTags: boolean;
    disableVisibleSelectedValue: boolean;
} & CommonProps$1<Option>;

declare type Classes$h = Partial<Record<'indicatorContainer', string>>;
declare type IndicatorContainerProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$h;
    isDisabled?: boolean;
} & CommonProps$1<Option>;

declare type Classes$g = Partial<Record<'singleValue', string>>;
declare type SingleValueProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$g;
    isDisabled?: boolean;
    isSearchable?: boolean;
} & CommonProps$1<Option>;

declare type Classes$f = Partial<Record<'dropdownIndicator' | 'arrowIcon' | 'opened' | 'disabled' | 'small', string>>;
declare type DropdownIndicatorProps<Option> = {
    children?: React$1.ReactNode;
    classes?: Classes$f;
    innerProps: ComponentPropsWithRefFix<'div'>;
    isDisabled?: boolean;
    size: ElementSizeType;
} & CommonProps$1<Option>;

declare type Classes$e = Partial<Record<'clearIndicator' | 'disabled' | 'small', string>>;
declare type ClearIndicatorProps<Option> = {
    children?: React$1.ReactNode;
    classes?: Classes$e;
    innerProps: ComponentPropsWithRefFix<'div'>;
    disabled?: boolean;
    size: ElementSizeType;
} & CommonProps$1<Option>;

declare type Classes$d = Partial<Record<'tag' | 'tagText' | 'focused', string>>;
declare type MultiValueProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$d;
    size?: ElementSizeType;
    isDisabled?: boolean;
    isFocused?: boolean;
    onDelete?: (e: React$1.MouseEvent<HTMLSpanElement>) => void;
    /**
     * Свойства для кнопки удаления
     * @param deleteButtonProps.onClick - обработчик нажатия на элемент
     * @param deleteButtonProps.onBlur - обработчик потери фокуса с элемента
     * @param deleteButtonProps.onFocus - обработчик фокуса на элемент
     * @param deleteButtonProps - остальные нативные атрибуты элемента span
     */
    deleteButtonProps?: ComponentPropsWithRefFix<'span'>;
} & CommonProps$1<Option>;

declare type Classes$c = Partial<Record<'inputContainer' | 'input', string>>;
declare type InputProps$2<Option> = {
    classes?: Classes$c;
    innerProps: React$1.InputHTMLAttributes<HTMLInputElement>;
    isDisabled?: boolean;
} & CommonProps$1<Option>;

declare type Classes$b = Partial<Record<'placeholder' | 'disabled', string>>;
declare type PlaceholderProps<Option> = {
    children: React$1.ReactNode;
    classes?: Classes$b;
    isDisabled?: boolean;
} & CommonProps$1<Option>;

declare type OptionClasses$1 = {
    option?: string;
    optionSmall?: string;
    optionMedium?: string;
    optionLarge?: string;
    optionText?: string;
    optionTextTypography?: string;
    selectedOption?: string;
    optionActive?: string;
    optionDisabled?: string;
    noOptionsText?: string;
    optionLoading?: string;
    creatableDivider?: string;
    prefix?: string;
};
declare type OptionItemBaseProps<Option> = {
    isOptionSelected: (option: Option) => boolean;
    renderOptionPrefix: (option: Option, isCreating?: boolean) => React$1.ReactNode;
    renderOptionSuffix: (option: Option) => React$1.ReactNode;
    getOptionLabel: (option: Option) => string;
    getOptionValue: (option: Option) => string;
    isOptionDisabled: (option: Option) => boolean;
    isCreatableDivided?: boolean;
    option: Option;
    active: Option | undefined;
    optionClasses: OptionClasses$1;
    inputValue?: string;
    isInfoOption?: false;
    filteredOptions: Option[];
    formatOptionLabel?: (label: string, inputValue?: string) => React$1.ReactNode;
    setActive: (active: Option | undefined) => void;
    onSelectOption: (option: Option, event: ComboboxEvent) => void;
    createAriaActiveDescendantId: (value: string) => string;
};
declare type OptionItemStatusProps = {
    isInfoOption: true;
    children?: React$1.ReactNode;
};
declare type OptionItemCommonProps<E extends React$1.ElementType> = {
    commonOptionItemProps?: ListItemProps<E>;
    className?: string;
};
declare type OptionItemProps<Option, E extends React$1.ElementType> = OptionItemCommonProps<E> & (OptionItemStatusProps | OptionItemBaseProps<Option>);

declare type OptionListProps<Option, E extends React__default.ElementType, O extends React__default.ElementType> = CommonProps$1<Option> & {
    groupedOptions?: GroupType<Option>[];
    groupBy?: (option: Option) => string;
    noOptionsText?: React__default.ReactNode;
    commonOptionItemProps: ListItemProps<O>;
    OptionItemComponent: React__default.ComponentType<OptionItemProps<Option, O>>;
    loadingLabel?: React__default.ReactNode;
    loading?: boolean;
    listProps: Omit<ListProps<E>, 'children'>;
    getListItemGroupProps?: (groupName: string, options: Option[]) => Omit<ListItemGroupProps<O>, 'children'>;
    handleChangeInputValue: (value: string, event?: ComboBoxInputEvent) => void;
    handleClear: (event: ComboboxEvent) => void;
    inputRef: React__default.RefObject<HTMLInputElement>;
} & Omit<OptionItemBaseProps<Option>, 'option'>;

declare type OptionPrefixComponents = {
    MultiCheckbox: React__default.ComponentType<CheckboxProps> | null;
};
declare type OptionPrefixProps<Option> = {
    option: Option;
    multiple?: boolean;
    selected?: boolean;
    disabled?: boolean;
    creating?: boolean;
    components?: OptionPrefixComponents;
    customOptionPrefix?: React__default.ReactNode;
};

declare type OptionSuffixProps<Option> = {
    option: Option;
    multiple?: boolean;
    selected?: boolean;
    showCheckMark?: boolean;
    customOptionSuffix?: React__default.ReactNode;
};

declare type ComboBoxComponents<Option, ListElement extends React$1.ElementType, OptionItemElement extends React$1.ElementType> = {
    ClearIndicator: React$1.ComponentType<ClearIndicatorProps<Option>>;
    Control: React$1.ComponentType<ControlProps<Option>>;
    DropdownIndicator: React$1.ComponentType<DropdownIndicatorProps<Option>>;
    IndicatorContainer: React$1.ComponentType<IndicatorContainerProps<Option>>;
    Input: React$1.ComponentType<InputProps$2<Option>>;
    MultiValue: React$1.ComponentType<MultiValueProps<Option>>;
    MultiCheckbox: React$1.ComponentType<CheckboxProps>;
    Placeholder: React$1.ComponentType<PlaceholderProps<Option>>;
    SelectContainer: React$1.ComponentType<SelectContainerProps<Option>>;
    SingleValue: React$1.ComponentType<SingleValueProps<Option>>;
    ValueContainer: React$1.ComponentType<ValueContainerProps<Option>>;
    OptionList: React$1.ComponentType<OptionListProps<Option, ListElement, OptionItemElement>>;
    OptionItem: React$1.ComponentType<OptionItemProps<Option, OptionItemElement>>;
    OptionPrefix: React$1.ComponentType<OptionPrefixProps<Option>> | null;
    OptionSuffix: React$1.ComponentType<OptionSuffixProps<Option>> | null;
};
declare type ComboBoxComponentsConfig<Option, ListElement extends React$1.ElementType, OptionItemElement extends React$1.ElementType> = Partial<ComboBoxComponents<Option, ListElement, OptionItemElement>>;

declare const defaultOptionListElement = "ul";
declare const defaultOptionItemElement = "li";

declare type ComboboxProps<Option, ListElement extends React$1.ElementType = typeof defaultOptionListElement, ListItem extends React$1.ElementType = typeof defaultOptionItemElement> = Omit<BaseComboBoxProps<Option, ListItem>, 'defaultValue'> & TruncateProps<Option> & {
    /**
     * CSS классы компонента
     */
    classes?: Classes$l;
    /**
     * Свойство для переопределения элементов Combobox
     */
    components?: ComboBoxComponentsConfig<Option, ListElement, ListItem>;
};

declare type UseTreeToggleExpandOptions = {
    /**
     * При раскрытии узла дерева дерева раскрывать только его родительские элементы.
     */
    toggleParentsOnly?: boolean;
    /**
     * Не раскрывать узел, если он еще не прогружен.
     */
    ignoreLoading?: boolean;
};
declare type UseExpandProps<TItem = TreeItem> = {
    /**
     * Функция обратного вызова, которая срабатывает при скрытии/раскрытии узла дерева.
     *
     * @param {React.Key[]} expandedKeys Массив ключей раскрытых узлов дерева.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    onNodeExpand?: (expandedKeys: React$1.Key[], node: TreeNodeItem<TItem>) => void;
    /**
     * Массив ключей раскрытых узлов дерева по умолчанию.
     */
    defaultExpandedKeys?: React$1.Key[];
    /**
     * Массив ключей раскрытых узлов дерева.
     */
    expandedKeys?: React$1.Key[];
    /**
     * Функция обратного вызова для подгрузки новых дочерних узлов, которая срабатывает при раскрытии узлов дерева с флагом `loadable = true`.
     *
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    onLoadData?: (node: TreeNodeItem<TItem>) => Promise<void>;
    allowedKeysForExpand: Record<React$1.Key, boolean>;
    treePlain: TreeNodePlain<TItem>;
} & {
    getters: TreeGetters<TItem>;
};
declare type UseExpandReturnProps = {
    /**
     * Функция для смены состояния раскрытия узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     * @param {UseTreeToggleExpandOptions} options Параметры раскрытия узла дерева.
     */
    toggleExpand: (key: React$1.Key, options?: UseTreeToggleExpandOptions) => void;
    /**
     * Функция для определения раскрытия узла.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Флаг раскрытия узла дерева.
     */
    getIsExpanded: (key: React$1.Key) => boolean;
    /**
     * Функция для определения состояния загрузки у узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Состояние загрузки узла дерева.
     */
    getIsLoading: (key: React$1.Key) => boolean;
};

declare const TreeCheckMode: {
    readonly strict: "strict";
    readonly affect: "affect";
};
declare type TreeCheckModeType = typeof TreeCheckMode[keyof typeof TreeCheckMode];
declare type UseCheckProps<TItem = TreeItem> = {
    /**
     * Функция обратного вызова, которая срабатывает при изменении состояния чекбокса у узла дерева.
     *
     * @param {React.Key[]} checkedKeys Массив ключей узлов, для которых будут отмечены чекбоксы.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    onNodeCheck?: (checkedKeys: React$1.Key[], node: TreeNodeItem<TItem>) => void;
    /**
     * Массив ключей узлов, для которых будут отмечены чекбоксы по умолчанию.
     */
    defaultCheckedKeys?: React$1.Key[];
    /**
     * Массив ключей узлов, для которых будут отмечены чекбоксы.
     */
    checkedKeys?: React$1.Key[];
    treePlain: TreeNodePlain<TItem>;
    disabledKeysForCheck: Record<React$1.Key, boolean>;
    getTreeItemCheckDisabled?: TreeGetters<TItem>['getTreeItemCheckDisabled'];
    /**
     * Режим работы отметки чекбокса у узлов дерева, где `strict` - это строгая отметка чекбоксов, а `affect` - режим работы, в котором
     * при отметке чекбокса, чекбоксы у родительских и дочерних узлов также меняют свое состояние.
     */
    checkMode?: TreeCheckModeType;
};
declare type UseCheckReturnProps = {
    /**
     * Функция для смены состояния чекбокса у узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     */
    toggleCheck: (key: React$1.Key) => void;
    /**
     * Функция для проверки выбора чекбокса у узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Флаг выбранного чекбокса у узла дерева.
     */
    getIsChecked: (key: React$1.Key) => boolean;
    /**
     * Функция для проверки неопределенного состояния чекбокса у узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Флаг полувыбранного чекбокса у узла дерева.
     */
    getIsIndeterminate: (key: React$1.Key) => boolean;
};

declare const TreeSelectMode: {
    readonly strict: "strict";
    readonly directory: "directory";
};
declare type TreeSelectModeType = typeof TreeSelectMode[keyof typeof TreeSelectMode];
declare type ToggleSelectRangeOptions = {
    /**
     * При изменении состояния выбора игнорировать ключи, которые нужно убрать из выбора.
     */
    ignoreUnselectedState?: boolean;
    /**
     * При изменении состояния выбора менять начальное значение на противоположное.
     */
    reverseSelectedValues?: boolean;
};
declare type UseSelectProps<TItem = TreeItem> = {
    /**
     * Функция обратного вызова, которая срабатывает при выборе узла дерева.
     *
     * @param {React.Key[]} selectedKeys Массив выбранных узлов дерева.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    onNodeSelect?: (selectedKeys: React$1.Key[], node: TreeNodeItem<TItem>) => void;
    /**
     * Массив выбранных узлов дерева по умолчанию.
     */
    defaultSelectedKeys?: React$1.Key[];
    /**
     * Массив выбранных узлов дерева.
     */
    selectedKeys?: React$1.Key[];
    treePlain: TreeNodePlain<TItem>;
    disabledKeysForSelect: Record<React$1.Key, boolean>;
    disabledKeysForInitialSelect: Record<React$1.Key, boolean>;
    multipleSelect?: boolean;
    /**
     * Режим работы выбора узлов дерева, где `strict` - это строгий выбор узлов, а `directory` - выбор узлов согласно поведению
     * директорий и файловых систем.
     */
    selectMode?: TreeSelectModeType;
    nodeKeys: React$1.Key[];
    /**
     * Функция для определения раскрытия узла.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Флаг раскрытия узла дерева.
     */
    getIsExpanded: (key: React$1.Key) => boolean;
};
declare type UseSelectReturnProps = {
    /**
     * Функция для смены состояния выбора узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     */
    toggleSelect: (key: React$1.Key) => void;
    /**
     * Функция для смены состояния выбора у диапазона ключей узлов дерева.
     *
     * Если указаны аргументы `keyFrom` и `keyTo`, то выбирается диапазон узлов от `keyFrom`
     * до `keyTo`. Если указан только аргумент `keyFrom`, то предыдущий диапазон сохраняется в общий массив выбранных ключей и
     * выбирается либо убирается только узел `keyFrom`.
     *
     * @param {React.Key} keyFrom Ключ узла дерева, с которого начинается новый диапазон значений.
     * @param {React.Key} keyTo Ключ узла дерева, которым оканчивается новый диапазон значений. Если аргумент пуст, то выбирается или убирается
     * только элемет `keyTo`.
     * @param {ToggleSelectRangeOptions} Параметры выбора диапазона значений.
     */
    toggleSelectRange: (keyFrom: React$1.Key, keyTo?: React$1.Key, options?: ToggleSelectRangeOptions) => void;
    /**
     * Функция для определения состояния выбора узла.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Флаг состояния выбора узла дерева.
     */
    getIsSelected: (key: React$1.Key) => boolean;
    /**
     * Функция для получения первого выбранного узла дерева.
     *
     * @returns Ключ первого выбранного узла дерева.
     */
    getFirstSelectedKey: () => React$1.Key | undefined;
    /**
     * Функция для получения последнего выбранного узла дерева.
     *
     * @returns Ключ первого выбранного узла дерева.
     */
    getLastSelectedKey: () => React$1.Key | undefined;
};

declare type TreeSizeType = typeof TreeSize[keyof typeof TreeSize];
declare type TreeFocusModeType = typeof TreeFocusMode[keyof typeof TreeFocusMode];

/**
 * Размеры узлов.
 *
 * XS - extra small. очень маленький размер
 * SM - small. маленький размер
 * MD - medium. средний размер
 *
 * @constant
 *
 * @default
 */
declare const TreeSize: {
    readonly xs: "xs";
    readonly sm: "sm";
    readonly md: "md";
};
/**
 * Объект с режимами фокуса на целевой узел
 *
 * @constant
 *
 * @default
 */
declare const TreeFocusMode: {
    readonly default: "default";
    readonly selected: "selected";
};

declare type TreeClasses = {
    /** Стиль, применяемый к дереву. */
    root?: string;
    /** Стиль, применяемый к дереву c `size='xs'`. */
    rootExtraSmall?: string;
    /** Стиль, применяемый к дереву c `size='sm'`*/
    rootSmall?: string;
    /** Стиль, применяемый к дереву c `size='md'`. */
    rootMedium?: string;
    /** Стиль, применяемый к элементу дерева. */
    item?: string;
    /** Стиль, применяемый к группе элементов дерева. */
    itemGroup?: string;
    /** Стиль, применяемый к узлу дерева. */
    node?: string;
    /** Стиль, применяемый к элементу дерева с `size='xs'`. */
    itemExtraSmall?: string;
    /** Стиль, применяемый к элементу дерева с `size='sm'`. */
    itemSmall?: string;
    /** Стиль, применяемый к элементу дерева с `size='md'`. */
    itemMedium?: string;
    /** Стиль, применяемый к заблокированному элементу дерева. */
    itemDisabled?: string;
    /** Стиль, применяемый к элементу дерева, который находится в фокусе. */
    itemFocused?: string;
    /** Стиль, применяемый к элементу дерева, который подгружает данные. */
    itemLoading?: string;
    /** Стиль, применяемый к элементу дерева, у которого заблокирована возможность отмечать чекбокс. */
    itemCheckDisabled?: string;
    /** Стиль, применяемый к элементу дерева, у которого заблокирована возможность выбирать узел. */
    itemSelectDisabled?: string;
    /** Стиль, применяемый к контейнеру всех элементов управления узла. */
    nodeControlContainer?: string;
    /** Стиль, применяемый ко всем элементам управления узла. */
    nodeControl?: string;
    /** Стиль, применяемый к контейнеру контента узла. */
    nodeContentContainer?: string;
    /** Стиль, применяемый к элементу label у узла с чекбоксом. */
    nodeControlContainerLabel?: string;
    /** Стиль, применяемый к контенту узла дерева. */
    nodeContent?: string;
    /** Стиль, применяемый к иконке узла дерева. */
    nodeIcon?: string;
    /** Стиль, применяемый к раскрытому элементу дерева. */
    itemExpanded?: string;
    /** Стиль, применяемый к элементам с `disableExpand="false"`. */
    itemExpandable?: string;
    /** Стиль, применяемый к кнопке скрытия/раскрытия узла. */
    nodeExpandButton?: string;
    /** Стиль, применяемый к контейнеру пути узла дерева. */
    trailContainer?: string;
    /** Стиль, применяемый к вертикальному пути узла дерева. */
    trailVertical?: string;
    /** Стиль, применяемый к горизонтальному пути узла дерева. */
    trailHorizohtal?: string;
    /** Стиль, применяемый к выбранному элементу дерева. */
    itemSelected?: string;
    /** Стиль, применяемый к элементам с `selectable="true"`. */
    itemSelectable?: string;
    /** Стиль, применяемый к индикатору у выбранного узла дерева с `multipleSelect="true"`. */
    selectedIndicator?: string;
};

declare type TreeMainProps<TItem = TreeItem> = ComponentPropsWithRefFix<'ul'> & {
    /**
     * Массив данных для узлов дерева, содержащих дополнительную метаинформацию.
     */
    tree: TreeNodeItem<TItem>[];
};

declare type TreeNodeCheckboxProps<TItem = TreeItem> = TreeBaseComponentProps<TItem> & Omit<CheckboxProps, 'disabled'>;

declare type TreeNodeContentProps<TItem = TreeItem> = React$1.PropsWithChildren<TreeBaseComponentProps<TItem>>;

declare type TreeNodeExpandButtonProps<TItem = TreeItem> = TreeBaseComponentProps<TItem> & ComponentPropsWithRefFix<'button'>;

declare type TreeNodeExpandIconProps<TItem extends unknown = TreeItem> = TreeBaseComponentProps<TItem>;

declare type TreeNodeIconProps<TItem = TreeItem> = TreeBaseComponentProps<TItem> & {
    /**
     * Флаг возможности скрытия/раскрытия узла дерева
     */
    canExpand: boolean;
};

declare type TreeNodeLoadingIndicatorProps<TItem extends unknown = TreeItem> = TreeBaseComponentProps<TItem>;

declare type TreeMainItemProps<TItem = TreeItem> = Omit<ComponentPropsWithRefFix<'li'>, 'style'> & {
    /**
     * Ключ узла дерева.
     */
    nodeKey: React$1.Key;
    /**
     * Индекс элемента дерева в массиве данных.
     */
    nodeIndex: number;
    /**
     * Объект, или функция обратного вызова, которая возвращает объект, содержащий CSS-стили для элемента дерева.
     *
     * @param {TreeNodeItem<TItem>} node - Объект узла дерева.
     *
     * @returns {React.CSSProperties} CSS-стили для элемента дерева.
     */
    style?: React$1.CSSProperties | ((node: TreeNodeItem<TItem>) => React$1.CSSProperties | undefined);
    /**
     * Карта соответствия узлов дерева, которые являются последними дочерними элементами в списке относительно
     * текущего узла дерева.
     *
     * @ignore
     */
    lastParentsOnLevelMap?: LastParentsOnLevelMap;
};

declare type TreeComponents<TItem = TreeItem> = {
    /**
     * Иконка кнопки скрытия/раскрытия узла дерева.
     */
    ExpandIcon: React.ComponentType<TreeNodeExpandIconProps<TItem>> | null;
    /**
     * Компонент отображаемого контента у узла дерева справа от чекбокса и всех иконок.
     */
    Content: React.ComponentType<TreeNodeContentProps<TItem>> | null;
    /**
     * Иконка узла дерева.
     */
    Icon: React.ComponentType<TreeNodeIconProps<TItem>> | null;
    /**
     * Кнопка скрытия/раскрытия узла дерева.
     */
    ExpandButton: React.ComponentType<TreeNodeExpandButtonProps<TItem>> | null;
    /**
     * Компонент чекбокса.
     */
    Checkbox: React.ComponentType<TreeNodeCheckboxProps<TItem>> | null;
    /**
     * Компонент загрузки дочерних элементов узла дерева, отображаемый вместо кнопки скрытия/раскрытия.
     */
    LoadingIndicator: React.ComponentType<TreeNodeLoadingIndicatorProps<TItem>> | null;
    /**
     * Основной компонент дерева.
     */
    TreeMain: React.ComponentType<React.PropsWithChildren<TreeMainProps<TItem>>> | null;
    /**
     * Базовый элемент дерева.
     */
    Item: React.ComponentType<TreeMainItemProps> | null;
};

declare type TreeProps<TItem = TreeItem> = UseTreeProps<TItem> & TreeBaseProps<TItem> & TreeAdditionalProps<TItem> & GettersProps<TItem>;
declare type TreeHandlers<TItem = TreeItem> = Pick<UseTreeReturnProps<TItem>, 'toggleCheck' | 'toggleExpand' | 'toggleSelect' | 'toggleSelectRange'>;
declare type TreeBaseProps<TItem = TreeItem> = {
    /**
     * Размер дерева.
     */
    size?: TreeSizeType;
    /**
     * Флаг заблокированного дерева.
     */
    disabled?: boolean;
    /**
     * Флаг для выключения функциональности скрытия/раскрытия.
     */
    disableExpand?: boolean;
    /**
     * Флаг для включения функциональности чекбоксов.
     */
    checkable?: boolean;
    /**
     * Флаг для включения функциональности выбора узлов дерева.
     */
    selectable?: boolean;
    /**
     * Максимальное количество строк, которое будет отображаться в контенте узла дерева. Контент, который не помещается в заданное количество строк
     * будет скрываться за троеточием.
     */
    maxContentLines?: number;
    /**
     * Флаг для отображения иконок у узлов дерева.
     */
    showIcons?: boolean;
    /**
     * Флаг для отображения путей до элементов дерева.
     */
    showTrails?: boolean;
    /**
     * Флаг для включения половины базового отступа для узлов дерева.
     */
    withHalfLevelSpacer?: boolean;
    /**
     * Флаг для выключения возможности скрытия/раскрытия узла дерева при клике на узел.
     */
    disableFocusTreeOnItemClick?: boolean;
    /**
     * Базовый отступ узлов дерева.
     */
    levelSpacer?: number;
    /**
     * Флаг для включения функциональности множественного выбора узлов дерева. Актуально только для `selectMode="strict"` и `selectable="true"`.
     */
    multipleSelect?: boolean;
    /**
     * Флаг отключения рамки фокуса вокруг узла при нажатии на кнопку скрытия/раскрытия.
     */
    disableFocusEffectOnExpanderClick?: boolean;
    /**
     * Флаг отключения рамки фокуса вокруг узла при нажатии на чекбокс.
     */
    disableFocusEffectOnCheckboxClick?: boolean;
    /**
     * Флаг отключения рамки фокуса вокруг узла при нажатии сам узел.
     */
    disableFocusEffectOnClick?: boolean;
    /**
     * Режим фокуса на узел дерева. При значении `default` повторный фокус на дерево будет отображать рамку вокруг
     * прошлого сфокусированного узла. При значении `selected` повторный фокус на дерево будет отображать рамку вокруг первого
     * выбранного узла (при `selectable="true"`).
     */
    focusMode?: TreeFocusModeType;
    /**
     * Функция обратного вызова, которая срабатывает при нажатии клавиатуры на сфокусированном дереве.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия клавиатуры.
     * @param {TreeNodeItem<TItem>} node Выбранный узел дерева.
     * @param {TreeHandlers} Объект с функциями для работы с деревом.
     *
     * @returns Если функция возвращает значение, то поведение управления с клавиатуры по умолчанию отключается.
     */
    onTreeKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>, node: TreeNodeItem<TItem>, handlers: TreeHandlers<TItem>) => void | boolean;
    /**
     * Функция обратного вызова, которая срабатывает при нажатии кнопки мыши на узел дерева.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши.
     * @param {TreeNodeItem<TItem>} node Выбранный узел дерева.
     * @param {TreeHandlers} Объект с функциями для работы с деревом.
     *
     * @returns Если функция возвращает значение, то поведение нажатия кнопки мыши по умолчанию отключается.
     */
    onNodeClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, node: TreeNodeItem<TItem>, handlers: TreeHandlers<TItem>) => void | boolean;
    /**
     * Функция для получения HTML-свойств для кнопки скрытия/раскрытия узла дерева.
     *
     * @param {TreeNodeItem<TItem>} Узел дерева.
     */
    getExpandButtonInnerProps?: (node: TreeNodeItem<TItem>) => ComponentPropsWithRefFix<'button'>;
    /**
     * Функция для получения HTML-свойств для элемента дерева.
     *
     * @param {TreeNodeItem<TItem>} Узел дерева.
     */
    getItemInnerProps?: (node: TreeNodeItem<TItem>) => ComponentPropsWithRefFix<'li'>;
    /**
     * Функция для получения HTML-свойств для группы дочерних узлов дерева.
     *
     * @param {TreeNodeItem<TItem>} Узел дерева.
     */
    getNodeGroupInnerProps?: (node: TreeNodeItem<TItem>) => ComponentPropsWithRefFix<'ul'>;
    /**
     * Функция для получения HTML-свойств для узла дерева
     *
     * @param {TreeNodeItem<TItem>} Узел дерева.
     */
    getNodeInnerProps?: (node: TreeNodeItem<TItem>) => ComponentPropsWithRefFix<'span'>;
    /**
     * Функция для получения HTML-свойств для элемента label вокруг чекбокса
     *
     * @param {TreeNodeItem<TItem>} Узел дерева.
     */
    getLabelCheckboxInnerProps?: (node: TreeNodeItem<TItem>) => ComponentPropsWithRefFix<'label'>;
    /**
     * Флаг, или функция обратного вызова, возвращающая флаг, для выключения возможности скрытия/раскрытия узла дерева при клике на узел.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    disableExpandOnClick?: boolean | ((event: React.MouseEvent<HTMLLIElement, MouseEvent>, node: TreeNodeItem<TItem>) => boolean);
    /**
     * Флаг, или функция обратного вызова, возвращающая флаг, для включения возможности отмечать чекбокс при клике на узел.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    enableCheckOnClick?: boolean | ((event: React.MouseEvent<HTMLLIElement, MouseEvent>, node: TreeNodeItem<TItem>) => boolean);
    /**
     * Флаг, или функция обратного вызова, возвращающая флаг, для выключения возможности выбора дерева при клике на узел.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши.
     * @param {TreeNodeItem<TItem>} node Целевой узел дерева.
     */
    disableSelectOnClick?: boolean | ((event: React.MouseEvent<HTMLLIElement, MouseEvent>, node: TreeNodeItem<TItem>) => boolean);
    /**
     * Флаг, или объект с настройками, для включения возможности автоматической прокрутки контейнера с деревом до сфокусированного узла при управлении с клавиатуры.
     */
    enableScrollToFocusedNode?: boolean | ScrollIntoViewOptions;
};
declare type TreeAdditionalProps<TItem = TreeItem> = ComponentPropsWithRefFix<'ul'> & {
    /**
     * CSS классы компонента.
     */
    classes?: TreeClasses;
    /**
     * Свойство для переопределения компонентов `Tree`.
     */
    components?: Partial<TreeComponents<TItem>>;
    /**
     * Ссылка на компонент, содержащая функции для управления деревом.
     */
    ref?: ((instance: TreeImperativeHandlersRef<TItem> | null) => void) | React.RefObject<TreeImperativeHandlersRef<TItem>> | null;
};
declare type TreeBaseComponentProps<TItem = TreeItem> = {
    /**
     * Объект данных узла дерева.
     */
    data: TItem;
    /**
     * Глубина вложенности узла дерева.
     */
    depth: number;
    /**
     * Размер узла дерева.
     */
    size: TreeSizeType;
    /**
     * Флаг заблокированного узла дерева.
     */
    disabled: boolean;
    /**
     * Ключ узла дерева.
     */
    nodeKey: React.Key;
    /**
     * Флаг раскрытого узла дерева.
     */
    expanded: boolean;
    /**
     * Флаг выбранного узла дерева.
     */
    selected: boolean;
    /**
     * Состояние загрузки узла дерева.
     */
    loading: boolean;
};
declare type LastParentsOnLevelMap = Record<React.Key, {
    depth: undefined | number;
    parentKey: React.Key | undefined;
}>;
declare type TreeImperativeHandlersRef<TItem = TreeItem> = UseKeyboardReturnProps & TreeHandlers<TItem> & Pick<UseTreeReturnProps<TItem>, 'getTreeNodeVisibleChildren' | 'getParentRootNode'> & {
    /**
     * Получить Ref на HTML-узел дерева.
     *
     * @returns Объект-ссылка на HTML-узел дерева.
     */
    getElementRef: () => React.RefObject<HTMLElement>;
    /**
     * Получить узел дерева, который сейчас находится в фокусе.
     *
     * @returns Объект данных узла дерева.
     */
    getFocusItem: () => TreeNodeItem<TItem> | undefined;
    /**
     * Функция для прокрутки контейнера с деревом до целевого узла.
     *
     * @param {React.Key} key Ключ узла дерева.
     * @param {ScrollIntoViewOptions} options Параметры прокрутки контейнера к узлу дерева.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
     */
    scrollToNode: (key: React.Key, options?: ScrollIntoViewOptions) => void;
};
declare type GettersProps<TItem = TreeItem> = {
    /**
     * Объект функций для получения ключевых данных, необходимых для формирования метаданных узлов дерева.
     */
    getters?: Partial<TreeGetters<TItem>>;
};

/**
 * Базовый узел дерева. Используется в качестве источника данных.
 */
declare type TreeItem = {
    /**
     * Уникальный ключ узла.
     */
    key: React$1.Key;
    /**
     * Отображаемый текст.
     */
    label?: string | React$1.ReactNode;
    /**
     * Флаг заблокированного узла.
     */
    disabled?: boolean;
    /**
     * Флаг узла, для которого отключена функциональность чекбокса.
     */
    checkDisabled?: boolean;
    /**
     * Массив дочерних узлов.
     */
    children?: TreeItem[];
    /**
     * Флаг узла, для которого отключена функциональность выбора.
     */
    selectDisabled?: boolean;
    /**
     * Флаг узла, при раскрытии которого будут подгружаться новые данные.
     */
    loadable?: boolean;
};
declare type TreeNodeItemMeta = {
    /**
     * Глубина вложенности узла дерева.
     */
    depth: number;
    /**
     * Ключ родительского узла.
     */
    parentKey?: React$1.Key;
    /**
     * Ключ ближайшего дочернего узла дерева.
     */
    closestChildKey?: React$1.Key;
    /**
     * Уникальный идентификатор узла дерева.
     */
    id: string;
    /**
     * Массив ближайших крайних дочерних узлов дерева.
     */
    boundaryChildrenKeys?: string[];
    /**
     * Порядковый номер.
     */
    order: number;
    /**
     * Флаг заблокированого узла.
     */
    disabled: boolean;
    /**
     * Индекс узла дерева в массиве данных.
     */
    index: number;
};
/**
 * Элемент на основе базового узла дерева с метаинформацией и преобразованным `children`. Является возвращаемым значением.
 */
declare type TreeNodeItem<TItem = TreeItem> = Omit<TItem, 'children'> & {
    /**
     * Метаданные узла дерева
     */
    $meta: TreeNodeItemMeta;
    /**
     * Массив дочерних узлов дерева
     */
    children?: TreeNodeItem<TItem>[];
};
/**
 * Плоский объект на основе возвращаемых узлов дерева.
 */
declare type TreeNodePlain<TItem = TreeItem> = Record<React$1.Key, TreeNodeItem<TItem>>;
declare type UseTreeProps<TItem = TreeItem> = Omit<UseExpandProps<TItem>, 'treePlain' | 'allowedKeysForExpand' | 'getters'> & Omit<UseCheckProps<TItem>, 'treePlain' | 'disabledKeysForCheck' | 'getTreeItemCheckDisabled'> & Omit<UseSelectProps<TItem>, 'treePlain' | 'disabledKeysForSelect' | 'nodeKeys' | 'getIsExpanded' | 'disabledKeysForInitialSelect'> & GettersProps<TItem> & {
    /**
     * Массив данных для узлов дерева.
     */
    dataSource: TItem[];
};
declare type TreeGetters<TItem = TreeItem> = {
    /**
     * Функция для получения дочерних узлов дерева из массива данных.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Массив дочерних узлов дерева.
     */
    getTreeItemChildren: (item: TItem) => TItem[] | undefined;
    /**
     * Функция для получения ключа дерева из массива данных.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Ключ узла дерева.
     */
    getTreeItemKey: (item: TItem) => React$1.Key;
    /**
     * Функция для получения отображаемого текста у узла дерева из массива данных.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Отображаемый текст узла дерева.
     */
    getTreeItemLabel: (item: TItem) => React$1.ReactNode;
    /**
     * Функция для получения флага заблокированного узла дерева из массива данных.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Флаг заблокированного узла дерева.
     */
    getTreeItemDisabled: (item: TItem) => boolean;
    /**
     * Функция для получения флага для заблокированного чекбокса у узла дерева из массива данных.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Флаг заблокированного чекбокса узла дерева.
     */
    getTreeItemCheckDisabled: (item: TItem) => boolean;
    /**
     * Функция для получения флага для узла дерева, недоступного для выбора.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Флаг недоступного для выбора узла дерева.
     */
    getTreeItemSelectDisabled: (item: TItem) => boolean;
    /**
     * Функция для получения признака необходимости подгрузки узла.
     *
     * @param {TItem} item Узел дерева.
     *
     * @returns Флаг подгружаемого узла дерева.
     */
    getTreeItemLoadable: (item: TItem) => boolean;
};
declare type UseTreeReturnProps<TItem = TreeItem> = UseExpandReturnProps & UseCheckReturnProps & UseSelectReturnProps & {
    /**
     * Массив данных для узлов дерева, содержащих дополнительную метаинформацию.
     */
    tree: TreeNodeItem<TItem>[];
    /**
     * Массив ключей узлов дерева.
     */
    nodeKeys: React$1.Key[];
    /**
     * Получить данные об узле дерева из массива по ключу.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Объект данных узла дерева.
     */
    getTreeNodeData: (key: React$1.Key) => TreeNodeItem<TItem>;
    /**
     * Получить массив данных о видимых дочерних узлах элемента дерева по ключу.
     *
     *  @param {React.Key} key Ключ узла дерева.
     *
     * @returns Массив данных дочерних узлов элемента дерева.
     */
    getTreeNodeVisibleChildren: (key: React$1.Key) => TreeNodeItem<TItem>[];
    /**
     * Получить корневой узел относительно переданного ключа узла дерева.
     *
     * @param {React.Key} key Ключ узла дерева.
     *
     * @returns Массив данных дочерних узлов элемента дерева.
     */
    getParentRootNode: (key: React$1.Key) => TreeNodeItem<TItem> | undefined;
};

declare type UseKeyboardReturnProps = {
    /**
     * Нативный обработчик нажатия клавиатуры на компоненте дерева.
     *
     * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия клавиатуры.
     */
    handleKeyDown: (event: React$1.KeyboardEvent<HTMLUListElement>) => void;
    /**
     * Нативный обработчик фокуса на компонент дерева.
     *
     * @param {React.FocusEvent<HTMLUListElement>} event Объект события фокуса.
     */
    handleFocus: (event: React$1.FocusEvent<HTMLUListElement, Element>) => void;
    /**
     * Нативный обработчик потери фокуса у компонента дерева.
     *
     * @param {React.FocusEvent<HTMLUListElement>} event Объект события фокуса.
     */
    handleBlur: (event: React$1.FocusEvent<HTMLUListElement, Element>) => void;
};

type TSelectProperties = Omit<ComboboxProps<unknown>, 'size'> & {
    labelInside?: boolean;
    tree?: boolean;
    treeProps?: Partial<TreeProps>;
    readonly?: boolean;
    size?: TComponentSizes;
    tooltip?: ReactNode | ReactNode[];
    icon?: keyof typeof EIconName;
    isComplexPart?: boolean;
    showOptionValue?: boolean;
    showOptionSearch?: boolean;
    showDroplistButtons?: boolean;
    emptyOptionsText?: string;
    optionRenderLimit?: number;
    onListSubmit?: (value: Options$1<unknown>) => void;
    testId?: string;
    iconClassName?: string;
    hideChevron?: boolean;
    showValueTooltip?: boolean;
    useCustomSearch?: boolean;
    useChips?: boolean;
    onChipRemove?: (value: string) => void;
};
interface IIndicatorProperties {
    canClear?: boolean;
    opened: boolean;
    disabled?: boolean;
    clearValue(event: ComboboxEvent): void;
}

declare const Placeholder: React__default.ForwardRefExoticComponent<{
    children: React__default.ReactNode;
    classes?: Partial<Record<"placeholder" | "disabled", string>>;
    isDisabled?: boolean;
} & CommonProps$1<unknown> & React__default.RefAttributes<HTMLDivElement>>;
declare const Select: ({ labelInside, onChange, onInputChange, tree, tooltip, icon, helperText, size, isComplexPart, value: externalValue, showOptionValue, showOptionSearch, dropdownProps, limitByWidth, noOptionsText, showDroplistButtons, optionRenderLimit, onListSubmit, testId, iconClassName, hideChevron, showValueTooltip, loadingLabel, useCustomSearch, useChips, ...properties }: TSelectProperties) => react_jsx_runtime.JSX.Element;

declare const ComboBox: (properties: TSelectProperties) => react_jsx_runtime.JSX.Element;

declare const DatePickerView: {
    readonly day: "day";
    readonly month: "month";
    readonly year: "year";
    readonly quarter: "quarter";
};
declare type DatePickerViewType = keyof typeof DatePickerView;
declare enum DateValidationError {
    invalidDate = "invalidDate",
    notAllowedDate = "notAllowedDate",
    isBeforeStartDate = "isBeforeStartDate",
    isAfterEndDate = "isAfterEndDate"
}
declare type DateValidationErrorMessages = {
    [key in DateValidationError]: string;
};

declare type Classes$a = {
    /** Стиль, применяемый к основному элементу */
    button?: string;
    /** Стиль, применяемый к элементу с `kind='contained'` */
    contained?: string;
    /** Стиль, применяемый к элементу с `kind='outlined'` */
    outlined?: string;
    /** Стиль, применяемый к элементу с `kind='ghost'` */
    ghost?: string;
    /** Стиль, применяемый к элементу с `color='primary'` */
    primary?: string;
    /** Стиль, применяемый к элементу с `color='error'` */
    error?: string;
    /** Стиль, применяемый к элементу с `color='secondary'` */
    secondary?: string;
    /** Стиль, применяемый к элементу с `size='sm'` */
    small?: string;
    /** Стиль, применяемый к элементу с `size='md'` */
    medium?: string;
    /** Стиль, применяемый к элементу с `size='lg'` */
    large?: string;
    /** Стиль, применяемый к элементу с `fullWidth='true'` */
    fullWidth?: string;
    /** Стиль, применяемый к тексту в элементе */
    text?: string;
    /** Стиль, применяемый к тексту в элементе с `size='sm'` */
    textSm?: string;
    /** Стиль, применяемый к тексту в элементе с `size='md'` */
    textMd?: string;
    /** Стиль, применяемый к тексту в элементе с `size='lg'` */
    textLg?: string;
    /** Стиль, применяемый к элементу с `disabled='true'` */
    disabled?: string;
    /**
     * Стиль, применяемый к элементу `prefixIcon` и `suffixIcon`.
     */
    icon?: string;
    /** Стиль, применяемый к элементу `prefixIcon` */
    prefixIcon?: string;
    /** Стиль, применяемый к элементу `suffixIcon` */
    suffixIcon?: string;
    /** Стиль, применяемый к элементу `prefixIcon` или `suffixIcon`, когда он является единственным дочерним компонентом  */
    singleIcon?: string;
};

declare const ButtonKinds: {
    readonly contained: "contained";
    readonly outlined: "outlined";
    readonly ghost: "ghost";
};
declare type TButtonKinds = keyof typeof ButtonKinds;
declare const ButtonColor: {
    readonly primary: "primary";
    readonly secondary: "secondary";
    readonly error: "error";
};
declare type TButtonColor = keyof typeof ButtonColor;
interface ButtonBaseProps {
    /**
     * JSS-классы для стилизации.
     */
    classes?: Partial<Classes$a>;
    /**
     * Тип кнопки.
     * Primary - стандартная,
     * ghost - текстовая,
     * outlined - контурная.
     */
    kind?: TButtonKinds;
    /**
     * Цветовая схема кнопки.
     * Primary - по умолчанию,
     * secondary - черно-белая,
     * error - предупреждающая необратимое действие.
     */
    color?: TButtonColor;
    /**
     * Размер кнопки.
     */
    size?: ElementSizeType;
    /**
     * Растянуть кнопку во всю ширину родительского контейнера.
     */
    fullWidth?: boolean;
    /**
     * Настраивает состояние кнопки отключено. В этом состоянии пользователь не может
     * взаимодействовать с кнопкой.
     */
    disabled?: boolean;
    /**
     * Свойства компонента Text.
     */
    textProps?: ComponentPropsWithAttributes<TextProps>;
    /**
     * Вспомогательный компонент перед дочерним `JSX`.
     */
    prefixIcon?: React__default.ReactNode;
    /**
     * Вспомогательный компонент после дочернего `JSX`.
     */
    suffixIcon?: React__default.ReactNode;
}

interface ButtonProps extends ButtonBaseProps, Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
}

declare type DatePickerClasses = {
    /** Стиль, применяемый к основному элементу  */
    root?: string;
    /** Стиль, применяемый к основному элементу поля ввода */
    inputRoot?: string;
    /** Стиль, применяемый к обертке поля ввода */
    inputContainer?: string;
    /** Стиль, применяемый к основному элементу в случае ошибки */
    error?: string;
    /** Стиль, применяемый к основному элементу состоянии disabled */
    disabled?: string;
    /** Стиль, применяемый к выпадашке пикера */
    calendarPickerDropdown?: string;
    /** Стиль, применяемый к основному элементу пикера времени*/
    timePickerRoot?: string;
    /** Стиль, применяемый к обертке пикера времени */
    timePickerContainer?: string;
};
declare type CalendarPickerClasses = {
    /** Стиль, применяемый к основному элементу  */
    root?: string;
    /** Стиль, применяемый к элементам навигации */
    calendarBar?: string;
    /** Стиль, применяемый к кнопкам промотки месяцев */
    chevron?: string;
    /** Стиль, применяемый к кнопки выбора месяца */
    month?: string;
    /** Стиль, применяемый к кнопке выбора года */
    year?: string;
    /** Стиль, применяемый к кнопкам выбора года/месяца при активации выбора года/месяца */
    selected?: string;
};
declare type DayViewClasses = {
    /** Стиль, применяемый к каждой строке (недели) */
    row?: string;
    /** Стиль, применяемый к выбранному дню */
    selected?: string;
    /** Стиль, применяемый к каждому заголовку дню недели */
    weekDay?: string;
    /** Стиль, применяемый к текстовому полю каждого дня */
    dayText?: string;
    /** Стиль, применяемый к кнопке каждого дня */
    dayButton?: string;
    /** Стиль, применяемый к сегодняшнему дню */
    today?: string;
    /** Стиль, применяемый к каждому дню не текущего месяца */
    notCurrentMonth?: string;
};
declare type MonthViewClasses = {
    /** Стиль, применяемый к обертке компонента */
    root?: string;
    /** Стиль, применяемый к выбранному месяцу */
    selected?: string;
    /** Стиль, применяемый к текстовому полю каждого месяца */
    monthText?: string;
    /** Стиль, применяемый к кнопке каждого месяца */
    monthButton?: string;
};
declare type QuarterViewClasses = {
    /** Стиль, применяемый к обертке компонента */
    root?: string;
    /** Стиль, применяемый к выбранному кварталу */
    selected?: string;
    /** Стиль, применяемый к текстовому полю каждого квартала */
    quarterText?: string;
    /** Стиль, применяемый к текстовому полю месяцев каждого квартала */
    quarterMonthsText?: string;
    /** Стиль, применяемый к кнопке каждого квартала */
    quarterButton?: string;
};
declare type YearViewClasses = {
    /** Стиль, применяемый к обертке компонента */
    root?: string;
    /** Стиль, применяемый к выбранному году */
    selected?: string;
    /** Стиль, применяемый к текстовому полю каждого года */
    yearText?: string;
    /** Стиль, применяемый к кнопке каждого года */
    yearButton?: string;
};
declare type RangePickerClasses = {
    /** Стиль, применяемый к основному элементу  */
    root?: string;
    /** Стиль, применяемый к обертке полей ввода */
    inputContainer?: string;
    /** Стиль, применяемый к inputContainer в случае ошибки */
    error?: string;
    /** Стиль, применяемый к inputContainer, в состоянии disabled */
    disabled?: string;
    /** Стиль, применяемый к inputContainer, в состоянии focused */
    focused?: string;
    /** Стиль, применяемый к inputContainer в случае lg размера */
    large?: string;
    /** Стиль, применяемый к inputContainer в случае sm размера */
    small?: string;
    /** Стиль, применяемый к разделителю между инпутами */
    divider?: string;
    /** Стиль, применяемый к обертке иконки календаря */
    iconContainer?: string;
    /** Стиль, применяемый к иконке ошибки в случае inputStyle="default" */
    errorIcon?: string;
    /** Стиль, применяемый к выпадающему меню с календарями */
    calendarPickerDropdown?: string;
    /**
     * Стиль, применяемый в контейнере `panelHeader`, над календарем.
     *
     * @deprecated используйте свойство `components`.
     */
    panelHeader?: string;
    /**
     * Стиль, применяемый в контейнере `panelFooter`, под календарем.
     *
     * @deprecated используйте свойство `components`.
     */
    panelFooter?: string;
};
declare type RangeMonthsViewClasses = {
    /** Стиль, применяемый к корневому элементу */
    root?: string;
    /** Стиль, применяемый к каждой строке */
    row?: string;
    /** Стиль, применяемый к выбранному месяцу */
    selected?: string;
    /** Стиль, применяемый к текстовому полю каждого месяца */
    monthText?: string;
    /** Стиль, применяемый к кнопке каждого месяца */
    monthButton?: string;
};
declare type RangeYearsViewClasses = {
    /** Стиль, применяемый к корневому элементу */
    root?: string;
    /** Стиль, применяемый к каждой строке */
    row?: string;
    /** Стиль, применяемый к выбранному году */
    selected?: string;
    /** Стиль, применяемый к текстовому полю каждого года */
    yearText?: string;
    /** Стиль, применяемый к кнопке каждого года */
    yearButton?: string;
};
declare type CalendarViewClasses = {
    /** Стиль, применяемый к каждой строке (недели) */
    row?: string;
    /** Стиль, применяемый к каждому заголовку дню недели */
    weekDay?: string;
    /** Стиль, применяемый к текстовому полю каждого дня */
    dayText?: string;
    /** Стиль, применяемый к кнопке каждого дня */
    dayButton?: string;
    /** Стиль, применяемый к кнопке сегодняшнего дня */
    todayButton?: string;
    /** Стиль, применяемый к выбранному дню */
    selected?: string;
    /** Стиль, применяемый к каждому дню не текущего месяца */
    notInMonth?: string;
    /** Стиль, применяемый к кнопке каждого дня попадающего в диапазон */
    inRange?: string;
    /** */
    hovered?: string;
    /** */
    'selected-start'?: string;
    /** */
    'selected-end'?: string;
    /** */
    'hovered-start'?: string;
    /** */
    'hovered-end'?: string;
    /** */
    startOfMonth?: string;
    /** */
    endOfMonth?: string;
    /** */
    startOfWeek?: string;
    /** */
    endOfWeek?: string;
};
declare type PanelHeaderClasses = {
    /** Стиль, применяемый к обертке компонента */
    root?: string;
    /** Стиль, применяемый к кнопкам промотки месяцев */
    chevron?: string;
    /** Стиль, применяемый к кнопки выбора месяца */
    month?: string;
    /** Стиль, применяемый к кнопке выбора года */
    year?: string;
    /** Стиль, применяемый к кнопкам выбора года/месяца при активации выбора года/месяца */
    selected?: string;
};

interface DayViewProps<TDate> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'> {
    /**
     * Список классов.
     */
    classes?: DayViewClasses;
    /**
     * Выбранная дата.
     */
    value: TDate | null;
    /**
     * Событие изменения даты.
     */
    onChange: (date: TDate) => void;
    /**
     * Функция отключения дат. Функция будет вызвана для каждой даты, которая
     * отображается в календаре. Дата будет отключена, если функция вернет true.
     */
    shouldDisableDate?: (date: TDate) => boolean;
    /**
     * Управляет отображением текущего месяца.
     *
     * Если значение не передано,
     * предположение о текущем месяце будет получено из `value`.
     *
     * Если `value` также не определено, предположение о текущем месяце
     * высчитывается относительно сегодняшнего дня по системному времени.
     */
    displayedDate?: TDate | null;
    /**
     * Событие изменения отображения текущего месяца.
     */
    onChangeMonth?: (date: TDate) => void;
    /**
     * Функция для отображения дня.
     */
    renderDay?: (params: DayParams) => React$1.ReactNode;
    /**
     * Функция для события изменения displayedDate.
     *
     * @param date
     */
    onChangeDisplayedDate?: (date: TDate) => void;
}

interface MonthViewProps<TDate> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>, Pick<DisableDateProps<TDate>, 'shouldDisableDate'> {
    /**
     * Список классов.
     */
    classes?: MonthViewClasses;
    /**
     * Выбранная дата.
     */
    value: TDate | null;
    /**
     * Событие изменения даты.
     */
    onChange: (date: TDate) => void;
    /**
     * Управляет отображением текущего месяца.
     *
     * Если значение не передано,
     * предположение о текущем месяце будет получено из `value`.
     *
     * Если `value` также не определено, предположение о текущем месяце
     * высчитывается относительно сегодняшнего дня по системному времени.
     */
    displayedDate?: TDate | null;
    /**
     * Включить автоматическую установку фокуса на выбранном или текущем месяце.
     */
    autoFocus?: boolean;
}

declare type ShouldDisableDateFunction<TDate> = (date: TDate, view?: CalendarPickerViewsKeys) => boolean;

interface BaseDatePickerProps<TDate = unknown, TMask extends string | unknown = unknown> {
    /**
     * Значение пикера.
     */
    value?: TDate | null;
    /**
     * Значение пикера по умолчанию.
     */
    defaultValue?: TDate;
    /**
     * Обработчик изменения значения.
     */
    onChange?: (value: TDate | null) => void;
    /**
     * Какие панели выбора даты доступны ('day', 'month', 'year').
     *
     * `@deprecated свойство не используется`.
     *
     */
    views?: DatePickerViewType[];
    /**
     * Формат отображения даты в инпуте.
     */
    format?: string;
    /**
     * Маска ввода.
     */
    mask?: TMask | string;
    /**
     * Сообщения ошибок при вводе некорректных дат.
     */
    validationErrorMessages?: Partial<DateValidationErrorMessages>;
    /**
     * Должен ли срабатывать onChange при вводе невалидной даты с клавиатуры.
     */
    triggerOnChangeOnInvalid?: boolean;
}
interface DisableDateProps<TDate> {
    /**
     * Минимальная допустимая дата.
     */
    minDate?: TDate;
    /**
     * Максимальная допустимая дата.
     */
    maxDate?: TDate;
    /**
     * Функция отключения дня, месяца, года или квартала.
     * Кнопка будет отключена, если функция вернет true.
     */
    shouldDisableDate?: ShouldDisableDateFunction<TDate>;
    /**
     * Функция отключения даты. Функция будет вызвана для каждого дня, который
     * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
     * Не влияет на отображения месяцев и годов.
     */
    next_shouldDisableDate?: (date: TDate) => boolean;
    /**
     * Функция отключения месяца. Функция будет вызвана для каждого дня или месяца, который
     * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
     * Не влияет на отображения годов.
     */
    next_shouldDisableMonth?: (date: TDate) => boolean;
    /**
     * Функция отключения года. Функция будет вызвана для каждого дня, месяца, года, который
     * в данный момент отображается в календаре. Дата будет отключен, если функция вернет true.
     */
    next_shouldDisableYear?: (date: TDate) => boolean;
}
interface ValidateDateProps<TDate = unknown> extends DisableDateProps<TDate> {
    /**
     * Заблокировать выбор даты в будущем.
     * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`.
     *
     * @deprecated
     */
    disableFuture?: boolean;
    /**
     * Заблокировать выбор даты в прошлом.
     * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`.
     *
     * @deprecated
     */
    disablePast?: boolean;
    /**
     * Заблокировать определенную дату.
     * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`.
     *
     * @deprecated
     */
    disableDate?: (date: TDate) => boolean;
}
declare type next_ValidateDateProps<TDate = unknown> = Pick<ValidateDateProps<TDate>, 'maxDate' | 'minDate'> & {
    /**
     * Функция отключения даты. Функция будет вызвана для каждого дня, который
     * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
     * Не влияет на отображения месяцев и годов.
     */
    shouldDisableDate?: (date: TDate) => boolean;
    /**
     * Функция отключения месяца. Функция будет вызвана для каждого дня или месяца, который
     * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
     * Не влияет на отображения годов.
     */
    shouldDisableMonth?: (date: TDate) => boolean;
    /**
     * Функция отключения года. Функция будет вызвана для каждого дня, месяца, года, который
     * в данный момент отображается в календаре. Дата будет отключен, если функция вернет true.
     */
    shouldDisableYear?: (date: TDate) => boolean;
};
declare type DayParams<TDate = unknown> = {
    /**
     * Текущая дата.
     */
    date: TDate;
    /**
     * Текущее число месяца.
     */
    value: string;
    /**
     * Событие выбора дня.
     */
    onClick: () => void;
    /**
     *  Функция фокуса на выбранном дне.
     */
    onFocus: (event: React$1.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Состояние выбранного дня.
     */
    selected?: boolean;
    /**
     * Состояние сегодняшнего дня.
     */
    isToday?: boolean;
    /**
     * Состояние текущего месяца.
     */
    isCurrentMonth?: boolean;
    /**
     * Состояние не текущего месяца.
     */
    isNotCurrentMonth?: boolean;
    /**
     * Состояние заблокированного дня.
     */
    disabled?: boolean;
};

declare type ValidateQuarterDateProps<TDate = unknown> = Pick<next_ValidateDateProps<TDate>, 'maxDate' | 'minDate' | 'shouldDisableYear'> & {
    /**
     * Функция отключения даты. Функция будет вызвана для каждого квартала, который
     * в данный момент отображается в календаре. Квартал будет отключен, если функция вернет true.
     * Не влияет на отображение годов.
     */
    shouldDisableQuarter?: (date: TDate) => boolean;
};

declare type QuarterViewProps<TDate> = Omit<ComponentPropsWithRefFix<'div'>, 'onChange'> & {
    /**
     * Функция отключения квартала.
     * Кнопка будет отключена, если функция вернет true.
     */
    shouldDisableDate?: ValidateQuarterDateProps<TDate>['shouldDisableQuarter'];
    /**
     * Список классов.
     */
    classes?: QuarterViewClasses;
    /**
     * Выбранная дата.
     */
    value: TDate | null;
    /**
     * Событие изменения даты.
     */
    onChange: (date: TDate) => void;
    /**
     * Управляет отображением текущего месяца.
     *
     * Если значение не передано,
     * предположение о текущем месяце будет получено из `value`.
     *
     * Если `value` также не определено, предположение о текущем месяце
     * высчитывается относительно сегодняшнего дня по системному времени.
     */
    displayedDate?: TDate | null;
    /**
     * Включить автоматическую установку фокуса на выбранном или текущем месяце.
     */
    autoFocus?: boolean;
};

interface YearViewProps<TDate> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>, Pick<DisableDateProps<TDate>, 'minDate' | 'maxDate' | 'shouldDisableDate'> {
    /**
     * Список классов.
     */
    classes?: YearViewClasses;
    /**
     * Выбранная дата.
     */
    value: TDate | null;
    /**
     * Событие изменения даты.
     */
    onChange: (date: TDate) => void;
    /**
     * Управляет отображением текущего месяца.
     *
     * Если значение не передано,
     * предположение о текущем месяце будет получено из `value`.
     *
     * Если `value` также не определено, предположение о текущем месяце
     * высчитывается относительно сегодняшнего дня по системному времени.
     */
    displayedDate?: TDate | null;
    /**
     * Включить автоматическую установку фокуса на выбранном или текущем годе.
     */
    autoFocus?: boolean;
}

declare type ParsableDate<TDate = unknown> = string | number | Date | null | undefined | TDate;
declare type ExistedViews = {
    [key in DatePickerViewType]: boolean;
};
/**
 * Тип для доп пропсов в календарь.
 */
declare type ExternalCalendarViewComponentsProps<TDate extends unknown> = {
    /**
     * Свойства предыдущей кнопки навигации.
     */
    prevNavigationBarButtonProps: ComponentPropsWithAttributes<Omit<ButtonProps, 'kind' | 'color' | 'className' | 'onClick' | 'children'>>;
    /**
     * Свойства следующей кнопки навигации.
     */
    nextNavigationBarButtonProps: ComponentPropsWithAttributes<Omit<ButtonProps, 'kind' | 'color' | 'className' | 'onClick' | 'children'>>;
    /**
     * Свойства кнопки месяца в панели.
     */
    monthBarButtonProps: ComponentPropsWithAttributes<Omit<ButtonProps, 'kind' | 'color' | 'className' | 'onClick' | 'children'>>;
    /**
     * Свойства кнопки года в панели.
     */
    yearBarButtonProps: ComponentPropsWithAttributes<Omit<ButtonProps, 'kind' | 'color' | 'className' | 'onClick' | 'children'>>;
    /**
     * Свойства для DayView.
     */
    dayViewProps: ComponentPropsWithAttributes<Omit<DayViewProps<TDate>, 'value' | 'displayedDate' | 'shouldDisableDate' | 'onChangeDisplayedDate' | 'onChange'>>;
    /**
     * Свойства для MonthView.
     */
    monthViewProps: ComponentPropsWithAttributes<Omit<MonthViewProps<TDate>, 'value' | 'displayedDate' | 'shouldDisableDate' | 'onChangeDisplayedDate' | 'onChange'>>;
    /**
     * Свойства для QuarterView.
     */
    quarterViewProps: ComponentPropsWithAttributes<Omit<QuarterViewProps<TDate>, 'value' | 'displayedDate' | 'shouldDisableDate' | 'onChangeDisplayedDate' | 'onChange'>>;
    /**
     * Свойства для YearView.
     */
    yearViewProps: ComponentPropsWithAttributes<Omit<YearViewProps<TDate>, 'autoFocus' | 'value' | 'displayedDate' | 'shouldDisableDate' | 'minDate' | 'maxDate' | 'onChangeDisplayedDate' | 'onChange'>>;
};
declare type ExternalCalendarViewComponentsPropsPartial<TDate extends unknown> = Partial<ExternalCalendarViewComponentsProps<TDate>>;

declare type Classes$9 = {
    /**
     *  Стиль, применяемый к основному элементу.
     *
     *  @inner
     */
    root?: string;
    /**
     *  Стиль, применяемый к элементу ввода.
     *
     *  @inner
     */
    input?: string;
    /**
     *  Стиль, применяемый с `error='true'`.
     *
     *  @inner
     */
    error?: string;
    /**
     *  Стиль, применяемый с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу в момент фокуса.
     *
     *  @inner
     */
    focused?: string;
    /**
     *  Стиль, применяемый к элементу с `size='sm'`.
     *
     *  @inner
     */
    small?: string;
    /**
     *  Стиль, применяемый к элементу с `size='lg'`.
     *
     *  @inner
     */
    large?: string;
    /**
     *  Стиль, применяемый к элементу префикса.
     *
     *  @inner
     */
    prefix?: string;
    /**
     *  Стиль, применяемый к элементу суффикса.
     *
     *  @inner
     */
    suffix?: string;
    /**
     *  Стиль, применяемый к иконке ошибки.
     *
     *  @inner
     */
    errorIcon?: string;
    /**
     *  Стиль, применяемый к контейнеру кнопки очистки поля.
     *
     *  @inner
     */
    inputClear?: string;
} & Partial<ClearButtonProps['classes']>;
declare type InputChangeReason$1 = 'input' | 'clear';
declare type InputChangeEvent$1 = React$1.ChangeEvent<HTMLInputElement>
/**
 * @deprecated Заменено на React.PointerEvent<HTMLButtonElement>.
 */
 | React$1.MouseEvent<HTMLDivElement> | React$1.PointerEvent<HTMLButtonElement>;
interface InputBaseProps$1<TCanClear extends boolean | unknown = false> extends Omit<ComponentPropsWithRefFix<'div'>, 'prefix' | 'onChange' | 'ref' | 'defaultValue'> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$9>;
    /**
     * HTML-атрибуты нативного элемента input.
     *
     * @inner
     *
     * @param inputProps.onBlur - Обработчик потери фокуса с элемента.
     * @param inputProps.onFocus — обработчик onFocus.
     * @param inputProps.maxLength — максимальная длина вводимого значения.
     * @param inputProps — остальные нативные атрибуты элемента input.
     */
    inputProps?: ComponentPropsWithAttributes<React$1.InputHTMLAttributes<HTMLInputElement> & Pick<ComponentPropsWithRefFix<'input'>, 'ref'>>;
    /**
     * Ссылка на нативный элемент input.
     */
    inputRef?: React$1.RefCallback<HTMLInputElement> | React$1.MutableRefObject<HTMLInputElement | null> | null;
    /**
     * Растянуть компонент на всю ширину контейнера.
     *
     * @inner
     */
    fullWidth?: boolean;
    /**
     * Поле содержит ошибку.
     *
     * @inner
     */
    error?: boolean;
    /**
     * Размер поля.
     *
     * @inner
     */
    size?: ElementSizeType;
    /**
     * Вспомогательный элемент перед полем ввода.
     *
     * @inner
     */
    prefix?: React$1.ReactNode;
    /**
     * Вспомогательный элемент после поля ввода.
     *
     * @inner
     */
    suffix?: React$1.ReactNode;
    /**
     * Поле заблокировано для ввода.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Использовать ли нативное css-свойство text-overflow со значением ellipsis.
     *
     * @inner
     */
    ellipsis?: boolean;
    /**
     * Подсказка внутри поля, если не введен текст.
     *
     * @inner
     */
    placeholder?: string;
    /**
     * Значение поля.
     *
     * @inner
     */
    value?: React$1.ReactText | null;
    /**
     * Флаг для очищения всего поля.
     *
     * @inner
     */
    canClear?: TCanClear | boolean;
    /**
     * Обработчик события изменения значения поля. <br/>.
     *
     * @param `value` Измененное значение. <br/>.
     * @param `event` - Инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
     * или тип `InputChangeReason`, если флаг `canClear` равен `true` <br/>.
     * @param `reason` Тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки.
     *
     * @returns
     */
    onChange?: TCanClear extends true ? (value: string, event: InputChangeEvent$1, reason?: InputChangeReason$1) => void : (value: string, event: React$1.ChangeEvent<HTMLInputElement>, reason?: InputChangeReason$1) => void;
    /**
     * Показать дополнительную иконку ошибки.
     *
     * @inner
     */
    showErrorIcon?: boolean;
    /**
     * Свойства компонента Tooltip для иконки ошибки.
     *
     * @inner
     */
    errorIconTooltipProps?: ComponentPropsWithAttributes<Omit<TooltipProps, 'children'>>;
    /**
     * Обработчик изменения фокуса.
     *
     * @returns
     */
    onFocusChange?: (focused: boolean) => void;
    /**
     * Иконка для кнопки очистки поля.
     *
     * @inner
     */
    clearIcon?: React$1.ReactNode;
    /**
     * Обработчик нажатия на кнопку очистки поля.
     *
     * @returns
     */
    onClear?: () => void;
    /**
     * HTML-атрибуты для кнопки очистки поля.
     *
     * @inner
     */
    clearButtonInnerProps?: ComponentPropsWithAttributes<ClearButtonProps['innerProps']>;
    /**
     * Значение по умолчанию.
     *
     * @inner
     */
    defaultValue?: string | number | null;
}

declare type Classes$8 = {
    /**
     *  Стиль, применяемый к контейнеру.
     *
     *  @inner
     */
    container?: string;
    /**
     *  Стиль, применяемый к основе поле ввода.
     *
     *  @inner
     */
    inputContainer?: string;
    /**
     *  Стиль, применяемый к элементу ввода.
     *
     *  @inner
     */
    input?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='sm'`.
     *
     *  @inner
     */
    inputSmall?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='md'`.
     *
     *  @inner
     */
    inputMedium?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='lg'`.
     *
     *  @inner
     */
    inputLarge?: string;
    /**
     * Стиль, применяемый с `error='true'`.
     *
     * @inner
     */
    error?: string;
    /**
     *  Стиль, применяемый с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу в момент фокуса.
     *
     *  @inner
     */
    focused?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='sm'`.
     *
     *  @inner
     */
    small?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='md'`.
     *
     *  @inner
     */
    medium?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='lg'`.
     *
     *  @inner
     */
    large?: string;
    /**
     *  Стиль, применяемый к элементу префикса.
     *
     *  @inner
     */
    prefix?: string;
    /**
     *  Стиль, применяемый к элементу суффикса.
     *
     *  @inner
     */
    suffix?: string;
    /**
     *  Стиль, применяемый к контейнеру кнопки очистки поля.
     *
     *  @inner
     */
    inputClear?: string;
};

interface InputProps$1<TCanClear extends boolean | unknown = false> extends Omit<InputBaseProps$1<TCanClear>, 'onFocusChange'>, Omit<LabelledProps, 'children' | 'classes'> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$8> & Partial<ClearButtonProps['classes']>;
    /**
     * Список классов для компонента Labelled.
     *
     * @inner
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Показывать ли счетчик введенных символов.
     *
     * @inner
     */
    showCount?: boolean;
    /**
     * Функция для форматирования счетчика введенных символов.
     *
     * @param {React.ReactText | null} value Значение поля.
     * @param {number} maxLength Максимально возможное количество символов для отображения.
     *
     * @returns {string} Форматированная строка для отображения счетчика введенных символов.
     */
    formatCount?: (value?: React$1.ReactText | null, maxLength?: number) => string;
}

interface StringHashMap<T> {
    [key: string]: T;
}
interface FormatCharacterConfig {
    /**
     *
     * @returns
     */
    validate: (char: string) => boolean;
    /**
     *
     * @returns
     */
    transform?: (char: string) => string;
}
/**
 * Конфигурация для работы с маской
 * Здесь ключи - это символы маски, а значения - конфигурации для обработки символов.
 */
declare type FormatCharacters = StringHashMap<FormatCharacterConfig>;

declare type ChangeEvent<TCanClear extends boolean | unknown = false> = React$1.ChangeEvent<HTMLInputElement> | React$1.KeyboardEvent<HTMLInputElement> | React$1.ClipboardEvent<HTMLInputElement> | (TCanClear extends false ? never : React$1.MouseEvent<HTMLDivElement> | React$1.PointerEvent<HTMLButtonElement>);
declare type MaskedInputChangeEvent<TCanClear extends boolean | unknown = false> = ChangeEvent<TCanClear>;
interface CommonProps<TCanClear extends boolean | unknown = false> {
    /**
     * Значение поля.
     *
     * @inner
     */
    value?: React$1.ReactText | null;
    /**
     * Обработчик события изменения значения поля.
     *
     * @returns
     */
    onChange?: (value: string, event?: MaskedInputChangeEvent<TCanClear>, reason?: InputChangeReason$1) => void;
    /**
     * Маска ввода.
     *
     * @inner
     */
    mask: string;
    /**
     * Конфигурация для работы с маской.
     *
     * @inner
     */
    formatCharacters?: FormatCharacters;
    /**
     * Символ для замены незаполненного элемента маски (по умолчанию "_").
     *
     * @inner
     */
    placeholderChar?: string;
    /**
     * Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг").
     *
     * @inner
     */
    placeholderString?: string;
    /**
     * Флаг исключения символов маски из значения.
     *
     * @inner
     */
    valueWithoutMask?: boolean;
    /**
     * Флаг сохранения позиций символов при вводе/удалении.
     *
     * @inner
     */
    keepCharPositions?: boolean;
    /**
     * Флаг сохранения позиции каретки при потере фокуса.
     *
     * @inner
     */
    keepCaretPositionOnFocus?: boolean;
    /**
     * Флаг показа маски в качестве значения при пустом value.
     *
     * @inner
     */
    maskAsPlaceholder?: boolean;
    /**
     * Флаг замены символов при вводе.
     *
     * @inner
     */
    overtype?: boolean;
    /**
     * Флаг, который группирует символы с одинаковой маской.
     * После этого удаление или добавление символа внутри одной группы не влияет
     * на другие. Так же не позволяет вводить новые символы, если группа полностью
     * заполнена. При вводе символа остальные символы после него сдвигаются до
     * первого пустого места.
     *
     * @inner
     */
    groupCharShifting?: boolean;
    /**
     * Выделить весь текст при фокусе.
     *
     * @inner
     */
    autoSelectOnFocus?: boolean;
    /**
     * Свойство для форматирования текста перед вставкой из буфера обмена.
     *
     * @returns
     */
    formatClipboardData?: (text: string, selection: Selection) => string;
}

interface MaskedInputBaseProps<TCanClear extends boolean | unknown = false> extends CommonProps<TCanClear>, Omit<InputBaseProps$1<TCanClear>, 'value' | 'onChange'> {
}

declare const RangeInputStyle: {
    readonly default: "default";
    readonly divided: "divided";
};
declare type RangeInputStyleType = keyof typeof RangeInputStyle;
declare const RangeDatePanelStyle: {
    readonly single: "single";
    readonly default: "default";
    readonly divided: "divided";
};
declare type RangeDatePanelStyleType = keyof typeof RangeDatePanelStyle;

declare const BaseTimePickerView: {
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
};
declare type BaseTimePickerViewType = keyof typeof BaseTimePickerView;
declare type DisableTimeViewType = BaseTimePickerViewType | 'dayPart';
declare type DisableTime<TDate = unknown> = (date: TDate, view: DisableTimeViewType) => boolean;

declare type OptionClasses = {
    /**
     *
     */
    option?: string;
    /**
     *
     */
    optionDisabled?: string;
    /**
     *
     */
    optionSelected?: string;
};

declare type Classes$7 = OptionClasses;

declare type Classes$6 = Partial<Record<'root' | 'column', string>> & Classes$7;
declare type StaticBaseTimePickerProps<TDate = unknown> = Omit<BaseTimePickerProps<TDate>, 'value' | 'onChange'>;
interface BaseTimePickerProps<TDate = unknown> {
    /**
     * CSS классы компонента.
     */
    classes?: Classes$6;
    /**
     * Значение пикера.
     */
    value: TDate | null;
    /**
     * Обработчик изменения значения.
     */
    onChange: (value: TDate) => void;
    /**
     * Какие панели выбора даты доступны ('hours', 'minutes', 'seconds').
     *
     * `@deprecated свойство не используется`.
     */
    views?: BaseTimePickerViewType[];
    /**
     * Использовать 12-ти часовой формат (предполагает наличие еще одного столбца с выбором am/pm).
     */
    is12HoursFormat?: boolean;
    /**
     * Интервал между часами.
     */
    hoursStep?: number;
    /**
     * Интервал между минутами.
     */
    minutesStep?: number;
    /**
     * Интервал между секундами.
     */
    secondsStep?: number;
    /**
     * Интервал между миллисекндами.
     */
    millisecondsStep?: number;
    /**
     * Функции отключения конкретных значений времени.
     */
    shouldDisableTime?: DisableTime<TDate>;
    /**
     * Функция нажатия на последний столбец колонки (нужен для прокидывания каллбека закрытия).
     */
    onClickLastNumberColumn?: () => void;
}

interface CalendarPickerProps<TDate> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>, Pick<DisableDateProps<TDate>, 'minDate' | 'maxDate' | 'shouldDisableDate'> {
    /**
     * CSS классы для стилизации.
     */
    classes?: CalendarPickerClasses;
    /**
     * Выбранная дата.
     */
    value: TDate | null;
    /**
     * Указывает, с какой даты начать отображение календаря. Будет использоваться
     * при первой отрисовки компонента, если не указано свойство `value`.
     */
    defaultDisplayedDate?: TDate;
    /**
     * Определяет, что показать при первой отрисовки компонента — выбор дня, месяца или года.
     *
     * @default
     * 'day'
     */
    defaultView?: CalendarPickerViewsKeys;
    /**
     * Событие изменения даты. Срабатывает когда пользователь выбирает день,
     * месяц или год.
     */
    /**
     *
     */
    onChange: (date: TDate) => void;
    /**
     * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает день.
     */
    onChangeDay?: (date: TDate) => void;
    /**
     * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает месяц.
     */
    onChangeMonth?: (date: TDate) => void;
    /**
     * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает год.
     */
    onChangeYear?: (date: TDate) => void;
    /**
     * Функция для отображения дня.
     */
    renderDay?: (params: DayParams) => React$1.ReactNode;
    /**
     * Дополнительные пропсы для компонент DayView, MonthView, YearView, левой/правой кнопки навигации, кнопки в панеле месяц/год.
     */
    externalComponentsProps?: ExternalCalendarViewComponentsPropsPartial<TDate>;
}

declare type DatePickerCalendarProps<TDate = unknown> = {
    timePickerProps?: StaticBaseTimePickerProps<TDate>;
    timePickerContainerProps?: ComponentPropsWithRefFix<'div'>;
} & Omit<ComponentPropsWithRefFix<'div'>, 'ref' | 'onChange'> & CalendarPickerProps<TDate>;

declare type DatePickerDropdownContentProps = ComponentPropsWithRefFix<'div'>;

interface Props$2 extends ComponentPropsWithRefFix<'div'> {
}

interface Props$1<TDate = unknown> extends ValidateDateProps<TDate>, Omit<Props$2, 'onChange'> {
    /**
     * CSS классы для стилизации.
     */
    calendarViewClasses?: CalendarViewClasses;
    /**
     * CSS классы для стилизации компонента PanelHeader.
     *
     * @deprecated используйте свойство `components`
     */
    panelHeaderClasses?: PanelHeaderClasses;
    /**
     * CSS классы для стилизации компонента MonthsView.
     */
    monthsViewClasses?: RangeMonthsViewClasses;
    /**
     * CSS классы для стилизации компонента YearsView.
     */
    yearsViewClasses?: RangeYearsViewClasses;
    /**
     * Выбранный промежуток.
     */
    range: TRangeDate<TDate>;
    /**
     * Какие панели выбора даты доступны ('day', 'month', 'year').
     */
    existedViews: ExistedViews;
    /**
     * Индекс активного инпута.
     */
    activeInputIndex?: 0 | 1;
    /**
     * Обработчик изменения даты.
     */
    changeDate: (date: TRangeValue<TDate> | null, index: 0 | 1) => void;
    /**
     * Обработчик открытия пикера.
     */
    changeOpen: (value: boolean) => void;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelHeader`, над календарем.
     */
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelHeader`, над календарем.
     *
     * @deprecated используйте свойство `components`.
     *
     */
    panelHeader?: React$1.ReactNode;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelFooter`, под календарем.
     *
     * @deprecated используйте свойство `components`.
     */
    panelFooter?: React$1.ReactNode;
    /**
     * HTML-свойства для контейнера свойства `panelHeader`.
     *
     * @deprecated
     */
    panelHeaderContainerProps?: ComponentPropsWithRefFix<'div'>;
    /**
     * HTML-свойства для контейнера свойства `panelFooter`.
     *
     * @deprecated
     */
    panelFooterContainerProps?: ComponentPropsWithRefFix<'div'>;
    /**
     * CSS-классы для контейнеров `panelHeader` и `panelFooter`.
     *
     * @deprecated
     */
    classes?: Partial<Record<'panelHeader' | 'panelFooter', string>>;
    /**
     * Разрешить значение Infinity.
     */
    allowInfinity?: boolean;
}

declare type RangePickerCalendarProps<TDate = unknown> = {
    isSingleDatePanel?: boolean;
    datePanelStyle?: RangeDatePanelStyleType;
    datePanelProps: Props$1<TDate>;
} & ComponentPropsWithRefFix<'div'>;

declare type RangePickerDropdownContentProps = ComponentPropsWithRefFix$1<'div'>;

declare type DatePickerComponents = {
    Calendar: React__default.ComponentType<DatePickerCalendarProps>;
    Header: React__default.ComponentType;
    Footer: React__default.ComponentType;
    DropdownContent: React__default.ComponentType<DatePickerDropdownContentProps>;
};
declare type RangePickerComponents<TDate = unknown> = {
    Calendar: React__default.ComponentType<RangePickerCalendarProps<TDate>>;
    Header: React__default.ComponentType;
    Footer: React__default.ComponentType;
    DropdownContent: React__default.ComponentType<RangePickerDropdownContentProps>;
};
declare type DatePickerComponentsConfig = Partial<DatePickerComponents>;
declare type RangePickerComponentsConfig = Partial<RangePickerComponents>;

declare type TRangeValue<TDate = unknown> = TDate | number;
declare type TRangeDate<TDate = unknown> = [TRangeValue<TDate> | null, TRangeValue<TDate> | null];
declare type TRangeDateBackwardCompat<TDate = unknown> = [TRangeValue<TDate>, TRangeValue<TDate>];
interface BaseRangePickerProps<TDate = unknown, TMask extends string | unknown = unknown> extends Omit<BaseDatePickerProps<TDate, TMask>, 'value' | 'onChange' | 'defaultValue'> {
    /**
     * Вид инпутов пикера.
     */
    inputStyle?: RangeInputStyleType;
    /**
     * Вид панели календаря пикера.
     */
    datePanelStyle?: RangeDatePanelStyleType;
    /**
     * Значение пикера.
     */
    value?: [ParsableDate<TDate>, ParsableDate<TDate>] | null;
    /**
     * Значение пикера по умолчанию.
     */
    defaultValue?: [ParsableDate<TDate>, ParsableDate<TDate>];
    /**
     * Обработчик изменения значения.
     */
    onChange?: (value: TRangeDateBackwardCompat<TDate>) => void;
    /**
     * Поле содержит ошибку.
     */
    error?: boolean;
    /**
     * Подпись над полем ввода.
     */
    label?: React$1.ReactNode;
    /**
     * Свойства компонента InputLabel.
     */
    labelProps?: ComponentPropsWithAttributes<InputLabelProps>;
    /**
     * Подпись под полем ввода.
     */
    helperText?: React$1.ReactNode;
    /**
     * Свойства компонента InputHelperText.
     */
    helperTextProps?: ComponentPropsWithAttributes<InputHelperTextProps>;
    /**
     * Свойства компонента InputBase или MaskedInputBase начала диапазона.
     *
     * @param startInputProps.inputProps.onBlur - Обработчик потери фокуса с элемента начала диапазона.
     * @param startInputProps.inputProps.onBlur - Обработчик потери фокуса с элемента начала диапазона.
     * @param startInputProps.inputProps - Остальные нативные атрибуты элемента input.
     */
    startInputProps?: ComponentPropsWithAttributes<InputBaseProps$1 | MaskedInputBaseProps>;
    /**
     * Свойства компонента InputBase или MaskedInputBase конца диапазона.
     *
     * @param endInputProps.inputProps.onBlur - Обработчик потери фокуса с элемента конца диапазона.
     * @param endInputProps.inputProps.onBlur - Обработчик потери фокуса с элемента конца диапазона.
     * @param endInputProps.inputProps - Остальные нативные атрибуты элемента input.
     */
    endInputProps?: ComponentPropsWithAttributes<InputBaseProps$1 | MaskedInputBaseProps>;
    /**
     * Разрешить значение Infinity.
     */
    allowInfinity?: boolean;
    /**
     * Свойство для переопределения элементов `RangePicker`.
     */
    components?: DatePickerComponentsConfig;
}

declare const CalendarPickerViews: {
    readonly day: "day";
    readonly month: "month";
    readonly year: "year";
};
declare type CalendarPickerViewsKeys = keyof typeof CalendarPickerViews;

interface DatePickerProps<TDate = unknown, TMask extends string | unknown = undefined, TCanClear extends boolean | unknown = false> extends BaseDatePickerProps<TDate, TMask>, Omit<ValidateDateProps<TDate>, 'shouldDisableDate'>, Omit<ComponentPropsWithoutRefFix<'div'>, 'onChange' | 'defaultValue'>, Omit<LabelledProps, 'children' | 'classes'> {
    /**
     * CSS классы для стилизации.
     */
    classes?: DatePickerClasses;
    /**
     * Список классов для компонента Labelled.
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Список классов для компонента CalendarPicker.
     */
    calendarPickerClasses?: CalendarPickerClasses;
    /**
     * Поле содержит ошибку.
     */
    error?: boolean;
    /**
     * Свойства компонента InputBase или MaskedInputBase.
     *
     * @param inputProps.onBlur - Обработчик потери фокуса с элемента.
     * @param inputProps.onFocus — обработчик onFocus.
     * @param inputProps — остальные нативные атрибуты элемента input.
     */
    inputProps?: TMask extends string ? ComponentPropsWithAttributes<Partial<MaskedInputBaseProps<TCanClear>>> : ComponentPropsWithAttributes<InputBaseProps$1<TCanClear>>;
    /**
     * Заблокировать поле.
     */
    disabled?: boolean;
    /**
     * Размер поля.
     */
    size?: ElementSizeType;
    /**
     * Раскрыть date picker.
     */
    open?: boolean;
    /**
     * Свойства компонента Dropdown.
     */
    dropdownProps?: ComponentPropsWithAttributes<DropdownProps>;
    /**
     * Функция для отображения поля ввода.
     *
     * @param {string} params.value - Выбранное время.
     * @param {React.ReactNode} params.suffix — иконка календаря.
     * @param {(value: TDate) => void} params.onChange — событие изменения даты.
     * @param {boolean} params.disabled — состояние отключено.
     * @param {ElementSizeType} params.size — иконка календаря.
     * @param {boolean} params.error — поле содержит ошибку.
     */
    renderInput?: (params: TMask extends string ? ComponentPropsWithAttributes<Partial<MaskedInputBaseProps<TCanClear>>> : ComponentPropsWithAttributes<InputBaseProps$1<TCanClear>>) => React$1.ReactNode;
    /**
     * Функция отключения даты. Функция будет вызвана для каждой даты (дня, месяца, года), которая
     * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
     * Работает некорректно, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`.
     *
     * @param {TDate} date - Дата для проверки.
     */
    shouldDisableDate?: (date: TDate) => boolean;
    /**
     * Функция для отображения дня.
     *
     * @param {string} params.value - Текущий день.
     * @param {() => void} params.onClick — событие выбора дня.
     * @param {(event: React.FocusEvent<HTMLElement> => void} params.onFocus — функция фокуса на выбранном дне.
     * @param {boolean} params.selected — состояние выбранного дня.
     * @param {boolean} params.isToday — состояние сегодняшнего дня.
     * @param {boolean} params.isCurrentMonth — состояние текущего месяца.
     * @param {boolean} params.isNotCurrentMonth — состояние не текущего месяца.
     * @param {boolean} params.disabled — состояние заблокированного дня.
     */
    renderDay?: (params: DayParams) => React$1.ReactNode;
    /**
     * Показать ли выбор времени.
     */
    timePickerProps?: ComponentPropsWithAttributes<StaticBaseTimePickerProps<TDate>>;
    /**
     *
     */
    calendarViewExternalProps?: ExternalCalendarViewComponentsPropsPartial<TDate>;
    /**
     * Скрывать дропдаун при скролле вне дропдауна.
     */
    hideDropdownOnOutsideScroll?: boolean;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelHeader`, над календарем.
     *
     * @deprecated используйте свойство `components`
     */
    panelHeader?: React$1.ReactNode;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelFooter`, под календарем.
     *
     * @deprecated используйте свойство `components`
     */
    panelFooter?: React$1.ReactNode;
    /**
     * HTML-свойства для контейнера свойства `panelHeader`.
     *
     * @deprecated используйте свойство `components`
     */
    panelHeaderContainerProps?: ComponentPropsWithRefFix<'div'>;
    /**
     * HTML-свойства для контейнера свойства `panelFooter`.
     *
     * @deprecated используйте свойство `components`
     */
    panelFooterContainerProps?: ComponentPropsWithRefFix<'div'>;
    /**
     * Свойство для переопределения элементов `DatePicker`.
     *
     */
    components?: DatePickerComponentsConfig;
}

interface RangePickerProps<TDate = unknown, TMask extends string | unknown = undefined, TCanClear extends boolean | unknown = false> extends Omit<BaseRangePickerProps<TDate, TMask>, 'label' | 'labelProps' | 'helperText' | 'helperTextProps' | 'components'>, ValidateDateProps<TDate>, Omit<ComponentPropsWithRefFix<'div'>, 'onChange' | 'defaultValue'>, Omit<LabelledProps, 'children' | 'classes'>, Pick<Props$1<TDate>, 'calendarViewClasses' | 'panelHeaderClasses' | 'yearsViewClasses' | 'monthsViewClasses'> {
    /**
     * CSS классы для стилизации.
     */
    classes?: RangePickerClasses;
    /**
     * Список классов для компонента Labelled.
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Заблокировать поле.
     */
    disabled?: boolean;
    /**
     * Размер поля.
     */
    size?: ElementSizeType;
    /**
     * Раскрыть date picker.
     */
    open?: boolean;
    /**
     * Свойства компонента Dropdown.
     */
    dropdownProps?: ComponentPropsWithAttributes<DropdownProps>;
    /**
     * Функция для отображения поля ввода.
     */
    renderInput?: (startProps: TMask extends string ? ComponentPropsWithAttributes<Partial<MaskedInputBaseProps<TCanClear>>> : ComponentPropsWithAttributes<InputBaseProps$1<TCanClear>>, endProps: TMask extends string ? ComponentPropsWithAttributes<Partial<MaskedInputBaseProps<TCanClear>>> : ComponentPropsWithAttributes<InputBaseProps$1<TCanClear>>) => React$1.ReactNode;
    /**
     * Расширить поле на 100% ширины родителя.
     */
    fullWidth?: boolean;
    /**
     * Скрывать дропдаун при скроле вне дропдауна.
     */
    hideDropdownOnOutsideScroll?: boolean;
    /**
     * Вспомогательный элемент после поля ввода.
     */
    suffix?: React$1.ReactNode;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelHeader`, над календарем.
     *
     * @deprecated используйте свойство `components`
     */
    panelHeader?: React$1.ReactNode;
    /**
     * Пользовательский JSX, отображаемый в контейнере `panelFooter`, под календарем.
     *
     * @deprecated используйте свойство `components`
     */
    panelFooter?: React$1.ReactNode;
    /**
     * HTML-свойства для контейнера свойства `panelHeader`.
     *
     * @deprecated используйте свойство `components`
     */
    panelHeaderContainerProps?: ComponentPropsWithRefFix<'div'> | undefined;
    /**
     * HTML-свойства для контейнера свойства `panelFooter`.
     *
     * @deprecated используйте свойство `components`
     */
    panelFooterContainerProps?: ComponentPropsWithRefFix<'div'> | undefined;
    /**
     * Свойство для переопределения элементов `RangePicker`.
     *
     */
    components?: RangePickerComponentsConfig;
}

type TDatePickerSize = 'S' | 'M' | 'L' | 'XL';
interface IDatePickerProperties extends Omit<DatePickerProps<dayjs.Dayjs, string>, 'size'> {
    value: dayjs.Dayjs | null;
    disabled?: boolean;
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    label?: string;
    fullWidth?: boolean;
    readonly?: boolean;
    labelInside?: boolean;
    withoutIcon?: boolean;
    tooltip?: React__default.ReactNode | React__default.ReactNode[];
    size?: TDatePickerSize;
    showErrorIcon?: boolean;
    testId?: string;
}
declare const DatePicker: ({ label, viewOnly, labelInside, size, withoutIcon, tooltip, showErrorIcon, helperText, testId, ...properties }: IDatePickerProperties) => react_jsx_runtime.JSX.Element;

interface IRangePickerProperties extends Omit<RangePickerProps<dayjs.Dayjs>, 'size'> {
    value: [Date | dayjs.Dayjs | null, Date | dayjs.Dayjs | null];
    disabled?: boolean;
    startLabel?: string;
    endLabel?: string;
    loading?: boolean;
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    readonly?: boolean;
    size?: TDatePickerSize;
    labelInside?: boolean;
    withoutIcon?: boolean;
    tooltip?: React__default.ReactNode | React__default.ReactNode[];
    testId?: string;
    endRequired?: boolean;
}
declare const DateRangePicker: ({ disabled, endLabel, loading, startLabel, viewOnly, size, labelInside, withoutIcon, helperText, tooltip, testId, ...properties }: IRangePickerProperties) => react_jsx_runtime.JSX.Element;

type TDropListProps = Partial<OptionListProps<unknown, 'ul', 'li'>> & {
    showOptionValue?: boolean;
    showOptionSearch?: boolean;
    showDroplistButtons?: boolean;
    useCustomSearch?: boolean;
    optionRenderLimit?: number;
    onSubmit?: (value: Options$1<unknown>) => void;
    onSearch?: (value: string) => void;
    tree?: boolean;
    treeProps?: Partial<TreeProps>;
    onFirstRender?: () => void;
    testId?: string;
};
declare const Droplist: React__default.ForwardRefExoticComponent<Partial<OptionListProps<unknown, "ul", "li">> & {
    showOptionValue?: boolean;
    showOptionSearch?: boolean;
    showDroplistButtons?: boolean;
    useCustomSearch?: boolean;
    optionRenderLimit?: number;
    onSubmit?: (value: Options$1<unknown>) => void;
    onSearch?: (value: string) => void;
    tree?: boolean;
    treeProps?: Partial<TreeProps>;
    onFirstRender?: () => void;
    testId?: string;
} & React__default.RefAttributes<unknown>>;

declare type Classes$5 = {
    /**
     *  Стиль, применяемый к основному элементу.
     *
     *  @inner
     */
    root?: string;
    /**
     *  Стиль, применяемый к элементу ввода.
     *
     *  @inner
     */
    input?: string;
    /**
     *  Стиль, применяемый с `error='true'`.
     *
     *  @inner
     */
    error?: string;
    /**
     *  Стиль, применяемый с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу в момент фокуса.
     *
     *  @inner
     */
    focused?: string;
    /**
     *  Стиль, применяемый к элементу с `size='sm'`.
     *
     *  @inner
     */
    small?: string;
    /**
     *  Стиль, применяемый к элементу с `size='lg'`.
     *
     *  @inner
     */
    large?: string;
    /**
     *  Стиль, применяемый к элементу префикса.
     *
     *  @inner
     */
    prefix?: string;
    /**
     *  Стиль, применяемый к элементу суффикса.
     *
     *  @inner
     */
    suffix?: string;
    /**
     *  Стиль, применяемый к иконке ошибки.
     *
     *  @inner
     */
    errorIcon?: string;
    /**
     *  Стиль, применяемый к контейнеру кнопки очистки поля.
     *
     *  @inner
     */
    inputClear?: string;
} & Partial<ClearButtonProps['classes']>;
declare type InputChangeReason = 'input' | 'clear';
declare type InputChangeEvent = React$1.ChangeEvent<HTMLInputElement>
/**
 * @deprecated Заменено на React.PointerEvent<HTMLButtonElement>.
 */
 | React$1.MouseEvent<HTMLDivElement> | React$1.PointerEvent<HTMLButtonElement>;
interface InputBaseProps<TCanClear extends boolean | unknown = false> extends Omit<ComponentPropsWithRefFix<'div'>, 'prefix' | 'onChange' | 'ref' | 'defaultValue'> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$5>;
    /**
     * HTML-атрибуты нативного элемента input.
     *
     * @inner
     *
     * @param inputProps.onBlur - Обработчик потери фокуса с элемента.
     * @param inputProps.onFocus — обработчик onFocus.
     * @param inputProps.maxLength — максимальная длина вводимого значения.
     * @param inputProps — остальные нативные атрибуты элемента input.
     */
    inputProps?: ComponentPropsWithAttributes<React$1.InputHTMLAttributes<HTMLInputElement> & Pick<ComponentPropsWithRefFix<'input'>, 'ref'>>;
    /**
     * Ссылка на нативный элемент input.
     */
    inputRef?: React$1.RefCallback<HTMLInputElement> | React$1.MutableRefObject<HTMLInputElement | null> | null;
    /**
     * Растянуть компонент на всю ширину контейнера.
     *
     * @inner
     */
    fullWidth?: boolean;
    /**
     * Поле содержит ошибку.
     *
     * @inner
     */
    error?: boolean;
    /**
     * Размер поля.
     *
     * @inner
     */
    size?: ElementSizeType;
    /**
     * Вспомогательный элемент перед полем ввода.
     *
     * @inner
     */
    prefix?: React$1.ReactNode;
    /**
     * Вспомогательный элемент после поля ввода.
     *
     * @inner
     */
    suffix?: React$1.ReactNode;
    /**
     * Поле заблокировано для ввода.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Использовать ли нативное css-свойство text-overflow со значением ellipsis.
     *
     * @inner
     */
    ellipsis?: boolean;
    /**
     * Подсказка внутри поля, если не введен текст.
     *
     * @inner
     */
    placeholder?: string;
    /**
     * Значение поля.
     *
     * @inner
     */
    value?: React$1.ReactText | null;
    /**
     * Флаг для очищения всего поля.
     *
     * @inner
     */
    canClear?: TCanClear | boolean;
    /**
     * Обработчик события изменения значения поля. <br/>.
     *
     * @param `value` Измененное значение. <br/>.
     * @param `event` - Инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
     * или тип `InputChangeReason`, если флаг `canClear` равен `true` <br/>.
     * @param `reason` Тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки.
     *
     * @returns
     */
    onChange?: TCanClear extends true ? (value: string, event: InputChangeEvent, reason?: InputChangeReason) => void : (value: string, event: React$1.ChangeEvent<HTMLInputElement>, reason?: InputChangeReason) => void;
    /**
     * Показать дополнительную иконку ошибки.
     *
     * @inner
     */
    showErrorIcon?: boolean;
    /**
     * Свойства компонента Tooltip для иконки ошибки.
     *
     * @inner
     */
    errorIconTooltipProps?: ComponentPropsWithAttributes<Omit<TooltipProps, 'children'>>;
    /**
     * Обработчик изменения фокуса.
     *
     * @returns
     */
    onFocusChange?: (focused: boolean) => void;
    /**
     * Иконка для кнопки очистки поля.
     *
     * @inner
     */
    clearIcon?: React$1.ReactNode;
    /**
     * Обработчик нажатия на кнопку очистки поля.
     *
     * @returns
     */
    onClear?: () => void;
    /**
     * HTML-атрибуты для кнопки очистки поля.
     *
     * @inner
     */
    clearButtonInnerProps?: ComponentPropsWithAttributes<ClearButtonProps['innerProps']>;
    /**
     * Значение по умолчанию.
     *
     * @inner
     */
    defaultValue?: string | number | null;
}

declare type Classes$4 = {
    /**
     *  Стиль, применяемый к контейнеру.
     *
     *  @inner
     */
    container?: string;
    /**
     *  Стиль, применяемый к основе поле ввода.
     *
     *  @inner
     */
    inputContainer?: string;
    /**
     *  Стиль, применяемый к элементу ввода.
     *
     *  @inner
     */
    input?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='sm'`.
     *
     *  @inner
     */
    inputSmall?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='md'`.
     *
     *  @inner
     */
    inputMedium?: string;
    /**
     *  Стиль, применяемый к элементу ввода с `size='lg'`.
     *
     *  @inner
     */
    inputLarge?: string;
    /**
     * Стиль, применяемый с `error='true'`.
     *
     * @inner
     */
    error?: string;
    /**
     *  Стиль, применяемый с `disabled='true'`.
     *
     *  @inner
     */
    disabled?: string;
    /**
     *  Стиль, применяемый к элементу в момент фокуса.
     *
     *  @inner
     */
    focused?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='sm'`.
     *
     *  @inner
     */
    small?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='md'`.
     *
     *  @inner
     */
    medium?: string;
    /**
     *  Стиль, применяемый к контейнеру компонента с `size='lg'`.
     *
     *  @inner
     */
    large?: string;
    /**
     *  Стиль, применяемый к элементу префикса.
     *
     *  @inner
     */
    prefix?: string;
    /**
     *  Стиль, применяемый к элементу суффикса.
     *
     *  @inner
     */
    suffix?: string;
    /**
     *  Стиль, применяемый к контейнеру кнопки очистки поля.
     *
     *  @inner
     */
    inputClear?: string;
};

interface InputProps<TCanClear extends boolean | unknown = false> extends Omit<InputBaseProps<TCanClear>, 'onFocusChange'>, Omit<LabelledProps, 'children' | 'classes'> {
    /**
     * Список классов.
     *
     * @inner
     */
    classes?: Partial<Classes$4> & Partial<ClearButtonProps['classes']>;
    /**
     * Список классов для компонента Labelled.
     *
     * @inner
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Показывать ли счетчик введенных символов.
     *
     * @inner
     */
    showCount?: boolean;
    /**
     * Функция для форматирования счетчика введенных символов.
     *
     * @param {React.ReactText | null} value Значение поля.
     * @param {number} maxLength Максимально возможное количество символов для отображения.
     *
     * @returns {string} Форматированная строка для отображения счетчика введенных символов.
     */
    formatCount?: (value?: React$1.ReactText | null, maxLength?: number) => string;
}

interface IInputProperties extends Omit<InputProps, 'size' | 'prefix' | 'labelProps' | 'canClear'> {
    label?: string;
    labelInside?: boolean;
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    readonly?: boolean;
    size?: TComponentSizes;
    icon?: keyof typeof EIconName;
    tooltip?: ReactNode | ReactNode[];
    isComplexPart?: boolean;
    noBorder?: boolean;
    grayPrefix?: boolean;
}
declare const Input: React__default.ForwardRefExoticComponent<IInputProperties & React__default.RefAttributes<HTMLInputElement>>;

type TSearchValue = {
    value?: string;
    scope?: unknown;
};
interface IFieldSelectProperties extends IInputProperties {
    scopeProps: TSelectProperties;
    search?: TSearchValue;
    handleChange?: (value: string, scope: unknown) => void;
    grayIcon?: boolean;
    icon?: EIconName;
}
declare const FieldSelect: (props: IFieldSelectProperties) => react_jsx_runtime.JSX.Element;

interface IFieldSearchProperties extends Omit<IFieldSelectProperties, 'icon' | 'scopeProps'> {
    scopeProps?: TSelectProperties;
}
declare const FieldSearch: (props: IFieldSearchProperties) => react_jsx_runtime.JSX.Element;

declare type UploaderError = 'FILE_INVALID_TYPE';
declare type UploaderFile = {
    /**
     * Файл.
     */
    file: File;
    /**
     * Ошибка.
     */
    error?: UploaderError;
};
declare type UploaderBaseProps = {
    /**
     * Возможность загрузки нескольких файлов.
     */
    multiple?: boolean;
    /**
     * Свойства элемента input type="file".
     */
    inputProps?: ComponentPropsWithAttributes<Omit<ComponentPropsWithRefFix<'input'>, 'type' | 'accept' | 'multiple'>>;
    /**
     * Компонент Dropzone заблокирован для ввода.
     */
    disabled?: boolean;
    /**
     * Формат передаваемых файлов (https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept). Пример "image/png, image/jpg, image/jpeg".
     */
    accept?: string;
};

interface ButtonUploaderProps extends UploaderBaseProps, Omit<ButtonProps, 'onError' | 'ref'> {
    /**
     * Калбек выбора файла Выбор файла.
     */
    onUpload: (files: UploaderFile[], e: React$1.ChangeEvent<HTMLInputElement>) => void;
    /**
     *
     */
    components?: {
        /**
         *
         */
        Button?: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
    };
}

declare type DropzoneClasses = {
    /**
     * Стиль, применяемый к input.
     */
    input?: string;
    /**
     * Стиль, применяемый к контейнеру Dropzone.
     */
    dropzone?: string;
    /**
     * Стиль, применяемый к контейнеру при dragEnter'е.
     */
    dragEnter?: string;
    /**
     * Стиль при disabled.
     */
    disabled?: string;
    /**
     * Стиль при error=true.
     */
    error?: string;
};
declare type UploaderLabelClasses = {
    /**
     * Стиль для label.
     */
    label?: string;
    /**
     * Стиль для ошибки.
     */
    error?: string;
    /**
     * Стиль для описания.
     */
    description?: string;
    /**
     * Стиль для disabled.
     */
    disabled?: string;
};

declare const defaultElement$2 = "div";
declare type UploaderLabelOwnProps = {
    /**
     * Контент лейбла.
     */
    label?: React$1.ReactNode;
    /**
     * Описание.
     */
    description?: React$1.ReactNode;
    /**
     * Текст ошибки.
     */
    errorText?: React$1.ReactNode;
    /**
     * Пропсы для label.
     *
     * @param labelProps.for ID элемента, который находится в том же документе, что и элемент label.
     * @param labelProps.form Элемент формы, с которым связан label.
     * @param labelProps - Остальные свойства нативного label.
     */
    labelProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'label'>>;
    /**
     * Пропсы для description.
     */
    descriptionProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
    /**
     * Пропсы для errorText.
     */
    errorTextProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
    children: React$1.ReactNode;
    /**
     * Классы.
     */
    classes?: UploaderLabelClasses;
    /**
     * UploaderLabel задизейблен.
     */
    disabled?: boolean;
} & ComponentPropsWithRefFix<typeof defaultElement$2>;
declare type UploaderLabelProps<E extends React$1.ElementType> = PolymorphicComponentProps<E, UploaderLabelOwnProps>;

declare const defaultElement$1 = "div";
declare type DropzoneOwnProps = {
    /**
     * Обработчик события выбора файла.
     *
     * @param files
     * @param e
     */
    onUpload: (files: UploaderFile[], e: React$1.ChangeEvent<HTMLInputElement> | React$1.DragEvent<HTMLElement>) => void;
    /**
     * Dropzone содержит ошибку.
     */
    error?: boolean;
    /**
     *
     */
    children: React$1.ReactNode;
    /**
     * Классы.
     */
    classes?: DropzoneClasses;
} & ComponentPropsWithRefFix<typeof defaultElement$1> & UploaderBaseProps;

declare const ProgressSize: {
    readonly sm: "sm";
    readonly md: "md";
    readonly lg: "lg";
    readonly xlg: "xlg";
};
declare type ProgressSizeProps = keyof typeof ProgressSize;
declare type CircularClasses = {
    /** Стиль, применяемый к основному элементу */
    root?: string;
    /** Стиль, применяемый к "неопределенному" элементу */
    indeterminate?: string;
    /** Стиль, применяемый к "определенному" элементу */
    determinate?: string;
    /** Стиль, применяемый к кругу */
    circular?: string;
    /** Стиль, применяемый к задней линией (не заполненной) */
    track?: string;
    /** Стиль, применяемый к линии заполнения */
    path?: string;
    /** Стиль, применяемый к тексту, отображаемому проценты */
    percentage?: string;
};
declare type LinearClasses = {
    /** Стиль, применяемый к основному элементу */
    root?: string;
    /** Стиль, применяемый к "неопределенному" элементу */
    indeterminate?: string;
    /**
     * Стиль, применяемый к задней линией (не заполненной).
     *
     * @deprecated Оставлено для обратной совместимости, используйте `classes.track`.
     */
    barTrack?: string;
    /** Стиль, применяемый к задней линией (не заполненной) */
    track?: string;
    /**
     * Стиль, применяемый к линии заполнения.
     *
     * @deprecated Оставлено для обратной совместимости, используйте `classes.path`.
     */
    barProgress?: string;
    /** Стиль, применяемый к линии заполнения */
    path?: string;
    /** Стиль скрывающий трек заполнения */
    withoutTrack?: string;
};

interface LinearProgressProps extends Omit<ComponentPropsWithRefFix<'div'>, 'size'> {
    /**
     *
     */
    classes?: Partial<LinearClasses>;
    /**
     * Значение прогресса.
     */
    value?: number;
    /**
     * Максимальное значение (100%).
     */
    max?: number;
    /**
     * Размер прогресс бара.
     */
    size?: Exclude<ProgressSizeProps, 'xlg'>;
    /**
     * Скрыть задний фон прогресс бара.
     */
    hideTrack?: boolean;
    /**
     * Цвет линии.
     */
    color?: React$1.CSSProperties['color'];
    /**
     * Свойства элемента track.
     */
    trackProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
}

interface CircularProgressProps extends Omit<ComponentPropsWithRefFix<'div'>, 'size'> {
    /**
     *
     */
    classes?: Partial<CircularClasses>;
    /**
     * Значение прогресса.
     */
    value?: number;
    /**
     * Максимальное значение (100%).
     */
    max?: number;
    /**
     * Размер прогресс бара.
     */
    size?: ProgressSizeProps | number;
    /**
     * Настройка размеров прогресс бара.
     */
    sizesConfig?: Record<ProgressSizeProps, number>;
    /**
     * Скрыть задний фон прогресс бара.
     */
    hideTrack?: boolean;
    /**
     * Толщина линии.
     */
    thickness?: number;
    /**
     * Отображение прогресса загрузки внутри круга.
     */
    percentageInsideCircle?: React$1.ReactNode;
    /**
     * Цвет окружности.
     */
    color?: React$1.CSSProperties['color'];
}

/**
 * Статус файла.
 */
declare type FileStatus = 'error' | 'success' | 'progress';
/**
 * Тип прогресса.
 */
declare type ProgressType = 'circular' | 'linear';
interface FileItemIconProps extends React__default.SVGAttributes<SVGElement> {
}
declare type Component<P> = React__default.ComponentType<P> | React__default.ForwardRefExoticComponent<P>;
declare type FileItemComponents = {
    /**
     *
     */
    ExitIcon: Component<FileItemIconProps>;
    /**
     *
     */
    SuccessIcon: Component<FileItemIconProps>;
    /**
     *
     */
    ErrorIcon: Component<FileItemIconProps>;
    /**
     *
     */
    LinearProgress: Component<LinearProgressProps>;
    /**
     *
     */
    CircularProgress: Component<CircularProgressProps>;
};

declare type FileItemClasses = {
    /**
     * Стиль, применяемый к основному элементу.
     */
    root?: string;
    /**
     * Стиль для контейнера внутри root.
     */
    container?: string;
    /**
     * Стиль для содержимого элемента.
     */
    content?: string;
    /**
     * Стиль для поля info (слева от статуса).
     */
    info?: string;
    /**
     * Стиль для элемента статуса.
     */
    status?: string;
    /**
     * Стиль для status=error.
     */
    error?: string;
    /**
     * Стиль для status=success.
     */
    success?: string;
    /**
     * Стиль для status=progress.
     */
    progress?: string;
    /**
     * Стиль для текста ошибки.
     */
    errorText?: string;
    /**
     * Стиль для линейного прогресса (LinearProgress).
     */
    linearProgress?: string;
    /**
     * Стиль для size='sm'.
     */
    sm?: string;
    /**
     * Стиль для size='md'.
     */
    md?: string;
    /**
     * Стиль для size='lg'.
     */
    lg?: string;
};

declare const defaultElement = "div";
declare type FileItemOwnProps = {
    /**
     * Размер элемента.
     */
    size?: ElementSizeType;
    /**
     *
     */
    children: React$1.ReactNode;
    /**
     * Статус success | error | progress.
     */
    status?: FileStatus;
    /**
     *
     */
    classes?: FileItemClasses;
    /**
     * Калбек для кнопки с крестиком.
     */
    onCancel?: React$1.MouseEventHandler<HTMLButtonElement>;
    /**
     * Тип прогресса. Используется при status='progress'
     * circular - круговой загрузчик
     * linear - линейный загрузчик.
     */
    progressType?: ProgressType;
    /**
     * Текст ошибки.
     */
    errorText?: React$1.ReactNode;
    /**
     * Число прогресса. Используется при status='progress'.
     */
    progress?: number;
    /**
     * Контент инфо.
     */
    info?: React$1.ReactNode;
    /**
     * Рендер проп для дополнительных кнопок-иконок.
     *
     * @param props
     */
    renderIconButtons?: (props: {
        /**
         *
         */
        size: ElementSizeType;
    }) => React$1.ReactNode;
    /**
     * Проп для замены иконок и внутренних компонент.
     */
    components?: Partial<FileItemComponents>;
} & ComponentPropsWithRefFix<typeof defaultElement>;

type TButtonUploaderProps = IButtonProperties & UploaderBaseProps & Pick<ButtonUploaderProps, 'onUpload'>;
declare const ButtonUploader: React__default.ForwardRefExoticComponent<IButtonProperties & UploaderBaseProps & Pick<ButtonUploaderProps, "onUpload"> & React__default.RefAttributes<HTMLButtonElement>>;

type VUploaderLabelProps = Omit<UploaderLabelProps<'div'>, 'classes' | 'labelProps' | 'descriptionProps' | 'errorTextProps' | 'as'>;
type VDropzoneProps = Omit<DropzoneOwnProps, 'children' | 'classes'>;
interface ILabelComponentProps extends VUploaderLabelProps {
    tooltip?: ReactNode | ReactNode[];
    helpText?: string;
    required?: boolean;
    fullHeight?: boolean;
}
interface IDropzoneComponentProps {
    placeholder?: string;
    linkText?: string;
    previewText?: string;
    suffix?: React__default.ReactNode;
    fullHeight?: boolean;
    actionBlock?: {
        text: string;
        actionText: string;
        buttonProps: IButtonProperties;
        backgroundIcon?: EIconName;
        onClick: () => void;
    };
}
type TDropzoneProps = VDropzoneProps & Omit<ILabelComponentProps, 'children'> & IDropzoneComponentProps;

declare const LabelComponent: React__default.ForwardRefExoticComponent<Omit<ILabelComponentProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const Dropzone: React__default.ForwardRefExoticComponent<Omit<TDropzoneProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** Информация о файле */
interface IFileProps {
    /** Идентификатор файла из ЕСМ */
    fileId: string;
    /** Название файла */
    filename?: string;
    /**
     * Размер загруженного файла в байтах
     * @format int64
     * @example 14939
     */
    size?: number;
    /**
     * Расширение загруженного файла
     * @example "xlsx"
     */
    extension?: string;
}
type TFileItemOwnProps = Omit<FileItemOwnProps, 'classes' | 'info' | 'renderIconButtons' | 'progressType' | 'status' | 'errorText'>;
type TFileItemProps = TFileItemOwnProps & {
    file: IFileProps;
    /**
     * Список строк с дополнительной информацией.
     */
    extra?: (string | React__default.ReactNode)[];
    /**
     * Строка с ошибкой.
     */
    error?: string;
    /**
     * Заголовок элемента.
     */
    title?: string;
    /**
     * Отображать кнопку удаления в одной колонке.
     */
    canRemove?: boolean;
    /**
     * Отображать кнопку скачивания в одной колонке.
     */
    canDownload?: boolean;
    /**
     * Калбек для кнопки удаления.
     */
    onRemove?: React__default.MouseEventHandler<HTMLButtonElement>;
    /**
     * Калбек для кнопки скачивания.
     */
    onDownload?: React__default.MouseEventHandler<HTMLButtonElement>;
    /**
     * Вспомогательный элемент перед полем Info
     */
    infoPrefix?: React__default.ReactNode;
    /**
     * Пропсы removeButtonProps для кнопки удаления
     */
    removeButtonProps?: Partial<ComponentPropsWithRef<'button'>>;
    /**
     * Пропсы iconProps для иконки файла
     */
    iconProps?: Partial<Omit<IFileIconProps, 'extension' | 'error'>>;
    /**
     * Флаг для дизайна адаптированного под чат
     */
    chat?: boolean;
    /**
     * id для тестового data-атрибута
     */
    testId?: string;
};
interface IFileIconProps extends ComponentPropsWithRef<'div'> {
    extension: string;
    error?: boolean;
    stroke?: boolean;
}
type TFileExtrasProps = {
    items?: (string | React__default.ReactNode)[];
    error?: string;
};
declare enum EFileType {
    default = "file",
    excel = "xlsx",
    word = "docx",
    pdf = "pdf",
    archive = "archive",
    powerPoint = "powerPoint"
}
declare const fileIconMap: {
    [key in EFileType as string]: keyof typeof EIconName;
};
declare const fileIconFilledMap: {
    [key in EFileType as string]: keyof typeof EIconName;
};
declare enum EFileSizeUnit {
    bytes = "\u0431\u0430\u0439\u0442",
    KB = "\u041A\u0431",
    MB = "\u041C\u0431"
}
declare const fileActionSize: Record<ElementSizeType, TButtonSizes>;

declare const FileItem: React__default.ForwardRefExoticComponent<Omit<TFileItemProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

declare function checkFileType(extension: string): string;
declare const KBYTES_PER_BYTE = 1024;
declare const MBYTES_PER_BYTE: number;
declare const bytesMoreOneMB: (bytes: number) => boolean;
declare const bytesMoreOneKB: (bytes: number) => boolean;
declare const convertBytesToMB: (bytes: number) => number;
declare const pluralizeBytes: (bytes: number) => string;

declare enum EAlign {
    top = "top",
    middle = "middle",
    bottom = "bottom",
    baseline = "baseline",
    stretch = "stretch"
}
declare enum EJustifyContent {
    start = "start",
    end = "end",
    center = "center",
    around = "around",
    between = "between",
    stretch = "stretch"
}
declare enum EDirection {
    row = "row",
    column = "column"
}
type TRowProps = {
    align?: keyof typeof EAlign;
    justify?: keyof typeof EJustifyContent;
    direction?: keyof typeof EDirection;
    mb?: number;
    wrap?: boolean;
    noFlex?: boolean;
    gutter?: number | [number, number] | [number, number, number] | [number, number, number, number];
} & React__default.DetailedHTMLProps<React__default.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
declare const colSpanValues: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
type TColProps = {
    span?: (typeof colSpanValues)[number];
} & React__default.DetailedHTMLProps<React__default.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

declare const Col: ({ children, span, ...properties }: TColProps) => react_jsx_runtime.JSX.Element;

declare const Row: React__default.ForwardRefExoticComponent<Omit<TRowProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

type TSize = 'sm' | 'md' | 'lg' | 'xlg';
declare enum EVariant {
    Fill = "fill",
    Stroke = "stroke"
}
type TVariant = typeof EVariant;
type TIconProperties = {
    name: keyof typeof EIconName;
    width?: number;
    height?: number;
    stroke?: string;
    iconStyles?: React__default.CSSProperties;
    variant?: EVariant;
    title?: string;
    inline?: boolean;
    size?: TSize;
    onClick?: (event: React__default.MouseEvent<HTMLDivElement>) => void;
} & React__default.HTMLAttributes<HTMLDivElement>;
interface ISvgProperties {
    variant: TVariant;
    width: number;
    height: number;
}

/** Реализовать через контекст */
declare const Icon: (properties: TIconProperties) => react_jsx_runtime.JSX.Element | null;

interface IInfoDisplayProperties {
    title: string | React__default.ReactElement;
    prefix?: React__default.ReactElement;
    suffix?: React__default.ReactElement;
    description?: string | React__default.ReactElement;
    inverse?: boolean;
}
declare const InfoDisplay: ({ className, description, inverse, prefix, suffix, title, ...props }: IInfoDisplayProperties & Omit<React__default.HTMLAttributes<HTMLDivElement>, "prefix" | "title">) => react_jsx_runtime.JSX.Element;

interface IInputProps extends Omit<React__default.ComponentProps<typeof Input>, 'onChange'> {
    onChange?: (value: InputMask$1<FactoryOpts>['value'], unmaskedValue?: InputMask$1<FactoryOpts>['unmaskedValue']) => void;
}
interface IMaskedInputProps extends IInputProps {
    maskOptions: FactoryOpts;
    clearIncomplete?: boolean;
}
/**
 * Masked Input Component
 * @see {@link https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask}
 */
declare const InputMask: React__default.ForwardRefExoticComponent<Omit<IMaskedInputProps, "ref"> & React__default.RefAttributes<HTMLInputElement>>;

declare type Props<TCanClear extends boolean | unknown = false, TValueType extends 'string' | 'number' | unknown = 'number'> = {
    /**
     * Число знаков после запятой.
     */
    precision?: number;
    /**
     * Десятичный разделитель.
     */
    decimalSeparator?: string;
    /**
     * Разделитель групп.
     */
    groupSeparator?: string;
    /**
     * Тип возвращаемого и передавемого значения.
     */
    valueType?: TValueType | 'string' | 'number';
    /**
     * Значение поля ввода.
     */
    value?: TValueType extends 'string' ? string | null : number | null;
    /**
     * Обработчик события изменения. <br/>.
     *
     * @param `value` Измененное значение. <br/>.
     * @param `event` - Инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
     * или тип `InputChangeEvent`, если флаг `canClear` равен `true` <br/>.
     * @param `reason` Тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки.
     */
    onChange?: TCanClear extends true ? (value: TValueType extends 'string' ? string | null : number | null, event: InputChangeEvent$1, reason?: InputChangeReason$1) => void : (value: TValueType extends 'string' ? string | null : number | null, event: React$1.ChangeEvent<HTMLInputElement>, reason?: InputChangeReason$1) => void;
} & Omit<InputProps$1<TCanClear>, 'value' | 'onChange'>;

type TInputNumberSizes = 'S' | 'M' | 'L' | 'XL';
interface IInputNumberProperties extends Omit<Props, 'size' | 'suffix' | 'prefix' | 'labelProps' | 'canClear' | 'valueType' | 'value' | 'onChange'> {
    label?: string;
    labelInside?: boolean;
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    readonly?: boolean;
    noArrows?: boolean;
    size?: TInputNumberSizes;
    icon?: keyof typeof EIconName;
    tooltip?: ReactNode | ReactNode[];
    value?: number | null;
    onChange?: (value: number | null, event: InputChangeEvent, reason?: InputChangeReason) => void;
}

declare const InputNumber: (properties: IInputNumberProperties) => react_jsx_runtime.JSX.Element;

declare enum ELevelState {
    default = "default",
    low = "low",
    medium = "medium",
    high = "high",
    critical = "critical"
}
type TLevelSize = 'sm' | 'md';
interface ILevelProps extends React__default.HTMLAttributes<HTMLDivElement> {
    withBadge?: boolean;
    iconRight?: boolean;
    t?: (key: string) => string;
    size?: TLevelSize;
    state?: keyof typeof ELevelState | string;
    icon?: keyof typeof EIconName;
    variant?: keyof typeof EComponentColors;
    text?: string;
}

declare const Level: (props: ILevelProps) => react_jsx_runtime.JSX.Element;

declare enum EProgressVariant {
    success = "success",
    warning = "warning",
    danger = "danger",
    violet = "violet"
}
interface ILinearProgressProps extends LinearProgressProps {
    variant?: keyof typeof EProgressVariant;
    filled?: boolean;
}
declare const LinearProgress: (props: ILinearProgressProps) => react_jsx_runtime.JSX.Element;

interface ILoaderProps {
    color?: string;
    size?: number;
    absolute?: boolean;
    classes?: {
        container?: string;
        spinner?: string;
    };
}
declare const Loader: ({ color, size, classes, absolute, }: ILoaderProps) => react_jsx_runtime.JSX.Element;

/**
 * markdown-to-jsx is a fork of
 * [simple-markdown v0.2.2](https://github.com/Khan/simple-markdown)
 * from Khan Academy. Thank you Khan devs for making such an awesome
 * and extensible parsing infra... without it, half of the
 * optimizations here wouldn't be feasible. 🙏🏼
 */

/**
 * Analogous to `node.type`. Please note that the values here may change at any time,
 * so do not hard code against the value directly.
 */
declare const RuleType: {
    readonly blockQuote: "0";
    readonly breakLine: "1";
    readonly breakThematic: "2";
    readonly codeBlock: "3";
    readonly codeFenced: "4";
    readonly codeInline: "5";
    readonly footnote: "6";
    readonly footnoteReference: "7";
    readonly gfmTask: "8";
    readonly heading: "9";
    readonly headingSetext: "10";
    /** only available if not `disableHTMLParsing` */
    readonly htmlBlock: "11";
    readonly htmlComment: "12";
    /** only available if not `disableHTMLParsing` */
    readonly htmlSelfClosing: "13";
    readonly image: "14";
    readonly link: "15";
    /** emits a `link` 'node', does not render directly */
    readonly linkAngleBraceStyleDetector: "16";
    /** emits a `link` 'node', does not render directly */
    readonly linkBareUrlDetector: "17";
    /** emits a `link` 'node', does not render directly */
    readonly linkMailtoDetector: "18";
    readonly newlineCoalescer: "19";
    readonly orderedList: "20";
    readonly paragraph: "21";
    readonly ref: "22";
    readonly refImage: "23";
    readonly refLink: "24";
    readonly table: "25";
    readonly tableSeparator: "26";
    readonly text: "27";
    readonly textBolded: "28";
    readonly textEmphasized: "29";
    readonly textEscaped: "30";
    readonly textMarked: "31";
    readonly textStrikethroughed: "32";
    readonly unorderedList: "33";
};
type RuleType = (typeof RuleType)[keyof typeof RuleType];
declare const Priority: {
    /**
     * anything that must scan the tree before everything else
     */
    MAX: number;
    /**
     * scans for block-level constructs
     */
    HIGH: number;
    /**
     * inline w/ more priority than other inline
     */
    MED: number;
    /**
     * inline elements
     */
    LOW: number;
    /**
     * bare text and stuff that is considered leftovers
     */
    MIN: number;
};
declare namespace MarkdownToJSX {
    /**
     * RequireAtLeastOne<{ ... }> <- only requires at least one key
     */
    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];
    export type CreateElement = typeof React$1.createElement;
    export type HTMLTags = keyof React$1.JSX.IntrinsicElements;
    export type State = {
        /** true if the current content is inside anchor link grammar */
        inAnchor?: boolean;
        /** true if parsing in an HTML context */
        inHTML?: boolean;
        /** true if parsing in an inline context (subset of rules around formatting and links) */
        inline?: boolean;
        /** true if in a table */
        inTable?: boolean;
        /** use this for the `key` prop */
        key?: React$1.Key;
        /** true if in a list */
        list?: boolean;
        /** used for lookbacks */
        prevCapture?: string;
        /** true if parsing in inline context w/o links */
        simple?: boolean;
    };
    export interface BlockQuoteNode {
        alert?: string;
        children: MarkdownToJSX.ParserResult[];
        type: typeof RuleType.blockQuote;
    }
    export interface BreakLineNode {
        type: typeof RuleType.breakLine;
    }
    export interface BreakThematicNode {
        type: typeof RuleType.breakThematic;
    }
    export interface CodeBlockNode {
        type: typeof RuleType.codeBlock;
        attrs?: React$1.JSX.IntrinsicAttributes;
        lang?: string;
        text: string;
    }
    export interface CodeFencedNode {
        type: typeof RuleType.codeFenced;
    }
    export interface CodeInlineNode {
        type: typeof RuleType.codeInline;
        text: string;
    }
    export interface FootnoteNode {
        type: typeof RuleType.footnote;
    }
    export interface FootnoteReferenceNode {
        type: typeof RuleType.footnoteReference;
        target: string;
        text: string;
    }
    export interface GFMTaskNode {
        type: typeof RuleType.gfmTask;
        completed: boolean;
    }
    export interface HeadingNode {
        type: typeof RuleType.heading;
        children: MarkdownToJSX.ParserResult[];
        id: string;
        level: 1 | 2 | 3 | 4 | 5 | 6;
    }
    export interface HeadingSetextNode {
        type: typeof RuleType.headingSetext;
    }
    export interface HTMLCommentNode {
        type: typeof RuleType.htmlComment;
    }
    export interface ImageNode {
        type: typeof RuleType.image;
        alt?: string;
        target: string;
        title?: string;
    }
    export interface LinkNode {
        type: typeof RuleType.link;
        children: MarkdownToJSX.ParserResult[];
        target: string;
        title?: string;
    }
    export interface LinkAngleBraceNode {
        type: typeof RuleType.linkAngleBraceStyleDetector;
    }
    export interface LinkBareURLNode {
        type: typeof RuleType.linkBareUrlDetector;
    }
    export interface LinkMailtoNode {
        type: typeof RuleType.linkMailtoDetector;
    }
    export interface OrderedListNode {
        type: typeof RuleType.orderedList;
        items: MarkdownToJSX.ParserResult[][];
        ordered: true;
        start?: number;
    }
    export interface UnorderedListNode {
        type: typeof RuleType.unorderedList;
        items: MarkdownToJSX.ParserResult[][];
        ordered: false;
    }
    export interface NewlineNode {
        type: typeof RuleType.newlineCoalescer;
    }
    export interface ParagraphNode {
        type: typeof RuleType.paragraph;
        children: MarkdownToJSX.ParserResult[];
    }
    export interface ReferenceNode {
        type: typeof RuleType.ref;
    }
    export interface ReferenceImageNode {
        type: typeof RuleType.refImage;
        alt?: string;
        ref: string;
    }
    export interface ReferenceLinkNode {
        type: typeof RuleType.refLink;
        children: MarkdownToJSX.ParserResult[];
        fallbackChildren: string;
        ref: string;
    }
    export interface TableNode {
        type: typeof RuleType.table;
        /**
         * alignment for each table column
         */
        align: ('left' | 'right' | 'center')[];
        cells: MarkdownToJSX.ParserResult[][][];
        header: MarkdownToJSX.ParserResult[][];
    }
    export interface TableSeparatorNode {
        type: typeof RuleType.tableSeparator;
    }
    export interface TextNode {
        type: typeof RuleType.text;
        text: string;
    }
    export interface BoldTextNode {
        type: typeof RuleType.textBolded;
        children: MarkdownToJSX.ParserResult[];
    }
    export interface ItalicTextNode {
        type: typeof RuleType.textEmphasized;
        children: MarkdownToJSX.ParserResult[];
    }
    export interface EscapedTextNode {
        type: typeof RuleType.textEscaped;
    }
    export interface MarkedTextNode {
        type: typeof RuleType.textMarked;
        children: MarkdownToJSX.ParserResult[];
    }
    export interface StrikethroughTextNode {
        type: typeof RuleType.textStrikethroughed;
        children: MarkdownToJSX.ParserResult[];
    }
    export interface HTMLNode {
        type: typeof RuleType.htmlBlock;
        attrs: React$1.JSX.IntrinsicAttributes;
        children?: ReturnType<MarkdownToJSX.NestedParser> | undefined;
        noInnerParse: Boolean;
        tag: MarkdownToJSX.HTMLTags;
        text?: string | undefined;
    }
    export interface HTMLSelfClosingNode {
        type: typeof RuleType.htmlSelfClosing;
        attrs: React$1.JSX.IntrinsicAttributes;
        tag: string;
    }
    export type ParserResult = BlockQuoteNode | BreakLineNode | BreakThematicNode | CodeBlockNode | CodeFencedNode | CodeInlineNode | FootnoteNode | FootnoteReferenceNode | GFMTaskNode | HeadingNode | HeadingSetextNode | HTMLCommentNode | ImageNode | LinkNode | LinkAngleBraceNode | LinkBareURLNode | LinkMailtoNode | OrderedListNode | UnorderedListNode | NewlineNode | ParagraphNode | ReferenceNode | ReferenceImageNode | ReferenceLinkNode | TableNode | TableSeparatorNode | TextNode | BoldTextNode | ItalicTextNode | EscapedTextNode | MarkedTextNode | StrikethroughTextNode | HTMLNode | HTMLSelfClosingNode;
    export type NestedParser = (input: string, state?: MarkdownToJSX.State) => MarkdownToJSX.ParserResult[];
    export type Parser<ParserOutput> = (capture: RegExpMatchArray, nestedParse: NestedParser, state?: MarkdownToJSX.State) => ParserOutput;
    export type RuleOutput = (ast: MarkdownToJSX.ParserResult | MarkdownToJSX.ParserResult[], state: MarkdownToJSX.State) => React$1.JSX.Element;
    export type Rule<ParserOutput = MarkdownToJSX.ParserResult> = {
        _match: (source: string, state: MarkdownToJSX.State, prevCapturedString?: string) => RegExpMatchArray;
        _order: (typeof Priority)[keyof typeof Priority];
        _parse: MarkdownToJSX.Parser<Omit<ParserOutput, 'type'>>;
        /**
         * Optional fast check that can quickly determine if this rule
         * should even be attempted. Should check the start of the source string
         * for quick patterns without expensive regex operations.
         *
         * @param source The input source string (already trimmed of leading whitespace)
         * @param state Current parser state
         * @returns true if the rule should be attempted, false to skip
         */
        _qualify?: string[] | ((source: string, state: MarkdownToJSX.State) => boolean);
        _render?: (node: ParserOutput, 
        /**
         * Continue rendering AST nodes if applicable.
         */
        render: RuleOutput, state?: MarkdownToJSX.State) => React$1.ReactNode;
    };
    export type Rules = {
        [K in ParserResult['type']]: K extends typeof RuleType.table ? Rule<Extract<ParserResult, {
            type: K | typeof RuleType.paragraph;
        }>> : Rule<Extract<ParserResult, {
            type: K;
        }>>;
    };
    export type Override = RequireAtLeastOne<{
        component: React$1.ElementType;
        props: Object;
    }> | React$1.ElementType;
    export type Overrides = {
        [tag in HTMLTags]?: Override;
    } & {
        [customComponent: string]: Override;
    };
    export type Options = Partial<{
        /**
         * Ultimate control over the output of all rendered JSX.
         */
        createElement: (tag: Parameters<CreateElement>[0], props: React$1.JSX.IntrinsicAttributes, ...children: React$1.ReactNode[]) => React$1.ReactNode;
        /**
         * The library automatically generates an anchor tag for bare URLs included in the markdown
         * document, but this behavior can be disabled if desired.
         */
        disableAutoLink: boolean;
        /**
         * Disable the compiler's best-effort transcription of provided raw HTML
         * into JSX-equivalent. This is the functionality that prevents the need to
         * use `dangerouslySetInnerHTML` in React.
         */
        disableParsingRawHTML: boolean;
        /**
         * Forces the compiler to have space between hash sign and the header text which
         * is explicitly stated in the most of the markdown specs.
         * https://github.github.com/gfm/#atx-heading
         * `The opening sequence of # characters must be followed by a space or by the end of line.`
         */
        enforceAtxHeadings: boolean;
        /**
         * Forces the compiler to always output content with a block-level wrapper
         * (`<p>` or any block-level syntax your markdown already contains.)
         */
        forceBlock: boolean;
        /**
         * Forces the compiler to always output content with an inline wrapper (`<span>`)
         */
        forceInline: boolean;
        /**
         * Forces the compiler to wrap results, even if there is only a single
         * child or no children.
         */
        forceWrapper: boolean;
        /**
         * Supply additional HTML entity: unicode replacement mappings.
         *
         * Pass only the inner part of the entity as the key,
         * e.g. `&le;` -> `{ "le": "\u2264" }`
         *
         * By default
         * the following entities are replaced with their unicode equivalents:
         *
         * ```
         * &amp;
         * &apos;
         * &gt;
         * &lt;
         * &nbsp;
         * &quot;
         * ```
         */
        namedCodesToUnicode: {
            [key: string]: string;
        };
        /**
         * Selectively control the output of particular HTML tags as they would be
         * emitted by the compiler.
         */
        overrides: Overrides;
        /**
         * Allows for full control over rendering of particular rules.
         * For example, to implement a LaTeX renderer such as `react-katex`:
         *
         * ```
         * renderRule(next, node, renderChildren, state) {
         *   if (node.type === RuleType.codeBlock && node.lang === 'latex') {
         *     return (
         *       <TeX as="div" key={state.key}>
         *         {String.raw`${node.text}`}
         *       </TeX>
         *     )
         *   }
         *
         *   return next();
         * }
         * ```
         *
         * Thar be dragons obviously, but you can do a lot with this
         * (have fun!) To see how things work internally, check the `render`
         * method in source for a particular rule.
         */
        renderRule: (
        /** Resume normal processing, call this function as a fallback if you are not returning custom JSX. */
        next: () => React$1.ReactNode, 
        /** the current AST node, use `RuleType` against `node.type` for identification */
        node: ParserResult, 
        /** use as `renderChildren(node.children)` for block nodes */
        renderChildren: RuleOutput, 
        /** contains `key` which should be supplied to the topmost JSX element */
        state: State) => React$1.ReactNode;
        /**
         * Override the built-in sanitizer function for URLs, etc if desired. The built-in version is available as a library export called `sanitizer`.
         */
        sanitizer: (value: string, tag: HTMLTags, attribute: string) => string | null;
        /**
         * Override normalization of non-URI-safe characters for use in generating
         * HTML IDs for anchor linking purposes.
         */
        slugify: (input: string, defaultFn: (input: string) => string) => string;
        /**
         * Declare the type of the wrapper to be used when there are multiple
         * children to render. Set to `null` to get an array of children back
         * without any wrapper, or use `React.Fragment` to get a React element
         * that won't show up in the DOM.
         */
        wrapper: React$1.ElementType | null;
    }>;
    export {  };
}

interface IMarkdownViewerProps {
    markdown?: string;
    customOptions?: MarkdownToJSX.Options;
}

declare const MarkdownViewer: ({ markdown, customOptions, }: IMarkdownViewerProps) => react_jsx_runtime.JSX.Element | null;

interface PortalProps {
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children.
     *
     * @returns
     */
    container?: (() => HTMLElement) | HTMLElement;
    /**
     * Потомки компонента.
     *
     * @inner
     */
    children?: React$1.ReactNode;
}

declare type Classes$3 = {
    /**
     * Стиль, применяемый к основному элементу.
     *
     * @inner
     */
    root?: string;
    /**
     * Стиль, применяемый к заднему фону.
     *
     * @inner
     */
    backdrop?: string;
    /**
     * Стиль, применяемый к контейнеру модального окна.
     *
     * @inner
     */
    modalContainer?: string;
    /**
     * Стиль, применяемый к содержимому модального окна.
     *
     * @inner
     */
    modalContent?: string;
};
declare type HeaderClasses = {
    /**
     * Стиль, применяемый к основному элементу.
     *
     * @inner
     */
    root?: string;
    /**
     * Стиль, применяемый к элементу с `showCloseButton='true'`.
     *
     * @inner
     */
    withCloseButton?: string;
    /**
     * Стиль, применяемый к элементу заголовка.
     *
     * @inner
     */
    title?: string;
    /**
     * Стиль, применяемый к элементу заголовка при отсутствии titleProps.
     *
     * @inner
     */
    titleTypography?: string;
    /**
     * Стиль, применяемый к элементу подзаголовка.
     *
     * @inner
     */
    subtitle?: string;
    /**
     * Стиль, применяемый к элементу подзаголовка при отсутствии subtitleProps.
     *
     * @inner
     */
    subtitleTypography?: string;
    /**
     * Стиль, применяемый к кнопке закрытия.
     *
     * @inner
     */
    closeButton?: string;
};
declare type BodyClasses = {
    /**
     * Стиль, применяемый к основному элементу.
     *
     * @inner
     */
    body?: string;
    /**
     * Стиль, применяемый к контейнеру прокрутки.
     *
     * @inner
     */
    scrollContainer?: string;
};

interface ModalStylesProps {
    /**
     * Ширина модального окна.
     *
     * @inner
     */
    width?: number | string;
}
interface ModalProps extends ModalStylesProps, ComponentPropsWithRefFix<'div'> {
    /**
     * JSS-классы для стилизации.
     *
     * @inner
     */
    classes?: Partial<Classes$3>;
    /**
     * Флаг открытия модального окна.
     *
     * @inner
     */
    open?: boolean;
    /**
     * HTML-аттрибуты элемента фона окна.
     *
     * @inner
     */
    backdropProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
    /**
     * HTML-аттрибуты элемента модального окна.
     *
     * @inner
     */
    contentProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'div'>>;
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children.
     *
     * @inner
     */
    container?: PortalProps['container'];
    /**
     * Отключить срабатывание обработчика onClose при нажатии клавиши Esc.
     *
     * @inner
     */
    disableEscapePressHandler?: boolean;
    /**
     * Отключить срабатывание обработчика onClose при клике за пределами модального окна.
     *
     * @inner
     */
    disableBackdropClickHandler?: boolean;
    /**
     * Флаг отключения подложки модального окна.
     *
     * @inner
     */
    disableBackdrop?: boolean;
    /**
     * Обработчик закрытия окна.
     *
     * @returns
     */
    onClose?: (event: React$1.MouseEvent<HTMLDivElement> | React$1.KeyboardEvent<HTMLDivElement> | React$1.MouseEvent<HTMLButtonElement> | null) => void;
    /**
     * Флаг сохранения компонента в DOM после скрытия.
     *
     * @inner
     */
    keepMounted?: boolean;
    /**
     * Определение положения модального окна по оси z.
     *
     * @inner
     */
    zIndex?: number;
}

interface ModalBodyProps extends ComponentPropsWithRefFix<'div'> {
    /**
     * JSS-классы для стилизации.
     *
     * @inner
     */
    classes?: Partial<BodyClasses>;
}

interface ModalHeaderProps extends ComponentPropsWithRefFix<'div'> {
    /**
     * JSS-классы для стилизации.
     *
     * @inner
     */
    classes?: Partial<HeaderClasses>;
    /**
     * Свойства компонента заголовка.
     *
     * @inner
     */
    titleProps?: ComponentPropsWithAttributes<TextProps>;
    /**
     * Подзаголовок модального окна.
     *
     * @inner
     */
    subtitle?: React$1.ReactNode;
    /**
     * Свойства компонента подзаголовка.
     *
     * @inner
     */
    subtitleProps?: ComponentPropsWithAttributes<TextProps>;
    /**
     * Отображать ли кнопку закрытия.
     *
     * @inner
     */
    showCloseButton?: boolean;
    /**
     * Свойства кнопки закрытия.
     *
     * @inner
     */
    closeButtonProps?: ComponentPropsWithAttributes<ButtonProps>;
}

interface ModalFooterProps extends ComponentPropsWithRefFix<'div'> {
}

declare const Modal: (properties: ModalProps) => react_jsx_runtime.JSX.Element;
declare const ModalHeader: (properties: ModalHeaderProps) => react_jsx_runtime.JSX.Element;
declare const ModalBody: (properties: ModalBodyProps) => react_jsx_runtime.JSX.Element;
interface IModalFooterProperties extends ModalFooterProps {
    noBorder?: boolean;
}
declare const ModalFooter: ({ noBorder, ...properties }: IModalFooterProperties) => react_jsx_runtime.JSX.Element;

type TMoneyInputProperties = Omit<Props, 'value' | 'onChange' | 'size'> & {
    label?: string;
    labelInside?: boolean;
    labelBold?: boolean;
    value?: number | null;
    size?: TInputNumberSizes;
    onChange?: IInputNumberProperties['onChange'];
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    readonly?: boolean;
    tooltip?: ReactNode | ReactNode[];
};
declare const MoneyInput: ({ labelBold, labelInside, onChange, viewOnly, ...properties }: TMoneyInputProperties) => react_jsx_runtime.JSX.Element;

type TMoneyRangeInputProperties = Omit<Props, 'value' | 'onChange' | 'size'> & {
    label?: string;
    labelBold?: boolean;
    value?: [number | null | undefined, number | null | undefined];
    onChange?: (value: [number | null | undefined, number | null | undefined]) => void;
    readonly?: boolean;
    size?: TComponentSizes;
};
declare const MoneyRangeInput: ({ canClear, onChange, value, size, ...properties }: TMoneyRangeInputProperties) => react_jsx_runtime.JSX.Element;

interface INoticeProps {
    title: React__default.ReactNode;
    description?: string;
    opened?: boolean;
    iconName?: EIconName;
}

declare const NoticeInner: ({ description, iconName, opened, title, }: INoticeProps) => react_jsx_runtime.JSX.Element;
declare const Notice: (props: INoticeProps) => react_jsx_runtime.JSX.Element;

declare const NotificationPosition: {
    readonly 'top-left': "top-left";
    readonly 'top-center': "top-center";
    readonly 'top-right': "top-right";
    readonly 'bottom-left': "bottom-left";
    readonly 'bottom-center': "bottom-center";
    readonly 'bottom-right': "bottom-right";
};
declare type TNotificationPosition = keyof typeof NotificationPosition;
declare const NotificationStatus: {
    readonly default: "default";
    readonly success: "success";
    readonly info: "info";
    readonly warning: "warning";
    readonly error: "error";
};
declare type TNotificationStatus = keyof typeof NotificationStatus;
interface CommonOptions {
    /**
     * Таймаут задержки закрытия сообщения в миллисекундах.
     * Чтобы отменить автоматическое закрытие, передайте false.
     *
     * @inner
     * @inner
     */
    autoClose?: number | false;
    /**
     * Приостановить таймер закрытия при наведении курсора на сообщение.
     *
     * @inner
     */
    pauseOnHover?: boolean;
    /**
     * Приостановить таймер закрытия при уходе фокуса со страницы.
     *
     * @inner
     */
    pauseOnWindowBlur?: boolean;
    /**
     * Закрыть сообщение при клике на него.
     *
     * @inner
     */
    closeOnClick?: boolean;
    /**
     * Установить позицию отображения сообщения.
     *
     * @inner
     */
    position?: TNotificationPosition;
    /**
     * Отображать иконку закрытия или нет.
     *
     * @inner
     */
    showCloseButton?: boolean;
    /**
     * Отображать вертикальную линию.
     *
     * @inner
     */
    showIndicator?: boolean;
    /**
     *  Можно ли закрывать сообщение по нажатию на кнопку Escape (accessibility).
     *
     *  @inner
     */
    closeOnEscapeKeyDown?: boolean;
    /**
     * Aria-label для close button.
     *
     * @inner
     */
    closeButtonAriaLabel?: string;
    /**
     * JSS-классы для стилизации Notification.
     *
     * @inner
     */
    classes?: Partial<NotificationClasses>;
    /**
     * Свойства кнопки закрытия.
     *
     * @inner
     */
    closeButtonProps?: ComponentPropsWithAttributes<React$1.ButtonHTMLAttributes<HTMLButtonElement>>;
    /**
     * Включить режим работы cо свойствами title, actions.
     *
     * @inner
     */
    nextNotification?: boolean;
}
declare type NotificationContainerProps<T extends React$1.ElementType = 'div'> = Omit<CommonOptions, 'classes'> & ComponentPropsWithRefFix<T> & {
    /**
     * Максимально количество одновременно отображаемых сообщений.
     *
     * @inner
     */
    limit?: number;
    /**
     * JSS-классы для стилизации Notification.
     *
     * @inner
     */
    notificationClasses?: Partial<NotificationClasses>;
};
interface NotificationOptions extends CommonOptions, Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * Статус сообщения.
     *
     * @inner
     */
    status?: TNotificationStatus;
    /**
     * Иконка для отображения.
     *
     * @inner
     */
    icon?: React$1.ReactNode;
    /**
     * Идентификатор сообщения.
     *
     * @inner
     */
    id?: string;
    /**
     * Заголовок сообщения (только при nextNotification = true).
     *
     * @inner
     */
    title?: React$1.ReactNode;
    /**
     * Блок действий сообщения (только при nextNotification = true).
     *
     * @inner
     */
    actions?: React$1.ReactNode;
    /**
     * Направление отображения сообщения (только при nextNotification = true).
     *
     * @inner
     */
    direction?: DirectionType;
    /**
     * Нативные атрибуты div.
     *
     * @inner
     */
    [key: string]: string | unknown;
}
declare type NotificationClasses = {
    /**
     *  Стиль, применяемый к элементу.
     *
     *  @inner
     */
    root?: string;
    /**
     *  Стиль, применяемый к элементу индикатора, при `showIndicator='true'`.
     *
     *  @inner
     */
    indicator?: string;
    /**
     *  Стиль, применяемый к элементу иконки.
     *
     *  @inner
     */
    icon?: string;
    /**
     *  Стиль, применяемый к элементу кнопки закрытия.
     *
     *  @inner
     */
    closeButton?: string;
    /**
     *  Стиль title (стилизуется как потомок horizontal/vertical).
     *
     *  @inner
     */
    title?: string;
    /**
     *  Стиль title при status: error.
     *
     *  @inner
     */
    titleError?: string;
    /**
     *  Стиль title при status: warning.
     *
     *  @inner
     */
    titleWarning?: string;
    /**
     *  Стиль title при status: success.
     *
     *  @inner
     */
    titleSuccess?: string;
    /**
     *  Стиль title при status: neutral.
     *
     *  @inner
     */
    titleNeutral?: string;
    /**
     *  Стиль title при status: info.
     *
     *  @inner
     */
    titleInfo?: string;
    /**
     *  Стиль content (стилизуется как потомок horizontal/vertical).
     *
     *  @inner
     */
    content?: string;
    /**
     *  Стиль content при status: error.
     *
     *  @inner
     */
    contentError?: string;
    /**
     *  Стиль content при status: warning.
     *
     *  @inner
     */
    contentWarning?: string;
    /**
     *  Стиль content при status: success.
     *
     *  @inner
     */
    contentSuccess?: string;
    /**
     *  Стиль content при status: neutral.
     *
     *  @inner
     */
    contentNeutral?: string;
    /**
     *  Стиль content при status: info.
     *
     *  @inner
     */
    contentInfo?: string;
    /**
     *  Стиль обертки title и content (стилизуется как потомок horizontal/vertical).
     *
     *  @inner
     */
    textContainer?: string;
    /**
     *  Стиль контейнера actions (стилизуется как потомок horizontal/vertical).
     *
     *  @inner
     */
    actions?: string;
    /**
     *  Стиль контейнера контента (стилизуется как потомок horizontal/vertical).
     *
     *  @inner
     */
    body?: string;
    /**
     *  Стиль при direction: horizontal.
     *
     *  @inner
     */
    horizontal?: string;
    /**
     *  Стиль при direction: vertical.
     *
     *  @inner
     */
    vertical?: string;
};

type TNotificationProps = NotificationContainerProps;
type TNotificationType = 'error' | 'success' | 'warning' | 'info' | 'discovery' | 'assistant';
interface INotificationOptions extends Omit<NotificationOptions, 'title'> {
    type: TNotificationType;
    title?: string;
}

declare const notification: (content?: string, options?: INotificationOptions) => void;
declare const Notification: (props: TNotificationProps) => react_jsx_runtime.JSX.Element;

interface IOldInputProperties extends InputProps {
    label?: string;
    labelInside?: boolean;
    labelBold?: boolean;
    secondary?: boolean;
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
    readonly?: boolean;
    testId?: string;
}
declare const OldInput: (properties: IOldInputProperties) => react_jsx_runtime.JSX.Element;

/** Интерфейс стилей для элементов скроллбара */
type TAxis = 'x' | 'y';
interface IAxisProperties extends React__default.HTMLAttributes<HTMLDivElement> {
    axis?: TAxis;
}
/** Интерфейс главного компонента */
interface IScrollbarProperties {
    /** Контент для скролла */
    children?: React__default.ReactNode;
    /** Автоматическое скрытие треков */
    autoHide?: boolean;
    className?: string;
    /** Свойства для горизонтального трека */
    trackXProps?: Omit<IAxisProperties, 'axis'>;
    /** Свойства для горизонтального ползунка */
    thumbXProps?: Omit<IAxisProperties, 'axis'>;
    /** Свойства для вертикального трека */
    trackYProps?: Omit<IAxisProperties, 'axis'>;
    /** Свойства для вертикального ползунка */
    thumbYProps?: Omit<IAxisProperties, 'axis'>;
    /** Минимальный размер ползунка */
    thumbMinSize?: number;
    /** Максимальный размер ползунка */
    thumbMaxSize?: number;
    /** Ref на контент */
    contentRef?: React__default.Ref<HTMLElement>;
    /** Время скрытия полосы прокрутки */
    timeout?: number;
    /** Максимальный размер ползунка */
    contentMaxSize?: number | string;
    /** Есть ли рамка */
    border?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

declare const OldScrollbar: React__default.ForwardRefExoticComponent<IScrollbarProperties & React__default.RefAttributes<HTMLElement>>;

interface PopupProps extends ComponentPropsWithRefFix<'div'> {
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, относительно которого рендерится Popup
     */
    anchor: (() => HTMLElement | VirtualElement) | HTMLElement | VirtualElement | null;
    /**
     * Расположение Popup
     */
    placement?: Placement;
    /**
     * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится Popup
     */
    container?: PortalProps['container'];
    /**
     * Отменить рендер попапа в контейнер и рендерить в текущем родителе
     */
    disablePortal?: boolean;
    /**
     * Оставить элемент в DOM при закрытии
     */
    keepMounted?: boolean;
    /**
     * Показать/скрыть попап
     */
    open?: boolean;
    /**
     * Модификаторы экземпляра popper.js
     */
    modifiers?: Array<Partial<Modifier<string, {
        [key: string]: any;
    }>>>;
    /**
     * Свойства экземпляра popper.js
     */
    popperOptions?: Partial<Options$2>;
    /**
     * Ссылка на экземпляр popper.js
     */
    popperRef?: React$1.Ref<Instance>;
}

interface IPopoverProps extends PopupProps {
    /**
     * @description
     * Whether to show the arrow or not. Default is true.
     */
    withArrow?: boolean;
    offset?: number;
    fallbackPlacements?: Placement[];
    title?: string;
    text?: string;
    onClose?: () => void;
}

declare const Popover: (props: IPopoverProps) => react_jsx_runtime.JSX.Element;

declare type Classes$2 = {
    /** Стиль, применяемый к основному элементу */
    control?: string;
    /** Стиль, применяемый к элементу с `disabled='true'` */
    disabled?: string;
    /** Стиль, применяемый к элементу с `checked='true'` */
    checked?: string;
    /** Стиль, применяемый к input */
    input?: string;
    /** Стиль, применяемый к обертке заливки поля */
    radio?: string;
    /** Стиль, применяемый к заливке поля */
    radioMark?: string;
};

interface RadioProps<T extends unknown = string> extends Omit<React$1.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
    /**
     * JSS-классы для стилизации.
     */
    classes?: Partial<Classes$2>;
    /**
     * Показывает выбран ли компонент.
     */
    checked?: boolean;
    /**
     * Элемент отключен.
     */
    disabled?: boolean;
    /**
     * HTML-атрибуты нативного элемента input.
     *
     * @param inputProps.onBlur - Обработчик потери фокуса с элемента.
     * @param inputProps.onFocus — обработчик onFocus.
     * @param inputProps — остальные нативные атрибуты элемента input.
     */
    inputProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'input'>>;
    /**
     * Атрибут name элемента input.
     */
    name?: string;
    /**
     * Значение поля input.
     */
    value?: T;
    /**
     * Обработчик, вызываемый при изменении состояния.
     */
    onChange?: (value: T, event: React$1.ChangeEvent<HTMLInputElement>) => void;
}

declare type RadioGroupClasses = Partial<Record<'container' | 'error' | 'disabled' | 'radioGroup' | 'vertical', string>>;
interface RadioGroupProps<T extends string> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange' | 'defaultValue'> {
    /**
     * JSS-классы для стилизации.
     */
    classes?: RadioGroupClasses;
    /**
     * Подпись над полем ввода.
     */
    label?: React$1.ReactNode;
    /**
     * Свойства компонента InputLabel.
     */
    labelProps?: ComponentPropsWithAttributes<InputLabelProps>;
    /**
     * Направление расположения элементов.
     */
    direction?: DirectionType;
    /**
     * Значение поля.
     */
    value?: T;
    /**
     * Значение поля по умолчанию.
     */
    defaultValue?: T;
    /**
     * Имя элемента.
     */
    name?: string;
    /**
     * Обработчик изменения поля.
     */
    onChange?: (value: T, event: React$1.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Подпись под полем ввода.
     */
    helperText?: React$1.ReactNode;
    /**
     * Свойства компонента InputHelperText.
     */
    helperTextProps?: ComponentPropsWithAttributes<InputHelperTextProps>;
    /**
     * Поле отключено.
     */
    disabled?: boolean;
    /**
     * Поле содержит ошибку.
     */
    error?: boolean;
}

declare const RadioGroup: <T extends string>({ classes, className, direction, label, labelProps, value: valueProp, name, onChange: onChangeProp, helperText, helperTextProps, disabled, error, children, ref, defaultValue, ...rest }: RadioGroupProps<T> & {
    /**
     *
     */
    ref?: ((instance: HTMLDivElement | null) => void) | React$1.RefObject<HTMLDivElement> | null | undefined;
}) => JSX.Element;

interface IRadioProps extends RadioProps {
    label?: string;
    helperText?: string;
    error?: boolean;
}
declare const Radio: ({ label, helperText, error, ...rest }: IRadioProps) => react_jsx_runtime.JSX.Element;

interface IRadioChipsProps {
    value?: string;
    items: {
        title: React__default.ReactNode;
        id: string;
        count?: number;
    }[];
    kind?: Exclude<TTagKinds, 'color'>;
    onChange?: (id: string, event: FormEvent<HTMLElement>) => void;
    color?: TTagColor;
    wrap?: boolean;
    error?: boolean;
    required?: boolean;
    labelBold?: boolean;
    label?: string;
    helperText?: string;
    readonly?: boolean;
    testId?: string;
    fullWidth?: boolean;
}
declare const RadioChips: ({ color, error, helperText, items, kind, label, labelBold, onChange, readonly, required, value, wrap, testId, fullWidth, }: IRadioChipsProps) => react_jsx_runtime.JSX.Element;

declare function getElementWindow(element: Element): Window & typeof globalThis;
declare function getElementDocument(element: Element): Document;
declare const getOptions: (obj: any) => SimpleBarOptions;
declare function addClasses(el: HTMLElement | null, classes: string): void;
declare function removeClasses(el: HTMLElement | null, classes: string): void;
declare function classNamesToQuery(classNames: string): string;
declare const canUseDOM: boolean;

declare const helpers_addClasses: typeof addClasses;
declare const helpers_canUseDOM: typeof canUseDOM;
declare const helpers_classNamesToQuery: typeof classNamesToQuery;
declare const helpers_getElementDocument: typeof getElementDocument;
declare const helpers_getElementWindow: typeof getElementWindow;
declare const helpers_getOptions: typeof getOptions;
declare const helpers_removeClasses: typeof removeClasses;
declare namespace helpers {
  export { helpers_addClasses as addClasses, helpers_canUseDOM as canUseDOM, helpers_classNamesToQuery as classNamesToQuery, helpers_getElementDocument as getElementDocument, helpers_getElementWindow as getElementWindow, helpers_getOptions as getOptions, helpers_removeClasses as removeClasses };
}

interface Options {
    forceVisible: boolean | Axis;
    clickOnTrack: boolean;
    scrollbarMinSize: number;
    scrollbarMaxSize: number;
    classNames: Partial<ClassNames>;
    ariaLabel: string;
    tabIndex: number;
    scrollableNode: HTMLElement | null;
    contentNode: HTMLElement | null;
    autoHide: boolean;
}
interface SimpleBarOptions extends Partial<Options> {
}
type ClassNames = {
    contentEl: string;
    contentWrapper: string;
    offset: string;
    mask: string;
    wrapper: string;
    placeholder: string;
    scrollbar: string;
    track: string;
    heightAutoObserverWrapperEl: string;
    heightAutoObserverEl: string;
    visible: string;
    horizontal: string;
    vertical: string;
    hover: string;
    dragging: string;
    scrolling: string;
    scrollable: string;
    mouseEntered: string;
};
type Axis = 'x' | 'y';
type AxisProps = {
    scrollOffsetAttr: 'scrollLeft' | 'scrollTop';
    sizeAttr: 'width' | 'height';
    scrollSizeAttr: 'scrollWidth' | 'scrollHeight';
    offsetSizeAttr: 'offsetWidth' | 'offsetHeight';
    offsetAttr: 'left' | 'top';
    overflowAttr: 'overflowX' | 'overflowY';
    dragOffset: number;
    isOverflowing: boolean;
    forceVisible: boolean;
    track: {
        size: any;
        el: HTMLElement | null;
        rect: DOMRect | null;
        isVisible: boolean;
    };
    scrollbar: {
        size: any;
        el: HTMLElement | null;
        rect: DOMRect | null;
        isVisible: boolean;
    };
};
type RtlHelpers = {
    isScrollOriginAtZero: boolean;
    isScrollingToNegative: boolean;
} | null;
type DefaultOptions = Options & typeof SimpleBarCore.defaultOptions;
declare class SimpleBarCore {
    el: HTMLElement;
    options: DefaultOptions;
    classNames: ClassNames;
    axis: {
        x: AxisProps;
        y: AxisProps;
    };
    draggedAxis?: Axis;
    removePreventClickId: null | number;
    minScrollbarWidth: number;
    stopScrollDelay: number;
    isScrolling: boolean;
    isMouseEntering: boolean;
    isDragging: boolean;
    scrollXTicking: boolean;
    scrollYTicking: boolean;
    wrapperEl: HTMLElement | null;
    contentWrapperEl: HTMLElement | null;
    contentEl: HTMLElement | null;
    offsetEl: HTMLElement | null;
    maskEl: HTMLElement | null;
    placeholderEl: HTMLElement | null;
    heightAutoObserverWrapperEl: HTMLElement | null;
    heightAutoObserverEl: HTMLElement | null;
    rtlHelpers: RtlHelpers;
    scrollbarWidth: number;
    resizeObserver: ResizeObserver | null;
    mutationObserver: MutationObserver | null;
    elStyles: CSSStyleDeclaration | null;
    isRtl: boolean | null;
    mouseX: number;
    mouseY: number;
    onMouseMove: DebouncedFunc<any> | (() => void);
    onWindowResize: DebouncedFunc<any> | (() => void);
    onStopScrolling: DebouncedFunc<any> | (() => void);
    onMouseEntered: DebouncedFunc<any> | (() => void);
    static rtlHelpers: RtlHelpers;
    static defaultOptions: Options;
    constructor(element: HTMLElement, options?: Partial<Options>);
    /**
     * Static functions
     */
    static getOptions: (obj: any) => SimpleBarOptions;
    static helpers: typeof helpers;
    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */
    static getRtlHelpers(): {
        isScrollOriginAtZero: boolean;
        isScrollingToNegative: boolean;
    } | null;
    getScrollbarWidth(): number;
    static getOffset(el: Element): {
        top: number;
        left: number;
    };
    init(): void;
    initDOM(): void;
    initListeners(): void;
    recalculate(): void;
    /**
     * Calculate scrollbar size
     */
    getScrollbarSize(axis?: Axis): number;
    positionScrollbar(axis?: Axis): void;
    toggleTrackVisibility(axis?: Axis): void;
    showScrollbar(axis?: Axis): void;
    hideScrollbar(axis?: Axis): void;
    hideNativeScrollbar(): void;
    /**
     * On scroll event handling
     */
    onScroll: () => void;
    scrollX: () => void;
    scrollY: () => void;
    _onStopScrolling: () => void;
    onMouseEnter: () => void;
    _onMouseEntered: () => void;
    _onMouseMove: (e: any) => void;
    onMouseMoveForAxis(axis?: Axis): void;
    onMouseLeave: () => void;
    onMouseLeaveForAxis(axis?: Axis): void;
    _onWindowResize: () => void;
    onPointerEvent: (e: any) => void;
    /**
     * on scrollbar handle drag movement starts
     */
    onDragStart(e: any, axis?: Axis): void;
    /**
     * Drag scrollbar handle
     */
    drag: (e: any) => void;
    /**
     * End scroll handle drag
     */
    onEndDrag: (e: any) => void;
    /**
     * Handler to ignore click events during drag
     */
    preventClick: (e: any) => void;
    onTrackClick(e: any, axis?: Axis): void;
    /**
     * Getter for content element
     */
    getContentElement(): HTMLElement | null;
    /**
     * Getter for original scrolling element
     */
    getScrollElement(): HTMLElement | null;
    removeListeners(): void;
    /**
     * Remove all listeners from DOM nodes
     */
    unMount(): void;
    /**
     * Check if mouse is within bounds
     */
    isWithinBounds(bbox: DOMRect): boolean;
    /**
     * Find element children matches query
     */
    findChild(el: any, query: any): any;
}

type TScrollBarProps = Props$3;
type TScrollBarRef = SimpleBarCore;
declare const ScrollBar: React__default.ForwardRefExoticComponent<Props$3 & React__default.RefAttributes<SimpleBarCore>>;

interface IShimmerProps {
    width?: number;
    height?: number;
    borderRadius?: number;
    size?: 14 | 16 | 20 | 24 | 28 | 32 | 40;
    animation?: boolean;
}
declare const Shimmer: ({ width, height, size, borderRadius, animation, }: IShimmerProps) => react_jsx_runtime.JSX.Element;

declare type Classes$1 = {
    /**
     * Стиль, применяемый к основному элементу.
     *
     * @inner
     */
    control?: string;
    /**
     * Стиль, применяемый к элементу с `checked='true'`.
     *
     * @inner
     */
    checked?: string;
    /**
     * Стиль, применяемый к элементу с `size='sm'`.
     *
     * @inner
     */
    small?: string;
    /**
     * Стиль, применяемый к элементу с `disabled='true'`.
     *
     * @inner
     */
    disabled?: string;
    /**
     * Стиль, применяемый к элементу input.
     *
     * @inner
     */
    input?: string;
    /**
     * Стиль, применяемый к обертке переключателя.
     *
     * @inner
     */
    switch?: string;
    /**
     * Стиль, применяемый к переключателю.
     *
     * @inner
     */
    thumb?: string;
};

interface SwitchProps extends Omit<ComponentPropsWithRefFix<'label'>, 'onChange'> {
    /**
     * CSS классы компонента.
     *
     * @inner
     */
    classes?: Partial<Classes$1>;
    /**
     * Значение поля.
     *
     * @inner
     */
    checked?: boolean;
    /**
     * Размер компонента.
     */
    size?: Exclude<ElementSizeType, 'lg'>;
    /**
     * Элемент отключен.
     *
     * @inner
     */
    disabled?: boolean;
    /**
     * Обработчик, вызываемый при изменении состояния.
     *
     * @returns
     */
    onChange?: (event: React$1.ChangeEvent<HTMLInputElement>) => void;
    /**
     * HTML-атрибуты нативного элемента input c type="checkbox".
     *
     * @param inputProps.onBlur - Обработчик потери фокуса с элемента.
     * @param inputProps.onFocus — обработчик onFocus.
     * @param inputProps — остальные нативные атрибуты элемента input.
     */
    inputProps?: ComponentPropsWithAttributes<ComponentPropsWithRefFix<'input'>>;
    /**
     * Атрибут name элемента input.
     *
     * @inner
     */
    name?: string;
}

interface ISwitchProps extends SwitchProps {
    label?: string;
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
    error?: boolean;
    readonly?: boolean;
    helperText?: string;
    required?: boolean;
    tooltip?: ReactNode | ReactNode[];
}
declare const Switch: ({ error, label, labelPlacement, required, readonly, helperText, tooltip, ...rest }: ISwitchProps) => react_jsx_runtime.JSX.Element;

declare type Classes = {
    /** Стиль, применяемый к обертке */
    container?: string;
    /** Стиль, применяемый к контейнеру поля ввода */
    textareaContainer?: string;
    /** Стиль, применяемый к элементу ввода */
    textarea?: string;
    /** Стиль, применяемый к элементу ввода с `size='sm` */
    textareaSmall?: string;
    /** Стиль, применяемый к элементу ввода с `size='md` */
    textareaMedium?: string;
    /** Стиль, применяемый к элементу ввода с `size='lg` */
    textareaLarge?: string;
    /** Стиль, применяемый к элементу с `error='true'` */
    error?: string;
    /** Стиль, применяемый к элементу с `disabled='true'` */
    disabled?: string;
    /** Стиль, применяемый к элементу в момент фокуса */
    focused?: string;
};

declare type TextareaAttributesWithRef = React$1.TextareaHTMLAttributes<HTMLTextAreaElement> & React$1.RefAttributes<HTMLTextAreaElement>;
interface TextareaProps<InnerProps extends TextareaAttributesWithRef = TextareaAttributesWithRef> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>, Omit<LabelledProps, 'children' | 'classes'> {
    /**
     * Список классов
     */
    classes?: Partial<Classes>;
    /**
     * Список классов для компонента Labelled
     */
    labelledClasses?: LabelledProps['classes'];
    /**
     * Свойства элемента textArea
     * @param textareaProps.onBlur - обработчик потери фокуса с элемента
     * @param textareaProps.onFocus — обработчик onFocus
     * @param textareaProps.maxLength - максимальная длина вводимого значения
     * @param textareaProps — остальные нативные атрибуты элемента textArea
     */
    textareaProps?: InnerProps;
    /**
     * Ссылка на нативный элемент textarea
     */
    textareaRef?: React$1.RefCallback<HTMLTextAreaElement> | React$1.MutableRefObject<HTMLTextAreaElement | null> | null;
    /**
     * Количество строк
     */
    rows?: number;
    /**
     * Растянуть компонент на всю ширину контейнера
     */
    fullWidth?: boolean;
    /**
     * Поле содержит ошибку
     */
    error?: boolean;
    /**
     * Возможность изменения размера поля пользователем
     */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
    /**
     * Размер поля
     */
    size?: ElementSizeType;
    /**
     * Поле заблокировано для ввода
     */
    disabled?: boolean;
    /**
     * Подсказка внутри поля, если не введен текст
     */
    placeholder?: string;
    /**
     * Значение поля
     */
    value?: React$1.ReactText | null;
    /**
     * Обработчик события изменения значения поля
     */
    onChange?: (value: string, event: React$1.ChangeEvent<HTMLTextAreaElement>) => void;
    /**
     * Этот объект включает в себя кастомный компонент Textarea, передайте сюда сторонний/свой компонент для перезаписи,
     *
     * Интерфейс свойств передаваемого компонента необходимо передать в основной компонент Textarea, который может принимать тип,
     *
     * Если вы хотите изменить только стиль компонента, мы рекомендуем использовать свойство `classes` или токены темы
     */
    components?: {
        Textarea: React$1.ForwardRefExoticComponent<InnerProps>;
    };
    /**
     * Показывать ли счетчик введенных символов
     */
    showCount?: boolean;
}

interface ITextareaProperties extends Omit<TextareaProps, 'textareaProps' | 'helperTextProps' | 'showCount' | 'size' | 'resize'> {
    canClear?: boolean;
    labelInside?: boolean;
    maxLength?: number;
    readonly?: boolean;
    tooltip?: ReactNode | ReactNode[];
    size?: 'S' | 'M' | 'L' | 'XL';
    resize?: 'none' | 'horizontal' | 'vertical';
    /** Упрощенное визуальное представление компонента, без возможности поменять значение */
    viewOnly?: boolean;
}
declare const Textarea: ({ labelInside, maxLength, helperText, fullWidth, tooltip, size, ...properties }: ITextareaProperties) => react_jsx_runtime.JSX.Element;

interface ITooltipProps extends Omit<TooltipProps, 'content'> {
    canShow?: boolean;
    placement?: Placement;
    content?: ReactNode | ReactNode[];
    fallbackPlacements?: Placement[];
}
declare const Tooltip: (props: ITooltipProps) => react_jsx_runtime.JSX.Element;

declare enum ETitleSize {
    H900 = "H900",
    H800 = "H800",
    H700 = "H700",
    H600 = "H600",
    H500 = "H500",
    H400 = "H400",
    H300 = "H300",
    H200 = "H200",
    H100 = "H100"
}
declare enum ETextSize {
    xxlg = "xxlg",
    xlg = "xlg",
    lg = "lg",
    md = "md",
    sm = "sm"
}
interface ITypographyPropertiesDefault {
    uppercase?: boolean;
    mb?: number;
    onClick?: (event: React__default.MouseEvent) => void;
}
type TTypographyProps = ITypographyPropertiesDefault & Omit<React__default.HTMLAttributes<HTMLDivElement>, keyof ITypographyPropertiesDefault>;
type TTitleProps = TTypographyProps & {
    size: keyof typeof ETitleSize;
    thin?: boolean;
    nowrap?: boolean;
    white?: boolean;
};
type TLinkProps = ITypographyPropertiesDefault & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ITypographyPropertiesDefault> & {
    bold?: boolean;
    size?: keyof typeof ETextSize;
};
type TTextProps = TTypographyProps & {
    link?: boolean;
    bold?: boolean;
    disabled?: boolean;
    medium?: boolean;
    tooltip?: boolean;
    code?: boolean;
    nowrap?: boolean;
    wrap?: boolean;
    size?: keyof typeof ETextSize;
    white?: boolean;
};

declare const Title: React__default.ForwardRefExoticComponent<ITypographyPropertiesDefault & Omit<React__default.HTMLAttributes<HTMLDivElement>, keyof ITypographyPropertiesDefault> & {
    size: keyof typeof ETitleSize;
    thin?: boolean;
    nowrap?: boolean;
    white?: boolean;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const Text: React__default.ForwardRefExoticComponent<ITypographyPropertiesDefault & Omit<React__default.HTMLAttributes<HTMLDivElement>, keyof ITypographyPropertiesDefault> & {
    link?: boolean;
    bold?: boolean;
    disabled?: boolean;
    medium?: boolean;
    tooltip?: boolean;
    code?: boolean;
    nowrap?: boolean;
    wrap?: boolean;
    size?: keyof typeof ETextSize;
    white?: boolean;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const Link: React__default.ForwardRefExoticComponent<ITypographyPropertiesDefault & Omit<React__default.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ITypographyPropertiesDefault> & {
    bold?: boolean;
    size?: keyof typeof ETextSize;
} & React__default.RefAttributes<HTMLAnchorElement>>;

declare const useComponentDidMount: () => boolean;

declare function useComponentVisible<T extends HTMLElement = HTMLElement>(initialIsVisible: boolean, handler?: (event: Event) => void, isModal?: boolean): {
    isComponentVisible: boolean;
    setIsComponentVisible: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    visibleRef: React$1.MutableRefObject<T | null>;
};

type TClipBoardValueType = string | null;
type TCopyFunctionType = (text: TClipBoardValueType, options?: {
    silent?: boolean;
    addNotification?: (content: string, options?: INotificationOptions) => void;
    successMessage?: string;
    errorMessage?: string;
}) => Promise<boolean>;
declare const useCopyToClipboard: () => TCopyFunctionType;

declare const useDebounce: <T>(value: T, delay: number) => T;

declare const useEventCallback: <TCallback extends (...arguments_: any[]) => any>(function_?: TCallback) => (...arguments_: any[]) => void;

interface ISubscribeEventMap extends ElementEventMap, DocumentEventMap, WindowEventMap {
}
declare const subscribeEvent: <T extends Element | Document | Window | undefined | null, K extends keyof ISubscribeEventMap>(element: T, type: K, clb: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => (() => void) | null;
/** Хук для подписок на события */
declare const useEventListener: <T extends Element | Document | Window, K extends keyof ISubscribeEventMap>(eventTarget: (T & (() => T)) | T | (() => T) | null, event: K, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;

type TRef<T> = React__default.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined;
declare function setRef<T>(reference: TRef<T>, value: T | null): void;
declare const useForkRef: <T, V extends T = T>(referenceA: TRef<T>, referenceB: TRef<V>) => ((referenceValue: T & V) => void) | null;

type TDependencyList = readonly unknown[];
declare function useIsOverflowing<T extends HTMLElement>(ref: RefObject<T>, dependencies?: TDependencyList): boolean;

/**
 * Хук для хранилища
 * @param {*} arg - состояние, которое будет хранится в хранилище
 * @param {boolean} refresh - параметр, который отвечает за переопределение хранилища
 */
declare const useKeeper: <T>(argument: T, refresh?: boolean) => T;

declare const useLegacyEffect: (callback: React__default.EffectCallback, deps: React__default.DependencyList) => void;

declare const useMoneyFormatter: (locale?: string, formatOptions?: Intl.NumberFormatOptions) => Intl.NumberFormat;

declare const subscribeMutation: <T extends HTMLElement>(element: T, clb: (records?: MutationRecord[]) => void, options: MutationObserverInit) => () => void;
/** Хук для подписок на изменение элемента через MutationObserver */
declare const useMutation: (reference: MutableRefObject<HTMLElement | null>, callback: (records?: MutationRecord[]) => void, options: MutationObserverInit) => void;

declare const subscribeResize: (element: HTMLElement, clb: () => void) => () => void;
/** Хук для подписок на изменение элемента через ResizeObserver */
declare const useResizeHook: (reference: MutableRefObject<HTMLElement | null>, callback: () => void) => void;

declare const useStorageData: <T>(key: string, delay?: number) => {
    removeStorageData: () => void;
    setStorageData: (data: T) => void;
    storage: T | null;
};

interface Cancel {
    cancel: () => void;
}
type NoReturn<T extends (...args: Parameters<T>) => ReturnType<T>> = (...args: Parameters<T>) => void;
declare const useThrottle: <T extends (...args: Parameters<T>) => ReturnType<T>>(clb: T, delay?: number) => NoReturn<T> & Cancel;

export { Accordion, AccordionItem, Alert, Badge, BarChart, Button, ButtonUploader, Checkbox, CheckboxChips, Chips, Col, ComboBox, type ComboboxEvent, DatePicker, DateRangePicker, Droplist, Dropzone, EAlertStatus, EAlign, EBadgeSize, EComponentColors, EDirection, EFileSizeUnit, EFileType, EIconName, EJustifyContent, ELevelState, EProgressVariant, ETextSize, ETitleSize, EVariant, FieldSearch, FieldSelect, FileItem, type IAccordionItemProps, type IAccordionProps, type IAlertProperties, type IBadgeProps, type IButtonProperties, type ICheckboxChipsProps, type ICheckboxProperties, type IChipsItem, type IChipsProps, type IDatePickerProperties, type IDropzoneComponentProps, type IFieldSearchProperties, type IFieldSelectProperties, type IFileIconProps, type IFileProps, type IIndicatorProperties, type IInfoDisplayProperties, type IInputNumberProperties, type IInputProperties, type ILabelComponentProps, type ILevelProps, type ILinearProgressProps, type ILoaderProps, type IMarkdownViewerProps, type IMaskedInputProps, type IModalFooterProperties, type INoticeProps, type INotificationOptions, type IOldInputProperties, type IRadioChipsProps, type IRadioProps, type IRangePickerProperties, type IShimmerProps, type ISubscribeEventMap, type ISvgProperties, type ISwitchProps, type ITextareaProperties, type ITooltipProps, type ITypographyPropertiesDefault, Icon, InfoDisplay, Input, InputMask, InputNumber, KBYTES_PER_BYTE, LabelComponent, Level, LinearProgress, Link, Loader, MBYTES_PER_BYTE, MarkdownViewer, Modal, ModalBody, ModalFooter, ModalHeader, MoneyInput, MoneyRangeInput, Notice, NoticeInner, Notification, OldInput, OldScrollbar, Placeholder, Popover, type Instance as PopperInstance, Radio, RadioChips, RadioGroup, type RadioGroupProps, Row, ScrollBar, Select, Shimmer, Switch, type TAlertAction, type TAlertStatus, type TButtonSizes, type TButtonUploaderProps, type TButtonVariants, type TChipsSize, type TChipsVariant, type TColProps, type TComponentSizes, type TDatePickerSize, type TDropListProps, type TDropzoneProps, type TFileExtrasProps, type TFileItemProps, type TIconProperties, type TInputNumberSizes, type TLevelSize, type TLinkProps, type TMoneyInputProperties, type TMoneyRangeInputProperties, type TNotificationProps, type TNotificationType, type TRef, type TRowProps, type TScrollBarProps, type TScrollBarRef, type TSearchValue, type TSelectProperties, type TSize, type TTextProps, type TTitleProps, type TTypographyProps, type TVariant, Text, Textarea, Title, Tooltip, TooltipContext, type TooltipContextValue, type TreeItem, bytesMoreOneKB, bytesMoreOneMB, checkFileType, colSpanValues, convertBytesToMB, fileActionSize, fileIconFilledMap, fileIconMap, iconMap, notification, pluralizeBytes, setRef, subscribeEvent, subscribeMutation, subscribeResize, useComponentDidMount, useComponentVisible, useCopyToClipboard, useDebounce, useEventCallback, useEventListener, useForkRef, useIsOverflowing, useKeeper, useLegacyEffect, useMoneyFormatter, useMutation, useResizeHook, useStorageData, useThrottle };
