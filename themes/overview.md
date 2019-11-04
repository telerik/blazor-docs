---
title: Built-in Themes
page_title: Themes
description: The built-in themes in the UI for Blazor components
slug: general-information/themes
previous_url: /blazor-ui/themes
tags: telerik,blazor,theme,built-in
published: True
position: 0
---

# Built-in Themes

The UI for Blazor suite comes with a set of built-in themes that you can choose from to alter the visual appearance of the components:

* **Default** - our own neutral styling that suits most cases.
* **Bootstrap** - linked variables to the famous Bootstrap, in order to achieve similarity in the look and feel. Therefore, customizing the original Bootstrap theme will affect the Telerik UI theme as well.
* **Material** - implements the [Material Design Guidelines](https://material.io/design/).

These themes are shared with the Kendo UI suites with which the UI for Blazor suite shares HTML rendering, classes and appearance (even though UI for Blazor are native components). You can read more about the way the available themes function in the [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) article.

To use a theme, you must reference its stylesheet in the `<head>` of your main index file. For a [client-side Blazor app]({%slug getting-started/client-side%}), this is `wwwroot/index.html` and for a [server-side Blazor app]({%slug getting-started/server-side%}), it is `~/Pages/_Host.cshtml`. The Razor syntax for a server application differs and you need to escape the `@` symbols as `@@`.

>caption Reference the Telerik theme from the cloud

````ClientApp
<!DOCTYPE html>
<html>
<head>
    . . .
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
    
    <!-- Choose only one of the themes -->
    <!-- 
        <link href="https://unpkg.com/@progress/kendo-theme-bootstrap@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@progress/kendo-theme-material@latest/dist/all.css" rel="stylesheet" />
    -->
</head>

 . . .
 
</html>
````
````ServerApp
<!DOCTYPE html>
<html>
<head>
    . . .
    <link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-default@@latest/dist/all.css" />
    
    <!-- Choose only one of the themes -->
    <!-- 
        <link href="https://unpkg.com/@@progress/kendo-theme-bootstrap@@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@@progress/kendo-theme-material@@latest/dist/all.css" rel="stylesheet" />
    -->
</head>

 . . .
 
</html>
````

>note We are considering a better CDN option. Until then, you can use the unpkg workaround above, or local dependency management as described below.

## Optional Dependency Management

Instead of a CDN link, you can fetch the stylesheet into your project. To do this, you can use the [LibMan client-side dependency manager](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/?view=aspnetcore-2.2) that is built-in ASP.NET Core:

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



## See Also

  * [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
