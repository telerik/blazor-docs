---
title: How to Expand Parent Nodes to Show Filtered Children
description: Learn how to expand TreeList parent nodes after filtering, to display the filtered child nodes.
type: how-to
slug: treelist-kb-expand-parent-nodes-filtering
tags: telerik, blazor, treelist, filter, expand, parent, child, children
ticketid: 1715942
res_type: kb
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

This KB shows how to expand parent nodes in the TreeList, to display their child nodes returned after filtering.  

## Solution

1. Implement a `FilterCellTemplate` and add a TextBox component to it. 
2. Handle the `ValueChanged` event of the TextBox and implement logic that walks the full tree, finds matches, and collects their ancestors.
3. Set `state.ExpandedItems` to the list of ancestors, and call `SetStateAsync()`.
4. Use the `OnStateChanged` event to detect when the user expands/collapses a parent node, so that you can restore the parent's state after the filter is cleared. 

>caption Expand parent nodes after filtering their children

````RAZOR
<TelerikTreeList @ref="TreeListRef"
                 Data="@Locations"
                 ItemsField="@nameof(Location.Children)"
                 FilterMode="TreeListFilterMode.FilterRow"
                 OnStateChanged="@((TreeListStateEventArgs<Location> args) => OnStateChanged(args))">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Location.Name)" Title="Name" Expandable="true" Width="300px">
            <FilterCellTemplate Context="filterCtx">
                <TelerikTextBox Value="@filterText"
                               ValueChanged="@((string v) => OnFilterChanged(v, filterCtx))"
                               AutoComplete="off"
                               Placeholder="Search…" />
                @if (!string.IsNullOrEmpty(filterText))
                {
                    <TelerikButton Icon="@FontIcon.FilterClear" OnClick="@(() => OnFilterChanged(string.Empty, filterCtx))" />
                }
            </FilterCellTemplate>
        </TreeListColumn>
        <TreeListColumn Field="@nameof(Location.Country)" Title="Country" Width="150px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Location> TreeListRef = null!;
    private string filterText = string.Empty;
    // Tracks which items the user manually expanded, so that they can keep their state after clearing the filter.
    private HashSet<Location> userExpandedItems = new();
    private List<Location> Locations { get; set; } = new();

    protected override void OnInitialized()
    {
        Locations = new List<Location>
        {
            new Location { Id = 1, Name = "Asia", Country = "", Children = new()
            {
                new Location { Id = 2, Name = "Japan", Country = "JP", Children = new()
                {
                    new Location { Id = 3, Name = "Tokyo", Country = "JP" },
                    new Location { Id = 4, Name = "Osaka", Country = "JP" },
                    new Location { Id = 5, Name = "Kyoto", Country = "JP" }
                }},
                new Location { Id = 6, Name = "China", Country = "CN", Children = new()
                {
                    new Location { Id = 7, Name = "Beijing", Country = "CN" },
                    new Location { Id = 8, Name = "Shanghai", Country = "CN" }
                }},
                new Location { Id = 9, Name = "India", Country = "IN", Children = new()
                {
                    new Location { Id = 10, Name = "Mumbai", Country = "IN" },
                    new Location { Id = 11, Name = "Delhi", Country = "IN" }
                }}
            }},
            new Location { Id = 12, Name = "Europe", Country = "", Children = new()
            {
                new Location { Id = 13, Name = "Germany", Country = "DE", Children = new()
                {
                    new Location { Id = 14, Name = "Berlin", Country = "DE" },
                    new Location { Id = 15, Name = "Munich", Country = "DE" }
                }},
                new Location { Id = 16, Name = "France", Country = "FR", Children = new()
                {
                    new Location { Id = 17, Name = "Paris", Country = "FR" },
                    new Location { Id = 18, Name = "Lyon", Country = "FR" }
                }}
            }},
            new Location { Id = 19, Name = "Americas", Country = "", Children = new()
            {
                new Location { Id = 20, Name = "United States", Country = "US", Children = new()
                {
                    new Location { Id = 21, Name = "New York", Country = "US" },
                    new Location { Id = 22, Name = "Los Angeles", Country = "US" }
                }},
                new Location { Id = 23, Name = "Brazil", Country = "BR", Children = new()
                {
                    new Location { Id = 24, Name = "São Paulo", Country = "BR" },
                    new Location { Id = 25, Name = "Rio de Janeiro", Country = "BR" }
                }}
            }}
        };
    }

    private async Task OnFilterChanged(string newValue, FilterCellTemplateContext filterCtx)
    {
        filterText = newValue;

        // Push the value into the TreeList's built-in filter pipeline.
        var descriptor = filterCtx.FilterDescriptor.FilterDescriptors
            .OfType<FilterDescriptor>()
            .FirstOrDefault();

        if (descriptor != null)
        {
            descriptor.Value = string.IsNullOrEmpty(newValue) ? null : (object)newValue;
            descriptor.Operator = FilterOperator.Contains;
        }
        await filterCtx.FilterAsync();

        // Now update expansion via state.
        var state = TreeListRef.GetState();

        if (string.IsNullOrEmpty(newValue))
        {
            // Restore user's manual expansion when the filter is cleared.
            state.ExpandedItems = userExpandedItems.ToList();
        }
        else
        {
            var ancestorsToExpand = new HashSet<Location>();
            foreach (var root in Locations)
                CollectAncestorsOfMatches(root, newValue, ancestorsToExpand);

            state.ExpandedItems = ancestorsToExpand.ToList();
        }

        await TreeListRef.SetStateAsync(state);
    }

    private void OnStateChanged(TreeListStateEventArgs<Location> args)
    {
        // Keep `userExpandedItems` in sync with manual expand/collapse,
        // but only when no filter is active (during filtering, expansion is driven by us).
        if (string.IsNullOrEmpty(filterText))
        {
            userExpandedItems = args.TreeListState.ExpandedItems?.ToHashSet() ?? new();
        }
    }

    /// <summary>
    /// Recursively walks the subtree. Returns true if this node or any descendant
    /// matches the filter. Adds any node that has a matching descendant to <paramref name="ancestors"/>
    /// so it will be expanded.
    /// </summary>
    private bool CollectAncestorsOfMatches(Location node, string filter, HashSet<Location> ancestors)
    {
        bool selfMatches = node.Name.Contains(filter, StringComparison.OrdinalIgnoreCase);

        bool anyChildMatches = false;
        if (node.Children != null)
        {
            foreach (var child in node.Children)
            {
                if (CollectAncestorsOfMatches(child, filter, ancestors))
                    anyChildMatches = true;
            }
        }

        if (anyChildMatches)
            ancestors.Add(node);

        return selfMatches || anyChildMatches;
    }

    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public List<Location>? Children { get; set; }
    }
}
````

## See Also

* [TreeList State Documentation](slug:treelist-state)
* [TreeList Filtering](slug:treelist-filtering)
* [TreeList Overview](slug:treelist-overview)
