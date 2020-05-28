---
title: General Issues
page_title: General Issues
description: Troubleshooting general issues in the UI for Blazor suite
slug: troubleshooting-general-issues
tags: general,issues,troubleshoot,fix
published: True
position: 1
---

# General Issues

This page provides solutions for common issues you may encounter while working with Telerik UI for Blazor components.


<!-- Start Document Outline -->

* [Popups Do Not Work](#popups-do-not-work)
* [Wrong Popup Position](#wrong-popup-position)
* [Unable to find package Telerik.Documents.SpreadsheetStreaming](#unable-to-find-package-telerikdocumentsspreadsheetstreaming)
* [Cannot provide a value for property 'Localizer'](#cannot-provide-a-value-for-property-localizer)

<!-- End Document Outline -->


## Popups Do Not Work

There are three common reasons for this
* Missing [`<TelerikRootComponent>`]({%slug getting-started/what-you-need%}#project-configuration) from the app.
* [Missing JS Interop file]({%slug troubleshooting-js-errors%}#microsoftjsinteropjsexception-could-not-find-)
* Special positioning on the `<app>` element.

The `<app>` element is the topmost component that a developer has access to in Blazor. This means that we cannot place our popups higher than that in the DOM. Thus, their position and visibility depend on the position of the `<app>` element matching the position of the `<body>` element.

The default application template has a `position: relative` rule for the `app` element that can break the appearance and positions of our popups (most notably in Firefox). The solution is to remove such special positioning. For example, modify the default `site.css` file like this:

````CSS
app {
    /* remove this line */
    /* position: relative; */
    
    /*
    if you continue experiencing issues, try removing these lines as well
    make sure that the app element positioning matches the body element and is visible
    */
    display: flex;
    flex-direction: column;
}
````


## Wrong Popup Position

The position of popups (Window, various dropdowns such as DropDownList, ComboBox, DatePicker) can be wrong or offset.

The most common reason for such a problem is that the [`<TelerikRootComponent>`]({%slug getting-started/what-you-need%}#project-configuration) does not match the `<body>` and the browser viewport - this is required because that component is the topmost element our components can access in order to render popups/dropdowns. 

There are several common cases when such a mismatch occurs:

* The position and size of the `<app>` element (or however the root component of your Blazor app is called) does not match the `<body>`.

* There are CSS rules that offset the `<app>` element or its parent element (such as `position: absolute` or `margin: auto`, or placing it in some form of popup like a jQuery dialog).

* There are CSS rules that alter the positioning of an element or class used in the Telerik popup elements.

* There is more than one `<TelerikRootComponent>` in the app (for example, a certain Razor Component has its own) - there should be only one instance in the main layout.

You can check the application for such issues and ensure that the `<app>` element size and position matches the `<body>` and the browser viewport, and that the `<TelerikRootComponent>` is a direct child of the `<app>` element and encompasses the `@Body` in the main layout.


## Unable to find package Telerik.Documents.SpreadsheetStreaming

When attempting to restore packages or build a solution with the `Telerik.UI.for.Blazor` NuGet package, you may get an error similar to

>warning `Unable to find package Telerik.Documents.SpreadsheetStreaming. No packages exist with this id in source(s) Microsoft Visual Studio Offline Packages, nuget.org, Telerik, MyOfflinePackages`

The `Telerik.Documents.SpreadsheetStreaming` package is used internally for exporting and the main package references it. It is also available from our online feed and it is in the `dpl` folder of your offline installation.

The most common reasons and solutions for seeing this error (being unable to restore this particular package) are:

* An offline package source is being used that does not contain it. Make sure that you add the packages from both the `packages` and `dpl` folders to such a custom local feed.

* There is an issue with connecting to our online feed. For example, a firewall, network downtime or wrong credentials are used. Check the [Troubleshooting NuGet Feed Issues]({%slug installation/nuget%}#troubleshooting) section of the documentation to see how to handle that.

* There is a mismatch between the versions available for restore and the referenced versions, while the Visual Studio "treat warnings as errors" setting is turned on. This can happen if one version is referenced, but another is available (for example, only certain versions are available in a custom local feed for the [Document Processing]({%slug common-features-dpl%}) packages, but the main package references an older version). In such cases, the tooling would usually resolve the newest version, but it will show a warning and VS can treat it as an error and not let you build. The solution is to check the version that is referenced by `Telerik.UI.for.Blazor` and ensure you can access that. Cleaning the solution, manually restoring the packages and re-building can also help.
 


## Cannot provide a value for property 'Localizer'

If you get an error similar to this one:

>warning `InvalidOperationException: Cannot provide a value for property 'Localizer' on type 'Telerik.Blazor.Components.TelerikMenu[[TelerikBlazorApp1.Models.MenuItem, TelerikBlazorApp1, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]'. There is no registered service of type 'Telerik.Blazor.Services.ITelerikStringLocalizer'.`

There can be two common causes for the problem:

* The Telerik services are not registered on the app, a line similar to `services.AddTelerikBlazor();` is missing. You can read more about where you need to add that in the [What You Need - Project Configuration]({%slug getting-started/what-you-need%}#project-configuration) article section.

* The application uses localization, or there is a code snippet that does (e.g., a grid with custom buttons that are localized, copied over from another place), but the current app does not provide the necessary project-specific service. You can read more about implementing one in the [Localization]({%slug globalization-localization%}) article.


## See Also

* [JavaScript Errors Troubleshooting]({%slug troubleshooting-js-errors%})
* [Content Security Policy]({%slug troubleshooting-csp%})