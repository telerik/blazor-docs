---
title: Position
page_title: Badge Position
description: Explore the position and alignment settings of the Badge for Blazor. The example at the bottom of the page lets you experiment with the available parameters.
slug: badge-position-alignment
tags: telerik,blazor,badge,position,align,alignment
published: True
position: 35
components: ["badge"]
---

# Position Settings

You can position and align the Blazor Badge component relative to its parent container by using the available parameters.

## Position

The Position parameter accepts a member of the BadgePosition enum and controls the placement of the badge in relation to its parent container:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Enum member | Description |
|---------------|--------|
| `Edge` <br /> (default) | The center of the Badge is at a corner of the parent container. |
| `Inline` | The Badge renders as part of the normal content flow of the web page. The `HorizontalAlign` and `VerticalAlign` parameters have no effect with `Inline` `Position`. |
| `Inside` | The Badge renders entirely inside the parent container. |
| `Outside`   | The Badge renders entirely outside the parent container. | 

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## Alignment

Use the available alignment parameters to control which side of the Badge touches the parent container.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `BadgeHorizontalAlign` | `Start` <br /> `End` (default value) |
| `VerticalAlign` | `BadgeVerticalAlign` | `Top` (default value) <br /> `Bottom` |

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## Example

The following example lets you experiment with the available settings that control the position and alignment of the Badge. It starts with the default component behavior.

<demo metaUrl="client/badge/position/" height="400"></demo>

## See Also

* [Live Demo: Badge Position](https://demos.telerik.com/blazor-ui/badge/position)
