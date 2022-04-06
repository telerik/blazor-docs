---
title: OnRead Event
page_title: Databind using the OnRead Event
description: How to data bind Telerik Blazor components with the OnRead event. How to load data on demand.
slug: common-features-data-binding-onread
tags: telerik,blazor,binding,databinding,onread
published: True
position: 5
---

# Databinding with the OnRead Event

This article presents the `OnRead` event and describes how to use it to data bind Telerik Blazor components.

#### In this article:

* [Purpose and benefits of `OnRead`](#purpose-and-benefits)
* [Step-by-step instructions to get started](#getting-started)
* [Which Blazor components use `OnRead`](#components-with-onread-event)
* [Description of the `OnRead` event argument](#event-argument)
* [How to get data with the `ToDataSourceResult` method](#todatasourceresult-method)
* [How to refresh component data when using `OnRead`](#refresh-data)


## Purpose and Benefits

The easiest way to provide data to a component is to set its `Data` parameter to some `IEnumerable`. This is straight-forward and familiar, but not scalable.

Large amounts of data require loading in chunks and on demand. This improves the performance of the database, the backend, the network and the browser.

<!-- 
### Comparison with the Data Parameter

Benefits of `Data`

* Simplicity
* The component performs all data operations internally (paging, sorting, filtering, grouping, aggregates, etc.).

Benefits of `OnRead`

* Flexibility and customization
* The component relies on the application for all data operations.

>warning Do not use the `OnRead` and `Data` together with the same component instance. This was possible only [before UI for Blazor version 3.0]({%slug changes-in-3-0-0%}#onread).

-->

## Getting Started

1. Import the `Telerik.DataSource.Extensions` namespace.
1. Set the component's `TItem` parameter to the model type.
1. Set the component's `TValue` parameter to the value type. Does not apply to the Grid and ListView.
1. Subscribe to the `OnRead` event.
1. In the event handler, set the `Data` property of the event argument to the data items to render.
1. Set the `Total` property of the event argument to the total number of data items.

More information about [`args.Request`](#event-argument) and [`ToDataSourceResult`](#todatasourceresult-method) is available below.

>caption Using the OnRead event

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@SampleModel"
             OnRead="@OnGridRead"
             AutoGenerateColumns="true"
             Sortable="true"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow" />

@code {
    List<SampleModel> GridData { get; set; }

    async Task OnGridRead(GridReadEventArgs args)
    {
        var result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnInitialized()
    {
        GenerateData();

        base.OnInitialized();
    }

    void GenerateData()
    {
        GridData = new List<SampleModel>();

        var rnd = new Random();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new SampleModel() { Id = i, Text = $"Text {rnd.Next(1, 100)}" });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````


## Components with OnRead Event

The following Telerik Blazor components expose an `OnRead` event. All of them also feature virtualization, except the ListView, because it always relies on custom templates for data visualization.

Each link points to component-specific `OnRead` documentation and examples:

* [AutoComplete]({%slug autocomplete-events%}#onread)
* [ComboBox]({%slug components/combobox/events%}#onread)
* [DropDownList]({%slug components/dropdownlist/events%}#onread)
* [Grid]({%slug components/grid/manual-operations%})
* [ListView]({%slug listview-manual-operations%})
* [MultiSelect]({%slug multiselect-events%}#onread)

Components like the [**TreeList**]({%slug treelist-data-binding-load-on-demand%}) and the [**TreeView**]({%slug components/treeview/data-binding/load-on-demand%}) don't have an `OnRead` event. Instead they can load data on demand via `OnExpand` events.


## Event Argument

The `OnRead` event handler will receive an argument, which inherits from [`ReadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.ReadEventArgs). The event argument object has the following properties:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Property Name | Type | Description |
| --- | --- | --- |
| `Request` | `DataSourceRequest` | This is the [`DataSourceRequest` object](/blazor-ui/api/Telerik.DataSource.DataSourceRequest), which carries information about the requested data items. It will reveal the page index or virtual scroll offset, the sorting and filtering state, etc. |
| `Data` | `IEnumerable` | Set it to the **chunk** of data items, which the component will **render**. |
| `Total` | `int` | Set it to the **total number** of items. This value will help the component generate its **pager** or **virtual scrollbar** correctly. |
| `AggregateResults` | `IEnumerable<AggregateResult>` | This property is used only by the **Grid** and exists in the [`GridReadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.GridReadEventArgs) type. Set it to [aggregate values](/blazor-ui/api/Telerik.DataSource.AggregateResult) for the whole data. |

>tip The [`DataSourceRequest` object can be serialized and sent to the remote server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server). **Use the `System.Text.Json` serializer**.


## ToDataSourceResult Method

The `DataSourceRequest` object provides information about the needed data. The question is how to retrieve this data most easily. Sometimes `OnRead` data binding is called "manual", but in most cases it doesn't have to be manual at all.

The `ToDataSourceResult` extension method is able to extract the requested data items from `IEnumerable`, `IQueryable` and `DataTable`. The method is part of the [Telerik DataSource Extensions](/blazor-ui/api/Telerik.DataSource.Extensions.QueryableExtensions). It expects a `DataSourceRequest` argument.

**`ToDataSourceResultAsync`** is the awaitable (asynchronous) alternative of `ToDataSourceResult`.

>tip It is possible to use `DataSourceRequest`, `ToDataSourceResult` and `ToDataSourceResultAsync` in scenarios, which are not related to a specific Telerik component.


## Refresh Data

The components fire an `OnRead` event when the user performs an action, such as paging, sorting, virtual scrolling, etc. Calling the `OnRead` handler manually will not have effect, because the component will not be tracking the method arguments.

All components with an `OnRead` event have a `Rebind` method as well. To refresh the component data programmatically, call this method. It will force the component to fire `OnRead` and receive new data.

>caption Rebind DropDownList and Grid via OnRead

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikDropDownList @ref="@TheDropDown"
                     TItem="@SampleModel"
                     TValue="@int"
                     OnRead="@OnDropDownRead"
                     @bind-Value="@DropDownValue"
                     ValueField="@nameof(SampleModel.Id)"
                     TextField="@nameof(SampleModel.Text)"
                     Width="200px">
    <ValueTemplate>
        @context.Id : @context.Text
    </ValueTemplate>
    <ItemTemplate>
        @context.Id : @context.Text
    </ItemTemplate>
</TelerikDropDownList>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@RebindComponents">Rebind Components</TelerikButton>

<br /><br />

<TelerikGrid @ref="@TheGrid"
             TItem="@SampleModel"
             OnRead="@OnGridRead"
             AutoGenerateColumns="true"
             Sortable="true"
             Pageable="true"
             PageSize="5" />

@code {
    TelerikGrid<SampleModel> TheGrid { get; set; }
    TelerikDropDownList<SampleModel, int> TheDropDown { get; set; }

    List<SampleModel> GridData { get; set; }
    List<SampleModel> DropDownData { get; set; }

    int DropDownValue { get; set; } = 1;

    void RebindComponents()
    {
        GenerateData(); // simulate change in the data

        TheGrid.Rebind();
        TheDropDown.Rebind();
    }

    async Task OnGridRead(GridReadEventArgs args)
    {
        var result = GridData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    async Task OnDropDownRead(DropDownListReadEventArgs args)
    {
        var result = DropDownData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnInitialized()
    {
        GenerateData();

        base.OnInitialized();
    }

    void GenerateData()
    {
        GridData = new List<SampleModel>();
        DropDownData = new List<SampleModel>();

        var rnd = new Random();

        for (int i = 1; i <= 10; i++)
        {
            GridData.Add(new SampleModel() { Id = i, Text = $"Text {rnd.Next(1, 100)}" });
            DropDownData.Add(new SampleModel() { Id = i, Text = $"Text {rnd.Next(1, 100)}" });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Using the Grid with OnRead]({%slug components/grid/manual-operations%})
