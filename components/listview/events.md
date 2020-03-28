---
title: Events
page_title: ListView for Blazor | Events
description: Events in the ListView for Blazor
slug: listview-events
tags: telerik,blazor,listview,events
published: true
position: 20
---

# ListView Events

This article explains the events available in the Telerik ListView for Blazor:

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Read Event](#read-event) - event related to obtaining data
* [PageChanged](#pagechanged)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when the want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [ListView Editing]({%slug listview-editing%}) article.


## Read Event

In the common case, you provide all the data to the listview's Data collection and the listview performs paging on it for you. In some cases you may want to do this with your own code (for example, to retrieve only a small number of items in order to improve the backend performance). You can do this by attaching to the `OnRead` event where you can perform all the data read operations in the listview. You can read more about it in the [Manual Data Source Operations]({%slug listview-manual-operations%}) article.


## PageChanged

The event fires when the user pages the listview. If you will be providing the `Page` index in your own code, you would usually use two-way binding (`@bind-Page="@MyPageIndex"`), but when using its `Changed` event, the framework does not allow two-way binding, so you must update such a variable in your own event handler. Otherwise, the next time the listview renders, it will go back to the original page.

>caption Handle the PageChanged event

````CSHTML
@result

<TelerikListView Data="@ListViewData" Pageable="true" PageChanged="@PageChangedHandler">
    <Template>
        <h6>@context.Name</h6>
    </Template>
</TelerikListView>

@code{
    string result { get; set; }
    async Task PageChangedHandler(int currPageIndex)
    {
        result = $"The user is now on page {currPageIndex}";
    }

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````


## See Also

* [ListView Overview]({%slug listview-overview%})
