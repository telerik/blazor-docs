---
title: How to Programmatically Expand or Collapse TreeList Nodes
description: Learn how to programmatically expand or collapse nodes in a Telerik TreeList for Blazor by utilizing the TreeList state management.
type: how-to
page_title: How to Programmatically Expand or Collapse TreeList Nodes
slug: treelist-kb-expand-nodes-programmatically
tags: treelist, expand, collapse
res_type: kb
ticketid: 1663716, 1649445, 1548181
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

In the Telerik TreeList for Blazor, I load the TreeList in a collapsed mode. I need to programmatically expand and collapse a specific node programmatically.

This KB article also answers the following questions:
- How can I control the expanded state of TreeList nodes in code?
- Is it possible to expand a TreeList node without user interaction?
- What approach should I take to programmatically adjust the visibility of TreeList nodes?

## Solution

To control the expanded or collapsed state of items in the TreeList programmatically, utilize the TreeList State. The state management feature allows for the adjustment of item visibility through code.

Below is an example demonstrating how to use the TreeList State to expand or collapse items programmatically:

````CSHTML
@using Telerik.DataSource;

<div>
    <span>
        <TelerikButton OnClick="@SetTreeListExpandedItems">Expand/Collapse All Items</TelerikButton>
    </span>
</div>
<br />
<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 OnStateInit="((TreeListStateEventArgs<Employee> args) => OnStateInitHandler(args))"
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    private async Task OnStateInitHandler(TreeListStateEventArgs<Employee> args)
    {
        var collapsedItemsState = new TreeListState<Employee>()
            {
                //collapse all items in the TreeList upon initialization of the state
                ExpandedItems = new List<Employee>()
            };

        args.TreeListState = collapsedItemsState;
    }

    private async Task SetTreeListExpandedItems()
    {
        if (!(TreeListRef.GetState().ExpandedItems.Any()))
        {
            List<Employee> toExpand = new List<Employee>();
            foreach (Employee item in Data)
            {
                toExpand.Add(item);
                if (item.DirectReports.Any())
                {
                    foreach (Employee child in item.DirectReports)
                    {
                        toExpand.Add(child);
                    }
                }
            }
            var expandedState = new TreeListState<Employee>()
                {
                    ExpandedItems = new List<Employee>(toExpand)
                };
            await TreeListRef.SetStateAsync(expandedState);
        }
        else
        {
            var expandedState = new TreeListState<Employee>()
                {
                    ExpandedItems = new List<Employee>()
                };
            await TreeListRef.SetStateAsync(expandedState);
        }

    }

    private List<Employee> Data { get; set; }

    public class Employee
    {
        public List<Employee> DirectReports { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    private async Task<List<Employee>> GetTreeListData()
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

## See Also

- [TreeList State Documentation]({%slug treelist-state%})
- [TreeList Overview]({%slug treelist-overview%})
