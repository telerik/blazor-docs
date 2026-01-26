---
title: Events
page_title: PanelBar - Events
description: Events of the PanelBar for Blazor.
slug: panelbar-events
tags: telerik,blazor,panelbar,events
published: True
position: 25
components: ["panelbar"]
---
# PanelBar Events

This article explains the events available in the Telerik TreeView for Blazor:

* [OnItemClick](#onitemclick)
* [ExpandedItemsChanged](#expandeditemschanged)
* [OnItemRender](#onitemrender)
* [OnExpand and OnCollapse](#onexpand-and-oncollapse)

## OnItemClick

The `OnItemClick` event fires when the user clicks (or presses `Enter`) on an node (item) of the PanelBar. You can use this event to react on user clicking on a node. 

The event handler receives a `PanelBarItemClickEventArgs` object which provides the model of the clicked node in the `Item` field that you can cast to your model type.

If that item has children the `OnItemClick` event will fire before the `ExpandedItemsChanged` event.

>caption Handle OnItemClick to react to user click action.

````RAZOR
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

````RAZOR
@* Use the ExpandedItemsChanged to respond to the user expanding or collapsing items in the PanelBar *@

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

        Console.WriteLine($"The ExpandedItemsChanged event fired with {ExpandedItems.Count()} items.");
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
            Text = "Products",
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

````RAZOR
@* Customize the entire item using CSS rules and appropriate selectors *@

<style>
    .customized-panelbar-item,
    .k-panelbar-toggle.k-icon,
    .customized-panelbar-item.k-item .k-link,
    .customized-panelbar-item.k-item .k-link.k-selected,
    .customized-panelbar-item.k-item .k-link.k-selected:hover {
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

## OnExpand and OnCollapse

The `OnExpand` and `OnCollapse` events fire when the user tries to expand/collapse an item, but *before* the actual action takes place.

The `OnExpand` handler receives an argument of type `PanelBarExpandEventArgs`.

The `OnCollapse` handler receives an argument of type `PanelBarCollapseEventArgs`.

Both event arguments expose an `Item` and `IsCancelled` properties. To cancel each event, set `args.IsCancelled` to `true`. In this case, the item will gain focus and selection, but its state will remain unchanged.

>caption PanelBar OnExpand and OnCollapse Events

````RAZOR
<TelerikPanelBar Data="@PanelBarItems"
                 OnExpand="@OnPanelBarExpand"
                 OnCollapse="@OnPanelBarCollapse">
</TelerikPanelBar>

@code {
    private List<PanelBarItem> PanelBarItems { get; set; }

    private async Task OnPanelBarExpand(PanelBarExpandEventArgs args)
    {
        Console.WriteLine($"The expanded item is: {(args.Item as PanelBarItem).Text}");

        // to prevent the event
        //args.IsCancelled = true;
    }

    private async Task OnPanelBarCollapse(PanelBarCollapseEventArgs args)
    {
        Console.WriteLine($"The collapsed item is: {(args.Item as PanelBarItem).Text}");
    }

    protected override void OnInitialized()
    {
        PanelBarItems = LoadFlatData();

        base.OnInitialized();
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

  * [PanelBar Overview](slug:panelbar-overview)
