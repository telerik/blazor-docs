---
title: Events
page_title: Breadcrumb Events
description: Events of the Breadcrumb for Blazor.
slug: breadcrumb-events
tags: telerik,blazor,breadcrumb,events
published: True
position: 30
---


# Breadcrumb Events

This article explains the events available in the Telerik Breadcrumb for Blazor:

* [OnItemClick](#onitemclick)

## OnItemClick

The `OnItemClick` event fires when the user clicks or taps on a Breadcrumb item and before any navigation occurs. It receives object of type `BreadcrumbItemClickEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the clicked data item.
* `IsCancelled` - specifies whether the event is canceled and the built-in action is prevented.

**The event will not fire for the last item and for disabled items.**

You can use the `OnItemClick` event to react to user choices in a Breadcrumb, and load new content without using navigation.

>caption Handle OnItemClick event of the Breadcrumb

````CSHTML
@* Handle the OnItemClick event of the Breadcrumb and cancel it for Item 3*@

@logger

<TelerikBreadcrumb OnItemClick="@ClickHandler"
                   Data="@Items" >
</TelerikBreadcrumb>

@code {
    string logger;

    void ClickHandler(BreadcrumbItemClickEventArgs args)
    {
        var ClickedItem = args.Item as BreadcrumbItem;

        logger = $"User clicked {ClickedItem.Text}";

        if (ClickedItem.Text == "Item 3")
        {
            args.IsCancelled = true;
            logger = $"OnItemClick is cancelled for {ClickedItem.Text}";
        }
    }

    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Text = "Item 1" },
            new BreadcrumbItem { Text = "Item 2" },
            new BreadcrumbItem { Text = "Item 3" },
            new BreadcrumbItem { Text = "Item 4" },
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
    }
}
````


## See Also

* [Live Demo: Breadcrumb Events](https://demos.telerik.com/blazor-ui/breadcrumb/events)
