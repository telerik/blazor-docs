---
title: Overview
page_title: DropZone Integration
description: Discover the Blazor DropZone for Blazor and explore the examples.
slug: dropzone-integration
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 5
---

# DropZone Integration

This article explains the specifics of integrating the DropZone with the [FileSelect]({%slug fileselect-overview%}) and [Upload]({%slug upload-overview%}) component.

>caption In this article:
* [Basics](#basics)
* [DropZone Integration with FileSelect](#dropzone-integration-with-fileselect)
* [DropZone Integration with Upload](#dropzone-integration-with-upload)

## Basics

The DropZone component can be used to define a dedicated area in the view port where the users can drag and drop files into. To further handle the file upload, you need to integrate the DropZone with either FileSelect or Upload component.

The connection is achieved in two simple steps:

1. Set the `Id` parameter of the DropZone component.
1. Set the `DropZoneId` of the FileSelect/Upload component to match the `Id` the DropZone.



## DropZone Integration with FileSelect

The sample below showcases integration of a DropZone component with FileSelect.

Once the user drops the file in the DropZone, the file is automatically sent to the connected FileSelect. This will effectively raise the [`OnSelect` event of the FileSelect]({%slug fileselect-events%}#onselect). You can handle that to perform further actions with the selected file(s).

````CSHTML
<TelerikDropZone Id="@DropZoneId" />

<TelerikFileSelect DropZoneId="@DropZoneId"
                   OnSelect=@HandleFiles />

@code {
    private string DropZoneId => "my-dropzone";

    private void HandleFiles(FileSelectEventArgs args)
    {
        Console.WriteLine($"User dropped {args.Files.Count} files");

        foreach (var file in args.Files)
        {
            Console.WriteLine($"{file.Name}");
        }
    }
}
````

## DropZone Integration with Upload

The sample below showcases integration of a DropZone component with Upload.

Once the user drops the file in the DropZone, the file is automatically sent to the connected FileSelect. This will effectively raise the [`OnSelect` event of the Upload]({%slug upload-events%}#onselect). Unless `AutoUpload="false"`, the [`OnUpload` event]({%slug upload-events%}#onupload) will also fire upon file drop in the DropZone.

You can handle these events to perform further actions with the selected/uploaded file(s).

````CSHTML
<TelerikDropZone Id="@DropZoneId" />

<TelerikUpload DropZoneId="@DropZoneId"
               OnSelect="@SelectHandler"
               OnUpload="@UploadHandler" />

@code {
    private string DropZoneId => "my-dropzone";

    private void SelectHandler(UploadSelectEventArgs args)
    {
        Console.WriteLine($"User dropped {args.Files.Count} files");

        foreach (var file in args.Files)
        {
            Console.WriteLine($"{file.Name}");
        }
    }

    private void UploadHandler(UploadEventArgs args)
    {
        Console.WriteLine("Upoad fired");
    }
}
````

## See Also

  * [Live Demo: DropZone](https://demos.telerik.com/blazor-ui/dropzone/overview)
