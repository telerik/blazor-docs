---
title: Loading Cyrillic Fonts When Exporting the Grid to PDF
description: How to load Cyrillic fonts when exporting the Blazor Grid to PDF?
type: how-to
page_title: Loading Cyrillic Fonts When Exporting the Grid to PDF
slug: grid-kb-load-cyrillic-fonts-in-pdf-export
position: 
tags: 
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

My Grid uses a Cyrillic font but when I export it to PDF the text is missing. How to ensure the text will be properly included in the exported PDF file when using a Cyrillic font? 
How to load data on demand when you have Hierarchy Grid?

## Solution

Some PDF fonts do not have Cyrillic (or other alphabets) characters. In such cases, you can load the fonts explicitly, so the proper texts appear in the exported Grid to PDF.

For that purpose, use the Document Processing libraries to [implement a FontsProvider](https://docs.telerik.com/devtools/document-processing/knowledge-base/pdfprocessing-implement-fontsprovider) and load your desired font.

The snippet below shows how to load an example Cyrillic font, so the Grid can properly export the data in Bulgarian language (that uses Cyrillic characters) to a PDF document. If you load a `helvetica-cyrillic.ttf` file in the `wwwroot` folder of your application, the export will work out of the box.

>caption Load Cyrillic font for PDF export

````RAZOR
@using System.Globalization
@using Telerik.Documents.Core.Fonts
@using Telerik.Windows.Documents.Extensibility
@using Telerik.Windows.Documents.Core.Fonts

@inject IWebHostEnvironment HostEnvironment

<TelerikGrid Data="@GridData"
             Pageable="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Експортирай в PDF</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Експортирай всички страници</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(Product.ProductId)" Title="Номер" Width="100px" />
        <GridColumn Field="@nameof(Product.ProductName)" Title="Продукт" Width="200px" />
        <GridColumn Field="@nameof(Product.UnitsInStock)" Title="Налични бр." Width="100px" />
        <GridColumn Field="@nameof(Product.UnitPrice)" Title="Цена" Width="100px" />
        <GridColumn Field="@nameof(Product.Discontinued)" Title="Спрян" Width="150px" />
    </GridColumns>
</TelerikGrid>


@code {
    private IEnumerable<Product> GridData { get; set; }

    private FontsProviderBase FontsProvider { get; set; }

    private bool ExportAllPages { get; set; }

    protected async override Task OnInitializedAsync()
    {      
        var culture = new CultureInfo("bg-BG");
        CultureInfo.DefaultThreadCurrentCulture = culture;
        CultureInfo.DefaultThreadCurrentUICulture = culture;

        InitFontsProvider();

        GridData = Enumerable.Range(1, 100).Select(x => new Product
            {
                ProductId = x,
                ProductName = $"Продукт {x}",
                UnitsInStock = (short)(x * 2),
                UnitPrice = 3.15m * x,
                Discontinued = x % 4 == 0 ? "да" : "не",
            }).ToList();
    }

    private void InitFontsProvider()
    {
        FontsProvider = FixedExtensibilityManager.FontsProvider;
        var fontsProvider = new BlazorFontsProvider()
            {
                HostEnvironment = HostEnvironment
            };
        FixedExtensibilityManager.FontsProvider = fontsProvider;
    }

    public class BlazorFontsProvider : FontsProviderBase
    {
        public IWebHostEnvironment HostEnvironment { get; set; }

        public override byte[] GetFontData(FontProperties fontProperties)
        {
            // the code can be obtained from the Telerik DPL documentation
            // https://docs.telerik.com/devtools/document-processing/knowledge-base/pdfprocessing-implement-fontsprovider

            var fontFileName = fontProperties.FontFamilyName + ".ttf";
            var path = Path.Combine(HostEnvironment?.WebRootPath);
            // add this file to an appropriate folder, e.g. "wwwroot"
            fontFileName = "helvetica-cyrillic.ttf";

            var directory = new DirectoryInfo(path);
            var fontFiles = directory.GetFiles();
            var fontFile = fontFiles.FirstOrDefault(f => f.Name.Equals(fontFileName, StringComparison.InvariantCultureIgnoreCase));

            if (fontFile != null)
            {
                var targetPath = fontFile.FullName;

                using (FileStream fileStream = System.IO.File.OpenRead(targetPath))
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        fileStream.CopyTo(memoryStream);
                        return memoryStream.ToArray();
                    }
                }
            }

            return null;
        }
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal UnitPrice { get; set; }
        public string Discontinued { get; set; }
    }
}
````