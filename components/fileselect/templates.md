---
title: Templates
page_title: FileSelect Templates
description: Discover the Blazor FileSelect component templates that enable you to customize the rendered button and file list items. The templates allow you to change the text and add custom content. 
slug: fileselect-templates
tags: telerik,blazor,fileselect,templates
published: True
position: 30
components: ["fileselect"]
---
# FileSelect Templates

The FileSelect component provides templates that allow you to customize the rendering of the select files button and the file list items.

* [SelectFilesButtonTemplate](#selectfilesbuttontemplate)
* [FileTemplate](#filetemplate)
* [FileInfoTemplate](#fileinfotemplate)

## SelectFilesButtonTemplate

The `SelectFilesButtonTemplate` allows you to modify the **Select Files...** button. It lets you change the default text of the button and include custom content like an [icon](slug:common-features-icons) or image.

>caption Using FileSelect SelectFilesButtonTemplate

```CSHTML
<TelerikFileSelect>
    <SelectFilesButtonTemplate>
        <TelerikSvgIcon Icon="@SvgIcon.Upload" />
        Click to Select Files for Upload
    </SelectFilesButtonTemplate>
</TelerikFileSelect>
```

## FileTemplate

The `FileTemplate` allows full customization of the items in the file list. When you use this template, all built-in elements such as the file size, name, icon, and action buttons are replaced by the content you provide within the template.

The `FileTemplate` exposes a `context` of type `FileTemplateContext` that provides access to the file information through the `File` property.

The example below demonstrates how to use the `RemoveFileAsync()` method to remove files programmatically from the collection.

>caption Using FileSelect FileTemplate

```CSHTML
<TelerikFileSelect @ref="@FileSelectRef" Files="@InitialFiles">
    <FileTemplate Context="fileContext">
        <div class="custom-file-item">
            <div class="file-badge">
                @fileContext.File.Extension.TrimStart('.').ToUpper()
            </div>
            <div class="file-info">
                <div><strong>@fileContext.File.Name@fileContext.File.Extension</strong></div>
                <div>Size: @((fileContext.File.Size / 1024.0 / 1024.0).ToString("F2")) MB</div>
            </div>
            <TelerikButton Icon="@SvgIcon.X"
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           OnClick="@(() => RemoveFile(fileContext.File.Id))">
            </TelerikButton>
        </div>
    </FileTemplate>
</TelerikFileSelect>

<style>
    .custom-file-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 5px;
    }

    .file-badge {
        width: 40px;
        height: 40px;
        background: #0d6efd;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
    }

    .file-info {
        flex: 1;
    }
</style>

@code {
    private TelerikFileSelect FileSelectRef { get; set; }

    private List<FileSelectFileInfo> InitialFiles { get; set; } = new List<FileSelectFileInfo>()
    {
        new FileSelectFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 },
        new FileSelectFileInfo(){ Id="2", Name="Image", Extension=".jpg", Size = 1024 * 1024 * 4 },
        new FileSelectFileInfo(){ Id="3", Name="Presentation", Extension=".pptx", Size = 1024 * 1024 * 8 },
        new FileSelectFileInfo(){ Id="4", Name="Spreadsheet", Extension=".xlsx", Size = 1024 * 1024 * 3 },
    };

    private void RemoveFile(string fileId)
    {
        FileSelectRef.RemoveFile(fileId);
    }
}
```

## FileInfoTemplate

The `FileInfoTemplate` allows you to customize the general file information section while preserving the rest of the built-in features such as the file icon and action buttons.

The `FileInfoTemplate` exposes a `context` of type `FileInfoTemplateContext` that provides access to the file information through the `File` property.

>caption Using FileSelect FileInfoTemplate

```CSHTML
<TelerikFileSelect Files="@InitialFiles">
    <FileInfoTemplate Context="fileContext">
        <strong>File Name:</strong> @fileContext.File.Name <br />
        <strong>Size:</strong> @(fileContext.File.Size / 1024) KB
    </FileInfoTemplate>
</TelerikFileSelect>

@code {
    private List<FileSelectFileInfo> InitialFiles { get; set; } = new List<FileSelectFileInfo>()
    {
        new FileSelectFileInfo(){ Id="1", Name="Report", Extension=".pdf", Size = 1024 * 1024 * 2 }
    };
}
```

## See Also

* [FileSelect API](slug:Telerik.Blazor.Components.TelerikFileSelect)
* [FileSelect Overview](slug:fileselect-overview)
* [FileSelect Validation](slug:fileselect-validation)
* [FileSelect Events](slug:fileselect-events)