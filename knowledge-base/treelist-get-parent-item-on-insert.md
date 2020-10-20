---
title: Get the parent item when inserting a child to the TreeList
description: How to get the parent item when inserting a child to the TreeList
type: how-to
page_title: Get the parent item when inserting a child to the TreeList
slug: treelist-kb-get-parent-item-on-insert
position: 
tags: 
ticketid: 1490309
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When inserting a child item in the TreeList I would like to be able to get the information for the parent it belongs to and show it to the user.

## Solution

The approaches to handle this would depend of the type of data the component is bound to - [Flat]({%slug treelist-data-binding-flat-data%}) or [Hierarchical]({%slug treelist-data-binding-hierarchical-data%}). The examples below showcase how to handle both scenarios:

* [Get the Parent Item When Inserting a Child to the TreeList When Bound To Flat Data](#get-the-parent-item-when-inserting-a-child-to-the-treelist-when-bound-to-flat-data)

* [Get the Parent Item When Inserting a Child to the TreeList When Bound To Hierarchical Data](#get-the-parent-item-when-inserting-a-child-to-the-treelist-when-bound-to-hierarchical-data)

### Get the Parent Item When Inserting a Child to the TreeList When Bound To Flat Data

#### Step by step Explanations

1. Create a custom `Add` command in the `TreeListCommandColumn`.
1. Pass the `TreeListCommandEventsArgs` object to the handler.
1. Use the [TreeList state]({%slug treelist-state%}) and its `InsertedItem` field.


````CSHTML
@using Telerik.DataSource;

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Popup"
                 IdField="Id"
                 ParentIdField="ParentId"
                 Pageable="true"
                 Width="850px"
                 Height="400px"
                 @ref="@TreeListRef">
    <TreeListColumns>
        <TreeListCommandColumn Width="100px">
            <TreeListCommandButton Command="MyAdd" 
                                   OnClick="@( (TreeListCommandEventArgs args) => AddItem(args) )"
                                   Icon="@IconName.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@IconName.Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@IconName.Save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@IconName.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" />
        <TreeListColumn Field="ParentId" Width="120px">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as Employee;
                    Employee parent = Data.Where(x => x.Id == CurrentlyEditedEmployee.ParentId).FirstOrDefault();
                    <label>@parent.Name</label>
                }
            </EditorTemplate>
        </TreeListColumn>
        <TreeListColumn Field="EmailAddress" Width="120px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    public void AddItem(TreeListCommandEventArgs args)
    {
        var parentId = (args.Item as Employee).ParentId;
        Employee itemToInsert = new Employee();
        itemToInsert.ParentId = parentId;
        var state = new TreeListState<Employee>();
        state.InsertedItem = itemToInsert;

        TreeListRef?.SetState(state);
    }

    public List<Employee> Data { get; set; }
    public Employee CurrentlyEditedEmployee { get; set; }

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

### Get the Parent Item When Inserting a Child to the TreeList When Bound To Hierarchical Data

#### Step by step Explanations

1. Create a custom `Add` command in the `TreeListCommandColumn`.
1. Pass the `TreeListCommandEventsArgs` object to the handler.
1. Set the `ParentItem` field of the [TreeList state]({%slug treelist-state%}) to the item received from the `TreeListCommandEventsArgs`.
1. Use the TreeList state and its `InsertedItem` field.


````CSHTML
<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" 
                 Width="850px" 
                 @ref="@TreeListRef">
    <TreeListColumns>
        <TreeListCommandColumn Width="100px">
            <TreeListCommandButton Command="MyAdd"
                                   OnClick="@( (TreeListCommandEventArgs args) => AddItem(args) )"
                                   Icon="@IconName.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@IconName.Edit">Edit</TreeListCommandButton>
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
    TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    void AddItem(TreeListCommandEventArgs args)
    {
        var state = new TreeListState<Employee>();
        var itemToInsert = new Employee();
        itemToInsert.ParentData = $"Parent: {(args.Item as Employee).Name}";
        state.ParentItem = args.Item as Employee;
        state.InsertedItem = itemToInsert;

        TreeListRef?.SetState(state);
    }

    public List<Employee> Data { get; set; }

    // sample model

    public class Employee
    {
        // hierarchical data collections
        public List<Employee> DirectReports { get; set; }

        public string ParentData { get; set; }

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