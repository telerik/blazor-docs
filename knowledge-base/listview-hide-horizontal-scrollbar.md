---
title: Hiding the Horizontal Scrollbar in ListView for Blazor
description: This article describes how to hide the horizontal scrollbar in TelerikListView for Blazor by using custom CSS.
type: how-to
page_title: How to Hide Horizontal Scrollbar in TelerikListView for Blazor
slug: listview-kb-hide-horizontal-scrollbar
tags: scrollbar, listview, blazor
res_type: kb
ticketid: 1673222
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListView for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

In certain scenarios, it may be necessary to hide the horizontal scrollbar of the ListView component to improve the UI experience, especially when the ListView content is fully visible and does not require scrolling. 

This knowledge base article also answers the following questions:

- How can I remove the horizontal scrollbar from a ListView component?
- What CSS can hide the horizontal overflow in TelerikListView for Blazor?
- Is there a way to ensure elements within ListView do not cause a horizontal scrollbar?

## Solution

To hide the horizontal scrollbar in a TelerikListView, apply custom CSS to set the overflow property of the ListView content wrapper to hidden. This approach ensures that the horizontal scrollbar is hidden, regardless of the content width. Implement the CSS rule as shown below:

> To maintain full visibility of the ListView elements without needing a scrollbar, ensure that the elements' width within the ListView does not exceed the ListView's width. You might need to adjust the width of the ListView or its elements accordingly:

````RAZOR
<TelerikListView Data="@ListViewData"
                 Width="700px"
                 Pageable="true"
                 PageSize="5"
                 Class="my-listview">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="k-card k-card-horizontal" style="width:750px">
            <h4>@context.Name</h4>
        </div>
    </Template>
</TelerikListView>

<style>
    .my-listview .k-listview-content {
        overflow-x: hidden;
    }
</style>

@code {
    private List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 25).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

## See Also

- [ListView Overview](slug:listview-overview)
