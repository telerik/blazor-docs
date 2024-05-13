---
title: Labels
page_title: Sankey Diagram Labels
description: Sankey Diagram Labels
slug: sankey-diagram-labels
tags: telerik,blazor,sankey,diagram,chart,labels
published: True
position: 5
---

# Sankey Diagram Labels

The Sankey Diagram Labels represent the [node]{%slug sankey-diagram-nodes%} names. The labels can show over the nodes or next to them. This article explains how to customize the labels in the UI for Blazor Sankey Diagram. Each setting applies to all labels in the Sankey Diagram.

## Basic Customization

To customize the labels, declare the `<SankeyLabels>` tag as a direct child of `<TelerikSankey>`. It exposes the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Align` | `string` | The alignment of the labels. |
| `Color` | `string` | The color of the labels. |
| `Font` | `string` | The font of the labels. |
| `Position` | `string` <br/> (`inside`) | The position of the labels. The supported values are: <ul><li>`inside` - the label is positioned after the node, except for the nodes at the end of the Sankey, that are placed before the node;</li><li>`before` - the label is positioned before the node; </li><li>`after` - the label is positioned after the node; </li></ul> |
| `Visible` | `bool` <br/> (`true`) | Whether the labels are visible. |


## Nested Customization Tags

The `<SankeyLabels>` tag exposes child tags for customization of the labels' border, margin, offset, padding and stroke.

### Border

By design, the labels do not have border. You may add border by declaring the `<SankeyLabelsBorder>` tag inside the `<SankeyLabels>` and specifying the desired settings. The  `<SankeyLabelsBorder>` provides the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Color` | `string` | The color of the border. |
| `DashType` | `DashType` enum <br/> (`DashType.Solid`) | The type of the border. |
| `Width` | `double?` | The width of the border. |

### Margin

The `<SankeyLabelsMargin>` child tag provides the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left margin of the labels. |
| `Right` | `double?` | The right margin of the labels. |

### Offset

The `<SankeyLabelsOffset>` child tag provides the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left offset of the labels. |
| `Top` | `double?` | The top offset of the labels. |

### Padding

The `<SankeyLabelsPadding>` child tag provides the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Top` | `double?` | The top padding of the labels. |
| `Bottom` | `double?` | The bottom padding of the labels. |
| `Left` | `double?` | The left padding of the labels. |
| `Right` | `double?` | The right padding of the labels. |

### Stroke

The `<SankeyLabelsStroke>` child tag provides the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Color` | `string` | The color of the stroke. |
| `LineJoin` | `string` | The [line join](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke. |
| `Left` | `double?` | The width of the stroke. |

## Example

Here is an example customization of the labels in the Sankey Diagram.

````CSHTML
<TelerikSankey Data="@Data"
               Width="700px"
               Height="400px">
    <SankeyLabels Font="Monaco">
        <SankeyLabelsBorder Color="black" DashType="@DashType.LongDash" Width="1"></SankeyLabelsBorder>
        <SankeyLabelsPadding Top="5" Bottom="5" Left="10" Right="10"></SankeyLabelsPadding>
        <SankeyLabelsStroke Color="none"></SankeyLabelsStroke>
    </SankeyLabels>
</TelerikSankey>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Data generation

    protected override void OnInitialized()
    {
        Data = new SankeyData()
            {
                Nodes = new SankeyDataNodes(),
                Links = new SankeyDataLinks()
            };

        Data.Nodes.Add(new SankeyDataNode() { Id = 1, Label = new SankeyDataNodeLabel() { Text = "Tablet (12%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 2, Label = new SankeyDataNodeLabel() { Text = "Mobile (40%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 3, Label = new SankeyDataNodeLabel() { Text = "Desktop (48%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 4, Label = new SankeyDataNodeLabel() { Text = "< 18 years (8%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 5, Label = new SankeyDataNodeLabel() { Text = "18-26 years (35%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 6, Label = new SankeyDataNodeLabel() { Text = "27-40 years (38%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 7, Label = new SankeyDataNodeLabel() { Text = "> 40 years (19%)" } });


        Data.Links.Add(new SankeyDataLink() { SourceId = 1, TargetId = 4, Value = 4 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 1, TargetId = 7, Value = 8 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 4, Value = 4 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 5, Value = 24 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 6, Value = 10 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 7, Value = 2 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 5, Value = 11 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 6, Value = 28 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 7, Value = 9 });
    }

    #endregion Data generation
}
````