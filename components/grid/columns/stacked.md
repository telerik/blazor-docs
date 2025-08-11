---
title: Stacked
page_title: Grid - Stacked Columns
description: How to adapt the Grid on small screens and display the values of one data item vertically instead of horizontally.
slug: grid-columns-stacked
tags: telerik,blazor,grid,column,stacked
published: true
position: 37
---

# Stacked Columns

Stacked columns is an adaptive Grid feature that allows the component to display data item values vertically in one or more cards, instead of horizontally in classic table cells. This facilitates browsing the Grid data on narrow screens like mobile phones in portrait orientation.

The Grid stacked columns functionality depends on three configuraton settings:

* The [`DataLayoutMode` parameter](#data-layout-mode) of the Grid.
* The [`ColumnsCount` parameter](#stacked-columns-count) of `<GridStackedLayoutSettings>`.
* The [`Width` parameter](#stacked-columns-width) of each `<GridStackedLayoutColumn>`.

Only the `DataLayoutMode` parameter is required to use stacked Grid columns.

## Data Layout Mode

The show stacked Grid columns, set the `DataLayoutMode` component parameter to `GridDataLayoutMode.Stacked`. The default parameter value is `GridDataLayoutMode.Columns`.

>caption Enable stacked columns in the Grid

````RAZOR.skip-repl
<TelerikGrid DataLayoutMode="@GridDataLayoutMode.Stacked" />
````

## Stacked Columns Count

`ColumnsCount` is a an optional parameter of `<GridStackedLayoutSettings>`, which is a child tag of `<GridSettings>`. The `ColumnsCount` parameter sets how many stacked columns will show. The default value is `1`, which means that all data row values will display one below the other in a single column.

When using multiple stacked columns, the data row values are arranged first horizontally and then vertically. The following code snippet uses 2 stacked columns, so that the odd columns (`Name`, `Quantity` and `IsActive`) display in the first stacked column, while the even columns (`Price`, `StartDate`, and the command buttons) display in the second stacked column.

>caption Display 2 stacked columns in the Grid

````RAZOR.skip-repl
<TelerikGrid DataLayoutMode="@GridDataLayoutMode.Stacked">
    <GridSettings>
        <GridStackedLayoutSettings ColumnsCount="2" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
        <GridColumn Field="@nameof(Product.StartDate)" />
        <GridColumn Field="@nameof(Product.IsActive)" />
        <GridCommandColumn>
            <GridCommandButton />
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>
````

## Stacked Columns Width

An optional `<GridStackedLayoutColumns>` tag inside `<GridStackedLayoutSettings>` allows you to define custom `Width` for each stacked column (`<GridStackedLayoutColumn>`) when there is more than one. The default width value is `"1fr"`, which means one equal fraction of the available horizontal space. The stacked Grid columns use the [CSS Grid concept](https://css-tricks.com/snippets/css/complete-guide-grid/) for HTML rendering.

> When using `<GridStackedLayoutColumn>` instances, the number of these tags must match the `ColumnsCount` value.

The code snippet below uses 3 stacked columns. The first one is twice as wide as the others.

>caption Set custom widths to the stacked Grid columns

````RAZOR.skip-repl
<GridStackedLayoutSettings ColumnsCount="3">
    <GridStackedLayoutColumns>
        <GridStackedLayoutColumn Width="2fr" />
        <GridStackedLayoutColumn Width="1fr" />
        <GridStackedLayoutColumn Width="1fr" />
    </GridStackedLayoutColumns>
</GridStackedLayoutSettings>

````

## Integration with Other Features

When the Grid is in `Stacked` data layout mode, it does not render column headers. As a result, column features like sorting, filtering, grouping, locking are not available through the classic Grid UI. Instead, use [ToolBar command tools](slug:components/grid/features/toolbar#command-tools) to enable the same functionality through different UI.

Hierarchy relies on an expand/collapse button, which is below the stacked table row content.

## Example

The following sample shows how to:

* Enable and disable column stacking, depending on the viewport width.
* Display 1 or 2 stacked columns, depending on the viewport width.
* Render ToolBar tools for column operations only when the Grid is in `Stacked` data layout mode.

>caption Using stacked data layout mode in the Blazor Grid

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikMediaQuery Media="(min-width:1200px)" OnChange="@( (bool matches) => IsLargeScreen = matches )" />
<TelerikMediaQuery Media="(min-width:800px)" OnChange="@( (bool matches) => IsMediumScreen = matches )" />
<TelerikMediaQuery Media="(max-width:500px)" OnChange="@( (bool matches) => IsSmallScreen = matches )" />

<TelerikGrid Data="@GridData"
             DataLayoutMode="@( IsLargeScreen ? GridDataLayoutMode.Columns : GridDataLayoutMode.Stacked )"
             FilterMode="@GridFilterMode.FilterMenu"
             EditMode="@GridEditMode.Inline"
             Groupable="true"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@GridSelectedItems"
             ShowColumnMenu="true"
             Sortable="true"
             Height="90vh">
    <GridSettings>
        <GridStackedLayoutSettings ColumnsCount="@GridStackedColumnsCount" />
        <GridToolBarSettings OverflowMode="@GridToolBarOverflowMode.Scroll" />
    </GridSettings>
    <GridToolBar>
        <GridToolBarAddTool>Add</GridToolBarAddTool>
        @if (!IsLargeScreen)
        {
            <GridToolBarSelectAllTool Text="Select&nbsp;All" />
            <GridToolBarSortTool>Sort</GridToolBarSortTool>
            <GridToolBarFilterTool>Filter</GridToolBarFilterTool>
            <GridToolBarColumnChooserTool>Columns</GridToolBarColumnChooserTool>
            <GridToolBarGroupTool>Group</GridToolBarGroupTool>
        }
    </GridToolBar>
    <GridColumns>
        <GridCheckboxColumn />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.StartDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.IsActive)" />
        <GridCommandColumn Width="120px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil" />
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true" />
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true" />
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate>
        <div style="padding:0.5em 0;">DetailTemplate for @context.Name</div>
    </DetailTemplate>
</TelerikGrid>

@code {
    private int GridStackedColumnsCount => IsSmallScreen ? 1 : 2;

    private List<Product> GridData { get; set; } = new();
    private IEnumerable<Product> GridSelectedItems { get; set; } = new List<Product>();

    private bool IsLargeScreen { get; set; }
    private bool IsMediumScreen { get; set; }
    private bool IsSmallScreen { get; set; }

    private int LastId { get; set; }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        createdItem.Id = ++LastId;

        GridData.Insert(0, createdItem);
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;
        var originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Product {LastId}",
                Price = Random.Shared.Next(0, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 10000),
                StartDate = DateTime.Now.AddDays(-Random.Shared.Next(60, 1000)),
                IsActive = LastId % 2 != 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        [Required]
        public DateTime? StartDate { get; set; } = DateTime.Today;
        public bool IsActive { get; set; }
    }
}
````

## See also

* [Live demo: Adaptive Grid](https://demos.telerik.com/blazor-ui/grid/adaptive)
* [Live demo: Grid and MediaQuery Integration](https://demos.telerik.com/blazor-ui/mediaquery/grid-integration)
