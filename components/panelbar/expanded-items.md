---
title: Expanded Items
page_title: PanelBar - Expanded Items
description: Expand Items in the Telerik PanelBar.
slug: panelbar-expand-items
tags: telerik,blazor,panelbar,expand,items
published: True
position: 5
---

# Expanded Items

You can expand a single or multiple items in the Telerik PanelBar.

In this article:

* [ExpandMode](#expandmode)

* [ExpandedItems](#expandeditems)

* [Programmatically Expand and Collapse Items](#programmatically-expand-and-collapse-items)

## ExpandMode

You can use the ExpandMode to allow the user to expand one or more items at a time. To control that set the `ExpandMode` parameter of the `<TelerikPanelBar>` to a member of the `PanelBarExpandMode` enum:

* `Single` - Expands only one item at a time. If you expand a new item the previously expanded item will be collapsed.

* `Multiple` - the default value - Lets you expand more than one item simultaneously. To collapse an expanded item, click it again.

>caption Change the Expand mode of the PanelBar

````CSHMTL
@* Set the Expanded mode of the PanelBar to single *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items"
                     ExpandMode="@PanelBarExpandMode.Single">
    </TelerikPanelBar>
</div>

@code { 
    public List<PanelBarItem> Items { get; set; }

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
<TelerikButton OnClick="@CollapseItems">Collapse the Expanded Item</TelerikButton>

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
