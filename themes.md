---
title: Themes
page_title: Themes
description: The built-in themes in the UI for Blazor components
slug: general-information/themes
tags: telerik,blazor,theme,built-in
published: True
position: 13
---

# Built-in Themes

The UI for Blazor suite comes with a set of built-in themes that you can choose from to alter the visual appearance of the components:

* **Default** - our own neutral styling that suits most cases.
* **Bootstrap** - linked variables to the famous Bootstrap, in order to achieve similarity in the look and feel. Therefore, customizing the original Bootstrap theme will affect the Telerik UI theme as well.
* **Material** - implements the [Material Design Guidelines](https://material.io/design/).

These themes are shared with the Kendo UI suites with which the UI for Blazor suite shares HTML rendering, classes and appearance (even though UI for Blazor are native components). You can read more about the way the available themes function in the [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) article.

To use a theme, you must reference its stylesheet in the `<head>` of your main index file. For a [client-side Blazor app]({%slug getting-started/client-side%}), this is `wwwroot/index.html` and for a [server-side Blazor app]({%slug getting-started/client-side%}), it is `~/Pages/Index.cshtml`. The Razor syntax for a server application may differ and you need to escape the `@` symbols as `@@`.

>caption Reference the Default theme from the cloud

````HTML
<!DOCTYPE html>
<html>
<head>
    . . .
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
</head>
<body>
    <app>Loading...</app>
    . . .
</body>
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
              "library": "@progress/kendo-theme-default@3.0.0",
              "destination": "wwwroot/css/kendo-themes/default",
              "files": [
                "dist/all.css"
              ]
            },
            {
              "library": "@progress/kendo-theme-bootstrap@3.0.0",
              "destination": "wwwroot/css/kendo-themes/bootstrap",
              "files": [
                "dist/all.css"
              ]
            },
            {
              "library": "@progress/kendo-theme-material@2.0.0",
              "destination": "wwwroot/css/kendo-themes/material",
              "files": [
                "dist/all.css"
              ]
            }
          ]
        }

1. In the server application, go to the `wwwroot/index.html` file and replace the CDN link with the following. For a server-side Blazor project, do that in the `~/Pages/Index.cshtml` file.

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
        <body>
            <app>Loading...</app>
            . . .
        </body>
        </html>



## See Also

  * [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
