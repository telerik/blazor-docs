---
title: Swatch Distribution
page_title: Swatch Distribution
description: The UI for Blazor suite distributes most commonly used swatches. Explore how you can access them.
slug: themes-swatch-distribution
tags: telerik,blazor,theme,swatch,distribution
published: True
position: 2
---

# Swatch Distribution

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
