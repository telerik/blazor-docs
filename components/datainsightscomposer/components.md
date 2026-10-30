---
title: Components
page_title: DatAInsightsComposer Components
description: Learn how to configure the data visualization components, which are rendered by the Telerik DatAInsightsComposer.
slug: datainsightscomposer-components
tags: telerik, blazor, datainsightscomposer, AI
published: True
position: 20
components: ["datainsightscomposer"]
---

# DatAInsightsComposer Components

This article describes the data visualization components, which the DatAInsightsComposer renders, and how to configure them.

## Basics

Each user prompt can result in a single rendered component and its selection depends on the AI response:

* ArcGauge
* [Chart](#chart)
* [Grid](#grid)
* LinearGauge
* RadialGauge

The specific configuration of the data visuzalization component depends on the user prompt and the DatAInsightsComposer algorithms. There are two ways to control some of the component settings and enable or disable features:

* Use the [`<DatAInsightsComposerComponentConfigSettings>`](#component-configuration-settings) child tag inside `<TelerikDatAInsightsComposer>`.
* Use the [`OnDataProcess` event](slug:datainsightscomposer-events#ondataprocess)
* Use the [`OnGenerate` event](slug:datainsightscomposer-events#ongenerate). Unlike the `OnDataProcess` event, this one does not provide an `args.Dataset` argument.

## Component Configuration Settings

The DatAInsightsComposer allows you to enforce specific visuzalization component settings in the component declaration. The following sections show available component configuration parameters and the default component behavior if the parameters are not set.

## Chart

Generated Chart components can display one of the following series types:

* Area
* Bar
* Bubble
* Column
* Donut
* Line
* Pie
* Scatter
* ScatterLine
* Waterfall

The declarative Chart configuration settings allow you to control the visibility of the tooltip and the legend. If not used, the effective Chart behavior matches the following code.

>caption Default Chart configuration settings

````RAZOR.skip-repl
<TelerikDatAInsightsComposer>
    <DatAInsightsComposerComponentConfigSettings>
        <ChartConfigSettings>
            <ChartLegendSettings Visible="true" />
            <ChartTooltipSettings Visible="false" />
        </ChartConfigSettings>
    </DatAInsightsComposerComponentConfigSettings>
</TelerikDatAInsightsComposer>
````

## Grid

The declarative Grid configuration settings allow you to enable or disable data and column operations. If not set, the effective Grid behavior and UI matches the code below.

Note that the `FilterMode` parameter expects a value of type `Telerik.Blazor.Components.DatAInsightsComposer.GridFilterMode` and not `Telerik.Blazor.GridFilterMode`, which is the type of the Grid `FilterMode` parameter.

>caption Default Grid configuration settings

````RAZOR.skip-repl
<TelerikDatAInsightsComposer>
    <DatAInsightsComposerComponentConfigSettings>
        <GridConfigSettings FilterMode="@GridFilterMode.Menu"
                            Groupable="false"
                            Reorderable="false"
                            Resizable="false"
                            Sortable="true"
                            ShowSearchBox="false"
                            ShowToolBar="false" />
    </DatAInsightsComposerComponentConfigSettings>
</TelerikDatAInsightsComposer>
````

## Next Steps

* [Implement Best Security Practices](slug:datainsightscomposer-security)
* [Manage the DatAInsightsComposer State](slug:datainsightscomposer-state)
* [Handle DatAInsightsComposer Events](slug:datainsightscomposer-events)

## See Also

* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.DatAInsightsComposer.TelerikDatAInsightsComposer)
