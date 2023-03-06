---
title: Integration
page_title: DropZone FileSelect and Upload Integration 
description: Learn how to integrate the Telerik UI for Blazor DropZone with a FileSelect or an Upload component, and enable users to drop files and automatically select or upload them.
slug: dropzone-integration
tags: telerik,blazor,dropzone,external,drag,drop,file,integration,fileselect,upload
published: True
position: 5
---

# DropZone Integration

This article explains the specifics you need to consider when integrating the DropZone with the [FileSelect]({%slug fileselect-overview%}) and [Upload]({%slug upload-overview%}) components.

>caption In this article:
* [Basics](#basics)
* [Integration with the FileSelect](#integration-with-the-fileselect)
* [Integration with the Upload](#integration-with-the-upload)

## Basics

The DropZone component enables you to define a dedicated area in the viewport to which the users can drag and drop files. To further handle the file upload, you need to integrate the DropZone with either the FileSelect or the Upload component.

To achieve the connection:

1. Set the `Id` parameter of the DropZone.
1. Set the `DropZoneId` of the FileSelect or the Upload component to match the `Id` of the DropZone.

## Integration with the FileSelect

The sample below showcases the integration of a DropZone with a FileSelect component. Once the user drops a file in the external DropZone, the file is automatically sent to the connected FileSelect. This action effectively raises the [`OnSelect` event of the FileSelect]({%slug fileselect-events%}#onselect), which you can handle to perform further actions with the selected file.

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

## Integration with the Upload

The sample below showcases the integration of a DropZone with an Upload component. Once the user drops a file in the external DropZone, the file is automatically sent to the connected Upload. This action effectively raises the [`OnSelect` event of the Upload]({%slug upload-events%}#onselect). Unless the `AutoUpload="false"` configuration is set, the [`OnUpload` event]({%slug upload-events%}#onupload) will also fire upon dropping the file in the DropZone. You can handle these events to perform further actions with the selected or uploaded file.

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

* [Live Demo: Blazor DropZone Overview and Key Features](https://demos.telerik.com/blazor-ui/dropzone/overview)
