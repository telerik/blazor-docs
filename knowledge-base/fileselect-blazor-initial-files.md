---
title: Initial Files Do Not Display in Blazor FileSelect
description: Learn why initial files do not appear in the Blazor FileSelect component and how to display them correctly on initialization.
type: troubleshooting
page_title: Initial Files Do Not Display in Blazor FileSelect
slug: fileselect-kb-blazor-initial-files
tags: fileselect, blazor, initial, files
res_type: kb
ticketid: 1683091
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

In an attempt to display initial files in the [`FileSelect`](slug:fileselect-overview) component, the files are fetched from an API call and assigned to the `Files` parameter of the component. Despite this, the component does not render the initial file list as expected.

## Cause

The root cause of the issue is that the `Files` parameter of the FileSelect component is not designed to be reactive. Consequently, changes made to this parameter at runtime do not automatically trigger the component to update or re-render with the new list of files.

## Solution

To ensure that the FileSelect component reflects changes made to the `Files` parameter, you’ll need to recreate the FileSelect component.

`````Razor
@if (ShouldRenderFileSelect)
{
    <TelerikFileSelect @ref="@FileSelectRef"
                       Class="required"
                       Files="@InitialFiles"
                       Multiple="true"
                       OnSelect="@OnSelectHandler"
                       OnRemove="@OnFileRemoved" />
}

@code {
    private TelerikFileSelect FileSelectRef { get; set; }
    private List<FileSelectFileInfo> InitialFiles = new();
    private List<OSRFileInfoResponse> Files = new();
    private bool ShouldRenderFileSelect { get; set; } = true;

    protected override async Task OnInitializedAsync()
    {
        await LoadFiles();
    }

    private async Task LoadFiles()
    {
        // Simulate API call
        await Task.Delay(500);
        Files = await FetchFilesFromApi();

        if (Files != null)
        {
            InitialFiles = Files.Select(file => new FileSelectFileInfo
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = file.Name!,
                    Extension = Path.GetExtension(file.FileName!),
                    Size = file.FileSize
                }).ToList();
        }

        // Re-render the component to ensure changes are applied
        ResetFileSelect();
    }

    private void ResetFileSelect()
    {
        ShouldRenderFileSelect = false;
        StateHasChanged();

        Task.Delay(1).ContinueWith(_ =>
        {
            ShouldRenderFileSelect = true;
            InvokeAsync(StateHasChanged);
        });
    }

    private Task<List<OSRFileInfoResponse>> FetchFilesFromApi()
    {
        // Mock API Response
        return Task.FromResult(new List<OSRFileInfoResponse>
        {
            new OSRFileInfoResponse { FileName = "document.pdf", FileSize = 1024 * 1024, Buffer = new byte[10] },
            new OSRFileInfoResponse { FileName = "image.jpg", FileSize = 2048 * 1024, Buffer = new byte[10] }
        });
    }

    private void OnSelectHandler()
    {
        // OnSelect logic
    }

    private void OnFileRemoved()
    {
        // OnRemove logic
    }

    private void DownloadFileFromStream(byte[] buffer, string fileName)
    {
        // Simulate file download
    }

    public class OSRFileInfoResponse
    {
        public byte[]? Buffer { get; set; }
        public string? FileName { get; set; }
        public long FileSize { get; set; }

        public string? Name => FileName?.Split("/").LastOrDefault();
    }
}
`````
