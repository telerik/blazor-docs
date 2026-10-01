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

<demo metaUrl="client/segmentedcontrol/icons/example-1/" height="320"></demo>

## Custom Icon Classes

Use the `IconClassField` parameter to append an extra CSS class to the icon element. This is useful when you want to apply a modifier class (for example, a color or size variant) on top of a shared base icon class.

>caption SegmentedControl with custom icon classes

<demo metaUrl="client/segmentedcontrol/icons/example-2/" height="320"></demo>

## See Also

* [Icons in Telerik UI for Blazor](slug:common-features-icons)
* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Templates](slug:segmentedcontrol-templates)
