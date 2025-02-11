---
title: Validation
page_title: FileSelect - Validation
description: Validate the selected files in the FileSelect for Blazor.
slug: fileselect-validation
tags: telerik,blazor,fileselect,async,validate,validation
published: true
position: 10
---

# FileSelect - Selected Files Validation

If you want to validate the selected files, you should implement the validation in two parts:

* client validation - performed by the Telerik FileSelect component
* server validation - must be implemented in the application endpoints

The Telerik FileSelect component offers parameters to validate the file selection on the client:

* `Accept` - `string` - not validation per se, but this parameter can [instruct the browser what file types to allow users to select](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
* `AllowedExtensions` - `List<string>` - a list of valid file extensions. Choosing other file types will mark them as invalid in the UI. The default value is `null`, which allows all extensions.
* `MinFileSize`- `int?` - the minimum size of a file in bytes. Files with a smaller size will be marked as invalid in the UI.
* `MaxFileSize`- `int?` - the maximum size of a file in bytes. Files with a larger size will be marked as invalid in the UI.

>caption Client validation in the Telerik FileSelect component

For brevity, this sample does not showcase actual upload of the files. You can find an example in the [FileSelect Events article](slug:fileselect-events).

````RAZOR
@* Some images are only allowed, min size 1KB, max size 4MB *@

<div style="width:300px">
	<TelerikFileSelect AllowedExtensions="@AllowedExtensions"
					   MinFileSize="@MinSize"
					   MaxFileSize="@MaxSize">
	</TelerikFileSelect>
	<div class="k-form-hint">
		Expected files: <strong> JPG, PNG, JPEG </strong> between <strong>1KB</strong> and <strong>4MB</strong>.
	</div>
</div>

@code {
	public List<string> AllowedExtensions { get; set; } = new List<string>() { ".jpg", ".png", ".jpeg" };

	public int MinSize { get; set; } = 1024;

	public int MaxSize { get; set; } = 4 * 1024 * 1024;
}
````

@[template](/_contentTemplates/upload/notes.md#server-security-note)


## See Also

* [Live Demo: FileSelect Validation](https://demos.telerik.com/blazor-ui/fileselect/validation)
* [FileSelect Overview](slug:fileselect-overview)
* [FileSelect Events](slug:fileselect-events)
