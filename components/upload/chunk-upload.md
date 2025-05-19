---
title: Chunk Upload
page_title: Chunk Upload
description: Enable and configure chunk upload in Upload for Blazor.
slug: upload-chunk
tags: telerik,blazor,upload,chunk
published: True
position: 3
---

# Chunk Upload

Chunk upload enables file uploads by dividing the file into smaller parts (chunks) and sending them in multiple requests to the remote endpoint, where they are reassembled into the final file.

## Basics

To setup the feature, use the `UploadChunkSettings` tag, which is nested inside `UploadSettings`. The tag includes the following parameters:

| Parameter | Type and Default Value | Description |
|----------|----------|----------|
| `AutoRetryAfter` | `double` <br/> (100) | Specifies the amount of time in milliseconds after which a failed chunk upload request will be retried.  
| `Enabled` | `bool` <br/> (`true`) | Specifies if the chunk upload is enabled.  
| `MaxAutoRetries` | `int` <br/> (1) | Specifies the number of attempts to retry uploading a failed chunk.  
| `MetadataField` | `string` <br/> (`chunkMetadata`) | Specifies the name of the variable that will receive the chunk upload metadata in the remote endpoint.  
| `Resumable` | `bool` <br/> (`true`) | Specifies if the file upload process could be paused and later resumed.  
| `Size` | `double` <br/> (1024 * 1024) | The size of the chunks in bytes.

## Events

The Upload exposes several relevant events. You can find related examples in the [Events](slug:upload-events) article.

* `OnPause` - fires when the user clicks on the pause button during chunk upload.
* `PageSizeChanged` - fires when the user clicks on the "resume" button during chunk upload.

>caption Enable Chunk Upload

````RAZOR
<TelerikUpload SaveUrl="@CustomSaveUrl"
               OnPause="@OnPause"
               OnResume="@OnResume"
               RemoveUrl="@RemoveUrl"
               AutoUpload="true">
    <UploadSettings>
        <UploadChunkSettings Size="16000"
                             AutoRetryAfter="300"
                             MaxAutoRetries="2"
                             MetadataField="customChunkMetadata"
                             Resumable="false">
        </UploadChunkSettings>
    </UploadSettings>
</TelerikUpload>

@code {
    private string SaveUrl => NavigationManager.ToAbsoluteUrl("api/upload/chunksave");
    private string RemoveUrl => NavigationManager.ToAbsoluteUrl("api/upload/remove");
    private string CustomSaveUrl => NavigationManager.ToAbsoluteUrl("api/upload/chunksavecustom");

    private void OnPause(UploadPauseEventArgs args)
    {
        Console.WriteLine("pause event");

        foreach (var file in args.Files)
        {
            Console.WriteLine(file.Name);
        }
    }

    private void OnResume(UploadResumeEventArgs args)
    {
        Console.WriteLine("resume event");

        foreach (var file in args.Files)
        {
            Console.WriteLine(file.Name);
        }
    }
}
````

## See Also

  * [Blazor Upload](slug:upload-overview)