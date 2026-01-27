---
title: State
page_title: TreeList - State
description: Save, load, change the treelist for Blazor state - sorting, filtering and so on.
slug: treelist-state
tags: telerik,blazor,treelist,state,save,load,layout,set,change,management
published: true
position: 50
components: ["treelist"]
---
# TreeList State

The TreeList lets you read, save, load, and change its state through code. The state includes the TreeList features that are controlled by the user, such as the current sorting, page number, applied grouping, column widths, and many others.

This article describes:

* [The properties of the `TreeListState` object](#information-in-the-treelist-state).
* [How to set initial TreeList configuration programmatically in `OnStateInit`](#onstateinit).
* [How to detect user changes in the TreeList state with `OnStateChanged`](#onstatechanged).
* [How to use TreeList methods to get and set the TreeList state](#methods).
* [Why you may need to override the `Equals` method of the TreeList model class](#equals-comparison).


## Information in the TreeList State

The TreeList state is a generic [class `TreeListState<TItem>`](slug:Telerik.Blazor.Components.TreeListState-1). The type depends on the type of the TreeList model. The `TreeListState<TItem>` object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `ColumnStates` | `ICollection<TreeListColumnState>` | Information about each [column's reorder index, width, visibility, locked state, `Id` parameter value and `Field`](slug:treelist-columns-bound). The column order in the collection matches the column order in the TreeList declaration. On the other hand, the `Index` property matches the current column's position in the UI. **`Id` and `Field` are always `null` after deserialization, because these properties have no public setters.** |
| `EditField` | `string` | The currently edited data item property in [`Incell` edit mode](slug:treelist-editing-incell). |
| `EditItem` | `TItem`* | The currently edited data item in [any edit mode](slug:treelist-editing-overview). |
| `ExpandedItems` | `ICollection<TItem>` | The expanded data items. |
| `FilterDescriptors` | `ICollection<IFilterDescriptor>` | A collection of [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering), except the ones that relate to the [`TreeListSearchBox`](slug:treelist-searchbox). |
| `InsertedItem` | `TItem`* | The data item that is being added in `Inline` or `Popup` edit mode. [Not applicable for `Incell` editing](slug:treelist-editing-incell#events). |
| `OriginalEditItem` | `TItem`* | The original copy of the data item that is currently in edit mode. This `TreeListState` property holds the unmodified data item values. |
| `Page` | `int?` | The current [page index](slug:treelist-paging). Some user actions reset the page index to 1, such as filtering or changing the page size. |
| `ParentItem` | `TItem?`* | The parent item of the current `InsertedItem` in `Inline` or `Popup` edit mode. The value is `null` is the new item is being added at root level. |
| `SearchFilter` | `IFilterDescriptor` | The [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering) that holds the filter descriptors for the [`TreeListSearchBox`](slug:treelist-searchbox). |
| `SelectedItems` | `ICollection<TItem>` | The currently [selected data item(s)](slug:treelist-selection-overview). |
| `Skip` | `int?` | The number of scrolled data items when using [virtual row scrolling](slug:treelist-virtual-scrolling). In other words, this is the number of rows above the currently visible ones. |
| `SortDescriptors` | `ICollection<SortDescriptor>` | The currently applied [sorts](slug:treelist-sorting). |
| `TableWidth` | `string` | The sum of all visible column widths. The initial value is always `null` regardless of the column configuration. The `TableWidth` value changes during column resizing together with `ColumnStates` and the`OnStateChanged` event does not fire separately for it. When you resize a column programmatically, and all other columns already have widths, you must update the `TableWidth` too, otherwise the other columns will resize unexpectedly. |

\* `TItem` is the TreeList model type.


## Events

The TreeList features two events, which are related to its state.

* [OnStateInit](#onstateinit)
* [OnStateChanged](#onstatechanged)

### OnStateInit

The `OnStateInit` event fires when the TreeList is initializing. Use this event to:

* Define initial state, for example default initial sorting;
* Load and apply state that was previously saved in a database or in `localStorage`.

The generic event argument is of type `TreeListStateEventArgs<TItem>` and has a `TreeListState` property. See [Information in the TreeList State](#information-in-the-treelist-state) for details.

> If you change the column order or number of columns in the TreeList declaration, this can break state restore. In such cases, either ignore the stored column state, or implement custom logic to restore only the columns that still exist in the TreeList.
>
> To set the initial visibility of columns, better use the `Visible` parameter, rather than conditional markup for the whole column. The `Visible` parameter values will be present in the TreeList state and the columns collection count will remain the same. This makes it easier to reconcile changes.

The example below shows how to apply initial sorting, filtering and grouping.

>caption Using TreeList OnStateInit

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 OnStateInit="@( (TreeListStateEventArgs<Employee> args) => OnTreeListStateInit(args) )"
                 Pageable="true"
                 Sortable="true"
                 Height="400px">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private IEnumerable<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private void OnTreeListStateInit(TreeListStateEventArgs<Employee> args)
    {
        // Sort sibling items by Salary
        args.TreeListState.SortDescriptors.Add(new SortDescriptor()
        {
            Member = nameof(Employee.Salary),
            SortDirection = ListSortDirection.Descending
        });

        // Filter by IsDriver
        var driverColumnFilter = new CompositeFilterDescriptor()
        {
            FilterDescriptors = new FilterDescriptorCollection() {
                 new FilterDescriptor()
                 {
                    Member = nameof(Employee.IsDriver),
                    MemberType = typeof(bool),
                    Operator = FilterOperator.IsEqualTo,
                    Value = true
                 }
             }
        };

        args.TreeListState.FilterDescriptors.Add(driverColumnFilter);
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

@[template](/_contentTemplates/treelist/editing.md#flat-crud-service-and-model)
}
````

### OnStateChanged

`OnStateChanged` fires when the user performs an action that changes the value of a [property in the TreeList state](#information-in-the-treelist-state). The event argument is of type `TreeListStateEventArgs<TItem>` and exposes these properties:

| Property | Type | Description |
| --- | --- | --- |
| `PropertyName` | `string` | Information about what changed in the TreeList state. The possible values match the [property names of the `TreeListState` object](#information-in-the-treelist-state). @[template](/_contentTemplates/treelist/state.md#statechanged-possible-prop-values) |
| `TreeListState` | `TreeListState<TItem>` | The current (up-to-date) TreeList state object. |

Here is some additional information about certain `PropertyName` values:

* `EditItem` is used when the user starts editing an existing item.
* `InsertedItem` signifies the user adding a new item in inline or popup edit mode. It's [not applicable for `Incell` editing](slug:treelist-editing-incell#events).
* `OriginalEditItem` is used when the user exits edit or insert mode via save or cancel.
* `ColumnStates` is used for several column actions such as hiding, showing, locking, reordering and resizing.

>tip Some user actions will trigger two `OnStateChanged` events with a different `PropertyName` each time. These include filtering and searching. For example, filtering resets the current page to 1. First, the event will fire with `PropertyName` equal to `"FilterDescriptors"`, and then `PropertyName` will be `"Page"`. However, the `TreeListState` property of the event argument will provide correct information about the overall TreeList state in both event handler executions.

> We recommend using an `async Task` handler for the `OnStateChanged` event, in order to reduce re-rendering and avoid blocking UI updates if the handler will wait for a service to save the TreeList state somewhere.

To observe the changes in the TreeList state more easily, copy and run the following example in a local app and at full screen.

Find out how to [get the applied filtering and sorting criteria](slug:common-features-descriptors).

>caption Using TreeList OnStateChanged

````RAZOR
@using System.ComponentModel.DataAnnotations
@using System.Text.Json
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<div id="demo-container">
    <TelerikTreeList Data="@TreeListData"
                     IdField="@nameof(Employee.Id)"
                     ParentIdField="@nameof(Employee.ParentId)"
                     ConfirmDelete="true"
                     EditMode="@TreeListEditMode.Inline"
                     FilterMode="@TreeListFilterMode.FilterMenu"
                     OnCreate="@OnTreeListCreate"
                     OnUpdate="@OnTreeListUpdate"
                     OnStateChanged="@( (TreeListStateEventArgs<Employee> args) => OnTreeListStateChanged(args) )"
                     Pageable="true"
                     @bind-PageSize="@TreeListPageSize"
                     Reorderable="true"
                     Resizable="true"
                     @bind-SelectedItems="@TreeListSelectedItems"
                     SelectionMode="@TreeListSelectionMode.Multiple"
                     ShowColumnMenu="true"
                     Sortable="true"
                     Height="400px">
        <TreeListSettings>
            <TreeListPagerSettings PageSizes="@( new List<int?>() { null, 5, 10 } )" />
        </TreeListSettings>
        <TreeListToolBarTemplate>
            <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
            <TreeListSearchBox />
        </TreeListToolBarTemplate>
        <TreeListColumns>
            <TreeListCheckboxColumn SelectAll="true" />
            <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
            <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
            <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
            <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
            <TreeListCommandColumn Width="160px">
                <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
                <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
                <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
                <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
            </TreeListCommandColumn>
        </TreeListColumns>
    </TelerikTreeList>

    <div id="console">
        <code class="@TreeListStateChangedPropertyClass">OnStateChanged</code> count:
        @OnStateChangedCount
        <TelerikButton OnClick="@( () => OnStateChangedCount = 0 )">Reset</TelerikButton>
        <br /><br />
        Last <code>OnStateChanged</code> event:
        <br />
        <strong class="@TreeListStateChangedPropertyClass">PropertyName</strong>:
        <code>&quot;@TreeListStateChangedProperty&quot;</code>
        <br />
        <strong>TreeListState</strong>:
        <pre>
        @( new MarkupString(TreeListStateString) )
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

            #demo-container > .k-treelist {
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
    private IEnumerable<Employee>? TreeListData { get; set; }

    private int TreeListPageSize { get; set; } = 5;

    private IEnumerable<Employee> TreeListSelectedItems { get; set; } = new List<Employee>();

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private int OnStateChangedCount { get; set; }

    private string TreeListStateChangedProperty { get; set; } = string.Empty;
    private string TreeListStateChangedPropertyClass { get; set; } = string.Empty;

    private string TreeListStateString { get; set; } = string.Empty;

    private bool _doubleStateChanged { get; set; }

    private List<string> _operationsWithMultipleStateChanged = new List<string>() {
        "FilterDescriptors",
        "SearchFilter"
    };

    private async Task OnTreeListStateChanged(TreeListStateEventArgs<Employee> args)
    {
        if (_doubleStateChanged)
        {
            _doubleStateChanged = false;
            await Task.Delay(1500);
            TreeListStateChangedPropertyClass = string.Empty;
        }

        ++OnStateChangedCount;

        TreeListStateChangedProperty = args.PropertyName;

        // serialize the TreeListState and highlight the changed property
        TreeListStateString = JsonSerializer.Serialize(args.TreeListState, new JsonSerializerOptions() { WriteIndented = true })
        .Replace($"\"{TreeListStateChangedProperty}\"", $"\"<strong class='latest-changed-property'>{TreeListStateChangedProperty}</strong>\"");

        // highlight first TreeListStateChangedProperty during filtering, grouping and search
        if (_operationsWithMultipleStateChanged.Contains(TreeListStateChangedProperty))
        {
            _doubleStateChanged = true;
            TreeListStateChangedPropertyClass = "first-of-two";
        }
    }

    private async Task OnTreeListCreate(TreeListCommandEventArgs args)
    {
        var createdItem = (Employee)args.Item;
        var parentItem = (Employee?)args.ParentItem;

        await TreeListEmployeeService.Create(createdItem, parentItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    private async Task OnTreeListUpdate(TreeListCommandEventArgs args)
    {
        var updatedItem = (Employee)args.Item;

        await TreeListEmployeeService.Update(updatedItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

@[template](/_contentTemplates/treelist/editing.md#flat-crud-service-and-model)
}
````

## Methods

The `GetState` and `SetStateAsync` methods of the [TreeList instance](slug:treelist-overview#treelist-reference-and-methods) let you get and set the current TreeList state on demand at any time *after* [`OnStateInit`](#onstateinit).

* `GetState` returns the current TreeList state, so you can save it or [retrieve specific information](#information-in-the-treelist-state). For example, you can [use `GetState` to get the current filters, sorts, and page number](slug:grid-kb-get-filtered-data). Or, you can [get the current TreeList column properties like order index, width, and others)](slug:grid-kb-column-state).

* `SetStateAsync` receives an instance of a `TreeListState<TItem>` object and applies it to the TreeList. For example, you can have a button that puts the TreeList in a certain configuration programmatically, for example sort or filter the data, enter or exit edit mode, expand or collapse rows, etc.

If you want to make changes to the current TreeList state:

1. First, get the current state with the `GetState` method.
1. Apply the desired modifications to the obtained `TreeListState` object.
1. Set the modified state object via the `SetStateAsync` method.

> Do not use `GetState()` in the [`OnStateInit`](#onstateinit) or [`OnStateChanged`](#onstatechanged) events. Do not use `SetStateAsync()` in `OnStateInit`. Instead, get or set the `TreeListState` property of the event argument.
>
> Avoid calling `SetStateAsync` in the TreeList [CRUD methods](slug:treelist-editing-overview) (such as `OnUpdate`, `OnEdit`, `OnCreate`, `OnCancel`). Doing so may lead to unexpected results because the TreeList has more logic to execute after these events.

>tip To reset the TreeList state to its initial markup configuration, call `SetStateAsync(null)`.
>
> To reset the TreeList state to a completely new configuration, create a `new TreeListState<T>()` and apply the settings there. Then pass the state object to `SetStateAsync()`.


### SetStateAsync Examples

The tabs below show how to set the TreeList state and control filtering, sorting and other TreeList features.

@[template](/_contentTemplates/treelist/state.md#initial-state)

<div class="skip-repl"></div>
````RAZOR Sorting
@[template](/_contentTemplates/treelist/state.md#set-sort-from-code)
````
````RAZOR FilterRow
@[template](/_contentTemplates/treelist/state.md#filter-row-from-code)
````
````RAZOR FilterMenu
@[template](/_contentTemplates/treelist/state.md#filter-menu-from-code)
````
````RAZOR Search
@[template](/_contentTemplates/treelist/state.md#search-from-code)
````
````RAZOR ExpandedItems
@[template](/_contentTemplates/treelist/state.md#expand-items-from-code)
````
````RAZOR Columns
@[template](/_contentTemplates/treelist/state.md#column-state-from-code)
````

@[template](/_contentTemplates/grid/state.md#filter-menu-default-filters)


## Equals Comparison

State properties that pertain to data items (for example, edited item or selected items) are typed according to the TreeList model. If you restore such data, make sure to implement appropriate comparison checks - by default the [`.Equals()`](https://learn.microsoft.com/en-us/dotnet/api/system.object.equals) check for a class (object) is a reference check and the reference from the restored state is very unlikely to match the current reference in the TreeList data. Thus, you may want to [override the `.Equals()` method of the TreeList model class](slug:grid-kb-save-load-state-localstorage), so that it compares by ID, or otherwise re-populate the models in the state object with the new model references from the TreeList data.


## Examples

You can find multiple examples for using the TreeList state in the following [Knowledge Base articles](/knowledge-base):

* [Save and load the TreeList state from `localStorage`](slug:grid-kb-save-load-state-localstorage)
* [Save the TreeList state in a WebAssembly app](slug:grid-kb-save-state-in-webassembly)
* [Override a user action that changes the TreeList state, for example, sort descending first](slug:grid-kb-sort-descending)
* [Initiate programmatic editing or inserting of a TreeList row](slug:treelist-kb-add-edit-state)
* [Get current TreeList column state (order index, width, and others)](slug:grid-kb-column-state)


## See Also

* [Live Demo: TreeList State](https://demos.telerik.com/blazor-ui/treelist/persist-state)
* [TreeListState API reference](slug:Telerik.Blazor.Components.TreeListState-1)
* [Blazor TreeList](slug:treelist-overview)
