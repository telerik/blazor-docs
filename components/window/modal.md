---
title: Modal
page_title: Window - Modal
description: How to make a modal Window for Blazor.
slug: components/window/modal
tags: telerik,blazor,window,modal
published: True
position: 5
components: ["window"]
---
# Modal Window

The Window for Blazor can be modal so that the user is unable to interact with the rest of the page until it closes.

To make a modal window, set its `Modal` property to `true`.

It is possible for users to close a modal Window by clicking on the modal background around it. To allow this behavior, set `CloseOnOverlayClick` to `true`.

>caption Open and close a modal Window

````RAZOR
<TelerikWindow Modal="true"
               @bind-Visible="@isModalVisible"
               CloseOnOverlayClick="true">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        I am modal, so the page content behind me is not accessible to the user.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@( _ => isModalVisible = true )">Open the window</TelerikButton>

@code{
    bool isModalVisible { get; set; } = true;
}
````

## See Also

* [Live Demo: Modal Window](https://demos.telerik.com/blazor-ui/window/modal)
