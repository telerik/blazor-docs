---
title: Templates
page_title: Chat Templates
description: A comprehensive guide to the customizable templates available in the Telerik Chat component for Blazor.
slug: chat-templates
keywords: blazor, telerik, chat, templates, customization
published: True
position: 8
components: ["chat"]
---

# Chat Templates

The Telerik Chat component in Blazor allows for a high degree of customization through various templates. Each template provides a way to customize the UI rendering of the Chat interface, making it more suitable for your application’s needs. 

Below are the available templates along with examplary usage.

## HeaderTemplate

This template allows you to customize the Chat header, where you can display titles, logos, or buttons.


````RAZOR.skip-repl
<HeaderTemplate>
    <span style="padding: 1rem; font-weight: 500;">
        Chat with John Smith
    </span>
</HeaderTemplate>
````

## NoDataTemplate

The `NoDataTemplate` lets you to define custom content displayed when the Chat has no messages. This is useful for showing welcome messages, instructions, or branding when the conversation is empty.

````RAZOR.skip-repl
<NoDataTemplate>
    <p><strong style="color: var(--kendo-color-primary);">No Messages Available.</strong></p>
    <p>Start a conversation by typing a message below!</p>
</NoDataTemplate>
````

## MessageContentTemplate

The `MessageContentTemplate` provides the option to customize how individual message content is rendered within the Chat.

````RAZOR.skip-repl
<MessageContentTemplate>
    <div style="color:red;">
        @context.Message.Content
    </div>
</MessageContentTemplate>
````

## AuthorMessageContentTemplate

The `AuthorMessageContentTemplate` allows you to customize the appearance of message content for messages sent by the current user (author). This template takes precedence over `MessageContentTemplate` when defined, enabling different styling for sent versus received messages.

````RAZOR.skip-repl
<AuthorMessageContentTemplate>
    <div style="color: blue; font-weight: bold;">
        @context.Message.Content
    </div>
</AuthorMessageContentTemplate>
````

## ReceiverMessageContentTemplate

The `ReceiverMessageContentTemplate` allows you to customize the appearance of message content for messages received from other users. This template takes precedence over `MessageContentTemplate` when defined, providing flexibility to style incoming messages differently.

````RAZOR.skip-repl
<ReceiverMessageContentTemplate>
    <div style="color: green; font-style: italic;">
        @context.Message.Content
    </div>
</ReceiverMessageContentTemplate>
````

## MessageTemplate

The `MessageTemplate` allows you to customize the entire message bubble rendering, including the wrapper and structure around the message content. This provides complete control over the message appearance.

````RAZOR.skip-repl
<MessageTemplate>
    <div class="custom-message-bubble">
        <div class="message-header">@context.Message.AuthorName</div>
        <div class="message-body">@context.Message.Content</div>
    </div>
</MessageTemplate>
````

## AuthorMessageTemplate

The `AuthorMessageTemplate` allows you to customize the entire message bubble for messages sent by the current user (author). This template takes precedence over `MessageTemplate` when defined, enabling control over the author's message structure and appearance.

````RAZOR.skip-repl
<AuthorMessageTemplate>
    <div class="author-message-bubble" style="background: #e3f2fd;">
        <div class="message-content">@context.Message.Content</div>
        <div class="message-time">@context.Message.Timestamp.ToString("hh:mm tt")</div>
    </div>
</AuthorMessageTemplate>
````

## ReceiverMessageTemplate

The `ReceiverMessageTemplate` allows you to customize the entire message bubble for messages received from other users. This template takes precedence over `MessageTemplate` when defined, providing the option to specify how incoming messages are structured and displayed.

````RAZOR.skip-repl
<ReceiverMessageTemplate>
    <div class="receiver-message-bubble" style="background: #f5f5f5;">
        <div class="sender-name">@context.Message.AuthorName</div>
        <div class="message-content">@context.Message.Content</div>
        <div class="message-time">@context.Message.Timestamp.ToString("hh:mm tt")</div>
    </div>
</ReceiverMessageTemplate>
````

## UserStatusTemplate

The `UserStatusTemplate` allows you to render custom content next to the user avatar, such as status badges, indicators, or icons. This is useful for showing user availability (online, away, busy) or other contextual information.

````RAZOR.skip-repl
<UserStatusTemplate>
    @if (context.Message.AuthorStatus == "online")
    {
        <span class="status-badge" style="background: green; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
    }
    else if (context.Message.AuthorStatus == "away")
    {
        <span class="status-badge" style="background: orange; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
    }
</UserStatusTemplate>
````

## MessageStatusTemplate

You can use this template to display the status of a message (e.g., Sent, Seen).

````RAZOR.skip-repl
<MessageStatusTemplate>
    <div style="color:red;">
        @context.Message.Status
    </div>
</MessageStatusTemplate>
````

## SuggestionTemplate

This template allows you to customize how suggestion buttons are displayed in the Chat interface. Suggestions provide quick reply options for users.

````RAZOR.skip-repl
<SuggestionTemplate>
    <div style="color:blue;">
        @context.Suggestion
    </div>
</SuggestionTemplate>
````

## MessageBoxTemplate

This template allows you to customize the input area where users type their messages.

