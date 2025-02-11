---
title: Align Column Headers in Grid Hierarchy
description: How to align column headers in the nested detail template of a hierarchy Grid.
type: how-to
page_title: How to Align Columns Headers at Different Grid Hierarchy Levels
slug: grid-kb-align-columns-hierarchy
position: 
tags: 
ticketid: 1468988, 1522877, 1644195
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

This KB article answers the following questions:

* How to configure a hierarchy Grid and make the `DetailTemplate` Grid column headers align with the master Grid column headers?
* How to define the detail Grid columns, so that they match the master Grid columns?
* How to align the column borders of nested child Grids with the column borders of the parent Grid?

## Solution

The best reason to align Grid column headers across hierarchy levels is when the Grid displays a self-referencing hierarchy. There are two ways to achieve the desired appearance and aligned columns:

* Use a [TreeList component](slug:treelist-overview). It may be a better option than the Grid, because the TreeList supports a random number of hierarchy levels and there is no need to define and configure each level separately. The TreeList uses the same column and column header for each data item property at any level.
* Use a Grid with [additional CSS code](slug:themes-override) to align the columns at all hierarchy levels.

The steps below describe how to align columns when using a Grid hierarchy.

1. Set a [custom CSS `Class`](slug:grid-overview#grid-parameters) to the master (parent) Grid, so that the custom styles do not affect other Grid instances.
1. Use the custom CSS class to:
    1. Remove the padding of the `DetailTemplate` container (`td.k-detail-cell`).
    1. Disable the vertical scrollbar of the Grid data area (`div.k-grid-content`).
    1. Remove the empty space in the Grid header area, which is above the vertical scrollbar (`div.k-grid-header`).
    1. Remove the right border of the detail Grids (`.k-grid`).
1. Set the same column `Width` to the columns from all hierarchy levels, that should align with one another.
1. Set widths to all columns, except the first one of each Grid. This will allow the first column to expand and collapse automatically, depending on the hierarchy level and the available space.
1. If the number of hierarchy levels is greater than two, use [named `context` variables for the Grid `DetailTemplate`](slug:nest-renderfragment).
1. (optional) Remove the header area of the detail Grids. This makes sense only if the detail Grids have no enabled features that rely on column headers, for example, sorting or filtering.

>caption Align the columns in hierarchical grids

````RAZOR
<TelerikGrid Data="@GridData.Where(x => x.ParentId == null)"
             TItem="@GridItem"
             OnStateInit="@OnGridStateInit"
             Class="align-hierarchy">
    <GridToolBarTemplate>
        <label><TelerikCheckBox @bind-Value="@HideDetailHeaders" /> Hide Detail Grid Headers</label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.Text)" />
        <GridColumn Field="@nameof(GridItem.Quantity)"
                    Width="120px" />
        <GridColumn Field="@nameof(GridItem.Date)"
                    Width="260px"
                    DisplayFormat="{0:D}" />
    </GridColumns>
    <DetailTemplate Context="contextLevel1">
        <TelerikGrid Data="@GridData.Where(x => x.ParentId == contextLevel1.Id)">
            <GridColumns>
                <GridColumn Field="@nameof(GridItem.Text)" />
                <GridColumn Field="@nameof(GridItem.Quantity)"
                            Width="120px" />
                <GridColumn Field="@nameof(GridItem.Date)"
                            Width="260px"
                            DisplayFormat="{0:D}" />
            </GridColumns>
            <DetailTemplate Context="contextLevel2">
                <TelerikGrid Data="@GridData.Where(x => x.ParentId == contextLevel2.Id)">
                    <GridColumns>
                        <GridColumn Field="@nameof(GridItem.Text)" />
                        <GridColumn Field="@nameof(GridItem.Quantity)"
                                    Width="120px" />
                        <GridColumn Field="@nameof(GridItem.Date)"
                                    Width="260px"
                                    DisplayFormat="{0:D}" />
                    </GridColumns>
                </TelerikGrid>
            </DetailTemplate>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

<style>
    /* remove the DetailTemplate container padding */
    .align-hierarchy td.k-table-td.k-detail-cell {
        padding: 0;
    }

    /* remove the vertical Grid scrollbars */
    .align-hierarchy .k-grid-content {
        overflow-y: visible;
    }
    /* remove the empty space above the vertical Grid scrollbar */
    .align-hierarchy .k-grid-header {
        padding-inline-end: 0;
    }

    /* remove the detail Grid right border */
    .align-hierarchy .k-grid {
        border-right-width: 0;
    }
</style>

@if (HideDetailHeaders)
{
    <style>
        /* remove the detail Grid column headers */
        .align-hierarchy .k-grid .k-grid-header {
            display: none;
        }
    </style>
}

@code {
    private List<GridItem> GridData { get; set; } = new();

    private bool HideDetailHeaders { get; set; }

    private void OnGridStateInit(GridStateEventArgs<GridItem> args)
    {
        // Expand the master Grid rows automatically
        args.GridState.ExpandedItems = GridData.Where(x => x.ParentId == null).ToList();
    }

    protected override void OnInitialized()
    {
        GridData = LoadFlat();

        base.OnInitialized();
    }

    #region Grid Data Generation

    private const int TreeLevels = 3;
    private int RootItems { get; set; } = 2;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;

    private List<GridItem> LoadFlat()
    {
        List<GridItem> items = new List<GridItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private void PopulateChildren(List<GridItem> items, int? parentId, int level)
    {
        var itemCount = level == 1 ? RootItems : ItemsPerLevel;
        for (int i = 1; i <= itemCount; i++)
        {
            var itemId = IdCounter++;
            items.Add(new GridItem()
            {
                Id = itemId,
                ParentId = parentId,
                Text = $"Level {level} Item {i}",
                Quantity = Random.Shared.Next(0, 1000),
                Date = new DateTime(Random.Shared.Next(2000, 2030), Random.Shared.Next(1, 13), Random.Shared.Next(1, 29))
            });

            if (level < TreeLevels)
            {
                PopulateChildren(items, itemId, level + 1);
            }
        }
    }

    #endregion Grid Data Generation

    public class GridItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
    }
}
````

## See Also

* [Grid Hierarchy](slug:components/grid/features/hierarchy)
* [Using custom CSS with Telerik Blazor components](slug:themes-override)
* [TreeList component documentation](slug:treelist-overview)
