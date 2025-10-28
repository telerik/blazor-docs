---
title: Themes Overview
page_title: Themes Overview
description: Telerik comes with built-in CSS Blazor themes that control the visual appearance of your UI components.
slug: themes-overview
tags: telerik,blazor,theme,built-in
published: True
previous_url: /themes/overview,/styling-and-themes/swatch-distribution,/styling-and-themes/theme-swatches,/styling-and-themes/form-elements,/styling-and-themes/figma-ui-kits
position: 0
---

# Themes Overview

Telerik UI for Blazor comes with a set of built-in CSS themes that control the visual appearance of the components. Each theme determines the components' colors, borders, backgrounds, size, layout, position, font size and sometimes the font family.

>caption In This Article

* [Definitions for *theme* and *swatch*](#basics) and [how the themes in Blazor relate to the components](#integration-with-the-telerik-components)
* [All built-in theme and swatch names](#built-in-themes) and how to [preview them](#comparing-themes-and-swatches)
* How to [register a theme in your app](#using-a-theme)
* How to [ensure compatibility between the Telerik components and the theme version](#compatibility-and-maintenance)

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## Basics

### What is a Theme?

A *theme* is a collection of styles in a CSS file, which determine the appearance of the Telerik Blazor components, including fonts, colors, sizes and layouts. For example, *Default* and *Bootstrap* are two [built-in theme names](#built-in-themes).

### What is a Swatch?

A *theme swatch* is a color variation of a theme. All <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">swatches of a given theme</a> use the same fonts, sizes, and layouts. On the other hand, the text colors, background colors and border colors are different. For example, *Default Ocean Blue* and *Bootstrap Nordic* are two built-in swatch names.

When the Telerik UI for Blazor documentation talks about a given theme name, for example *Default*, this implies the *Main* swatch of this theme. In addition, the word "theme" as a general term can imply any swatch of any theme.

The CSS file of any swatch is self-sufficient and contains all required styles for the Telerik Blazor components, except the optional [font icon styles](slug:common-features-icons#font-icon-stylesheet). You can [switch the theme runtime](slug:common-kb-change-theme-runtime), but the Blazor app should always load only one theme at a time.

### Integration with the Telerik Components

The CSS themes represent an external dependency to Telerik UI for Blazor:

* The themes represent a separate product, which is used by multiple Telerik and Kendo UI products. [Each Telerik UI for Blazor version is compatible with specific theme versions](#compatibility-and-maintenance).
* The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/" target="_blank">Telerik and Kendo UI Themes documentation</a> is part of the <a href="https://www.telerik.com/design-system/docs/" target="_blank">Progress Design System Kit documentation</a>. The content in the Telerik UI for Blazor documentation is introductory or specific only to the Blazor components.
* The Telerik and Kendo UI Themes have their own product development, roadmap and strategy. You can log public feature requests or bug reports on the [Telerik Themes feedback portal](https://feedback.telerik.com/themes).


## Built-in Themes

The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/#available-themes" target="_blank">Themes - Get Started page</a> lists the built-in themes in Telerik UI for Blazor and describes their unique specifics.

### Comparing Themes and Swatches

You can explore and compare the built-in theme swatches on the [live Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui/grid/overview). Use the **Change Theme** dropdown above each component example. To test how the available swatches affect the appearance of the Telerik UI for Blazor components, you can also check the [ThemeBuilder app](https://themebuilderapp.telerik.com). This tool provides the ability to <a href="https://docs.telerik.com/themebuilder/introduction" target="_blank">customize the existing themes and swatches</a>.


## Using a Theme

To register a theme:

* Reference its stylesheet in the `<head>` of the web page. The exact project file that contains the `<head>` tag depends on the .NET version and the Blazor application type. See our [Getting Started guides](slug:blazor-overview#getting-started) for more information.
* Set the `k-body` CSS class to the root container of your app, which is normally the `<body>` element. This class applies default text color and background color to generic web content and is especially important when using dark theme swatches.

There are three ways to load a Telerik theme, in terms of physical CSS file location. Note that each option provides access to a different number of theme swatches.

* [Load a CSS theme as a static asset from the `Telerik.UI.for.Blazor` NuGet package](#loading-themes-in-blazor-from-the-nuget-package). This is the easiest option and it doesn't require maintenance during [Telerik UI for Blazor version upgrades](slug:upgrade-tutorial). However, you can use only the *Main* swatch of each theme and the *Ocean Blue* swatch of the *Default* theme.
* Load a CSS theme from a remote URL, for example, CDN. The dedicated <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/" target="_blank">documentation of each theme provides a list of swatches and their URLs</a>.
* Load a CSS theme as a local file in the `wwwroot` folder in the Blazor app. This option is relevant to the following cases:
    * When using [custom themes](slug:themes-customize).
    * When [creating](slug:getting-started-vs-integration-new-project) or [converting](slug:getting-started-vs-integration-convert-project) Telerik Blazor apps with the [Telerik UI for Blazor Visual Studio extension](slug:getting-started-vs-integration-overview).
    * When using themes from the Telerik UI for Blazor [MSI installer](slug:installation-msi) or [ZIP archive](slug:installation-zip). The CSS files are in the `swatches` folder.
    * When using [LibMan](slug:common-kb-telerik-themes-libman) or <a href="https://www.telerik.com/design-system/docs/themes/get-started/installation/" target="_blank">npm</a> to obtain a specific Telerik theme version. In this case, you can use all built-in theme swatches.

> The Blazor app must load only one Telerik theme file at a time. Upgrade the theme with every Telerik UI for Blazor version upgrade, unless you are loading the theme as a static NuGet asset.

### Loading Themes in Blazor from the NuGet Package

The easiest way to load a Telerik theme in a Blazor app is to reference a static asset from the NuGet package. The .NET SDK will copy the CSS file to the output folder during build automatically. Static assets provide the following benefits:

* The application relies on available local resources, instead of third parties and remote URLs.
* The theme URL does not change across component versions, which makes product updates easier. [Add a cache buster to avoid possible browser caching issues](slug:common-kb-browser-cache-buster).

The `Telerik.UI.for.Blazor` NuGet package includes only the *Main* swatch of each theme and the *Ocean Blue* swatch of the *Default* theme. The code snippet below shows all available CSS files in the NuGet package and their correct URLs. To use another swatch, see the section [Using a Theme](#using-a-theme) above.

>caption Load a Telerik theme as a static NuGet asset

<div class="skip-repl"></div>

````HTML
<head>
    <!-- Choose only one theme. -->
    
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />

    <!-- 
    <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/default-ocean-blue.css" rel="stylesheet" />
    <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-bootstrap/all.css" rel="stylesheet" />
    <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-material/all.css" rel="stylesheet" />
    <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-fluent/all.css" rel="stylesheet" />
    -->
</head>
````

## Compatibility and Maintenance

The Telerik themes are decoupled from the Telerik Blazor components, which leads to the following usage requirements:

* When using a CSS theme as local file in `wwwroot`, [replace the file every time you change the Telerik UI for Blazor version](slug:upgrade-tutorial). This includes apps [created with the Telerik Blazor Visual Studio extension without CDN support](slug:getting-started-vs-integration-new-project#step-3-select-theme).
* When loading <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">theme swatches</a> from a CDN, make sure that the theme version is compatible with the Telerik UI for Blazor version. Our [release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) provide theme compatibility information for each components version. You can also use a <a href="https://www.telerik.com/design-system/docs/themes/get-started/changelog/" target="_blank">newer minor theme version</a>, which doesn't contain breaking changes. In other words, the latest major theme version may be still incompatible with the latest version of Telerik UI for Blazor.


## Next Steps

* [Modify a built-in theme or create a custom theme](slug:themes-customize)
* [Explore the Telerik and Kendo UI Kits for Figma](https://www.telerik.com/design-system/docs/resources/figma-ui-kits/)

## See Also

* [Change the Theme at Runtime](slug:common-kb-change-theme-runtime)
* <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/#ocean-blue-accessibility-swatch" target="_blank">Default Ocean Blue Accessibility Swatch</a>
* [Live UI for Blazor Demos](https://demos.telerik.com/blazor-ui)
