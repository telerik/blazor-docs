---
title: Overview
page_title: DropZone Template
description: Discover the DropZone for Blazor and explore the examples.
slug: dropzone-template
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 10
---

# DropZone Template

The DropZone allows to customize the default rendering of its content by using a `Template`. It is a `RenderFragment` so you can add any desired custom content - be that simple text, HTML elements or other components.

The example below demonstrates placing the FileSelect inside the DropZone `Template`. This allows you to still have a FileSelect component to handle the file selction but save space in the viewport. 

All elements of the FileSelect but the Button are hidden as they are not needed for the specific scenario.

>tip This result can also be achieved by hiding the whole FileSelect/Upload component and placing a custom button in the Template to open the SelectFilesDialog. See [live demo: DropZone - Template](https://demos.telerik.com/blazor-ui/dropzone/template)

````CSHTML
<TelerikDropZone Id="@DropZoneId">
    <Template>
        <TelerikFontIcon Icon="@FontIcon.Upload"/>
        <span>Drag and drop files here</span>
        <span>or</span>
        <TelerikFileSelect DropZoneId="@DropZoneId"
                           Class="custom-fileselect">
        </TelerikFileSelect>
    </Template>
</TelerikDropZone>

@code {
    private string DropZoneId => "my-dropzone";
}

<style>
    .custom-fileselect.k-upload {
        visibility:hidden;
        width: 115px;
    }

    .custom-fileselect .k-upload-button-wrap{
        visibility:visible;
    }

    .custom-fileselect .k-upload-files{
        display:none;
    }
</style>
````

## See Also

  * [Live Demo: DropZone](https://demos.telerik.com/blazor-ui/dropzone/template)
  * [KB: DropZone for the whole viewport](to-do)

