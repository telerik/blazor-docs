---
title: Overview
page_title: Document Processing
description: Get Telerik Document Processing with UI for Blazor.
slug: common-features-dpl
tags: telerik,blazor,dpl,pdf,excel,word,txt,csv,get
previous_url: /common-features/document-processing
published: True
position: 1
---

# Telerik Document Processing
Telerik Document Processing provides the RadPdfProcessing, RadSpreadStreamProcessing, RadWordsProcessing, and RadZipLibrary UI-independent and cross-platform libraries which enable you to process content between different formats and work with archive files.

#### Available Libraries

* [PdfProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview) library enables you to create, import, and export PDF documents.
* [SpreadProcessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) library enables you to work with spreadsheet documents.
* [SpreadStreamProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) library enables you to export large `XLSX` and `CSV` spreadsheet documents with low memory footprint and great performance.
* [WordsProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/overview) library enables you to create, import, and export `DOCX`, `DOC` & `DOT` (import only), `HTML`, `RTF`, and `TXT` documents, and export them to PDF.
* [ZipLibrary](http://docs.telerik.com/devtools/document-processing/libraries/radziplibrary/overview) library enables you to compress and decompress `ZIP` files.

In this article:

* [Supported File Formats](#supported-file-formats)
* [Available NuGet Packages](#available-nuget-packages)
* [Licensing](#licensing)
* [Learning Resources](#learning-resources)

## Supported File Formats

The Telerik Document Processing libraries for .NET Core support the following file formats:

* `CSV`
* `DOC` & `DOT` (import only)
* `DOCX`
* `HTML`
* `PDF`
* `RTF`
* `TXT`
* `XLSX`
* `XLS`
* `ZIP`

## Available NuGet Packages

You can take the required packages from the [Telerik Private NuGet Feed]({%slug installation/nuget%}), your Telerik UI for Blazor [automated installation]({%slug installation/msi%}) or [zip archive]({%slug installation/zip%}).

The following list shows the [available Document Processing packages](https://docs.telerik.com/devtools/document-processing/getting-started/installation/nuget-packages) and a short summary of their purpose, you can read more about their features and how to use them from their overview articles, linked in the Related Articles section on the side, and more detailed articles linked from the Learning Resources section below.

>caption List of the available Document Processing NuGet Packages

* **Telerik.Documents.Core**.nupkg&mdash;The main NuGet package from the Telerik Document Processing libraries. Required when you plan to use the library.
* **Telerik.Documents.Fixed**.nupkg&mdash;The package is required when processing PDF documents.
* **Telerik.Documents.ImageUtils**.nupkg&mdash;This package is required when exporting to PDF format a document containing images different than Jpeg and Jpeg2000 or ImageQuality different than High. For more information check the [PdfProcessing`s Cross-Platform Support](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/cross-platform) article.
* **Telerik.Documents.CMapUtils**.nupkg&mdash;Provides a default implementation for getting the data of a predefined CMap table by a given name. The package is optional and you will need to include a reference to it only if you need to process documents with [CMap tables](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/concepts/cmaps).
* **Telerik.Documents.Flow**.nupkg&mdash;The package is part of the Word (text) processing library. Required for processing `HTML`, `DOCX`, `RTF`, and `TXT` documents.
* **Telerik.Documents.Flow.FormatProviders.Pdf**.nupkg&mdash;The package allows for exporting flow documents, such as `DOCX` and `RTF`, to `PDF`.
* **Telerik.Documents.Flow.FormatProviders.Doc**.nupkg&mdash;The package allows importing `DOC` or `DOT` files.
* **Telerik.Documents.Spreadsheet**.nupkg&mdash;The package allows for working with spreadsheets.
* **Telerik.Documents.Spreadsheet.FormatProviders.OpenXml**.nupkg&mdash;The package allows for exporting spreadsheet documents to various `OpenXML` formats.
* **Telerik.Documents.Spreadsheet.FormatProviders.Pdf**.nupkg&mdash;The package allows for exporting spreadsheet documents to `PDF`.
* **Telerik.Documents.Spreadsheet.FormatProviders.Xls**.nupkg&mdash;The package allows for working with `XLS` spreadsheet documents.
* **Telerik.Documents.SpreadsheetStreaming**.nupkg&mdash;The main package for generating huge spreadsheet files while using minimum resources.
* **Telerik.Zip**.nupkg&mdash;The package is required when working with zipped formats, such as `DOCX` and `XLSX`, and `PDF`.


>tip In case you need a version of Telerik Document Processing compatible with [.NET Framework 4.0](https://dotnet.microsoft.com/download/dotnet-framework/net40) or later, check the suites which you can use to obtain the binaries from in the [Installing on Your Computer](https://docs.telerik.com/devtools/document-processing/getting-started/installing-on-your-computer) help topic.

## Licensing

Telerik Document Processing is available as part of the following suites:

* DevCraft
* Telerik UI for ASP.NET AJAX
* Telerik UI for ASP.NET MVC
* Telerik UI for ASP.NET Core
* Telerik UI for Blazor
* Telerik UI for WPF
* Telerik UI for WinForms
* Telerik UI for Silverlight
* Telerik UI for Xamarin

## Learning Resources

You can find more information on working with the Telerik document processing libraries in the following articles:

* Basics

    * [First Steps](https://docs.telerik.com/devtools/document-processing/getting-started/first-steps)

* Words (text) processing

	* [DOC format provider](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/word-file-formats/doc/docformatprovider)

	* [DOCX format provider](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/word-file-formats/docx/docxformatprovider)

	* [HTML format provider](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider)

	* [RTF format provider](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/rtf/rtfformatprovider)

	* [TXT format provider](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/plain-text/txt-txtformatprovider)

* Spreadsheet processing

	* [Getting Started](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview)

	* [XLSX format provider](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/xlsx/xlsxformatprovider)
	
	* [XLS format provider](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/xls/xlsformatprovider)

	* [CSV format provider](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/csvformatprovider)

	* [PDF format provider](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/pdf/pdfformatprovider)

	* [TXT format provider](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/txt/txtformatprovider)

* PDF processing

	* [PDF format provider](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/formats-and-conversion/pdf/pdfformatprovider/pdfformatprovider)
	
	* [Text format provider](http://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/formats-and-conversion/plain-text/textformatprovider)

* Fast spreadsheet generation
	
	* [Getting Started](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview)

* Blazor demos

    * [PdfProcessing in Blazor](https://demos.telerik.com/blazor-ui/pdfprocessing/overview)
    
    * [SpreadProcessing in Blazor](https://demos.telerik.com/blazor-ui/spreadprocessing/overview)
    
    * [SpreadStreamProcessing in Blazor](https://demos.telerik.com/blazor-ui/spreadstreamprocessing/overview)
    
    * [WordsProcessing in Blazor](https://demos.telerik.com/blazor-ui/wordsprocessing/overview)
    
    * [ZipLibrary in Blazor](https://demos.telerik.com/blazor-ui/ziplibrary/overview)


## See Also

* [Get Started with Telerik Document Processing](http://docs.telerik.com/devtools/document-processing/installation-and-deployment/installing-on-your-computer)
* [Telerik UI for Blazor Overview]({% slug blazor-overview%})
* [PdfProcessing Overview]({%slug pdfprocessing-overview%})
* [SpreadProcessing Overview]({%slug spreadprocessing-overview%})
* [SpreadStreamProcessing Overview]({%slug spreadstreamprocessing-overview%})
* [WordsProcessing Overview]({%slug wordsprocessing-overview%})
* [ZipLibrary Overview]({%slug ziplibrary-overview%})
