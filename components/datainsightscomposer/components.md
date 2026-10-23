---
title: Components
page_title: Data Insights Composer Components
description: Learn how to configure the data visualization components, which are rendered by the Telerik Data Insights Composer.
slug: datainsightscomposer-components
tags: telerik, blazor, data insights composer, AI
published: True
position: 50
components: ["datainsightscomposer"]
---

# Data Insights Composer Components

This article describes the data visualization components, which the DatAInsightsComposer renders, and how to configure them.

## Basics

Each user prompt can result in a single rendered component and its selection depends on the AI response:

* [ArcGauge](#arcgauge)
* [Chart](#chart)
* [Grid](#grid)
* [LinearGauge](#lineargauge)
* [RadialGauge](#Radialgauge)

The specific configuration of the data visuzalization component depends on the user prompt and the default DatAInsightsComposer logic. There are two ways to control the component settings and enabled features:

* Use the [`<DatAInsightsComposerComponentConfigSettings>`](#component-configuration-settings) child tag inside `<TelerikDatAInsightsComposer>`.
* Use the [`OnDataProcess` event](slug:datainsightscomposer-events#ondataprocess)

## Component Configuration Settings

The DatAInsightsComposer allows you to enforce specific visuzalization component settings in the component declaration.

## ArcGauge

...

## Chart

...

## Grid

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

## LinearGauge

...

## RadialGauge

...

## See Also

* [Data Insights Composer Overview](slug:datainsightscomposer-overview)
* [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
