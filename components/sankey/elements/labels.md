---
title: Labels
page_title: Sankey Labels
description: Node labels in the Sankey Diagram for Blazor.
slug: sankey-labels
tags: telerik,blazor,sankey,diagram,chart,labels
published: True
position: 5
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Labels

The Sankey diagram Labels represent the [node](slug:sankey-nodes) names. The labels can show over the nodes or next to them. This article explains how to customize the labels in the UI for Blazor Sankey diagram. Each setting applies to all labels in the Sankey diagram.

>tip Each setting applies to all labels in the Sankey diagram. If you want to provide different settings for the separate labels, [customize them through the data source](slug:sankey-data-binding#customize-elements-through-data).

## Basic Customization

To customize the labels, declare a `<SankeyLabels>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLabels>` tag has the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Align` | [`SankeyLabelsAlign` enum](slug:telerik.blazor.sankeylabelsalign) <br/> (`Left`) | The alignment of the labels. |
| `Color` | `string` <br/> (`rgb(66, 66, 66)`) | The color of the labels. |
| `Font` | `string` <br/> (`14px Metric, Arial, Helvetica, sans-serif`)| The font of the labels. |
| `Position` | [`SankeyLabelsPosition` enum](slug:telerik.blazor.sankeylabelsposition) <br/> (`Inside`) | The position of the labels. |
| `Visible` | `bool` <br/> (`true`) | Whether the labels are visible. |


## Nested Customization Tags

The `<SankeyLabels>` tag exposes child tags for customization of the labels' border, margin, offset, padding and stroke.

### Border

By design, the labels do not have border. You may add border by declaring the `<SankeyLabelsBorder>` tag inside the `<SankeyLabels>` and specifying the desired settings. The  `<SankeyLabelsBorder>` provides the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Color` | `string` | The color of the border. |
| `DashType` | [`DashType` enum](slug:telerik.blazor.dashtype) <br/> (`Solid`) | The style of the border. |
| `Width` | `double?` <br/> (`0`)| The width of the border. |

### Margin

The `<SankeyLabelsMargin>` child tag provides the following properties:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left margin of the labels. |
| `Right` | `double?` | The right margin of the labels. |

### Offset

The `<SankeyLabelsOffset>` child tag provides the following properties:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left offset of the labels. |
| `Top` | `double?` | The top offset of the labels. |

### Padding

The `<SankeyLabelsPadding>` child tag provides the following properties:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Top` | `double?` | The top padding of the labels. |
| `Bottom` | `double?` | The bottom padding of the labels. |
| `Left` | `double?` | The left padding of the labels. |
| `Right` | `double?` | The right padding of the labels. |

### Stroke

The `<SankeyLabelsStroke>` child tag provides the following properties:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Color` | `string` | The color of the stroke. |
| `Width` | `double?` <br/> (`0`) | The width of the stroke. |

## Example

>caption Customizing the labels in the Sankey diagram

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyLabels Font="Monaco">
        <SankeyLabelsBorder Color="black" DashType="@DashType.LongDash" Width="1"></SankeyLabelsBorder>
        <SankeyLabelsPadding Top="5" Bottom="5" Left="10" Right="10"></SankeyLabelsPadding>
        <SankeyLabelsStroke Color="none"></SankeyLabelsStroke>
    </SankeyLabels>
</TelerikSankey>

@code {
    private SankeyData? Data { get; set; }

    protected override void OnInitialized()
    {
        var sourceNodes = 3;
        var destinationNodes = 3;

        Data = new SankeyData()
            {
                Nodes = new SankeyDataNodes(),
                Links = new SankeyDataLinks()
            };

        for (int i = 1; i <= sourceNodes + destinationNodes; i++)
        {
            var nodeDescriptor = i <= sourceNodes ? "Source" : "Destination";
            Data.Nodes.Add(new SankeyDataNode() { Id = i, Label = new SankeyDataNodeLabel() { Text = $"{nodeDescriptor} {i}" } });
        }

        for (int i = 1; i <= sourceNodes; i++)
        {
            for (int j = sourceNodes + 1; j <= sourceNodes + destinationNodes; j++)
            {
                Data.Links.Add(new SankeyDataLink()
                    {
                        SourceId = i,
                        TargetId = j,
                        Value = Random.Shared.Next(5, 30)
                    });
            }
        }
    }
}
````

## See Also

* [Live Demo: Sankey Diagram Configuration](https://demos.telerik.com/blazor-ui/sankey/configuration)
* [Sankey Links](slug:sankey-links)
* [Sankey Nodes](slug:sankey-nodes)
* [Sankey Legend](slug:sankey-legend)
* [Sankey Title](slug:sankey-title)
* [Sankey Tooltip](slug:sankey-tooltip)