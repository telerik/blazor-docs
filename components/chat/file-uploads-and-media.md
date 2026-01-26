---
title: File Uploads and Media
page_title: Chat File Uploads and Media
description: Learn how to configure file uploads, media sharing, and speech-to-text features in the Telerik UI for Blazor Chat component.
slug: chat-file-uploads-and-media
tags: telerik,blazor,chat,file-upload,media,speech-to-text
published: True
position: 4
components: ["chat"]
---
# File Uploads and Media

The Telerik UI for Blazor Chat component supports file uploads, media sharing, and speech-to-text functionality to enhance the messaging experience.

## File Upload Configuration

Enable file uploads by setting the `EnableFileUpload` parameter to `true`:

````RAZOR.skip-repl
<TelerikChat EnableFileUpload="true" />
````

## Message Files Layout

The `MessageFilesLayoutMode` parameter controls how file attachments displaye within Chat messages. Choose from the `ChatMessageFilesLayoutMode` enum options to best fit your application's design:

* `Vertical`&mdash;Files are displayed in a vertical stack (default)
* `Horizontal`&mdash;Files are displayed in a horizontal row
* `Wrap`&mdash;Files wrap to the next line when they exceed the message width

````RAZOR.skip-repl
<TelerikChat EnableFileUpload="true"
             MessageFilesLayoutMode="@ChatMessageFilesLayoutMode.Horizontal">
</TelerikChat>
````

## File Upload Settings

Configure file upload behavior using the `ChatFileSelectSettings` component:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `AllowedExtensions` | `List<string>` | `null` | Allowed file extensions for upload |
| `MaxFileSize` | `long` | `null` | Maximum file size in bytes |
| `Multiple` | `bool` | `true` | Allow multiple file selection |
| `OnSelect` | `EventCallback` | - | Event fired when files are selected |

>caption An exemplary Chat file upload configuration

````razor
<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             AuthorId="@CurrentUserId"
             EnableFileUpload="true"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh"
             Width="600px">
    <ChatSettings>
        <ChatFileSelectSettings AllowedExtensions="@AllowedExtensions"
                                MaxFileSize="10485760"
                                Multiple="true" />
    </ChatSettings>
    <ChatFileActions>
        <ChatFileAction Icon="@SvgIcon.Download" Text="Download" />
        <ChatFileAction Icon="@SvgIcon.Share" Text="Share" />
    </ChatFileActions>
</TelerikChat>

@code {
    private TelerikChat<Message>? ChatRef;

    private List<string> AllowedExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".pdf", ".docx", ".txt" };

    private const string CurrentUserId = "user1";

    private List<Message> ChatData = new List<Message>()
    {
        new Message()
        {
            Id = "1",
            AuthorId = "support",
            AuthorName = "File Support",
            Text = "Welcome! You can upload files by clicking the attachment button or dragging files into the input area.",
            Timestamp = DateTime.Now.AddMinutes(-5)
        },
        new Message()
        {
            Id = "2",
            AuthorId = "support",
            AuthorName = "File Support", 
            Text = "Here's an example message with an attachment:",
            Timestamp = DateTime.Now.AddMinutes(-3),
            Files = new List<FileSelectFileInfo>
            {
                new FileSelectFileInfo
                {
                    Id = "sample-doc",
                    Name = "sample-document.pdf",
                    Size = 245760, 
                    Extension = ".pdf"
                }
            }
        }
    };

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new Message
        {
            AuthorId = CurrentUserId,
            AuthorName = "You",
            Text = args.Message,
            Files = args.Files?.ToList() ?? new List<FileSelectFileInfo>()
        };

        ChatData.Add(newMessage);

        if (args.Files?.Any() == true)
        {
            var fileNames = string.Join(", ", args.Files.Select(f => f.Name));
            var responseMessage = new Message
            {
                AuthorId = "support",
                AuthorName = "File Support",
                Text = $"Thank you! I received {args.Files.Count()} file(s): {fileNames}",
                Timestamp = DateTime.Now.AddSeconds(1)
            };
            
            ChatData.Add(responseMessage);
        }

        ChatRef?.Refresh();
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## Attachments

Configure how file attachments are displayed and handled in chat messages using the `FilesField` parameter. This parameter specifies which property of your message model contains the file attachment information.

The `FilesField` parameter binds to a collection of `FileSelectFileInfo` objects that represent the uploaded files. Each attachment includes metadata such as file name, size, extension, and unique identifier.

````RAZOR.skip-repl
<TelerikChat Data="@ChatConversation"
             TextField="Content"
             FilesField="Attachments"
             EnableFileUpload="true">
</TelerikChat>

@code {
    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        
        // This property is bound to FilesField="Attachments"
        public IEnumerable<FileSelectFileInfo> Attachments { get; set; } = new List<FileSelectFileInfo>();
    }
}
````

When messages contain attachments, they are automatically displayed with file icons, names, and sizes. Users can interact with attachments through the configured file actions.

## File Actions and Downloads

