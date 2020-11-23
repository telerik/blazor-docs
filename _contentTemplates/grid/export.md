#export-common-notes
* `bool` fields are exported as `TRUE` or `FALSE` strings, because there is no boolean data type in Excel and these string values are the most common ones used in data and macros.

* Date and number formats are exported with the following format: `mm/dd/yyyy hh:mm:ss` plus the current app culture AM/PM specifier for dates, and `Convert.ToDouble(value)` for numbers (which uses the current thread culture). The Excel date formats are different than .NET date formats and Excel may not always recognize the column as dates, for example, if the entire date format from the .NET culture is used.

* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in e Field in the model, or create your own excel file (see example <a href="https://feedback.telerik.com/blazor/1485764-customize-the-excel-file-before-it-gets-to-the-client" target="_blank">here</a>).

* Only columns that have a `Field` set are exported.

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
                <GridCommandButton OnClick="@ShowLoadingSign" Command="CsvExport" Icon="@IconName.FileCsv">Export to CSV</GridCommandButton>
            </GridToolBar>
            <GridExport>
                <GridExcelExport AllPages="true" FileName="telerik-grid-export" />
                <GridCsvExport AllPages="true" FileName="telerik-grid-export" />
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
#end