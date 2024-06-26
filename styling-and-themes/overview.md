---
title: Built-in Themes
page_title: Themes
description: The UI for Blazor suite comes with a set of built-in themes that you can choose from. Bootstrap and Material themes are also included.
slug: themes-built-in
tags: telerik,blazor,theme,built-in
published: True
previous_url: /themes/overview,/styling-and-themes/form-elements
position: 0
---

# Built-in Themes

Telerik UI for Blazor comes with a set of built-in CSS themes that control the visual appearance of the components. Each theme determines the components' colors, borders, backgrounds, size, layout, position, font size and sometimes the font family. You can compare all themes and swatches on the [Telerik UI for Blazor live demos](https://demos.telerik.com/blazor-ui/).

[Telerik UI for Blazor has the same HTML rendering and theme stylesheets as other Telerik and Kendo UI web products](#built-in-theme-development), so previous experience with them can be helpful. At the same time, the Telerik UI for Blazor components are *native Blazor components* and not wrappers around other Telerik products.

## Theme Names

The available built-in themes are:

* **Default** uses a neutral Telerik design and suits most cases. The theme has a built-in [swatch (color variation)]({%slug themes-swatches%}) called [Ocean Blue A11y]({%slug themes-accessibility-swatch%}), which provides enhanced contrast for WCAG level AA accessibility compliance.
* **Bootstrap** matches the styling of the [Bootstrap CSS framework](https://getbootstrap.com). Make sure to check the [Bootstrap Notes](#bootstrap-notes) below.
* **Material** implements the [Material Design](https://material.io/) and is built around the initial theme of [material.angular.io](https://material.angular.io). See the [Material Notes](#material-notes) below for usage recommendations.
* **Fluent** is based on [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui/).

Each theme can have built-in color variations called [swatches]({%slug themes-swatches%}). When this documentation talks about a given theme name, for example *Default*, this implies the *Main* swatch of this theme. In addition, the word "theme" as a standalone term can imply any swatch of any theme, or the CSS file of a theme.


## Using a Theme

To register a theme, you must reference its stylesheet in the `<head>` the web page. The exact project file that contains the `<head>` tag depends on the .NET version and the Blazor application type. See our [Getting Started guides]({%slug blazor-overview%}#getting-started) for more information.

There are three ways to load a Telerik theme, in terms of physical CSS file location. Note that each option provides access to a different number of theme swatches.

* [Load a CSS theme as a static asset from the `Telerik.UI.for.Blazor` NuGet package](#loading-themes-from-the-nuget-package). This is the easiest option and it doesn't require maintenance during [Telerik UI for Blazor version upgrades]({%slug upgrade-tutorial%}). However, you can use only the *Main* swatch of each theme and the *Ocean Blue* swatch of the *Default* theme.
* Load a CSS theme from a remote URL, for example, the [Telerik CDN]({%slug common-features-cdn%}). See [Theme Swatches]({%slug themes-swatches%}) for the full list of available built-in swatches and their CDN URLs.
* Load a CSS theme as a local file in the `wwwroot` folder in the Blazor app. This option is relevant to the following cases:
    * When using [custom themes]({%slug themes-custom%}#loading-custom-themes).
    * When [creating]({%slug getting-started-vs-integration-new-project%}) or [converting]({%slug getting-started-vs-integration-convert-project%}) Telerik Blazor apps with the [Telerik UI for Blazor Visual Studio extension]({%slug getting-started-vs-integration-overview%}).
    * When using [LibMan]({%slug common-kb-telerik-themes-libman%}) or [npm]({%slug themes-custom%}#building-themes-from-source-code) to obtain a specific Telerik theme version. In this case, you can use all built-in theme swatches.

> The Blazor app must load only one Telerik theme file at a time.

### Theme Version Compatibility and Maintenance

The [Telerik themes are decoupled from the Telerik Blazor components](#built-in-theme-development), which leads to the following usage requirements:

* When using a CSS theme as local file in `wwwroot`, [replace the file every time you change the Telerik UI for Blazor version]({%slug upgrade-tutorial%}). This includes apps [created with the Telerik Blazor Visual Studio extension without CDN support]({%slug getting-started-vs-integration-new-project%}#using-local-theme).
* When using [swatches on UNPKG CDN]({%slug themes-swatches%}#swatch-urls), make sure that the theme version in the CDN URL is compatible with the Telerik UI for Blazor version. Our [release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) provide theme compatibility information for each components version. You can also use a [newer minor theme version](https://github.com/telerik/kendo-themes/releases), if it doesn't contain breaking changes.

### Loading Themes from the NuGet Package

The easiest way to load a Telerik theme is to reference a static asset from the NuGet package. The .NET SDK will copy the CSS file to the output folder during build automatically. Static assets provide the following benefits:

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

@[template](/_contentTemplates/common/general-info.md#change-theme-runtime)


## Bootstrap Notes

The Telerik Bootstrap theme has a similar design to the Bootstrap framework and it uses the Bootstrap metrics to integrate Telerik Blazor components in an application that already uses Bootstrap for layout and styles.

There are some important differences between the Bootstrap framework and the Telerik Bootstrap theme:

* The two products are completely independent. They do not share CSS classes and code.
* The Telerik Bootstrap theme does not require or depend on the Bootstrap framework stylesheet.
* The Bootstrap framework stylesheet and the Telerik Bootstrap theme cannot be used interchangeably.

To use Bootstrap-styled Telerik components in a Bootstrap-styled app, you need to load both stylesheets. You can use Bootstrap to create layouts and then put Telerik components inside those layouts. You can use Bootstrap CSS classes and utilities on your own HTML elements in the markup regardless of the components inside.

> Using Bootstrap CSS classes on Telerik components may lead to styling conflicts and is generally not necessary or recommended. Do not set the `form-control` Bootstrap CSS class on Telerik input components such as ComboBox, TextBox, and others.

You may want to avoid the Bootstrap framework and rely only on Telerik components for layout. In this case, [explore and compare the layout components in Telerik UI for Blazor]({%slug common-kb-layout-component-comparison%}).


## Material Notes

To apply the Material Design guidelines, the Blazor app should load and use the [Roboto font family](https://fonts.google.com/specimen/Roboto).

The Telerik Material theme does not include the Roboto font itself, because it is a third-party property. Instead, the Telerik Blazor components inherit their font family from the application, so if the app uses Roboto, the Telerik components will do so too.

One possible way to add the Roboto font from Google Fonts is:

<div class="skip-repl"></div>

````HTML
<!-- Load the Roboto font file -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />

<!-- Apply the Roboto font family globally -->
<style>
  body {
      font-family: Roboto, sans-serif;
    }
</style>
````


## Built-in Theme Development

The CSS themes represent an external dependency to Telerik UI for Blazor. The themes are a separate product, which is used by all Telerik and Kendo UI web products. The themes have their own product roadmap and strategy. You can log bug reports and feature requests on the [Telerik Themes feedback portal](https://feedback.telerik.com/themes).


## Next Steps

* [Choose a theme swatch]({%slug themes-swatches%})
* [Create a custom theme]({%slug themes-custom%})


## See Also

* [Change the Theme at Runtime]({%slug change-theme-runtime%})
* [Live UI for Blazor Demos](https://demos.telerik.com/blazor-ui/)
