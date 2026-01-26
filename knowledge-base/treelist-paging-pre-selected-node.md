---
title: How to Initially Display the Page with a Pre-Selected Node in TreeList
description: Learn how to ensure a pre-selected node is visible by automatically navigating to its page in a Telerik TreeList with pagination enabled.
type: how-to
page_title: Navigate to Page Containing Pre-Selected Node in TreeList
meta_title: Navigate to Page Containing Pre-Selected Node in TreeList
slug: treelist-kb-paging-pre-selected-node
tags: treelist, paging, pre-selected, node, navigation, page, size, blazor
res_type: kb
ticketid: 1690423
components: ["treelist"]
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

I have a Telerik [TreeList](slug:treelist-overview) with a checkbox for selection and pagination enabled. I pre-select a node programmatically and need the TreeList to automatically navigate to the page containing the first selected node.

## Solution

To automatically show the page that contains the first pre-selected node in your Telerik TreeList with paging enabled, you need to programmatically set the TreeList's `Page` property based on the index of the selected node in your data.

1. Identify the index of the first selected node in your data source.
2. Use the PageSize to determine on which page the node appears.
3. Assign the calculated page number to the TreeList's Page parameter before rendering.

````Razor
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedEmployees"
                 Pageable="true"
                 @bind-PageSize="@PageSize"
                 @bind-Page="@CurrentPage">
    <TreeListColumns>
        <TreeListCheckboxColumn Width="50px" />
        <TreeListColumn Field="@nameof(Employee.FirstName)" Title="First Name" Width="350px" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" />
        <TreeListColumn Field="@nameof(Employee.Position)" Title="Position" Width="200px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> TreeListData { get; set; } = new();
    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();
    private int PageSize = 10;
    private int CurrentPage = 1;

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 59; i++)
        {
            TreeListData.Add(new Employee()
            {
                Id = i,
                ParentId = i <= 3 ? null : i % 3 + 1,
                FirstName = "First " + i,
                LastName = "Last " + i,
                Position = i <= 3 ? "Team Lead" : "Software Engineer"
            });
        }

        SelectedEmployees = new List<Employee>() { TreeListData.ElementAt(2) };

        var selectedId = SelectedEmployees.FirstOrDefault()?.Id;
        if (selectedId != null)
        {
            // Step 1: Flatten the tree as it would appear expanded
            var flatList = new List<Employee>();
            foreach (var root in TreeListData.Where(e => e.ParentId == null))
            {
                FlattenHierarchy(root, flatList);
            }

            // Step 2: Find index of selected item in flattened list
            var index = flatList.FindIndex(e => e.Id == selectedId);
            if (index >= 0)
            {
                CurrentPage = (index / PageSize) + 1;
            }
        }
    }

    private void FlattenHierarchy(Employee node, List<Employee> result)
    {
        result.Add(node);
        var children = TreeListData.Where(e => e.ParentId == node.Id);
        foreach (var child in children)
        {
            FlattenHierarchy(child, result);
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
````

## See Also

* [TreeList Overview](slug:treelist-overview)
* [TreeList Paging](slug:treelist-paging)
