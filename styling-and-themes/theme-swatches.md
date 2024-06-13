---
title: Theme Swatches
page_title: Theme Swatches
description: The UI for Blazor suite comes with a set of built-in themes and themes swatches that you can choose from.
slug: themes-swatches
tags: telerik,blazor,theme,swatch
published: True
previous_url: /styling-and-themes/swatch-distribution
position: 1
---

# Theme Swatches

Telerik UI for Blazor comes with four [built-in (base) themes]({%slug general-information/themes%}). Each of them provides a set of color swatches that you can choose from to match your application appearance and styling.

#### In this article:
   * [Basics](#basics)
   * [Built-in themes and swatches list](#built-in-themes-and-swatches-list)


## Basics

The theme swatches are different color variations of the base themes. While they use the same variables as the built-in theme they accompany, they have different color values to deliver a variety of shades for the Telerik components.

You can explore the swatches in our [live demos](https://demos.telerik.com/blazor-ui/grid/overview). The `Change Theme` dropdown provides a list of the most common swatches. To test how all the available swatches affect the appearance of the Telerik UI for Blazor components, you might check the [ThemeBuilder](https://themebuilderapp.telerik.com). It also provides option for [customizing the existing themes]({%slug themes-custom%}) if needed.

In addition, Telerik UI for Blazor distributes some swatches via several other resources. Read more in the [Swatch Distribution]({%slug themes-swatch-distribution%}) article.

## Built-in themes and swatches list

Here is a complete list of the base themes, all available swatches and their CDN URLs in a dedicated Themes CDN.

* [Default](#default) - These are the mostly ported swatches from our [ThemeBuilder](https://themebuilderapp.telerik.com).

* [Bootstrap](#bootstrap) - Main swatch is the current "[Bootstrap]({%slug general-information/themes%}#bootstrap-notes)" theme, which is built on Bootstrap 5. As the other names suggest, Bootstrap 3 and Bootstrap 4 swatches are color swatches adapted to look like the respective versions.

* [Material](#material) - Based on Material Design. Main is our "[Material]({%slug general-information/themes%}#material-notes)" theme, which itself is built around the initial theme of <a href = "https://material.angular.io/" target = "_blank">material.angular.io</a>.

* [Fluent](#fluent) - Based on [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui/).

>important Make sure that the theme version in the CDN URL is compatible with the UI for Blazor version. Our [release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) provide theme compatibility information for each UI for Blazor version. You can also use a [newer theme version](https://github.com/telerik/kendo-themes/releases), if it doesn't contain breaking changes and has a fix that you need. 

>tip We distribute the most commonly used swatches in a separate [Telerik Blazor CDN]({%slug themes-swatch-distribution%}#telerik-blazor-cdn). The CDN URLs contain the Telerik UI for Blazor version. Thus, you do not need to manually track the theme compatibility, just make sure to use the CDN URL including your UI for Blazor version.


### Default

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Swatch | CDN |
| ----------- | ----------- |
| Default Main | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-main.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/all.css
| Default Main Dark | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-main-dark.css
| [Default Ocean Blue]({%slug themes-accessibility-swatch%}) | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-ocean-blue.css
| Default Blue | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-blue.css
| Default Green | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-green.css
| Default Nordic | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-nordic.css
| Default Orange | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-orange.css
| Default Purple | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-purple.css
| Default Turquoise | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-turquoise.css
| Default Urban | https://unpkg.com/@progress/kendo-theme-default@{{site.themeCdnVersion}}/dist/default-urban.css

### Bootstrap

| Swatch | CDN |
| ----------- | ----------- |
| Bootstrap Main | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-main.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/all.css
| Bootstrap Main Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-main-dark.css
| Bootstrap 3 | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-3.css
| Bootstrap 3 Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-3-dark.css
| Bootstrap 4 | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-4.css
| Bootstrap 4 Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-4-dark.css
| Bootstrap Nordic | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-nordic.css
| Bootstrap Turquoise | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-turquoise.css
| Bootstrap Turquoise Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-turquoise-dark.css
| Bootstrap Urban | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-urban.css
| Bootstrap Vintage | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themeCdnVersion}}/dist/bootstrap-vintage.css


### Material

| Swatch | CDN |
| ----------- | ----------- |
| Material Main | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-main.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/all.css
| Material Main Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-main-dark.css
| Material Aqua Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-aqua-dark.css
| Material Arctic | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-arctic.css
| Material Burnt Teal | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-burnt-teal.css
| Material Eggplant | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-eggplant.css
| Material Lime | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-lime.css
| Material Lime Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-lime-dark.css
| Material Nova | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-nova.css
| Material Pacific | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-pacific.css
| Material Pacific Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-pacific-dark.css
| Material Sky | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-sky.css
| Material Sky Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-sky-dark.css
| Material Smoke | https://unpkg.com/@progress/kendo-theme-material@{{site.themeCdnVersion}}/dist/material-smoke.css

### Fluent

| Swatch | CDN |
| ----------- | ----------- |
| Fluent Main | https://unpkg.com/@progress/kendo-theme-fluent@{{site.themeCdnVersion}}/dist/fluent-main.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-fluent@{{site.themeCdnVersion}}/dist/all.css

=====

Telerik UI for Blazor distributes the most commonly used swatches. While it is possible to get them from the [Themes CDN]({%slug themes-swatches%}#buit-in-themes-and-swatches-list), the [Sass Theme Builder]({%slug themes-custom%}#using-themebuilder) or the [kendo-themes repository](https://github.com/telerik/kendo-themes), this article lists a couple other ways of distribution.

>caption In this article:

* [Distributed Swatches](#distributed-swatches)
* [Distribution Options](#distribution-options)
    * [Telerik Blazor CDN](#telerik-blazor-cdn)
    * [ZIP archive](#zip-archive)
    * [Visual Studio and Visual Studio Code Wizards](#visual-studio-and-visual-studio-code-wizards)

## Distributed Swatches

The following swatches are statistically most used, so we've included them in our [live demos](https://demos.telerik.com/blazor-ui/grid/overview) to allow easy testing. In addition, we are also distributing them via [several resources](#distribution-options).

Telerik UI for Blazor distributed swatches:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Default | Bootstrap  | Material | Fluent |
| --- | --- | --- | --- |
| Main | Main | Main | Main |
| Main Dark | Main Dark | Arctic |
| [Ocean Blue]({%slug themes-accessibility-swatch%}) | Nordic | Nova |
| Nordic | Urban | Lime Dark |
| Purple | Vintage | Main Dark |
| Turquoise |


## Distribution Options

The above listed swatches are distributed in several ways:

### Telerik Blazor CDN

A dedicated Telerik UI for Blazor CDN hosts them in the `swatches` folder of the corresponding base theme. Below you will find a list of the distributed swatches and their CDN URLs.

The CDN URLs contain the Telerik UI for Blazor version. Thus, you do not need to manually track the theme compatibility. Just make sure to use your UI for Blazor version in the URL.

#### Default

Swatch | CDN |
| ----------- | ----------- |
| Main | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-main.css
| Main Dark | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-main-dark.css
| [Ocean Blue]({%slug themes-accessibility-swatch%}) | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-ocean-blue.css
| Nordic | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-nordic.css
| Purple | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-purple.css
| Turquoise | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-turquoise.css


#### Bootstrap

Swatch | CDN |
| ----------- | ----------- |
| Main | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-main.css
| Main Dark | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-main-dark.css
| Nordic | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-nordic.css
| Urban | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-urban.css
| Vintage | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-vintage.css

#### Material

Swatch | CDN |
| ----------- | ----------- |
| Main | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-material/swatches/material-main.css
| Arctic | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-material/swatches/material-arctic.css
| Nova | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-material/swatches/material-nova.css
| Lime Dark | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-material/swatches/material-lime-dark.css
| Main Dark | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-material/swatches/material-main-dark.css


#### Fluent

Swatch | CDN |
| ----------- | ----------- |
| Main | https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-fluent/swatches/fluent-main.css


### ZIP archive

One of the ways to install Telerik UI for Blazor is to use the ZIP Archive. Its `styles` folder contains all the above swatches. You can [download it from your Telerik account](https://www.telerik.com/account/downloads). Here is [more information about the ZIP Archive]({%slug installation/zip%})...

### Visual Studio and Visual Studio Code Wizards

The **Create New Project** wizards for [Visual Studio]({%slug getting-started-vs-integration-new-project%}) and [Visual Studio Code]({%slug getting-started-vs-code-integration-new-project%}) allow you to select the desired theme/swatch for your application. The wizards provide the above list of common swatches.

> Once you've created the project, the selected theme will be saved locally in the `wwwroot/lib/blazor-ui/styles` folder of the application. With this configuration, upgrading UI for Blazor requires you to replace this CSS file manually.
