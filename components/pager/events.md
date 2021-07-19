---
title: Events
page_title: Pager - Events
description: Events available in the Telerik Blazor Data Pager component.
slug: pager-events
tags: telerik,blazor,pager,paging,events
published: True
position: 20
---

# Pager Events

This article explains the events available in the Telerik Pager for Blazor:

## PageChanged

The `PageChanged` event fires when a new page is selected. You can use it to implement [load on demand]({%slug pager-overview%}#load-on-demand).

Make sure to update the current page index when using the event.

>caption Handle PageChanged

````CSHTML
<TelerikPager Total="@TotalItems"
              ButtonCount="@ButtonCount"
              PageSize="@ItemsOnPage"
              Page="@CurrentPage"
              PageChanged="@PageChangedHandler">
</TelerikPager>

<div class="text-info">@Result</div>

@code {
    public int TotalItems { get; set; } = 80;
    public int ButtonCount { get; set; } = 4;
    public int ItemsOnPage { get; set; } = 10;
    public int CurrentPage { get; set; } = 2;
    public string Result { get; set; }

    void PageChangedHandler(int newPage)
    {
        CurrentPage = newPage;
        Result = $"Current page: {newPage}";
    }
}
````
>caption The result from the code snippet above

![config of the pager with one-way binding](images/pager-data-binding.gif)

## PageSizeChanged

The `PageSizeChanged` event fires when the user changes the page size via the pager DropDownList. The existence of this event also ensures that the `PageSize` attribute supports two-way binding.

If the user selects the "All" option from the page size DropDownList, the `PageSizeChanged` event will receive the total item count as an argument.

Make sure to update the current page size when using the event.

>caption Handle PageSizeChanged

````CSHTML
<TelerikPager Total="@TotalItems"
              Page="@CurrentPage"
              PageSize="@ItemsOnPage"              
              PageSizeChanged="@PageSizeChangedHandler">
</TelerikPager>

<div class="text-info">@Result</div>

@code {
    public int TotalItems { get; set; } = 80;
    public int ItemsOnPage { get; set; } = 10;
    public int CurrentPage { get; set; } = 2;
    public string Result { get; set; }

    void PageSizeChangedHandler(int newPageSize)
    {
        ItemsOnPage = newPageSize;
        Result = $"Current page size: {newPageSize}";
    }
}
````

## See Also

* [Pager Overview]({%slug pager-overview%})
