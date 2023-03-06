---
title: Overview
page_title: DropZone Overview and Key Features
description: Discover the Telerik UI for Blazor DropZone, learn how to create the component, integrate it with the Upload and FileSelect controls, use its templaes, parameters, style its appearance, and explore its examples.
slug: dropzone-overview
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 0
---

# Blazor DropZone Overview

The <a href="https://www.telerik.com/blazor-ui/dropzone" target="_blank">Telerik UI for Blazor DropZone component</a> allows you to declare an external drop zone for an existing [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) component.

This integration enables the users to drag and drop one or multiple files to a designated space in their viewport. Dropping the files in the connected DropZone area will automatically select or upload them respectively.

## Creating the DropZone

1. Add the DropZone to your Razor page by using the `TelerikDropZone` tag.
1. Set the `Id` parameter of the component.
1. Set the `DropZoneId` of the [FileSelect]({%slug fileselect-overview%}#fileselect-parameters) or [Upload]({%slug upload-overview%}#upload-parameters) component to match the `Id` of the DropZone. For more information, go to the article on the [supported integration of the DropZone]({%slug dropzone-integration%}).
1. (Optional) Add a note to the DropZone by using the `NoteText` setting.

>caption Basic configuration of the DropZone with the FileSelect component.
````CSHTML
<TelerikDropZone Id="@DropZoneId" NoteText="@NoteText" />

<TelerikFileSelect DropZoneId="@DropZoneId"/>

@code {
    private string DropZoneId => "my-dropzone";

    private string NoteText => "Allowed file types: DOCX and PDF";
}
````

## Integration with the Upload and FileSelect

You can integrate the DropZone both with the [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) components, which will allow users to drop files and automatically select or upload them. [Read more about connecting the DropZone with the FileSelect or Upload...]({%slug dropzone-integration%})

## Template

The DropZone allows you to customize its rendering and appearance through a `Template` configuration. [Read more about using the DropZone template...]({%slug dropzone-template%})

## Parameters

The DropZone provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Id` | `string` | The id of the DropZone. Assign the same value of the corresponding Upload or FileSelect component to the `DropZoneId`. |
| `Enabled` | `bool` <br /> (`true`)| Specifies whether the DropZone is enabled. |
| `HintText` | `string` | The text for the hint of the DropZone. If not provided, the DropZone will render a default value. |
| `NoteText` | `string` | The text for the note of the DropZone. Used for rendering any additional information that will be visualized under the hint. If not provided, the DropZone won't render a note. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DropZone:

|  Parameter | Type  | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the DropZone (`<div class="k-external-dropzone">`). Used for [overriding the theme or applying custom styles]({%slug themes-override%}). |
| `DragOverClass` | `string` | The CSS class that will be rendered on the main wrapping element of the DropZone when a file is dragged over it. Used for conditionally styling the component during a dragover action. |
| `Width` | `string` | The width of the DropZone. |
| `Height` | `string` | The height of the DropZone. |

## Next Steps

* [Integrating the DropZone with the FileSelect and Upload components]({%slug dropzone-integration%})

## See Also

* [Live Demo: Blazor DropZone Overview and Key Features](https://demos.telerik.com/blazor-ui/dropzone/overview)
