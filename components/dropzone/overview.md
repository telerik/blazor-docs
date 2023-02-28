---
title: Overview
page_title: DropZone Overview
description: Discover the Blazor DropZone and explore the examples.
slug: dropzone-overview
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 0
---

# Blazor DropZone Overview

The <a href="https://www.telerik.com/blazor-ui/dropzone" target="_blank">Blazor DropZone component</a> allows you to declare an external drop zone for an existing [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) component. This enables the users to drag and drop one or multiple files to a designated space in their viewport. Dropping the files in the connected DropZone area will automatically select/upload them.

## Creating DropZone

1. Use the `TelerikDropZone` tag to add the component to your razor page.
1. Set the `Id` parameter of the DropZone component.
1. Set the `DropZoneId` of the [FileSelect]({%slug fileselect-overview%}#fileselect-parameters)/[Upload]({%slug upload-overview%}#upload-parameters) component to match the `Id` of the DropZone. Read more in [DropZone Integration]({%slug dropzone-integration%}).
1. (optional) Use the `NoteText` to add a note in the DropZone.

>caption Basic configuration of the DropZone with FileSelect.
````CSHTML
<TelerikDropZone Id="@DropZoneId" NoteText="@NoteText" />

<TelerikFileSelect DropZoneId="@DropZoneId"/>

@code {
    private string DropZoneId => "my-dropzone";

    private string NoteText => "Allowed file types: DOCX and PDF";
}
````

## Integration with Upload and FileSelect

The DropZone can be integrated with both [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) components to allow the users drop files and automatically select or upload them. [See details on how to connect the DropZone with FileSelect or Upload...]({%slug dropzone-integration%})

## Template

The DropZone allows you to customize its rendring and appearance through a `Template`. [Read more about using the DropZone Template...]({%slug dropzone-template%})

## Parameters

>caption The DropZone provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Id` | `string` | The id of the DropZone. Assign the same value to the `DropZoneId` of the corresponding Upload/FileSelect component. |
| `Enabled` | `bool` <br /> (`true`)| Specifies whether the DropZone is enabled. |
| `HintText` | `string` | The text for the hint of the drop zone. If not provided, a default value will be rendered. |
| `NoteText` | `string` | The text for the note of the DropZone. Use that to render any additional information that will be visualized under the hint. If not provided, no note will be rendered. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DropZone:

|  Parameter | Type  | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on main wrapping element of the DropZone (`<div class="k-external-dropzone">`). Use it to [override the theme or apply custom styles]({%slug themes-override%}). |
| `DragOverClass` | `string` | The CSS class that will be rendered on the main wrapping element of the DropZone when a file is dragged over it. Use this class to conditionally style the component during dragover. |
| `Width` | `string` | The width of the DropZone. |
| `Height` | `string` | The height of the DropZone. |


## Next Steps

* [DropZone integration with FileSelect and Upload]({%slug dropzone-integration%})


## See Also

  * [Live Demo: DropZone](https://demos.telerik.com/blazor-ui/dropzone/overview)
