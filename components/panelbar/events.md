---
title: Events
page_title: PanelBar - Events
description: Events of the PanelBar for Blazor.
slug: panelbar-events
tags: telerik,blazor,panelbar,events
published: True
position: 20
---

# PanelBar Events

This article explains the events available in the Telerik TreeView for Blazor:

* [OnItemClick](#onitemclick)
* [ExpandedItemsChanged](#expandeditemschanged)
* [OnItemRender](#onitemrender)

## OnItemClick

The `OnItemClick` event fires when the user clicks (or presses `Enter`) on an node (item) of the PanelBar. You can use this event to react on user clicking on a node. 

The event handler receives a `PanelBarItemClickEventArgs` object which provides the model of the clicked node in the `Item` field that you can cast to your model type.

If that item has children the `OnItemClick` event will fire before the `ExpandedItemsChanged` event.

>caption Handle OnItemClick to react to user click action.

````CSHTML
@* Use the OnItemClick event to react to the user click action. *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items" OnItemClick="@OnItemClickHandler">
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    private void OnItemClickHandler(PanelBarItemClickEventArgs args)
    {
        Console.WriteLine($"The clicked item is: {(args.Item as PanelBarItem).Text}");
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
            Text = "Company",
            ParentId = null,
            HasChildren = false,
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Contact us",
            ParentId = null,
            HasChildren = true,
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Email",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "LinkedIn",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Audio",
            ParentId = null,
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

## ExpandedItemsChanged

The `ExpandedItemsChanged` event fires when the user expands or collapses a node (item) in the PanelBar.

>caption Handle the ExpandedItemsChanged events

````CSHTML
<div style="width: 30%;">
    <TelerikPanelBar Data="@Items" ExpandedItems="@ExpandedItems" ExpandedItemsChanged="@ExpandedItemsChanged">
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    private void ExpandedItemsChanged(IEnumerable<object> expandedItems)
    {
        ExpandedItems = expandedItems;
        // If the value of the ExpandedItems is not set in the event handler, essentially the event will be cancelled. 
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
            Text = "Company",
            ParentId = null,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Contact us",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Email",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "LinkedIn",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "ѝ",
            ParentId = null,
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

## OnItemRender

The `OnItemRender` event fires upon rendering the nodes of the PanelBar. It receives an argument of type `PanelBarItemRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.

* `Class` - the CSS class that will be applied to the item's main element. The CSS rules that are set for that class will be visibly rendered on the PanelBar node.

If the item that is customized has children, they will also inherit the styles applied in the CSS class passed to the `Class` parameter.

````CSHTML
@* Customize the entire item using CSS rules and appropriate selectors *@

<style>
    .customized-panelbar-item,
    .k-panelbar-toggle.k-icon,
    .customized-panelbar-item.k-item .k-link,
    .customized-panelbar-item.k-item .k-link.k-state-selected,
    .customized-panelbar-item.k-item .k-link.k-state-selected:hover {
        background-color: blue;
        color: white;
        text-decoration: underline;
    }
</style>

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items" OnItemRender="@OnItemRenderHandler">
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    private void OnItemRenderHandler(PanelBarItemRenderEventArgs args)
    {
        PanelBarItem item = args.Item as PanelBarItem;

        if(item.Text == "Contact us")
        {
            args.Class = "customized-panelbar-item";
        }
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
            Text = "Company",
            ParentId = null,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Contact us",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Email",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "LinkedIn",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Settings",
            ParentId = null,
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
