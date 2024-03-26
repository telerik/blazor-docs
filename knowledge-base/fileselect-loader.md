---
title: How to Show Progress During File Select
description: How to show that a file selection process is ongoing? How to display loading progress to users when selecting a large number of files at once?
type: how-to
page_title: How to show the users that a file selection process is ongoing?
slug: fileselect-kb-loader
position:
tags: telerik, blazor, fileselect, loader, progress
ticketid: 1639447, 1639232
res_type: kb
---

## Environment

<table>
  <tbody>
    <tr>
      <td>Product</td>
      <td>FileSelect for Blazor
    </tr>
  </tbody>
</table>


## Description

How to show progress to end-users when using FileSelect and a large number of files are being selected at once? When it comes to bigger files the selection process is slow so how to indicate that the process is ongoing?

## Solution

You can use the [`Loader`]({%slug loader-overview%}). Set the Loader `Visible` parameter to `true` in the FileSelect `OnSelect` event. The Loader will display while the files are being handled, so that the app is more user-friendly when using larger files. When you show the Loader in a method, which is blocking the UI thread with synchronous operations, the Loader may not appear when expected. This is why you can add a small delay, which helps Blazor refresh the UI while the `OnSelect` handler is executing.

````CSHTML
<TelerikLoader Visible="@LoaderVisible" />

<TelerikFileSelect OnSelect="@OnSelectHandler" />

@code {
    private bool LoaderVisible { get; set; }

    private async Task OnSelectHandler(FileSelectEventArgs args)
    {
        LoaderVisible = true;

        // allow Blazor to stop execution and re-render the UI
        await Task.Delay(1);

        foreach (var file in args.Files)
        {
            await HandleFile(file);
        }

        LoaderVisible = false;
    }

    private async Task HandleFile(FileSelectFileInfo file)
    {
        // some long operation here
        await Task.Delay(1000);
    }
}
````