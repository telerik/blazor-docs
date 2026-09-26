---
title: Position
page_title: Floating Action Button Position
description: Explore the position and alignment settings of the Floating Action Button for Blazor.
slug: fab-positions
tags: telerik,blazor,floating action button,position,align,alignment
published: True
position: 2
components: ["floatingactionbutton"]
---

# Position and Alignment

You can position and align the Blazor Floating Action Button component relative to its parent container by using the available parameters. The example at the bottom of the page lets you experiment with the available parameters.

## Position Mode

The `PositionMode` parameter accepts a member of the `FloatingActionButtonPositionMode` enum and controls the CSS position of the Floating Action Button:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Enum member | Description |
|---------------|--------|
| `Fixed` <br /> (default) | Positions the button relative to the viewport. |
| `Absolute` | Positions the button relative to the nearest positioned ancestor. |

## Alignment

Use the available alignment parameters to control which side of the Floating Action Button touches the parent element:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `FloatingActionButtonHorizontalAlign` | `End` (default) <br /> `Start` <br /> `Center` |
| `VerticalAlign` | `FloatingActionButtonVerticalAlign` | `Bottom` (default) <br /> `Middle` <br /> `Top` |

## Example

<demo metaUrl="client/floatingactionbutton/position-alignment/example-1/" height="420"></demo>

## See Also

* [Positioning - Design System Docs](https://www.telerik.com/design-system/docs/components/floatingactionbutton/#positioning)