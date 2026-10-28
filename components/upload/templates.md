---
title: Templates
page_title: Upload Templates
description: Discover the Blazor Upload component templates that enable you to customize the rendered button and file list items. Through these templates, you can change the text and add custom content. 
slug: upload-templates
tags: telerik,blazor,upload,templates
published: True
position: 30
components: ["upload"]
---

# Upload Templates

The Upload component provides templates that allow you to customize the rendering of the select files button and the file list items.

* [SelectFilesButtonTemplate](#selectfilesbuttontemplate)
* [FileTemplate](#filetemplate)
* [FileInfoTemplate](#fileinfotemplate)

## SelectFilesButtonTemplate

The `SelectFilesButtonTemplate` allows you to modify the **Select Files...** button. It lets you change the default text of the button and include custom content like an [icon](slug:common-features-icons) or image.

>caption Using Upload SelectFilesButtonTemplate

<demo metaUrl="client/upload/templates/example-1/" height="420"></demo>

## FileTemplate

The `FileTemplate` allows full customization of the items in the file list. When you use this template, all built-in elements such as the progress bar, action buttons, file size, name, and icon are replaced by the content you provide within the template.

The `FileTemplate` exposes a `context` of type `FileTemplateContext` that provides access to the file information through the `File` property.

The example below demonstrates how to use the `RemoveFileAsync()` method to remove files programmatically from the collection. You can perform most file operations programmatically through the [Upload component methods](slug:upload-overview#upload-reference-and-methods).

>caption Using Upload FileTemplate

<demo metaUrl="client/upload/templates/example-2/" height="420"></demo>

## FileInfoTemplate

The `FileInfoTemplate` allows you to customize the general file information section while preserving the rest of the built-in features such as the file icon, progress bar, and action buttons.

The `FileInfoTemplate` exposes a `context` of type `FileInfoTemplateContext` that provides access to the file information through the `File` property.

>caption Using Upload FileInfoTemplate

<demo metaUrl="client/upload/templates/example-3/" height="420"></demo>

## See Also

* [Upload API](slug:Telerik.Blazor.Components.TelerikUpload)
* [Upload Overview](slug:upload-overview)
* [Upload Validation](slug:upload-validation)
* [Upload Events](slug:upload-events)