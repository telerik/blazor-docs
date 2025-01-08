---
title: Pager on top of the Grid and ToolBar at the bottom
description: How to place Pager on top of the Grid and ToolBar at the bottom
type: how-to
page_title: Pager on top of the Grid and ToolBar at the bottom
slug: grid-kb-pager-top-toolbar-bottom
position: 
tags: grid, pager, top, toolbar, bottom
ticketid: 1561699
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I want to move the Pager on top of the Grid and have a Toolbar with some action buttons at the bottom. How to achieve this?

How to move Pager on top of the Grid?
How to move Toolbar at the bottom of the Grid?

## Solution

The Grid Toolbar is placed on top of the Grid and Pager at the bottom. You can follow the feature requests about controlling the position of the [Toolbar](https://feedback.telerik.com/blazor/1502828-allow-changing-the-position-of-the-grid-toolbar) and the [Pager](https://feedback.telerik.com/blazor/1561750-ability-to-control-pager-position).

For the time being, this scenario can be handled with a custom approach.

It is possible to integrate a separate [Pager component](slug://pager-overview) in the [Grid Toolbar](slug://components/grid/features/toolbar) - [this demo](https://demos.telerik.com/blazor-ui/pager/integration) demonstrates how it can be achieved. This will suffice if you do not need to use the Toolbar for other content.

If, however, you also want to have a Toolbar for some actions, do the following:

* [Integrate Pager in the Grid Toolbar on top of the Grid](https://demos.telerik.com/blazor-ui/pager/integration)
* Hide the built-in Pager at the bottom of the Grid with custom CSS
* Add a container below the Grid to serve as a Toolbar - place your desired custom Toolbar actions in it
* Add the "k-toolbar" and "k-grid-toolbar" classes to this container to inherit the Grid Toolbar styles
* Add your custom class as well, so you can target this container and style it separately from the built-in Toolbar if needed

````RAZOR
<style>
    .k-grid-toolbar {
        padding: 0;
    }

    .k-grid-toolbar .k-pager-wrap {
        border: 0;
        flex-grow: 1;
    }

    .k-grid-pager {
        display: none;
    }

    .custom-toolbar.k-toolbar.k-grid-toolbar {
        padding: 8px;
        border: 1px solid rgba(0,0,0,0.08);
        border-top: none;
    }
</style>

<TelerikGrid Data="@GridData"
             Pageable="true"
             @bind-Page="@CurrentPage"
             PageSize="@PageSize">
    <GridToolBarTemplate>
        <TelerikPager Total="@GridData.Count()" @bind-Page="@CurrentPage" PageSize="@PageSize" />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
    </GridColumns>
</TelerikGrid>

<div class="custom-toolbar k-toolbar k-grid-toolbar">
    @*custom add button*@
    <TelerikButton>Add</TelerikButton>

    @*some custom action button*@
    <TelerikButton>Custom action</TelerikButton>

    @*spacer*@
    <span class="k-toolbar-spacer"></span>

    @*custom SearchBox*@
    <TelerikTextBox @bind-Value="TBValue" PlaceHolder="Search..."></TelerikTextBox>
</div>

@code {
    List<Product> GridData { get; set; }
    int CurrentPage { get; set; } = 1;
    int PageSize { get; set; } = 10;
    string TBValue { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
            {
                Id = x,
                Name = "Product name " + x,
                Price = (decimal)(x * 3.14),
                Released = DateTime.Now.AddMonths(-x).Date,
                Discontinued = x % 5 == 0
            }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Notes

The downside of the listed approach is that you will not be able to use built-in Grid actions in the custom toolbar container as it is not essentially part of the Grid (for example, [`Add` Command Button](slug://components/grid/columns/command#the-gridcommandbutton-tag), [SearchBox](slug://grid-searchbox)).

To handle this, you may proceed with a custom approach:

* `Add` Command Button - use a [`TelerikButton`](slug://components/button/overview) instead. Handle its [`OnClick`](slug://button-events#onclick) to programmatically [initiate inserting of an item through the Grid State](slug://grid-kb-add-edit-state).

* SearchBox - Use [TelerikTextBox](slug://components/textbox/overview) instead. Handle its [`ValueChanged`](slug://components/textbox/events#valuechanged) or [`OnChange`](slug://components/textbox/events#onchange) event to create [custom filter descriptors](slug://grid-kb-search-numeric-fields).
