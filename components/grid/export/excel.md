---
title: Excel
page_title: Grid - Excel Export
description: Export to Excel the Grid for Blazor.
slug: grid-export-excel
tags: telerik,blazor,grid,export,excel
published: True
position: 1
---

# Excel Export

You can export the grid to Excel with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.


## Basics

To enable the grid Excel Export, add a [command button]({%slug components/grid/columns/command%}) with the `ExcelExport` command name to the [toolbar]({%slug components/grid/features/toolbar%}).

````
<GridToolBar>
    <GridCommandButton Command="ExcelExport" Icon="@IconName.FileExcel">Export to Excel</GridCommandButton>
</GridToolBar>
````

Optionally, you can also set the `GridExcelExport` tag settings under the `GridExport` tag to choose:

* `FileName` - the name of the file. The grid will add the `.xslx` extension for you.
* `AllPages` - whether to export the current page only, or the entire data from the data source.

>caption Export the Grid to Excel - Example

````CSHTML
@* You can sort, group, filter, page the grid, resize and reodrder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true" >

    <GridToolBar>
        <GridCommandButton Command="ExcelExport" Icon="@IconName.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
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

The Excel export has the following specifics:

* Excel does not understand units different than `px` for the column `Width`, and if you use them (such as `rem` or `%`), it will fail to parse them and will render a collapsed (hidden) column with zero width.

@[template](/_contentTemplates/grid/export.md#export-common-notes)


## See Also

  * [Live Demo: Grid Excel Export](https://demos.telerik.com/blazor-ui/grid/export-excel)
   
