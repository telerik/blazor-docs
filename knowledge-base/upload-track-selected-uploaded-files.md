---
title: Count All Selected and Uploaded Files
description: Track and count the number of all selected, valid and uploaded files in the Telerik Blazor Upload component.
type: how-to
page_title: How to Track and Count All Selected and Uploaded Files
slug: upload-kb-count-selected-uploaded-files
position: 
tags: telerik, blazor, upload, events
ticketid: 1570508, 1595493, 1626509
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Upload for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to find out when upload of multiple files is complete? I need an `EventCallback` like `OnComplete` for a completion of all files, or `OnProgress` event for all files.
* I set `Multiple="true"`. Is it possible to "see" the last successful upload in the `OnSuccess` event? I need to do something after ALL files are uploaded successfully.
* Users add files one by one. If they select more than 3 files, I want to notify them that they can't add anymore and prevent them from adding.


## Solution

The event arguments of all Upload events provide:

* The [number of files](slug://upload-events#event-arguments) in each user action;
* Which files are [valid in terms of size and extension](slug://upload-events#uploadfileinfo).

To count the total number of selected, valid and uploaded files in multiple user actions and events, define additional variables in the Razor component. Then, increment and decrement the variables in the Upload events.

1. Use the [Upload `OnSelect` event](slug://upload-events#onselect) to detect selection of one or multiple files.
    * If [`Multiple="true"`](slug://upload-overview#upload-parameters), then set [`IsCancelled` in the event argument](slug://upload-events#event-arguments) to `true` when the number of selected files exceeds the maximum limit.
    * If `Multiple="false"`, the Upload component will replace the current file in the list with the newly selected one.
1. Use the [Upload `OnCancel` event](slug://upload-events#oncancel) to detect when the user aborts an ongoing file upload.
1. Use the [Upload `OnSuccess` event](slug://upload-events#onsuccess) to detect a successful file upload or deletion on the server. Note that removal of uploaded files also fires `OnSuccess`.
1. Use the [Upload `OnRemove` event](slug://upload-events#onremove) to detect when the user deletes an uploaded file, or removes a file that hasn't been uploaded yet. Note that removal of uploaded files also fires `OnRemove`.
1. Use the [Upload `OnClear` event](slug://upload-events#onclear) to detect when the user removes all items from the file list.

>caption Track and count the number of all selected and uploaded files

<div class="skip-repl"></div>

````RAZOR
@inject NavigationManager NavigationManager

<ul>
    <li>Selected Files: @SelectedFiles</li>
    <li>
        Valid Files: @ValidFiles out of
        <TelerikNumericTextBox @bind-Value="@MaxValidFiles"
                               Min="1"
                               Max="@MaxUploadedFiles"
                               Width="70px" /> allowed
        (<strong>@string.Join(", ", UploadAllowedExtensions)</strong>)
    </li>
    <li>
        Uploaded Files: @UploadedFiles out of
        <TelerikNumericTextBox @bind-Value="@MaxUploadedFiles"
                               Min="@MaxValidFiles"
                               Width="70px" /> allowed
    </li>
</ul>

<p>
    <label><TelerikCheckBox @bind-Value="@UploadMultiple" /> Select Multiple Files</label>
</p>

<p>
    <label><TelerikCheckBox @bind-Value="@UploadAutoUpload" /> Upload Automatically</label>
    <em>(checking this will not upload pending files)</em>
</p>

<TelerikUpload SaveUrl="@UploadSaveUrl"
               RemoveUrl="@UploadRemoveUrl"
               Multiple="@UploadMultiple"
               AutoUpload="@UploadAutoUpload"
               MaxFileSize="@( 16 * 1024 * 1024 )"
               MinFileSize="@( 1 * 1024 )"
               AllowedExtensions="@UploadAllowedExtensions"
               OnCancel="@OnUploadCancel"
               OnClear="@OnUploadClear"
               OnRemove="@OnUploadRemove"
               OnSelect="@OnUploadSelect"
               OnSuccess="@OnUploadSuccess"
               OnUpload="@OnUploadUpload">
</TelerikUpload>

@code {
    private string UploadSaveUrl => ToAbsoluteUrl("api/upload/save");

    private string UploadRemoveUrl => ToAbsoluteUrl("api/upload/remove");

    private List<string> UploadAllowedExtensions => new List<string>() { ".jpg", ".pdf", ".txt" };

    private bool UploadMultiple { get; set; } = true;

    private bool UploadAutoUpload { get; set; }

    private int SelectedFiles { get; set; }

    private int ValidFiles { get; set; }

    private int MaxValidFiles { get; set; } = 3;

    private int UploadedFiles { get; set; }

    private int MaxUploadedFiles { get; set; } = 3;

    private void OnUploadCancel(UploadCancelEventArgs args)
    {
        --SelectedFiles;
        --ValidFiles;
    }

    private void OnUploadClear(UploadClearEventArgs args)
    {
        SelectedFiles = 0;
        ValidFiles = 0;
        //UploadedFiles = 0; // optional
    }

    private void OnUploadRemove(UploadEventArgs args)
    {
        --SelectedFiles;

        var file = args.Files.First();

        if (!file.InvalidExtension && !file.InvalidMaxFileSize && !file.InvalidMinFileSize)
        {
            --ValidFiles;
        }
    }

    private void OnUploadSelect(UploadSelectEventArgs args)
    {
        if (UploadMultiple)
        {
            SelectedFiles += args.Files.Count;
        }
        else
        {
            SelectedFiles = 1;
        }

        var currentValidFiles = args.Files
            .Where(file => !file.InvalidExtension && !file.InvalidMaxFileSize && !file.InvalidMinFileSize)
            .ToList();

        if (ValidFiles + currentValidFiles.Count > MaxValidFiles)
        {
            args.IsCancelled = true;
        }
        else
        {
            if (UploadMultiple)
            {
                ValidFiles += currentValidFiles.Count;
            }
            else
            {
                ValidFiles = 1;
            }
        }
    }

    private void OnUploadSuccess(UploadSuccessEventArgs args)
    {
        if (args.Operation == UploadOperationType.Upload)
        {
            ++UploadedFiles;
        }
        else
        {
            --UploadedFiles;
        }
    }

    private void OnUploadUpload(UploadEventArgs args)
    {
        if (UploadedFiles + args.Files.Count > MaxUploadedFiles)
        {
            args.IsCancelled = true;
        }
    }

    private string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

## See Also

* [Upload Events](slug://upload-events)
