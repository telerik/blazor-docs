---
title: Icons
page_title: Font and SVG Icons
description: How to use the built-in font icons in the UI for Blazor suite.
slug: general-information/font-icons
tags: telerik,blazor,icon,font,built-in
published: True
previous_url: /common-features/font-icons
position: 1
---

# Built-in Font and SVG Icons

Telerik UI for Blazor provides a large set of built-in icons. There are two ways to consume and render them - as font icons or as SVG icons. It is also possible to use custom icons, or define an application-wide setting, which affects the type of icons in all Telerik Blazor components.

This article contains the following sections:

* [How do icons work](#how-icons-work)
* [`FontIcon` component](#fonticon-component)
    * [Set custom font icon size](#set-custom-font-icon-size)
    * [Render font icons with HTML](#render-font-icons-with-html)
* [`SvgIcon` component](#svgicon-component)
    * [Render custom SVG Icons with HTML](#render-custom-svg-icons-with-html)
    * [Use custom SVG icon collection](#use-custom-svg-icon-collection)
* [Set global icon type for the whole application](#set-global-icon-type)
* [Complete list of built-in icons](#icons-list)

> [`TelerikFontIcon` replaced the `TelerikIcon` component in version 4.0]({%slug changes-in-4-0-0%}). The `ImageUrl` and `SpriteClass` parameters are no longer supported.


## How Icons Work

The Telerik Blazor components use built-in icons with the help of two NuGet packages. They are installed *automatically* as dependencies of the `Telerik.UI.for.Blazor` package:

* `Telerik.FontIcons` - defines the `FontIcon` `enum` for easier usage of built-in **font** icons
* `Telerik.SvgIcons` - defines the `ISvgIcon` interface and the `SvgIcon` static class for built-in **SVG** icons

To use the icons, import one or both namespaces, for example in `_Imports.razor`:

>caption Register Telerik Blazor icon namespaces

<div class="skip-repl"></div>

````CSHTML
@using Telerik.FontIcons
@using Telerik.SvgIcons
````

Some components provide icon-related parameters, which can rely on the above packages and namespaces too. For example:

>caption Icon parameter in Telerik Blazor components

<div class="skip-repl"></div>
````CSHTML
<TelerikButton Icon="@FontIcon.Save">Button with font icon</TelerikButton>

<GridCommandButton Icon="@SvgIcon.Save">Command Button with SVG icon</GridCommandButton>
```

Usually, [the app will use only one type of icons](#set-global-icon-type). However, it is possible to use standalone Icon components of both types at the same time. The sections below discuss these standalone components.


## FontIcon Component

The `TelerikFontIcon` component can show a [built-in Telerik Blazor font icon](#icons-list) or a custom font icon. Here are the available configuration parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Flip` | `IconFlip` `enum` <br /> (`None`) | The icon's flip direction, which allows to mirror (turn over) the image horizontally, vertically, or in both directions. |
| `Icon` | `FontIcon` `enum` | Any of the [built-in Telerik Blazor font icons](#icons-list). This parameter takes precedence over `IconClass`, if both are set. |
| `IconClass` | `string` | Custom CSS class for a custom third-party icon. Do not use together with the `Icon` parameter. |
| `Size` | `string` <br /> (`"md"`) | Any of the predefined icon sizes (from `"xs"` to `"xxxl"`). It is possible to set the parameter value to raw strings such as `"lg"`, `"md"` or `"sm"`. However, we recommend using the properties of the static `ThemeConstants.Icon.Size` class. |
| `ThemeColor` | `string` | Any of the predefined icon colors. Use the static `ThemeConstants.Icon.ThemeColor` class properties. By default, the icon color will inherit the current CSS text color. |

>caption Using TelerikFontIcon

````CSHTML
<TelerikFontIcon Icon="@FontIcon.Audio" />

<span style="color: red;">
    <TelerikFontIcon Icon="@FontIcon.Save" Size="lg" Flip="@IconFlip.Vertical" />
</span>
````

### Set Custom Font Icon Size

In addition to the `Size` parameter, you can change the size of the rendered icon with custom CSS and the `font-size` style.

Our font icons are designed on a 16px grid base. For better display quality, use a font size, which is divisible by 16 (32px, 48px and so on).

>caption Increase icon size with CSS

````CSHTML
<style>
    .large-icons .k-icon {
        font-size: 32px;
    }
</style>

<div class="large-icons">
    <TelerikIcon Icon="@FontIcon.Filter"></TelerikIcon>
</div>

<TelerikIcon Icon="@FontIcon.Filter"></TelerikIcon>
````

### Render Font Icons with HTML

Telerik UI for Blazor shares the same [themes]({%slug general-information/themes%}) with several other Telerik and Kendo UI web component suites. All these products use the same font icons.

You can use the built-in font icons directly via HTML tags, without the `<TelerikFontIcon>` helper component. Such direct HTML usage may make it easier for you to customize and style icons that you use in your own layouts.

To use the icons directly, review the [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) article. The `<TelerikFontIcon>` component simply drops the `k-i-` CSS class prefix to make it easier for you.

>caption Use Kendo font icons directly

````CSHTML
<span class="k-icon k-i-check k-flip-h k-flip-v"></span>

is the same as

<TelerikFontIcon Icon="@FontIcon.Check" Flip="@IconFlip.Both" />
````


## SvgIcon Component

The `TelerikSvgIcon` component can show a [built-in Telerik Blazor SVG icon](#icons-list) or a custom SVG icon. Here are the available configuration parameters:

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Flip` | `IconFlip` `enum` <br /> (`None`) | The icon's flip direction, which allows to mirror (turn over) the image horizontally, vertically, or in both directions. |
| `Icon` | `ISvgIcon` | Assign a property of the `SvgIcon` static class to use any of the [built-in Telerik Blazor font icons](#icons-list). Alternatively, [implement your own custom SVG Icon class](#implement-custom-svg-icon-classes). |
| `Size` | `string` <br /> (`"md"`) | Any of the predefined icon sizes (from `"xs"` to `"xxxl"`). It is possible to set the parameter value to raw strings such as `"lg"`, `"md"` or `"sm"`. However, we recommend using the properties of the static `ThemeConstants.Icon.Size` class. |
| `ChildContent` | `RenderFragment` | The HTML markup of a custom SVG icon. Do not use together with `Icon`. |
| `ThemeColor` | `string` | Any of the predefined icon colors. Use the static `ThemeConstants.Icon.ThemeColor` class properties. |

>caption Using TelerikSvgIcon

````CSHTML
<TelerikSvgIcon Icon="@SvgIcon.Calendar" />

<TelerikSvgIcon Icon="@SvgIcon.Audio"
                Size="@ThemeConstants.Icon.Size.Large"
                ThemeColor="@ThemeConstants.Icon.ThemeColor.Primary" />
````

### Render Custom SVG Icons with HTML

The `TelerikSvgIcon` component can accommodate a complete `<svg>` tag as its `ChildContent`. In this way, you have full control over the SVG icon rendering, while using the other component parameters, such as `Flip` or `Size`.

Do not set the `Icon` parameter in this case.

>caption Using custom SVG Icon

````CSHTML
<TelerikSvgIcon Flip="@IconFlip.Horizontal">
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>moon</title>
        <path d="M8.85028 16.5C11.3178 16.5 13.5715 15.3773 15.0646 13.5378C15.2854 13.2656 15.0446 12.8681 14.7032 12.9331C10.8219 13.6723 7.25756 10.6963 7.25756 6.77825C7.25756 4.52131 8.46575 2.44591 10.4294 1.32844C10.7321 1.15619 10.6559 0.697281 10.312 0.63375C9.82984 0.544842 9.34057 0.500073 8.85028 0.5C4.43437 0.5 0.850281 4.07847 0.850281 8.5C0.850281 12.9159 4.42875 16.5 8.85028 16.5Z" fill="black"></path>
    </svg>
</TelerikSvgIcon>
````

### Use Custom SVG Icon Collection

The `Icon` parameter of `TelerikSvgIcon` expects an `ISvgIcon` object. This is a public interface, together with the `SvgIconBase` class. You can use them to create a collection of custom SVG icons.

The `ISvgIcon` interface members are:

| Member | Type | Description |
|---|---|---|
| `Name` | `string` | The identifier of the SVG icon. The component renders it as a `k-svg-i-name` CSS class. |
| `Content` | `string` | All `<path>` tags inside the `<svg>` tag. |
| `ViewBox` | `string` | The [`viewBox` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) value of the `<svg>` tag. |

>caption Define custom SVG icon collection

````CSHTML
<TelerikSvgIcon Icon="@MySvgIcons.Moon" />

@code {
    public class Moon : SvgIconBase
    {
        public Moon()
        {
            Name = "moon";
            Content = "<path d=\"M8.85028 16.5C11.3178 16.5 13.5715 15.3773 15.0646 13.5378C15.2854 13.2656 15.0446 12.8681 14.7032 12.9331C10.8219 13.6723 7.25756 10.6963 7.25756 6.77825C7.25756 4.52131 8.46575 2.44591 10.4294 1.32844C10.7321 1.15619 10.6559 0.697281 10.312 0.63375C9.82984 0.544842 9.34057 0.500073 8.85028 0.5C4.43437 0.5 0.850281 4.07847 0.850281 8.5C0.850281 12.9159 4.42875 16.5 8.85028 16.5Z\" fill=\"rgb(31, 31, 31)\" />";
            ViewBox = "0 0 16 17";
        }
    }

    public static class MySvgIcons
    {
        public static ISvgIcon Moon => new Moon();
        //public static ISvgIcon AnotherIcon => new AnotherIcon();
    }
}
````


## Set Global Icon Type

It is possible to configure the icon type for the whole application:

1. Locate the `<TelerikRootComponent>` tag in the Blazor app. Normally, it's in a layout file such as `MainLayout.razor` or `TelerikLayout.razor`.
2. Set the `TelerikRootComponent` `IconType` parameter to an `IconType` enum value - `Svg` or `Font`.

>tip The default icon type is `Font`. We plan to switch it to `Svg` in mid 2023 for better display.

> The global `IconType` setting does not affect `<TelerikFontIcon>` and `<TelerikSvgIcon>` instances in the app. It will toggle the icon type of all other components, such as Button, Grid, etc.

>caption Define global icon type via TelerikRootComponent

<div class="skip-repl"></div>

````HTML
<TelerikRootComponent IconType="@IconType.Svg">
    @Body
</TelerikRootComponent>
````


## Icons List

Here is a list of all available built-in icons in Telerik UI for Blazor.

To define an icon with C# syntax, remove the "k-i-" part and use a PascalCase name. For example, `k-i-caret-tr` will become `FontIcon.CaretTr` or `SvgIcon.CaretTr`.

>caption Built-in Telerik Blazor Icons

Please allow a few seconds for all icons to render. It is also possible to [open the frame as a standalone web page](https://telerik.github.io/kendo-icons/).

<iframe src="https://telerik.github.io/kendo-icons/" style="width: 100%; height: 550px;"></iframe>


## See Also

* [Blazor Live Demos](https://demos.telerik.com/blazor-ui/)
* [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
