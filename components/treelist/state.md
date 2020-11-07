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
    * [Save and Load TreeList State from Browser LocalStorage](#save-and-load-treelist-state-from-browser-localstorage)
	* [Set TreeList Options Through State](#set-treelist-options-through-state)
	* [Set Default (Initial) State](#set-default-initial-state)
	* [Get The User Action That Changes The TreeList](#get-the-user-action-that-changes-the-treelist)
	* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
	* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)


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

* **Filtering** - filter descriptors (fields by which the Treelist is filtered, the operator and value).

* **Paging** - page index

* **Sorting** - sort descriptors (fields by which the TreeList is sorted, and the direction).

* **Selection** - list of selected items.

* **Columns** - Visible, Width, Index (order) of the column that the user sees, Locked (pinned).

    * The TreeList matches the columns from its markup sequentially (in the same order) with the columns list in the state object. So, when you restore/set the state, the TreeList must initialize with the same collection of columns that were used to save the state.
    
        The `Index` field in the column state object represents its place (order) that the user sees and can choose through the `Reordable` feature, not its place in the TreeList markup. You can find an example below.
    
        If you want to change the visibility of columns, we recommend you use their `Visible` parameter rather than conditional markup - this parameter will be present in the state and will not change the columns collection count which makes it easier to reconcile changes.


## Examples

You can find the following examples in this section:

* [Save and Load TreeList State from Browser LocalStorage](#save-and-load-treelist-state-from-browser-localstorage)
* [Set TreeList Options Through State](#set-treelist-options-through-state)
* [Set Default (Initial) State](#set-default-initial-state)
* [Get The User Action That Changes The TreeList](#get-the-user-action-that-changes-the-treelist)
* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

### Save and Load TreeList State from Browser LocalStorage

The following example shows one way you can store the TreeList state - through a custom service that calls the browser's LocalStorage. You can use your own database here, or a file, or Microsoft's ProtectedBrowserStorage package, or any other storage you prefer. This is just an example you can use as base and modify to suit your project.
  
>note If you use [Hierarchical data]({%slug treelist-data-binding-hierarchical-data%}) for the TreeList you need to serialize the current item only and not the entire collection of child items in order not to exceed the size of the LocalStorage.

>caption Save, Load, Reset TreeList state on every state change. Uses a sample LocalStorage in the browser.

````Component
@using Telerik.DataSource;

@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop

<TelerikButton OnClick="@ReloadPage">Reload the page to see the current TreeList state preserved</TelerikButton>
<TelerikButton OnClick="@ResetState">Reset the state</TelerikButton>
<TelerikButton OnClick="@SetState">Set the state</TelerikButton>

<TelerikTreeList Data="@Data"
                 Pageable="true"
                 Width="850px"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 OnStateChanged="@((TreeListStateEventArgs<Employee> args) => OnStateChangedHandler(args))"
                 OnStateInit="@((TreeListStateEventArgs<Employee> args) => OnStateInitHandler(args))"
                 @ref="@TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" Width="320px" />
        <TreeListColumn Field="@nameof(Employee.Id)" Width="120px" />
        <TreeListColumn Field="@nameof(Employee.ParentId)" Width="120px" />
        <TreeListColumn Field="@nameof(Employee.EmailAddress)" Width="120px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>


@code { string UniqueStorageKey = "SampleTreeListStateStorageKey";

    async Task OnStateInitHandler(TreeListStateEventArgs<Employee> args)
    {
        args.TreeListState = await LocalStorage.GetItem<TreeListState<Employee>>(UniqueStorageKey);
    }

    async Task OnStateChangedHandler(TreeListStateEventArgs<Employee> args)
    {
        var state = args.TreeListState;
        state.ExpandedItems = null;
        await LocalStorage.SetItem(UniqueStorageKey, state);
    }

    async Task ResetState()
    {
        // clean up the storage
        await LocalStorage.RemoveItem(UniqueStorageKey);

        await TreeListRef.SetState(null); // pass null to reset the state
    }

    void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    private void SetState()
    {
        TreeListState<Employee> state = new TreeListState<Employee>()
        {
            FilterDescriptors = new List<FilterDescriptorBase>()
            {
                new FilterDescriptor() { Member="StringProp", MemberType=typeof(string), Value = "2", Operator = FilterOperator.Contains }
            },
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor() { Member = "StringProp", SortDirection = ListSortDirection.Descending }
            },
            Page = 2,
            ColumnStates = new List<TreeListColumnState>()
            {
                new TreeListColumnState()
                {
                    Index = 3,
                    Width = "150px"
                },
                new TreeListColumnState()
                {
                    Index = 1,
                    Width = "120px"
                },
                new TreeListColumnState()
                {
                    Index = 2,
                    Width = "60px"
                },
                new TreeListColumnState()
                {
                    Index = 4,
                    Width = "150px"
                },
                new TreeListColumnState()
                {
                    Index = 0,
                    Width = "120px"
                }
            }
        };

        TreeListRef?.SetState(state);
    }

    TelerikTreeList<Employee> TreeListRef { get; set; }

    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample model

    public class Employee
    {
        // denote the parent-child relationship between items
        public int Id { get; set; }
        public int? ParentId { get; set; }

        // custom data fields for display
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null, // indicates a root-level item
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i)
            }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId)
                });

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = currId * 1000 + k;
                    data.Add(new Employee
                    {
                        Id = nestedId,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````
````Service
using System.Threading.Tasks;
using Microsoft.JSInterop;
using System.Text.Json;

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

### Set TreeList Options Through State

The TreeList state allows you to control the behavior of the TreeList programmatically - you can, for example, set sorts, filters and expand items.

>tip The individual tabs below show how you can use the state to programmatically set the TreeList filtering, sorting and other features.

@[template](/_contentTemplates/treelist/state.md#initial-state)

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

>tip The `ExpandedItems` sample in the [Set TreeList Options Through State](#set-treelist-options-through-state) section shows how to collapse all items in the OnStateInit event handler.

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

### Get The User Action That Changes The TreeList

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

The TreeList state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the TreeList state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem`, `InsertItem` and `ParentItem` fields of the state object to put the TreeList in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug treelist-columns-command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML
@* This example shows how to make the grid edit a certain item or start insert operation
    through your own code, without requiring the user to click the Command buttons.
    The buttons that initiate these operations can be anywhere on the page, including inside the grid.
    Note the model constructors and static method that show how to get a new instance for the edit item
*@

<TelerikButton OnClick="@EnterEditMode">Edit item 2</TelerikButton>
<TelerikButton OnClick="@InsertItem">Insert Item</TelerikButton>
<TelerikButton OnClick="@InsertItemAsSpecificChild">Insert Item as child of Item 3</TelerikButton>


<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Popup"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 Pageable="true"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px"
                 @ref="@TreeListRef">
    <TreeListToolBar>
        <TreeListCommandButton Command="Add" Icon="add">Add</TreeListCommandButton>
    </TreeListToolBar>
    <TreeListColumns>
        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@IconName.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@IconName.Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@IconName.Delete">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@IconName.Save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@IconName.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }
    TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    async Task EnterEditMode()
    {
        var state = TreeListRef.GetState();

        Employee employeeToEdit = Employee.GetClonedInstance(FindItemRecursive(Data, 2));
        state.OriginalEditItem = employeeToEdit;
        await TreeListRef.SetState(state);
    }

    async Task InsertItem()
    {
        var state = TreeListRef.GetState();
        state.InsertedItem = new Employee() { Name = "added from code" };
        await TreeListRef.SetState(state);
    }

    async Task InsertItemAsSpecificChild()
    {
        var state = TreeListRef.GetState();
        state.InsertedItem = new Employee();
        state.ParentItem = FindItemRecursive(Data, 3);
        await TreeListRef.SetState(state);
    }

    // sample helper method for handling the view-model data hierarchy
    Employee FindItemRecursive(List<Employee> items, int id)
    {
        foreach (var item in items)
        {
            if (item.Id.Equals(id))
            {
                return item;
            }

            if (item.DirectReports?.Count > 0)
            {
                var childItem = FindItemRecursive(item.DirectReports, id);

                if (childItem != null)
                {
                    return childItem;
                }
            }
        }

        return null;
    }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }


    // sample model

    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<Employee> DirectReports { get; set; }
        public bool HasChildren { get; set; }

        // example of comparing stored items (from editing or selection)
        // with items from the current data source - IDs are used instead of the default references
        // Also used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }

        // define constructors and a static method so we can deep clone instances
        // we use that to define the edited item - otherwise the references will point
        // to the item in the grid data sources and all changes will happen immediately on
        // the Data collection, and we don't want that - so we need a deep clone with its own reference
        // this is just one way to implement this, you can do it in a different way
        public Employee()
        {

        }

        public Employee(Employee itmToClone)
        {
            this.Id = itmToClone.Id;
            this.Name = itmToClone.Name;
            this.EmailAddress = itmToClone.EmailAddress;
            this.HireDate = itmToClone.HireDate;
            this.DirectReports = itmToClone.DirectReports != null ? new List<Employee>(itmToClone.DirectReports) : new List<Employee>();
            this.HasChildren = itmToClone.HasChildren;
        }

        public static Employee GetClonedInstance(Employee itmToClone)
        {
            return new Employee(itmToClone);
        }
    }

    // data generation

    async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee
                    {
                        Id = LastId,
                        Name = $"root: {i}",
                        EmailAddress = $"{i}@example.com",
                        HireDate = DateTime.Now.AddYears(-i),
                        DirectReports = new List<Employee>(),
                        HasChildren = true
                    };
                    _data.Add(root);
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
                            DirectReports = new List<Employee>(),
                            HasChildren = true
                        };
                        root.DirectReports.Add(firstLevelChild);
                        LastId++;

                        for (int k = 1; k < 3; k++)
                        {
                            int nestedId = LastId;
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
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<Employee> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<Employee> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<Employee> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<Employee>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }
}
````

### Get Current Columns Visibility, Order, Field

The `ColumnStates` field of the state object provides you with information about the current columns in the TreeList. The `Index` field describes the position the user chose, and the `Visible` parameter indicates whether the column is hidden or not. By looping over that collection you can know what the user sees. You could, for example, sort by the index and filter by the visibility of the columns to approximate the view of the user.

````CSHTML
@[template](/_contentTemplates/treelist/state.md#get-column-state-from-code)
````


## See Also

  * [Live Demo: TreeList State](https://demos.telerik.com/blazor-ui/treelist/persist-state)
   
