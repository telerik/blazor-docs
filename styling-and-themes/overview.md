---
title: Built-in Themes
page_title: Themes
description: The UI for Blazor suite comes with a set of built-in themes that you can choose from. Bootstrap and Material themes are also included.
slug: general-information/themes
tags: telerik,blazor,theme,built-in
published: True
previous_url: /themes/overview
position: 0
---

# Built-in Themes

The UI for Blazor suite comes with a set of built-in themes that you can choose from to alter the visual appearance of the Telerik components (you can test them in our [live demos](https://demos.telerik.com/blazor-ui/)):

* **Default** - our own neutral styling that suits most cases.
* **Bootstrap** - a theme that matches the Bootstrap styling. Read more in the [Bootstrap Notes](#bootstrap-notes) section.
* **Material** - implements the [Material Design Guidelines](https://material.io/design/). Read more in the [Material Notes](#material-notes) section.

The UI for Blazor suite has the same HTML rendering and SASS Theme stylesheets like other Kendo UI suites, so previous experience with them can be helpful. The components in **UI for Blazor are native components** and not wrappers over jQuery widgets, however.

To use a theme, you must reference its stylesheet in the `<head>` of your main index file. For a [client-side Blazor app]({%slug getting-started/client-side%}), this is `wwwroot/index.html` and for a [server-side Blazor app]({%slug getting-started/server-side%}), it is `~/Pages/_Host.cshtml`. The Razor syntax for a server application differs and you need to escape the `@` symbols as `@@`.

This article contains the following sections:

* [Static Assets](#static-assets)
* [CDN](#cdn)
* [Optional Dependency Management](#optional-dependency-management)
	* [Libman](#libman)
	* [NPM Packages](#npm-packages)
* [Bootstrap Notes](#bootstrap-notes)

## Static Assets

Static assets are part of the NuGet package and the framework will copy them to the output folder during build automatically. They provide the following benefits:

* The necessary resources for the package are always available to you from the framework.
* The application can rely only on local resources and not on third parties (such as CDN providers).
* You do not have to change their paths after updating the package version (a common requirement when using CDNs).

>caption Reference the Telerik theme from the static assets

````HTML
<!DOCTYPE html>
<html>
<head>
    . . .
    <!-- Choose only one of the themes -->
    
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />
    
    <!-- 
        <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-bootstrap/all.css" rel="stylesheet" />
        <link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-material/all.css" rel="stylesheet" />
    -->
    
    <!-- For Trial licenses use one of the following -->
    <!--
        <link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" rel="stylesheet" />
        <link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-bootstrap/all.css" rel="stylesheet" />
        <link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-material/all.css" rel="stylesheet" />
      -->
</head>

 . . .
 
</html>
````


## CDN

@[template](/_contentTemplates/common/general-info.md#cdn)


## Optional Dependency Management

Instead of a CDN or our static assets, you can fetch the stylesheet into your project to, for example, customize the theme, or to bundle it with other stylesheets. To do this, you can:

* [Use LibMan client-side dependency manager](#libman).
* [Use the NPM packages](#npm-packages).

### Libman
The [LibMan client-side dependency manager](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/?view=aspnetcore-2.2) is built-in ASP.NET Core:

1. In the server application root, add the `libman.json` file with the following content:

    **libman.json**

        {
          "version": "1.0",
          "defaultProvider": "unpkg",
          "libraries": [
            {
              "library": "@progress/kendo-theme-default@latest",
              "destination": "wwwroot/css/kendo-themes/default",
              "files": [
                "dist/all.css"
              ]
            },
            {
              "library": "@progress/kendo-theme-bootstrap@latest",
              "destination": "wwwroot/css/kendo-themes/bootstrap",
              "files": [
                "dist/all.css"
              ]
            },
            {
              "library": "@progress/kendo-theme-material@latest",
              "destination": "wwwroot/css/kendo-themes/material",
              "files": [
                "dist/all.css"
              ]
            }
          ]
        }
        
        
    >note There have been some reports that the `@latest` version sometimes does not work with a message similar to `The "@progress/kendo-theme-material@latest" library could not be resolved by the "unpkg" provider`. If trying again a bit later does not help, you can replace the `@latest` moniker with the current latest version of the theme that you can find at the [Themes Repo Releases section](https://github.com/telerik/kendo-themes/releases). For example, `^3.0.0` to get the latest version of the major release `3`. If you commit such a version, you may want to check for updates after a while.
    
    >tip You may want to add a package reference to the `Microsoft.Web.LibraryManager.Build` package so that dependencies are resolved at build-time by LibMan, instead of manually. If a version has already been restored, you may need to invoke a `Rebuild` to update it.

1. In the client Blazor application, go to the `wwwroot/index.html` file and replace the CDN link with the following one. For a server-side Blazor project, do that in the `~/Pages/_Host.cshtml` file.

    **Index file with local stylesheet**
    
        <!DOCTYPE html>
        <html>
        <head>
            . . .
            <link href="/css/kendo-themes/default/dist/all.css" rel="stylesheet"/>
            <!-- Choose only one of the themes -->
            <!-- <link href="/css/kendo-themes/bootstrap/dist/all.css" rel="stylesheet" />
            <link href="/css/kendo-themes/material/dist/all.css" rel="stylesheet" /> -->
        </head>
        
            . . .
            
        </html>

### NPM Packages

The Kendo UI Sass-based themes are located on the Progress NPM registry:

* **Kendo UI Default Theme**&mdash;Available as @progress/kendo-theme-default.
* **Kendo UI Bootstrap v4 Theme**&mdash;Available as @progress/kendo-theme-bootstrap.
* **Kendo UI Material Theme**&mdash;Available as @progress/kendo-theme-material.

You can read more about using this approach in the [Custom Theme - Manual Process]({%slug themes-custom%}#manual-alternative) article.


## Material Notes

For the Telerik Material theme to closely implement the <a href="https://material.io/guidelines/" target="_blank">Material Design Guidelines</a>, you should provide the `Roboto` font family.

By default, the Material theme uses the Roboto font family but the font itself is not included in the Telerik theme - it is not our property and it will also add bloat to our package.

You can add the font to the page from Google Fonts in the following way:

````HTML
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />

<style>
  body { font-family: Roboto, sans-serif; }
</style>
````

## Bootstrap Notes

The Telerik Bootstrap Theme has a design that is similar to the Bootstrap framework style so you can better integrate the Telerik components in an app that already uses Bootstrap for layouts and styles.

Bootstrap and Telerik UI for Blazor are two completely separate products that do not share classes or code, however. You can use Bootstrap to create layouts and then put our components in those layouts by treating them like the `<span>` or `<div>` elements that they are. You can use Bootstrap classes and utilities on your own elements in the markup regardless of the components inside.

The Telerik Bootstrap theme is not the same as the Bootstrap framework (or styles), it is our own theme that uses the Bootstrap metrics and design approaches to fit into a Bootstrap layout better. It can also use customized variables from Bootstrap, and you can see one way to do that through building the SASS files for both Bootstrap and Telerik in the following sample app: [Blazor Dashboard](https://github.com/telerik/blazor-ui/tree/master/sample-applications/blazor-dashboard).

### Bootstrap Framework Alternatives

If you do not want to use the Bootstrap framework to create your layouts, there are several components from the Telerik UI for Blazor suite that can serve similar purposes. Below you will find some examples to get you started:

* The [Splitter](https://demos.telerik.com/blazor-ui/splitter/overview) is useful for organizing the whole page in areas, for example - header, left content, right content, footer. Splitter panes can be collapsed and resized.

* The [GridLayout](https://demos.telerik.com/blazor-ui/gridlayout/overview) displays items in rows and columns, similar to the CSS grid layout.

* The [StackLayout](https://demos.telerik.com/blazor-ui/stacklayout/overview) displays cards in a single row or column with some spacing options.

* The [TileLayout](https://demos.telerik.com/blazor-ui/tilelayout/overview) displays tiles that are resizable and reorderable.

* The [MediaQuery](https://demos.telerik.com/blazor-ui/mediaquery/overview) can help you reach to viewport size changes and render different layout depending on the screen size (even replace entire rendering and components, not just hide elements with CSS).

* The [Form](https://demos.telerik.com/blazor-ui/form/overview) can generate inputs and editors for your model without the need to spell every input out yourself.

* Popups such as [tooltips](https://demos.telerik.com/blazor-ui/tooltip/overview), [windows](https://demos.telerik.com/blazor-ui/window/overview), [notifications](https://demos.telerik.com/blazor-ui/notification/overview) and [confirmation dialogs](https://demos.telerik.com/blazor-ui/dialog/predefined-dialogs) let you conserve real estate on the screen.

* [Cards](https://demos.telerik.com/blazor-ui/card/overview) let you add quick and easy distinction and styling between items in sets of information.

* Many other components help with navigation and layouts, review the [list of available components in our demos](https://demos.telerik.com/blazor-ui).

## See Also

  * [Custom Themes]({%slug themes-custom%})
  * [Style Form Elements]({%slug themes-form-elements%})
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
  * [Change Theme at Runtime]({%slug change-theme-runtime%})
