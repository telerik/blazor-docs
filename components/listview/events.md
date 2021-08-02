---
title: Events
page_title: ListView - Events
description: Events in the ListView for Blazor.
slug: listview-events
tags: telerik,blazor,listview,events
published: true
position: 20
---

# ListView Events

This article explains the events available in the Telerik ListView for Blazor:

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Read Event](#read-event) - event related to obtaining data
* [OnModelInit](#onmodelinit)
* [PageChanged](#pagechanged)
* [PageSizeChanged](#pagesizechanged)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when the want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [ListView Editing]({%slug listview-editing%}) article.


## Read Event

In the common case, you provide all the data to the listview's Data collection and the listview performs paging on it for you. In some cases you may want to do this with your own code (for example, to retrieve only a small number of items in order to improve the backend performance). You can do this by attaching to the `OnRead` event where you can perform all the data read operations in the listview. You can read more about it in the [Manual Data Source Operations]({%slug listview-manual-operations%}) article.

### OnModelInit

@[template](/_contentTemplates/common/onmodelinit.md#onmodelinit-info)

>caption The different use-cases of the OnModelInit event

````NoParameterlessConstructor
@* Bind the ListView to a class without a parameterless constructor *@

<TelerikListView Data="@ListViewData" 
                 Pageable="true"
                 OnModelInit="@OnModelInitHandler"
                 OnCreate="@CreateHandler" 
                 OnDelete="@DeleteHandler" 
                 OnUpdate="@UpdateHandler"
                 OnEdit="@EditHandler" 
                 OnCancel="@CancelHandler">
    <EditTemplate>
        <div style="border: 1px solid green; margin: 10px; padding: 10px; display: inline-block;">
            <TelerikTextBox @bind-Value="@context.Name" Label="Name" /><br />
            <TelerikDropDownList Data="@Teams" @bind-Value="@context.Team" />
            <ListViewCommandButton Command="Save" Icon="save">Save</ListViewCommandButton>
            <ListViewCommandButton Command="Cancel" Icon="cancel">Cancel</ListViewCommandButton>
        </div>
    </EditTemplate>
    <Template>
        <div style="border: 1px solid black; margin: 10px; padding: 10px; display: inline-block;">
            Employee: @context.Id <br />
            Name: @context.Name in team: @context.Team
            <ListViewCommandButton Command="Edit" Icon="edit">Edit</ListViewCommandButton>
            <ListViewCommandButton Command="Delete" Icon="delete">Delete</ListViewCommandButton>
        </div>
    </Template>
    <HeaderTemplate>
        <ListViewCommandButton Command="Add" Icon="plus">Add Employee</ListViewCommandButton>
        <p>In this sample, the first item will not open for editing because of the code in the OnEdit handler</p>
    </HeaderTemplate>
</TelerikListView>

@code{
    List<Employee> ListViewData { get; set; }
    List<string> Teams { get; set; }

    public Employee OnModelInitHandler()
    {
        return new Employee(0, "Test Name", "Test Team");
    }

    async Task UpdateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task DeleteHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task CreateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task EditHandler(ListViewCommandEventArgs e)
    {
        Employee currItem = e.Item as Employee;

        // prevent opening an item for editing on condition
        if (currItem.Id < 2)
        {
            e.IsCancelled = true;
        }
    }

    async Task CancelHandler(ListViewCommandEventArgs e)
    {
        Employee changedItem = e.Item as Employee;
        // this is the item as the user edited it, but chose to cancel editing/inserting
        Console.WriteLine($"user changed item {changedItem.Id} to have Name: {changedItem.Name} and Team: {changedItem.Team}");
    }

    // data and models follow

    async Task GetListViewData()
    {
        ListViewData = await MyService.Read();
        Teams = await MyService.GetTeams();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetListViewData();
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }

        public Employee(int id, string name, string team)
        {
            Id = id;
            Name = name;
            Team = team;
        }
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        private static List<string> _teams = new List<string> { "Sales", "Dev", "Support" };

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
                    _data.Add(new Employee(i, $"Name {i}", _teams[i % _teams.Count]));
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task<List<string>> GetTeams()
        {
            return await Task.FromResult(_teams);
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
}
````
````Interface
@* Bind the ListView to an interface *@

<TelerikListView Data="@ListViewData" 
                 Pageable="true"
                 OnModelInit="@OnModelInitHandler"
                 OnCreate="@CreateHandler" 
                 OnDelete="@DeleteHandler" 
                 OnUpdate="@UpdateHandler"
                 OnEdit="@EditHandler" 
                 OnCancel="@CancelHandler">
    <EditTemplate>
        <div style="border: 1px solid green; margin: 10px; padding: 10px; display: inline-block;">
            <TelerikTextBox @bind-Value="@context.Name" Label="Name" /><br />
            <TelerikDropDownList Data="@Teams" @bind-Value="@context.Team" />
            <ListViewCommandButton Command="Save" Icon="save">Save</ListViewCommandButton>
            <ListViewCommandButton Command="Cancel" Icon="cancel">Cancel</ListViewCommandButton>
        </div>
    </EditTemplate>
    <Template>
        <div style="border: 1px solid black; margin: 10px; padding: 10px; display: inline-block;">
            Employee: @context.Id <br />
            Name: @context.Name in team: @context.Team
            <ListViewCommandButton Command="Edit" Icon="edit">Edit</ListViewCommandButton>
            <ListViewCommandButton Command="Delete" Icon="delete">Delete</ListViewCommandButton>
        </div>
    </Template>
    <HeaderTemplate>
        <ListViewCommandButton Command="Add" Icon="plus">Add Employee</ListViewCommandButton>
        <p>In this sample, the first item will not open for editing because of the code in the OnEdit handler</p>
    </HeaderTemplate>
</TelerikListView>

@code{
    List<IEmployee> ListViewData { get; set; }
    List<string> Teams { get; set; }

    public Employee OnModelInitHandler()
    {
        return new Employee(0, "Test Name", "Test Team");
    }

    async Task UpdateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task DeleteHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task CreateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task EditHandler(ListViewCommandEventArgs e)
    {
        Employee currItem = e.Item as Employee;

        // prevent opening an item for editing on condition
        if (currItem.Id < 2)
        {
            e.IsCancelled = true;
        }
    }

    async Task CancelHandler(ListViewCommandEventArgs e)
    {
        Employee changedItem = e.Item as Employee;
        // this is the item as the user edited it, but chose to cancel editing/inserting
        Console.WriteLine($"user changed item {changedItem.Id} to have Name: {changedItem.Name} and Team: {changedItem.Team}");
    }

    // data and models follow

    async Task GetListViewData()
    {
        ListViewData = await MyService.Read();
        Teams = await MyService.GetTeams();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetListViewData();
    }

    public interface IEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }

    public class Employee : IEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }

        public Employee(int id, string name, string team)
        {
            Id = id;
            Name = name;
            Team = team;
        }
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<IEmployee> _data { get; set; } = new List<IEmployee>();
        private static List<string> _teams = new List<string> { "Sales", "Dev", "Support" };

        public static async Task Create(Employee itemToInsert)
        {
            itemToInsert.Id = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<IEmployee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new Employee(i, $"Name {i}", _teams[i % _teams.Count]));
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task<List<string>> GetTeams()
        {
            return await Task.FromResult(_teams);
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
}
````
````AbstractClass
@* Bind the ListView to an abstract class *@

<TelerikListView Data="@ListViewData" 
                 Pageable="true"
                 OnModelInit="@OnModelInitHandler"
                 OnCreate="@CreateHandler" 
                 OnDelete="@DeleteHandler" 
                 OnUpdate="@UpdateHandler"
                 OnEdit="@EditHandler" 
                 OnCancel="@CancelHandler">
    <EditTemplate>
        <div style="border: 1px solid green; margin: 10px; padding: 10px; display: inline-block;">
            <TelerikTextBox @bind-Value="@context.Name" Label="Name" /><br />
            <TelerikDropDownList Data="@Teams" @bind-Value="@context.Team" />
            <ListViewCommandButton Command="Save" Icon="save">Save</ListViewCommandButton>
            <ListViewCommandButton Command="Cancel" Icon="cancel">Cancel</ListViewCommandButton>
        </div>
    </EditTemplate>
    <Template>
        <div style="border: 1px solid black; margin: 10px; padding: 10px; display: inline-block;">
            Employee: @context.Id <br />
            Name: @context.Name in team: @context.Team
            <ListViewCommandButton Command="Edit" Icon="edit">Edit</ListViewCommandButton>
            <ListViewCommandButton Command="Delete" Icon="delete">Delete</ListViewCommandButton>
        </div>
    </Template>
    <HeaderTemplate>
        <ListViewCommandButton Command="Add" Icon="plus">Add Employee</ListViewCommandButton>
        <p>In this sample, the first item will not open for editing because of the code in the OnEdit handler</p>
    </HeaderTemplate>
</TelerikListView>

@code{
    List<EmployeeBase> ListViewData { get; set; }
    List<string> Teams { get; set; }

    public Employee OnModelInitHandler()
    {
        return new Employee(0, "Test Name", "Test Team");
    }

    async Task UpdateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task DeleteHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task CreateHandler(ListViewCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetListViewData();
    }

    async Task EditHandler(ListViewCommandEventArgs e)
    {
        Employee currItem = e.Item as Employee;

        // prevent opening an item for editing on condition
        if (currItem.Id < 2)
        {
            e.IsCancelled = true;
        }
    }

    async Task CancelHandler(ListViewCommandEventArgs e)
    {
        Employee changedItem = e.Item as Employee;
        // this is the item as the user edited it, but chose to cancel editing/inserting
        Console.WriteLine($"user changed item {changedItem.Id} to have Name: {changedItem.Name} and Team: {changedItem.Team}");
    }

    // data and models follow

    async Task GetListViewData()
    {
        ListViewData = await MyService.Read();
        Teams = await MyService.GetTeams();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetListViewData();
    }

    public abstract class EmployeeBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }

    public class Employee : EmployeeBase
    {
        public Employee(int id, string name, string team)
        {
            Id = id;
            Name = name;
            Team = team;
        }
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<EmployeeBase> _data { get; set; } = new List<EmployeeBase>();
        private static List<string> _teams = new List<string> { "Sales", "Dev", "Support" };

        public static async Task Create(Employee itemToInsert)
        {
            itemToInsert.Id = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<EmployeeBase>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new Employee(i, $"Name {i}", _teams[i % _teams.Count]));
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task<List<string>> GetTeams()
        {
            return await Task.FromResult(_teams);
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
}
````

## PageChanged

The event fires when the user pages the listview. If you will be providing the `Page` index in your own code, you would usually use two-way binding (`@bind-Page="@MyPageIndex"`), but when using its `Changed` event, the framework does not allow two-way binding, so you must update such a variable in your own event handler. Otherwise, the next time the listview renders, it will go back to the original page.

>caption Handle the PageChanged event

````CSHTML
@result

<TelerikListView Data="@ListViewData" Pageable="true" PageChanged="@PageChangedHandler">
    <Template>
        <h6>@context.Name</h6>
    </Template>
</TelerikListView>

@code{
    string result { get; set; }
    async Task PageChangedHandler(int currPageIndex)
    {
        result = $"The user is now on page {currPageIndex}";
    }

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

### PageSizeChanged

The `PageSizeChanged` event fires when the user changes the page size via the pager DropDownList. The existence of this event also ensures that the TreeList `PageSize` attribute supports two-way binding.

If the user selects the "All" option from the page size DropDownList, the `PageSizeChanged` event will receive the total item count as an argument.

Make sure to update the current page size when using the event.

>caption Handle PageSizeChanged

````CSHTML
<TelerikListView Data="@ListViewData"
                 Pageable="true"
                 PageSize="@PageSize"
                 PageSizeChanged="@PageSizeChangedHandler">
    <Template>
        <h6>@context.Name</h6>
    </Template>
</TelerikListView>

@code{
    int PageSize { get; set; } = 15;
    
    async Task PageSizeChangedHandler(int newPageSize)
    {
        PageSize = newPageSize;
    }

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [ListView Overview]({%slug listview-overview%})
