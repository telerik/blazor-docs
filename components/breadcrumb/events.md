---
title: Events
page_title: Breadcrumb Events
description: Events of the Breadcrumb for Blazor.
slug: breadcrumb-events
tags: telerik,blazor,breadcrumb,events
published: True
position: 30
---


# Events

This article explains the events available in the Telerik Breadcrumb for Blazor:

* [OnClick](#onclick)

## OnClick

The `OnClick` event fires when the user clicks or taps on a Breadcrumb item. It receives object of type `BreadcrumbItemClickEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the clicked data item.
* `IsCancelled` - specifies whether the event is canceled and the built-in action is prevented.

You can use the `OnClick` event to react to user choices in a Breadcrumb without using navigation to load new content automatically.

>caption Handle OnClick

````CSHTML
@* Handle the OnClick event of the Breadcrumb *@

Last clicked item: @ClickedItem?.Text

<TelerikBreadcrumb Data="@Items" OnItemClick="@ClickHandler">
</TelerikBreadcrumb>

@code {

    public BreadcrumbItem ClickedItem { get; set; }

    void ClickHandler(BreadcrumbItemClickEventArgs args)
    {
        ClickedItem = args.Item as BreadcrumbItem;

        if (ClickedItem.Text == "Item3")
        {
            args.IsCancelled = true;            
        }
    }

    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
    {
            new BreadcrumbItem { Text = "Item1" },
            new BreadcrumbItem { Text = "Item2" },
            new BreadcrumbItem { Text = "Item3" },
            new BreadcrumbItem { Text = "Item4" },
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
    }
}
````


## See Also

* [Templates]({%slug components/menu/templates%})
