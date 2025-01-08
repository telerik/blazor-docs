---
title: OnRead Event
page_title: Databind with the OnRead Event
description: How to data bind Telerik Blazor components with the OnRead event. How to load data on demand.
slug: common-features-data-binding-onread
tags: telerik,blazor,binding,databinding,onread
published: True
position: 5
---

# Databinding with the OnRead Event

This article presents the `OnRead` event and describes how to use it to data bind Telerik Blazor components.

* [Purpose and benefits of `OnRead`](#purpose-and-benefits)
* [Which Blazor components use `OnRead`](#components-with-onread-event)
* [Description of the `OnRead` event argument](#event-argument)
* [How to return data in `OnRead` with the `ToDataSourceResult` method](#todatasourceresult-method)
* [Example](#example)
* [How to refresh the component data when using `OnRead`](#refresh-data)


## Purpose and Benefits

The easiest way to provide data to a component is to set its `Data` parameter to `IEnumerable<T>`. This allows the component to have all data items and to perform all data operations internally (filtering, paging, sorting, etc.). However, this scenario is not always the most optimal.

There are two main reasons to use the `OnRead` event: **performance** and **customization**.

### Performance

Large amounts of data require loading in chunks and on demand. This improves the performance of the database, backend, network, and the browser. When a component fires `OnRead`, it expects to receive **only the data items to render**. The exact number depends on the component's `PageSize` parameter.

`OnRead` also offloads data operations outside the component, for example on the remote server. This can improve WebAssembly application performance.

### Customization

`OnRead` allows full control over the data operations. For example, it is possible to use custom sorting and filtering algorithms, if the built-in ones do not fit a given scenario. Here are just a few examples, but there are many more possible scenarios:

* [Search by multiple data fields in ComboBox and DropDownList](slug://dropdowns-kb-search-in-multiple-fields)
* [Search in hidden Grid columns](slug://grid-kb-search-in-hidden-fields)
* [Debounce Grid data requests](slug://grid-kb-debounce-operations)
* [Debounce ComboBox filter requests](slug://combo-kb-debounce-onread)

`OnRead` enables [data binding to **OData** services](slug://common-kb-odata).

`OnRead` also allows the application to know the exact data items, which the user is currently seeing.


## Components with OnRead Event

The following Blazor components expose an `OnRead` event. To gain **performance** benefits, use the event together with **paging** or **virtualization** (also called virtual scrolling).

Each component name points to component-specific `OnRead` documentation and examples:

| Component | Supports Paging | Supports Virtualization |
| --- | --- | --- |
| [AutoComplete](slug://autocomplete-events#onread) | - | [AutoComplete virtualization](slug://autocomplete-virtualization) |
| [ComboBox](slug://components/combobox/events#onread) | - | [ComboBox virtualization](slug://combobox-virtualization) |
| [DropDownList](slug://components/dropdownlist/events#onread) | - | [DropDownList virtualization](slug://dropdownlist-virtualization) |
| [Grid](slug://components/grid/manual-operations) | [Grid paging](slug://components/grid/features/paging) | [Grid row virtualization](slug://components/grid/virtual-scrolling) |
| [ListView](slug://listview-manual-operations) | [ListView paging](slug://listview-paging) | - |
| [MultiColumnComboBox](slug://multicolumncombobox-events#onread) | - | [MultiColumnComboBox virtualization](slug://multicolumncombobox-virtualization) |
| [MultiSelect](slug://multiselect-events#onread) | - | [MultiSelect virtualization](slug://multiselect-virtualization) |

Components like the [**TreeList**](slug://treelist-data-binding-load-on-demand) and the [**TreeView**](slug://components/treeview/data-binding/load-on-demand) don't have an `OnRead` event. Instead, they load data on demand via `OnExpand` events.


## Event Argument

The `OnRead` event handler receives an argument, which inherits from [`ReadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.ReadEventArgs). The exact type depends on the component. For example, the Grid handler receives `GridReadEventArgs`. The ComboBox handler receives `ComboBoxReadEventArgs`, and so on.

The following properties of the event argument object are common for all [components with an `OnRead` event](#components-with-onread-event). Other properties are discussed in component-specific articles.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Request` | [`DataSourceRequest`](/blazor-ui/api/Telerik.DataSource.DataSourceRequest) | This object carries information about the requested data items. It will reveal the page index or virtual scroll offset, the sorting and filtering state, etc. |
| `Data` | `IEnumerable` | Set it to the **chunk** of data items, which the component will **render**. |
| `Total` | `int` | Set it to the **total number** of items. This value will help the component generate its **pager** or **virtual scrollbar** correctly. |

>caption Using DataSourceRequest properties

<div class="skip-repl"></div>

````CS
async Task GridReadHandler(GridReadEventArgs args)
{
    // What is the new page?
    // args.Request.Page

    // What is the page size (how many items to return)?
    // args.Request.PageSize

    // How many rows the user has scrolled in virtual scenarios?
    // args.Request.Skip
}
````

>tip The [`DataSourceRequest` object can be serialized and sent to the remote server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server). **Use the `System.Text.Json` serializer**.


## ToDataSourceResult Method

The [`DataSourceRequest` object](/blazor-ui/api/Telerik.DataSource.DataSourceRequest) provides information about the needed data. The question is how to retrieve this data most easily. Sometimes `OnRead` data binding is called "manual", but in most cases it doesn't have to be manual at all. The solution is **`ToDataSourceResult`**.

The `ToDataSourceResult` extension method is able to extract the requested data items from `IEnumerable`, `IQueryable` and `DataTable`. The method is part of the [Telerik.DataSource.Extensions](/blazor-ui/api/Telerik.DataSource.Extensions) namespace. It expects a `DataSourceRequest` argument.

`ToDataSourceResult` returns a [`DataSourceResult` object](/blazor-ui/api/Telerik.DataSource.DataSourceResult). Its most important properties are:

| Property | Type | Description |
| --- | --- | --- |
| `Data` | `IEnumerable` | The chunk (page) of data items to render. All data operations are already applied (sorting, filtering, etc.) |
| `Total` | `int` | The total number of items in the datasource. |

The `Data` and `Total` properties of the `DataSourceRequest` and `DataSourceResult` match, and allow easy value assignment:

>caption Using ToDataSourceResult

<div class="skip-repl"></div>

````CS
using Telerik.DataSource.Extensions;

private IEnumerable<GridModel> AllGridData { get; set; }

private async Task GridReadHandler(GridReadEventArgs args)
{
    DataSourceResult result = AllGridData.ToDataSourceResult(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults; // Grid only
}
````

**`ToDataSourceResultAsync`** is the awaitable (asynchronous) alternative of `ToDataSourceResult`.

>tip It is possible to use `DataSourceRequest`, `ToDataSourceResult` and `ToDataSourceResultAsync` in scenarios, which are not related to a specific Telerik component.


## Example

Let's imagine that our datasource contains 1,000 items, and we want to send only one page of items to a Grid.

1. Import the `Telerik.DataSource.Extensions` namespace.
1. Set the Grid's `TItem` parameter to the model type. (Some components require a `TValue` parameter to define the value type, but not the Grid. Use `TValue` with the AutoComplete, ComboBox, DropDownList, and MultiSelect.)
1. Subscribe to the `OnRead` event. [**Use `async Task` and not `async void`**](https://docs.microsoft.com/en-us/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming#avoid-async-void). The event handler receives a `GridReadEventArgs` argument. Let's name it `args`.
1. Use `args.Request` and `ToDataSourceResult()` to get one page of Grid data. The data may be filtered and sorted, based on the user's actions.
1. Set `args.Data` to the data items to render.
1. Set `args.Total` to the total number of data items (1000).

>caption Using the OnRead event

````RAZOR
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@SampleModel"
             OnRead="@OnGridRead"
             AutoGenerateColumns="true"
             Sortable="true"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Height="400px" />

<p> OnGridRead fired at: @LastOnRead </p>

@code {
    private List<SampleModel> GridData { get; set; }

    private string LastOnRead { get; set; }

    // always use async Task, and not async void
    private async Task OnGridRead(GridReadEventArgs args)
    {
        var result = GridData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;

        var now = DateTime.Now;
        LastOnRead = now.ToLongTimeString() + "." + now.Millisecond;
    }

    protected override void OnInitialized()
    {
        GenerateData();

        base.OnInitialized();
    }

    private void GenerateData()
    {
        GridData = new List<SampleModel>();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new SampleModel() { Id = i, Text = $"Grid Text {i}" });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````


## Refresh Data

The components fire an `OnRead` event when the user performs an action, such as paging, sorting, virtual scrolling, etc. Calling the `OnRead` handler manually will not have effect, because the component will not be tracking the method arguments.

All components with an `OnRead` event have a `Rebind` method as well. To refresh the component data programmatically, call this method. It will force the component to fire `OnRead` and receive new data.

Also check [how to rebind and refresh a component with a `Timer`](slug://common-kb-rebind-timer).

>caption Rebind DropDownList and Grid when using OnRead

````RAZOR
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

<br />
<br />

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

    int ItemCounter { get; set; } = 3;

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

        for (int i = 1; i <= ItemCounter; i++)
        {
            GridData.Add(new SampleModel() { Id = i, Text = $"Text {rnd.Next(1, 100)}" });
            DropDownData.Add(new SampleModel() { Id = i, Text = $"Text {rnd.Next(1, 100)}" });
        }

        ItemCounter++;
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Using the Grid with OnRead](slug://components/grid/manual-operations)
* [Data Binding to cloud services](slug://common-features-data-binding-cloud)
