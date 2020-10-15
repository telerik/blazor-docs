---
title: State
page_title: TreeList - State
description: Save, load, change the treelist for Blazor state - sorting, filtering and so on.
slug: treelist-state
tags: telerik,blazor,treelist,state,save,load,layout,set,change,management
published: true
position: 50
---

# TreeList State

The TreeList lets you save, load and change its current state through code. The state management includes all the user-configurable elements of the TreeList - such as managing the expanded state of the items, sorting, filtering, paging, edited items and selection.

You can see this feature in the [Live Demo: TreeList State](https://demos.telerik.com/blazor-ui/treelist/persist-state).

This article contains the following sections:

* [Basics](#basics)
	* [Events](#events)
	* [Methods](#methods)
* [Information in the TreeList State](#information-in-the-treelist-state)
* [Examples](#examples)
	* [Set TreeList Options Through State](#set-treelist-options-through-state)
	* [Set Default (Initial) State](#set-default-initial-state)
	* [Get and Override User Action That Changes The TreeList](#get-and-override-user-action-that-changes-the-treelist)
	* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)


## Basics

The TreeList state is a generic class whose type is determined by the type of the data model you use for the TreeList. It contains fields that correspond to the TreeList behaviors which you can use to save, load and modify the component state.

Fields that pertain to model data (such as edited item, inserted item, selected items) are also typed according to the TreeList model. If you restore such data, make sure to implement appropriate comparison checks - by default the `.Equals `check for a class (model) is a reference check and the reference from the storage is unlikely to match the reference from the `Data` parameter. Thus, you may want to override the `.Equals` method of the model you use so it compares by an ID, for example, or otherwise (in the app logic) re-populate the models in the state object with the new model references from the component data source.

The TreeList exposes two events and two methods to allow flexible operations over its state:

* [Events](#events)

* [Methods](#methods)

### Events

The `OnStateInit` and `OnStateChanged` events are raised by the TreeList so you can have an easy to use hook for loading and saving state, respectively.

* `OnStateInit` fires when the TreeList is initializing and you can provide the state you load from your storage to the `TreeListState` field of its event arguments.

* `OnStateChanged` fires when the user makes a change to the TreeList state (such as expanding or collapsing an item, filtering a column, editing, selecting and so on). The `TreeListState` field of the event arguments provides the current state so you can store it. The `PropertyName` field of the event arguments indicates what is the aspect that changed.
    * We recommend that you use an `async void` handler for the `OnStateChanged` event in order to reduce re-rendering and to avoid blocking the UI update while waiting for the service to store the data. Doing so will let the UI thread continue without waiting for the storage service to complete.

By combining these two events you can save the TreeList layout for your users automatically by only calling upon your storage service in the respective method.

### Methods

The `GetState` and `SetState` instance methods provide flexibility for your business logic. They let you get and set the current TreeList state on demand outside of the component events.

* `GetState` returns the TreeList state so you can store it only on a certain condition - for example, you may want to save the TreeList layout only on a button click, and not on every user interaction with the component. You can also use it to get information about the current state of the filters, sorts and so on.

* `SetState` takes an instance of a TreeList state so you can use your own code to alter the component layout and state. For example, you can have a button that puts the TreeList in a certain configuration that helps your users review data (like certain filters, sorts, expanded items, initiate item editing or inserting, etc.).

If you want to make changes on the current TreeList state, first get it from the component through the `GetState` method, then apply the modifications on the object you got, and pass it to `SaveState`.

If you want to put the TreeList in a certain configuration without preserving the old one, create a `new TreeListState<T>()` and apply the settings there, then pass it to `SetState`.

To reset the TreeList state, call `SetState(null)`.

## Information in the TreeList State

The following information is present in the TreeList state:

* **Editing** - whether the user was inserting or editing an item (opens the same item for editing with the current data from the built-in editors of the TreeList - the data is updated in the `OnChange` event, not on every keystroke for performance reasons). The `OriginalEditItem` carries the original model without the user modifications so you can compare.

* **Filtering** - filter descriptors (fields by which the grid is filtered, the operator and value).

* **Paging** - page index

* **Sorting** - sort descriptors (fields by which the TreeList is sorted, and the direction).

* **Selection** - list of selected items.

* **Columns** - Visible, Width, Index (order) of the column that the user sees, Locked (pinned).

    * The TreeList matches the columns from its markup sequentially (in the same order) with the columns list in the state object. So, when you restore/set the state, the TreeList must initialize with the same collection of columns that were used to save the state.
    
        The `Index` field in the column state object represents its place (order) that the user sees and can choose through the `Reordable` feature, not its place in the TreeList markup. You can find an example below.
    
        If you want to change the visibility of columns, we recommend you use their `Visible` parameter rather than conditional markup - this parameter will be present in the state and will not change the columns collection count which makes it easier to reconcile changes.


## Examples

You can find the following examples in this section:

* [Set TreeList Options Through State](#set-treelist-options-through-state)
* [Set Default (Initial) State](#set-default-initial-state)
* [Get and Override User Action That Changes The TreeList](#get-and-override-user-action-that-changes-the-treelist)
* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)


### Set TreeList Options Through State

The TreeList state allows you to control the behavior of the grid programmatically - you can, for example, set sorts, filteres and expand items.

>tip The individual tabs below show how you can use the state to programmatically set the TreeList filtering, sorting and other features.

@[template](/_contentTemplates/grid/state.md#initial-state)

````ExpandedItems
@[template](/_contentTemplates/treelist/state.md#expand-items-from-code)
````
````Sorting
@[template](/_contentTemplates/treelist/state.md#set-sort-from-code)
````
````FilterRow
@[template](/_contentTemplates/treelist/state.md#filter-row-from-code)
````
````FilterMenu
@[template](/_contentTemplates/treelist/state.md#filter-menu-from-code)
````


### Set Default (Initial) State

If you want the TreeList to start with certain settings for your end users, you can pre-define them in the `OnStateInit event`.

>caption Choose a default state of the TreeList for your users

````CSHTML
@using Telerik.DataSource;

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 OnStateInit="@((TreeListStateEventArgs<Employee> args) => OnStateInitHandler(args))">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    async Task OnStateInitHandler(TreeListStateEventArgs<Employee> args)
    {
        var initialState = new TreeListState<Employee>()
        {
            FilterDescriptors = new List<FilterDescriptorBase>()
            {
                new FilterDescriptor()
                {
                    Member = nameof(Employee.Name),
                    MemberType = typeof(string),
                    Operator = FilterOperator.Contains,
                    Value = "second level"
                }
            },
            SortDescriptors = new List<SortDescriptor>()
            {
               new SortDescriptor()
               {
                   Member = nameof(Employee.Id),
                   SortDirection = ListSortDirection.Descending
               }
            },
            Page = 2
        };

        args.TreeListState = initialState;
    }

    public List<Employee> Data { get; set; }

    // sample model

    public class Employee
    {
        // hierarchical data collections
        public List<Employee> DirectReports { get; set; }

        // data fields for display
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

### Get User Action That Changes The TreeList

Sometimes you may want to know what the user changed in the TreeList (e.g., when they filter, sort and so on).

The example below shows how to achieve it by using the`OnStateChanged` event.

>caption Know when the TreeList state changes and which parameter changed

````CSHTML
@using Telerik.DataSource;

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 OnStateChanged="@((TreeListStateEventArgs<Employee> args) => OnStateChangedHandler(args))"
                 @ref="@TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@Result

@code {
    TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    public string Result { get; set; }

    async Task OnStateChangedHandler(TreeListStateEventArgs<Employee> args)
    {
        string changedSetting = args.PropertyName;

        if(changedSetting == "SortDescriptors")
        {
            foreach (var item in args.TreeListState.SortDescriptors)
            {
                Result = $"The {item.Member} field was sorted";
            }
        }
        else if(changedSetting == "FilterDescriptors")
        {
            foreach (FilterDescriptor item in args.TreeListState.FilterDescriptors)
            {
                Result = $"The {item.Member} field was filtered";
            }
        }
    }

    public List<Employee> Data { get; set; }

    // sample model

    public class Employee
    {
        // hierarchical data collections
        public List<Employee> DirectReports { get; set; }

        // data fields for display
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

### Initiate Editing or Inserting of an Item

The TreeList state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the grid state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the grid in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug treelist-columns-command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML

````


## See Also

  * [Live Demo: TreeList State](https://demos.telerik.com/blazor-ui/treelist/persist-state)
   
