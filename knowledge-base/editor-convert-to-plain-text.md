---
title: Convert Editor Value to Plain Text
description: How to get the Editor value as plain text.
type: how-to
page_title: Obtain the Editor Value as Plain Text
slug: editor-kb-plain-text
position: 
tags: editor, plain, text, txt, convert, retrieve
ticketid: 1527523
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Editor for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

How to convert the HTML string value of the Editor and retrieve it as plain text?

## Solution

The HTML value of the Editor can be [converted to plain text and other formats]({%slug editor-import-export%}) with our [Document Processing library]({%slug common-features-dpl%}).

Here are the required steps:

1. Add the [`Telerik.Documents.Core` and `Telerik.Documents.Flow`]({%slug common-features-dpl%}#available-nuget-packages) NuGet packages to your project.
1. Import the required namespaces:
    * `Telerik.Windows.Documents.Flow.FormatProviders.Html`
    * `Telerik.Windows.Documents.Flow.FormatProviders.Txt`
    * `Telerik.Windows.Documents.Flow.Model`
1. Create an [`HtmlFormaProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider) instance.
1. Use the HTML provider's **`Import`** method to create a `RadFlowDocument` from the Editor's HTML value.
1. Create a [`TxtFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/plain-text/txt-txtformatprovider) instance.
1. Use the TXT provider's **`Export`** method to export the `RadFlowDocument` as plain text.

To export to another format, use the corresponding namespace and format provider, instead of `Txt`.

>caption Obtain the Editor HTML value as plain text

````CSHTML
@*TxtFormatProvider*@
@using Telerik.Windows.Documents.Flow.FormatProviders.Txt;
@*HtmlFormatProvider*@
@using Telerik.Windows.Documents.Flow.FormatProviders.Html;
@*RadFlowDocument*@
@using Telerik.Windows.Documents.Flow.Model;

<TelerikEditor @bind-Value="@HtmlValue" />

<p><TelerikButton OnClick="@ConvertValue">Convert to Plain Text</TelerikButton></p>

<TelerikTextArea @bind-Value="@PlainTxtValue" Width="100%" AutoSize="true" />

@code {

    private string HtmlValue { get; set; } =
        @"
            <h1>Title</h1>
            <p>Paragraph paragraph paragraph.</p>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        ";
    private string PlainTxtValue { get; set; }

    private void ConvertValue(MouseEventArgs e)
    {
        HtmlFormatProvider htmlProvider = new HtmlFormatProvider();
        RadFlowDocument document = htmlProvider.Import(HtmlValue);
        TxtFormatProvider txtProvider = new TxtFormatProvider();
        PlainTxtValue = txtProvider.Export(document);
    }
}
````
