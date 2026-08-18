---
title: Messages
page_title: Chat Messages
description: Learn how to configure message actions, styling, and behavior in the Telerik UI for Blazor Chat component.
slug: chat-messages
tags: telerik,blazor,chat,messages,actions,styling
published: True
position: 5
components: ["chat"]
---

# Chat Messages

The Telerik UI for Blazor Chat component provides comprehensive control over message display, interactions, and styling to create rich conversational experiences.

## Typing Indicator

The Chat supports displaying a typing indicator to show when another user is composing a message. When a message has `IsTyping` set to `true`, the component will display an animated typing indicator (typically three dots) instead of the message content. This provides visual feedback that enhances the conversational experience, especially in real-time chat scenarios.

First, set the `IsTypingField` parameter to specify which field in your data model indicates typing status. Next, set that field to `true` on a message to display the typing indicator.

<demo metaUrl="client/chat/messages/typing-indicator/" height="600"></demo>

## Retry Failed Message

The Chat component supports retrying failed messages. When a message has its `IsFailed` field set to `true`, the component displays a resend button that triggers the [`OnResendMessage`](slug:chat-events#onresendmessage) event, allowing you to handle the retry logic.

To enable this behavior:

1. Set the `IsFailedField` parameter to indicate which field in your data model marks a message as failed.

2. Set that field to `true` for a message to show the resend button.

For a complete implementation example, see the [`OnResendMessage` event article](slug:chat-events#onresendmessage).

## Context Menu Message Actions

Configure context menu actions that appear when users right-click on messages. These actions provide quick access to common message operations.

<demo metaUrl="client/chat/messages/context-menu-actions/" height="700"></demo>

## Toolbar Message Actions

Configure toolbar actions that appear when messages are selected or hovered. These provide quick access to frequently used operations.

````RAZOR.skip-repl
<TelerikChat>
    <ChatMessageToolbarActions>
        <ChatMessageToolbarAction Name="React" Text="React" Icon="@SvgIcon.Heart" OnClick="@OnReactClick" />
        <ChatMessageToolbarAction Name="Forward" Text="Forward" Icon="@SvgIcon.Forward" OnClick="@OnForwardClick" />
        <ChatMessageToolbarAction Name="Quote" Text="Quote" Icon="@SvgIcon.Quote" OnClick="@OnQuoteClick" />
    </ChatMessageToolbarActions>
</TelerikChat>
````

## Messages Styling

The Chat component provides several styling options for messages, allowing you to customize their appearance, behavior, and layout to match your application's design.

### Expanding and Collapsing Messages

Control message collapsing behavior using the `EnableMessageCollapse` parameter. When enabled, long messages can be collapsed to save space and expanded when needed for better readability.

Set `EnableMessageCollapse="true"` to allow users to collapse and expand messages in the chat interface.

### Messages Width

Control the width behavior of chat messages using the `MessageWidthMode` parameter:

* `MessageWidthMode.Standard`&mdash;Messages take up a portion of the available space for better readability (default behavior)
* `MessageWidthMode.Full`&mdash;Messages span the full width of the chat container

## Author and Receiver Message Settings

The Chat component lets you configure settings specifically for author messages (sent by the current user) and receiver messages (received from other users) using `ChatAuthorMessageSettings` and `ChatReceiverMessageSettings` components. These settings take precedence over global Chat settings, enabling different configurations for sent and received messages.

Use these settings to customize message behavior, appearance, and available actions based on whether the message was sent or received. For example, you might want different context menu actions, toolbar actions, or file actions for your own messages versus messages from others.

<demo metaUrl="client/chat/messages/author-receiver-settings/" height="600"></demo>

`ChatAuthorMessageSettings` and `ChatReceiverMessageSettings` provide the following settings:

* `EnableMessageCollapse`&mdash;Enables the collapse functionality for long messages
* `MessageWidthMode`&mdash;Controls message width (`Standard` or `Full`)
* `ChatMessageContextMenuActions`&mdash;Defines context menu actions for right-click interactions
* `ChatMessageToolbarActions`&mdash;Defines toolbar actions that appear on hover or selection
* `ChatFileActions`&mdash;Defines actions available for file attachments

If no author or receiver-specific setting is provided, the component falls back to the global Chat settings.

## Send Message Button Customization

Customize the appearance of the send message button using the `ChatSendMessageButtonSettings` component. The `Class` parameter applies custom CSS classes for styling, and the `Title` parameter sets the button's accessible title (tooltip text).

<demo metaUrl="client/chat/messages/send-button-customization/" height="600"></demo>

## Message Input Configuration

Use the `ChatTextAreaSettings` component inside `<ChatSettings>` to configure the message input area. The `Placeholder` parameter sets the hint text displayed in the input when it is empty.

````RAZOR.skip-repl
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId">
    <ChatSettings>
        <ChatTextAreaSettings Placeholder="Type your message here..." />
    </ChatSettings>
</TelerikChat>
````

## Message Box Value Persistence

The message box value represents the text that users have typed but haven't sent yet.

The Chat component offers complete control over the message input using the `InputValue` property and `OnInputValueChange` event.

Set the `InputValue` property to define the message box content and handle the `OnInputValueChange` event to track user typing in real-time. This enables implementing features such as draft auto-saving, input validation, or contextually pre-populating the message box.

<demo metaUrl="client/chat/messages/input-value-persistence/" height="700"></demo>

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
* [Chat Overview](slug:chat-overview)
