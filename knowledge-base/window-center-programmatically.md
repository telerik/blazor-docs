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

1. Set the [`Top` and `Left` parameters](slug:components/window/position#top-and-left) using `@bind-Top` and `@bind-Left` or the [`TopChanged` and `LeftChanged` events](slug:window-events#leftchanged-and-topchanged).
2. Set both parameters to `string.Empty` to center the Window initially or any time afterwards.
3. [Call the `Refresh()` method of the Window component instance](slug:window-overview#window-reference-and-methods) to re-render the Window at the new position.

>caption Center the Telerik Blazor Window Programmatically

````RAZOR
<TelerikWindow Visible="true"
               @bind-Top="@Top"
               @bind-Left="@Left"
               Width="200px"
               Height="200px"
               @ref="WindowRef">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        <TelerikButton OnClick="@CenterWindow">Center Window</TelerikButton>
    </WindowContent>
</TelerikWindow>

@code {
    private TelerikWindow? WindowRef { get; set; }
    private string Top { get; set; } = "10%";
    private string Left { get; set; } = "10%";

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