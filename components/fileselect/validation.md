---
title: Validation
page_title: FileSelect - Validation
description: Validate the selected files in the FileSelect for Blazor.
slug: fileselect-validation
tags: telerik,blazor,fileselect,async,validate,validation
published: true
position: 10
---

# FileSelect File Validation

If you want to validate the selected files, you should implement the validation in two parts:

* Client validation&mdash;performed by the Telerik FileSelect component
* Server validation&mdash;must be implemented in the application backend or endpoints

## Parameters

The Telerik [FileSelect component offers parameters](slug:Telerik.Blazor.Components.TelerikFileSelect) to validate the file selection on the client:

* `AllowedExtensions`
* `MinFileSize`
* `MaxFileSize`

Selected files that don't meet the defined criteria are marked as invalid in the component UI.

The FileSelect also provides and `Accept` parameter. It does not enforce validation, but [instructs the browser what file types to allow users to select](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept). This can also help users find the correct files more easily.

## Events

The [FileSelect fires its `OnSelect` and `OnRemove` events](slug:fileselect-events) for both valid and invalid files. The application can confirm file validity through the [event argument properties](slug:fileselect-events#fileselectfileinfo) and decide how to proceed.

## Example

For brevity, the code below does not handle the selected file. See a full example in the [FileSelect Events article](slug:fileselect-events#example).

>caption Telerik FileSelect file validation

````RAZOR
<TelerikFileSelect AllowedExtensions="@AllowedExtensions"
                   MinFileSize="@MinSize"
                   MaxFileSize="@MaxSize"
                   Multiple="false"
                   OnSelect="@OnFileSelect">
</TelerikFileSelect>

<div class="k-form-hint">
    Expected files: JPG, PNG, SVG between 1 KB  and 4 MB.
</div>

@code {
    private readonly List<string> AllowedExtensions = new List<string>() { ".jpg", ".jpeg", ".png", ".svg" };

    private const int MinSize = 1024;

    private const int MaxSize = 4 * 1024 * 1024;

    private void OnFileSelect(FileSelectEventArgs args)
    {
        FileSelectFileInfo file = args.Files.First();

        if (file.InvalidExtension || file.InvalidMaxFileSize || file.InvalidMinFileSize)
        {
            // Optionally, ignore the user action completely.
            // The selected file(s) will not appear in the file list.
            //args.IsCancelled = true;
            return;
        }

        // Handle selected valid file...
    }
}
````

@[template](/_contentTemplates/upload/notes.md#server-security-note)


## See Also

* [Live Demo: FileSelect Validation](https://demos.telerik.com/blazor-ui/fileselect/validation)
* [FileSelect Overview](slug:fileselect-overview)
* [FileSelect Events](slug:fileselect-events)
