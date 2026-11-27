---
title: Funnel
page_title: Chart - Funnel
description: Overview of the Funnel Chart for Blazor and its dynamic segment height, slope, neck ratio, and spacing options.
slug: chart-types-funnel
tags: telerik,blazor,chart,funnel
published: true
tag: new
position: 0
components: ["charts"]
---

# Funnel Chart

The Blazor Funnel Chart displays values as connected segments that narrow from top to bottom. Use it to show how a value changes through sequential stages, such as a sales pipeline, registration process, or application workflow.

Each data item creates one funnel segment. You can size segments according to their values and calculate each slope from the relationship between consecutive stages.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating a Funnel Chart

To create a Funnel Chart:

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
1. Set its `Type` parameter to `ChartSeriesType.Funnel`.
1. Provide a model collection to the series `Data` parameter.
1. Set `Field` to the model property that contains the values.
1. Set `CategoryField` to the model property that contains the stage names.
1. (Optional) Set `ColorField` to the model property that contains the segment colors.

The following example compares a standard Funnel Chart with a Funnel Chart that calculates each segment slope from the ratio between consecutive values.

>caption Standard and dynamic-slope Funnel Charts

<demo metaUrl="client/chart/types/funnel/" height="650"></demo>

## Funnel Chart Specific Appearance Settings

The Funnel series exposes the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `DynamicHeight` | `bool?` | Controls whether segment heights are proportional to their values. Set `DynamicHeight` to `true` to make the segment height proportional to its value. Set it to `false` to render segments with equal heights. |
| `DynamicSlope` | `bool?` | Set `DynamicSlope` to `true` to calculate each segment slope from the ratio between its value and the next segment value. This configuration emphasizes the change between consecutive stages. Set `DynamicSlope` to `false` to use the standard funnel shape. |
| `NeckRatio` | `double?` | Sets the ratio between the top and bottom bases of the funnel. |
| `SegmentSpacing` | `double?` | Sets the spacing between adjacent segments in pixels. |

### Segment Colors

To set a color for each segment, add a string property to the data model and set the series `ColorField` to its name. Each property value can be any valid CSS color.

## Other Settings

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-axis-free)

## See Also

* [Pyramid Chart](slug:components/chart/types/pyramid)
* [Chart Data Binding](slug:components/chart/databind)
* [Chart Labels](slug:components/chart/label-template-format)
* [Chart Tooltips](slug:chart-tooltip-overview)
