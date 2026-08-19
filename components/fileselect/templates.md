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

````CSHTML
<TelerikFileSelect>
    <SelectFilesButtonTemplate>
        <TelerikSvgIcon Icon="@SvgIcon.Upload" />
        Click to Select Files for Upload
    </SelectFilesButtonTemplate>
</TelerikFileSelect>
````

## FileTemplate

The `FileTemplate` allows full customization of the items in the file list. When you use this template, all built-in elements such as the file size, name, icon, and action buttons are replaced by the content you provide within the template.

The `FileTemplate` exposes a `context` of type `FileTemplateContext` that provides access to the file information through the `File` property.

The example below demonstrates how to use the `RemoveFileAsync()` method to remove files programmatically from the collection.

>caption Using FileSelect FileTemplate

<demo metaUrl="client/fileselect/templates/" height="250"></demo>

## FileInfoTemplate

The `FileInfoTemplate` allows you to customize the general file information section while preserving the rest of the built-in features such as the file icon and action buttons.

The `FileInfoTemplate` exposes a `context` of type `FileInfoTemplateContext` that provides access to the file information through the `File` property.

>caption Using FileSelect FileInfoTemplate

````CSHTML
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
````

## See Also

* [FileSelect API](slug:Telerik.Blazor.Components.TelerikFileSelect)
* [FileSelect Overview](slug:fileselect-overview)
* [FileSelect Validation](slug:fileselect-validation)
* [FileSelect Events](slug:fileselect-events)