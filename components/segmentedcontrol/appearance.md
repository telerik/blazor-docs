---
title: Appearance
page_title: SegmentedControl Appearance
description: Control the layout and size of the Blazor SegmentedControl using the LayoutMode and Size parameters to fit compact or full-width designs.
slug: segmentedcontrol-appearance
tags: telerik,blazor,segmented,control,appearance
published: True
position: 25
components: ["segmentedcontrol"]
---

# SegmentedControl Appearance

To control the appearance of the SegmentedControl, set the following parameters:

* [LayoutMode](#layoutmode)
* [Size](#size)

## LayoutMode

The `LayoutMode` parameter controls how the items are sized within the control. Set it to a member of the `SegmentedControlLayoutMode` enum:

| Enum member | Description |
|---|---|
| `Compact` (default) | Items are sized based on their content. |
| `Stretch` | Items stretch to fill the available horizontal space equally. |

### Compact

In `Compact` mode (the default):

* Each segment is as wide as its content (label, icon, and padding).
* Segments may have different widths depending on their content.
* The component's width equals the total width of all segments combined.
* The component does not fill its container.

### Stretch

In `Stretch` mode:

* The component fills the full width of its container.
* All segments share the available width equally, regardless of their label length.

>caption Compact and Stretch layout modes

````RAZOR
@using Telerik.Blazor.Components.SegmentedControl

<h4>Compact (default)</h4>
<TelerikSegmentedControl TItem="SegmentItem"
                         TValue="string"
                         Data="@Items"
                         @bind-Value="@SelectedCompact"
                         LayoutMode="@SegmentedControlLayoutMode.Compact">
</TelerikSegmentedControl>

<h4>Stretch</h4>
<TelerikSegmentedControl TItem="SegmentItem"
                         TValue="string"
                         Data="@Items"
                         @bind-Value="@SelectedStretch"
                         LayoutMode="@SegmentedControlLayoutMode.Stretch">
</TelerikSegmentedControl>

@code {
    private string SelectedCompact { get; set; }
    private string SelectedStretch { get; set; }

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Text = "Search",  Value = "search" },
        new SegmentItem() { Text = "Filter",  Value = "filter" },
        new SegmentItem() { Text = "Sort",    Value = "sort" },
    };

    public class SegmentItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
````

## Size

The `Size` parameter controls the padding of the Segmented Control items. Use the constants from the `Telerik.Blazor.ThemeConstants.Button.Size` class, or pass a custom string value:

| Class member | Value |
|---|---|
| `Small` | `"sm"` |
| `Medium` | `"md"` |
| `Large` | `"lg"` |

>caption Different sizes of the SegmentedControl

````RAZOR
@foreach (string size in Sizes)
{
    <div style="margin-bottom: 1rem;">
        <span>Size: <strong>@size</strong></span>
        <TelerikSegmentedControl TItem="SegmentItem"
                                 TValue="string"
                                 Data="@Items"
                                 Size="@size">
        </TelerikSegmentedControl>
    </div>
}

@code {
    private List<string> Sizes { get; set; } = new List<string>()
    {
        Telerik.Blazor.ThemeConstants.Button.Size.Small,
        Telerik.Blazor.ThemeConstants.Button.Size.Medium,
        Telerik.Blazor.ThemeConstants.Button.Size.Large,
    };

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Text = "Search",  Value = "search" },
        new SegmentItem() { Text = "Filter",  Value = "filter" },
        new SegmentItem() { Text = "Sort",    Value = "sort" },
    };

    public class SegmentItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
````

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [Live Demo: SegmentedControl](https://demos.telerik.com/blazor-ui/segmented-control/overview)
