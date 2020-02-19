---
title: How to change theme at runtime
description: Switch the Telerik Blazor Theme at runtime on the fly
type: how-to
page_title: Change Theme at Runtime
slug: change-theme-runtime
position: 
tags: 
ticketid: 1442823
res_type: kb
---


## Description
You may want to change the Telerik Blazor Theme during runtime on the fly - for example, to allow your users to choose the application theme.

This article will explain how you can do this. The approach will apply both to the built-in themes, and to custom themes.

The stylesheets are registered outside of the `<app>` element so normal Blazor code cannot access them. This leaves only JS Interop as the option to change the themes.

## Solution
To change a theme, you must:

1. Create a `<link>` element pointing to the new theme
1. Remove the old `<link>` that pointed to the previous theme when the new one loads

Here is a basic implementation:

>caption Step 1 - Index file - this is a sample from a Server app, replace the URL with the one you are actually using. The important bit is the `id` attribute that lets us get the element easily

````CSHTML
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Blazor App</title>
    <base href="~/" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
    <link href="css/site.css" rel="stylesheet" />
    
    <!-- Theme switching start -->
    <link id="TelerikThemeLink" rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-default@@latest/dist/all.css" />
    <script src="~/ThemChanger.js"></script>
    <!-- Theme switching end -->
    
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>
</head>
````

>caption Step 2 - Prepare JS Interop function that will switch out the `<link>` elements

````JavaScript
// this code is in the ~/wwwroot/ThemeChanger.js file

var themeChanger = {
    changeCss: function (cssFileUrl) {
        var oldLink = document.getElementById("TelerikThemeLink"); // we have this id on the <link> that references the theme

        if (cssFileUrl === oldLink.getAttribute("href")) {
            return;
        }

        var newLink = document.createElement("link");
        newLink.setAttribute("id", "TelerikThemeLink");
        newLink.setAttribute("rel", "stylesheet");
        newLink.setAttribute("type", "text/css");
        newLink.setAttribute("href", cssFileUrl);
        newLink.onload = () => {
            oldLink.parentElement.removeChild(oldLink);
        };

        document.getElementsByTagName("head")[0].appendChild(newLink);
    }
}
````

>caption Step 3 - Call the JS Interop function from your Blazor code and pass the new theme URL. In this example we switch from Default to Material built-in theme.

````CSHTML
@inject IJSRuntime JsInterop

<TelerikButton OnClick="ChangeTheme">Change from Default to Material Built-in Theme</TelerikButton>

@code {
    async Task ChangeTheme()
    {
        // use the new URL you will use - it can be relative and/or point to a custom theme
        string newThemeUrl = "https://unpkg.com/@progress/kendo-theme-material@latest/dist/all.css";
        // call the JS interop that will switch out the <link> element
        await JsInterop.InvokeVoidAsync("themeChanger.changeCss", new[] { newThemeUrl });
    }
}
````

