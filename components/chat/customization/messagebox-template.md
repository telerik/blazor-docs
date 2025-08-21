---
title: MessageBox Template
page_title: Chat MessageBox Template
description: Learn how to customize the input box for sending messages using the MessageBoxTemplate parameter in the Telerik UI for Blazor Chat component.
slug: chat-customisation-messagebox-template
tags: telerik,blazor,chat,customisation,messagebox-template
published: True
position: 16
---

# MessageBox Template

The `MessageBoxTemplate` parameter of the `TelerikChat` component allows you to fully customize the appearance and behavior of the chat input box.

## Usage
You can use `MessageBoxTemplate` to replace the default input area with your own markup, controls, and logic. This is useful for adding custom buttons, icons, or integrating additional features.

### Example
```razor
<TelerikChat Data="@ChatConversation"
             MessageBoxTemplate="@((context) => @<div class=\"custom-messagebox\">Your custom input UI here</div>)"
             ...other parameters...>
</TelerikChat>
```

### Demo Reference
In the demo `Overview.razor`, the input box is customized using the `InputValue` and `OnInputValueChanged` parameters, allowing for two-way binding and advanced input scenarios. You can further enhance this by using `MessageBoxTemplate` for full control.

## API
- `MessageBoxTemplate`: `RenderFragment` - Customizes the message box section.
- `InputValue`: `string` - The value of the input field.
- `OnInputValueChanged`: `EventCallback<string>` - Triggered when the input value changes.

## Tips
- Combine with file upload and speech-to-text features for a rich input experience.
- Add custom validation, formatting, or quick action buttons as needed.

For more advanced scenarios, see the demos in `C:\Repos\blazor\demos\server-side\TelerikBlazorDemos\Pages\Chat`.
