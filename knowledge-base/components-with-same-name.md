---
title: Two Components with the Same Name
description: Two components with the same (File) name can break your app.
type: troubleshooting
page_title: Two Components with the Same Name
slug: two-components-same-name
position: 
tags: 
ticketid: 1422474
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

When creating components, make sure that you use unique names for them and their file name. If the class name matches another component, you may get strange results, for example:

* You may get the Intellisense and features of one instead of the other, or a mix of both.
* Compilation error.
* Cryptic errors from things and Parameters that should work, such as:
    * for a Telerik grid: _error CS0246: The type or namespace name 'TItem' could not be found (are you missing a using directive or an assembly reference?)_
    * for a Telerik button _Unhandled exception rendering component: Object of type 'TestProject.Pages.TelerikButton' does not have a property matching the name 'ChildContent'._
    * Multiple components use the tag 'TelerikGrid'

These last error messages can be observed if you have a component called `TelerikGrid.razor` in your app, and you attempt to use the `<TelerikGrid>` component provided by Telerik UI for Blazor in the same app (respectively, a `TelerikButton.razor` and `<TelerikButton>` components).

You will get the intellisense from the Telerik grid, you will be able to define columns and events, but setting its `Data` property will throw this build error because the framework will get confused with your own `TelerikGrid.razor` component.

>note This [may be fixed in .NET Core 3.1 Preview 1](https://github.com/aspnet/AspNetCore/issues/13573) after our report.

The **solution** is to ensure that the component names in the project are unique, both across components in different folders of your own making, and with components from third party libraries you may be using.
