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

## Considerations
You can use an ASP.NET Core 3 web application to render Blazor components. Here is a list of the requirements and things to keep in mind (as sample project is available at the end):

* You must first add Blazor to the project. This includes the client-side assets, the service, and the SignalR hub. In the sample project, they are added to the layout so that all pages can use them. Make sure you don't add them twice on a certain page.
* You must then [add the Telerik components as usual]({%slug getting-started/what-you-need%}). The `TelerikRootComponent` must be added around the contents of every Blazor component, because there is no way to render it in a shared location like in an actual Blazor app.
* Use Blazor components according to the current framework approach. At the time of writing, that is the ` <component type="typeof(MyComponent)" render-mode="ServerPrerendered" param-SomeParameter="@ObjectToPass" />` approach. In previous versions the recommended approach was using Razor components like partial views - through the `Html.RenderComponentAsync()` helper where you passed their Parameters as fields in an anomymous model object.
* If you are already using Kendo widgets in such a project, make sure to only use the [Telerik UI for Blazor Themes]({%slug general-information/themes%}). They match the [SASS-based themes from Kendo](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) and you must only have one theme referenced.
    * Try using versions of Kendo UI and UI for Blazor that are close together, so that there are as little differences in their theming as possible. The latest versions are advisable.

>tip A sample project with comments is available in the following repo that contains other examples as well: [https://github.com/telerik/blazor-ui/tree/master/common/razor-components](https://github.com/telerik/blazor-ui/tree/master/common/razor-components).

