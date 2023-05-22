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

The <a href="https://www.telerik.com/blazor-ui/pivotgrid" target="_blank">Blazor PivotGrid component</a>, also known as a pivot table, is a powerful data visualization, statistics and reporting tool that allows you to perform operations and analysis over multi-dimensional pivot data.


## Components

The PivotGrid is an integrated product that includes several Razor components:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Component | Description |
| --- | --- |
| `<TelerikPivotGrid>` | The **PivotGrid** displays the calculated measures. |
| `<TelerikPivotGridConfigurator>` | The **Configurator** enables end users to add or remove rows, columns and measures. |
| `<TelerikPivotGridConfiguratorButton>` | The **Button** toggles the visibility of the configurator. |
| `<TelerikPivotGridContainer>` | The **Container** wraps the above components. |

> * The Container is required when using a Configurator. The PivotGrid Container supports any order of the PivotGrid, Button and Configurator.
> * The `<TelerikPivotGridContainer>` is a standard Blazor `RenderFragment` and allows any `ChildContent`. Nevertheless, *do not* place any other custom components or markup inside it.


## Definitions

The PivotGrid component and this documentation use terms *row*, *column*, and *measure*. Each of these terms signifes one field in the data source:

* The *rows* and *columns* represent categories or date periods.
* The *distinct* values of a *row* field display in *rows headers*. The number of rendered rows will match the number of distinct values of the *row* field.
* The *distinct* values of a *column* field display in *column headers*. The number of rendered columns will match the number of distinct values of the *column* field.
* The *measures* usually represent numerical data. The *aggregated (calculated)* values of a *measure* display in the inner cells of the Pivot Grid. A *measure* is also known as *dimension* or *fact*.

The Telerik Blazor PivotGrid supports *filtering* for the values of the current row and column fields.


## Creating Blazor PivotGrid

