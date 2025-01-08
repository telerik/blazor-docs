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

In the Telerik TreeList for Blazor, I load the TreeList in a collapsed mode. I need to programmatically expand and collapse TreeList nodes.

This KB article also answers the following questions:
- How can I control the expanded state of TreeList nodes in code?
- Is it possible to expand a TreeList nodes without user interaction?
- What approach should I take to programmatically adjust the visibility of TreeList nodes?

## Solution

To control the expanded or collapsed state of items in the TreeList programmatically, utilize the TreeList State. The state management feature allows for the adjustment of item visibility through code.

Below is an example demonstrating how to use the TreeList State to expand or collapse items programmatically:

````RAZOR
<div>
    <span>
        <TelerikButton OnClick="@SetTreeListExpandedItems">Expand/Collapse All Items</TelerikButton>
    </span>
</div>
<br />

<TelerikTreeList @ref="TreeListRef"
                 Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 OnStateInit="((TreeListStateEventArgs<Employee> args) => OnStateInitHandler(args))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" Width="320px" />
        <TreeListColumn Field="@nameof(Employee.EmailAddress)" Width="220px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();
    private List<Employee> Data { get; set; }
    private int LastId { get; set; } = 1;

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

    private async Task OnStateInitHandler(TreeListStateEventArgs<Employee> args)
    {
        var collapsedItemsState = new TreeListState<Employee>()
            {
                //collapse all items in the TreeList upon initialization of the state
                ExpandedItems = new List<Employee>()
            };

        args.TreeListState = collapsedItemsState;
    }

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

    public class Employee
    {
        public List<Employee> DirectReports { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

- [TreeList State Documentation](slug://treelist-state)
- [TreeList Overview](slug://treelist-overview)
