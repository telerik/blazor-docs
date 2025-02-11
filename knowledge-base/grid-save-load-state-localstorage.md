---
title: Save and Load Grid State from LocalStorage
description: How to save and load (restore) the Grid State from the browser's localStorage.
type: how-to
page_title: How to Save and Load Grid State from LocalStorage
slug: grid-kb-save-load-state-localstorage
position: 
tags: grid, state, localstorage
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to save and load the Grid state from the browser's `localStorage`?

How to persist and restore the Grid's paging, sorting and filtering state to a future user session?


## Solution

This scenario requires knowledge about the [Grid State](slug:grid-state), so first, get familiar with:

* [Information in the Grid State](slug:grid-state#information-in-the-grid-state)
* [Grid `OnStateChanged` event](slug:grid-state#onstatechanged)
* [Grid `OnStateInit` event](slug:grid-state#onstateinit)

Then, follow these steps:

1. Subscribe to the [Grid `OnStateChanged` event](slug:grid-state#onstatechanged) to detect user actions that change the Grid state, such as paging, sorting, filtering, editing, grouping, etc.
1. Use the `OnStateChanged` handler to serialize the new Grid state (`args.GridState`) and save it to the browser's `localStorage`.
1. Subscribe to the [Grid `OnStateInit` event](slug:grid-state#onstatechanged) to configure the initial state of the Grid programmatically.
1. Obtain the previously saved Grid state information from `localStorage`, deserialize it and set it to the `args.GridState` property of the `OnStateInit` event argument.
    * Using `localStorage` requires JavaScript. Blazor doesn't allow JSInterop calls during pre-rendering. To avoid runtime exceptions, wrap the JSInterop call in `OnStateInit` in a try-catch block. 
1. Some aspects of the Grid state depend on data item references, for example selected items, expanded hierarchy items, or edited items. To restore these successfully, override the `Equals` method of the Grid model class. This will allow .NET to [compare data items by a value (ID), rather than by reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types). Reference comparison will always return `false` (except for strings) after serialization and deserialization.

For more information about `localStorage`, see:

* [Window: `localStorage` property](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [`Storage` API](https://developer.mozilla.org/en-US/docs/Web/API/Storage).

> The `Id` and `Field` properties of `ColumnStates` are always `null` after deserialization, because these properties have no public setters. If it's critical to deserialize the `Id` and `Field` information, then serialize `ColumnStates` separately and then deserialize it to a custom object.


## Example

<div class="skip-repl"></div>

````RAZOR Grid.razor
@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop

<ol>
    <li>Change something in the Grid - sort, filter, page, select rows, resize columns, expand a detail Grid, etc.</li>
    <li>Reload the page to see the Grid state fetched and restored from the browser localStorage.</li>
</ol>

<TelerikButton OnClick="@ReloadPage">Reload Page</TelerikButton>
<TelerikButton OnClick="@ResetGridState">Reset Grid State</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Groupable="true"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Reorderable="true"
             Resizable="true"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@GridSelectedItems"
             Height="500px"
             OnStateInit="@( (GridStateEventArgs<Employee> args) => OnGridStateInit(args) )"
             OnStateChanged="@( (GridStateEventArgs<Employee> args) => OnGridStateChanged(args) )">
    <DetailTemplate>
        @{
            var employee = context as Employee;
            <TelerikGrid Data="employee.Assignments" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="AssignmentId" Title="Assignment Id"></GridColumn>
                    <GridColumn Field="AssignmentTitle" Title="Assignment Title"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Id))" Editable="false" />
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(Employee.Team))" Title="Team" />
    </GridColumns>
</TelerikGrid>

@if (GridSelectedItems != null)
{
    <ul>
        @foreach (Employee employee in GridSelectedItems)
        {
            <li>
                @employee.Id
            </li>
        }
    </ul>
}

@code {
    private string UniqueStorageKey = "unique-grid-state-key";

    private TelerikGrid<Employee> GridRef { get; set; } = null!;

    private List<Employee> GridData { get; set; }

    private IEnumerable<Employee> GridSelectedItems { get; set; } = Enumerable.Empty<Employee>();

    private async Task OnGridStateInit(GridStateEventArgs<Employee> args)
    {
        try
        {
            var state = await LocalStorage.GetItem<GridState<Employee>>(UniqueStorageKey);
            if (state != null)
            {
                args.GridState = state;
            }

        }
        catch (InvalidOperationException e)
        {
            // JSInterop cannot be used during pre-rendering, so the code above will throw.
            // Once the app initializes, it will work fine.
        }
    }

    private async Task OnGridStateChanged(GridStateEventArgs<Employee> args)
    {
        await LocalStorage.SetItem(UniqueStorageKey, args.GridState);
    }

    private async Task ResetGridState()
    {
        await LocalStorage.RemoveItem(UniqueStorageKey);

        await GridRef.SetStateAsync(null);
    }

    private void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    private async Task GetGridData()
    {
        GridData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    #region Classes

    // Note the Equals override for restoring selection and editing

    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Team { get; set; }

        public List<Assignment> Assignments { get; set; }

        // Example for comparing data items by value (ID), rather than by reference.
        // Used for Grid state operations that are related to items (e.g. editing, selection, hierarchy).
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
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

    #endregion Classes

    #region Data Service

    // The following static class mimics a data service.
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();

        public static async Task Create(Employee itemToInsert)
        {
            itemToInsert.Id = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    Employee employee = new Employee { Id = i, Name = $"Name {i}", Team = "Team " + i % 5 };

                    employee.Assignments = Enumerable.Range(1, 15).Select(x => new Assignment { AssignmentId = x, AssignmentTitle = "Assignment " + x }).ToList();

                    _data.Add(employee);
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(Employee itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }

    #endregion Data Service
}
````
````C# LocalStorage.cs
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
````C# Program.cs
// ...

builder.Services.AddTelerikBlazor();

// register the LocalStorage service
builder.Services.AddScoped<LocalStorage>();

// ...
````

## See Also

* [Grid State](slug:grid-state)
* [Save the Grid state in a WebAssembly app](slug:grid-kb-save-state-in-webassembly)
