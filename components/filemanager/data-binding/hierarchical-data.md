---
title: Hierarchical Data
page_title: FileManager - Data Binding to Hierarchical Data
description: Data Binding the FileManager for Blazor to hierarchical data.
slug: filemanager-data-binding-hierarchical-data
tags: telerik,blazor,filemanager,data,bind,databind,databinding,hierarchical
published: True
position: 2
---

# FileManager Data Binding to Hierarchical Data

This article explains how to bind the FileManager for Blazor to hierarchical data. Before continuing, make sure you are familiar with the [FileManager data binding basics]({%slug filemanager-data-binding-overview%}).

Hierarchical data means that the collection of child items is provided in a field of its parent's model:

* The `Items` field contains a collection of all children icluding sub-folders and files. They will be rendered in the [Preview Pane]({%slug filemanager-preview-pane%}) when the parent folder is selected.

* The `Directories` field contains a collection of the subolders of a directory. They will be rendered in the TreeView navigation pane. If there are `Directories` for a specific folder it will have an expand icon. The `HasDirectories` field can override this, however, but it is not required for hierarchical data binding.

This approach of providing items lets you gather separate collections of data that may even come from different sources.

>caption Example of hierarchical data binding

````CSHTML
<TelerikFileManager Data="@Data"
                    Height="400px"
                    @bind-Path="@DirectoryPath"
                    IdField="MyModelId"
                    NameField="Name"
                    SizeField="Size"
                    PathField="Path"
                    ExtensionField="Extension"
                    IsDirectoryField="IsDirectory"
                    HasDirectoriesField="HasDirectories"
                    DirectoriesField="MyDirectories"
                    ItemsField="Items"
                    DateCreatedField="DateCreated"
                    DateCreatedUtcField="DateCreatedUtc"
                    DateModifiedField="DateModified"
                    DateModifiedUtcField="DateModifiedUtc"/>

@code {
    public List<HierarchicalFileEntry> Data = new List<HierarchicalFileEntry>();
    public string DirectoryPath { get; set; } = string.Empty;

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        Data = await GetHierarchicalFileEntries();
    }

    // a model to bind the FileManager. Should usually be in its own separate location.
    public class HierarchicalFileEntry
    {
        public string MyModelId { get; set; }
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
        public List<HierarchicalFileEntry> MyDirectories { get; set; }
        public List<HierarchicalFileEntry> Items { get; set; }
    }

    // the next lines are hardcoded data generation so you can explore the FileManager freely

    async Task<List<HierarchicalFileEntry>> GetHierarchicalFileEntries()
    {
        var root = new HierarchicalFileEntry()
            {
                MyModelId = "1",
                Name = "Work Files",
                IsDirectory = true,
                HasDirectories = true,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine("files"),
                Size = 3 * 1024 * 1024,
            };

        var Documents = new HierarchicalFileEntry()
            {
                MyModelId = "2",
                Name = "Documents",
                IsDirectory = true,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(root.Path, "documents"),
                Size = 1024 * 1024
            };

        var specification = new HierarchicalFileEntry()
            {
                MyModelId = "3",
                Name = "Specification",
                IsDirectory = false,
                Extension = ".docx",
                DateCreated = new DateTime(2022, 1, 5),
                DateCreatedUtc = new DateTime(2022, 1, 5),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(Documents.Path, "specification.docx"),
                Size = 462 * 1024
            };

        var report = new HierarchicalFileEntry()
            {
                MyModelId = "4",
                Name = "Monthly report",
                IsDirectory = false,
                Extension = ".xlsx",
                DateCreated = new DateTime(2022, 1, 20),
                DateCreatedUtc = new DateTime(2022, 1, 20),
                DateModified = new DateTime(2022, 1, 25),
                DateModifiedUtc = new DateTime(2022, 1, 25),
                Path = Path.Combine(Documents.Path, "monthly-report.xlsx"),
                Size = 538 * 1024
            };

        var Images = new HierarchicalFileEntry()
            {
                MyModelId = "5",
                Name = "Images",
                IsDirectory = true,
                DateCreated = new DateTime(2022, 1, 2),
                DateCreatedUtc = new DateTime(2022, 1, 2),
                DateModified = new DateTime(2022, 2, 3),
                DateModifiedUtc = new DateTime(2022, 2, 3),
                Path = Path.Combine(root.Path, "images"),
                Size = 2 * 1024 * 1024
            };

        var dashboardDesign = new HierarchicalFileEntry()
            {
                MyModelId = "6",
                Name = "Dashboard Design",
                IsDirectory = false,
                Extension = ".png",
                DateCreated = new DateTime(2022, 1, 10),
                DateCreatedUtc = new DateTime(2022, 1, 10),
                DateModified = new DateTime(2022, 2, 13),
                DateModifiedUtc = new DateTime(2022, 2, 13),
                Path = Path.Combine(Images.Path, "dashboard-design.png"),
                Size = 1024
            };

        var gridDesign = new HierarchicalFileEntry()
            {
                MyModelId = "7",
                Name = "Grid Design",
                IsDirectory = false,
                Extension = ".png",
                DateCreated = new DateTime(2022, 1, 12),
                DateCreatedUtc = new DateTime(2022, 1, 12),
                DateModified = new DateTime(2022, 2, 13),
                DateModifiedUtc = new DateTime(2022, 2, 13),
                Path = Path.Combine(Images.Path, "grid-design.jpg"),
                Size = 1024
            };

        root.MyDirectories = new List<HierarchicalFileEntry>() { Documents, Images };

        Documents.Items = new List<HierarchicalFileEntry>() { specification, report };
        Images.Items = new List<HierarchicalFileEntry>() { dashboardDesign, gridDesign };

        List<HierarchicalFileEntry> files = new List<HierarchicalFileEntry>() { root };

        return await Task.FromResult(files);
    }
}
````

## See Also

  * [FileManager Data Binding Basics]({%slug filemanager-data-binding-overview%})
  * [Binding to Flat Data]({%slug filemanager-data-binding-flat-data%})
  * [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/blazor-ui/filemanager/hierarchical-data)
  * [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/filemanager/flat-data)
