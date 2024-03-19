---
title: How to change the FileSelect button's caption and disable it during selection
description: Hot to change FileSelect button's caption, while selecting and uploading. How to disable it during selection.
type: how-to
page_title: How to disable the FileSelect, while selecting and changing its caption's button.
slug: fileselect-disable-onselect
position:
tags: fileselect, upload, select, disable, loader
ticketid: 1639447
res_type: kb
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

* How to change the FileSelect's button caption, when the user select or upload multiple files?
* How to disable the FileSelect during upload of multiple files?
* How to notify the user about the status of the process during file selection and prevent disruption?


## Solution

To achieve this configuration, you have to change the `Enabled` parameter to `false`, change button's caption and re-render the `FileSelect` during the `OnSelect` event. The specificity of this approach is that file selection is a synchronous operation that waits for the files to be uploaded, and this prevents the re-rendering during the process. The solution is to include another asynchronous operation in the handler of the `OnSelect` event during which to change the button's caption, disable the `FileSelect` and re-render it. The described approach is shown in the example below.

>caption OnSelect disable the FileSelect and changes the button's caption.

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