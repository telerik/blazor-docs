---
title: General Issues
page_title: General Issues
description: Troubleshooting general issues in the UI for Blazor suite.
slug: troubleshooting-general-issues
tags: general,issues,troubleshoot,fix
published: True
position: 1
---

# General Issues

This page provides solutions for common issues you may encounter while working with Telerik UI for Blazor components.

* [Popups Do Not Work](#popups-do-not-work)
* [Wrong Popup Position](#wrong-popup-position)
* [Unable to find package Telerik.Documents.SpreadsheetStreaming](#unable-to-find-package-telerikdocumentsspreadsheetstreaming)
* [Cannot provide a value for property 'Localizer'](#cannot-provide-a-value-for-property-localizer)
* [Slow Performance](#slow-performance)
* [JavaScript Errors]({%slug troubleshooting-js-errors%})
* [Issues After Deployment]({%slug deployment-troubleshooting%})
* [Content Security Policy]({%slug troubleshooting-csp%})
* [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%})


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

* The default `margin` of the `body` element is not removed with a rule like `body { margin:0; }` such as the one that Bootstrap brings in. With this margin in play the `<body>` and the browser viewport do not match exactly and Telerik popups may e displaced with the value of the margin.

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


## Slow Performance

When building a Blazor app, especially on the WebAssembly flavor, it is likely that the first time you have a large set of data and complex interactions will be when you add a Telerik Grid to your project. So, it may seem like a slowdown comes from the grid, but this is not necessarily the case, and there are several important factors into play:

* Whether you build the WebAssembly app in `Debug` or `Release` mode makes a significant difference in its performance. To see what you users will see, build your app in `Release` mode. It defaults to `Debug` while you are developing it.

* Follow <a href = "https://docs.microsoft.com/en-us/aspnet/core/blazor/webassembly-performance-best-practices?view=aspnetcore-5.0" target="_blank">Microsoft's best practices</a> to optimize the Blazor WebAssembly general performance. WebAssembly is still considerably slower than server-side Blazor, and Microsoft are working on that. 
    * The first big improvement that should come from the framework is AOT Compilation (ahead-of-time compilation), and when it becomes available the grid should benefit from it immediately.
    
* The performance of the Telerik components is quite close to plain HTML elements rendering, especially considering all the additional features, events and beautiful rendering they add.

There are also certain measures a web app should take to improve its performance in general. For example:

* Enable [Paging]({%slug components/grid/features/paging%}) or [Virtual Scrolling]({%slug components/grid/virtual-scrolling%}) in the grid, and use a reasonable page size (for exapmle, 10 to 20 or 40, as more than 20 items can rarely fit on a screen anyway). Also, if you have many columns, enable [Column Virtualization]({%slug grid-columns-virtual%}).

* Avoid loading all the data at once, only load and render relevant chunks. For example, use the [OnRead event of the Grid]({%slug components/grid/manual-operations%}) for the grid to perform all operations, and use [custom filtering in the ComboBox through its own OnRead event]({%slug components/combobox/events%}#onread). This also applies to creating lists of a lot of components in your own `foreach` loops - consider implementing your own virtual scrolling or use the [Telerik Pager]({%slug pager-overview%}) to help you separate them into smaller sets.

* When using a series of your own components on the page, consider overriding their `ShouldRender` methods so they render only when needed. For example, an `EventCallback` whose handler is an `async Task` will render its own component, its parent and siblings twice, and you can reduce that to once.

* Loading content on demand (such as a cell value) should be done through a nested component and its `OnParemetersSetAsync` method. A similar example is available in the [load tooltip content on demand](https://github.com/telerik/blazor-ui/tree/master/tooltip/in-grid) and [load hierarchy data on demand](https://github.com/telerik/blazor-ui/tree/master/grid/load-on-demand-hierarchy) sample projects. You should not use an async method in a component's `Template` (or any `RenderFragment`) directly, because their execution is awaited by the framework before the fragment can render at all (`Templates` and `RenderFragment` instances are basically synchronous).

* If you need to generate documents or prepare some data, try to offload this task to the server. You can create an HTTP request and gather the processed information. With this approach, you will gain from the better server-side performance and won't download all the data on the client-side. You can find an example of the approach in the <a href="https://github.com/telerik/blazor-ui/tree/master/grid/pdf-export-server" target="_blank">Export Grid to PDF on the Server</a> sample project.


## See Also

* [JavaScript Errors Troubleshooting]({%slug troubleshooting-js-errors%})
* [Content Security Policy]({%slug troubleshooting-csp%})
