---
title: Make Compact Grid Elements Smaller
description: How to reduce the size of elements and icons in a Compact Grid.
type: how-to
page_title: How to Make Compact Grid Elements Smaller
slug: grid-compact-grid-with-small-elements
position: 
tags: telerik, blazor, grid, compact
ticketid: 1650305
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

I am using the [Grid sizing feature]({%slug grid-sizing%}) and my Grid is a Compact Grid. I want to reduce the size of all elements in the Grid. How can I:
* Change the size of all icons in the Grid?
* Set smaller font size to all elements in the Grid?

## Solution

1. Set the [Grid `Class` parameter]({%slug grid-overview%}#grid-parameters) to a custom CSS class. This allows you to target specific Grid instances.
1. Use the defined class to [override the theme styles]({%slug themes-override%}) of the desired elements in the Grid.

>caption Change Blazor Grid Elements Styles

````CSHTML
<div>
    <div class="demo-small-grid">
        <TelerikGrid Size="@ThemeConstants.Grid.Size.Small"
                     Data="@GridData"
                     Sortable="true"
                     PageSize="5"
                     Pageable="true"
                     Resizable="true"
                     FilterMode="@GridFilterMode.FilterRow"
                     Class="small-grid">
            <GridToolBarTemplate>
                <span>Small Grid Size</span>
                <span class="k-toolbar-spacer"></span>
                <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
            </GridToolBarTemplate>
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
                <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
                <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
                <GridColumn Field="@nameof(Product.Discontinued)" />
                <GridCommandColumn>
                    <GridCommandButton Command="MyOwnCommand" Icon="@SvgIcon.InfoCircle" OnClick="@MyCustomCommandOnClickHandler">My Command</GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
        </TelerikGrid>
    </div>
    <p>@CustomCommandResult</p>
    <div class="demo-default-grid">
        <TelerikGrid Data="@GridData"
                     Sortable="true"
                     PageSize="5"
                     Pageable="true"
                     Resizable="true"
                     FilterMode="@GridFilterMode.FilterRow">
            <GridToolBarTemplate>
                <span>Default Grid Size</span>
                <span class="k-toolbar-spacer"></span>
                <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
            </GridToolBarTemplate>
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
                <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
                <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
                <GridColumn Field="@nameof(Product.Discontinued)" />
                <GridCommandColumn>
                    <GridCommandButton Command="MyOwnCommand" Icon="@SvgIcon.InfoCircle" OnClick="@MyCustomCommandOnClickHandler">My Command</GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
        </TelerikGrid>
    </div>
</div>

<TelerikMediaQuery Media="(max-width: 960px)" OnChange="@(matchesQuery => OnMediaQueryChange(matchesQuery, screenIsSmall: true))" />
<TelerikMediaQuery Media="(min-width: 961px)" OnChange="@(matchesQuery => OnMediaQueryChange(matchesQuery, screenIsSmall: false))" />

<style>
    /* reduce the size of the icons */
    .small-grid .k-button .k-svg-icon
    /* or you can target specific icons
    .small-grid .k-svg-i-filter */ {
        width: 10px;
        height: 10px;
    }

    /* reduce the size of the button icons */
    .small-grid .k-icon-button .k-button-icon {
        min-width: 0px;
    }

    /* reduce the font size of the compact grid */
    :root .small-grid {
        --kendo-font-size: 9px;
    }

    /* handle width of both grids */
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

    private MarkupString CustomCommandResult;

    private List<Product> GridData { get; set; }

    private async Task MyCustomCommandOnClickHandler(GridCommandEventArgs args)
    {
        CustomCommandResult = new MarkupString(CustomCommandResult + string.Format("<br />Custom command triggered for item {0}", ((Product)args.Item).Id));

        Console.WriteLine("The Custom command fired. Please wait for the long operation to finish");
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Price = (decimal)(rnd.Next(1, 50) * 3.14),
                    Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                    Discontinued = i % 5 == 0
                });
        }

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

## See Also

* [Compact Grid]({%slug grid-sizing%})
* [Customize CSS Theme Styles]({%slug themes-override%})
