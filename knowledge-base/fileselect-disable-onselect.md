---
title: Change the FileSelect Button Caption and Disable It During Selection
description: Learn how to notify the user about the status of the process during selection, through changing button caption and disabling the FileSelect component.
type: how-to
page_title: How to Change the FileSelect Button Caption and Disable It During Selection.
slug: fileselect-disable-onselect
position:
tags: fileselect, upload, select, disable, loader
ticketid: 1639447
res_type: kb
components: ["fileselect"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                FileSelect for Blazor, <br />
                Loader for Blazor <br />
            </td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to change the FileSelect's button caption, when the user selects or uploads multiple files?
* How to disable the FileSelect component during upload of multiple files?
* How to notify the user about the status of the process during the upload?
* How to prevent the user from disrupting the upload process?

## Solution

To achieve this configuration, change the `Enabled` parameter of the `FileSelect` component to `false`, change its button caption, and re-render the component during the `OnSelect` event. However, file selection is a synchronous operation that waits for the files to be uploaded, and this prevents the re-rendering during the process. To work around this limitation, include another asynchronous operation in the handler of the `OnSelect` event. This async operation will change the button caption, disable the `FileSelect`, and re-render it. The described approach is shown in the example below.

>caption OnSelect disables the FileSelect and changes the button caption.

```CSHTML
<div class="row">
    <div class="col-4">
        <TelerikFileSelect OnSelect="@OnSelect" Enabled="@(!IsUploadingFile)">
            <SelectFilesButtonTemplate>
                <TelerikLoader Visible="@IsUploadingFile" />
                <TelerikSvgIcon Icon="@SvgIcon.Upload" />
                @(IsUploadingFile ? "Uploading...please wait" : "Upload")
            </SelectFilesButtonTemplate>
        </TelerikFileSelect>
    </div>
</div>
@code {
    private bool IsUploadingFile { get; set; }

    private async Task OnSelect(FileSelectEventArgs args)
    {
        _ = await Task.Delay(100).ContinueWith(async (task) =>
     {
         IsUploadingFile = true;

         await InvokeAsync(() => { StateHasChanged(); });
      
         await Task.Delay(2000);
         IsUploadingFile = false;
         await InvokeAsync(() => { StateHasChanged(); });
     });
    }
   }
````