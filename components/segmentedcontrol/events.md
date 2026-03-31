---
title: Events
page_title: SegmentedControl - Events
description: Explore the ValueChanged event of the Telerik Blazor SegmentedControl component, which fires when the user selects a different item.
slug: segmentedcontrol-events
tags: telerik,blazor,segmented,control,events
published: True
position: 30
components: ["segmentedcontrol"]
---

# SegmentedControl Events

This article describes the ValueChanged event of the Telerik SegmentedControl for Blazor.

## ValueChanged

The `ValueChanged` event fires when the user clicks an item and the selection changes. The event handler receives the new value as its argument. The application must update the Value parameter in the handler.

Use `ValueChanged` together with `Value` for one-way binding, or use `@bind-Value` for two-way binding.

>caption Handle the SegmentedControl ValueChanged event

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         Value="@SelectedValue"
                         ValueChanged="@( (string newValue) => OnValueChanged(newValue) )">
</TelerikSegmentedControl>

<p>Selected value: @SelectedValue</p>

@code {
    private string SelectedValue { get; set; } = "filter";

    private void OnValueChanged(string newValue)
    {
        // update the value
        SelectedValue = newValue;

        Console.WriteLine($"Selected: {newValue}");
    }

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Text = "Search", Value = "search" },
        new SegmentItem() { Text = "Filter", Value = "filter" },
        new SegmentItem() { Text = "Sort", Value = "sort" },
    };

    public class SegmentItem
    {
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl)
