---
title: Template
page_title: DropZone Content Template
description: Learn more about how to modify the default content of the Telerik UI for Blazor DropZone by using its template and defining a custom layout.
slug: dropzone-template
tags: telerik,blazor,dropzone,external,drag,drop,file,template,custom,content
published: True
position: 10
---

# DropZone Template

The DropZone allows you to customize the default rendering of its content by using a `Template`. `Template` is a `RenderFragment` and allows you to add whatever custom content is required such as simple text, HTML elements, or other components.

The following example demonstrates how to place the FileSelect component inside the `Template` of the DropZone. This action allows you to save space in the viewport while still having a FileSelect for handling the file selection. Except for the Button, all FileSelect elements are hidden as they are not needed for the specific scenario.

>tip To achieve the same result, you can also hide the whole FileSelect or Upload component and place a custom button for opening the `SelectFilesDialog` in the `Template`. For details, go to the [live demo on implementing the DropZone template](https://demos.telerik.com/blazor-ui/dropzone/template).

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

* [Live Demo: Implementing the Blazor DropZone Template](https://demos.telerik.com/blazor-ui/dropzone/template)
