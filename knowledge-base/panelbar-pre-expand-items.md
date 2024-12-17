---
title: Pre-Expanding PanelBar Items in Blazor on Initialization
description: Learn how to pre-expand PanelBar items with child items when initializing the component in a Blazor application.
type: how-to
page_title: How to Pre-Expand PanelBar Items with Child Items in Blazor
slug: panelbar-kb-pre-expand-items
tags: panelbar, blazor, expandeditems
res_type: kb
ticketid: 1673208
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>PanelBar for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

In a Blazor application, it is often required to have specific PanelBar items pre-expanded when the component is initially loaded. This might include PanelBar items that contain child items. Achieving this behavior enhances user navigation and usability by directly showcasing important or frequently accessed items. 

This knowledge base article also answers the following questions:

- How can I set PanelBar items to be expanded on initial load in Blazor?
- What is the method to pre-expand PanelBar items with child items?
- How to use the `ExpandedItems` collection for PanelBar in Blazor?

## Solution

To pre-expand PanelBar items that contain child items upon initialization, modify the `ExpandedItems` collection within the [`OnInitialized()` method](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.componentbase.oninitialized?view=aspnetcore-9.0). The `ExpandedItems` property is responsible for controlling which PanelBar items are expanded or collapsed. By specifying the items that should be initially expanded in this collection, the desired items will be expanded when the PanelBar is first rendered.

Here is an example illustrating how to implement this approach:

````RAZOR
<div style="width: 30%;">
    <TelerikPanelBar Data="@Items"
                     @bind-ExpandedItems="@ExpandedItems">
    </TelerikPanelBar>
</div>

@code {
    private List<PanelBarItem> Items { get; set; }
    private IEnumerable<object> ExpandedItems { get; set; } = Enumerable.Empty<object>();

    protected override void OnInitialized()
    {
        Items = LoadFlatData();
        // Specify the items to be expanded by adding them to the ExpandedItems collection
        ExpandedItems = new List<object>() { Items[0], Items[1] };
        base.OnInitialized();
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        // Define your PanelBar items and their hierarchy here
        items.Add(new PanelBarItem
            {
                Id = 1,
                Text = "Parent 1",
                ParentId = null,
                HasChildren = true
            });

        items.Add(new PanelBarItem
            {
                Id = 2,
                Text = "Parent 2",
                ParentId = null,
                HasChildren = true,
            });

        items.Add(new PanelBarItem
            {
                Id = 3,
                Text = "Child 1 of Parent 2",
                ParentId = 2,
                HasChildren = false
            });

        items.Add(new PanelBarItem
            {
                Id = 4,
                Text = "Child 2 of Parent 2",
                ParentId = 2,
                HasChildren = false
            });

        items.Add(new PanelBarItem
            {
                Id = 5,
                Text = "Child 1 of Parent 1",
                ParentId = 1,
                HasChildren = false
            });

        return items;
    }
   public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }
}
````

## See Also

- [PanelBar Expanded Items]({%slug panelbar-expand-items%})
- [PanelBar Overview]({%slug panelbar-overview%})
