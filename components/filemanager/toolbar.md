---
title: Toolbar
page_title: FileManager Toolbar
description: Toolbar of the FileManager for Blazor.
slug: filemanager-toolbar
tags: telerik,blazor,filemanager,toolbar, commands
published: True
position: 15
components: ["filemanager"]
---
# FileManager Toolbar

The Blazor FileManager Toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

By default, the Blazor FileManager displays all its built-in tools in the order below. Use the *tool tag* if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| New Folder | `FileManagerToolBarNewFolderTool` | A button that creates a new folder in the current location. Read how to handle the creation in the [FileManager Events](slug:filemanager-events) article.|
| Upload | `FileManagerToolBarUploadTool` | A button that opens a dialog with integrated [Upload component](slug:upload-overview). Read more in the [FileManager Upload](slug:filemanager-upload) article. |
| Sort Direction | `FileManagerToolBarSortDirectionTool` | A ButtonGroup with ToggleButtons that selects the [sort direction (ascending or descending) to sort the files in the current location](slug:filemanager-sort). |
| Sort By | `FileManagerToolBarSortTool` | A SplitButton that selects the desired [sort member to sort by](slug:filemanager-sort). |
| Views | `FileManagerToolBarFileViewTool` | A ButtonGroup with ToggleButtons that [toggles the file and folder visualization between a ListView and a Grid](slug:filemanager-views). |
| View Details | `FileManagerToolBarViewDetailsTool` | A Switch that toggles the visibility of the [FileManager Preview Pane](slug:filemanager-preview-pane). By default, the preview pane is hidden. |
| Search | `FileManagerToolBarSearchTool` | A TextBox that [filters the files by name](slug:filemanager-search). |

By default, the FileManager Toolbar also includes a spacer (`<FileManagerToolBarSpacer />`). This spacer consumes the available empty space and pushes the rest of the tools next to one another.

## Custom Tools

In addition to built-in tools, the FileManager also supports custom tools. Use the `<FileManagerToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Configuration

Add a `<FileManagerToolBar>` tag inside `<TelerikFileManager>` to configure a custom toolbar, for example:

* Arrange the FileManager tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the FileManager Toolbar

````RAZOR
@using System.IO

<TelerikFileManager @ref="@FileManagerRef"
                    Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    @bind-SelectedItems="@SelectedItems"
                    Height="400px">
    <FileManagerToolBar>
        <FileManagerToolBarSearchTool />
        <FileManagerToolBarFileViewTool />
        <FileManagerToolBarSpacer />
        <FileManagerToolBarCustomTool>
            <TelerikButton Icon="@SvgIcon.Trash"
                           OnClick="@DeleteSelected"
                           Enabled="@SelectedItems.Any()">Delete</TelerikButton>
        </FileManagerToolBarCustomTool>
    </FileManagerToolBar>
</TelerikFileManager>

@code {
    private TelerikFileManager<FlatFileEntry> FileManagerRef;

    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private IEnumerable<FlatFileEntry> SelectedItems { get; set; } = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";

    private string DirectoryPath { get; set; } = "root-folder-path\\Work Files\\Documents";

    private FlatFileEntry ItemToRemove { get; set; }

    // Fetch the FileManager data.
    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFlatFileEntries();
    }

    private void DeleteSelected()
    {
        foreach (var item in SelectedItems)
        {
            ItemToRemove = FileManagerData.FirstOrDefault(x => x.Id == item.Id);

            FileManagerData.Remove(ItemToRemove);

            FileManagerRef.Rebind();
        }
    }

    // Model to bind the FileManager. Should usually be in its own separate location.
    public class FlatFileEntry
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Path { get; set; }
        public string Extension { get; set; }
        public bool IsDirectory { get; set; }
        public bool HasDirectories { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCreatedUtc { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateModifiedUtc { get; set; }
    }

    // The next lines are hardcoded data generation so you can explore the FileManager freely.
    private async Task<List<FlatFileEntry>> GetFlatFileEntries()
    {
        var workFiles = new FlatFileEntry()
            {
                Id = "1",
                ParentId = null,
                Name = "Work Files",
                IsDirectory = true,
                HasDirectories = true,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(RootPath, "Work Files"),
                Size = 3 * 1024 * 1024
            };

        var Documents = new FlatFileEntry()
            {
                Id = "2",
                ParentId = workFiles.Id,
                Name = "Documents",
                IsDirectory = true,
                HasDirectories = false,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(workFiles.Path, "Documents"),
                Size = 1024 * 1024
            };

        var Images = new FlatFileEntry()
            {
                Id = "3",
                ParentId = workFiles.Id,
                Name = "Images",
                IsDirectory = true,
                HasDirectories = false,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(workFiles.Path, "Images"),
                Size = 2 * 1024 * 1024
            };

        var specification = new FlatFileEntry()
            {
                Id = "4",
                ParentId = Documents.Id,
                Name = "Specification",
                IsDirectory = false,
                HasDirectories = false,
                Extension = ".docx",
                DateCreated = new DateTime(2022, 1, 5),
                DateCreatedUtc = new DateTime(2022, 1, 5),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(Documents.Path, "Specification.docx"),
                Size = 462 * 1024
            };

        var report = new FlatFileEntry()
            {
                Id = "5",
                ParentId = Documents.Id,
                Name = "Monthly report",
                IsDirectory = false,
                HasDirectories = false,
                Extension = ".xlsx",
                DateCreated = new DateTime(2022, 1, 20),
                DateCreatedUtc = new DateTime(2022, 1, 20),
                DateModified = new DateTime(2022, 1, 25),
                DateModifiedUtc = new DateTime(2022, 1, 25),
                Path = Path.Combine(Documents.Path, "Monthly report.xlsx"),
                Size = 538 * 1024
            };

        var dashboardDesign = new FlatFileEntry()
            {
                Id = "6",
                ParentId = Images.Id,
                Name = "Dashboard Design",
                IsDirectory = false,
                HasDirectories = false,
                Extension = ".png",
                DateCreated = new DateTime(2022, 1, 10),
                DateCreatedUtc = new DateTime(2022, 1, 10),
                DateModified = new DateTime(2022, 2, 13),
                DateModifiedUtc = new DateTime(2022, 2, 13),
                Path = Path.Combine(Images.Path, "Dashboard Design.png"),
                Size = 1024
            };

        var gridDesign = new FlatFileEntry()
            {
                Id = "7",
                ParentId = Images.Id,
                Name = "Grid Design",
                IsDirectory = false,
                HasDirectories = false,
                Extension = ".jpg",
                DateCreated = new DateTime(2022, 1, 12),
                DateCreatedUtc = new DateTime(2022, 1, 12),
                DateModified = new DateTime(2022, 2, 13),
                DateModifiedUtc = new DateTime(2022, 2, 13),
                Path = Path.Combine(Images.Path, "Grid Design.jpg"),
                Size = 1024
            };

        var files = new List<FlatFileEntry>()
        {
            workFiles,

            Documents,
            specification,
            report,

            Images,
            dashboardDesign,
            gridDesign
        };

        return files;
    }
}
````

## Next Steps

* [Handle FileManager Events](slug:filemanager-events)


## See Also

* [Live Demo: FileManager Toolbar](https://demos.telerik.com/blazor-ui/filemanager/toolbar)
