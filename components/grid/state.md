---
title: State
page_title: Grid - State
description: Save, load, change the Grid for Blazor state - grouping, sorting, filtering and so on.
slug: grid-state
tags: telerik,blazor,grid,state,save,load,layout,set,change,management
published: True
position: 50
---

# Grid State

The Grid lets you read, save, load, and change its state through code. The state includes the Grid features that are controlled by the user, such as the current sorting, page number, applied grouping, column widths, and many others.

This article describes:

* [The properties of the `GridState` object](#information-in-the-grid-state).
* [How to set initial Grid configuration programmatically in `OnStateInit`](#onstateinit).
* [How to detect user changes in the Grid state with `OnStateChanged`](#onstatechanged).
* [How to use Grid methods to get and set the Grid state](#methods).
* [Why you may need to override the `Equals` method of the Grid model class](#equals-comparison).


## Information in the Grid State

The Grid state is a generic [class `GridState<TItem>`](slug:Telerik.Blazor.Components.GridState-1). The type depends on the type of the Grid model. The `GridState<TItem>` object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `CollapsedGroups` | `ICollection<int>` | The indexes of all collapsed [groups](slug:components/grid/features/grouping) when `LoadGroupsOnDemand="false"`, i.e. when not [loading groups on demand](slug:grid-group-lod). |
| `ColumnStates` | `ICollection<GridColumnState>` | Information about each [column's reorder index, width, visibility, locked state, `Id` parameter value and `Field`](slug:components/grid/columns/bound). The column order in the collection matches the column order in the Grid declaration. On the other hand, the `Index` property matches the current column's position in the UI. **`Id` and `Field` are always `null` after deserialization, because these properties have no public setters.** |
| `EditField` | `string` | The currently edited data item property in [`Incell` edit mode](slug:components/grid/editing/incell). |
| `EditItem` | `TItem`* | The currently edited data item in [any edit mode](slug:components/grid/editing/overview). |
| `ExpandedItems` | `ICollection<TItem>` | The expanded data items, when [using `<DetailTemplate>` (hierarchy)](slug:components/grid/features/hierarchy). |
| `FilterDescriptors` | `ICollection<IFilterDescriptor>` | A collection of [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering), except the ones that relate to the [`GridSearchBox`](slug:grid-searchbox). |
| `GroupDescriptors` | `ICollection<GroupDescriptor>` | Information about currently applied [grouping](slug:components/grid/features/grouping). |
| `InsertedItem` | `TItem`* | The data item that is being added in `Inline` or `Popup` edit mode. [Not applicable for `Incell` editing](slug:components/grid/editing/incell#event-sequence). |
| `OriginalEditItem` | `TItem`* | The original copy of the data item that is currently in edit mode. This `GridState` property holds the unmodified data item values. |
| `Page` | `int?` | The current [page index](slug:components/grid/features/paging). Some user actions reset the page index to 1, such as filtering or changing the page size. |
| `SearchFilter` | `IFilterDescriptor` | The [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering) that holds the filter descriptors for the [`GridSearchBox`](slug:grid-searchbox). |
| `SelectedItems` | `ICollection<TItem>` | The currently [selected data item(s)](slug:grid-selection-overview). |
| `Skip` | `int?` | The number of scrolled data items when using [virtual row scrolling](slug:components/grid/virtual-scrolling). In other words, this is the number of rows above the currently visible ones. |
| `SortDescriptors` | `ICollection<SortDescriptor>` | The currently applied [sorts](slug:components/grid/features/sorting). |
| `TableWidth` | `string` | The sum of all visible column widths. This property changes together with `ColumnStates`. The `OnStateChanged` event does not fire separately for it. |

\* `TItem` is the Grid model type.


## Events

The Grid features two events, which are related to its state.

* [OnStateInit](#onstateinit)
* [OnStateChanged](#onstatechanged)

### OnStateInit

The `OnStateInit` event fires when the Grid is initializing. Use this event to:

* Define initial state, for example default initial sorting;
* Load and apply state that was previously saved in a database or in `localStorage`.

The generic event argument is of type `GridStateEventArgs<TItem>` and has a `GridState` property. See [Information in the Grid State](#information-in-the-grid-state) for details.

> If you change the column order or number of columns in the Grid declaration, this can break state restore. In such cases, either ignore the stored column state, or implement custom logic to restore only the columns that still exist in the Grid.
>
> To set the initial visibility of columns, better use the `Visible` parameter, rather than conditional markup for the whole column. The `Visible` parameter values will be present in the Grid state and the columns collection count will remain the same. This makes it easier to reconcile changes.

The example below shows how to apply initial sorting, filtering and grouping.

>caption Using Grid OnStateInit

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Groupable="true"
             OnStateInit="@( (GridStateEventArgs<Product> args) => OnGridStateInit(args) )">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Category)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    private async Task OnGridStateInit(GridStateEventArgs<Product> args)
    {
        // Sort by Stock
        args.GridState.SortDescriptors.Add(new SortDescriptor()
        {
            Member = nameof(Product.Stock),
            SortDirection = ListSortDirection.Descending
        });

        // Filter Discontinued products
        var discontinuedColumnFilter = new CompositeFilterDescriptor()
        {
            FilterDescriptors = new FilterDescriptorCollection() {
                 new FilterDescriptor()
                 {
                    Member = nameof(Product.Discontinued),
                    MemberType = typeof(bool),
                    Operator = FilterOperator.IsEqualTo,
                    Value = false
                 }
             }
        };
        args.GridState.FilterDescriptors.Add(discontinuedColumnFilter);

        // Group by Category
        args.GridState.GroupDescriptors.Add(new GroupDescriptor()
        {
            Member = nameof(Product.Category),
            MemberType = typeof(string)
        });
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 12; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Category = $"Category {i % 2 + 1}",
                Stock = rnd.Next(0, 100),
                Discontinued = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Stock { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

### OnStateChanged

`OnStateChanged` fires when the user performs an action that changes the value of a [property in the Grid state](#information-in-the-grid-state). The event argument is of type `GridStateEventArgs<TItem>` and exposes these properties:

| Property | Type | Description |
| --- | --- | --- |
| `PropertyName` | `string` | Information about what changed in the Grid state. The possible values match the [property names of the `GridState` object](#information-in-the-grid-state). @[template](/_contentTemplates/grid/state.md#statechanged-possible-prop-values) |
| `GridState` | `GridState<TItem>` | The current (up-to-date) Grid state object. |

Here is some additional information about certain `PropertyName` values:

* `EditItem` is used when the user starts editing an existing item.
* `InsertedItem` signifies the user adding a new item in inline or popup edit mode. It's [not applicable for `Incell` editing](slug:components/grid/editing/incell#event-sequence).
* `OriginalEditItem` is used when the user exits edit or insert mode via save or cancel.
* `ColumnStates` is used for several column actions such as hiding, showing, locking, reordering and resizing.

>tip Some user actions will trigger two `OnStateChanged` events with a different `PropertyName` each time. These include filtering, searching and grouping. For example, filtering resets the current page to 1. First, the event will fire with `PropertyName` equal to `"FilterDescriptors"`, and then `PropertyName` will be `"Page"`. However, the `GridState` property of the event argument will provide correct information about the overall Grid state in both event handler executions.

> We recommend using an `async Task` handler for the `OnStateChanged` event, in order to reduce re-rendering and avoid blocking UI updates if the handler will wait for a service to save the Grid state somewhere.

To observe the changes in the Grid state more easily, copy and run the following example in a local app and at full screen.

Find out how to [get the applied filtering, sorting and grouping criteria](slug:common-features-descriptors).

>caption Using Grid OnStateChanged

````RAZOR
@using System.Text.Json

<div id="demo-container">
    <TelerikGrid Data="@GridData"
                 EditMode="@GridEditMode.Inline"
                 FilterMode="@GridFilterMode.FilterMenu"
                 Groupable="true"
                 Pageable="true"
                 @bind-PageSize="@GridPageSize"
                 Reorderable="true"
                 Resizable="true"
                 @bind-SelectedItems="@GridSelectedItems"
                 SelectionMode="@GridSelectionMode.Multiple"
                 ShowColumnMenu="true"
                 Sortable="true"
                 OnCreate="@OnGridCreate"
                 OnUpdate="@OnGridUpdate"
                 OnStateChanged="@( (GridStateEventArgs<Product> args) => OnGridStateChanged(args) )">
        <GridSettings>
            <GridPagerSettings PageSizes="@( new List<int?>() { null, 5, 10 } )" />
        </GridSettings>
        <GridToolBarTemplate>
            <GridCommandButton Command="Add">Add</GridCommandButton>
            <GridSearchBox />
        </GridToolBarTemplate>
        <GridColumns>
            <GridCheckboxColumn SelectAll="true" />
            <GridColumn Field="@nameof(Product.Name)" />
            <GridColumn Field="@nameof(Product.Category)" />
            <GridColumn Field="@nameof(Product.Stock)" />
            <GridColumn Field="@nameof(Product.Discontinued)" />
            <GridCommandColumn>
                <GridCommandButton Command="Edit">Edit</GridCommandButton>
                <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
                <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            </GridCommandColumn>
        </GridColumns>
        <DetailTemplate>
            Detail Template for product <strong>@context.Name</strong>.
        </DetailTemplate>
    </TelerikGrid>

    <div id="console">
        <code class="@GridStateChangedPropertyClass">OnStateChanged</code> count:
        @OnStateChangedCount
        <TelerikButton OnClick="@( () => OnStateChangedCount = 0 )">Reset</TelerikButton>
        <br /><br />
        Last <code>OnStateChanged</code> event:
        <br />
        <strong class="@GridStateChangedPropertyClass">PropertyName</strong>:
        <code>&quot;@GridStateChangedProperty&quot;</code>
        <br />
        <strong>GridState</strong>:
        <pre>
        @( new MarkupString(GridStateString) )
        </pre>
    </div>
</div>

<style>
    .first-of-two {
        color: #f00;
    }

    .latest-changed-property {
        color: #00f;
    }

    @@media (min-width: 800px) {
        #demo-container {
            display: flex;
            align-items: flex-start;
            gap: 1em;
        }

            #demo-container > .k-grid {
                flex: 2 2 800px;
            }

        #console {
            height: 90vh;
            overflow: auto;
            flex: 1 0 300px;
            border: 1px solid rgba(128, 128, 128, .3);
            padding: 1em;
        }
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private int GridPageSize { get; set; } = 5;

    private IEnumerable<Product> GridSelectedItems { get; set; } = new List<Product>();

    private int OnStateChangedCount { get; set; }

    private string GridStateChangedProperty { get; set; } = string.Empty;
    private string GridStateChangedPropertyClass { get; set; } = string.Empty;

    private string GridStateString { get; set; } = string.Empty;

    private bool _doubleStateChanged { get; set; }

    private List<string> _operationsWithMultipleStateChanged = new List<string>() {
        "FilterDescriptors",
        "GroupDescriptors",
        "SearchFilter"
    };

    private async Task OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        if (_doubleStateChanged)
        {
            _doubleStateChanged = false;
            await Task.Delay(1500);
            GridStateChangedPropertyClass = string.Empty;
        }

        ++OnStateChangedCount;

        GridStateChangedProperty = args.PropertyName;

        // serialize the GridState and highlight the changed property
        GridStateString = JsonSerializer.Serialize(args.GridState, new JsonSerializerOptions() { WriteIndented = true })
            .Replace($"\"{GridStateChangedProperty}\"", $"\"<strong class='latest-changed-property'>{GridStateChangedProperty}</strong>\"");

        // highlight first GridStateChangedProperty during filtering, grouping and search
        if (_operationsWithMultipleStateChanged.Contains(GridStateChangedProperty))
        {
            _doubleStateChanged = true;
            GridStateChangedPropertyClass = "first-of-two";
        }
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;
        var originalItemIndex = GridData.FindIndex(x => x.Id == updatedItem.Id);

        GridData[originalItemIndex] = updatedItem;
    }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        GridData.Insert(0, createdItem);
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 12; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Category = $"Category {i % 4 + 1}",
                Stock = rnd.Next(0, 100),
                Discontinued = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Stock { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Methods

The `GetState` and `SetStateAsync` methods of the [Grid instance](slug:grid-overview#blazor-grid-reference-and-methods) let you get and set the current Grid state on demand at any time *after* [`OnStateInit`](#onstateinit).

* `GetState` returns the current Grid state, so you can save it or [retrieve specific information](#information-in-the-grid-state). For example, you can [use `GetState` to get the current filters, sorts, and page number](slug:grid-kb-get-filtered-data). Or, you can [get the current Grid column properties like order index, width, and others)](slug:grid-kb-column-state).

* `SetStateAsync` receives an instance of a `GridState<TItem>` object and applies it to the Grid. For example, you can have a button that puts the Grid in a certain configuration programmatically, for example sort or filter the data, enter or exit edit mode, expand or collapse groups or detail Grids, etc.

If you want to make changes to the current Grid state:

1. First, get the current state with the `GetState` method.
1. Apply the desired modifications to the obtained `GridState` object.
1. Set the modified state object via the `SetStateAsync` method.

> Do not use `GetState()` in the [`OnStateInit`](#onstateinit) or [`OnStateChanged`](#onstatechanged) events. Do not use `SetStateAsync()` in `OnStateInit`. Instead, get or set the `GridState` property of the event argument.
>
> Avoid calling `SetStateAsync` in the Grid [CRUD methods](slug:components/grid/editing/overview) (such as [`OnRead`](slug:components/grid/manual-operations), `OnUpdate`, `OnEdit`, `OnCreate`, `OnCancel`). Doing so may lead to unexpected results because the Grid has more logic to execute after these events. Setting the Grid state fires `OnRead`, so calling `SetStateAsync()` in this handler can lead to an endless loop.

>tip To reset the Grid state to its initial markup configuration, call `SetStateAsync(null)`.
>
> To reset the Grid state to a completely new configuration, create a `new GridState<T>()` and apply the settings there. Then pass the state object to `SetStateAsync()`.


### SetStateAsync Examples

The tabs below show how to set the Grid state and control filtering, sorting and other Grid features.

@[template](/_contentTemplates/grid/state.md#initial-state)

<div class="skip-repl"></div>
````RAZOR Sorting
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````
````RAZOR FilterRow
@[template](/_contentTemplates/grid/state.md#filter-row-from-code)
````
````RAZOR FilterMenu
@[template](/_contentTemplates/grid/state.md#filter-menu-from-code)
````
````RAZOR Search
@[template](/_contentTemplates/grid/state.md#search-from-code)
````
````RAZOR Grouping
@[template](/_contentTemplates/grid/state.md#group-from-code)
````
````RAZOR Hierarchy
@[template](/_contentTemplates/grid/state.md#expand-hierarchy-from-code)
````
````RAZOR Columns
@[template](/_contentTemplates/grid/state.md#column-state-from-code)
````

@[template](/_contentTemplates/grid/state.md#filter-menu-default-filters)


## Equals Comparison

State properties that pertain to data items (for example, edited item or selected items) are typed according to the Grid model. If you restore such data, make sure to implement appropriate comparison checks - by default the [`.Equals()`](https://learn.microsoft.com/en-us/dotnet/api/system.object.equals) check for a class (object) is a reference check and the reference from the restored state is very unlikely to match the current reference in the Grid data. Thus, you may want to [override the `.Equals()` method of the Grid model class](slug:grid-kb-save-load-state-localstorage), so that it compares by ID, or otherwise re-populate the models in the state object with the new model references from the Grid data.


## Examples

You can find multiple examples for using the Grid state in the following [Knowledge Base articles](/knowledge-base):

* [Save and load the Grid state from `localStorage`](slug:grid-kb-save-load-state-localstorage)
* [Save the Grid state in a WebAssembly app](slug:grid-kb-save-state-in-webassembly)
* [Override a user action that changes the Grid state, for example, sort descending first](slug:grid-kb-sort-descending)
* [Initiate programmatic editing or inserting of a Grid row](slug:grid-kb-add-edit-state)
* [Get current Grid column state (order index, width, and others)](slug:grid-kb-column-state)


## See Also

* [Live Demo: Grid State](https://demos.telerik.com/blazor-ui/grid/persist-state)
* [GridState API reference](slug:Telerik.Blazor.Components.GridState-1)
* [Blazor Grid](slug:grid-overview)
