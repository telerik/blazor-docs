---
title: Icons
page_title: Icons
description: How to use the built-in font icons in the UI for Blazor suite.
slug: general-information/font-icons
tags: telerik,blazor,icon,font,built-in
published: True
position: 1
---

# Built-in Icons

Telerik UI for Blazor provides a large set of built-in icons. They can be consumed in two alternative ways - as font icons or as SVG icons. It is also possible to define an application-wide setting, which affects the type of icons in all Telerik Blazor components.

This article contains the following sections:

* [How the built-in icons work](#how-the-icons-work)
* [`FontIcon` component](#fonticon-component)
    * [Set custom font icon size](#set-custom-font-icon-size)
    * [Render font icons with HTML](#render-font-icons-with-html)
* [`SvgIcon` component](#svgicon-component)
    * [Use custom SVG Icons](#use-custom-svg-icons)
    * [Implement custom SVG icon classes](#implement-custom-svg-icon-classes)
* [Set global icon type for the whole application](#set-global-icon-type)

> As of version 4.0, the `TelerikIcon` component was replaced by `TelerikFontIcon`. The `ImageUrl` and `SpriteClass` parameters are no longer supported.


## How The Icons Work

The built-in icons depend on two NuGet packages, which are installed automatically as dependencies of `Telerik.UI.for.Blazor`. No manual actions are necessary. These packages are:

* `Telerik.FontIcons` - defines the `FontIcon` `enum` for built-in font icons
* `Telerik.SvgIcons` - defines the `ISvgIcon` interface and the `SvgIcon` static class for built-in SVG icons

Usually, the app will rely on a single type of icons. However, it is possible to use standalone Icon components of both types at the same time.


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

You can change the size of the rendered icon with custom CSS.

Our font icons are designed on a 16px grid base. To achieve a pixel-perfect icon display, use a font size, which is divisible by 16 (32px, 48px and so on).

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

Telerik UI for Blazor shares the same [themes]({%slug general-information/themes%}) with several other Telerik and Kendo UI web component suites. All suites use the same font icons.

You can use the built-in font icons directly via HTML tags without the `<TelerikFontIcon>` helper component.

Such direct HTML usage may make it easier for you to customize and style icons that you use in your own layouts.

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
| `Icon` | `ISvgIcon` | Assign a property of the `SvgIcon` static class to use any of the [built-in Telerik Blazor font icons](#icons-list). Alternatively, [implement your own custom SVG Icon class](#custom-svg-icon-class). |
| `Size` | `string` <br /> (`"md"`) | Any of the predefined icon sizes (from `"xs"` to `"xxxl"`). It is possible to set the parameter value to raw strings such as `"lg"`, `"md"` or `"sm"`. However, we recommend using the properties of the static `ThemeConstants.Icon.Size` class. |
| `ChildContent` | `RenderFragment` | The HTML markup of a custom SVG icon. Do not use together with `Icon`. |
| `ThemeColor` | `string` | Any of the predefined icon colors. Use the static `ThemeConstants.Icon.ThemeColor` class properties. |

>caption Using TelerikSvgIcon

````CSHTML
<TelerikSvgIcon Icon="@SvgIcon.Audio" />

<TelerikSvgIcon Icon="@SvgIcon.SvgIcon"
                Size="@ThemeConstants.Icon.Size.Large"
                ThemeColor="@ThemeConstants.Icon.ThemeColor.Primary" />
````

### Use Custom SVG Icons

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

### Implement Custom SVG Icon Classes

The `Icon` parameter of `TelerikSvgIcon` expects an `ISvgIcon` object. This is a public interface, together with the `SvgIconBase` class. You can use them to create a collection of custom SVG icons.

The `ISvgIcon` interface members are:

| Member | Type | Description |
|---|---|---|
| `Name` | `string` | The `<title>` of the rendered `<svg>` HTML tag. |
| `Content` | `string` | All `<path>` tags inside the `<svg>` tag. |
| `ViewBox` | `string` | The `viewBox` attribute value of the `<svg>` tag. |

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
    }
}
````


## Set Global Icon Type

It is possible to configure the icon type for the whole application:

1. Locate the `<TelerikRootComponent>` tag in the Blazor app. It's usually in a layout file such as `MainLayout.razor` or `TelerikLayout.razor`.
2. Set the `TelerikRootComponent` `IconType` parameter to an `IconType` enum value - `Svg` or `Font`.

As of version 4.0, the default icon type is `Font`. We plan to switch it to `Svg` in the future for better display.

> The global `IconType` setting does not affect explicit `<TelerikFontIcon>` and `<TelerikSvgIcon>` instances in the app. It will toggle the icon type of all other components, such as Button, Grid, etc.

>caption Define global icon type via TelerikRootComponent

<div class="skip-repl"></div>

````HTML
<TelerikRootComponent IconType="@IconType.Svg">
    @Body
</TelerikRootComponent>
````


## Icons List

Here is a list of all available built-in icons in Telerik UI for Blazor. It is also possible to [open the list as a standalone web page](https://telerik.github.io/kendo-icons/).

<iframe src="https://telerik.github.io/kendo-icons/" style="width: 100%; height: 550px;"></iframe>


## Legacy Icons List

This section lists the avaialble font icons that come with the Telerik UI for Blazor themes. 

Each icon is accompanied by its name that you can use in the Telerik Blazor components where a Telerik `Icon` parameter is available.

>caption List of icon names to use in Telerik components Icon parameters

<div id="iconListContainer">

    <script src="scripts/scoped-plugin.js"></script>
    
    <style scoped>
    </style>
    
    <style scoped>
        ul.WebComponentsIcons > li:before {
            content: none !important;
        }
    
        ul.WebComponentsIcons > li {
            line-height: 15px;
            list-style-type: none;
            font-size: 16px;
            font-weight: 400;
        }
        
        ul.WebComponentsIcons .k-icon {
            display: block;
            clear: both;
            margin: 0 auto 10px;
            color: #656565;
            font-size: 32px;
        }
    </style>
        
    <ul id="IconsList" class="WebComponentsIcons">
        <li>Please wait, the list of icons is loading and rendering...</li>
    </ul>
    
    <p id="iconsLoadFail" style="display:none;">The Icon list failed to load. You can see the available icons in the <a href="https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons">Kendo UI Font Icons</a> article. To use them with UI for Blazor, remove the <code>k-i-</code> prefix. If you are seeing this, <a href="https://github.com/telerik/blazor-docs/issues/new">open an issue</a> to let us know the icon list is broken.</p>

</div>

<script>
    function scopeLatestTheme() {
        var latestThemeUrl = "https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css";

        $.ajax({
            url: latestThemeUrl,
            dataType: "text/css",
            success: function (data, extStatus, jqXHR) {
                console.log("fetching the themes changed, the icons list needs to be fixed, please open an issue if you see this");
                showFallbackInfo();
            },
            error: function (data, extStatus, jqXHR) {
                if (extStatus == "parsererror") { // we expect parsing the styles to fail
                    document.querySelector("#iconListContainer style").innerHTML = data.responseText;
                }
            },
        });
    }

    function renderIconsList() {
        scopeLatestTheme();

        var iconsListJson = "https://unpkg.com/@progress/kendo-font-icons@latest/dist/icon-list.json";
       
        $.getJSON(iconsListJson, function (data) {

            var iconsList = data;
            var iconsToRender = [];
            
            $.each(iconsList, function (index, iconName) {
                if (iconName != null) {
                    iconsToRender.push(`<li><span class="k-icon k-i-${iconName}"></span>${iconName}</li>`)
                }
            });

            $("#IconsList").html(iconsToRender.join(""));
        })
        .fail(showFallbackInfo);
    }
    
    function showFallbackInfo(){
        document.querySelector("#iconListContainer #iconsLoadFail").style.display = "";
        document.querySelector("#iconListContainer #IconsList").style.display = "none";
    }

    window.addEventListener("load", function () {
        setTimeout(function () {
            try {
                renderIconsList();
            } catch (e) {
                console.log(e);
                showFallbackInfo();
            }
        }, 1500); 
    });
</script>


## See Also

* [Blazor Live Demos](https://demos.telerik.com/blazor-ui/)
* [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
