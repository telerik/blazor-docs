---
title: Overview
page_title: PivotGrid Overview
description: Learn the basics and fundamentals of the Telerik UI for Blazor PivotGrid.
slug: pivotgrid-overview
tags: telerik,blazor,pivotgrid
published: True
position: 0
components: ["pivotgrid"]
---
# Blazor PivotGrid Overview

The <a href="https://www.telerik.com/blazor-ui/pivotgrid" target="_blank">Blazor PivotGrid component</a>, also known as a pivot table, is a powerful data visualization, statistics and reporting tool that allows you to perform operations and analysis over multi-dimensional pivot data. It can work with local data or a remote XMLA data such as an OLAP cube. The PivotGrid also supports filtering and sorting for the values of the row and column fields.


## Definitions

The PivotGrid component and this documentation use terms *row*, *column*, and *measure*. Each of these terms signifies one field in the data source:

* The *rows* and *columns* represent categories or date periods.
* The *distinct* values of a *row* field display in *rows headers*. The number of rendered rows will match the number of distinct values of the *row* field.
* The *distinct* values of a *column* field display in *column headers*. The number of rendered columns will match the number of distinct values of the *column* field.
* The *measures* usually represent numerical data. The *aggregated (calculated)* values of a *measure* display in the inner cells of the Pivot Grid. A *measure* is also known as *dimension*. On the other hand, a *fact* is a non-aggregated "raw" value on the data.


## Components

The PivotGrid is an integrated product that includes several Razor components:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Component | Description |
| --- | --- |
| `<TelerikPivotGrid>` | The **PivotGrid** displays the aggregate measures. |
| `<TelerikPivotGridConfigurator>` | The **Configurator** enables end users to add or remove rows, columns and measures. |
| `<TelerikPivotGridConfiguratorButton>` | The **Button** toggles the visibility of the configurator. |
| `<TelerikPivotGridContainer>` | The **Container** wraps the above components. |

> * The Container is required when using a Configurator.
> * The Container supports any order of the PivotGrid, Button and Configurator.
> * The `<TelerikPivotGridContainer>` is a standard Blazor `RenderFragment` and allows any `ChildContent`. Nevertheless, *do not* place any other custom components or markup inside it.


## Creating Blazor PivotGrid

