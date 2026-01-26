---
title: Load FileManager File Data on Demand
description: Learn how to load the files from the currently selected folder in the FileManager for better performance.
type: how-to
page_title: How to Load FileManager File Data on Demand
slug: filemanager-kb-load-file-data-on-demand
tags: telerik, blazor, filemanager
ticketid: 1677209, 1665314, 1608943, 1606421, 1566070
res_type: kb
components: ["filemanager"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>FileManager for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to load FileManager files on demand?
* How to lazy load the FileManager data?
* How to bind the FileManager only to the files from the currently selected folder?
* How to implement data virtualization for the Telerik FileManager for Blazor?
* How to dynamically add folders and files to the FileManager data?

## Solution

1. Subscribe the to the [FileManager `PathChanged` event](slug:filemanager-events#pathchanged).
1. Subscribe to the [FileManager `OnRead` event](slug:filemanager-events#onread).
1. Obtain the [FileManager `@ref` (component instance)](slug:filemanager-overview#reference-and-methods).
1. Call the FileManager `Rebind()` method in the `PathChanged` event handler.
1. Load all folders for the FileManager TreeView and the files from the current folder. Set this collection to [`args.Data` in the `OnRead` handler](slug:common-features-data-binding-onread#event-argument).

>caption Load FileManager file data on demand using OnRead and PathChanged

````RAZOR
@using System.IO
@using Telerik.DataSource.Extensions

<p>
    Total folder and file count: <strong>@FlatData.Count</strong>;
    Folders loaded: <strong>@FoldersLoadedCount</strong>;
    Files loaded: <strong>@FilesLoadedCount</strong>
</p>

<p><strong>Path: @FlatDirectoryPath</strong></p>

<TelerikFileManager @ref="@FileManagerRef"
                    OnRead="@OnFileManagerRead"
                    TItem="@FlatFileEntry"
                    Path="@FlatDirectoryPath"
                    PathChanged="@FileManagerPathChanged"
                    Height="80vh">
</TelerikFileManager>

@code {
    private TelerikFileManager<FlatFileEntry>? FileManagerRef { get; set; }
    private List<FlatFileEntry> FlatData { get; set; } = new List<FlatFileEntry>();

    private readonly string RootPath = string.Empty;
    private string FlatDirectoryPath { get; set; } = string.Empty;

    private int FoldersLoadedCount { get; set; }
    private int FilesLoadedCount { get; set; }

    private int FolderLevelCount { get; set; } = 5;
    private int FilesInFolderMinCount { get; set; } = 3;
    private int FilesInFolderMaxCount { get; set; } = 24;
    private int FoldersInFolderCount { get; set; } = 3;
    private int FolderNameCounter { get; set; }
    private readonly List<string> FileExtensions = new() {
        ".txt", ".pdf", ".docx", ".xlsx", ".png", ".jpg", ".gif", ".zip", ".css", ".html", ".mp3", ".mpg"
    };

    private void FileManagerPathChanged(string newPath)
    {
        FlatDirectoryPath = newPath;

        FileManagerRef?.Rebind();
    }

    private async Task OnFileManagerRead(FileManagerReadEventArgs args)
    {
        var allFoldersAndVisibleFiles = FlatData.Where(x =>
            // all folders
            x.IsDirectory ||
            // all files if in the root folder
            (FlatDirectoryPath == RootPath && x.Path.IndexOf(Path.DirectorySeparatorChar) == x.Path.LastIndexOf(Path.DirectorySeparatorChar)) ||
            // all files if in another folder
            x.Path.Replace(string.Concat(Path.DirectorySeparatorChar, x.Name, x.Extension), string.Empty) == FlatDirectoryPath);

        args.Data = allFoldersAndVisibleFiles;
        args.Total = allFoldersAndVisibleFiles.Count();

        FoldersLoadedCount = allFoldersAndVisibleFiles.Where(x => x.IsDirectory).Count();
        FilesLoadedCount = allFoldersAndVisibleFiles.Count() - FoldersLoadedCount;

        await Task.Delay(1); // simulate async operation
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.CompletedTask;

        FlatDirectoryPath = RootPath;

        FlatData = LoadFlatDataAsync();

        await base.OnInitializedAsync();
    }

    private List<FlatFileEntry> LoadFlatDataAsync()
    {
        List<FlatFileEntry> data = new List<FlatFileEntry>();

        string rootDataPath = string.IsNullOrEmpty(RootPath) ? "/" : RootPath;

        PopulateChildren(data, null, rootDataPath, 1);

        return data;
    }

    private void PopulateChildren(List<FlatFileEntry> data, string? parentId, string parentPath, int level)
    {
        var rnd = Random.Shared;
        var filesInCurrentFolder = rnd.Next(FilesInFolderMinCount, FilesInFolderMaxCount);

        for (int i = 1; i <= filesInCurrentFolder; i++)
        {
            string itemId = Guid.NewGuid().ToString();
            string itemExtension = FileExtensions[rnd.Next(0, FileExtensions.Count)];
            string itemName = $"{itemExtension.Substring(1)}-file-{(FolderNameCounter != default ? string.Concat(FolderNameCounter, "-") : string.Empty)}{i}";
            string itemPath = Path.Combine(parentPath, string.Concat(itemName, itemExtension));

            data.Add(new FlatFileEntry()
            {
                Id = itemId,
                ParentId = parentId,
                Name = itemName,
                IsDirectory = false,
                HasDirectories = false,
                DateCreated = DateTime.Now,
                DateCreatedUtc = DateTime.Now.ToUniversalTime(),
                DateModified = DateTime.Now,
                DateModifiedUtc = DateTime.Now.ToUniversalTime(),
                Path = itemPath,
                Extension = itemExtension,
                Size = rnd.Next(1_000, 3_000_000)
            });
        }

        if (level < FolderLevelCount)
        {
            for (int i = 1; i <= FoldersInFolderCount; i++)
            {
                var itemId = Guid.NewGuid().ToString();
                var itemName = $"folder-{++FolderNameCounter}";
                var itemPath = Path.Combine(parentPath, itemName);

                data.Add(new FlatFileEntry()
                {
                    Id = itemId,
                    ParentId = parentId,
                    Name = itemName,
                    IsDirectory = true,
                    HasDirectories = level < FolderLevelCount - 1,
                    DateCreated = DateTime.Now,
                    DateCreatedUtc = DateTime.Now.ToUniversalTime(),
                    DateModified = DateTime.Now,
                    DateModifiedUtc = DateTime.Now.ToUniversalTime(),
                    Path = itemPath,
                    Size = rnd.Next(100_000, 10_000_000)
                });

                PopulateChildren(data, itemId, itemPath, level + 1);
            }
        }
    }

    public class FlatFileEntry
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public long Size { get; set; }
        public string Path { get; set; } = string.Empty;
        public string Extension { get; set; } = string.Empty;
        public bool IsDirectory { get; set; }
        public bool HasDirectories { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCreatedUtc { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateModifiedUtc { get; set; }
    }
}
````

## See Also

* [FileManager Events](slug:filemanager-events)
