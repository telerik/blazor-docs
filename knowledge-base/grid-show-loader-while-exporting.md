---
title: Showing a Loader While Exporting the Grid
description: Learn how to display a LoaderContainer over the Blazor Grid while it is exporting the items to Excel, CSV or PDF.
type: how-to
page_title: How to Show a Loader While Exporting the Grid
slug: grid-kb-show-loader-while-exporting
tags: grid, blazor, loader, loadercontainer, export, excel, csv, pdf
res_type: kb
ticketid: 
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

I have many items in the Grid and the export to Excel, CSV or PDF takes a while. Is it possible to show a loader while the Grid is exporting to prevent the user from interacting with the component during this time?

## Solution

To display a loader over the Grid during the Excel, CSV or PDF export, follow the steps below:

1. Choose the deired UI for the Loader (this article shows the first two options): 
    1. A [LoaderContainer](slug:loadercontainer-overview). Place the LoaderContainer component in a container together with the Grid and add `position:relative` style on this container to ensure the LoaderContainer covers only the Grid.
    1. A modal [Window](slug:window-overview) with a [Loader](slug:loader-overview) component inside.
    1. Your custom loader.
1. Handle the [`OnBeforeExport` event](slug:grid-export-events#onbeforeexport) of the Grid to show the loader (set the loader's visibility to `true`).
1. Handle the [`OnAfterExport` event](slug:grid-export-events#onafterexport) of the Grid to hide the loader (set the loader's visibility to `false`).

>caption Show a Loader during Grid export

````RAZOR
@* Option 1.1. - a LoaderContainer *@

<div style="position:relative">

    <TelerikGrid Data="@GridData" AutoGenerateColumns="true" Pageable="true">
        <GridToolBarTemplate>
            <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
            <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
        </GridToolBarTemplate>

        <GridExport>
            <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnExcelBeforeExport" OnAfterExport="@OnExcelAfterExport" />
        </GridExport>

    </TelerikGrid>

    <TelerikLoaderContainer Visible="@isExporting" Text="Please wait, the file is loading..."/>
</div>

@* Option 1.2. - a modal Window with a Loader component inside. *@

@* <TelerikWindow @bind-Visible="@isExporting" Modal="true">
    <WindowTitle>Please wait...</WindowTitle>
    <WindowContent>
        <TelerikLoader Visible="@true"/>
                       We are exporting your data, your file will download shortly.
    </WindowContent>
</TelerikWindow> *@

@code {
    private bool isExporting { get; set; }

    private bool ExportAllPages { get; set; } = true;

    private List<SampleData> GridData { get; set; }

    private async Task OnExcelBeforeExport(GridBeforeExcelExportEventArgs args)
    {
        isExporting = true;

        // Release the UI thread so the loading indicator can be rendered
        await Task.Delay(1);
    }

    private async Task OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
       isExporting = false;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100000).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = $"Product {x}",
                UnitsInStock = x * 2,
                Price = 3.14159m * x,
                Discontinued = x % 4 == 0,
            }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
    }
}
````


## See Also

* [Grid Export Overview](slug:grid-export-overview)
* [Grid Export to CSV](slug:grid-export-csv)
* [Grid Export to Excel](slug:grid-export-excel)
* [Grid Export to PDF](slug:grid-export-pdf)
* [Grid Export Events](slug:grid-export-events)
