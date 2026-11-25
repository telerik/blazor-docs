---
title: Pyramid
page_title: Chart - Pyramid
description: Overview of the Pyramid Chart for Blazor and its dynamic segment height and spacing options.
slug: components/chart/types/pyramid
tags: telerik,blazor,chart,pyramid
published: true
tag: new
position: 0
components: ["charts"]
---

# Pyramid Chart

The Blazor Pyramid Chart displays values as horizontal segments that form a pyramid. Use it to visualize stages that increase toward a goal, levels in a hierarchy, or the distribution of values across ordered categories.

Each data item creates one pyramid segment. The Chart can calculate the segment heights from the data values or render all segments with equal heights.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating a Pyramid Chart

To create a Pyramid Chart:

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
1. Set its `Type` parameter to `ChartSeriesType.Pyramid`.
1. Provide a model collection to the series `Data` parameter.
1. Set `Field` to the model property that contains the values.
1. Set `CategoryField` to the model property that contains the segment names.
1. (Optional) Set `ColorField` to the model property that contains the segment colors.

The following example compares proportional and equal segment heights. The first Chart sizes each segment according to its value. The second Chart uses the same height for all segments.

>caption Pyramid Charts with proportional and equal segment heights

<demo metaUrl="client/chart/types/pyramid/" height="630"></demo>

## Pyramid Chart Specific Appearance Settings

The Pyramid series exposes the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `DynamicHeight` | `bool?` | Controls whether segment heights are proportional to their values. |
| `SegmentSpacing` | `double?` | Sets the spacing between adjacent segments in pixels. |

### Dynamic Segment Height

Set `DynamicHeight` to `true` to make the segment height proportional to its value. Larger values create taller segments.

Set `DynamicHeight` to `false` to use equal segment heights. The segment widths still represent the pyramid shape.

### Segment Spacing

Use `SegmentSpacing` to separate adjacent segments. The value represents the distance in pixels.

### Segment Colors

To set a color for each segment, add a string property to the data model and set the series `ColorField` to its name. Each property value can be any valid CSS color.

## Other Settings

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-axis-free)

## See Also

* [Funnel Chart](slug:components/chart/types/funnel)
* [Chart Data Binding](slug:components/chart/databind)
* [Chart Labels](slug:components/chart/label-template-format)
* [Chart Tooltips](slug:chart-tooltip-overview)