````RAZOR.skip-repl
<MessageBoxTemplate>
    <input type="text" class="k-textbox" placeholder="Type your message here..." @bind-value="@ChatInputValue" @bind-value:event="oninput" />
    <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" @onclick="@( () => OnChatSendMessage(new ChatSendMessageEventArgs { Message = ChatInputValue }) )">Send</button>
</MessageBoxTemplate>
````

## TimestampTemplate

This template allows you to customize how timestamps are displayed for messages.

````RAZOR.skip-repl
<TimestampTemplate>
    <span style="font-size: 12px; color: #888;">
        @context.Timestamp.ToString("dddd, MMMM d, yyyy")
    </span>
</TimestampTemplate>
````

## ChatMessageContextMenuActions

This allows you to define context menu actions that can be performed on Chat messages.

````RAZOR.skip-repl
<ChatMessageContextMenuActions>
    <ChatMessageContextMenuAction Name="Reply" />
    <ChatMessageContextMenuAction Name="Copy" />
    <ChatMessageContextMenuAction Icon="@SvgIcon.Pin" OnClick="PinMessage" Text="Pin" />
</ChatMessageContextMenuActions>
````

## Text Area Affix Templates

The `ChatTextAreaSettings` component provides three template parameters that add custom content to the Chat input area. These templates are additive and render alongside the built-in buttons, without replacing them. Use them as a lightweight alternative to `MessageBoxTemplate` when you need to extend the input area while retaining the built-in send, file upload, and speech-to-text functionality.

### Adding Custom Content

Set one or more affix templates in `ChatTextAreaSettings` to place custom content at the start, end, or top of the input area.

>caption Chat with custom content in all three affix positions

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             EnableSpeechToText="true"
             EnableFileUpload="true"
             OnSendMessage="@OnSendMessage"
             AuthorId="1">
    <ChatSettings>
        <ChatTextAreaSettings Mode="@PromptBoxMode.MultiLine">
            <ChatTextAreaStartAffixTemplate>
                <TelerikSvgIcon Icon="@SvgIcon.Globe" />
            </ChatTextAreaStartAffixTemplate>
            <ChatTextAreaEndAffixTemplate>
                <TelerikButton Icon="@SvgIcon.Heart"
                               FillMode="@ThemeConstants.Button.FillMode.Flat"
                               Size="@ThemeConstants.Button.Size.Small" />
            </ChatTextAreaEndAffixTemplate>
            <ChatTextAreaTopAffixTemplate>
                <span>Tip: Be specific for better results</span>
            </ChatTextAreaTopAffixTemplate>
        </ChatTextAreaSettings>
    </ChatSettings>
</TelerikChat>
````

The ordering rules for each template position are:

* `ChatTextAreaStartAffixTemplate`&mdash;The built-in file select button renders first (when `EnableFileUpload` is `true`), then the template content follows.
* `ChatTextAreaEndAffixTemplate`&mdash;Template content renders first, then the built-in speech-to-text and send buttons follow.
* `ChatTextAreaTopAffixTemplate`&mdash;Renders above the text input. Visible only in multi-line mode (`PromptBoxMode.MultiLine` or `PromptBoxMode.Auto` when expanded).

### Repositioning Built-in Buttons

To reposition a built-in button, disable it and add it inside an affix template. Set `EnableSpeechToText="false"`, `EnableFileUpload="false"`, or `EnableActionButton="false"` to remove a button from its default position. Then place the corresponding `PromptBoxSpeechToTextButton`, `PromptBoxFileSelectButton`, or `PromptBoxActionButton` component inside any affix template.

>caption Move the speech-to-text and file select buttons to the start affix

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             EnableSpeechToText="false"
             EnableFileUpload="false"
             OnSendMessage="@OnSendMessage"
             AuthorId="1">
    <ChatSettings>
        <ChatTextAreaSettings Mode="@PromptBoxMode.Auto">
            <ChatTextAreaStartAffixTemplate>
                <PromptBoxSpeechToTextButton Lang="en-US"
                                             FillMode="@ThemeConstants.Button.FillMode.Flat"
                                             Size="@ThemeConstants.Button.Size.Small" />
                <PromptBoxFileSelectButton Multiple="true"
                                           FillMode="@ThemeConstants.Button.FillMode.Flat"
                                           Size="@ThemeConstants.Button.Size.Small" />
            </ChatTextAreaStartAffixTemplate>
        </ChatTextAreaSettings>
    </ChatSettings>
</TelerikChat>
````

>caption Move the send button to the start affix

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             EnableActionButton="false"
             EnableSpeechToText="true"
             OnSendMessage="@OnSendMessage"
             AuthorId="1">
    <ChatSettings>
        <ChatTextAreaSettings Mode="@PromptBoxMode.Auto">
            <ChatTextAreaStartAffixTemplate>
                <PromptBoxActionButton FillMode="@ThemeConstants.Button.FillMode.Flat"
                                       Rounded="@ThemeConstants.Button.Rounded.Full"
                                       Size="@ThemeConstants.Button.Size.Small" />
            </ChatTextAreaStartAffixTemplate>
        </ChatTextAreaSettings>
    </ChatSettings>
</TelerikChat>
````

## Complete Example

>caption A complete example that integrates all templates into a Chat component

<demo metaUrl="client/chat/templates/complete/" height="700"></demo>

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
