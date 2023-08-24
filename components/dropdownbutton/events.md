---
title: Events
page_title: DropDownButton Events
description: How to handle events with the DropDownButton for Blazor.
slug: dropdownbutton-events
tags: telerik,blazor,dropdownbutton,events
published: True
position: 15
---

# DropDownButton Events

This article describes the DropDownButton events:

* [OnClick](#onclick)

## OnClick

The `OnClick` event fires when the user clicks or taps the primary button or a secondary button. The primary `<TelerikDropDownButton>` and each of its `<DropDownButtonItem>` instances execute a separate `OnClick` handler.

The event argument type is [`MouseEventArgs`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).
 
The event handler can be synchronous (`void`) or asynchronous (`async Task`).

>caption Handling the DropDownButton OnClick event

````CSHTML
<TelerikDropDownButton Icon="@SvgIcon.Clipboard" OnClick="@OnPrimaryButtonClick">
    <DropDownButtonContent>Paste</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardText" OnClick="@(() => OnItemClick("Paste Text"))">Paste Text</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardCode" OnClick="@(() => OnItemClick("Paste as HTML"))">Paste as HTML</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardMarkdown" OnClick="@(() => OnItemClick("Paste Markdown"))">Paste Markdown</DropDownButtonItem>
        <DropDownButtonItem OnClick="@(() => OnItemClick("Set Default Paste"))">Set Default Paste</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>

@code {
    private void OnPrimaryButtonClick()
    {
        Console.WriteLine($"User clicked the primary button.");
    }

    private void OnItemClick(string item)
    {
        Console.WriteLine($"User clicked {item} option.");
    }
}
````


## See Also

* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
* [Live Demo: DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
