---
title: Icons
page_title: Font and SVG Icons
description: How to use the built-in font icons in the UI for Blazor suite.
slug: common-features-icons
tags: telerik,blazor,icon,font,built-in
published: True
previous_url: /common-features/font-icons
position: 1
---

# Built-in Font and SVG Icons

Telerik UI for Blazor provides a large set of built-in icons. There are two ways to consume and render them - as font icons or as SVG icons. It is also possible to use custom icons, or define an application-wide setting, which affects the type of icons in all Telerik Blazor components.

Usually, [the app will use only one type of icons](#set-global-icon-type) (font icons or SVG icons). However, it is possible to use both types at the same time.

This article contains the following sections:

* [How do icons work](#how-icons-work)
    * [Install icon NuGet packages](#icon-nuget-packages)
    * [Import icon namespaces](#icon-namespaces)
    * [Register font icon stylesheet](#font-icon-stylesheet) (SVG icons don't need it)
* [`FontIcon` component](#fonticon-component)
    * [Set custom font icon size](#set-custom-font-icon-size)
    * [Render font icons with HTML](#render-font-icons-with-html)
* [`SvgIcon` component](#svgicon-component)
    * [Render custom SVG Icons with HTML](#render-custom-svg-icons-with-html)
    * [Use custom SVG icon collection](#use-custom-svg-icon-collection)
* [Set global icon type for the whole application](#set-global-icon-type)
* [Complete list of built-in icons](#icons-list)


## How Icons Work

The Telerik Blazor icons have three prerequisites to work:

* [Install icon NuGet packages](#icon-nuget-packages)
* [Import icon namespaces](#icon-namespaces)
* [Register font icon stylesheet](#font-icon-stylesheet) (SVG icons don't need it)

### Icon NuGet Packages

The Telerik Blazor components use built-in icons with the help of two NuGet packages. They are installed *automatically* as dependencies of the `Telerik.UI.for.Blazor` package:

* `Telerik.FontIcons` - defines the `FontIcon` `enum` for easier usage of built-in **font** icons
* `Telerik.SvgIcons` - defines the `ISvgIcon` interface and the `SvgIcon` static class for built-in **SVG** icons

>tip Unlike the `Telerik.UI.for.Blazor` package, the icon packages are available from the `nuget.org` source. Keep this in mind when using [`packageSourceMapping`](https://learn.microsoft.com/en-us/nuget/consume-packages/package-source-mapping).

### Icon Namespaces

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

### Font Icon Stylesheet

In version 4.6.0 of Telerik UI for Blazor, the font icon styles were separated in their own stylesheet. Register it in a similar way as the component theme:

>caption Using the font icon CSS file

<div class="skip-repl"></div>

````CSHTML
<!-- If using static assets from the NuGet package -->
<link href="_content/Telerik.UI.for.Blazor/css/kendo-font-icons/font-icons.css" rel="stylesheet" />
<!-- If using static assets from a Trial NuGet package -->
<link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-font-icons/font-icons.css" rel="stylesheet" />

<!-- If using the Telerik Blazor CDN - set the correct version number in the URL -->
<link href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-font-icons/font-icons.css" rel="stylesheet" type="text/css" />
````


## FontIcon Component

The `TelerikFontIcon` component can show a [built-in Telerik Blazor font icon](#icons-list) or a custom font icon. Here are the available configuration parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Flip` | `IconFlip` `enum` <br /> (`None`) | The icon's flip direction, which allows to mirror (turn over) the image horizontally, vertically, or in both directions. |
| `Icon` | `FontIcon` `enum` | Any of the [built-in Telerik Blazor font icons](#icons-list). This parameter takes precedence over `IconClass`, if both are set. |
| `IconClass` | `string` | Custom CSS class for a custom third-party icon. Do not use together with the `Icon` parameter. |
| `Size` | `string` <br /> (`"md"`) | Any of the predefined icon sizes (from `"xs"` to `"xxxl"`). It is possible to set the parameter value to raw strings such as `"lg"`, `"md"` or `"sm"`. However, we recommend using the properties of the static `ThemeConstants.FontIcon.Size` class. |
| `ThemeColor` | `string` | Any of the predefined icon colors. Use the static `ThemeConstants.FontIcon.ThemeColor` class properties. By default, the icon color will inherit the current CSS text color. |

>caption Using TelerikFontIcon

````CSHTML
<TelerikFontIcon Icon="@FontIcon.FileAudio" />

<span style="color: red;">
    <TelerikFontIcon Icon="@FontIcon.Save" Size="lg" Flip="@IconFlip.Vertical" />
</span>

<TelerikFontIcon Icon="@FontIcon.FileAudio"
                 ThemeColor="@ThemeConstants.FontIcon.ThemeColor.Success" />

<TelerikFontIcon IconClass="my-icon-base my-custom-icon" />

<style>
    .my-icon-base {
        /* normally icon libraries have such a base class for the common styles */
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
    }

    .my-custom-icon {
        /* this is the icon-specific CSS class */
        /* define a background image or a custom font icon here */
        background: purple;
    }
</style>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)
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
    <TelerikFontIcon Icon="@FontIcon.Filter"></TelerikFontIcon>
</div>

<TelerikFontIcon Icon="@FontIcon.Filter"></TelerikFontIcon>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)
````

### Render Font Icons with HTML

Telerik UI for Blazor shares the same [themes]({%slug general-information/themes%}) with several other Telerik and Kendo UI web component suites. All these products use the same font icons.

You can use the built-in font icons directly with HTML tags, without the `<TelerikFontIcon>` component. Such direct HTML usage may provide more flexibility, but if you don't really need it, we recommend using `FontIcon` objects and the `<TelerikFontIcon>` component instead.

To use the icons directly, refer to [List of all Telerik Icons](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/) and obtain the desired CSS class. The `<TelerikFontIcon>` component simply drops the `k-i-` CSS class prefix to make it easier for you.

>caption Use Telerik font icons with plain HTML

````CSHTML
<span class="k-icon k-font-icon k-i-check k-flip-h k-flip-v"></span>

is the same as

<TelerikFontIcon Icon="@FontIcon.Check" Flip="@IconFlip.Both" />

<!-- Register this stylesheet next to the component theme. -->
<link href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-font-icons/font-icons.css" rel="stylesheet" />
````


## SvgIcon Component

The `TelerikSvgIcon` component can show a [built-in Telerik Blazor SVG icon](#icons-list) or a custom SVG icon. Here are the available configuration parameters:

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Flip` | `IconFlip` `enum` <br /> (`None`) | The icon's flip direction, which allows to mirror (turn over) the image horizontally, vertically, or in both directions. |
| `Icon` | `ISvgIcon` | Assign a property of the `SvgIcon` static class to use any of the [built-in Telerik Blazor font icons](#icons-list). Alternatively, [implement your own custom SVG Icon class](#implement-custom-svg-icon-classes). |
| `Size` | `string` <br /> (`"md"`) | Any of the predefined icon sizes (from `"xs"` to `"xxxl"`). It is possible to set the parameter value to raw strings such as `"lg"`, `"md"` or `"sm"`. However, we recommend using the properties of the static `ThemeConstants.SvgIcon.Size` class. |
| `ChildContent` | `RenderFragment` | The HTML markup of a custom SVG icon. Do not use together with `Icon`. |
| `ThemeColor` | `string` | Any of the predefined icon colors. Use the static `ThemeConstants.SvgIcon.ThemeColor` class properties. |

>caption Using TelerikSvgIcon

````CSHTML
<TelerikSvgIcon Icon="@SvgIcon.Calendar" />

<TelerikSvgIcon Icon="@SvgIcon.FileAudio"
                Size="@ThemeConstants.SvgIcon.Size.Large"
                ThemeColor="@ThemeConstants.SvgIcon.ThemeColor.Primary" />
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

>tip You can use a custom SVG icon collection together with the built-in icon rendering feature of all components that have an `Icon` or `IconField` parameter, such as the Button, ContextMenu, Drawer, Menu, PanelBar, TreeView, etc.

>caption Define custom SVG icon collection

````CSHTML
Moon:
<TelerikSvgIcon Icon="@MySvgIcons.Moon" />

Circles:
<TelerikSvgIcon Icon="@MySvgIcons.Circles" />

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

    public class Circles : SvgIconBase
    {
        public Circles()
        {
            Name = "circles";
            Content = "<circle cx=\"5\" cy=\"5\" r=\"5\" fill=\"black\" /><circle cx=\"11\" cy=\"11\" r=\"5\" fill=\"red\" />";
            ViewBox = "0 0 16 17";
        }
    }

    public static class MySvgIcons
    {
        public static ISvgIcon Moon => new Moon();

        public static ISvgIcon Circles => new Circles();
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

The [Telerik Design System](https://www.telerik.com/design-system/docs/) website provides a list of all [**built-in icons in Telerik UI for Blazor**](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/).

To define an icon with C# syntax, replace the kebab-case with PascalCase. For example, `plus-outline` should become `FontIcon.PlusOutline` or `SvgIcon.PlusOutline`.

Each icon box in the icon list is clickable and reveals the following details:

* CSS class aliases, if such exist. Use the CSS classes for [manual HTML rendering of font icons](#render-font-icons-with-html). For example, `k-i-plus` is equivalent to `k-i-add`. The C# icon names have no aliases.
* Unicode representation of the font icon glyph. For example, `\e11e` corresponds to the `plus` icon.
* Ability to copy the glyph symbol of the font icon.
* Ability to copy the HTML markup (`<svg>` tag) of the SVG icon.

The icon list may contain icons which are not available in older versions of Telerik UI for Blazor or even in the latest one. Such icons will be added in the next product version.


## See Also

* [Blazor Live Demos](https://demos.telerik.com/blazor-ui/)
* [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
