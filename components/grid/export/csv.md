---
title: CSV
page_title: Grid - CSV Export
description: Export to CSV the Grid for Blazor.
slug: grid-export-csv
tags: telerik,blazor,grid,export,csv
published: True
position: 1
---

# CSV Export

You can export the grid to CSV with a click of a button. The current filter, sort, page, grouping and column order are applied to the `.csv` document.

When you click the Export button, your browser will receive the resulting file.


## Basics

To enable the grid CSV Export, add a [command button]({%slug components/grid/columns/command%}) with the `CsvExport` command name to the [toolbar]({%slug components/grid/features/toolbar%}).

````
<GridToolBar>
    <GridCommandButton Command="CsvExport" Icon="@IconName.FileCsv">Export to CSV</GridCommandButton>
</GridToolBar>
````

Optionally, you can also set the `GridCsvExport` tag settings under the `GridExport` tag to choose:

* `FileName` - the name of the file. The grid will add the `.csv` extension for you.
* `AllPages` - whether to export the current page only, or the entire data from the data source.

>caption Export the Grid to CSV - Example

````CSHTML
@* You can sort, group, filter, page the grid, reorder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBar>
        <GridCommandButton Command="CsvExport" Icon="@IconName.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" />
    </GridColumns>
</TelerikGrid>

@code {
    List<SampleData> GridData { get; set; }
    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            FirstReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````

## Notes

The CSV export has the following specifics:

* Column widths are not applied because a CSV document does not have such a concept. You can use any units in the grid itself, they will not be reflected in the exported document. If you need to add such structure, consider [exporting to an Excel file]({%slug grid-export-excel%}).

@[template](/_contentTemplates/grid/export.md#export-common-notes)

## See Also

  * [Live Demo: Grid CSV Export](https://demos.telerik.com/blazor-ui/grid/export-csv)
   
