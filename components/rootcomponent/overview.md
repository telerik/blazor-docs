---
title: Overview
page_title: RootComponent - Overview
description: Overview of the Telerik Root Component for Blazor.
slug: rootcomponent-overview
tags: telerik,blazor,telerikrootcomponent,rootcomponent
published: True
position: 0
---

# TelerikRootComponent Overview

The `TelerikRootComponent` is a special component in Telerik UI for Blazor. Its placement and configuration affects all other Telerik Blazor components. This article describes the purpose and usage of `TelerikRootComponent`.


## Purpose

The `TelerikRootComponent` is responsible for the following tasks:

* It provides settings to all its child Telerik components, for example, for the [icon type](slug://common-features-icons#set-global-icon-type) or [right-to-left (RTL) support](slug://rtl-support).
* It renders all Telerik popups, which has the following benefits:
    * It's more reliable that the popups will display on top of the other page content.
    * There is no risk for the popups to be trapped by scrollable containers, or clipped by containers with an `overflow:hidden` style.
* It exposes the `DialogFactory` for using [predefined dialogs](slug://dialog-predefined).

The `TelerikRootComponent` achieves all these tasks with the help of [cascading values](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/cascading-values-and-parameters). That's why it is crucial for the root component to wrap all other Telerik components in the app, otherwise an [exception may occur](slug://common-kb-component-requires-telerikrootcomponent). To ensure correct popup position, it is also highly recommended for the `TelerikRootComponent` to be the top-level component in the app and wrap all other content, including the application layout.


## Using TelerikRootComponent

This section applies to:

* .NET 8 and .NET 9 Blazor Web Apps with **Global** interactivity location. If your app has **Per page/component** interactivity, then refer to section [Interactivity Considerations](#interactivity-considerations) below.
* Blazor Server, WebAssembly and Hybrid apps in all .NET versions

The recommended way to add `TelerikRootComponent` to a Blazor app is to:

@[template](/_contentTemplates/rootcomponent/setup.md#define-in-teleriklayout)

The above approach has the following benefits:

* There is a separation of concerns and a single `TelerikRootComponent` can be a parent of multiple other layouts.
* You can use `DialogFactory` (predefined Telerik dialogs) in `MainLayout.razor`.

However, you can also add `<TelerikRootComponent>` directly to an existing application layout, instead of creating a new one.

>caption Adding TelerikRootComponent to MainLayout.razor

<div class="skip-repl"></div>

````RAZOR
@inherits LayoutComponentBase

<TelerikRootComponent>
    @* All the MainLayout.razor content becomes nested in the Telerik root component. *@
</TelerikRootComponent>
````


## Interactivity Considerations

.NET 8 introduced new [render modes for Blazor web apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes) and the concept of static Blazor apps with optional interactive components. The following requirements and considerations apply to the `TelerikRootComponent`:

* The `TelerikRootComponent` must reside in an interactive layout or component.
* Application layouts are interactive only if the whole app is interactive. To achieve this, set **Interactivity location** of the app to **Global** during app creation.

If you are using Telerik components in a Blazor app with **Per page/component** interactivity location, then learn [how to correctly add the `TelerikRootComponent`](slug://rootcomponent-percomponent) in this case.


## TelerikRootComponent Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `EnableRtl` | `bool` | Enables [right-to-left (RTL) support](slug://rtl-support). |
| `IconType` | `IconType` enum <br /> (`Svg`) | The icon type, which other Telerik components will use to render internal icons. Regardless of this parameter value, you can freely use the [`<TelerikFontIcon>`](slug://common-features-icons#fonticon-component) and [`<TelerikSvgIcon>`](slug://common-features-icons#svgicon-component) components, and [set the `Icon` parameter of other Telerik components](slug://button-icons) to any type that you wish. |
| `Localizer` | `Telerik.Blazor.Services.ITelerikStringLocalizer` | The Telerik localization service. The recommended approach is to [define the localizer as a service in `Program.cs`](slug://globalization-localization). Use the `Localizer` parameter only in special cases when this is not possible. |


## See Also

* [Popup Troubleshooting](slug://troubleshooting-general-issues)
* [Setting up Telerik Blazor apps](slug://getting-started/what-you-need)
* [Exception: Telerik component requires a TelerikRootComponent](slug://common-kb-component-requires-telerikrootcomponent)
