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

The Grid lets you save, load and change its state through code. The state includes the Grid features that are *controlled by the user*, such as the current sorting, page number, applied grouping, column widths, and many others.

The Grid state is a generic class `GridState<TItem>`. The type depends on the type of the Grid model.


## Information in the Grid State

The `GridState<TItem>` object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `CollapsedGroups` | `ICollection<int>` | The indexes of all collapsed [groups]({%slug components/grid/features/grouping%}) when `LoadGroupsOnDemand="false"`, i.e. when *not* [loading groups on demand]({%slug grid-group-lod%}). |
| `ColumnStates` | `ICollection<GridColumnState>` | Information about each [column's reorder index, width, visibility, locked state, `Id` parameter value and `Field`]({%slug components/grid/columns/bound%}). The column order in the collection matches the column order in the Grid declaration. On the other hand, the `Index` property matches the current column's position in the UI. **`Id` and `Field` are always `null` after deserialization, because these properties have no public setters.** |
| `EditField` | `string` | The currently edited data item property in [`Incell` edit mode]({%slug components/grid/editing/incell%}). |
| `EditItem` | `TItem`* | The currently edited data item in [any edit mode]({%slug components/grid/editing/overview%}). |
| `ExpandedItems` | `ICollection<TItem>` | The expanded data items, when [using `<DetailTemplate>` (hierarchy)]({%slug components/grid/features/hierarchy%}). |
| `FilterDescriptors` | `ICollection<IFilterDescriptor>` | All filtering criteria, except the ones that relate to the[`GridSearchBox`]({%slug grid-searchbox%}). |
| `GroupDescriptors` | `ICollection<GroupDescriptor>` | Information about currently applied [grouping]({%slug components/grid/features/grouping%}). |
| `InsertedItem` | `TItem`* | The data item that is being added in `Inline` or `Popup` edit mode. |
| `OriginalEditItem` | `TItem`* | The original copy of the data item that is currently in edit mode. This `GridState` property holds the unmodified data item values. |
| `Page` | `int?` | The current [page index]({%slug components/grid/features/paging%}). Some user actions reset the page index to 1, such as filtering or changing the page size. |
| `SearchFilter` | `IFilterDescriptor` | The `CompositeFilterDescriptor` that holds the filter descriptors for the [`GridSearchBox`]({%slug grid-searchbox%}). |
| `SelectedItems` | `ICollection<TItem>` | The currently [selected data item(s)]({%slug components/grid/selection/overview%}). |
| `Skip` | `int?` | The number of scrolled data items when using [virtual row scrolling]({%slug components/grid/virtual-scrolling%}). In other words, this is the number of rows above the currently visible ones. |
| `SortDescriptors` | `ICollection<SortDescriptor>` | The currently applied [sorts]({%slug components/grid/features/sorting%}). |
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

The generic event argument is of type `GridStateEventArgs<TItem>`. It has one important property and that is `GridState`. See [Information in the Grid State](#information-in-the-grid-state) for details about its members.

> If you change the column order or number of columns in the application code, this can break state restore. In such cases, either ignore the stored column state, or implement custom logic to restore only the columns that still exist in the Grid.
>
> To set the initial visibility of columns, better use the `Visible` parameter, rather than conditional markup. The `Visible` parameter values will be present in the Grid state and the columns collection count will remain the same. This makes it easier to reconcile changes.

The example below shows how to apply initial sorting, filtering and grouping.

>caption Using Grid OnStateInit

````CSHTML
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

* `EditItem` is used when the user *starts editing an existing item*.
* `InsertedItem` signifies the user *adding a new item* in *inline or popup* edit mode.
* `OriginalEditItem` is used when the user *exits edit or insert mode* via save or cancel.
* `ColumnStates` is used for several column actions such as *hiding, showing, locking, reordering and resizing*.

>tip Some user actions will trigger two `OnStateChanged` events with a different `PropertyName` each time. These include filtering, searching and grouping. For example, filtering resets the current page to 1. First, the event will fire with `PropertyName` equal to `"FilterDescriptors"`, and then `PropertyName` will be `"Page"`. However, the `GridState` property of the event argument will provide correct information about the overall Grid state in both event handler executions.

> We recommend using an **`async Task`** handler for the `OnStateChanged` event, in order to reduce re-rendering and avoid blocking UI updates if the handler will wait for a service to save the Grid state somewhere.

>caption Using Grid OnStateChanged

````CSHTML
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

        var operationsWithMultipleStateChanged = new List<string>() {
            "FilterDescriptors",
            "GroupDescriptors",
            "SearchFilter"
        };

        // highlight first GridStateChangedProperty during filtering, grouping and search
        if (operationsWithMultipleStateChanged.Contains(GridStateChangedProperty))
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
        public string Name { get; set; } = default!;
        public string Category { get; set; } = default!;
        public int Stock { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Methods

The `GetState` and `SetStateAsync` methods of the [Grid instance]({%slug grid-overview%}#grid-reference-and-methods) let you get and set the current Grid state on demand at any time *after* [`OnStateInit`](#onstateinit).

* `GetState` returns the current Grid state, so you can save it or retrieve specific information. You can also use this method to get information about the current data state (filters, sorts, page number, etc.) if you are [binding the Grid via `Data` parameter]({%slug common-features-data-binding-overview%}) and not via [`OnRead` event]({%slug common-features-data-binding-onread%}).

* `SetStateAsync` receives an instance of a `GridState<TItem>` object and applies it to the Grid. For example, you can have a button that puts the Grid in a certain configuration programmatically, for example sort or filter the data, enter or exit edit mode, expand or collapse groups or detail Grids, etc.

If you want to make changes to the current Grid state:

1. First, get the current state with the `GetState` method.
1. Apply the desired modifications to the obtained `GridState` object.
1. Set the modified state object via the `SetStateAsync` method.

> Do not use `GetState()` and `SetStateAsync()` in the [`OnStateInit` event](#onstateinit). Instead, get or set the `GridState` property of the `OnStateInit` event argument.

If you want to put the Grid in a certain configuration without preserving the old one, create a `new GridState<T>()` and apply the settings there. Then pass the state object to `SetStateAsync()`.

To reset the Grid state to its initial markup configuration, call `SetStateAsync(null)`.

Avoid calling `SetStateAsync` in the Grid [CRUD methods]({%slug components/grid/editing/overview%}) (such as [OnRead]({%slug components/grid/manual-operations%}), `OnUpdate`, `OnEdit`, `OnCreate`, `OnCancel`). Doing so may lead to unexpected results because the Grid has more logic to execute after these events. Setting the Grid state fires `OnRead`, so calling `SetStateAsync()` in this handler can lead to an endless loop.

### SetStateAsync Examples

The tabs below show how to set the Grid state and control filtering, sorting and other Grid features.

@[template](/_contentTemplates/grid/state.md#initial-state)

<div class="skip-repl"></div>
````Sorting
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````
````FilterRow
@[template](/_contentTemplates/grid/state.md#filter-row-from-code)
````
````FilterMenu
@[template](/_contentTemplates/grid/state.md#filter-menu-from-code)
````
````Grouping
@[template](/_contentTemplates/grid/state.md#group-from-code)
````
````Hierarchy
@[template](/_contentTemplates/grid/state.md#expand-hierarchy-from-code)
````
````Columns
@[template](/_contentTemplates/grid/state.md#column-state-from-code)
````

@[template](/_contentTemplates/grid/state.md#filter-menu-default-filters)


## Equals Comparison

State properties that pertain to data items (for example, edited item or selected items) are typed according to the Grid model. If you restore such data, make sure to implement appropriate comparison checks - by default the `.Equals()` check for a class (object) is a *reference check* and the reference from the restored state is very unlikely to match the current reference in the Grid data. Thus, you may want to [override the `.Equals()` method of the Grid model class](#save-and-load-grid-state-from-browser-localstorage), so that it compares by ID, or otherwise re-populate the models in the state object with the new model references from the Grid data.


## Examples

You can find the following examples in this section:

* [Save and Load Grid State from Browser LocalStorage](#save-and-load-grid-state-from-browser-localstorage)
* [Get and Override User Action That Changes The Grid](#get-and-override-user-action-that-changes-the-grid)
* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

### Save and Load Grid State from Browser LocalStorage

The following example shows one way you can store the Grid state - through a custom service that calls the browser's LocalStorage. You can use your own database here, or a file, or Microsoft's ProtectedBrowserStorage package, or any other storage you prefer. This is just an example you can use as base and modify to suit your project.

The example below [overrides the `Equals` method](#equals-comparison) of the `SampleData` class, so that the application code can compare data items correctly.

> We support the `System.Text.Json` serialization that is built-in in Blazor. Be aware of its [limitation to not serialize `Type` properties]({%slug kb-grid-json-serializer-null-membertype%}).

>caption Save, Load, Reset Grid state on every state change. Uses a sample LocalStorage in the browser.

<div class="skip-repl"></div>
````Component
@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop
Change something in the Grid (like sort, filter, select, page, resize columns, etc.), then reload the page to see the Grid state fetched from the browser local storage.
<br />

<TelerikButton OnClick="@ReloadPage">Reload the page to see the current Grid state preserved</TelerikButton>
<TelerikButton OnClick="@ResetState">Reset the state</TelerikButton>

<TelerikGrid Data="@GridData" Height="500px" @ref="@Grid"
             Groupable="true"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Reorderable="true"
             Resizable="true"
             SelectionMode="GridSelectionMode.Multiple" @bind-SelectedItems="@SelectedItems"
             OnUpdate=@UpdateItem OnDelete=@DeleteItem OnCreate=@CreateItem EditMode="@GridEditMode.Inline"
             OnStateInit="@((GridStateEventArgs<SampleData> args) => OnStateInitHandler(args))"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => OnStateChangedHandler(args))">
    <DetailTemplate>
        @{
            var employee = context as SampleData;
            <TelerikGrid Data="employee.Assignments" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="AssignmentId" Title="Assignment Id"></GridColumn>
                    <GridColumn Field="AssignmentTitle" Title="Assignment Title"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Editable="false" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@FontIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@FontIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@FontIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@FontIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
</TelerikGrid>

@if (SelectedItems != null)
{
    <ul>
        @foreach (SampleData employee in SelectedItems)
        {
            <li>
                @employee.Id
            </li>
        }
    </ul>
}

@code {
    // Load and Save the state through the Grid events

    string UniqueStorageKey = "SampleGridStateStorageThatShouldBeUnique";
    TelerikGrid<SampleData> Grid { get; set; }
    IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();
    List<SampleData> GridData { get; set; }

    async Task OnStateInitHandler(GridStateEventArgs<SampleData> args)
    {
        try
        {
            var state = await LocalStorage.GetItem<GridState<SampleData>>(UniqueStorageKey);
            if (state != null)
            {
                args.GridState = state;
            }

        }
        catch (InvalidOperationException e)
        {
            // the JS Interop for the local storage cannot be used during pre-rendering
            // so the code above will throw. Once the app initializes, it will work fine
        }
    }

    async void OnStateChangedHandler(GridStateEventArgs<SampleData> args)
    {
        await LocalStorage.SetItem(UniqueStorageKey, args.GridState);
    }

    async Task ResetState()
    {
        // clean up the storage
        await LocalStorage.RemoveItem(UniqueStorageKey);

        await Grid.SetStateAsync(null); // pass null to reset the state
    }

    void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    // Sample CRUD operations

    async Task UpdateItem(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Update event is fired.");
    }

    async Task DeleteItem(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Delete event is fired.");
    }

    async Task CreateItem(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Create event is fired.");
    }

    // Note the Equals override for restoring selection and editing

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public List<Assignment> Assignments { get; set; }


        // example of comparing stored items (from editing or selection)
        // with items from the current data source - IDs are used instead of the default references
        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.Id == (obj as SampleData).Id;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }

    public class Assignment
    {
        public int AssignmentId { get; set; }
        public string AssignmentTitle { get; set; }
    }

    async Task GetGridData()
    {
        GridData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.Id = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    SampleData employee = new SampleData { Id = i, Name = $"Name {i}", Team = "team " + i % 5 };

                    employee.Assignments = Enumerable.Range(1, 15).Select(x => new Assignment { AssignmentId = x, AssignmentTitle = "Assignment " + x }).ToList();

                    _data.Add(employee);
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````
````Service
using Microsoft.JSInterop;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Telerik.DataSource;

public class LocalStorage
{
    protected IJSRuntime JSRuntimeInstance { get; set; }

    public LocalStorage(IJSRuntime jsRuntime)
    {
        JSRuntimeInstance = jsRuntime;
    }

    public ValueTask SetItem(string key, object data)
    {
        return JSRuntimeInstance.InvokeVoidAsync(
            "localStorage.setItem",
            new object[] {
                key,
                JsonSerializer.Serialize(data)
            });
    }

    public async Task<T> GetItem<T>(string key)
    {
        var data = await JSRuntimeInstance.InvokeAsync<string>("localStorage.getItem", key);
        if (!string.IsNullOrEmpty(data))
        {
            return JsonSerializer.Deserialize<T>(data);
        }

        return default;
    }

    public ValueTask RemoveItem(string key)
    {
        return JSRuntimeInstance.InvokeVoidAsync("localStorage.removeItem", key);
    }
}
````

### Save and Load Grid State in a WebAssembly application

The [knowledge base article for saving the Grid state in a WASM application]({%slug grid-kb-save-state-in-webassembly%}) explains two ways of storing the `Grid` state - through a custom controller and a custom service that calls the browser's LocalStorage.


### Get and Override User Action That Changes The Grid

Sometimes you may want to know what the user changed in the Grid (e.g., when they filter, sort and so on) and even override those operations. One way to do that is to monitor the [`OnRead` event]({%slug common-features-data-binding-onread%}), cache the previous [`DataSourceRequest` argument]({%slug common-features-data-binding-onread%}#event-argument), compare against it, alter it if needed, and implement the operations yourself. Another is to use the `OnStateChanged` event.

The example below shows the latter. Review the code comments to see how it works and to make sure you don't get issues. You can find another example of overriding the user actions in the [Static Grid Group]({%slug grid-kb-static-group%}) Knowledge Base article.

>caption Know when the Grid state changes, which parameter changes, and amend the change

````CSHTML
@* This example does the following:
    * Logs to the console what changed in the grid
    * If the user changes the Name column filtering, the filter is always overriden to "Contains" and its value to "name 1"
    * if there is no filter on the ID column, the ID column is filtered with ID < 15.
To test it out, try filtering the name column
*@

@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             @ref="GridRef"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             AutoGenerateColumns="true"
             Pageable="true"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => OnStateChangedHandler(args))">
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> GridRef { get; set; }

    // Note: This can cause a performance delay if you do long operations here
    // Note 2: The Grid does not await this event, its purpose is to notify you of changes
    //         so you must not perform async operations and data loading here, or issues with the Grid state may occur
    //         or other things you change on the page won't actually change. The .SetStateAsync() call redraws only the grid, but not the rest of the page
    private async Task OnStateChangedHandler(GridStateEventArgs<SampleData> args)
    {
        Console.WriteLine(args.PropertyName); // get the setting that was just changed (paging, sorting, filtering...)

        if (args.PropertyName == "FilterDescriptors") // filtering changed for our example
        {
            // ensure certain state based on some condition
            // in this example - ensure that the ID field is always filtered with a certain setting unless the user filters it explicitly
            bool isIdFiltered = false;

            foreach (CompositeFilterDescriptor compositeFilter in args.GridState.FilterDescriptors)
            {
                foreach (FilterDescriptor filter in compositeFilter.FilterDescriptors)
                {
                    if (filter.Member == "Id")
                    {
                        isIdFiltered = true;
                    }

                    // you could override a user action as well - change settings on the corresponding parameter
                    // make sure that the .SetStateAsync() method of the Grid is always called if you do that
                    if (filter.Member == "Name")
                    {
                        filter.Value = "name 1";
                        filter.Operator = FilterOperator.Contains;
                    }
                }            
            }
            if (!isIdFiltered)
            {
                args.GridState.FilterDescriptors.Add(
                    new CompositeFilterDescriptor()
                    {
                        FilterDescriptors = new FilterDescriptorCollection()
                        {
                            new FilterDescriptor() {
                                Member = "Id",
                                MemberType = typeof(int),
                                Operator = FilterOperator.IsLessThan,
                                Value = 15
                            } 
                        }
                    });
            }
            // needed only if you will be overriding user actions or amending them
            // if you only need to be notified of changes, you should not call this method
            await GridRef.SetStateAsync(args.GridState);
        }
    }

    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 300).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### Initiate Editing or Inserting of an Item

The Grid state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the Grid state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the Grid in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug components/grid/columns/command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML
@* This example shows how to trigger Grid Edit, Create, Save and Cancel operations programmatically.
    The buttons that initiate these operations can be anywhere on the page, including inside the Grid.
    Note the model constructors and static method that show how to get a new instance for the edit item.
*@

<TelerikButton OnClick="@StartInsert">Start Insert operation</TelerikButton>
<TelerikButton OnClick="@EditItemFour">Put item 4 in Edit mode</TelerikButton>
<TelerikButton OnClick="@SaveAndClose">Save And Close</TelerikButton>
<TelerikButton OnClick="@CancelEditing">Cancel Editing</TelerikButton>

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px" @ref="@GridRef"
             OnUpdate="@UpdateHandler" OnCreate="@CreateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@FontIcon.Save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@FontIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@FontIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<SampleData> GridRef { get; set; }

    async Task StartInsert()
    {
        var currState = GridRef.GetState();

        // reset any current editing. Not mandatory.
        currState.EditItem = null;
        currState.OriginalEditItem = null;

        // add new inserted item to the state, then set it to the grid
        // you can predefine values here as well (not mandatory)
        currState.InsertedItem = new SampleData() { Name = "some predefined value" };
        await GridRef.SetStateAsync(currState);
        // note: possible only for Inline and Popup edit modes, with InCell there is never an inserted item, only edited items
    }

    async Task EditItemFour()
    {
        var currState = GridRef.GetState();
        // reset any current insertion and any old edited items. Not mandatory.
        currState.InsertedItem = null;

        // add item you want to edit to the state, then set it to the grid
        SampleData originalItem = MyData.Where(itm => itm.ID == 4).FirstOrDefault();
        SampleData itemToEdit = SampleData.GetClonedInstance(originalItem);

        // you can alter values here as well (not mandatory)
        //itemToEdit.Name = "Changed from code";
        currState.EditItem = itemToEdit;
        currState.OriginalEditItem = originalItem;

        // for InCell editing, you can use the EditField property instead
        await GridRef.SetStateAsync(currState);
    }

    async Task SaveAndClose()
    {
        var gridState = GridRef.GetState();

        // distinguish Update and Create operations via the Grid state
        var itemToSave = gridState.EditItem ?? gridState.InsertedItem;

        // call the correct data service method for Update or Create
        if (gridState.InsertedItem != null)
        {
            await CreateHandler(new GridCommandEventArgs()
            {
                IsNew = true,
                Item = itemToSave
            });
        }
        else if (gridState.EditItem != null)
        {
            await UpdateHandler(new GridCommandEventArgs()
            {
                Item = itemToSave
            });
        }

        // reset all edit-related state properties
        gridState.EditItem = null;
        gridState.OriginalEditItem = null;
        gridState.InsertedItem = null;

        await GridRef.SetStateAsync(gridState);
    }

    async Task CancelEditing()
    {
        var gridState = GridRef.GetState();

        // reset all edit-related state properties
        gridState.EditItem = null;
        gridState.OriginalEditItem = null;
        gridState.InsertedItem = null;

        await GridRef.SetStateAsync(gridState);
    }

    // Sample CRUD operations and data follow

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    // Sample class definition - note the constructors, overrides and comments

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }

        // example of comparing stored items (from editing or selection)
        // with items from the current data source - IDs are used instead of the default references
        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.ID == (obj as SampleData).ID;
            }
            return false;
        }


        // define constructors and a static method so we can deep clone instances
        // we use that to define the edited item - otherwise the references will point
        // to the item in the Grid data sources and all changes will happen immediately on
        // the Data collection, and we don't want that - so we need a deep clone with its own reference
        // this is just one way to implement this, you can do it in a different way
        public SampleData()
        {

        }

        public SampleData(SampleData itmToClone)
        {
            this.ID = itmToClone.ID;
            this.Name = itmToClone.Name;
        }

        public static SampleData GetClonedInstance(SampleData itmToClone)
        {
            return new SampleData(itmToClone);
        }
    }

    public List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````


### Get Current Columns Visibility, Order, Field

The `ColumnStates` property of the GridState object provides you with information about the current state of the Grid columns. It contains the following properties:


Field | Type | Description
---------|----------|---------
 `Index` | `int` | the current index of the column based on the position the user chose
 `Id` | `string` | the Id of the column if it is set
 `Field` | `string` | the field of the column
 `Visible` | `bool?` | whether the column is hidden or not
 `Locked` | `bool` | whether the column is locked or not
 `Width` | `string` | the width of the column if it is set

By looping over the `ColumnStates` collection you can know what the user sees. By default, the order of the columns in the state collection will remain the same but their `Index` value will be changed to indicate their position. You can, for example, sort by the index and filter by the visibility of the columns to get the approximate view the user sees.

>caption Obtain the current columns visibility, rendering order, locked state and field name

````CSHTML
@* Click the button, reorder some columns, maybe lock one of them, hide another, and click the button
    again to see how the state changes but the order of the columns in the state collection remains the same.*@

<TelerikButton OnClick="@GetCurrentColumns">Get Columns order and parameters</TelerikButton>

<TelerikGrid Data="@GridData"
             AutoGenerateColumns="true"
             @ref="@Grid"
             ShowColumnMenu="true"
             Reorderable="true"
             Pageable="true">
</TelerikGrid>

@( new MarkupString(ColumnsLog) )

@code {
    IEnumerable<Person> GridData { get; set; }
    TelerikGrid<Person> Grid { get; set; }
    string ColumnsLog { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        GridData = GetGridData();

        base.OnInitialized();
    }

    public void GetCurrentColumns()
    {
        ColumnsLog = string.Empty;

        var columnsState = Grid.GetState().ColumnStates;

        foreach (var columnState in columnsState)
        {
            // human readable info for visibility information
            var visible = columnState.Visible != false;

            string log = $"<p>Column: <strong>{columnState.Field}</strong> | Index in state:{columnState.Index} | Visible: {visible} | Locked: {columnState.Locked}</p>";

            ColumnsLog += log;
        }
    }

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }

    public IEnumerable<Person> GetGridData()
    {
        var data = new List<Person>();
        for (int i = 0; i < 30; i++)
        {
            data.Add(new Person { Id = i, Name = $"Name {i}", Age = i + 20 });
        }

        return data;
    }
}
````




## See Also

* [Live Demo: Grid State](https://demos.telerik.com/blazor-ui/grid/persist-state)
