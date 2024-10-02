---
title: Themes Overview
page_title: Themes Overview
description: The UI for Blazor suite comes with a set of built-in themes that you can choose from. Bootstrap and Material themes are also included.
slug: themes-overview
tags: telerik,blazor,theme,built-in
published: True
previous_url: /themes/overview,/styling-and-themes/swatch-distribution,/styling-and-themes/theme-swatches,/styling-and-themes/form-elements
position: 0
---

# Themes Overview

Telerik UI for Blazor comes with a set of built-in CSS themes that control the visual appearance of the components. Each theme determines the components' [colors](https://www.telerik.com/design-system/docs/foundation/color/), borders, backgrounds, size, layout, position, font size and sometimes the font family.

The CSS themes represent an external dependency to Telerik UI for Blazor:

* The themes represent a separate product, which is used by multiple Telerik and Kendo UI products.
* The [Telerik and Kendo UI Themes documentation](https://www.telerik.com/design-system/docs/themes/get-started/introduction/) is part of the [Telerik Design System documentation](https://www.telerik.com/design-system/docs/). The content in the Telerik UI for Blazor documentation is introductory or specific only to the Blazor components.
* The Telerik and Kendo UI Themes have their own product development, roadmap and strategy. You can log public feature requests or bug reports on the [Telerik Themes feedback portal](https://feedback.telerik.com/themes).

This article contains the following sections:

* [Definitions for *theme* and *swatch*](#basics)
* [All built-in theme and swatch names](#built-in-themes) and how to [preview them](#comparing-themes-and-swatches)
* How to [register a theme in your web app](#using-a-theme)
    * Which is the [easiest approach](#loading-themes-from-the-nuget-package)
    * How to [ensure compatibility](#theme-version-compatibility-and-maintenance) between the Telerik components for Blazor and the theme version
    * How to [change the theme or swatch runtime](#changing-themes-runtime)
* How to [create a custom themes](#custom-themes) or [customize an existing theme](#setting-theme-variables)

## Basics

A *theme* is a collection of styles in a single CSS file, which determine the appearance of the Telerik Blazor components, including fonts, colors, sizes and layouts. For example, *Default* and *Bootstrap* are two [built-in theme names](#built-in-themes).

A [*theme swatch*](https://www.telerik.com/design-system/docs/themes/customization/swatches/) is a color variation of a theme. All swatches of a given theme use the same fonts, sizes, and layouts. On the other hand, the text colors, background colors and border colors are different. For example, *Default Ocean Blue* and *Bootstrap Nordic* are two built-in swatch names.

When the Telerik UI for Blazor documentation talks about a given theme name, for example *Default*, this implies the *Main* swatch of this theme. In addition, the word "theme" as a general term can imply any swatch of any theme.

The CSS file of any swatch is self-sufficient and contains all required styles for the Telerik Blazor components, except the optional [font icon styles]({%slug common-features-icons%}#font-icon-stylesheet). The Blazor app should load only one theme (swatch) at a time.


## Built-in Themes

The [Themes - Get Started page](https://www.telerik.com/design-system/docs/themes/get-started/introduction/#available-themes) lists the built-in themes in Telerik UI for Blazor and describes their unique specifics.

### Comparing Themes and Swatches

You can explore and compare the built-in theme swatches on the [live Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui/grid/overview). Use the **Change Theme** dropdown above each component example. To test how the available swatches affect the appearance of the Telerik UI for Blazor components, you can also check the [ThemeBuilder app](https://themebuilderapp.telerik.com). This tool provides the ability to [customize the existing themes and swatches](https://www.telerik.com/design-system/docs/themes/themebuilder/).


## Using a Theme

To register a theme, you must reference its stylesheet in the `<head>` of the web page. The exact project file that contains the `<head>` tag depends on the .NET version and the Blazor application type. See our [Getting Started guides]({%slug blazor-overview%}#getting-started) for more information.

There are three ways to load a Telerik theme, in terms of physical CSS file location. Note that each option provides access to a different number of theme swatches.

* [Load a CSS theme as a static asset from the `Telerik.UI.for.Blazor` NuGet package](#loading-themes-from-the-nuget-package). This is the easiest option and it doesn't require maintenance during [Telerik UI for Blazor version upgrades]({%slug upgrade-tutorial%}). However, you can use only the *Main* swatch of each theme and the *Ocean Blue* swatch of the *Default* theme.
* Load a CSS theme from a remote URL, for example, CDN. See the [documentation of the desired theme for a list of swatches and their URLs](https://www.telerik.com/design-system/docs/themes/theme-default/).
* Load a CSS theme as a local file in the `wwwroot` folder in the Blazor app. This option is relevant to the following cases:
    * When using [custom themes]({%slug themes-custom%}#loading-custom-themes).
    * When [creating]({%slug getting-started-vs-integration-new-project%}) or [converting]({%slug getting-started-vs-integration-convert-project%}) Telerik Blazor apps with the [Telerik UI for Blazor Visual Studio extension]({%slug getting-started-vs-integration-overview%}).
    * When using themes from the Telerik UI for Blazor [MSI installer]({%slug installation/msi%}) or [ZIP archive]({%slug installation/zip%}). The CSS files are in the `swatches` folder.
    * When using [LibMan]({%slug common-kb-telerik-themes-libman%}) or [npm](https://www.telerik.com/design-system/docs/themes/get-started/installation/) to obtain a specific Telerik theme version. In this case, you can use all built-in theme swatches.

> The Blazor app must load only one Telerik theme file at a time. Upgrade the theme with every Telerik UI for Blazor version upgrade, unless you are loading the theme as a static NuGet asset.

### Loading Themes from the NuGet Package

The easiest way to load a Telerik theme in a Blazor app is to reference a static asset from the NuGet package. The .NET SDK will copy the CSS file to the output folder during build automatically. Static assets provide the following benefits:

* The application relies on available local resources, instead of third parties and remote URLs.
* The theme URL does not change across component versions, which makes product updates easier.

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

> Trial users must add `.Trial` to the theme URL:
>
> `<link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />`

### Theme Version Compatibility and Maintenance

The Telerik themes are decoupled from the Telerik Blazor components, which leads to the following usage requirements:

* When using a CSS theme as local file in `wwwroot`, [replace the file every time you change the Telerik UI for Blazor version]({%slug upgrade-tutorial%}). This includes apps [created with the Telerik Blazor Visual Studio extension without CDN support]({%slug getting-started-vs-integration-new-project%}#step-3-configure-additional-project-settings).
* When loading [theme swatches](https://www.telerik.com/design-system/docs/themes/customization/swatches/) from a CDN, make sure that the theme version is compatible with the Telerik UI for Blazor version. Our [release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) provide theme compatibility information for each components version. You can also use a [newer minor theme version](https://www.telerik.com/design-system/docs/themes/get-started/changelog/), which doesn't contain breaking changes.

### Changing Themes Runtime

@[template](/_contentTemplates/common/general-info.md#change-theme-runtime)

## Custom Themes

Custom themes allow you to modify the appearance of the Telerik UI for Blazor components, so they match the desired color scheme and your Blazor app coloring and style.

You can customize the appearance of the Telerik Blazor components in several ways. Each has pros and cons, and each is most suitable for specific scenarios and business requirements. The [Blazor Theme Customization Options]({%slug common-kb-theme-customization-options%}) article offers a detailed comparison between these CSS customization alternatives:

* [Use the ThemeBuilder tool to create a custom theme](#using-themebuilder)
* [Set theme variables without creating a custom theme](#setting-theme-variables)
* [Build a custom theme from source code](#building-themes-from-source-code)

> When you use custom themes for Telerik UI for Blazor components, you must recreate the custom theme every time you update the Telerik components in your application. This ensures compatibility and allows you to get the theme updates and fixes.

### Using ThemeBuilder

The [ThemeBuilder](https://www.telerik.com/design-system/docs/themes/themebuilder/) is a web application that enables you to create new custom themes by changing the styles of existing built-in themes. Every change that you make is visualized almost instantly. Once you are done styling the UI components, you can export a ZIP file with the desired styles and [use the theme CSS file in your Blazor app](#using-a-theme).

### Setting Theme Variables

The Telerik themes define a collection of theme variables and values. Then, these variables take part in CSS rules to apply consistent styles to all Telerik Blazor components. With regard to colors, the themes rely on a [color system](https://www.telerik.com/design-system/docs/foundation/color/), which is built on [color variable groups](https://www.telerik.com/design-system/docs/foundation/color/swatch/) and [color palettes](https://www.telerik.com/design-system/docs/foundation/color/color-palettes/).

It is possible to customize the appearance of the Telerik UI for Blazor components if you override the theme variable values outside the theme CSS file. This spares the need to create and maintain a full custom theme.

Each theme defines the same collection of variables, but with different values. For example, here are the [Default theme variables](https://www.telerik.com/design-system/docs/themes/theme-default/theme-variables/).

The example below shows how to customize some of the theme variables.

>caption Override theme variables

````CSHTML
@if (RenderCustomVariables)
{
    <style>
        :root {
            --kendo-color-base: #ddf;
            --kendo-color-base-hover: #eef;
            --kendo-color-base-active: #ccf;
            --kendo-color-on-base: #00c;

            --kendo-color-primary: #c00;
            --kendo-color-primary-hover: #c66;
            --kendo-color-primary-active: #900;
            --kendo-color-on-primary: #fee;

            --kendo-border-radius-md: 1rem;

            --kendo-font-size: 18px;
        }
    </style>
}

<p><label><TelerikCheckBox @bind-Value="@RenderCustomVariables" />
    Apply Custom Theme Variables</label></p>

<TelerikButton>Base Button</TelerikButton>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Primary Button
</TelerikButton>

@code {
    private bool RenderCustomVariables { get; set; } = true;
}
````

### Building Themes From Source Code

The most complex and flexible way to use Telerik themes is to build them from the SASS source code in your development environment.

The [Theme Customization page of the Progress Design System documentation](https://www.telerik.com/design-system/docs/themes/customization/) and the [kendo-themes repository wiki](https://github.com/telerik/kendo-themes/wiki/Compiling-themes) provide more information about this process.


## Next Steps

* [Choose a theme swatch]({%slug themes-swatches%})
* [Create a custom theme]({%slug themes-custom%})

## See Also

* [Change the Theme at Runtime]({%slug change-theme-runtime%})
* [Default Ocean Blue Accessibility Swatch](https://www.telerik.com/design-system/docs/foundation/guides/accessibility/global-accessibility/)
* [Live UI for Blazor Demos](https://demos.telerik.com/blazor-ui/)
