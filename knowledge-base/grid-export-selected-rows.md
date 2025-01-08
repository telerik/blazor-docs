---
title: Export Selected Grid Rows
description: Example on how to export the selected Grid rows to Excel or CSV.
type: how-to
page_title: Export Selected Grid Items
slug: grid-kb-export-selected-rows
position: 
tags: telerik, blazor, grid, export
ticketid: 1589536, 1589039, 1575904, 1557007, 1530512, 1523318, 1520996, 1510436
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

How to export to Excel only the selected rows in a Blazor Grid?

How to export only the Grid rows that the user selected?

How to export the selected items from the Grid?

How to export custom Grid data (for example the Grid selection) to CSV?

## Solution

1. Configure [Grid selection](slug://grid-selection-overview) via the `SelectionMode` and `SelectedItems` parameters.
1. Configure [Grid Excel export](slug://grid-export-excel) or [Grid CSV export](slug://grid-export-csv) via command buttons, for example in the [`<GridToolBarTemplate>`](slug://components/grid/features/toolbar).
1. Subscribe to the [`OnBeforeExport` event](slug://grid-export-events) in `<GridExcelExport>` or `<GridCsvExport>`.
1. In the `OnBeforeExport` handler, set the `Data` property of the event argument object to the Grid `SelectedItems` collection.

>caption Export only the selected Grid rows to Excel or CSV

````RAZOR
<TelerikGrid Data="@GridData"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@GridSelectedItems">
    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport"
                           Icon="@SvgIcon.FileExcel">Export Selection to Excel</GridCommandButton>
        <GridCommandButton Command="CsvExport"
                           Icon="@SvgIcon.FileCsv">Export Selection to CSV</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridExcelExport OnBeforeExport="@OnBeforeGridExcelExport" FileName="grid-selection" />
        <GridCsvExport OnBeforeExport="@OnBeforeGridCsvExport" FileName="grid-selection" />
    </GridSettings>
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" />
        <GridColumn Field="@nameof(GridItem.Id)" />
        <GridColumn Field="@nameof(GridItem.Text)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<GridItem> GridData { get; set; }

    private IEnumerable<GridItem> GridSelectedItems { get; set; } = new List<GridItem>();

    private void OnBeforeGridExcelExport(GridBeforeExcelExportEventArgs args)
    {
        if (GridSelectedItems.Count() > 0)
        {
            args.Data = GridSelectedItems;
        }
        else
        {
            args.IsCancelled = true;
        }
    }

    private void OnBeforeGridCsvExport(GridBeforeCsvExportEventArgs args)
    {
        if (GridSelectedItems.Count() > 0)
        {
            args.Data = GridSelectedItems;
        }
        else
        {
            args.IsCancelled = true;
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();

        for (int i = 1; i <= 7; i++)
        {
            GridData.Add(new GridItem()
            {
                Id = i,
                Text = $"Row {i}"
            });
        }
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Grid Excel Export](slug://grid-export-excel)
* [Grid CSV Export](slug://grid-export-csv)
* [Grid Export Events](slug://grid-export-events)
* [Grid Selection](slug://grid-selection-overview)
* [Grid ToolBar](slug://components/grid/features/toolbar)
