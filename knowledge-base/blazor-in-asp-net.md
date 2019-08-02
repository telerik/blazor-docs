---
title: Telerik Blazor in ASP.NET Web Application
description: Use Telerik Blazor components in ASP.NET Web Application
type: how-to
page_title: Telerik Blazor in ASP.NET Web Application
slug: telerik-blazor-in-asp-net-app
position: 
tags: 
ticketid: 1422791
res_type: kb
---


## Description
You may have an ASP.NET Core 3 web application and you may want to start using Blazor components in it so you can modernize it, and even to eventually migrate it to Blazor.

## Solution
You can use an ASP.NET Core 3 web application to render Blazor components. Here is a list of the requirements and things to keep in mind (as sample project is available at the end):

* You must first add Blazor to the project. This includes the client-side assets, the service, and the SignalR hub. In the sample project, they are added to the layout so that all pages can use them. Make sure you don't add them twice on a certain page.
* You must then [add the Telerik components as usual]({%slug getting-started/what-you-need%}). The `TelerikRootComponent` must be added around the contents of every Blazor component, because there is no other way to render it.
* Use Blazor components like partial views - through `Html.RenderComponentAsync`. Pass their Parameters as fields in an anomymous model object you can pass to the method.
* If you are already using Kendo widgets in such a project, make sure to only use the [Telerik UI for Blazor Themes]({%slug general-information/themes%}). They match the [SASS-based themes from Kendo](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) and you must only have one theme referenced.
    * Try using versions of Kendo UI and UI for Blazor that are close together, so that there are as little differences in their theming as possible. The latest versions are advisable.

A sample project with comments is available here: [blazor-in-asp-net.zip](blazor-in-asp-net.zip).

The project references a commercial version of UI for Blazor. If you only have a trial license, replace the reference to the NuGet package and to the JS Interop file [accordingly]({%slug getting-started/what-you-need%}).

>note The sample project was made at the time of UI for Blazor 1.4.1 and .NET Core 3 Preview 7 - therefore, as the Blazor framework evolves, changes may be required.

