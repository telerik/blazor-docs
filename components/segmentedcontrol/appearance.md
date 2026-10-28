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

<demo metaUrl="client/segmentedcontrol/appearance/example-1/" height="420"></demo>

## Size

The `Size` parameter controls the padding of the Segmented Control items. Use the constants from the `Telerik.Blazor.ThemeConstants.Button.Size` class, or pass a custom string value:

| Class member | Value |
|---|---|
| `Small` | `"sm"` |
| `Medium` | `"md"` |
| `Large` | `"lg"` |

>caption Different sizes of the SegmentedControl

<demo metaUrl="client/segmentedcontrol/appearance/example-2/" height="320"></demo>

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [Live Demo: SegmentedControl](https://demos.telerik.com/blazor-ui/segmentedcontrol/overview)