Configure file actions and handle downloads using JavaScript interop and custom event handlers.

1. Add JavaScript Interop

   Add this JavaScript function to enable file downloads:

   ````html.skip-repl
   @inject IJSRuntime JS

   <script>
       window.downloadFileFromBytes = (base64Data, filename, mimeType) => {
           try {
               const byteCharacters = atob(base64Data);
               const byteNumbers = new Array(byteCharacters.length);
               for (let i = 0; i < byteCharacters.length; i++) {
                   byteNumbers[i] = byteCharacters.charCodeAt(i);
               }
               const byteArray = new Uint8Array(byteNumbers);
               const blob = new Blob([byteArray], { type: mimeType });
               const objectUrl = URL.createObjectURL(blob);
               const a = document.createElement('a');

               a.href = objectUrl;
               a.download = filename;
               a.style.display = 'none';
               document.body.appendChild(a);
               a.click();
               document.body.removeChild(a);
               
               URL.revokeObjectURL(objectUrl);
           } catch (error) {
               console.error('Error downloading file:', error);
           }
       };
   </script>
   ````

2. Configure File Actions

   Configure the `Download` file action:

   ````RAZOR.skip-repl
   <TelerikChat>
       <ChatFileActions>
           <ChatFileAction Icon="@SvgIcon.Download" Text="Download" OnClick="@OnDirectFileDownload" />
           <ChatFileAction Icon="@SvgIcon.Share" Text="Share" />
           <ChatFileAction Icon="@SvgIcon.Pin" Text="Pin" />
       </ChatFileActions>
   </TelerikChat>
   ````

3. Implement a click handler for the `Download` file action.

   The click handler calls the js `downloadFileFromBytes` function. 

   ````csharp.skip-repl
   private async Task OnDirectFileDownload(ChatFileActionClickEventArgs args)
   {
       try
       {
           var filePath = Path.Combine(Environment.WebRootPath, "chat-files", args.File.Name);

           if (System.IO.File.Exists(filePath))
           {
               var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);

               var base64String = Convert.ToBase64String(fileBytes);

               var mimeType = GetMimeType(args.File.Extension);

               await JS.InvokeVoidAsync("downloadFileFromBytes", base64String, args.File.Name, mimeType);
           }
           else
           {
               Console.WriteLine($"File not found: {filePath}");
           }
       }
       catch (Exception ex)
       {
           Console.WriteLine($"Error downloading file {args.File.Name}: {ex.Message}");
       }
   }
   ````


## File Validation

The Chat component provides built-in file validation through the `ChatFileSelectSettings` configuration. You can control which files users can upload and set size restrictions to ensure appropriate content and prevent system overload.

### AllowedExtensions

Use the `AllowedExtensions` parameter to restrict file uploads to specific file types. This helps ensure users only upload supported formats and prevents potential security issues.

````RAZOR.skip-repl
<TelerikChat>
    <ChatFileSelectSettings AllowedExtensions="@AllowedExtensions" />
</TelerikChat>

@code {
    private List<string> AllowedExtensions = new List<string> 
    { 
        ".jpg", ".jpeg", ".png", ".gif",  // Images
        ".pdf", ".doc", ".docx",          // Documents
        ".txt", ".csv",                   // Text files
        ".zip", ".rar"                    // Archives
    };
}
````

When a user attempts to upload a file with an extension not in the allowed list, the Chat component will automatically prevent the upload.

### MaxFileSize

Set the `MaxFileSize` parameter to limit the size of uploaded files in bytes. This prevents users from uploading files that are too large for your system to handle efficiently.

````RAZOR.skip-repl
<TelerikChat>
    <ChatFileSelectSettings MaxFileSize="10485760" />
<TelerikChat>
````

Files exceeding the specified size limit will be rejected.

## Speech-to-Text

The Chat component includes built-in speech-to-text functionality that allows users to input messages using voice commands. This feature leverages the browser's Web Speech API to convert spoken words into text, providing an accessible and convenient way to interact with the chat interface.

Speech-to-text is particularly useful for mobile users, accessibility scenarios, or when typing is inconvenient. The component provides customizable settings to control language recognition, result accuracy, and interim feedback.

### Configuration

Enable speech-to-text functionality by setting `EnableSpeechToText` to `true`:

````RAZOR.skip-repl
<TelerikChat EnableSpeechToText="true">
    <ChatSettings>
        <ChatSpeechToTextButtonSettings Lang="en-US"
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

### Settings

Configure speech recognition behavior using `ChatSpeechToTextButtonSettings`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Lang` | `string` | `"en-US"` | Recognition language code |
| `MaxAlternatives` | `int` | `1` | Maximum number of recognition alternatives |
| `InterimResults` | `bool` | `false` | Return interim recognition results |
| `OnResult` | `EventCallback` | - | Event fired when speech is recognized |

## See Also

* [Chat Overview](slug:chat-overview)
* [FileSelect Component](slug:fileselect-overview)
* [SpeechToTextButton Component](slug:speechtotextbutton-overview)
