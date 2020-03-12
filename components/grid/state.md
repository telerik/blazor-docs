---
title: State
page_title: Grid for Blazor | State
description: Save, load, change the Grid for Blazor state - grouping, sorting, filtering and so on.
slug: grid-state
tags: telerik,blazor,grid,state,save,load,layout,set,change,management
published: True
position: 40
---

# Grid State

The Grid lets you save, load and change its current state through code. The state management includes all the user-configurable elements of the grid - such as sorting, filtering, paging, grouping, edited items, selection, column size and order.

You can see this feature in the [Live Demo: Grid State](https://demos.telerik.com/blazor-ui/grid/persist-state).

This article contains the following sections:

* [Basics](#basics)
	* [Events](#events)
	* [Methods](#methods)
* [Information in the Grid State](#information-in-the-grid-state)
* [Examples](#examples)
	* [Save and Load Grid State from Browser LocalStorage](#save-and-load-grid-state-from-browser-localstorage)
	* [Set Grid Options Through State](#set-grid-options-through-state)
	* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)


## Basics

The grid state is a generic class whose type is determined by the type of the model you use for the grid. It contains fields that correspond to the grid behaviors which you can use to save, load and modify the grid state.

Fields that pertain to model data (such as edited item, inserted item, selected items) are also typed according to the grid model. If you restore such data, make sure to implement appropriate comparison checks - by default the `.Equals `check for a class (model) is a reference check and the reference from the storage is unlikely to match the reference from the grid `Data`. Thus, you may want to override the `.Equals` method of the model you use so it compares by an ID, for example, or otherwise (in the app logic) re-populate the models in the state object with the new model references from the grid data source.

The grid offers two events and two methods to allow flexible operations over its state:

### Events

The `OnStateInit` and `OnStateChanged` events are raised by the grid so you can have an easy to use hook for loading and saving state, respectively.

* `OnStateInit` fires when the grid is initializing and you can provide the state you load from your storage to the `GridState` field of its event arguments.

* `OnStateChanged` fires when the user makes a change to the grid state (such as dragging to group by a field, filtering a column, editing, selecting and so on). The `GridState` field of the event arguments provides the current grid state so you can store it. The `PropertyName` field of the event arguments indicates what is the aspect that changed.
    * We recommend that you use an `async void` handler for the `OnStateChanged` event in order to reduce re-rendering and to avoid blocking the UI update while waiting for the service to store the data. Doing so will let the UI thread continue without waiting for the storage service to complete.

By combining these two events you can save the grid layout for your users automatically by only calling upon your storage service in the respective method.

### Methods

The `GetState` and `SetState` instance methods provide flexibility for your business logic. They let you get and set the current grid state on demand outside of the grid events.

* `GetState` returns the grid state so you can store it only on a certain condition - for example, you may want to save the grid layout only on a button click, and not on every user interaction with the grid. You can also use it to get information about the current state of the filters, sorts and so on, if you are not using the OnRead event.

* `SetState` takes an instance of a grid state so you can use your own code to alter the grid layout and state. For example, you can have a button that puts the grid in a certain configuration that helps your users review data (like certain filters, sorts, groups, expanded detail templates, initiate item editing or inserting, etc.).

If you want to make changes on the current grid state, first get it from the grid through the `GetState` method, then apply the modifications on the object you got, and pass it to `SaveState`.

If you want to put the grid in a certain configuration without preserving the old one, create a `new GridState<T>()` and apply the settings there, then pass it to `SetState`.

To reset the grid state, call `SetState(null)`.

## Information in the Grid State

The following information is present in the grid state:

* Columns - index (order) of the column (matches the list order in the state object), width. Requires that the grid initializes with the same collection of columns that were used to save the state.
* Editing - whether the user was inserting or editing an item (opens the same item for editing with the current data from the built-in editors of the grid - the data is updated in the `OnChange` event, not on every keystroke for performance reasons). The `OriginalEditItem` carries the original model without the user modifications so you can compare.
* Filtering - filter descriptors (fields by which the grid is filtered, the operator and value).
* Grouping - group descriptors (fields by which the grid is grouped), collapsed group indexes.
* Paging - page index, offset (skip) for virtual scrolling.
* Rows - indexes of expanded detail templates.
* Sorting - sort descriptors (fields by which the grid is filtered, and the direction).
* Selection - list of selected items.


## Examples

### Save and Load Grid State from Browser LocalStorage

The following example shows one way you can store the grid state - through a custom service that calls the browser's LocalStorage. You can use your own database here, or a file, or Microsoft's ProtectedBrowserStorage package, or any other storage you prefer. This is just an example you can use as base and modify to suit your project.

>caption Save, Load, Reset grid state on every state change. Uses a sample LocalStorage in the browser.

````Component
@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop
@using Telerik.DataSource;

Change something in the grid (like sort, filter, select, page, resize columns, etc.), then reload the page to see the grid state fetched from the browser local storage.
<br />

<TelerikButton OnClick="@ReloadPage">Reload the page to see the current grid state preserved</TelerikButton>
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
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Editable="false" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
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
    // Load and Save the state through the grid events

    string UniqueStorageKey = "SampleGridStateStorageThatShouldBeUnique";

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

    TelerikGridBase<SampleData> Grid { get; set; }
    async Task ResetState()
    {
        // clean up the storage
        await LocalStorage.RemoveItem(UniqueStorageKey);

        await Grid.SetState(null); // pass null to reset the state
    }

    void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    // Sample CRUD operations

    private void CreateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        argsItem.Id = GridData.Count + 1;

        GridData.Insert(0, argsItem);
    }

    private void DeleteItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        GridData.Remove(argsItem);
    }

    private void UpdateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;
        var index = GridData.FindIndex(i => i.Id == argsItem.Id);
        if (index != -1)
        {
            GridData[index] = argsItem;
        }
    }

    // Sample data follows below

    public IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();

    public List<SampleData> GridData { get; set; } = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }

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
    }
}
````
````Service
using Microsoft.JSInterop;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
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
        return JSRuntimeInstance.InvokeVoidAsync("localStorage.setItem", new object[] {
            key,
            JsonConvert.SerializeObject(data)
        });
    }

    public async Task<T> GetItem<T>(string key)
    {
        var data = await JSRuntimeInstance.InvokeAsync<string>("localStorage.getItem", key);
        if (!string.IsNullOrEmpty(data))
        {
            return JsonConvert.DeserializeObject<T>(data, new JsonSerializerSettings()
            {
                Converters = new JsonConverter[]
                {
                    new FilterDescriptorJsonConverter()
                },
                NullValueHandling = NullValueHandling.Ignore
            });
        }

        return default;
    }

    public ValueTask RemoveItem(string key)
    {
        return JSRuntimeInstance.InvokeVoidAsync("localStorage.removeItem", key);
    }
}

