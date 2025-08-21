---
title: File Uploads and Media
page_title: Chat File Uploads and Media
description: Learn how to configure file uploads, media sharing, and speech-to-text features in the Telerik UI for Blazor Chat component.
slug: chat-file-uploads-and-media
tags: telerik,blazor,chat,file-upload,media,speech-to-text
published: True
position: 4
---

# File Uploads and Media

The Telerik UI for Blazor Chat component supports file uploads, media sharing, and speech-to-text functionality to enhance the messaging experience.

## File Upload Configuration

Enable file uploads by setting the `EnableFileUpload` parameter to `true`:

````razor
<TelerikChat Data="@Messages"
             EnableFileUpload="true"
             OnSendMessage="@HandleSendMessage">
    <ChatSettings>
        <ChatFileSelectSettings AllowedExtensions="@allowedExtensions"
                                MaxFileSize="10485760"
                                Multiple="true" />
    </ChatSettings>
</TelerikChat>

@code {
    private List<string> allowedExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".pdf", ".docx" };

    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now,
            Files = args.Files?.ToList() ?? new List<FileSelectFileInfo>()
        };
        
        Messages.Add(newMessage);
    }
}
````

## File Upload Settings

Configure file upload behavior using the `ChatFileSelectSettings` component:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `AllowedExtensions` | `List<string>` | `null` | Allowed file extensions for upload |
| `MaxFileSize` | `long` | `null` | Maximum file size in bytes |
| `Multiple` | `bool` | `true` | Allow multiple file selection |
| `OnSelect` | `EventCallback` | - | Event fired when files are selected |

>caption Advanced file upload configuration

````razor
<TelerikChat Data="@Messages"
             EnableFileUpload="true"
             OnSendMessage="@HandleSendMessage">
    <ChatSettings>
        <ChatFileSelectSettings AllowedExtensions="@allowedExtensions"
                                MaxFileSize="5242880"
                                Multiple="true"
                                OnSelect="@OnFileSelect" />
    </ChatSettings>
</TelerikChat>

@code {
    private List<string> allowedExtensions = new List<string> { ".jpg", ".png", ".pdf", ".docx", ".txt" };

    private async Task OnFileSelect(FileSelectEventArgs args)
    {
        // Validate files before upload
        foreach (var file in args.Files)
        {
            if (file.Size > 5242880) // 5MB limit
            {
                args.IsCancelled = true;
                await ShowError($"File {file.Name} exceeds size limit");
                return;
            }
        }
    }
}
````

## Speech-to-Text Configuration

Enable speech-to-text functionality by setting `EnableSpeechToText` to `true`:

````razor
<TelerikChat Data="@Messages"
             EnableSpeechToText="true"
             OnSendMessage="@HandleSendMessage">
    <ChatSettings>
        <ChatSpeechToTextButtonSettings Language="en-US"
                                        MaxAlternatives="3"
                                        InterimResults="true"
                                        OnResult="@OnSpeechResult" />
    </ChatSettings>
</TelerikChat>

@code {
    private async Task OnSpeechResult(SpeechToTextButtonResultEventArgs args)
    {
        if (args.IsFinal && args.Alternatives?.Any() == true)
        {
            var transcript = args.Alternatives.First().Transcript;
            // Handle the speech recognition result
            await ProcessSpeechInput(transcript);
        }
    }
}
````

## Speech-to-Text Settings

Configure speech recognition behavior using `ChatSpeechToTextButtonSettings`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Language` | `string` | `"en-US"` | Recognition language code |
| `MaxAlternatives` | `int` | `1` | Maximum number of recognition alternatives |
| `InterimResults` | `bool` | `false` | Return interim recognition results |
| `OnResult` | `EventCallback` | - | Event fired when speech is recognized |

## File Actions and Downloads

Configure file actions and handle downloads:

````razor
<TelerikChat Data="@Messages"
             OnDownload="@HandleDownload">
    <ChatFileActions>
        <ChatFileAction Name="Download" Icon="@SvgIcon.Download" />
        <ChatFileAction Name="Share" Icon="@SvgIcon.Share" OnClick="@HandleShareFile" />
        <ChatFileAction Name="Preview" Icon="@SvgIcon.Preview" OnClick="@HandlePreviewFile" />
    </ChatFileActions>
</TelerikChat>

@code {
    private async Task HandleDownload(ChatDownloadEventArgs args)
    {
        foreach (var file in args.Files)
        {
            await DownloadFile(file);
        }
    }

    private async Task HandleShareFile(ChatFileActionClickEventArgs args)
    {
        await ShareFile(args.File);
    }

    private async Task HandlePreviewFile(ChatFileActionClickEventArgs args)
    {
        await PreviewFile(args.File);
    }
}
````

## Media Display in Messages

Display uploaded files and media within messages using templates:

````razor
<TelerikChat Data="@Messages">
    <MessageTemplate Context="context">
        <div>
            @if (!string.IsNullOrEmpty(context.Message.Text))
            {
                <div class="message-text">@context.Message.Text</div>
            }
            
            @if (context.Message.Files?.Any() == true)
            {
                <div class="message-attachments">
                    @foreach (var file in context.Message.Files)
                    {
                        <div class="attachment-item">
                            @if (IsImageFile(file.Extension))
                            {
                                <img src="@GetFileUrl(file)" alt="@file.Name" class="attachment-image" />
                            }
                            else
                            {
                                <div class="attachment-file">
                                    <TelerikSvgIcon Icon="@GetFileIcon(file.Extension)" />
                                    <span>@file.Name</span>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    </MessageTemplate>
</TelerikChat>
````

## File Validation

Implement client-side file validation:

````razor
@code {
    private async Task OnFileSelect(FileSelectEventArgs args)
    {
        var validFiles = new List<FileSelectFileInfo>();
        
        foreach (var file in args.Files)
        {
            // Size validation
            if (file.Size > MaxFileSize)
            {
                await ShowValidationError($"File '{file.Name}' exceeds maximum size of {MaxFileSize / (1024 * 1024)}MB");
                continue;
            }
            
            // Extension validation
            if (!allowedExtensions.Contains(file.Extension.ToLowerInvariant()))
            {
                await ShowValidationError($"File type '{file.Extension}' is not allowed");
                continue;
            }
            
            // Content validation (optional)
            if (!await ValidateFileContent(file))
            {
                await ShowValidationError($"File '{file.Name}' contains invalid content");
                continue;
            }
            
            validFiles.Add(file);
        }
        
        // Update the file selection with only valid files
        args.Files = validFiles;
        
        if (!validFiles.Any())
        {
            args.IsCancelled = true;
        }
    }
}
````

## Security Considerations

When implementing file uploads:

1. **Validate file types** on both client and server
2. **Scan files** for malware before processing
3. **Limit file sizes** to prevent abuse
4. **Store files** in secure locations
5. **Implement access controls** for file downloads
6. **Use virus scanning** services for uploaded content

## Next Steps

* [Handle Chat events](slug:chat-events)
* [Configure message templates](slug:chat-customisation-overview)
* [Set up file actions](slug:chat-messages-tools)

## See Also

* [Chat Overview](slug:chat-overview)
* [FileSelect Component](slug:fileselect-overview)
* [SpeechToTextButton Component](slug:speechtotextbutton-overview)
