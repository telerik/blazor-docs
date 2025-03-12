---
title: How To Center Window Programmatically
description: Learn how to center a Telerik Window programmatically by using the Top and Left parameters.
type: how-to
page_title: How To Center Window Programmatically
slug: window-kb-center-programmatically
tags: window, center, position, blazor,
res_type: kb
ticketid:
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This knowledge base article answers the following questions:

* How can I programmatically center a Telerik Window?
* How do I reset a Telerik Window to its default position?
* How can I position a Telerik Window in the center of the viewport?
* How do I dynamically adjust the Telerik Window position?

## Solution

To center a Telerik Window programmatically, follow these steps:

1. Use [`Top` and `Left` parameters](slug:components/window/position#top-and-left) – These parameters define the Window position on the screen.
2. Reset `Top` and `Left` parameters to center the Window – Setting them to `string.Empty` allows automatic centering.
3. Refresh the Window using component reference – Calling `WindowRef?.Refresh();` re-renders the Window with the new position.

>caption Telerik Blazor Window Centered Programmatically

````RAZOR
@if (!IsWindowVisible)
{
    <TelerikButton OnClick="@(() => IsWindowVisible = !IsWindowVisible)">Open Window</TelerikButton>
}
<TelerikButton OnClick="@CenterWindow">Center Window</TelerikButton>

<TelerikWindow @bind-Visible="@IsWindowVisible"
               @bind-Top="@Top"
               @bind-Left="@Left"
               Width="200px"
               Height="200px"
               @ref="WindowRef">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

@code {
    private TelerikWindow? WindowRef { get; set; }
    private bool IsWindowVisible { get; set; } = true;
    private string Top { get; set; } = "30%";
    private string Left { get; set; } = "60%";

    private void CenterWindow()
    {
        Top = Left = string.Empty;
        WindowRef?.Refresh();
    }
}
````

## See Also
- [Window Position](slug:components/window/position)
- [Telerik Window for Blazor - Overview](slug:window-overview)