---
title: Overview
page_title: SegmentedControl Overview
description: Overview of the SegmentedControl for Blazor and its major features.
slug: segmentedcontrol-overview
tags: telerik,blazor,segmented,control,overview
published: True
position: 0
components: ["segmentedcontrol"]
tag: new
---

# Blazor SegmentedControl Overview

The <a href="https://www.telerik.com/blazor-ui/segmented-control" target="_blank">Blazor SegmentedControl component</a> displays a group of mutually exclusive options as a set of styled buttons. The user can select one option at a time. The component supports icons, disabled items, custom item templates, and two layout modes.

## Creating Blazor SegmentedControl

1. Use the `<TelerikSegmentedControl>` tag.
1. Set the `Data` parameter to a collection of model instances.
1. Bind the selected value by using `@bind-Value` or a combination of `Value` and [`ValueChanged`](slug:segmentedcontrol-events#valuechanged).
1. (Optional) Configure the `TextField`, `ValueField`, and `IconField` parameters to match your model property names.

>caption Basic SegmentedControl for Blazor

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedValue">
</TelerikSegmentedControl>

<p>Selected value: @SelectedValue</p>

@code {
    private string SelectedValue { get; set; } = "edit";

    private List<SegmentedItem> Items { get; set; } = new List<SegmentedItem>()
    {
        new SegmentedItem() { Text = "Edit",    Value = "edit",    Icon = nameof(SvgIcon.Pencil) },
        new SegmentedItem() { Text = "Preview", Value = "preview", Icon = nameof(SvgIcon.Eye) },
        new SegmentedItem() { Text = "Split",   Value = "split",   Icon = nameof(SvgIcon.Columns) },
    };

    public class SegmentedItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public string Icon { get; set; }
    }
}
````

## Data Binding

The SegmentedControl requires a data source. Provide it through the `Data` parameter. Use the `TextField`, `ValueField`, `IconField`, `DisabledField`, `VisibleField`, `IconClassField`, and `TitleField` parameters to map the corresponding properties in your model.

The default field names match common model conventions so that minimal configuration is required when your model uses the default names (`Text`, `Value`, `Icon`, `Disabled`, `Visible`, `IconClass`, `Title`).

## Templates

The SegmentedControl supports an `ItemTemplate` that allows you to customize the rendering of each item. [Read more about the Blazor Segmented Control templates...](slug:segmentedcontrol-templates)

## Events

The SegmentedControl fires a `ValueChanged` event when the user selects a different item. [Read more about the Blazor SegmentedControl events...](slug:segmentedcontrol-events)

## Appearance

The SegmentedControl provides parameters that control its size and layout. [Read more about the Blazor SegmentedControl appearance...](slug:segmentedcontrol-appearance)

>tip To learn more about the appearance, anatomy, and accessibility of the SegmentedControl, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/segmentedcontrol/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Keyboard Navigation

The following table lists the keyboard actions supported by the SegmentedControl:

| Key | Action |
|---|---|
| `Tab` | Move focus to the next item. |
| `Shift`+`Tab` | Move focus to the previous item. |
| `Space` / `Enter` | Activate the focused item. |

Disabled items are skipped during keyboard navigation and cannot be activated. All interactive items have proper focus indicators for keyboard users.

## SegmentedControl Parameters

The following table lists SegmentedControl parameters. Check the [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl) for a full list of properties, methods, and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Data` | `IEnumerable<TItem>` | The collection of items rendered in the Segmented Control. |
| `Value` | `TValue` | The currently selected value. Use with `ValueChanged` or `@bind-Value`. |
| `ValueChanged` | `EventCallback<TValue>` | Fires when the user selects a different item. See [events](slug:segmentedcontrol-events). |
| `LayoutMode` | `SegmentedControlLayoutMode` <br /> (`Compact`) | Controls how items are sized. `Compact` sizes items based on their content. `Stretch` makes items fill the available horizontal space. See [appearance](slug:segmentedcontrol-appearance). |
| `Size` | `string` | Sets the padding of the control. Accepts values from the `ThemeConstants` size constants. |
| `TextField` | `string` <br /> (`"Text"`) | The name of the model property that contains the display text for each item. |
| `ValueField` | `string` <br /> (`"Value"`) | The name of the model property that contains the value for each item. |
| `IconField` | `string` <br /> (`"Icon"`) | The name of the model property that contains the icon identifier for each item. |
| `IconClassField` | `string` <br /> (`"IconClass"`) | The name of the model property that contains the CSS icon class for each item. |
| `TitleField` | `string` <br /> (`"Title"`) | The name of the model property that contains the tooltip title for each item. |
| `DisabledField` | `string` <br /> (`"Disabled"`) | The name of the model property that determines whether an item is disabled. |
| `VisibleField` | `string` <br /> (`"Visible"`) | The name of the model property that determines whether an item is visible. |
| `ItemTemplate` | `RenderFragment<TItem>` | A template for rendering custom content inside each item. See [templates](slug:segmentedcontrol-templates). |

## Next Steps

* [Handle SegmentedControl Events](slug:segmentedcontrol-events)
* [Customize Item Rendering with Templates](slug:segmentedcontrol-templates)
* [Configure the SegmentedControl Appearance](slug:segmentedcontrol-appearance)

## See Also

* [Live Demo: SegmentedControl](https://demos.telerik.com/blazor-ui/segmentedcontrol/overview)
* [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl)
* [Icons in Telerik UI for Blazor](slug:common-features-icons)
