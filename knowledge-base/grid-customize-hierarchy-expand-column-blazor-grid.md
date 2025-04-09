---
title: Hide, Reorder, Lock or Resize the Grid Hierarchy Expand/Collapse Column
description: Learn how to hide, reorder, lock (freeze), resize, or customize (set a title) the hierarchy expand/collapse column of the Telerik Blazor Grid.
type: how-to
page_title: How to Hide, Reorder, Lock or Resize the Grid Hierarchy Expand/Collapse Column
slug: grid-kb-customize-hierarchy-expand-column-blazor-grid
tags: blazor, grid, hierarchy, expand, collapse, column
res_type: kb
ticketid: 1658470, 1642380, 1638466, 1635003, 1630238, 1684240
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

* Can I change the position of the hierarchy expand/collapse column?
* Is it possible to lock/freeze the expand column for a hierarchical grid?
* Can I add a title to the hierarchy expand/collapse column?
* How can I change the width of the expand column in a hierarchical Grid?
* How to hide the Grid hierarchy expand/collapse column?
* How to expand the Grid detail template with a link in the data row, instead of using the plus icon sign?

## Solution

By default, the hierarchy expand/collapse column in the Telerik UI for Blazor [Grid](slug:grid-overview) is not declared in the markup like the other data-bound columns. It renders automatically when a `DetailTemplate` is added to the Grid. At the time of writing (UI for Blazor **8.1.1**), this built-in hierarchy expand/collapse column does not support being locked or other common configurations like managing its position, setting its width, or adding a title.

>tip Vote for and follow the [feature request for the Grid to support controlling the position of the expand column](https://feedback.telerik.com/blazor/1647135-ability-to-control-the-position-of-the-expand-column-in-a-hierarchical-grid).

To customize the hierarchy expand/collapse column, follow these steps:

1. Hide the default hierarchy expand column using [custom CSS](slug:themes-override).
2. Add another [column with a template](slug:grid-templates-column) for expanding and collapsing the detail templates through the [Grid state](slug:components/grid/features/hierarchy#expand-rows-from-code).
3. Do not set `Field` for the column, so the data operations for this column (filtering, sorting, etc.) are disabled.
4. Toggle the icon in the custom hierarchy expand column based on the item's expanded state.
5. Configure the custom hierarchy expand column. For example, set its order in the `GridColumns` declaration or enable the `ColumnMenu` to lock the column.

>caption Using a custom Grid hierarchy expand/collapse column

````RAZOR
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Sortable="true"
             ShowColumnMenu="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Class="no-default-hierarchy-column"
             Width="600px">
    <GridSettings>
        <GridColumnMenuSettings ShowColumnChooser="false" />
    </GridSettings>
    <DetailTemplate>
        @{
            var employee = (MainModel)context;

            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize" DisplayFormat="{0:c2}"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(MainModel.Id)" Width="60px"></GridColumn>
        <GridColumn Field="@nameof(MainModel.Name)">
            <Template>
                @{
                    var dataItem = (MainModel)context;
                }
                <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Link"
                               ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                               OnClick="@( () => OnButtonClick(dataItem) )">@dataItem.Name</TelerikButton>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(MainModel.Address)"></GridColumn>
        <GridColumn Field="@nameof(MainModel.Email)"></GridColumn>
        <GridColumn Width="60px">
            <Template>
                @{
                    var dataItem = (MainModel)context;
                }
                <TelerikButton Icon="@GetButtonIcon(dataItem)"
                               FillMode="@Telerik.Blazor.ThemeConstants.Button.FillMode.Flat"
                               OnClick="@( () => OnButtonClick(dataItem) )" />
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<style>
    /* shrink the hierarchy column - do not hide it completely */
    .no-default-hierarchy-column .k-hierarchy-col {
        width: 0;
    }
    /* hide everything in the hierarchy column */
    .no-default-hierarchy-column .k-hierarchy-cell * {
        display: none;
    }
</style>

@code {
    private TelerikGrid<MainModel>? GridRef { get; set; }

    private List<MainModel> GridData { get; set; } = new List<MainModel>();

    private async Task OnButtonClick(MainModel dataItem)
    {
        var gridState = GridRef!.GetState();

        if (gridState.ExpandedItems.Contains(dataItem))
        {
            gridState.ExpandedItems.Remove(dataItem);
        }
        else
        {
            gridState.ExpandedItems.Add(dataItem);
        }

        await GridRef.SetStateAsync(gridState);
    }

    private ISvgIcon GetButtonIcon(MainModel dataItem)
    {
        var gridState = GridRef!.GetState();

        return GetButtonIcon(gridState.ExpandedItems.Contains(dataItem));
    }

    private ISvgIcon GetButtonIcon(bool isExpanded)
    {
        if (isExpanded)
        {
            return SvgIcon.Minus;
        }
        else
        {
            return SvgIcon.Plus;
        }
    }

    protected override void OnInitialized()
    {
        GridData = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}", Address = $"Address {i}", Email = $"example{i}@mail.com" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailModel { OrderId = x, DealSize = Random.Shared.Next(100, 10000) }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<DetailModel> Orders { get; set; } = new();

        //override the Equals() method of the Grid model to ensure the items are properly expanded in case their references are changed
        public override bool Equals(object? obj)
        {
            return obj is MainModel && ((MainModel)obj).Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    public class DetailModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}
````

## See Also

* [Telerik Blazor Grid - Overview](slug:grid-overview)
* [Telerik Blazor Grid - Column Templates](slug:grid-templates-column)
* [Telerik Blazor Grid - Hierarchy](slug:components/grid/features/hierarchy)
* [Telerik Documentation - Styling and Themes](slug:themes-override)
