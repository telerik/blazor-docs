---
title: Blazor Sections Don't Show in Telerik Blazor Components
description: Troubleshoot and understand how to use Blazor SectionOutlet in Telerik Blazor components.
type: troubleshooting
page_title: Blazor Sections Don't Work inside Telerik Blazor Components
slug: common-kb-net8-sections
tags: telerik, blazor, net8, section, sectionoutlet, sectioncontent
ticketid: 1633408
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>5.0 and above</td>
        </tr>
        <tr>
            <td>.NET version</td>
            <td>8 and above</td>
        </tr>
    </tbody>
</table>


## Description

The `ToolBarButton` inside the `SectionOutlet` below doesn't render. How to use [Blazor sections](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/sections) with the Telerik Blazor ToolBar and reusable `SectionOutlet` instances?

>caption ToolBar with SectionOutlet

<div class="skip-repl"></div>

````RAZOR
<TelerikToolBar>
    <SectionOutlet SectionName="ToolbarOutlet"></SectionOutlet>
</TelerikToolBar>
````

>caption SectionContent definition

<div class="skip-repl"></div>

````RAZOR
<SectionContent SectionName="ToolbarOutlet">
    <ToolBarButton>Save</ToolBarButton>
</SectionContent>
````


## Cause

Some of the Telerik Blazor components rely on internal [cascading values and parameters](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/cascading-values-and-parameters) to send component instances and configuration settings from parent components (for example, the ToolBar) to child components (for example, the `ToolBarButton`).

Matching `Section` and `Outlet` components can reside anywhere in the app, including in different files. For the [transfer of cascading values and parameters, the placement of the `SectionContent` is crucial](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/sections?view=aspnetcore-8.0#section-interaction-with-other-blazor-features). This means that a `ToolBarButton` inside a `SectionContent` is effectively outside the ToolBar and cannot receive cascading values from it.

As a result, Telerik Blazor components cannot support such configurations. The same problem will occur with a similar setup with Grid columns, Form items, TabStrip tabs, Wizard steps and any other component, which defines items as a declarative collection of child tags.


## Solution

Use `SectionOutlet` inside Telerik Blazor components only inside officially documented templates.

>caption Test example that shows working and non-working Section integration with Telerik Blazor components

````RAZOR
@using Microsoft.AspNetCore.Components.Sections

<p>Default Configuration</p>
<TelerikToolBar>
    <ToolBarButton>ToolBar Button</ToolBarButton>
</TelerikToolBar>

<p>Broken with Section and ToolBarButton</p>
<TelerikToolBar>
    <SectionOutlet SectionName="ToolbarOutlet1"></SectionOutlet>
</TelerikToolBar>

<SectionContent SectionName="ToolbarOutlet1">
    <ToolBarButton>ToolBar Button</ToolBarButton>
</SectionContent>

<p>Works with Section, ToolBarTemplateItem and TelerikButton</p>
<TelerikToolBar>
    <ToolBarTemplateItem>
        <SectionOutlet SectionName="ToolbarOutlet2"></SectionOutlet>
    </ToolBarTemplateItem>
</TelerikToolBar>

<SectionContent SectionName="ToolbarOutlet2">
    <TelerikButton>Telerik Button</TelerikButton>
</SectionContent>
````


## Notes

We don't recommend and don't officially support custom markup or custom components inside our components, unless the custom content is placed inside a documented template (such as the ToolBar `ToolBarTemplateItem`) or containers that are intended for random content (such as the Window `WindowContent`). Currently it is possible to place invalid custom content inside Telerik components because [Blazor RenderFragments](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) don't support restrictions for child components and tags.


## See Also

* [Add Telerik Blazor components to the Blazor Web App Template](slug:getting-started/web-app)
