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

Telerik UI for Blazor comes with several [built-in themes]({%slug themes-built-in%}). Each of them provides a set of color swatches that you can choose from to match your application appearance and styling.


## Basics

A *theme* is a collection of styles, which determine the appearance of the Telerik Blazor components, including fonts, colors, sizes and layouts. For example, **Default** and **Bootstrap** are two [built-in theme names]({%slug themes-built-in%}#built-in-theme-names).

A *theme swatch* is a color variation of a theme. All swatches of a given theme use the same fonts, sizes, and layouts. On the other hand, the text colors, background colors and border colors are different. For example, **Default Ocean Blue** and **Bootstrap Nordic** are two built-in swatch names.

When this documentation talks about a given theme name, for example **Default**, this implies the **Main** swatch of this theme. In addition, the word "theme" as a general term can imply any swatch of any theme.

The CSS file of a swatch is self-sufficient and contains all required styles for the Telerik Blazor components, except the optional [font icon styles]({%slug common-features-icons%}#font-icon-stylesheet). The Blazor app should load only one theme (swatch) at a time.

### Comparing Built-in Swatches

You can explore built-in theme swatches on the [live Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui/grid/overview). Use the **Change Theme** drop down above each component example. To test how the available swatches affect the appearance of the Telerik UI for Blazor components, you can also check the [ThemeBuilder app](https://themebuilderapp.telerik.com). This tool provides the ability to [customize the existing themes and swatches]({%slug themes-custom%}).


## Using Built-in Swatches

There are a few ways to obtain and use the Telerik theme swatches:

* Download the Telerik UI for Blazor [MSI installer]({%slug installation/msi%}) or [ZIP archive]({%slug installation/zip%}) from your Telerik account. Get the required CSS file(s) from the `swatches` folder and place them in your Blazor app.
* Download the required swatch(es) from the [CDN URLs below](#swatch-urls) or use these URLs directly in your Blazor app.

Always make sure the [swatch file version is compatible with the Telerik UI for Blazor version]({%slug themes-built-in%}#version-compatibility).

@[template](/_contentTemplates/common/general-info.md#change-theme-runtime)


## Swatch URLs

### Default Theme

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Swatch Name | CDN URL |
| --- | --- |
| Default Main | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/all.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-main.css
| Default Main Dark | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-main-dark.css
| [Default Ocean Blue]({%slug themes-accessibility-swatch%}) | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-ocean-blue.css
| Default Blue | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-blue.css
| Default Green | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-green.css
| Default Nordic | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-nordic.css
| Default Orange | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-orange.css
| Default Purple | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-purple.css
| Default Turquoise | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-turquoise.css
| Default Urban | https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-urban.css

### Bootstrap Theme

| Swatch Name | CDN URL |
| --- | --- |
| Bootstrap Main <br /> (Bootstrap 5) | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/all.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-main.css
| Bootstrap Main Dark <br /> (Bootstrap 5 Dark) | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-main-dark.css
| Bootstrap 3 | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-3.css
| Bootstrap 3 Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-3-dark.css
| Bootstrap 4 | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-4.css
| Bootstrap 4 Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-4-dark.css
| Bootstrap Nordic | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-nordic.css
| Bootstrap Turquoise | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-turquoise.css
| Bootstrap Turquoise Dark | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-turquoise-dark.css
| Bootstrap Urban | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-urban.css
| Bootstrap Vintage | https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-vintage.css

### Material Theme

| Swatch Name | CDN URL |
| --- | --- |
| Material Main | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/all.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-main.css
| Material Main Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-main-dark.css
| Material Aqua Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-aqua-dark.css
| Material Arctic | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-arctic.css
| Material Burnt Teal | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-burnt-teal.css
| Material Eggplant | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-eggplant.css
| Material Lime | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-lime.css
| Material Lime Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-lime-dark.css
| Material Nova | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-nova.css
| Material Pacific | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-pacific.css
| Material Pacific Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-pacific-dark.css
| Material Sky | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-sky.css
| Material Sky Dark | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-sky-dark.css
| Material Smoke | https://unpkg.com/@progress/kendo-theme-material@{{site.themesVersion}}/dist/material-smoke.css

### Fluent Theme

| Swatch Name | CDN URL |
| --- | --- |
| Fluent Main | https://unpkg.com/@progress/kendo-theme-fluent@{{site.themesVersion}}/dist/all.css <br /> or <br /> https://unpkg.com/@progress/kendo-theme-fluent@{{site.themesVersion}}/dist/fluent-main.css

## Next Steps

* [Create custom themes or swatches with the ThemeBuilder]({%slug themebuilder%})

## See Also

* [Change the Theme at Runtime]({%slug change-theme-runtime%})
