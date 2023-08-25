---
title: Events
page_title: DropDownButton - Events
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
@clickedItemInfo
<br />
@moreInfo

<br />
<TelerikDropDownButton Icon="@SvgIcon.Clipboard" OnClick="@((args) => OnItemClick("Primary", args))">
    <DropDownButtonContent>Paste</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardText" OnClick="@((args) => OnItemClick("Paste Text", args))">Paste Text</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardCode" OnClick="@((args) => OnItemClick("Paste as HTML", args))">Paste as HTML</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.ClipboardMarkdown" OnClick="@((args) => OnItemClick("Paste Markdown", args))">Paste Markdown</DropDownButtonItem>
        <DropDownButtonItem OnClick="@((args) => OnItemClick("Set Default Paste", args))">Set Default Paste</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>

@code {
    private string clickedItemInfo;

    private string moreInfo;

    private void OnItemClick(string item, MouseEventArgs args)
    {
        clickedItemInfo = $"User clicked the {item} option.";

        moreInfo = "Ctrl was pressed when clicking the primary button: " + args.CtrlKey;
    }
}
````


## See Also

* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
* [Live Demo: DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
