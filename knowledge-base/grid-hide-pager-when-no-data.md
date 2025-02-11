---
title: Hide Grid Pager When Data is Null or Empty
description: How to remove or hide the Grid pagination section when there are no available records?
type: how-to
page_title: Hide the Grid Pager When the Data is Null or Empty
slug: grid-kb-hide-pager-when-no-data
position: 
tags: telerik, blazor, grid, treelist, paging, css
ticketid: 1632919
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to remove or hide the Grid pagination section when there are no available records?
* How to disable Grid paging when the data source is null or empty?
* How to make the value of the pager input (`PagerInputType.Input`) zero when the Grid has no data?


## Solution

The following information applies to the Grid and TreeList. The two components reuse CSS classes and styles.

When `Pageable="true"`, the Grid renders a pager at all times, no matter how many items the component shows.

If there are no items, the Grid pager will show "Page 1 of 0" and "0 - 0 of 0 items".

When the Grid has no items, you can hide the pager or some pager elements in two ways:

* Enable and disable [`Pageable`](slug:components/grid/features/paging) conditionally.
* Apply a CSS `Class` conditionally and use it to [hide parts of the pager or the whole pager](slug:themes-override).

The following example demonstrates both options.

>caption Hide Grid Pager conditionally

````RAZOR
<TelerikButton OnClick="@ToggleGridData"
               ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Toggle Grid Data
</TelerikButton>

<h2>Hide Pager with Pageable</h2>

<TelerikGrid Data="@GridData"
             Pageable="@GridHasData"
             PageSize="3"
             AutoGenerateColumns="true"
             Height="160px" />

<h2>Hide Pager with Class</h2>

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="3"
             AutoGenerateColumns="true"
             Class="@( GridHasData ? string.Empty : "no-pager" )"
             Height="160px" />

<style>
    .no-pager > .k-grid-pager {
        display: none;
    }
</style>

<h2>Hide Pager Textbox with Class</h2>

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="3"
             AutoGenerateColumns="true"
             Class="@( GridHasData ? string.Empty : "no-pager-input" )"
             Height="160px">
    <GridSettings>
        <GridPagerSettings InputType="@PagerInputType.Input" />
    </GridSettings>
</TelerikGrid>

<style>
    .no-pager-input > .k-grid-pager .k-pager-input {
        display: none;
    }
</style>

<h2>Hide Pager Label with Class</h2>

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="3"
             AutoGenerateColumns="true"
             Class="@( GridHasData ? string.Empty : "no-pager-info" )"
             Height="160px" />

<style>
    .no-pager-info > .k-grid-pager .k-pager-info {
        display: none;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    private List<Product> RawData { get; set; } = new();

    private bool GridHasData => GridData != null && GridData.Count > 0;

    private void ToggleGridData()
    {
        GridData = GridData.Count > 0 ? new List<Product>() : RawData;
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 5; i++)
        {
            RawData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Stock = rnd.Next(0, 50)
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
````


## See Also

* [Grid Paging](slug:components/grid/features/paging)
* [TreeList Paging](slug:treelist-paging)
* [Customize Telerik Blazor Components with CSS](slug:themes-override)
