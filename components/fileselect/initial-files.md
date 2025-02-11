---
title: Initial Files
page_title: FileSelect Initial Files
description: The FileSelect allows you to define a collection of pre-selected files, which will be initially shown in the selected file list.
slug: fileselect-initial-files
tags: telerik,blazor,fileselect,initial, files
published: True
position: 40
---

# FileSelect Initial Files

The Blazor FileSelect component enables you to display specific files in the file list when the component loads for the first time. This is a convenient way to show previously uploaded files.

To configure the initially displayed files, use the `Files` parameter of the FileSelect—it accepts an `IEnumerable<FileSelectFileInfo>` collection that stores a set of pre-selected files.

>caption Display initial files in FileSelect's list.

```CSHTML

<TelerikFileSelect Files="@InitialFiles" />

@code {
    private List<FileSelectFileInfo> InitialFiles { get; set; } = new List<FileSelectFileInfo>()
    {
        new FileSelectFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 },
        new FileSelectFileInfo(){ Id="2", Name="Image", Extension=".jpg", Size = 1024 * 1024 * 4 },
        new FileSelectFileInfo(){ Id="3", Name="Picture", Extension=".png", Size = 1024 * 1024 * 3 },
    };
}

```

## Persist Selected Files

The Initial Files feature of the FileSelect allows you to save a list of files that the user has selected. Then, you can display them again when the page is reloaded. To achieve this:
1. Store the [`FileSelectFileInfo`](slug:fileselect-events#fileselectfileinfo) records received during the [`OnSelect`](slug:fileselect-events#onselect) event.
1. Load the [`FileSelectFileInfo`](slug:fileselect-events#fileselectfileinfo) records in the FileSelect when the page is loaded.

>caption How to load files and display them initially in the FileSelect

```CSHTML

@using System.IO;

@if (InitialFiles != null)
{
    <TelerikFileSelect Files="@InitialFiles"
                       OnSelect="@OnSelect" />
}

@code {
    private List<FileSelectFileInfo> InitialFiles { get; set; }

    private void OnSelect(FileSelectEventArgs args)
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
        InitialFiles = new List<FileSelectFileInfo>()
        {
            new FileSelectFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 }
        };
    }
}

```


## See Also

* [FileSelect API](slug:Telerik.Blazor.Components.TelerikFileSelect)
* [FileSelect Overview](slug:fileselect-overview)