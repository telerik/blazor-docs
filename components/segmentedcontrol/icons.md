---
title: Icons
page_title: SegmentedControl Icons
description: Learn how to display icons and text labels in the Blazor SegmentedControl. Configure the IconField and IconClassField parameters to show built-in or custom icons in each segment.
slug: segmentedcontrol-icons
tags: telerik,blazor,segmented,control,icons
published: True
position: 15
components: ["segmentedcontrol"]
tag: new
---

# SegmentedControl Icons

Each segment in the SegmentedControl can display a text label, an icon, or both. Use the `IconField` and `IconClassField` parameters to map model properties that provide icon information for each item.

## Icons

Set `IconField` to the name of the model property that holds the icon identifier. The model property supports the same value types as other Telerik Blazor icon parameters:

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption SegmentedControl with icons only

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedAlignment"
                         IconField="@nameof(AlignItem.Icon)"
                         TitleField="@nameof(AlignItem.Title)">
</TelerikSegmentedControl>

<p>Alignment: @SelectedAlignment</p>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private string SelectedAlignment { get; set; } = "left";

    private List<AlignItem> Items { get; set; } = new List<AlignItem>()
    {
        new AlignItem() { Icon = SvgIcon.AlignLeft, Title = "Align left", Value = "left" },
        new AlignItem() { Icon = SvgIcon.AlignCenter, Title = "Align center", Value = "center" },
        new AlignItem() { Icon = SvgIcon.AlignRight, Title = "Align right", Value = "right" },
    };

    public class AlignItem
    {
        public object Icon { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
    }
}
````

> When segments have no visible text, use `TitleField` to provide a tooltip for each item so that icon-only buttons remain identifiable.

## Icons with Text

When both `IconField` and `TextField` are set, each segment renders an icon followed by a text label.

>caption SegmentedControl with icons and text labels

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedMode"
                         IconField="@nameof(EditorModeItem.Icon)">
</TelerikSegmentedControl>

<p>Mode: @SelectedMode</p>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private string SelectedMode { get; set; } = "edit";

    private List<EditorModeItem> Items { get; set; } = new List<EditorModeItem>()
    {
        new EditorModeItem() { Text = "Edit", Icon = SvgIcon.Pencil, Value = "edit" },
        new EditorModeItem() { Text = "Preview", Icon = SvgIcon.Eye, Value = "preview" },
        new EditorModeItem() { Text = "Split", Icon = SvgIcon.Columns, Value = "split" },
    };

    public class EditorModeItem
    {
        public string Text { get; set; }
        public object Icon { get; set; }
        public string Value { get; set; }
    }
}
````

## Custom Icon Classes

Use the `IconClassField` parameter to append an extra CSS class to the icon element rendered by `IconField`. This is useful when you want to apply a modifier class (for example, a color or size variant) on top of a shared base icon class.

>caption SegmentedControl with custom icon classes

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedPriority"
                         IconField="@nameof(PriorityItem.Icon)"
                         IconClassField="@nameof(PriorityItem.IconClass)">
</TelerikSegmentedControl>

<p>Priority: @SelectedPriority</p>

<style>
    /* base styles shared by all priority icons */
    .priority-icon {
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
        new PriorityItem() { Text = "Low",    Icon = "priority-icon", IconClass = "priority-low", Value = "low" },
        new PriorityItem() { Text = "Medium", Icon = "priority-icon", IconClass = "priority-medium", Value = "medium" },
        new PriorityItem() { Text = "High",   Icon = "priority-icon", IconClass = "priority-high", Value = "high" },
    };

    public class PriorityItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string IconClass { get; set; }
        public string Value { get; set; }
    }
}
````

## See Also

* [Icons in Telerik UI for Blazor](slug:common-features-icons)
* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Templates](slug:segmentedcontrol-templates)