1. Add a `<TelerikPivotGrid>` tag to a Razor file.
1. Set the `DataProviderType` parameter to a member of the `PivotGridDataProviderType` enum, according to your [data provider](slug:pivotgrid-data-binding#data-provider-type). The example below uses `Local` flat data for simplicity. In this case, the PivotGrid also needs a `Data` parameter, which points to an `IEnumerable<TItem>`.
1. (optional) To show initial data, add at least one [row, column, and measure with a `Name` parameter](#row-column-and-measure-parameters) that points to a field name in the data:
    * One `<PivotGridColumn>` instance inside the `<PivotGridColumns>` tag.
    * One `<PivotGridRow>` instance inside the `<PivotGridRows>` tag.
    * One `<PivotGridMeasure>` instance inside the `<PivotGridMeasures>` tag. Set a `Name` and `Aggregate`.
1. (optional) To give users more flexibility, add a Configurator and a toggle Button next to the `<TelerikPivotGrid>` tag:
    * Add a `<TelerikPivotGridConfigurator>`.
    * Add a `<TelerikPivotGridConfiguratorButton>`.
    * Wrap both tags and `<TelerikPivotGrid>` with a `<TelerikPivotGridContainer>`.

> The Telerik PivotGrid for Blazor [depends on two additional NuGet packages](slug:getting-started/what-you-need#nuget-packages). They are installed automatically when using the [Telerik NuGet feed](slug:installation/nuget) and must not be used separately with other custom or third-party tools.

>caption PivotGrid with configurator and local data

<div class="skip-repl"></div>

````RAZOR
<TelerikPivotGridContainer>

    <TelerikPivotGridConfigurator />

    <TelerikPivotGridConfiguratorButton />

    <TelerikPivotGrid Data="@PivotData"
                      DataProviderType="@PivotGridDataProviderType.Local">
        <PivotGridColumns>
            <PivotGridColumn Name="@nameof(PivotModel.City)" Title="City" />
        </PivotGridColumns>
        <PivotGridRows>
            <PivotGridRow Name="@nameof(PivotModel.Category)" Title="Category" />
            <PivotGridRow Name="@nameof(PivotModel.Product)" />
        </PivotGridRows>
        <PivotGridMeasures>
            <PivotGridMeasure Name="@nameof(PivotModel.ContractValue)"
                              Title="Contract Value"
                              Aggregate="@PivotGridAggregateType.Sum" />
        </PivotGridMeasures>
    </TelerikPivotGrid>

</TelerikPivotGridContainer>

@code {
    private List<PivotModel> PivotData { get; set; } = new List<PivotModel>();

    protected override void OnInitialized()
    {
        var dataItemCount = 100;
        var categoryCount = 3;
        var productCount = 5 + 1; // effectively 5, as rnd.Next() will never return 6
        var cityCount = 3 + 1; // effectively 3
        var rnd = new Random();

        for (int i = 1; i <= dataItemCount; i++)
        {
            var productNumber = rnd.Next(1, productCount);

            PivotData.Add(new PivotModel()
            {
                Category = $"Category {productNumber % categoryCount + 1}",
                Product = $"Product {productNumber}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Now.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5)),
                ContractValue = rnd.Next(123, 987)
            });
        }

        base.OnInitialized();
    }

    public class PivotModel
    {
        public string Category { get; set; } = null!;
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## Data Binding

The PivotGrid component supports different [data binding options and data providers](slug:pivotgrid-data-binding), for example local flat data and XML for Analytics (XMLA) with an OLAP cube. It can load data on demand or perform all aggregate calculations in memory.


## Configurator

In the simpler case, the PivotGrid supports fixed configuration of its rows, columns, and measures. However, most scenarios and users may require greater flexibility where one can [use the PivotGrid Configurator to change, filter and sort the displayed fields and aggregations](slug:pivotgrid-configurator).


## Templates

[The PivotGrid supports templates for its header and data cells](slug:pivotgrid-templates). The templates enable you to customize the cell content and appearance.


## PivotGrid Parameters

The tables below list the parameters of [all components, which comprise the PivotGrid](#components):

* [Grid](#grid-parameters)
    * [Rows, columns and measures](#row-column-and-measure-parameters)
* [Configurator](#configurator-parameters)
* [Button](#button-parameters)
* [Container](#container-parameters)

### Grid Parameters

The following table lists the `TelerikPivotGrid` parameters. Also check the [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1).

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid">` element. Use it to [override theme styles](slug:themes-override). |
| `ColumnHeadersWidth` | `string` | The width of each column in [any supported CSS unit](slug:common-features/dimensions). |
| `Data` | `IEnumerable<TItem>` | The Pivot Grid component data. Use only with [`Local` `DataProviderType`](slug:pivotgrid-data-binding#local). |
| `DataProviderType` | `PivotGridDataProviderType` enum <br /> (`Local`) | The [type of data source that the Pivot Grid will use](slug:pivotgrid-data-binding). |
| `EnableLoaderContainer` | `bool` (`true`) | Defines if a built-in [LoaderContainer](slug:loadercontainer-overview) will show during long-running operations (over 600ms). |
| `Height` | `string` | A `height` style in [any supported CSS unit](slug:common-features/dimensions). |
| `LoadOnDemand` | `bool` <br /> (`true`) | Defines if the PivotGrid will request only the data to display in the current view, or all data. When loading on demand is disabled or when using the `Local` `DataProviderType`, the component performs all calculations in-memory. In such cases, large amounts of data may impact the performance, especially in WebAssembly apps. |
| `RowHeadersWidth` | `string` | The width of all row headers in [any supported CSS unit](slug:common-features/dimensions). |
| `TItem` | `object` | The PivotGrid `@typeparam`. Required if the data item type cannot be inferred at compile-time. |
| `Width` | `string` | A `width` style in [any supported CSS unit](slug:common-features/dimensions). |

### Row, Column and Measure Parameters

The following table lists parameters of the `PivotGridRow`, `PivotGridColumn` and `PivotGridMeasure` tags.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Aggregate` | `PivotGridAggregateType` enum <br /> (`Sum`) | The nature of the calculated aggregate values. Applies to `PivotGridMeasure` only. |
| `Format` | `string` | The [display format](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) of the calculated aggregate values, for example `"{0:C2}"`. Applies to `PivotGridMeasure` only. |
| `HeaderClass` | `string` | Adds a custom CSS class to the respective row header, column header or measure. Use it to apply custom styles or [override the default PivotGrid styles](slug:themes-override). |
| `Name` | `string` | The field name of the respective row, column or measure. |
| `Title` | `string` | The label to be displayed in the Configurator for the respective row, column or measure. |


### Configurator Parameters

The following table lists parameters of the `TelerikPivotGridConfigurator` component.

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid-configurator">` element. Use it to [override theme styles](slug:themes-override). |
| `EnableLoaderContainer` | `bool` (`true`) | Defines if a built-in [LoaderContainer](slug:loadercontainer-overview) will show during long-running operations (over 600ms). |


### Button Parameters

The following table lists parameters of the `TelerikPivotGridConfiguratorButton` component.

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-pivotgrid-configurator-button">` element. Use it to [override theme styles](slug:themes-override). |


### Container Parameters

The following table lists parameters of the `TelerikPivotGridContainer` component.

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the Container `<div>` element. Use it for [custom styling](slug:themes-override). |


## PivotGrid Reference and Methods

The Pivot Grid exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive. The PivotGrid methods are:

| Method | Description |
| --- | --- |
| `Rebind` | Processes the component `Data` and refreshes the UI. See the [**Refresh Data** section in the common Data Binding article](slug:common-features-data-binding-overview#refresh-data) for details. |

>caption Obtain reference to the PivotGrid instance and execute methods

<div class="skip-repl"></div>

````RAZOR
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

    }
}
````


## Next Steps

* [Explore the PivotGrid data binding and data providers](slug:pivotgrid-data-binding)
* [Learn about the PivotGrid configurator](slug:pivotgrid-configurator)
* [Implement PivotGrid templates](slug:pivotgrid-templates)


## See Also

* [Live PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid/overview)
* [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1)
