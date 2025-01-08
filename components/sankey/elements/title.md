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

The Sankey diagram for Blazor allows you to specify a title for the diagram. This article explains how to add and configure the title.

## Adding a Title

1. Declare a `<SankeyTitle>` tag as a direct child of `<TelerikSankey>`.
1. Set the `Text` parameter of the `<SankeyTitle>` tag.

You can customize the title through the parameter of the `<SankeyTitle>` tag and through the nested tags it exposes.

### Basic Customization

The `<SankeyTitle>` tag exposes the following parameters for customization of the title:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Align` | [`SankeyTitleAlign` enum](/blazor-ui/api/telerik.blazor.sankeytitlealign) <br/> (`Left`) | The alignment of the title. |
| `Background` | `string`  | The background color of the title. |
| `Color` | `string` <br/> (`rgb(66, 66, 66)`)  | The text color of the title. |
| `Description` | `string`  | The accessible description of the Sankey. Added as `aria-label` to the `<div class="k-sankey">` element. |
| `Font` | `string` <br/> (`16px Helvetica Neue, Helvetica, Arial, sans-serif`) | The font of the title. |
| `Position` | [`SankeyTitlePosition` enum](/blazor-ui/api/telerik.blazor.sankeytitleposition) <br/> (`Top`)| The position of the title. |
| `Visible` | `bool?` <br/> (`true`) | Whether the title is visible. |

### Nested Customization Tags

The `<SankeyTitle>` tag exposes nested tags for further customization. The structure of the nested tags is `<SankeyTitle*Specifics*>`, where the specifics can be:

* [`Border`](/blazor-ui/api/telerik.blazor.components.sankeytitleborder)
* [`Margin`](/blazor-ui/api/telerik.blazor.components.sankeytitlemargin)
* [`Padding`](/blazor-ui/api/telerik.blazor.components.sankeytitlepadding)

## Example

>caption Customizing the Sankey title by using nested tag settings

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
    <SankeyTitle Text="Sample Sankey Diagram" Description="Sample Sankey Diagram" Font="bold 17px sans-serif">
        <SankeyTitleBorder Color="grey" DashType="@DashType.Solid" Width="1" />
        <SankeyTitleMargin Bottom="10" />
    </SankeyTitle>
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
* [Sankey Links](slug://sankey-links)
* [Sankey Nodes](slug://sankey-nodes)
* [Sankey Labels](slug://sankey-labels)
* [Sankey Legend](slug://sankey-legend)
* [Sankey Tooltip](slug://sankey-tooltip)