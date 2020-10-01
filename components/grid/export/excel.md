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
        <label><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
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

* `bool` fields are exported as `TRUE` or `FALSE` strings, because there is no boolean data type in Excel and these string values are the most common ones used in data and macros.

* Date and number formats are exported with the following format: `mm/dd/yyyy hh:mm:ss` plus the current app culture AM/PM specifier for dates, and `Convert.ToDouble(value)` for numbers (which uses the current thread culture). The Excel date formats are different than .NET date formats and Excel may not always recognize the column as dates, for example, if the entire date format from the .NET culture is used.

* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in e Field in the model, or create your own excel file (see example <a href="https://feedback.telerik.com/blazor/1485764-customize-the-excel-file-before-it-gets-to-the-client" target="_blank">here</a>).

* Only columns that have a `Field` set are exported.

* Excel does not understand units different than `px` for the column `Width`, and if you use them (such as `rem` or `%`), it will fail to parse them and will render a collapsed (hidden) column with zero width.

* If you are using the `OnRead` event, only the current page of data will be exported, because that's all the grid has at the time of the export action.

* With Server-side Blazor, the file may become larger than the default SignalR connection limit, and this can disconnect the client and result in an error. Generally, this requires quite a lot of data to happen, but you may need to increase the size limit of the connection in the `ConfigureServices` method of your `Startup.cs` file, for example:

    **C#**
    
            services.AddServerSideBlazor().AddHubOptions(o =>
            {
                o.MaximumReceiveMessageSize = 1024 * 1024; // 1MB
            });

* With Client-side Blazor (WebAssembly), all the code runs in the browser and, at the time of writing, is considerably slower than server-side Blazor, and it only has one actual thread. This means that while the file is being generated, the UI will be unresponsive, so you may want to show a loading sign to the user through the `OnClick` handler of the command button, something like:

    **Component**
    
        @* Exporting a lot of rows can be slow in a WebAssembly app more so than in a server-side app, and it blocks the UI *@
        
        <TelerikGrid Data="@GridData" AutoGenerateColumns="true" Pageable="true">
            <GridToolBar>
                <GridCommandButton OnClick="@ShowLoadingSign" Command="ExcelExport" Icon="@IconName.FileExcel">Export to Excel</GridCommandButton>
            </GridToolBar>
            <GridExport>
                <GridExcelExport AllPages="true" FileName="telerik-grid-export" />
            </GridExport>
        </TelerikGrid>
        
        <TelerikWindow Visible="@isExporting" Modal="true">
            <WindowTitle>Please wait...</WindowTitle>
            <WindowContent>We are exporting your data, your file will download shortly.</WindowContent>
        </TelerikWindow>
        
        @code {
            bool isExporting { get; set; }
        
            async Task ShowLoadingSign()
            {
                isExporting = true;
                StateHasChanged();
                // This won't work for server-side Blazor, the UI will render immediately after the delay and the loading sign will only flicker
                await Task.Delay(50);
                isExporting = false;
            }
        
            List<SampleData> GridData { get; set; }
        
            protected override void OnInitialized()
            {
                GridData = Enumerable.Range(1, 1000).Select(x => new SampleData
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


## See Also

  * [Live Demo: Grid Excel Export](https://demos.telerik.com/blazor-ui/grid/export-excel)
   
