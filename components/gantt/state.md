---
title: State
page_title: Gantt - State
description: Save, load, change the Gantt for Blazor state - sorting, filtering and so on.
slug: Gantt-state
tags: telerik,blazor,Gantt,state,save,load,layout,set,change,management
published: True
position: 50
---

# Gantt State

The Gantt lets you save, load and change its current state through code. The state management includes all the user-configurable elements of the Gantt - such as sorting, filtering, edited items, column size and order.

You can see this feature in the [Live Demo: Gantt State](https://demos.telerik.com/blazor-ui/Gantt/persist-state).

This article contains the following sections:

<!-- Start Document Outline -->

* [Basics](#basics)
	* [Events](#events)
	* [Methods](#methods)
* [Information in the Gantt State](#information-in-the-Gantt-state)
* [Examples](#examples)
	* [Save and Load Gantt State from Browser LocalStorage](#save-and-load-Gantt-state-from-browser-localstorage)
    * [Save and Load Gantt State in a WebAssembly application](#save-and-load-Gantt-state-in-a-webassembly-application)
	* [Set Gantt Options Through State](#set-Gantt-options-through-state)
	* [Set Default (Initial) State](#set-default-initial-state)
	* [Get and Override User Action That Changes The Gantt](#get-and-override-user-action-that-changes-the-Gantt)
	* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
	* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

<!-- End Document Outline -->


## Basics

The Gantt state is a generic class whose type is determined by the type of the model you use for the Gantt. It contains fields that correspond to the Gantt behaviors which you can use to save, load and modify the Gantt state.

Fields that pertain to model data (such as edited item, inserted item, selected items) are also typed according to the Gantt model. If you restore such data, make sure to implement appropriate comparison checks - by default the `.Equals `check for a class (model) is a reference check and the reference from the storage is unlikely to match the reference from the Gantt `Data`. Thus, you may want to override the `.Equals` method of the model you use so it compares by an ID, for example, or otherwise (in the app logic) re-populate the models in the state object with the new model references from the Gantt data source.

The Gantt offers two events and two methods to allow flexible operations over its state:

* [Events](#events)

* [Methods](#methods)

### Events

The `OnStateInit` and `OnStateChanged` events are raised by the Gantt so you can have an easy to use hook for loading and saving state, respectively.

* `OnStateInit` fires when the Gantt is initializing and you can provide the state you load from your storage to the `State` field of its event arguments.

* `OnStateChanged` fires when the user makes a change to the Gantt state (such as paging, sorting, filtering, editing, selecting and so on). The `State` field of the event argument provides the current Gantt state so you can store it. The `PropertyName` field of the event arguments indicates what is the aspect that changed.
    * @[template](/_contentTemplates/Gantt/state.md#statechanged-possible-prop-values)
    * We recommend that you use an **`async void`** handler for the `OnStateChanged` event in order to reduce re-rendering and to avoid blocking the UI update while waiting for the service to store the data. Doing so will let the UI thread continue without waiting for the storage service to complete.
    * Filtering always resets the current page to 1, so the `OnStateChanged` event will fire twice. First, `PropertyName` will be equal to `"Page"`, and the second time it will be `"FilterDescriptors"`. However, the `State` field of the event argument will provide correct information about the overall Gantt state in both event handler executions.

By using the `OnStateChanged` and `OnStateInit` events, you can save and restore the Gantt layout for your users by calling your storage service in the respective handler.

### Methods

The `GetState` and `SetState` instance methods provide flexibility for your business logic. They let you get and set the current Gantt state on demand outside of the Gantt events.

* `GetState` returns the Gantt state so you can store it only on a certain condition - for example, you may want to save the Gantt layout only on a button click, and not on every user interaction with the Gantt. You can also use it to get information about the current state of the filters, sorts and so on, if you are not using the OnRead event.

* `SetState` takes an instance of a Gantt state so you can use your own code to alter the Gantt layout and state. For example, you can have a button that puts the Gantt in a certain configuration that helps your users review data (like certain filters, sorts, expanded items, initiate item editing or inserting, etc.).

If you want to make changes on the current Gantt state, first get it from the Gantt through the `GetState` method, then apply the modifications on the object you got and pass it to `SetState`.

If you want to put the Gantt in a certain configuration without preserving the old one, create a `new GanttState<T>()` and apply the settings there, then pass it to `SetState`.

To reset the Gantt state, call `SetState(null)`.

You should avoid calling `SetState` in the Gantt [CRUD methods]({%slug components/Gantt/editing/overview%}) (such as [OnRead]({%slug components/Gantt/manual-operations%}), `OnUpdate`, `OnEdit`, `OnCreate`, `OnCancel`). Doing so may lead to unexpected results because the Gantt has more logic to execute after the event.

## Information in the Gantt State

The following information is present in the Gantt state:

* **Editing** - whether the user was inserting or editing an item (opens the same item for editing with the current data from the built-in editors of the Gantt - the data is updated in the `OnChange` event, not on every keystroke for performance reasons). The `OriginalEditItem` carries the original model without the user modifications so you can compare.

* **Filtering** - filter descriptors (fields by which the Gantt is filtered, the operator and value).

* **SearchFilter** - filter descriptor specific to the GanttSearchBox.

* **Rows** - list of expanded items.

* **Sorting** - sort descriptors (fields by which the Gantt is sorted, and the direction).

* **Selection** - list of selected items.

* **Columns** - Visible, Width, Index (order) of the column that the user sees, Locked (pinned).

    * The Gantt matches the columns from its markup sequentially (in the same order) with the columns list in the state object. So, when you restore/set the state, the Gantt must initialize with the same collection of columns that were used to save the state.
    
        The `Index` field in the column state object represents its place (order) that the user sees and can choose through the `Reordable` feature, not its place in the Gantt markup. You can find an example below.
    
        If you want to change the visibility of columns, we recommend you use their `Visible` parameter rather than conditional markup - this parameter will be present in the state and will not change the columns collection count which makes it easier to reconcile changes.


## Examples

You can find the following examples in this section:

* [Save and Load Gantt State from Browser LocalStorage](#save-and-load-Gantt-state-from-browser-localstorage)
* [Set Gantt Options Through State](#set-Gantt-options-through-state)
* [Set Default (Initial) State](#set-default-initial-state)
* [Get and Override User Action That Changes The Gantt](#get-and-override-user-action-that-changes-the-Gantt)
* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

### Save and Load Gantt State from Browser LocalStorage

The following example shows one way you can store the Gantt state - through a custom service that calls the browser's LocalStorage. You can use your own database here, or a file, or Microsoft's ProtectedBrowserStorage package, or any other storage you prefer. This is just an example you can use as base and modify to suit your project.

>note We support the `System.Text.Json` serialization that is built-in in Blazor.

>caption Save, Load, Reset Gantt state on every state change. Uses a sample LocalStorage in the browser.

<div class="skip-repl"></div>
````Component
@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop

Change something in the Gantt (like sort, filter, resize TreeList width, expand/collapse tasks etc.). Then reload the page to see the Gantt state fetched from the browser local storage.
<br />

<TelerikButton OnClick="@ReloadPage">Reload the page to see the current grid state preserved</TelerikButton>
<TelerikButton OnClick="@ResetState">Reset the state</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              OnStateInit="@((GanttStateEventArgs<GanttTask> args) => OnStateInitHandler(args))"
              OnStateChanged="@((GanttStateEventArgs<GanttTask> args) => OnStateChangedHandler(args))"
              Sortable="true" 
              FilterMode="@GanttFilterMode.FilterRow"
              @bind-View="@SelectedView"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@code {
    public string TreeListWidth { get; set; } = "50%";
    TelerikGantt<GanttTask> GanttRef;
    public GanttView SelectedView { get; set; } = GanttView.Week;
    List<GanttTask> Data { get; set; }
    string UniqueStorageKey = "SampleGanttStateStorageThatShouldBeUnique";

    // Load and Save the state through the Gantt events
    async Task OnStateInitHandler(GanttStateEventArgs<GanttTask> args)
    {
        try
        {
            var state = await LocalStorage.GetItem<GanttState<GanttTask>>(UniqueStorageKey);
            if (state != null)
            {
                args.State = state;
            }

        }
        catch (InvalidOperationException e)
        {
            // the JS Interop for the local storage cannot be used during pre-rendering
            // so the code above will throw. Once the app initializes, it will work fine
        }
    }

    async void OnStateChangedHandler(GanttStateEventArgs<GanttTask> args)
    {
        await LocalStorage.SetItem(UniqueStorageKey, args.State);
    }

    async Task ResetState()
    {
        // clean up the storage
        await LocalStorage.RemoveItem(UniqueStorageKey);

        await GanttRef.SetStateAsync(null); // pass null to reset the state
    }

    void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public override bool Equals(object obj)
        {
            var model = obj as GanttTask;

            return model?.Id == Id;
        }

        public override int GetHashCode()
        {
            return Id;
        }
    }

    public int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        Data = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
````
````Service
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

<!-- ### Save and Load Gantt State in a WebAssembly application
The [knowledge base article for saving the Gantt state in a WASM application]({%slug Gantt-kb-save-state-in-webassembly%}) explains two ways of storing the `Gantt` state - through a custom controller and a custom service that calls the browser's LocalStorage. -->

### Set Gantt Options Through State

The Gantt state allows you to control the behavior of the Gantt programmatically - you can, for example, set sorts, filteres, expand hierarhical items.

>tip The individual tabs below show how you can use the state to programmatically set the Gantt filtering, sorting and other features.

@[template](/_contentTemplates/Gantt/state.md#initial-state)

<div class="skip-repl"></div>
````Sorting
@[template](/_contentTemplates/gantt/state.md#set-sort-from-code)
````
````FilterRow
@[template](/_contentTemplates/gantt/state.md#filter-row-from-code)
````
````FilterMenu
@[template](/_contentTemplates/gantt/state.md#filter-menu-from-code)
````
````Hierarchy
@[template](/_contentTemplates/gantt/state.md#expand-hierarchy-from-code)
```` -->

<!-- @[template](/_contentTemplates/gantt/state.md#filter-menu-default-filters) -->


### Set Default (Initial) State

If you want the Gantt to start with certain settings for your end users, you can pre-define them in the `OnStateInit event`.

>caption Choose a default state of the Gantt for your users

````CSHTML
@*Set initial Gantt state*@

@using Telerik.DataSource

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              OnStateInit="@((GanttStateEventArgs<GanttTask> args) => OnStateInitHandler(args))"
              Sortable="true"
              FilterMode="@GanttFilterMode.FilterRow"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListWidth="50%"
              Width="1000px"
              Height="600px"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@code {
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }

    async Task OnStateInitHandler(GanttStateEventArgs<GanttTask> args)
    {
        var filterDescriptorCollection = new FilterDescriptorCollection();
        filterDescriptorCollection.Add(new FilterDescriptor(nameof(GanttTask.PercentComplete), FilterOperator.IsLessThan, 0.5) { MemberType = typeof(double) });

        var state = new GanttState<GanttTask>
            {
                SortDescriptors = new List<Telerik.DataSource.SortDescriptor>
                {
                new Telerik.DataSource.SortDescriptor{ Member = "End", SortDirection = Telerik.DataSource.ListSortDirection.Ascending }
                },

                FilterDescriptors = new List<IFilterDescriptor>()
                {
                    new CompositeFilterDescriptor() { FilterDescriptors = filterDescriptorCollection }
                },

                View = GanttView.Week,
            };

        args.State = state;
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        Data = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
````

### Get and Override User Action That Changes The Gantt

Sometimes you may want to know what the user changed in the Gantt (e.g., when they filter, sort and so on) and even override those operations. You can achieve that by handling the `OnStateChanged` event.

Find out what the user changed in the Gantt through the `PropertyName` of the `GanttStateEventArgs`. Override the user action by changing and then setting your desired state.

>caption Know when the Gantt state changes, which parameter changes, and amend the change

````CSHTML
@*This example does the following:
    * Logs to the console what changed in the Gantt
    * If the user changes the Title column filtering, the filter is always overriden to "Contains" and its value to "Task 1"
To test it out, try filtering the Title column
*@

@using Telerik.DataSource

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterRow"
              OnStateChanged="@((GanttStateEventArgs<GanttTask> args) => OnStateChangedHandler(args))"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListWidth="50%"
              Width="1000px"
              Height="500px"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Visible="false"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"  
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>


@code {
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }

    async void OnStateChangedHandler(GanttStateEventArgs<GanttTask> args)
    {
        Console.WriteLine("User changed: " + args.PropertyName); // get the setting that was just changed (paging, sorting,...)

        if (args.PropertyName == "FilterDescriptors") // filtering changed for our example
        {
            foreach (FilterDescriptor item in args.State.FilterDescriptors)
            {
                // you could override a user action as well - change settings on the corresponding parameter
                // make sure that the .SetState() method of the Gantt is always called if you do that
                if (item.Member == "Title")
                {
                    item.Value = "Task 1";
                    item.Operator = FilterOperator.Contains;
                }
            }
          
            // needed only if you will be overriding user actions or amending them
            // if you only need to be notified of changes, you should not call this method
            await GanttRef.SetStateAsync(args.State);
        }
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        Data = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
````

### Initiate Editing or Inserting of an Item

The Gantt state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the Gantt state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the Gantt in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug components/Gantt/columns/command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML
@*Programmatically initiate editing and inserting of items through the Gantt state*@

<TelerikButton OnClick="@StartInsert">Start Insert operation on root level</TelerikButton>
<TelerikButton OnClick="@EditTaskOne">Put first task in Edit mode</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterRow"
              TreeListEditMode="@GanttTreeListEditMode.Inline"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListWidth="60%"
              Width="1000px"
              Height="600px"
              OnCreate="@CreateItem"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttCommandColumn Width="120px">
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Edit" Icon="edit"></GanttCommandButton>
            <GanttCommandButton Command="Save" Icon="save" ShowInEdit="true"></GanttCommandButton>
            <GanttCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
        </GanttCommandColumn>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@code {
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }

    async Task StartInsert()
    {
        var currState = GanttRef.GetState();

        // reset any current editing. Not mandatory.
        currState.EditItem = null;
        currState.OriginalEditItem = null;

        // add new inserted item to the state, then set it to the Gantt
        // you can predefine values here as well (not mandatory)
        currState.InsertedItem = new GanttTask() { 
            Title = "some predefined value",
            Start = new DateTime(2021, 7, 1),
            End = new DateTime(2021, 7, 10)
        };
        await GanttRef.SetStateAsync(currState);

        // note: possible only for Inline and Popup edit modes, with InCell there is never an inserted item, only edited items
    }

    async Task EditTaskOne()
    {
        var currState = GanttRef.GetState();

        // reset any current insertion and any old edited items. Not mandatory.
        currState.InsertedItem = null;

        var itemToEdit = Data.FirstOrDefault();

        currState.EditItem = new GanttTask()
            {
                Id = itemToEdit.Id,
                ParentId = itemToEdit.ParentId,
                Title = itemToEdit.Title,
                PercentComplete = itemToEdit.PercentComplete,
                Start = itemToEdit.Start,
                End = itemToEdit.End
            };

        currState.OriginalEditItem = itemToEdit;

        // for InCell editing, you can use the EditField property instead

        await GanttRef.SetStateAsync(currState);
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        Data = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    private void CreateItem(GanttCreateEventArgs args)
    {
        var item = args.Item as GanttTask;

        item.Id = LastId++;

        if (args.ParentItem != null)
        {
            var parent = (GanttTask)args.ParentItem;

            item.ParentId = parent.Id;
        }

        Data.Insert(0, item);

        CalculateParentPercentRecursive(item);
        CalculateParentRangeRecursive(item);
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }

    private void CalculateParentPercentRecursive(GanttTask item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.PercentComplete = children.Average(i => i.PercentComplete);

                CalculateParentPercentRecursive(parent);
            }
        }
    }

    private void CalculateParentRangeRecursive(GanttTask item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.Start = children.Min(i => i.Start);
                parent.End = children.Max(i => i.End);

                CalculateParentRangeRecursive(parent);
            }
        }
    }

    private GanttTask GetParent(GanttTask item)
    {
        return Data.FirstOrDefault(i => i.Id.Equals(item.ParentId));
    }

    private IEnumerable<GanttTask> GetChildren(GanttTask item)
    {
        return Data.Where(i => item.Id.Equals(i.ParentId));
    }
}
````


### Get Current Columns Visibility, Order, Field

The `ColumnStates` property of the GanttState object provides you with information about the current state of the Gantt columns. It contains the following properties:


Field | Type | Description
---------|----------|---------
 `Index` | `int` | the current index of the column based on the position the user chose
 `Id` | `string` | the Id of the column if it is set
 `Field` | `string` | the field of the column
 `Visible` | `bool?` | whether the column is hidden or not
 `Width` | `string` | the width of the column if it is set

By looping over the `ColumnStates` collection you can know what the user sees. By default, the order of the columns in the state collection will remain the same but their `Index` value will be changed to indicate their position. You can, for example, sort by the index and filter by the visibility of the columns to get the approximate view the user sees.

>caption Obtain the current columns visibility, rendering order, field name and width

````CSHTML
@*Get column states from code*@

<TelerikButton OnClick="@GetCurrentColumnsState">Get Columns order and parameters</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              IdField="Id"
              ParentIdField="ParentId"
              ColumnResizable="true"
              ColumnReorderable="true"
              TreeListWidth="50%"
              Width="1000px"
              Height="500px"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Visible="false"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@(new MarkupString(ColumnsLog))

@code {
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }
    string ColumnsLog { get; set; }

    private void GetCurrentColumnsState()
    {
        var currState = GanttRef.GetState();

        ColumnsLog = string.Empty;

        var columnsState = currState.ColumnStates;

        foreach (var columnState in columnsState)
        {
            // human readable info for visibility information
            var visible = columnState.Visible != false;

            string log = $"<p>Column: <strong>{columnState.Field}</strong> | Index in state:{columnState.Index} | Visible: {visible} | Width: {columnState.Width}</p>";

            ColumnsLog += log;
        }
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        Data = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
````


## See Also

  * [Live Demo: Gantt State](https://demos.telerik.com/blazor-ui/Gantt/persist-state)
   
