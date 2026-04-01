---
title: Overview
page_title: SegmentedControl Overview
description: Explore the Blazor SegmentedControl and its key features — data binding, icons, templates, layout modes, and keyboard navigation.
slug: segmentedcontrol-overview
tags: telerik,blazor,segmented,control,overview
published: True
position: 0
components: ["segmentedcontrol"]
---

# Blazor SegmentedControl Overview

The <a href="https://www.telerik.com/blazor-ui/segmented-control" target="_blank">Blazor SegmentedControl component</a> displays a group of mutually exclusive options as a set of styled buttons. The user can select one option at a time. The component supports icons, disabled items, custom item templates, and two layout modes.

>tip Compared to the ButtonGroup, the SegmentedControl is a data-bound component — it renders items from a `Data` collection and allows only single selection. The [ButtonGroup](slug:buttongroup-overview) is markup-based — you declare each button explicitly as a child component and can configure the component for single or multiple selection.

## Creating Blazor SegmentedControl

1. Use the `<TelerikSegmentedControl>` tag.
1. Set the `Data` parameter to a collection of model instances.
1. Bind the selected value by using `@bind-Value` or a combination of `Value` and [`ValueChanged`](slug:segmentedcontrol-events#valuechanged).
1. (Optional) Configure the `TextField`, `ValueField`, and `IconField` parameters to [match your model property names](#data-binding).

>caption Basic SegmentedControl for Blazor

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedValue">
</TelerikSegmentedControl>

<p>Selected value: @SelectedValue</p>

@code {
    private string SelectedValue { get; set; } = "edit";

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Text = "Edit", Value = "edit", Icon = SvgIcon.Pencil },
        new SegmentItem() { Text = "Preview", Value = "preview", Icon = SvgIcon.Eye },
        new SegmentItem() { Text = "Split", Value = "split", Icon = SvgIcon.Columns },
    };

    public class SegmentItem
    {
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public object? Icon { get; set; }
    }
}
````

## Data Binding

The SegmentedControl requires a data source. Provide it through the `Data` parameter. The component has features that map to properties in the model. The following class uses property names that will work automatically, with no additional SegmentedControl configuration:

````C#.skip-repl
public class SegmentItem
{
    public string Text { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public object? Icon { get; set; }
    public string IconClass { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool Disabled { get; set; } = false;
    public bool Visible { get; set; } = true;
}
````

The above model properties have the following meaning for the SegmentedControl:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

<style>
    style + table td {
        vertical-align: top;
    }
</style>

| Property | Description |
| --- | --- |
| `Text` | Sets the display label for the item. Controlled by the `TextField` parameter (default: `"Text"`). |
| `Value` | Sets the value that `@bind-Value` uses when the item is selected. Controlled by the `ValueField` parameter (default: `"Value"`). |
| `Icon` | Sets an optional icon for the item using an `ISvgIcon` or a font icon ligature. Controlled by the `IconField` parameter (default: `"Icon"`). |
| `IconClass` | Sets a CSS class for a font icon to display in the item. Controlled by the `IconClassField` parameter (default: `"IconClass"`). |
| `Title` | Sets the tooltip text shown on hover. Controlled by the `TitleField` parameter (default: `"Title"`). |
| `Disabled` | When `true`, the item is rendered but cannot be selected or focused. Controlled by the `DisabledField` parameter (default: `"Disabled"`). |
| `Visible` | When `false`, the item is not rendered. Controlled by the `VisibleField` parameter (default: `"Visible"`). |

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

## SegmentedControl API

Get familiar with all SegmentedControl parameters, methods, events, and nested tags in the [DropDownTree API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl).

## Next Steps

* [Customize Item Rendering with Templates](slug:segmentedcontrol-templates)
* [Configure the SegmentedControl Appearance](slug:segmentedcontrol-appearance)
* [Handle SegmentedControl Events](slug:segmentedcontrol-events)

## See Also

* [Live Demo: SegmentedControl](https://demos.telerik.com/blazor-ui/segmentedcontrol/overview)
* [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl)
* [Icons in Telerik UI for Blazor](slug:common-features-icons)
