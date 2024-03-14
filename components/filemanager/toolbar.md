---
title: Toolbar
page_title: FileManager Toolbar
description: Toolbar of the FileManager for Blazor.
slug: filemanager-toolbar
tags: telerik,blazor,filemanager,toolbar, commands
published: True
position: 15
---

# FileManager Toolbar

The FileManager includes a built-in Toolbar that contains commands for adding new files and folders, sorting and changing the view, and more. You can use the toolbar as is or customize it to include the desired built-in or custom tools.

>caption In this article:
* [Default Toolbar](#default-toolbar)
* [Custom Toolbar](#custom-toolbar)
    * [Example](#example)

## Default Toolbar

The default Toolbar renders automatically when you declare the FileManager component. Additional Toolbar configuration is not required.

The default FileManager Toolbar contains the following built-in tools (rendered in this exact order):

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool | Description |
| --- | --- |
| New Folder| A button that allows creating of a new folder in the current location. Read how to handle the creation in the [FileManager - Events]({%slug filemanager-events%}). |
| Upload | A button that allows updloading of new files. Clicking the button will open a dialog with integrated [Upload component]({%slug upload-overview%}). Read more in the [FileManager - Upload]({%slug filemanager-upload%}) article. |
| Sort Direction | A ButtonGroup with ToggleButtons that allows selecting the sort direction(ascending or descending) to sort the files in the current location. Read more in the [FileManager - Sort]({%slug filemanager-sort%}) article. |
| Sort By | A SplitButton that provides an option to select the desired sort member to sort by. Read more in the [FileManager - Sort]({%slug filemanager-sort%}) article. |
| Views | A ButtonGroup with ToggleButtons that allows you to control how the content of the selected directory will be visualized. The users can choose between two options. Read more in the [FileManager - Views]({%slug filemanager-views%}) article. |
| View Details | A Switch that toggles the visibility of the [Preview Pane]({%slug filemanager-preview-pane%}). By default its value is `Off` and you can enable it to see the selected file details. |
| Search | A TextBox that allows you to filter the files by name.  Read more in the [FileManager - Search]({%slug filemanager-search%}) article. |

## Custom Toolbar

To customize the Toolbar, add the `<FileManagerToolBar>` tag as a direct child of the `<TelerikFileManager>`. Inside the `<FileManagerToolBar>` you can include your desired [built-in tools](#built-in-tools), manage their order and add [custom tools](#custom-tools).

### Built-in tools

To add the desired built-in tools, declare the corresponding tool components in the `<FileManagerToolBar>`. The tools will be rendered in the order that you declare them in.

<div class="skip-repl"></div>

````CSHTML
<TelerikFileManager Data="@FileManagerData">
                   <FileManagerToolBar>
                       <FileManagerToolBarSearchTool/>
                   </FileManagerToolBar>
</TelerikFileManager>
````

>caption Built-in tool components:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Component | Description |
|------|-------------|
| `FileManagerToolBarNewFolderTool` | Renders the button for creating a new folder. |
| `FileManagerToolBarUploadTool` | Renders the button for the upload window. |
| `FileManagerToolBarSortDirectionTool` | Renders a ButtonGroup for the sort direction. |
| `FileManagerToolBarSortTool` | Renders the SplitButton for choosing which field to sort by. |
| `FileManagerToolBarFileViewTool` | Renders a ButtonGroup to toggle between Grid and ListView views. |
| `FileManagerToolBarSpacer` | Renders a spacer element. Use that if you need to add some space between the declared tools. |
| `FileManagerToolBarViewDetailsTool` | Renders a Switch to toggle the Preview Pane for the selected file. |
| `FileManagerToolBarSearchTool` | Renders a search box. | 

### Custom tools

To create a custom tool, declare a `<FileManagerToolBarCustomTool>` inside `<FileManagerToolBar>` tag. Place the content of your tool inside the `<FileManagerToolBarCustomTool>` tag.

<div class="skip-repl"></div>

````CSHTML
<TelerikFileManager Data="@FileManagerData">
                   <FileManagerToolBar>
                       <FileManagerToolBarCustomTool>
                           <TelerikButton>Custom tool</TelerikButton>
                       </FileManagerToolBarCustomTool>
                   </FileManagerToolBar>
</TelerikFileManager>
````

### Example

The following example demonstrates the customization of the FileManager Toolbar. The Toolbar includes some built-in and custom tools.

````CSHTML
@using System.IO
@inject IJSRuntime jsInterop

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    Height="400px"
                    OnCreate="@OnCreateHandler"
                    OnUpdate="@OnUpdateHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    OnDelete="@OnDeleteHandler">
                   <FileManagerToolBar>
                       <FileManagerToolBarSearchTool/>
                       <FileManagerToolBarFileViewTool/>
                       <FileManagerToolBarSpacer/>
                       <FileManagerToolBarCustomTool>
                           <TelerikButton Icon="@SvgIcon.Copy" OnClick="@CopyPath">Copy path</TelerikButton>
                       </FileManagerToolBarCustomTool>
                   </FileManagerToolBar>
</TelerikFileManager>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function copyPath(pathValue) {
        navigator.clipboard.writeText(pathValue);
    }
</script>

@code {
    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";
    
    private string DirectoryPath { get; set; } = "root-folder-path";

    private async Task CopyPath()
    {
        await jsInterop.InvokeVoidAsync("copyPath", DirectoryPath);
    }

    private async Task OnCreateHandler(FileManagerCreateEventArgs args)
    {
        // the new item data is hardcoded for the purpose of the example
        var newFolder = args.Item as FlatFileEntry;

        var parent = GetParent(newFolder, DirectoryPath);

        newFolder.Id = DirectoryPath + newFolder.Name.ToString();
        newFolder.ParentId = parent != null ? parent.Id : null;
        newFolder.Name = "New folder";
        newFolder.IsDirectory = true;
        newFolder.HasDirectories = false;
        newFolder.DateCreated = DateTime.Now;
        newFolder.DateCreatedUtc = DateTime.Now;
        newFolder.DateModified = DateTime.Now;
        newFolder.DateModifiedUtc = DateTime.Now;
        newFolder.Path = Path.Combine(DirectoryPath, newFolder.Name);
        newFolder.Extension = null;

        var parentDirectory = GetDirectory(DirectoryPath) ?? GetParent(newFolder, DirectoryPath);

        if (parentDirectory != null)
        {
            // simulate add in file system
            newFolder.ParentId = parentDirectory.Id;
            FileManagerData.Add(newFolder);
            parentDirectory.HasDirectories = FileManagerData.Count(x => x.ParentId == parentDirectory.Id) > 0;
        }
        else
        {
            // create a folder in the root dir
            FileManagerData.Add(newFolder);
        }

        RefreshData();
    }

    private FlatFileEntry GetDirectory(string path)
    {
        var directory = FileManagerData.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
    }

    private FlatFileEntry GetParent(FlatFileEntry currItem, string currDirectory)
    {
        var parentItem = FileManagerData
            .FirstOrDefault(x => x.IsDirectory == true && x.Path == currDirectory);

        return parentItem;
    }


    private async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
    {
        var item = args.Item as FlatFileEntry;

        if (item.IsDirectory)
        {
            // prevent renaming of directories. If you allow that, make sure
            // to also update the Path of the children
        }
        else
        {
            // the name prop is updated, but update the path to the file as well
            var name = item.Name ?? string.Empty;
            var extension = item.Extension ?? string.Empty;
            var fullName = extension.Length > 0 && name.EndsWith(extension) ?
                name : $"{name}{extension}";

            var updatedItem = FileManagerData.FirstOrDefault(x => x.Id == item.Id);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
            Console.WriteLine(updatedItem.Path);
        }
    }

    private async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
    {
        var selectedItem = args.Item as FlatFileEntry;

        //the Filemanager does not have the actual file.
        //To download it, find the selected file through args.Item and
        //assign the actual file to the argument as follows:

        //args.Stream = the file stream of the actual selected file;
        //args.MimeType = the mime type of the actual file, so it can be downloaded;
        //args.FileName = allows overriding the name of the downloaded file;
    }

    private async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var currItem = args.Item as FlatFileEntry;

        var itemToDelete = FileManagerData.FirstOrDefault(x => x.Id == currItem.Id);

        FileManagerData.Remove(itemToDelete);

        RefreshData();
    }

    private FlatFileEntry OnModelInitHandler()
    {
        var item = new FlatFileEntry();
        item.Name = $"New folder";
        item.Size = 0;
        item.Path = Path.Combine(DirectoryPath, item.Name);
        item.IsDirectory = true;
        item.HasDirectories = false;
        item.DateCreated = DateTime.Now;
        item.DateCreatedUtc = DateTime.Now;
        item.DateModified = DateTime.Now;
        item.DateModifiedUtc = DateTime.Now;

        return item;
    }

    private void RefreshData()
    {
        FileManagerData = new List<FlatFileEntry>(FileManagerData);
    }

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFlatFileEntries();
    }

    // a model to bind the FileManager. Should usually be in its own separate location.
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

    // the next lines are hardcoded data generation so you can explore the FileManager freely

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
                Path = Path.Combine(Documents.Path, "specification.docx"),
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

        return await Task.FromResult(files);
    }
}
````

## See Also

* [Live Demo: FileManager Toolbar](https://demos.telerik.com/blazor-ui/filemanager/toolbar)
