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

Set `IconVariantField` to the model property that holds the SVG icon variant for each segment. The default field name is `IconVariant`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

When `TextField` is also set, each segment renders an icon followed by a text label. When segments have no visible text, use `TitleField` to provide a tooltip for each item so that icon-only buttons remain identifiable.

>caption SegmentedControl with icon-only and icon-with-text segments

<demo metaUrl="client/segmentedcontrol/icons/example-1/" height="320"></demo>

## Custom Icon Classes

Use the `IconClassField` parameter to append an extra CSS class to the icon element. This is useful when you want to apply a modifier class (for example, a color or size variant) on top of a shared base icon class.

>caption SegmentedControl with custom icon classes

<demo metaUrl="client/segmentedcontrol/icons/example-2/" height="320"></demo>

## Trailing Icons

In addition to a leading icon, each segment can display a trailing icon, after its text label. Use the `EndIconField` parameter to map the model property that provides the trailing icon identifier for each item.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

Set `EndIconClassField` to the model property that holds an extra CSS class for the trailing icon. Set `EndIconVariantField` to the model property that holds the SVG icon variant for the trailing icon. The default field name is `EndIconVariant`. The `EndIconVariantField` is independent from `IconVariantField`, which applies only to the leading icon. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

When a segment has both a leading and a trailing icon, it renders them in the following order: leading icon, text label, trailing icon.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption SegmentedControl with leading and trailing icons

````RAZOR.skip-repl
<TelerikSegmentedControl Data="@Segments"
                         @bind-Value="@SelectedValue">
</TelerikSegmentedControl>

@code {
    private string SelectedValue { get; set; } = "List";

    private List<SegmentItemModel> Segments { get; set; } = new()
    {
        new SegmentItemModel { Text = "List", Value = "List", Icon = SvgIcon.ListUnordered, EndIcon = SvgIcon.Star },
        new SegmentItemModel { Text = "Grid", Value = "Grid", Icon = SvgIcon.GridLayout, EndIcon = SvgIcon.Star }
    };

    public class SegmentItemModel
    {
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public object? Icon { get; set; }
        public object? EndIcon { get; set; }
    }
}
````

## See Also

* [Icons in Telerik UI for Blazor](slug:common-features-icons)
* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Templates](slug:segmentedcontrol-templates)
