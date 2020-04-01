---
title: Pager
page_title: Pager for Blazor | Events
description: Add a page navigation to Blazor application
slug: pager-events
tags: telerik,blazor,pager,paging
published: True
position: 20
---

# Pager Events

This article explains the events available in the Telerik Pager for Blazor:

## PageChanged

The `PageChanged` event fires a new page is selected.

>caption Handle PageChanged

````CSHTML
@*This example showcases the usage of Page and PageChanged in conjunction*@

<TelerikPager Total="TotalItems"
              ButtonCount="ButtonCount"
              PageSize="ItemsOnPage"
              Page="CurrentPage"
              PageChanged="@( (int page) => PageChangedHandler(page)  )">

</TelerikPager>

<div class="text-info">@Result</div>

@code {
    public int TotalItems { get; set; } = 80;
    public int ButtonCount { get; set; } = 4;
    public int ItemsOnPage { get; set; } = 10;
    public int CurrentPage { get; set; } = 2;
    public string Result { get; set; } = String.Empty;

    void PageChangedHandler(int page)
    {
        CurrentPage = page;
        Result = $"Current page: {page}";
    }
}
````
>caption The result from the code snippet above

![config of the pager with one-way binding](images/pager-data-binding.gif)
