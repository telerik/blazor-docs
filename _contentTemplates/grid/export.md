#export-common-notes





* With Client-side Blazor (WebAssembly), all the code runs in the browser and, at the time of writing, is considerably slower than server-side Blazor, and it only has one actual thread. This means that while the file is being generated, the UI will be unresponsive, so you may want to show a loading sign to the user through the `OnClick` handler of the command button, something like:

````RAZOR.skip-repl Component
@* Exporting a lot of rows can be slow in a WebAssembly app more so than in a server-side app, and it blocks the UI *@
        
<TelerikGrid Data="@GridData" AutoGenerateColumns="true" Pageable="true">
    <GridToolBarTemplate>
        <GridCommandButton OnClick="@ShowLoadingSign" Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
        <GridCommandButton OnClick="@ShowLoadingSign" Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
    </GridToolBarTemplate>
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
````
#end
 