---
title: Theme Swatches
page_title: Theme Swatches
description: The UI for Blazor suite comes with a set of built-in themes and themes swatches that you can choose from.
slug: themes-swatches
tags: telerik,blazor,theme,swatch
published: True
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
| Default Main | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-main.css
| Default Main Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-main-dark.css
| [Default Ocean Blue]({%slug themes-accessibility-swatch%}) | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-ocean-blue.css
| Default Blue | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-blue.css
| Default Green | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-green.css
| Default Nordic | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-nordic.css
| Default Orange | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-orange.css
| Default Purple | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-purple.css
| Default Turquoise | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-turquoise.css
| Default Urban | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/default/default-urban.css


### Bootstrap

| Swatch | CDN |
| ----------- | ----------- |
| Bootstrap Main | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-main.css
| Bootstrap Main Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-main-dark.css
| Bootstrap 3 | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-3.css
| Bootstrap 3 Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-3-dark.css
| Bootstrap 4 | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-4.css
| Bootstrap 4 Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-4-dark.css
| Bootstrap Nordic | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-nordic.css
| Bootstrap Turquoise | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-turquoise.css
| Bootstrap Turquoise Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-turquoise-dark.css
| Bootstrap Urban | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-urban.css
| Bootstrap Vintage | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/bootstrap/bootstrap-vintage.css


### Material

| Swatch | CDN |
| ----------- | ----------- |
| Material Main | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-main.css
| Material Main Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-main-dark.css
| Material Aqua Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-aqua-dark.css
| Material Arctic | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-arctic.css
| Material Burnt Teal | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-burnt-teal.css
| Material Eggplant | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-eggplant.css
| Material Lime | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-lime.css
| Material Lime Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-lime-dark.css
| Material Nova | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-nova.css
| Material Pacific | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-pacific.css
| Material Pacific Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-pacific-dark.css
| Material Sky | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-sky.css
| Material Sky Dark | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-sky-dark.css
| Material Smoke | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/material/material-smoke.css

### Fluent

| Swatch | CDN |
| ----------- | ----------- |
| Fluent Main | https://cdn.kendostatic.com/themes/{{site.themeCdnVersion}}/fluent/fluent-main.css
