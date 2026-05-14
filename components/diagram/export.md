---
title: Export
page_title: Diagram - Export
description: Learn about the built-in Blazor Diagram export capabilities and the available API that allows export to a PNG image or a PDF document.
slug: diagram-export
tags: telerik,blazor,diagram,export,pdf,png
published: True
position: 50
components: ["diagram"]
---

# Diagram Export

The Telerik Diagram for Blazor allows you to export the current Diagram as a PNG image or a PDF document. The export methods return a base64-encoded data URL that you can use to download or further process the exported file.

## Export Methods

To export the Diagram, [capture a component reference](slug:diagram-overview#diagram-reference) and call one of the following methods:

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `ExportToPngAsync` | none | `Task<string>` | Exports the Diagram as a PNG image and returns a base64-encoded data URL. |
| `ExportToPdfAsync` | `PdfExportOptions?` | `Task<string>` | Exports the Diagram as a PDF document and returns a base64-encoded data URL. |

Both methods return a data URL string in the format `data:<media-type>;base64,<data>`. To get the raw bytes, strip the prefix up to and including the first comma.

## PDF Export Options

Pass a `PdfExportOptions` object to `ExportToPdfAsync` to customize the PDF output. All properties are optional.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `AutoPrint` | `bool?` | `null` | Specifies if the Print dialog opens immediately after loading the document. |
| `Author` | `string?` | `null` | The author metadata of the PDF document. |
| `Creator` | `string?` | `null` | The creator metadata of the PDF document. |
| `ImgDpi` | `int?` | `null` | The forced resolution of images, including SVGs, in the exported PDF. By default, images export at their native resolution. |
| `Keywords` | `string?` | `null` | The keywords metadata of the PDF document. |
| `Landscape` | `bool?` | `null` | When `true`, the page uses landscape orientation. Defaults to portrait. |
| `Margin` | `string?` | `null` | The margins of the page. Supported units are `mm`, `cm`, `in`, and `pt`. |
| `MultiPage` | `bool?` | `null` | When `true`, exports child groups as separate pages. |
| `PaperSize` | `string?` | `null` | The paper size of the PDF document. Supported values are `A0`–`A10`, `B0`–`B10`, `C0`–`C10`, `Executive`, `Folio`, `Legal`, `Letter`, and `Tabloid`. |
| `Producer` | `string?` | `null` | The producer metadata of the PDF document. |
| `Subject` | `string?` | `null` | The subject metadata of the PDF document. |
| `Title` | `string?` | `null` | The title metadata of the PDF document. |

## Example

The following example exports the Diagram as a PNG image or a PDF document and saves the file to disk.

>caption Export the Diagram as PNG or PDF

````RAZOR
@using Telerik.Blazor.Common.Export.Pdf

<TelerikButton OnClick="@OnExportPdfClick">Export as PDF</TelerikButton>
<TelerikButton OnClick="@OnExportPngClick">Export as PNG</TelerikButton>

<TelerikDiagram @ref="@DiagramRef" Height="420px" Zoom="0.8">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle" />

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="Shape 3" />
        </DiagramShape>
        <DiagramShape Id="shape4">
            <DiagramShapeContent Text="Shape 4" />
        </DiagramShape>
        <DiagramShape Id="shape5">
            <DiagramShapeContent Text="Shape 5" />
        </DiagramShape>
        <DiagramShape Id="shape6">
            <DiagramShapeContent Text="Shape 6" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape2" ToId="shape4" />
        <DiagramConnection FromId="shape2" ToId="shape5" />
        <DiagramConnection FromId="shape3" ToId="shape6" />
    </DiagramConnections>
</TelerikDiagram>

@code {
    private TelerikDiagram DiagramRef { get; set; }

    private async Task OnExportPdfClick()
    {
        var result = await DiagramRef!.ExportToPdfAsync(new PdfExportOptions
        {
            PaperSize = "A4",
            Landscape = true,
            Title = "Diagram Export"
        });

        var base64 = result.Substring(result.IndexOf(",") + 1);
        byte[] bytes = Convert.FromBase64String(base64);

        // The file is saved to the root application folder.
        System.IO.File.WriteAllBytes("diagram.pdf", bytes);
    }

    private async Task OnExportPngClick()
    {
        var result = await DiagramRef!.ExportToPngAsync();

        var base64 = result.Substring(result.IndexOf(",") + 1);
        byte[] bytes = Convert.FromBase64String(base64);

        // The file is saved to the root application folder.
        System.IO.File.WriteAllBytes("diagram.png", bytes);
    }
}
````

## See Also

* [Diagram Overview](slug:diagram-overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
