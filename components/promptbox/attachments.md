---
title: File Attachments
page_title: PromptBox - File Attachments
description: Learn how to implement file attachment functionality in the Blazor PromptBox component with file selection, validation, and file management capabilities.
slug: promptbox-attachments
tags: telerik,blazor,promptbox,attachments,files,upload,fileselect
published: True
position: 5
components: ["promptbox"]
---

# PromptBox File Attachments

The Blazor PromptBox component provides integrated file attachment functionality that allows users to select and attach files directly within the input interface. This feature is essential for AI communication scenarios where users need to provide documents, images, or other files as context for their prompts.

File attachment functionality is controlled through the `EnableFileSelect` parameter and configured using the [`PromptBoxFileSelectButtonSettings`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PromptBoxFileSelectButtonSettings) within the `PromptBoxSettings` section.

To enable file attachment functionality, set the `EnableFileSelect` parameter to `true`:

>caption Basic file attachment setup

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  EnableFileSelect="true"
                  Placeholder="Type or attach files...">
    <PromptBoxSettings>
        <PromptBoxFileSelectButtonSettings AllowedExtensions="@AllowedExtensions"
                                           Multiple="true"
                                           OnSelect="@OnFilesSelected" />
    </PromptBoxSettings>
</TelerikPromptBox>

@code {
    private string Prompt = string.Empty;
    private List<string> AllowedExtensions = new List<string> { ".pdf", ".png", ".jpg", ".jpeg", ".gif", ".txt" };

    private void OnFilesSelected(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            Console.WriteLine($"File selected: {file.Name} ({file.Size} bytes)");
        }
    }
}
````

## File Selection Parameters and Events

To review all available parameters and events for the PromptBox file select settings, see the [PromptBoxFileSelectButtonSettings API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PromptBoxFileSelectButtonSettings).

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Events](slug:promptbox-events)