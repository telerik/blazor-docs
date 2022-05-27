---
title: Expanded Items
page_title: TreeView - Expanded Items
description: Expand Items in the Telerik TreeView.
slug: treeview-expand-items
tags: telerik,blazor,treeview,expand,items
published: True
position: 4
---

# TreeView Expanded Items

The TreeView component allows you to expand multiple items.

In this article:

* [ExpandedItems](#expandeditems)

* [Programmatically Expand and Collapse Items](#programmatically-expand-and-collapse-items)

## ExpandedItems

The PanelBar lets the user expand an item. You can also pre-expand a desired item.

To use the item expansion, use the `ExpandedItems` parameter. It allows two-way binding (@bind-ExpandedItems) and one-way binding + [ExpandedItemsChanged]({%slug panelbar-events%}#expandeditemschanged) event.

The ExpandedItems collection is of type `IEnumerable<object>`.

If the [ExpandMode](#expandmode) is set to `Single` the ExpandedItems collection will contain one item, otherwise it will have a collection of the expanded items.

````CSHTML
@* Get the items the user has expanded. *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items"
                     @bind-ExpandedItems="@ExpandedItems">
    </TelerikPanelBar>
</div>

@if (ExpandedItems.Any())
{
    <ul>
        @foreach (var item in ExpandedItems)
        {
            PanelBarItem currentItem = item as PanelBarItem;

            <li>
                @currentItem.Text
            </li>
        }
    </ul>
}

@code {
    public List<PanelBarItem> Items { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Parent 1",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Parent 2",
            ParentId = null,
            HasChildren = true,
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Child 1 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "Child 2 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Child 1 of Parent 1",
            ParentId = 1,
            HasChildren = false
        });

        return items;
    }

    protected override void OnInitialized()
    {
        Items = LoadFlatData();

        ExpandedItems = new List<object>() { Items[1] };

        base.OnInitialized();
    }
}
````

## Programmatically Expand and Collapse Items

>caption Programmatically expand and collapse items on button click

````CSHTML
@* Use the buttons to programmatically expand and collapse items in the PanelBar *@ 

<TelerikButton OnClick="@ExpandItems">Expand First and Second Item</TelerikButton>
<TelerikButton OnClick="@CollapseItems">Collapse the Expanded Items</TelerikButton>

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items"
                     @bind-ExpandedItems="@ExpandedItems">
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    private void ExpandItems()
    {
        ExpandedItems = new List<object>() { Items[0], Items[1] };
    }

    private void CollapseItems()
    {
        ExpandedItems = new List<object>();
    }

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Parent 1",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Parent 2",
            ParentId = null,
            HasChildren = true,
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Child 1 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "Child 2 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Child 1 of Parent 1",
            ParentId = 1,
            HasChildren = false
        });

        return items;
    }

    protected override void OnInitialized()
    {
        Items = LoadFlatData();


        base.OnInitialized();
    }
}
````

## See Also

* [PanelBar Overview]({%slug panelbar-overview%})
* [PanelBar Data Binding]({%slug panelbar-data-binding-overview%})
* [PanelBar Events]({%slug panelbar-events%})
