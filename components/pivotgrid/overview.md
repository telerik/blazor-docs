---
title: Overview
page_title: PivotGrid Overview
description: Learn the basics and fundamentals of the Telerik UI for Blazor PivotGrid.
slug: pivotgrid-overview
tags: telerik,blazor,pivotgrid
published: True
position: 0
---

# Blazor PivotGrid Overview

The <a href="https://www.telerik.com/blazor-ui/pivotgrid" target="_blank">Blazor PivotGrid component</a> is a powerful data visualization component that allows you to perform operations over multi-dimensional pivot data.


## Creating Blazor PivotGrid

1. Foo
1. Bar
1. (optional) Baz

>caption Basic PivotGrid Configuration

````CSHTML

@code {

}
````


## Feature

....


## Events

[The PivotGrid exposes a variety of events]({%slug pivotgrid-events%}) that help you react to user actions.


## PivotGrid Parameters

The following table lists the PivotGrid parameters. Also check the [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1) for a full list of parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `Width` | `string` | A `width` style in [any supported CSS unit]({%slug common-features/dimensions%}). |


## PivotGrid Reference and Methods

The PivotGrid exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive. The PivotGrid methods are:

* `Rebind` - Processes the component `Data` and refreshes the UI.

>caption Obtain reference to the PivotGrid instance and execute methods

````CSHTML

<TelerikButton OnClick="@OnButtonClick">Rebind PivotGrid</TelerikButton>

@code {
    private TelerikPivotGrid<PivotModel> PivotGridRef { get; set; } = null!;

    private void OnButtonClick()
    {
        PivotGridRef.Rebind();
    }

    public class PivotModel
    {
        public string Product { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## Next Steps

* [...]({%slug pivotgrid-events%})
* [...]({%slug pivotgrid-events%})
* [Handle PivotGrid events]({%slug pivotgrid-events%})


## See Also

* [Live PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid)
* [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1)
