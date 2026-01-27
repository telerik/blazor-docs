---
title: Overview
page_title: DropZone Overview and Key Features
description: Discover the Telerik UI for Blazor DropZone, learn how to create the component, integrate it with the Upload and FileSelect controls, use its templaes, parameters, style its appearance, and explore its examples.
slug: dropzone-overview
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 0
components: ["dropzone"]
---
# Blazor DropZone Overview

The <a href="https://www.telerik.com/blazor-ui/dropzone" target="_blank">Telerik UI for Blazor DropZone component</a> allows you to declare an external drop zone for an existing [FileSelect](slug:fileselect-overview) or [Upload](slug:upload-overview) component.

This integration enables the users to drag and drop one or multiple files to a designated space in their viewport. Dropping the files in the connected DropZone area will automatically select or upload them respectively.

## Creating Blazor DropZone

1. Add the DropZone to your Razor page by using the `TelerikDropZone` tag.
1. Set the `Id` parameter of the component.
1. Set the `DropZoneId` of the [FileSelect](slug:fileselect-overview#fileselect-parameters) or [Upload](slug:upload-overview#upload-parameters) component to match the `Id` of the DropZone.
1. (Optional) Add a note to the DropZone by using the `NoteText` setting.

>caption Basic configuration of the DropZone with the FileSelect component.
````RAZOR
<TelerikDropZone Id="@DropZoneId" NoteText="@NoteText" />

<TelerikFileSelect DropZoneId="@DropZoneId" AllowedExtensions="@AllowedExtensions" />

@code {
    private string DropZoneId => "my-dropzone";

    private string NoteText => "Allowed file types: DOCX and PDF";

    private List<string> AllowedExtensions { get; set; } = new List<string>() { ".docx", ".pdf" };
}
````

## Integration with the Upload and FileSelect

You can integrate the DropZone with both the [FileSelect](slug:fileselect-overview) or [Upload](slug:upload-overview) components. This will allow users to drop files and automatically select or upload them.

The connection is achieved by simply matching the value of the DropZone `Id` parameter with the `DropZoneId` parameter of the FileSelect or the Upload component.

Once the user drops a file in the external DropZone, the file is automatically sent to the connected FileSelect/Upload. This action effectively raises the `OnSelect` event of the [FileSelect](slug:fileselect-events#onselect) or [Upload](slug:upload-events#onselect). You can handle that to perform further actions with the dropped file(s).

## Template

The DropZone allows you to customize its rendering and appearance through a `Template` configuration. [Read more about using the DropZone template...](slug:dropzone-template)

## Parameters

The following table lists DropZone parameters. Check the [DropZone API Reference](slug:Telerik.Blazor.Components.TelerikDropZone) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Id` | `string` | The id of the DropZone. Assign the same value of the corresponding Upload or FileSelect component to the `DropZoneId`. |
| `Enabled` | `bool` <br /> (`true`) | Specifies whether the DropZone is enabled. |
| `HintText` | `string` | The text for the hint of the DropZone. If not provided, the DropZone will render a default value ("Drag and drop files here to upload"). The label text is also [localizable](slug:globalization-localization).|
| `NoteText` | `string` | Optional content inside the DropZone. Use it to render any additional information below the hint. The label text is also [localizable](slug:globalization-localization). |
| `Multiple` | `bool` <br /> (`true`) | Enables the user to drop several files at the same time. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DropZone:

|  Parameter | Type  | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the DropZone (`<div class="k-external-dropzone">`). Use it for [overriding the theme or applying custom styles](slug:themes-override). |
| `DragOverClass` | `string` | The CSS class that will be rendered on the main wrapping element of the DropZone when a file is dragged over it. Use it for [conditionally styling the component during a dragover action](https://demos.telerik.com/blazor-ui/dropzone/overview). |
| `Width` | `string` | The width of the DropZone. Accepts a valid CSS value (see the [Dimensions article](slug:common-features/dimensions)). |
| `Height` | `string` | The height of the DropZone. Accepts a valid CSS value (see the [Dimensions article](slug:common-features/dimensions)). |

## Next Steps

* [Using the DropZone Template for custom content](slug:dropzone-template)

## See Also

* [Live Demo: Blazor DropZone Overview and Key Features](https://demos.telerik.com/blazor-ui/dropzone/overview)
* [Display DropZone Over the Whole Page](slug:dropzone-kb-display-over-whole-page)
