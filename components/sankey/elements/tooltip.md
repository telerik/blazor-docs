---
title: Tooltip
page_title: Sankey Tooltip
description: Tooltip of the Sankey Diagram for Blazor.
slug: sankey-tooltip
tags: telerik,blazor,sankey,diagram,chart,tooltip
published: True
position: 9
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Tooltip

The Sankey Diagram for Blazor displays Tooltips when the user hovers the links and nodes. You can customize the rendering of these Tooltips through dedicated templates:
* [`LinkTemplate`](#link-tooltip-template)
* [`NodeTemplate`](#node-tooltip-template)

To use the templates, declare a `<SankeyTooltip>` tag as a direct child of `<TelerikSankey>`. Add the desired template inside the `<SankeyTooltip>` tag. 

## Link Tooltip Template

The `LinkTemplate` controls the content of the Tooltip that will appear when the user hovers a link. The `NodeTemplate` exposes a `context` of type 
[`SankeyLinkTooltipTemplateContext`](/blazor-ui/api/Telerik.Blazor.Components.SankeyLinkTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 
| `Value` | `double?` | The hovered link value.  | 

## Node Tooltip Template

The `NodeTemplate` controls the content of the Tooltip that will appear when the user hovers a node. The `NodeTemplate` exposes a `context` of type [`SankeyNodeTooltipTemplateContext`](/blazor-ui/api/Telerik.Blazor.Components.SankeyNodeTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. The `SankeyDataNode` provides details for the hovered node such as its label, opacity, color, width, offset and alignment.   | 
| `Value` | `double?` | The hovered node value.  | 

## Example

Customizing the Sankey Tooltips.

````CSHTML
<style>
    .square-symbol {
        width: 15px;
        height: 15px;
        display: inline-block;
        margin-left: 3px;
        margin-right: 3px;
    }
</style>

<TelerikSankey Data="@Data"
               Width="1000px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
    <SankeyTooltip>
        <LinkTemplate>
            <div style="padding:5px; display: flex; align-items: center;">
                <span class="square-symbol" style="background-color: @context.Source.Color"></span>
                @context.Source.Label.Text

                <TelerikSvgIcon Icon="@SvgIcon.ChevronRight" Size="@ThemeConstants.SvgIcon.Size.Large"></TelerikSvgIcon>

                <span class="square-symbol" style="background-color: @context.Source.Color"></span>
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

@code {
    private SankeyData Data { get; set; }

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
* [Sankey Links]({%slug sankey-links%})
* [Sankey Nodes]({%slug sankey-nodes%})
* [Sankey Labels]({%slug sankey-labels%})
* [Sankey Legend]({%slug sankey-legend%})
* [Sankey Title]({%slug sankey-title%})