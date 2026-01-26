---
title: Tooltip
page_title: Sankey Tooltip
description: Tooltip of the Sankey Diagram for Blazor.
slug: sankey-tooltip
tags: telerik,blazor,sankey,diagram,chart,tooltip
published: True
position: 9
components: ["sankey"]
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Tooltip

The Sankey Diagram for Blazor displays Tooltips when the user hovers the links and nodes. You can customize the rendering of these Tooltips through dedicated templates:
* [`LinkTemplate`](#link-tooltip-template)
* [`NodeTemplate`](#node-tooltip-template)

To use the templates, declare a `<SankeyTooltip>` tag as a direct child of `<TelerikSankey>`. Add the desired template inside the `<SankeyTooltip>` tag. 

## Link Tooltip Template

The `LinkTemplate` controls the content of the Tooltip that will appear when the user hovers a link. The `NodeTemplate` exposes a `context` of type 
[`SankeyLinkTooltipTemplateContext`](slug:Telerik.Blazor.Components.SankeyLinkTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment, and more.   |
| `Target` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 
| `Value` | `double?` | The hovered link value. | 

## Node Tooltip Template

The `NodeTemplate` controls the content of the Tooltip that will appear when the user hovers a node. The `NodeTemplate` exposes a `context` of type [`SankeyNodeTooltipTemplateContext`](slug:Telerik.Blazor.Components.SankeyNodeTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The node that the user hovered. The `SankeyDataNode` provides details for the hovered node such as its label, opacity, color, width, offset and alignment.   | 
| `Value` | `double?` | The hovered node value.  | 

## Example

>caption Customizing the Sankey Tooltips

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
    <SankeyTooltip>
        <LinkTemplate>
            <div style="padding:5px; display: flex; align-items: center;">
                <span class="square-symbol" style="background-color: @context.Source.Color"></span>
                @context.Source.Label.Text

                <TelerikSvgIcon Icon="@SvgIcon.ChevronRight" Size="@ThemeConstants.SvgIcon.Size.Large"></TelerikSvgIcon>

                <span class="square-symbol" style="background-color: @context.Target.Color"></span>
                @context.Target.Label.Text
            </div>
        </LinkTemplate>

        <NodeTemplate>
            <div style="color:@context.DataItem.Color; font-weight:bold">
                @context.DataItem.Label.Text
            </div>
        </NodeTemplate>
    </SankeyTooltip>
</TelerikSankey>

<style>
    .square-symbol {
        width: 15px;
        height: 15px;
        display: inline-block;
        margin-left: 3px;
        margin-right: 3px;
    }
</style>

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
* [Sankey Labels](slug:sankey-labels)
* [Sankey Legend](slug:sankey-legend)
* [Sankey Title](slug:sankey-title)
