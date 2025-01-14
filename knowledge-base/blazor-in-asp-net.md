---
title: Using Telerik UI for Blazor in ASP.NET Web Applications
description: Learn how to use the Telerik UI for Blazor components in ASP.NET Web applications.
type: how-to
page_title: Using Telerik UI for Blazor in ASP.NET Web Applications
slug: telerik-blazor-in-asp-net-app
ticketid: 1422791
res_type: kb
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

How can I modernize my ASP.NET Core web application by adding Blazor components in it, and eventually migrate the project to Blazor?

## Considerations

You can use an ASP.NET Core web application to render Blazor components by following the requirements, considerations, and steps below:

1. Add Blazor to the project. This includes the client-side assets, the service, and the SignalR hub. In the sample project linked below, these are added to the layout so that all pages can use them. Make sure you don't add them twice on a certain page.
1. [Add the Telerik components as usual](slug://getting-started/what-you-need). Add the [`TelerikRootComponent`](slug://rootcomponent-overview) around the contents of every Blazor component. Otherwise, it is not possible to render it in a shared location like in an actual Blazor app.
1. Use the Blazor components according to the current framework approach by using the `<component type="typeof(MyComponent)" render-mode="ServerPrerendered" param-SomeParameter="@ObjectToPass" />` approach. In previous versions, the recommended approach was by using Razor components like partial views through the `Html.RenderComponentAsync()` helper, where you has to pass their parameters as fields in an anonymous model object.
1. If you wish to use [Alert, Confirm, or Prompt Dialogs](slug://dialog-predefined ), you need to do this in a nested Razor component of the `TelerikRootComponent`. Otherwise, if you try to define the `DialogFactory` `CascadingParameter` in the same Razor component that includes the `TelerikRootComponent`, then the cascading parameter will be `null`.
1. If you are already using Kendo UI components in such a project, make sure to only use the [Telerik UI for Blazor Themes](slug://themes-overview). They match the [SASS-based themes from Kendo UI](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) and you must only have one theme referenced.

    It is recommended that you use the latest Kendo UI and Telerik UI for Blazor versions. If not possible, try using Kendo UI and Telerik UI for Blazor versions that are close together, so that there are as little differences in their theming as possible.

>tip To see the full implementation of the suggested approach, go to the [Razor components GitHub repo containing the sample project with comments and also other examples](https://github.com/telerik/blazor-ui/tree/master/common/razor-components).
