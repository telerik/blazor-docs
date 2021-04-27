---
title: Events
page_title: TreeList - Events
description: Events of the treelist for Blazor.
slug: treelist-events
tags: telerik,blazor,treelist,events
published: True
position: 100
---

# TreeList Events

This article explains the events available in the Telerik TreeList for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Other Events](#other-events) - other events the treelist provides
    * [OnExpand and OnCollapse](#onexpand-and-oncollapse)
	* [Command Button Click](#command-button-click)
	* [SelectedItemsChanged](#selecteditemschanged)
	* [OnRowRender](#onrowrender)
	* [OnRowDrop](#onrowdrop)
	* [PageChanged](#pagechanged)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when they want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Editing Overview]({%slug treelist-editing-overview%}) article.

## Other Events

### OnExpand and OnCollapse

The `OnExpand` event fires when the user clicks the expand arrow on a row that has children but they are collapsed. It receives arguments of type `TreeListExpandEventArgs<T>` where `T` is the model you bind the treelist to, and the `Item` field in the event arguments is the current model.


You can use `OnExpand` to know the user action and/or to [load data on demand]({%slug treelist-data-binding-load-on-demand%}).

The `OnCollapse` event fires when the user collapses an expanded row through the collapse arrow. It receives arguments of type `TreeListCollapseEventArgs<T>` where `T` is the model you bind the treelist to, and the `Item` field in the event arguments is the current model.

>caption Handle OnExpand and OnCollapse

````CSHTML
@lastAction

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"

                 OnExpand="@((TreeListExpandEventArgs<Employee> args) => OnExpand(args))"
                 OnCollapse="@((TreeListCollapseEventArgs<Employee> args) => OnCollapse(args))"

                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    string lastAction { get; set; }

    // get when the user expands an item
    async Task OnExpand(TreeListExpandEventArgs<Employee> args)
    {
        Employee currRow = args.Item;
        lastAction = $"The user expanded {currRow.Name} with ID {currRow.Id}";
    }

    // get when the user collapses an item
    async Task OnCollapse(TreeListCollapseEventArgs<Employee> args)
    {
        Employee currRow = args.Item;
        lastAction = $"The user collapsed {currRow.Name} with ID {currRow.Id}";
    }

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


### Command Button Click

The command buttons of a treelist provide an `OnClick` event before firing their built-in command (such as opening a row for editing, or adding a new row). You can do this to implement some additional logic and to also handle custom commands - both from a [Command Column]({%slug treelist-columns-command%}), and from a [Toolbar Button]({%slug treelist-toolbar%}).

### SelectedItemsChanged

Fires when the item selection is enabled and the user changes the selected [item]({%slug treelist-selection-single%}#selecteditemschanged-event) or [items]({%slug treelist-selection-multiple%}#selecteditemschanged-event).

### OnRowRender

This event fires upon the rendering of the TreeList rows. It receives an argument of type `TreeListRowRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.
* `Class` - the CSS class that will be applied to the rows of the TreeList. The CSS rules that are set for that class will be visibly rendered on the TreeList rows.

>caption Use the OnRowRender event to apply custom format to TreeList rows based on certain condition

````CSHTML
@* Conditional styling/formatting for a row *@

<style>
    .myCustomTreeListRowFormatting {
        background-color: blue;
        color: white;
        font-size: 10px;
        font-weight: bolder;
    }
</style>

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px" OnRowRender="@OnRowRenderHandler">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" Visible="false" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    void OnRowRenderHandler(TreeListRowRenderEventArgs args)
    {
        var item = args.Item as Employee;

        if (item.Id.Equals(3))
        {
            args.Class = "myCustomTreeListRowFormatting";
        }
    }

    public List<Employee> Data { get; set; }

    public class Employee
    {
        public List<Employee> DirectReports { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

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
                DirectReports = new List<Employee>()
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
                    DirectReports = new List<Employee>(),
                };
                root.DirectReports.Add(firstLevelChild);
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

>caption The result from the code snippet above

![](images/treelist-onrowrender-event-example.png)

### OnRowDrop

The `OnRowDrop` event fires when the user drags and drops rows in the TreeList or between TreeLists. You can read more on setting it up and using the TreeList row dragging feature in the [Row Drag and Drop]({%slug treelist-drag-drop-overview%}) article.

### PageChanged

The event fires when the user pages the treelist.

````CSHTML
@result

<TelerikTreeList Data="@Data"
                 Pageable="true" PageChanged="@PageChangedHandler"
                 IdField="Id" ParentIdField="ParentId"
                 Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="300px"></TreeListColumn>
        <TreeListColumn Field="Id"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    string result { get; set; }
    async Task PageChangedHandler(int currPage)
    {
        result = $"the user is now on page {currPage}. Note - the indexes are 1-based, not 0-based";
    }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample models and data generation

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}"
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child of {i}"
                });

                for (int k = 3; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child of {i} and {currId}"
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

## See Also

  * [TreeList Overview]({%slug treelist-overview%})
  * [TreeList Column Events]({%slug treelist-column-events%})
  * [TreeList Editing Overview]({%slug treelist-editing-overview%})
  
