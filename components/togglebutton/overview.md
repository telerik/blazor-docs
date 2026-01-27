---
title: Overview
page_title: ToggleButton Overview
description: Overview of the ToggleButton for Blazor and its major features.
slug: togglebutton-overview
tags: telerik,blazor,Toggle,button,overview
published: True
position: 0
components: ["togglebutton"]
---
# Blazor ToggleButton Overview

This article provides information about the <a href="https://www.telerik.com/blazor-ui/togglebutton" target="_blank">Blazor ToggleButton component</a> and its core features.

The ToggleButton component can have a selected state, which is the main difference from the [regular Telerik UI for Blazor Button](slug:components/button/overview). The two-state styling depends on the [chosen theme](slug:themes-overview). The ToggleButton also provides [events](slug:togglebutton-events), [declarative appearance customization](slug:togglebutton-appearance) and can nest [icons](slug:togglebutton-icons).

## Creating Blazor ToggleButton

1. Use the `<TelerikToggleButton>` tag.
1. Set the `Selected` parameter to a `bool` property. Use two-way binding, or one-way binding with a [`SelectedChanged` handler](slug:togglebutton-events#selectedchanged).
1. Handle the [`OnClick` event](slug:togglebutton-events#onclick).
1. (optional) Add an [icon](slug:togglebutton-icons) or configure the [appearance](slug:togglebutton-appearance).

>caption Basic Telerik ToggleButton

````RAZOR
<TelerikToggleButton @bind-Selected="@IsSelected"
                     OnClick="@OnToggleButtonClick">
    Selected: <strong>@IsSelected</strong>
</TelerikToggleButton>

<p> @result </p>

@code {
    bool IsSelected { get; set; } = true;

    string result { get; set; }

    async Task OnToggleButtonClick()
    {
        string currentState = IsSelected ? "ON" : "OFF";
        result = $"The user clicked the {currentState} state";
    }
}
````

## Events

The Toggle Button exposes events for clicks and selected state changes. Find more in the [Toggle Button Events article](slug:togglebutton-events).

## Icons

The Toggle Button provides a built-in way to render [Telerik font icons, custom font icons, images or sprites](slug:togglebutton-icons).

## Appearance

The Toggle Button provides several parameters that control its [styling and appearance, including background color, rounded corners and fill](slug:togglebutton-appearance). 

## ToggleButton Parameters

The following table lists Toggle Button parameters, which are not discussed elsewhere. Check the [ToggleButton API Reference](slug:Telerik.Blazor.Components.TelerikToggleButton) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `AriaLabel` | `string` | Renders an `aria-label` HTML attribute to the button element. |
| `Class` | `string` | Renders additional CSS class to the `<button class="k-button">` element. Use it to apply custom styles or [override the theme](slug:themes-override). See [Custom Styling](#custom-styling) below. |
| `Enabled` | `bool` <br /> (`true`) | Determines if the button is enabled and accepts clicks. |
| `Id` | `string` | Renders an `id` HTML attribute to the button element. |
| `TabIndex` | `int` | Renders a `tabindex` attribute. |
| `Title` | `string` | Renders a `title` attribute. |

## Custom Styling

It is possible to apply custom styles to the button through its `Class` parameter. You may want to customize the styling based on the `Selected` state.

>caption Set CSS class to the button and change its appearance

````RAZOR
<TelerikToggleButton Class="my-toggle">
    Toggle Button
</TelerikToggleButton>

<style>
    /* default state */
    .my-toggle.k-button,
    .my-toggle.k-button:hover {
        border: 2px solid blue;
    }
    /* selected state */
    .my-toggle.k-selected,
    .my-toggle.k-selected:hover {
        color: yellow;
        font-weight: 700;
    }
</style>
````

## Next Steps

* [Handle Toggle Button Events](slug:togglebutton-events)
* [Enhance the Toggle Button with Icons](slug:togglebutton-icons)

## See Also

* [Live Demo: ToggleButton](https://demos.telerik.com/blazor-ui/togglebutton/overview)
* [ToggleButton API Reference](slug:Telerik.Blazor.Components.TelerikToggleButton)
