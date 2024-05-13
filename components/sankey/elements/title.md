---
title: Title
page_title: Sankey Title
description: Title of the Sankey Diagram for Blazor.
slug: sankey-title
tags: telerik,blazor,sankey,diagram,chart,title
published: True
position: 7
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Title

The Sankey for Blazor allows you to specify a title for the diagram. This article explains how to add and configure the title.

## Adding a Title

1. Declare a `<SankeyTitle>` tag as a direct child of `<TelerikSankey>`.
1. Set the `Text` parameter of the `<SankeyTitle>` tag.

## Customizing the Title

You can customize the title through the parameter of the `<SankeyTitle>` tag and through the nested tags it exposes.

### Basic Customization

The `<SankeyTitle>` tag  exposes the following parameters for customization of the title:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Align` | `SankeyTitleAlign` enum | The alignment of the title. |
| `Background` | `string`  | The background color of the title. |
| `Color` | `string`  | The text color of the title. |
| `Description` | `string`  | The accessible description of the Sankey. Added as `aria-label` to the `<div class="k-sankey">` element. |
| `Font` | `string`  | The font of the title. |
| `Position` |  | The position of the title. |
| `Visible` | `bool?` <br/> (`true`) | Whether the title is visible.|

### Nested Customization Tags

The `<SankeyTitle>` tag exposes nested tags for further customization. The structure of the nested tags is `<SankeyTitle*Specifics*>`, where the specifics can be:

* [`Border`](/blazor-ui/api/telerik.blazor.components.sankeytitleborder)
* [`Margin`](/blazor-ui/api/telerik.blazor.components.sankeytitlemargin)
* [`Padding`](/blazor-ui/api/telerik.blazor.components.sankeytitlepadding)

## Example

Example customization the Sankey title by using nested tag settings.

````CSHTML
<TelerikSankey Data="@Data"
               Width="1000px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
    <SankeyTitle Text="Device usage by age groups" Description="Device usage by age groups" Font="bold 17px sans-serif">
        <SankeyTitleBorder Color="grey" DashType="@DashType.Solid" Width="1"/>
       <SankeyTitleMargin Bottom="10"/>
   </SankeyTitle>
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
