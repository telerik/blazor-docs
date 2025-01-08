---
title: Initial Files
page_title: Upload Initial Files
description: The Upload allows you to define a collection of pre-selected files, which will be initially shown in the selected file list.
slug: upload-initial-files
tags: telerik,blazor,upload,initial, files
published: True
position: 40
---

# Upload Initial Files

The Blazor Upload component enables you to display specific files in the file list when the component loads for the first time. This is a convenient way to show previously uploaded files.

To configure the initially displayed files, use the `Files` parameter of the Upload—it accepts an `IEnumerable<UploadFileInfo>` collection that stores a set of pre-selected files.

>caption Display initial files in Upload's list.

```CSHTML

<TelerikUpload Files="@InitialFiles" />

@code {
    private List<UploadFileInfo> InitialFiles { get; set; } = new List<UploadFileInfo>()
    {
        new UploadFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 },
        new UploadFileInfo(){ Id="2", Name="Image", Extension=".jpg", Size = 1024 * 1024 * 4 },
        new UploadFileInfo(){ Id="3", Name="Picture", Extension=".png", Size = 1024 * 1024 * 3 },
    };
}

```

## Persist Selected Files

The Initial Files feature of the Upload allows you to save a list of files that the user has selected. Then, you can display them again when the page is reloaded. To achieve this:
1. Store the [`UploadFileInfo`](slug://upload-events#uploadfileinfo) records received during the [`OnSelect`](slug://upload-events#onselect) event.
1. Load the [`UploadFileInfo`](slug://upload-events#uploadfileinfo) records in the Upload when the page is loaded.

>caption How to load files and display them initially in the Upload

```CSHTML

@using System.IO;


@if (InitialFiles != null)
{
    <TelerikUpload Files="@InitialFiles"
                   OnSelect="@OnSelect" />
}

@code {
    private List<UploadFileInfo> InitialFiles { get; set; }

    private void OnSelect(UploadSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            //await SaveFileInfo(file); Here, you can store the file information it in a database, text file, or any other desired storage
        }
    }

    protected override async Task OnInitializedAsync()
    {
        await LoadFiles();
    }

    private async Task LoadFiles()
    {
        //Simulate files information loading
        await Task.Delay(1000);
        InitialFiles = new List<UploadFileInfo>()
        {
            new UploadFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 }
        };
    }
}

```


## See Also

* [Upload API](/blazor-ui/api/Telerik.Blazor.Components.TelerikUpload)
* [Upload Overview](slug://upload-overview)