1. Add a `<TelerikPivotGrid>` tag to a Razor file.
1. Set the `DataProviderType` parameter to a member of the `PivotGridDataProviderType` enum, according to your [data provider]({%slug pivotgrid-data-binding%}#data-provider-type). The example below uses `Local` flat data for simplicity. In this case, the PivotGrid also needs a `Data` parameter, which points to an `IEnumerable<TItem>`.
1. (optional) To show initial data, add at least one [row, column, and measure with a `Name` parameter](#parameters-for-rows-columns-and-measures) that points to a field name in the data.:
    * One `<PivotGridColumn>` instance inside the `<PivotGridColumns>` tag.
    * One `<PivotGridRow>` instance inside the `<PivotGridRows>` tag.
    * One `<PivotGridMeasure>` instance inside the `<PivotGridMeasures>` tag. Set a `Name` and `Aggregate`.
1. (optional) To give users more flexibility, add a Configurator and a toggle Button next to the `<TelerikPivotGrid>` tag:
    * Add a `<TelerikPivotGridConfigurator>`.
    * Add a `<TelerikPivotGridConfiguratorButton>`.
    * Wrap both tags and `<TelerikPivotGrid>` with a `<TelerikPivotGridContainer>`.

>caption PivotGrid with configurator and local data

````CSHTML
<TelerikPivotGridContainer>

    <TelerikPivotGridConfigurator Filterable="true"
                                 Sortable="true" />

    <TelerikPivotGridConfiguratorButton />

    <TelerikPivotGrid Data="@PivotData"
                      DataProviderType="@PivotGridDataProviderType.Local">
        <PivotGridColumns>
            <PivotGridColumn Name="@nameof(PivotModel.City)" />
        </PivotGridColumns>
        <PivotGridRows>
            <PivotGridRow Name="@nameof(PivotModel.Product)" />
        </PivotGridRows>
        <PivotGridMeasures>
            <PivotGridMeasure Name="@nameof(PivotModel.ContractValue)"
                              Aggregate="@PivotGridAggregate.Sum" />
        </PivotGridMeasures>
    </TelerikPivotGrid>

</TelerikPivotGridContainer>

@code {
    private List<PivotModel> PivotData { get; set; } = new List<PivotModel>();

    protected override void OnInitialized()
    {
        var dataItemCount = 100;
        var productCount = 5 + 1; // rnd.Next() does not include the max value 6
        var cityCount = 5 + 1;
        var rnd = new Random();

        for (int i = 1; i <= dataItemCount; i++)
        {
            PivotData.Add(new PivotModel()
            {
                Product = $"Product {rnd.Next(1, productCount)}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Now.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5)),
                ContractValue = rnd.Next(123, 987)
            });
        }

        base.OnInitialized();
    }

    public class PivotModel
    {
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## Data Binding

The PivotGrid component supports different [data binding options and data providers]({%slug pivotgrid-data-binding%}), for example local flat data and XML for Analytics (XMLA). It can load data on demand or perform all aggregate calculations in memory.


## Configurator

In the simpler case, the PivotGrid supports fixed configuraton of its rows, columns, and measures. However, most scenarios and users may require greater flexibility where one can [use the PivotGrid Configurator to change, filter and sort the displayed fields and aggregations]({%slug pivotgrid-configurator%}).


## Events

[The PivotGrid exposes a variety of events]({%slug pivotgrid-events%}) that help you react to user actions.


## PivotGrid Parameters

The tables below list the parameters of all components, which comprise the PivotGrid:

* [Grid](#grid-parameters)
    * [Rows, columns and measures](#row-column-and-measure-parameters)
* [Configurator](#configurator-parameters)
* [Button](#button-parameters)
* [Container](#container-parameters)

### Grid Parameters

The following table lists the `TelerikPivotGrid` parameters. Also check the [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1).

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `Data` | `IEnumerable<TItem>` |  |
| `DataProviderType` | `PivotGridDataProviderType` enum <br /> (`Local`) |  |
| `EnableLoaderContainer` | `bool` (`true`) | Defines if a built-in [LoaderContainer]({%slug loadercontainer-overview%}) will show during long-running operations (over 600ms). |
| `Height` | `string` | A `height` style in [any supported CSS unit]({%slug common-features/dimensions%}). |
| `LoadOnDemand` | `bool` <br /> (`true`) | Defines if the PivotGrid will request only the data to display in the current view, or all data. When loading on demand is disabled or when using the `Local` `DataProviderType`, the component performs all calculations in-memory. |
| `TItem` | `object` | The PivotGrid `@typeparam`. Required if the data item type cannot be inferred at compile-time. |
| `Width` | `string` | A `width` style in [any supported CSS unit]({%slug common-features/dimensions%}). |

### Row, Column and Measure Parameters

The following table lists parameters of the `PivotGridRow`, `PivotGridColumn` and `PivotGridMeasure` tags.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Aggregate` | `PivotGridAggregate` enum <br /> (`Sum`) | The nature of the calculated aggregate value. Applies to `PivotGridMeasure` only. |
| `Name` | `string` | The field name of the respective row, column or measure. |


### Configurator Parameters

The following table lists parameters of the `TelerikPivotGridConfigurator` component.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid-configurator">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `Fields` | `List<object>` | The collection of data fields that will appear in the Configurator TreeView. By default, the PivotGrid will populate this collection automatically, so set the parameter to provide more or less fields. |
| `Filterable` | `bool` | Determines if users can filter the row and column values from a dropdown menu on the Configurator chips. |
| `Sortable` | `bool` | Determines if users can sort the row and column values from a dropdown menu on the Configurator chips. |


### Button Parameters

The following table lists parameters of the `TelerikPivotGridConfiguratorButton` component.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid-configurator-button">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `Text` | `string` <br /> `"Change settings"` | The configurator button label. |


### Container Parameters

The following table lists parameters of the `TelerikPivotGridContainer` component.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the Container `<div>` element. Use it for [custom styling]({%slug themes-override%}). |


## PivotGrid Reference and Methods

The PivotGrid exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive. The PivotGrid methods are:

* `Rebind` - Processes the component `Data` and refreshes the UI.

>caption Obtain reference to the PivotGrid instance and execute methods

<div class="skip-repl"></div>

````CSHTML
<TelerikPivotGrid @ref="@PivotGridRef" />

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

* [Explore the PivotGrid data binding and data providers]({%slug pivotgrid-data-binding%})
* [Setup the PivotGrid configurator]({%slug pivotgrid-configurator%})
* [Handle PivotGrid events]({%slug pivotgrid-events%})


## See Also

* [Live PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid)
* [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1)
