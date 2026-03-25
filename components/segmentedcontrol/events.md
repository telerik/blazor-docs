---
title: Events
page_title: SegmentedControl - Events
description: Events of the SegmentedControl for Blazor.
slug: segmentedcontrol-events
tags: telerik,blazor,segmented,control,events
published: True
position: 30
components: ["segmentedcontrol"]
tag: new
---

# SegmentedControl Events

This article describes the events of the Telerik SegmentedControl for Blazor:

* [ValueChanged](#valuechanged)

## ValueChanged

The `ValueChanged` event fires when the user clicks an item and the selection changes. The event handler receives the new value as its argument.

Use `ValueChanged` together with `Value` for one-way binding, or use `@bind-Value` for two-way binding.

>caption Handle the SegmentedControl ValueChanged event

````RAZOR
<TelerikSegmentedControl TItem="SegmentedItem"
                         TValue="string"
                         Data="@Items"
                         Value="@SelectedValue"
                         ValueChanged="@OnValueChanged">
</TelerikSegmentedControl>

<p>Selected value: @SelectedValue</p>

@code {
    private string SelectedValue { get; set; } = "filter";

    private void OnValueChanged(string newValue)
    {
        SelectedValue = newValue;

        Console.WriteLine($"Selected: {newValue}");
    }

    private List<SegmentedItem> Items { get; set; } = new List<SegmentedItem>()
    {
        new SegmentedItem() { Text = "Search", Value = "search" },
        new SegmentedItem() { Text = "Filter", Value = "filter" },
        new SegmentedItem() { Text = "Sort",   Value = "sort" },
    };

    public class SegmentedItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl)
