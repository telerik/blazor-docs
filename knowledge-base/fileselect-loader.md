---
title: How to Show Progress During File Select
description: How to show that a file selection process is ongoing? How to display loading progress to users when selecting a large number of files at once?
type: how-to
page_title: How to Show Progress Animation When Using FileSelect
slug: fileselect-kb-loader
position:
tags: telerik, blazor, fileselect, loader, progress
ticketid: 1639447, 1639232
res_type: kb
components: ["fileselect"]
---
## Environment

<table>
  <tbody>
    <tr>
      <td>Product</td>
      <td>FileSelect for Blazor</td>
    </tr>
  </tbody>
</table>


## Description

This KB article answers the following questions:

* How to show progress to end users when using the FileSelect component? Users can select a large number of files at once.
* How to display a loading animation when handling bigger files in the FileSelect? The selection process is slow so how to indicate that the process is ongoing?
* How to show users a progress indicator during file selection?

## Solution

You can use the [`Loader`](slug:loader-overview). Set the [Loader `Visible` parameter](slug:loader-overview#loader-parameters) to `true` in the [FileSelect `OnSelect` event](slug:fileselect-events#onselect). The Loader will display while the files are being handled, so that the app is more user-friendly.

When you show the Loader in a method, which is blocking the UI thread with synchronous operations, the Loader may not appear when expected. To avoid this, add a small delay, which helps Blazor refresh the UI during the `OnSelect` handler execution.

Another option is to use the [`LoaderContainer`](slug:loadercontainer-overview). The benefit is that it can overlay the whole page or [cover part of the page that contains the FileSelect](slug:loadercontainer-overview#fill-a-parent-container).

````RAZOR
<TelerikLoader Visible="@LoaderVisible" />

<TelerikFileSelect OnSelect="@OnSelectHandler" />

@code {
    private bool LoaderVisible { get; set; }

    private async Task OnSelectHandler(FileSelectEventArgs args)
    {
        LoaderVisible = true;

        // allow Blazor to re-render the UI
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

## See Also

* [FileSelect Events](slug:fileselect-events)
* [Loader Overview](slug:loader-overview)
