---
title: Position
page_title: Badge Position
description: Position settings of the Badge for Blazor.
slug: badge-position-alignment
tags: telerik,blazor,badge,position,align,alignment
published: True
position: 35
---

# Position Settings

This article outlines the available Badge parameters, which control its position and alignment.

## Position

The `Position` parameter accepts a member of the `BadgePosition` enum and controls where the badge displays based on the parent container:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Enum member | Description |
|---------------|--------|
| `Edge` <br /> (default) | The center of the Badge will touch the edge of the parent container. |
| `Inside` | The Badge renders entirely inside the parent container. |
| `Outside`   | The Badge renders entirely outside the parent container. | 

See the [example](#example) below to customize the available parameters and see how they affect the Badge component.

## Alignment

Use the available parameters to control which side of the Badge touches the parent container.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `BadgeHorizontalAlign` | `Start` <br /> `End` (default value) |
| `VerticalAlign` | `BadgeVerticalAlign` | `Top` (default value) <br /> `Bottom` |

See the [example](#example) below to customize the available parameters and see how they affect the Badge component.

## Example

## See Also

  * [Live Demo: AppBar Position](https://demos.telerik.com/blazor-ui/appbar/position)