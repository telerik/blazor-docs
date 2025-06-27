---
title: Shapes
page_title: Diagram - Shapes
description: Learn about 
slug: diagram-shapes
tags: telerik,blazor,diagram
published: True
position: 20
---

# Blazor Diagram Shapes



## Example

The following configuration is not using a prefefined [Diagram layout](slug:diagram-layouts). However, you can remove all Shape `X` and `Y` parameters and set a define a layout though the `<DiagramLayout>` tag.

>caption Customize Diagram Shapes

````RAZOR
<TelerikDiagram Height="300px">
    <DiagramShapeDefaults>
        <DiagramShapeDefaultsContent Color="white" />
        <DiagramShapeDefaultsFill Color="purple" Opacity="0.8" />
        <DiagramShapeDefaultsHover>
            <DiagramShapeDefaultsHoverFill Color="blue" Opacity="1" />
        </DiagramShapeDefaultsHover>
        <DiagramShapeDefaultsEditable Connect="true" Drag="true" Enabled="true" Remove="false" />
        <DiagramShapeDefaultsRotation Angle="0" />
        <DiagramShapeDefaultsStroke Color="black" DashType="@DashType.Dot" Width="2" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape Height="100"
                      Id="shape1"
                      Path=""
                      Type="@DiagramShapeType.Circle"
                      Width="100"
                      X="200"
                      Y="20">
            <DiagramShapeContent Text="Circle">
            </DiagramShapeContent>
            <DiagramShapeEditable Enabled="false" Connect="false"></DiagramShapeEditable>
        </DiagramShape>
        <DiagramShape Height="160"
                      Id="shape2"
                      Path=""
                      Source="https://demos.telerik.com/blazor-ui/images/home-page/contact-ninja.svg"
                      Type="@DiagramShapeType.Image"
                      Width="140"
                      X="20"
                      Y="50">
            <DiagramShapeContent Text="Image" Color="#225eff" FontWeight="bold">
            </DiagramShapeContent>
        </DiagramShape>
        <DiagramShape Height="80"
                      Id="shape3"
                      Path=""
                      Type="@DiagramShapeType.Rectangle"
                      Width="160"
                      X="400"
                      Y="50">
            <DiagramShapeContent Text="Rectangle" Color="#3d3d3d" />
            <DiagramShapeFill Color="#f5f5f5" />
            <DiagramShapeHover>
                <DiagramShapeHoverFill Color="#ebebeb"></DiagramShapeHoverFill>
            </DiagramShapeHover>
            <DiagramShapeRotation Angle="20"></DiagramShapeRotation>
            <DiagramShapeStroke DashType="@DashType.LongDash" Color="blue" Width="2" />
        </DiagramShape>
        <DiagramShape Height="100"
                      Id="shape4"
                      Path=""
                      Type="@DiagramShapeType.Text"
                      Width="100"
                      X="200"
                      Y="250">
            <DiagramShapeContent Text="Text" Color="black" />
        </DiagramShape>
        <DiagramShape Height="75"
                      Id="shape5"
                      Path="M 2 13 A 1.42 1.42 0 0 1 6 13"
                      Width="150"
                      X="300"
                      Y="150">
            <DiagramShapeContent Text="Custom Path" />
            <DiagramShapeStroke Color="transparent" DashType="@DashType.Solid" Width="0" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape1" ToId="shape4" />
        <DiagramConnection FromId="shape3" ToId="shape5" />
    </DiagramConnections>

</TelerikDiagram>
````

## Visuals

https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/group

https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual

````RAZOR
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"></DiagramLayout>

    <DiagramShapeDefaults>
        <DiagramShapeDefaultsContent Template="templateFunction" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Template="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2" Visual="visualFunction">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
    </DiagramConnections>
</TelerikDiagram>

@* Move JavaScript code to an external JS file *@
<script suppress-error="BL9992">
    function visualFunction(data) {
        let group = new TelerikBlazor.DiagramCommon.Group({
          autoSize: true
        });
        let circle = new TelerikBlazor.DiagramCommon.Circle({
          width : 100,
          height: 60,
          fill: "orange"
        });
        group.append(circle);

        return group;
    }
</script>
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
