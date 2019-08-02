---
title: Kendo UI for jQuery in Blazor
description: Use jQuery widgets (Kendo UI) in Blazor
type: how-to
page_title: Use Kendo UI in Blazor
slug: jquery-kendo-in-blazor
position: 
tags: 
ticketid: 1422791
res_type: kb
---


## Description
While migrating an application to Blazor, you may not have time to implement all components, or there may yet be no native Blazor counterpart in the Telerik UI for Blazor suite. In such cases you may want to keep using jQuery widgets from Kendo UI in your Blazor project.

We advise that you consider using only native Blazor components like the UI for Blazor suite, because this is how the framework is designed to operate. Widgets based on jQuery (such as Kendo UI) rely on direct DOM manipulation and this is something Blazor controls instead of you.

## Solution
One approach may be to [use Blazor components in an ASP.NET Core 3 application](https://www.telerik.com/blogs/integrating-blazor-components-with-asp-net-core-views). Whether this is feasible depends on your project path and if/how you are migrating from an older project. You can read more details about this in the [Telerik Blazor in ASP.NET Web Application]({%slug telerik-blazor-in-asp-net-app%}) article.

Should you decide to use jQuery widgets from the Kendo UI suite, here are the things to keep in mind:

* Make sure you are familiar with [using JavaScript in Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interop?view=aspnetcore-3.0).
* Manipulate the DOM where jQuery widgets will be as little as possible through Blazor to reduce the chance that an update from the framework will break the widgets.
* Reference the Kendo UI scripts as usual. More details are available in the Kendo documentation, for example, the [Getting Started](https://docs.telerik.com/kendo-ui/intro/first-steps) article.
* Use only the [themes from the Telerik UI for Blazor suite]({%slug general-information/themes%}). They are the same [SASS-based themes from Kendo](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes). You must not include more than one Kendo theme in the project as this can result in incorrect appearance in all widgets.
    * Try using versions of Kendo UI and UI for Blazor that are close together, so that there are as little differences in their theming as possible. The latest versions are advisable.
* Be familiar with the DOM changes the Kendo widgets make and how to [dispose them](https://docs.telerik.com/kendo-ui/intro/widget-basics/destroy). You may need to clean up the DOM yourself if Blazor does not clean everything.

A sample project that showcases these is available here: [jquery-kendo-in-blazor.zip](jquery-kendo-in-blazor.zip). Comments in the code provide some more explanations and details. 

The project references a commercial version of UI for Blazor. If you only have a trial license, replace the reference to the NuGet package and to the JS Interop file [accordingly]({%slug getting-started/what-you-need%}).

>note The sample project was made at the time of UI for Blazor 1.4.1 and .NET Core 3 Preview 7 - therefore, as the Blazor framework evolves, changes may be required. Such an integration is not supported by Telerik.



