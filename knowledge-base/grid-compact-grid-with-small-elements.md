---
title: Make Compact Grid Elements Smaller
description: How to make all elements in a Compact Grid smaller.
type: how-to
page_title: How to Make Compact Grid Elements Smaller
slug: grid-compact-grid-with-small-elements
position: 
tags: telerik, blazor, grid, compact, elements
ticketid: 1650305
res_type: kb
---

# Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I am using [the Grid sizing feature]({%slug grid-sizing%}) and my Grid is a Compact Grid. I want to reduce the size of all elements in the Grid. How can I:
* Change the size of all icons in the Grid?
* Set smaller font size to all elements in the Grid?

## Solution

1. Set [the Grid `Class` parameter]({%slug grid-overview%}#grid-parameters) to a custom CSS class. This allows you to target specific Grid instance.
1. Use the defined class to [override the theme styles]({%slug themes-override%}).
1. Set the required CSS styles to the desired elements in the Grid.

>caption Change Blazor Grid Elements Styles

````CSHTML
<div class="demo-grid-container">
    <div class="demo-small-grid">
        <TelerikGrid Size="@ThemeConstants.Grid.Size.Small"
                     Data="@GridData"
                     Sortable="true"
                     PageSize="10"
                     Pageable="true"
                     Resizable="true"
                     Height="410px"
                     FilterMode="@GridFilterMode.FilterRow"
                     EditMode="@GridEditMode.Inline"
                     OnUpdate="@MyOnUpdateHandler"
                     Class="small-grid">
            <GridToolBarTemplate>
                <span>Small Grid Size</span>
                <span class="k-toolbar-spacer"></span>
                <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
            </GridToolBarTemplate>
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="120px" />
                <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" Width="120px" />
                <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" Width="190px" />
                <GridColumn Field="@nameof(Product.Discontinued)" Width="100px" />
                <GridCommandColumn Width="80px">
                    <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
                    <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Update</GridCommandButton>
                    <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
        </TelerikGrid>
    </div>
    <div class="demo-default-grid">
        <TelerikGrid Data="@GridData"
                     Sortable="true"
                     PageSize="10"
                     Pageable="true"
                     Resizable="true"
                     Height="410px"
                     FilterMode="@GridFilterMode.FilterRow"
                     EditMode="@GridEditMode.Inline"
                     OnUpdate="@MyOnUpdateHandler">
            <GridToolBarTemplate>
                <span>Default Grid Size</span>
                <span class="k-toolbar-spacer"></span>
                <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
            </GridToolBarTemplate>
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="120px" />
                <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" Width="120px" />
                <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" Width="190px" />
                <GridColumn Field="@nameof(Product.Discontinued)" Width="100px" />
                <GridCommandColumn Width="80px">
                    <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
                    <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Update</GridCommandButton>
                    <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
        </TelerikGrid>
    </div>
</div>

<TelerikMediaQuery Media="(max-width: 960px)" OnChange="@(matchesQuery => OnMediaQueryChange(matchesQuery, screenIsSmall: true))" />
<TelerikMediaQuery Media="(min-width: 961px)" OnChange="@(matchesQuery => OnMediaQueryChange(matchesQuery, screenIsSmall: false))" />

<style>
    /* reduce the size of the icons */
    .small-grid .k-svg-icon
    /* or you can target specific icons
        .small-grid .k-svg-i-filter */ {
        width: 10px !important;
        height: 10px !important;
    }

    /* reduce the size of the button icons */
    .small-grid .k-button-icon {
        min-width: 0px !important;
    }

    /* reduce the font size of the grid elements */
    .small-grid .k-table-sm,
    .small-grid .k-grid-pager,
    .small-grid .k-button-flat,
    .small-grid .k-toolbar-sm,
    .small-grid .k-button-solid-base {
        font-size: x-small !important;
    }

    /* handle positioning of both grids */
    .demo-grid-container {
        display: flex;
        flex-direction: @(ScreenIsSmall ? "column" : "row");
        flex-wrap: nowrap;
        gap: 1.5em;
    }

    .demo-small-grid,
    .demo-default-grid {
        display: contents;
    }

        .demo-small-grid .k-grid,
        .demo-default-grid .k-grid {
            width: @(ScreenIsSmall ? "100%" : "49%");
        }
</style>

@code {
    private bool ScreenIsSmall { get; set; }

    private void OnMediaQueryChange(bool matchesQuery, bool screenIsSmall)
    {
        if (matchesQuery && ScreenIsSmall != screenIsSmall)
        {
            ScreenIsSmall = screenIsSmall;
        }
    }

    private List<Product> GridData { get; set; }

    private async Task MyOnUpdateHandler(GridCommandEventArgs args)
    {
        Product theUpdatedItem = (Product)args.Item;
        await MyService.Update(theUpdatedItem);
        await GetGridData();
    }

    private async Task GetGridData()
    {
        GridData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public static class MyService
    {
        private static List<Product> _data { get; set; } = new List<Product>();

        public static async Task<List<Product>> Read()
        {
            if (_data.Count < 1)
            {
                var rnd = new Random();
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new Product()
                        {
                            Id = i,
                            Name = "Product name " + i,
                            Price = (decimal)(rnd.Next(1, 50) * 3.14),
                            Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                            Discontinued = i % 5 == 0
                        });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Product itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }
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

## See Also

* [Compact Grid]({%slug grid-sizing%})
* [Customize CSS Theme Styles]({%slug themes-override%})
