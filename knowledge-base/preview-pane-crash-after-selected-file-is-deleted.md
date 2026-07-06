---
title: Preventing Preview Pane Crash After Deleting a Selected File
description: Learn how to prevent the Kendo UI for Blazor FileManager Preview Pane from crashing when the selected file is deleted.
type: how-to
page_title: Handling Preview Pane Crash in Kendo UI for Blazor FileManager
meta_title: Handling Preview Pane Crash in Kendo UI for Blazor FileManager
slug: kendo-blazor-filemanager-preview-pane-crash
tags: blazor, filemanager, preview-pane, crash, file-deletion
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for Blazor FileManager</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

When a file is selected in the [Kendo UI for Blazor FileManager](https://docs.telerik.com/blazor-ui/components/filemanager/overview) and then deleted, the Preview Pane may crash. This typically occurs because the component tries to access the now non-existent file, causing an error.

This knowledge base article also answers the following questions:
- How to handle Preview Pane errors in Kendo UI for Blazor FileManager?
- What to do if deleting a file causes the Preview Pane to crash?
- How to prevent crashes when a file is deleted in the FileManager?

## Solution

To avoid Preview Pane crashes after deleting a selected file, follow these steps:

1. Add logic to check if the selected file exists before updating the Preview Pane.
2. If the selected file does not exist, reset the Preview Pane or display a placeholder message.

Here is an example of how to handle this in the FileManager:

```csharp
@using Telerik.Blazor.Components

<TelerikFileManager @bind-SelectedItems="SelectedItems" />
<TelerikFileManagerPreview>
    @if (SelectedItems != null && SelectedItems.Any() && FileExists(SelectedItems.First().Path))
    {
        <div>
            <p>File Name: @SelectedItems.First().Name</p>
            <p>Path: @SelectedItems.First().Path</p>
        </div>
    }
    else
    {
        <p>No file selected or file no longer exists.</p>
    }
</TelerikFileManagerPreview>

@code {
    private List<FileManagerItem> SelectedItems { get; set; }

    private bool FileExists(string filePath)
    {
        // Implement logic to check if the file exists in storage.
        // Return true if the file exists; otherwise, return false.
        return false;
    }
}
```

### Explanation:
- The `@bind-SelectedItems` binds the selected file(s) in the FileManager.
- The `FileExists` method checks whether the file still exists in the storage.
- The Preview Pane conditionally displays content only if the selected file exists.

## See Also

- [Kendo UI for Blazor FileManager Documentation](https://docs.telerik.com/blazor-ui/components/filemanager/overview)
- [Kendo UI for Blazor FileManager API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.FileManager)
- [Preview Pane Customization in FileManager](https://docs.telerik.com/blazor-ui/components/filemanager/preview)
