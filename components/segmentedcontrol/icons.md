---
title: Icons
page_title: SegmentedControl Icons
description: Learn how to display icons and text labels in each segment of the Blazor SegmentedControl using the IconField and IconClassField parameters.
slug: segmentedcontrol-icons
tags: telerik,blazor,segmented,control,icons
published: True
position: 15
components: ["segmentedcontrol"]
---

# SegmentedControl Icons

Each segment in the SegmentedControl can display a text label, an icon, or both. Use the `IconField` and `IconClassField` parameters to map model properties that provide icon information for each item.

## Icons and Text

Set `IconField` to the name of the model property that holds the icon identifier. The model property supports the same value types as other Telerik Blazor icon parameters.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

When `TextField` is also set, each segment renders an icon followed by a text label. When segments have no visible text, use `TitleField` to provide a tooltip for each item so that icon-only buttons remain identifiable.

>caption SegmentedControl with icon-only and icon-with-text segments

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedValue"
                         IconField="@nameof(SegmentItem.Icon)"
                         TextField="@nameof(SegmentItem.Text)"
                         TitleField="@nameof(SegmentItem.Title)">
</TelerikSegmentedControl>

<p>Selected: @SelectedValue</p>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private string SelectedValue { get; set; } = "edit";

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Icon = SvgIcon.AlignLeft, Title = "Align left",  Value = "left" },
        new SegmentItem() { Icon = SvgIcon.AlignRight, Title = "Align right", Value = "right" },
        new SegmentItem() { Icon = SvgIcon.Pencil, Text = "Edit", Value = "edit" },
        new SegmentItem() { Icon = SvgIcon.Eye, Text = "Preview", Value = "preview" },
    };

    public class SegmentItem
    {
        public object? Icon { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
}
````

## Custom Icon Classes

Use the `IconClassField` parameter to append an extra CSS class to the icon element. This is useful when you want to apply a modifier class (for example, a color or size variant) on top of a shared base icon class.

>caption SegmentedControl with custom icon classes

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedPriority"
                         IconClassField="@nameof(PriorityItem.IconClass)">
</TelerikSegmentedControl>

<p>Priority: @SelectedPriority</p>

<style>
    /* base styles shared by all SegmentedControl icons */
    .k-segmented-control .k-icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        font-size: 16px;
    }

    /* modifier classes for individual priority levels */
    .priority-low    { background: green; }
    .priority-medium { background: orange; }
    .priority-high   { background: red; }
</style>

@code {
    private string SelectedPriority { get; set; } = "medium";

    private List<PriorityItem> Items { get; set; } = new List<PriorityItem>()
    {
        new PriorityItem() { Text = "Low", IconClass = "priority-low", Value = "low" },
        new PriorityItem() { Text = "Medium", IconClass = "priority-medium", Value = "medium" },
        new PriorityItem() { Text = "High", IconClass = "priority-high", Value = "high" },
    };

    public class PriorityItem
    {
        public string Text { get; set; } = string.Empty;
        public string IconClass { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
}
````

## See Also

* [Icons in Telerik UI for Blazor](slug:common-features-icons)
* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Templates](slug:segmentedcontrol-templates)
