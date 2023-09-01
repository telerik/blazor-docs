---
title: Save and Load Grid State from LocalStorage
description: Save and Load Grid State from LocalStorage
type: how-to
page_title: Save and Load Grid State from LocalStorage
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

How to save and restore the Grid state from the browser's `localStorage`?

## Solution



## Example

<div class="skip-repl"></div>

````Grid.razor
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

        // Example for comparing data items by primitive values (ID), rather than by reference.
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
````LocalStorage.cs
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
````Program.cs
// ...

builder.Services.AddTelerikBlazor();

builder.Services.AddScoped<LocalStorage>();

// ...
````

## See Also

* [Grid State]({%slug grid-state%})
* [Save the Grid state in a WebAssembly app]({%slug grid-kb-save-state-in-webassembly%})
