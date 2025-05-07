---
title: Signing PDFs with PdfPRocessing in PdfViewer
description: Learn how to use PdfProcessing to sign PDFs using the Telerik PdfViewer in a web application.
type: how-to
page_title: How to Sign PDFs in Telerik PDF Viewer
slug: pdfviewer-sign-pdfs
tags: telerik, pdf, viewer, sign, digital signature
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>PdfViewer for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to be able to apply a digital signature to a document in the Telerik UI for Blazor PdfViewer.

## Solution

The PdfViewer does not currently have the capability to manage digital signatures of the document. However, this is still possible using the Telerik Document Processing Libraries PdfProcessing to programmatically manage the signature and the certificate of the document, while the PdfViewer's sole responsibility is to display the document.

1. Create a custom button in the Blazor PdfViewer to handle the logic for applying the digital signature to the PDF. See [PdfViewer - Custom Toolbar Button](https://docs.telerik.com/blazor-ui/components/pdfviewer/toolbar#custom-tools) for instructions.
2. Use the PdfProcessing tool to add a digital signature programmatically to the PDF. See [Document Processing - Digital Signature documentation](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/features/digital-signature) for instructions.
3. Reload the document into the PdfViewer. See [PdfViewer - Overview](https://docs.telerik.com/blazor-ui/components/pdfviewer/overview) for instructions.


## Example

<div class="skip-repl"></div>

````C#
<TelerikPdfViewer Data="@PdfSource">
    <PdfViewerToolBar>
        <PdfViewerToolBarOpenTool />
        <!-- all other buttons here -->
		<PdfViewerToolBarSeparator />
		
		<PdfViewerToolBarCustomTool>
            <TelerikButton OnClick="@OnSignPdfClick">SIGN</TelerikButton>
        </PdfViewerToolBarCustomTool>
    </PdfViewerToolBar>
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }
	
	private async Task OnPdfDownload(PdfViewerDownloadEventArgs args)
    {
        args.FileName = "My.pdf";
    }

    private async Task OnSignPdfClick()
    {
        var unsignedDocument = this.PdfSource;

        var signedDocument = SignDocument(this.PdfSource);

        this.PdfSource = signedDocument;
    }

	private byte[] SignDocument(byte[] unsignedDocumentBytes)
	{
        // **** PHASE 1 - Get certificate **** //
		
		X509Certificate2 certificate = null;

		// OPTION 1 - BRING YOUR OWN CERTIFICATE FILE
        // RadPdfProcessing enables you to sign and validate signature fields using standard signature encodings
        // adbe.x509.rsa_sha1 (PKCS #1)
        // adbe.pkcs7.sha1 (PKCS #7)
        // adbe.pkcs7.detached (PKCS #7 Detached)

		//certificate = new System.Security.Cryptography.X509Certificates.X509Certificate2(certificateFilePath, certificateFilePassword);

		// OPTION 2 - USE AN EXISTING CERTIFICATE
		var x509Store = new X509Store("MY", StoreLocation.CurrentUser);
		x509Store.Open(OpenFlags.ReadOnly | OpenFlags.OpenExistingOnly);
		var validCerts = x509Store.Certificates.Find(X509FindType.FindByTimeValid, DateTime.Now, false);
		
		// IMPORTANT: This example is taking the very first valid certificate. In a real app, you will selected the cert you want to sign the document with.
		certificate = validCerts.FirstOrDefault();


        // **** PHASE 2 - Add certificate to SignatureField and use certificate **** //

        // The name of the signature must be unique.
        var signatureName = "John Doe";

        // The Signature object is added to a signature field, so we can add a visualization to it.
		var signatureField = new SignatureField(signatureName);
		signatureField.Signature = new Telerik.Windows.Documents.Fixed.Model.DigitalSignatures.Signature(certificate);

        // Close the local cert store now that you're done
        x509Store.Close();


        // **** PHASE 3 - IMPORT DOCUMENT and insert signature field **** //

        var document = new PdfFormatProvider().Import(unsignedDocumentBytes, new TimeSpan(0, 0, 5));

        // This demo adds a new page and adding a new signature field there. If your document already has a signature field, you can search for it instead.
        RadFixedPage page = document.Pages.AddPage();

        // This is the Form XObject element that represents the contents of the signature field.
        var form = new Telerik.Windows.Documents.Fixed.Model.Objects.Form
        {
            FormSource = new FormSource { Size = new Size(220, 220) }
        };

        // This demo uses the editor to fill the Form XObject.
        var formEditor = new FixedContentEditor(form.FormSource);
        form.Position.Translate(10, 10);
        formEditor.DrawCircle(new Point(50, 50), 20);
        formEditor.DrawText(signatureName);

		// The widget contains the Form XObject and defines the appearance of the signature field.
		var widget = signatureField.Widgets.AddWidget();
		widget.Rect = new Rect(200, 600, 100, 100);
		widget.Border = new AnnotationBorder(10, AnnotationBorderStyle.Solid, null);
		widget.Content.NormalContentSource = form.FormSource;
		widget.RecalculateContent();

        // Finally, add the SignatureWidget to the page's annotations.
		page.Annotations.Add(widget);

		var editor = new FixedContentEditor(page);
		editor.Position.Translate(200, 400);
		editor.DrawForm(form.FormSource);
		document.AcroForm.FormFields.Add(signatureField);
		widget.RecalculateContent();
		widget.AppearanceCharacteristics.Background = new Telerik.Windows.Documents.Fixed.Model.ColorSpaces.RgbColor(255, 0, 0);

        // **** PHASE 4 - EXPORT DOCUMENT **** //
        byte[] signedDocBytes = new PdfFormatProvider().Export(document);

        return signedDocBytes;
    }
}
````

## Notes

- You can use Telerik PdfProcessing to digitally sign the PDF on the server side.
- The web application cannot access the user's guest operating system's X509 Certificate Store due to security restrictions in modern web browsers. Your application will only have access to X509 certificates installed on the server side. 

## See Also

- [PdfViewer - Overview](https://docs.telerik.com/blazor-ui/components/pdfviewer/overview)
- [Document Processing Digital Signature documentation](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/features/digital-signature)
