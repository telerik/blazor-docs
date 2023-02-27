---
title: Overview
page_title: DropZone Overview
description: Discover the Blazor DropZone and explore the examples.
slug: dropzone-overview
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 0
---

({%slug %})

# Blazor DropZone Overview

The <a href="https://www.telerik.com/blazor-ui/dropzone" target="_blank">Blazor DropZone component</a> allows yo to declare an external drop zone for an existing [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) component. This enables the users to drag and drop a file to a designated space on their view port and thus automatically to select/upload it.

## Creating DropZone

1. Use the `TelerikDropZone` tag to add the component to your razor page.
1. Set the `Id` parameter of the DropZone component.
1. Set the `DropZoneId` of the [FileSelect]({%slug fileselect-overview%})/[Upload]({%slug upload-overview%}) component to match the `Id` the DropZone.
1. (optional) Use the `NoteText` to add a note in the DropZone.


````CSHTML
<TelerikDropZone Id="@DropZoneId" NoteText="@NoteText" />

<TelerikFileSelect DropZoneId="@DropZoneId"/>

@code {
    private string DropZoneId => "my-dropzone";

    private string NoteText => "Allowed file types: DOCX and PDF";
}
````

## Integration with Upload and FileSelect

The DropZone can be integrated with both [FileSelect]({%slug fileselect-overview%}) or [Upload]({%slug upload-overview%}) component to allow the users drop files and automatically upload or select them. [See details on how to connect the DropZone with FileSelect or Upload...]({%slug dropzone-integration%})

## Template

The DropZone allows you to customize its rendring and appearence thorugh `Template`. [Read more about using the DropZone Template...]({%slug template%})

## Parameters

>caption The DropZone provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)
| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| Id | `string` | The id of the drop zone. Assign the same value to the DropZoneId of the corresponding Upload/FileSelect component. |
| Enabled | `bool` | Specifies whether the drop zone is enabled. Default value is true. |
| HintText | `string` | The text for the hint of the drop zone. If not provided, a default value will be rendered. |
| NoteText | `string` | The text for the note of the drop zone. If not provided, no note will be rendered. Use that to render any additional information that will be visualized under the hint. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DropZone:

|  Parameter | Type  | Description |
| ----------- | ----------- | ----------- |
| Class | `string` | The class that will be rendered on the drop zone. |
| DragOverClass | `string` | The class that will be rendered on the drop zone. when a file is dragged over it. Use this class to conditionally style the component during dragover. |
| Width | `string` | The width of the drop zone. Will be applied as inline style to the outer wrapper. |
| Height | `string` | The height of the drop zone. Will be applied as inline style to the outer wrapper. |


## Next Steps

* [Binding the DropZone to Data]({%slug components/DropZone/databind%})

* [Pre-Selecting Items for the User]({% slug DropZone-pre-select-item %})


## See Also

  * [Live Demo: DropZone](https://demos.telerik.com/blazor-ui/dropzone/overview)
