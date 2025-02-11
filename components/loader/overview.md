---
title: Overview
page_title: Loader Overview
description: Overview of the Loading indicator for Blazor.
slug: loader-overview
tags: telerik,blazor,loader,overview
published: True
position: 0
---

# Blazor Loader Overview

This article provides information about the <a href = "https://www.telerik.com/blazor-ui/loader" target="_blank">Blazor Loader component</a> and its core features.

The Loader component displays an animated loading indicator, which shows users that the app is working on something in the background. The component provides a variety of predefined animated graphics, colors and sizes.


## Comparison with the LoaderContainer

The **Loader** is placed inside another component or HTML element. Typically, it occupies a relatively small area. On the other hand, the [**LoaderContainer** component](slug:loadercontainer-overview) can cover a bigger part of the page or the whole viewport with a semi-transparent overlay and a loading animation.


## Creating Blazor Loader

1. Use the `<TelerikLoader>` tag.
1. Set the `Visible` parameter to a `bool` property.
1. (optional) Set the `Type` parameter to a member of the `LoaderType` enum.
1. (optional) Set the `Size` parameter to a property of the static class `ThemeConstants.Loader.Size`.
1. (optional) Set the `ThemeColor` parameter to a property of the static class `ThemeConstants.Loader.ThemeColor`.

>caption Blazor Loader with non-default appearance settings

````RAZOR
<TelerikButton OnClick="@( _ => LoaderVisible = !LoaderVisible )">Toggle Loader</TelerikButton>

<TelerikLoader Visible="@LoaderVisible"
               Size="@ThemeConstants.Loader.Size.Large"
               ThemeColor="@ThemeConstants.Loader.ThemeColor.Tertiary"
               Type="@LoaderType.ConvergingSpinner" />

<p>Default settings (Medium size, Primary color, Pulsing type):</p>

<TelerikLoader Visible="@LoaderVisible" />

@code {
    bool LoaderVisible { get; set; } = true;
}
````

> Do not show or hide the Loader in a method, which is blocking the UI thread with synchronous operations. If this happens, the Loader may not appear when expected. A possible workaround is to use `await Task.Delay(...)` to give Blazor time to refresh the UI.

## Appearance

The Blazor Loader component provides [appearance settings for size, color and loading animation type](slug:loader-appearance).


## Using In Other Components

It is possible to place the Loader component inside another component for better user experience. Here is an [example that integrates the Loader inside a Button](slug:loader-kb-inside-button).


## Loader Parameters

The following table lists the Loader parameters. Also check the [Loader API Reference](slug:Telerik.Blazor.Components.TelerikLoader).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-loader">` element. Use it to [override theme styles](slug:themes-override). |
| `Size` | `string`<br />(`"md"`) | Sets the [size of the animated graphic](slug:loader-appearance#size). For convenience, use the members of the static class [`ThemeConstants.Loader.Size`](slug:Telerik.Blazor.ThemeConstants.Loader.Size). |
| `ThemeColor` | `string`<br />(`"primary"`) | Sets the [color of the animated graphic](slug:loader-appearance#themecolor). For convenience, use the members of the static class [`ThemeConstants.Loader.ThemeColor`](slug:Telerik.Blazor.ThemeConstants.Loader.ThemeColor). |
| `Type`| `LoaderType` enum<br />(`Pulsing`) | Defines the [loading animation shape](slug:loader-appearance#type). |
| `Visible` | `bool`<br /> (`true`) | Sets if the Loader is rendered on the page. |


## Next Steps

* [Explore the Loader Appearance Settings](slug:loader-appearance)


## See Also

* [Live Demo: Loader](https://demos.telerik.com/blazor-ui/loader/overview)
* [Loader API Reference](slug:Telerik.Blazor.Components.TelerikLoader)