// to store the serialized grid state, we need to have a custom serialized
// based on Newtonsoft.Json serialization. In the future this may not be required
public class FilterDescriptorJsonConverter : JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(FilterDescriptorBase);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        JObject filterDescriptor = JObject.Load(reader);

        return filterDescriptor.ToObject<FilterDescriptor>(serializer);
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
    }
}
````

### Set Grid Options Through State

The grid state allows you to control the behavior of the grid programmatically - you can, for example, set sorts, filteres, expand hierarhical rows, collapse groups.

>caption The individual tabs show how you can use the state to programmatically set the grid filtering, sorting, grouping and other features

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

### Initiate Editing or Inserting of an Item

The grid state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the grid state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the grid in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug components/grid/columns/command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML
@* This example shows how to make the grid edit a certain item or start insert operation
    through your own code, without requiring the user to click the Command buttons.
    The buttons that initiate these operations can be anywhere on the page, inlcuding inside the grid.
    Note the model constructors and static method that show how to get a new instance for the edit item 
    *@

<TelerikButton OnClick="@StartInsert">Start Insert operation</TelerikButton>
<TelerikButton OnClick="@EditItemFour">Put item 4 in Edit mode</TelerikButton>

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px" @ref="@GridRef"
             OnUpdate="@UpdateHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
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
        await GridRef.SetState(currState);
    }

    async Task EditItemFour()
    {
        var currState = GridRef.GetState();
        // reset any current insertion and any old edited items. Not mandatory.
        currState.InsertedItem = null;

        // add item you want to edit to the state, then set it to the grid
        SampleData itemToEdit = SampleData.GetClonedInstance(MyData.Where(itm => itm.ID == 4).FirstOrDefault());
        // you can alter values here as well (not mandatory)
        //itemToEdit.Name = "Changed from code";
        currState.OriginalEditItem = itemToEdit;
        // for InCell editing, you can use the EditField property instead
        await GridRef.SetState(currState);
    }


    // Sample CRUD operations and data follow

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
        }
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        MyData.Remove(item);
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        item.ID = MyData.Count + 1;
        MyData.Insert(0, item);

    }

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
        // to the item in the grid data sources and all changes will happen immediately on
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

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "Name " + i.ToString()
            });
        }
    }
}
````

## See Also

  * [Live Demo: Grid State](https://demos.telerik.com/blazor-ui/grid/persist-state)
   
