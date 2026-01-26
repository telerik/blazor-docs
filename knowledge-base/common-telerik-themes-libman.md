---
title: Using Telerik Blazor Themes with LibMan
description: Learn how to load and update Telerik themes to your Blazor app with the LibMan client library tool.
type: how-to
page_title: How to use Telerik Blazor Themes with LibMan
slug: common-kb-telerik-themes-libman
position: 
tags: telerik, blazor, layout, bootstrap
ticketid:
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to use LibMan to add [Telerik Blazor themes](slug:themes-overview) to your Blazor app.
* How to update local themes in `wwwroot` automatically when a new version is available.

[LibMan](https://learn.microsoft.com/en-us/aspnet/core/client-side/libman/) is a client-side dependency manager, which is included in ASP.NET Core. You can use it to automatically download a Telerik theme to the `wwwroot` folder of your app, instead of using [static NuGet assets](slug:themes-overview#loading-themes-in-blazor-from-the-nuget-package) or [Telerik CDN](slug:common-features-cdn).

The benefits of Libman are:

* The Blazor app can use theme swatches, which are not available in the `Telerik.UI.for.Blazor` NuGet package.
* The Blazor app is not dependent on remote CDN servers.
* The theme in the `wwwroot` folder can update automatically.


## Solution

You can use Libman to consume the following **npm** packages that are published on the **UNPKG** CDN:

* [`@progress/kendo-font-icons`](https://www.npmjs.com/package/@progress/kendo-font-icons) provides font icon styles when using [font icons instead of SVG icons](slug:common-features-icons).
* All [built-in themes](slug:themes-overview) and their [swatches](slug:themes-overview#basics):
    * [`@progress/kendo-theme-bootstrap`](https://www.npmjs.com/package/@progress/kendo-theme-bootstrap)
    * [`@progress/kendo-theme-default`](https://www.npmjs.com/package/@progress/kendo-theme-default)
    * [`@progress/kendo-theme-fluent`](https://www.npmjs.com/package/@progress/kendo-theme-fluent)
    * [`@progress/kendo-theme-material`](https://www.npmjs.com/package/@progress/kendo-theme-material)

The configuration process includes the steps below.

### 1. Create a `libman.json` File

Create a `libman.json` file in the root project folder. There are a few ways to do that:

* Right-click the project in Visual Studio solution explorer, select **Add** and then **Client-side Library...**.
* Use the [LibMan CLI](https://learn.microsoft.com/en-us/aspnet/core/client-side/libman/libman-cli).
* Copy-paste and edit the sample `libman.js` code below.

Use the following information when creating the `libman.json` file:

* Provider: `unpkg`
* Library: <code>@progress/kendo-font-icons@**&lt;PACKAGE-VERSION&gt;**</code> or <code>@progress/kendo-theme-**&lt;THEME-NAME&gt;**@**&lt;PACKAGE-VERSION&gt;**</code>. Always specify a package version or use `@latest`.
* Include files: the app requires `dist/all.css` for the themes, and `dist/index.css` and `dist/kendo-font-icons.ttf` for the font icons. See all available files for the desired package and version at unpkg, for example: https://unpkg.com/browse/@progress/kendo-theme-default@{{site.themesVersion}}/
* Target location: the default one is <code>wwwroot/lib/progress/**&lt;PACKAGE-NAME&gt;**/</code> and it depends on your preferences.

> Using the `@latest` theme version requires the latest Telerik UI for Blazor version as well.

> In rare cases the `@latest` version may produce an error similar to `The "@progress/kendo-theme-default@latest" library could not be resolved by the "unpkg" provider`. In such cases, replace the `@latest` moniker with a [specific theme version](https://github.com/telerik/kendo-themes/releases), depending on the [theme version compatibility with Telerik UI for Blazor](slug:themes-overview#compatibility-and-maintenance). For example, use `^8.0.0` to get the latest version of the major release `8`.

The `libman.json` file below adds the **Main** swatches of [all built-in themes](slug:themes-overview#built-in-themes) and the font icon stylesheet. Remove the theme or font icons entries that you don't need.

>caption libman.js

<div class="skip-repl"></div>

````json
{
  "version": "1.0",
  "defaultProvider": "unpkg",
  "libraries": [
    {
      "library": "@progress/kendo-theme-bootstrap@{{site.themesVersion}}",
      "destination": "wwwroot/lib/progress/kendo-theme-bootstrap/",
      "files": [
        "dist/all.css"
      ]
    },
    {
      "library": "@progress/kendo-theme-default@{{site.themesVersion}}",
      "destination": "wwwroot/lib/progress/kendo-theme-default/",
      "files": [
        "dist/all.css"
      ]
    },
    {
      "library": "@progress/kendo-theme-fluent@{{site.themesVersion}}",
      "destination": "wwwroot/lib/progress/kendo-theme-fluent/",
      "files": [
        "dist/all.css"
      ]
    },
    {
      "library": "@progress/kendo-theme-material@{{site.themesVersion}}",
      "destination": "wwwroot/lib/progress/kendo-theme-material/",
      "files": [
        "dist/all.css"
      ]
    },
    {
      "library": "@progress/kendo-font-icons@latest",
      "destination": "wwwroot/lib/progress/kendo-font-icons/",
      "files": [
        "dist/index.css",
        "dist/kendo-font-icons.ttf"
      ]
    }
  ]
}
````

### 2. Register the CSS Files

The CSS file URL(s) depend on the `"destination"` values in `libman.json`. Always register just one theme CSS file.

>caption Add a CSS file reference to web page `<head>`

<div class="skip-repl"></div>

````html
<!-- Telerik theme -->
<link rel="stylesheet" href="lib/progress/kendo-theme-default/dist/all.css" />
<!-- Optional Telerik font icons -->
<link rel="stylesheet" href="lib/progress/kendo-font-icons/dist/index.css" />
````

### 3. Enable Automatic Updates on App Build

Install the `Microsoft.Web.LibraryManager.Build` NuGet package in your Blazor app, so that the dependencies in `libman.json` are resolved and updated at build-time by LibMan. If a package version is already restored, you may need to rebuild the app to update it.


## See Also

* [Themes Overview](slug:themes-overview)
