---
title: Links
page_title: Sankey Links
description: Links in the Sankey Diagram for Blazor.
slug: sankey-links
tags: telerik,blazor,sankey,diagram,chart,links
published: True
position: 3
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Links

The Sankey Diagram Links are the lines that connect the [nodes]({%slug sankey-nodes%}) to each other. The greater the value of the link, the greater the width of the link will be. This article explains how to customize the links in the UI for Blazor Sankey Diagram.

>tip Each setting applies to all links in the Sankey Diagram. If you want to provide different settings for the separate links, [customize them through the data source]({%slug sankey-data-binding%}#customize-elements-through-data).

## Basic Customization

To customize the nodes, declare the `<SankeyLinks>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLinks>` tag exposes the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `ColorType` | `SankeyLinksColorType` enum <br /> (`Static`) | The origin of the link color: <ul><li>`Static` - the link color is based on the `Color` property;</li><li>`Source` - the link color is based on the source node color; </li><li>`Target` - the link color is based on the target node color; </li></ul> |
| `Color` | `string` <br/> (`#666666`) | The color of the links. Applies when `ColorType="@SankeyLinksColorType.Static"`. |
| `Opacity` | `double?` <br/> (`0.4`) | The opacity of the links. |

## Nested Customization Tags

The `<SankeyLinks>` tag exposes a child `<SankeyLinksHighlight>` tag that allows you to control the opacity of the links when the user hovers a link. It provides the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Opacity` | `double?` <br/> (`0.8`) | The opacity of the link when the user hovers it. |
| `InactiveOpacity` | `double?` <br/> (`0.2`) | The opacity of the non-hovered (inactive) links when the user hovers a link. |

## Example

Here is an example customization of the links in the Sankey Diagram.

````CSHTML
<TelerikSankey Data="@Data"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Target" Opacity="0.5">
               <SankeyLinksHighlight Opacity="0.7" InactiveOpacity="0.2"></SankeyLinksHighlight>
    </SankeyLinks>
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

## See Also

* [Live Demo: Sankey Diagram Configuration](https://demos.telerik.com/blazor-ui/sankey/configuration)
* [Sankey Nodes]({%slug sankey-nodes%})
* [Sankey Labels]({%slug sankey-labels%})
* [Sankey Legend]({%slug sankey-legend%})
* [Sankey Title]({%slug sankey-title%})
* [Sankey Tooltip]({%slug sankey-tooltip%})