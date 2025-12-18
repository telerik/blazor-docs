---
title: Center Telerik Window Horizontally and Keep Fixed Top Position
description: Learn how to center a Telerik Window only horizontally while keeping it at a fixed distance from the top in Blazor applications.
type: how-to
page_title: How to Center Telerik Window Horizontally with a Fixed Top Position in Blazor
slug: window-kb-center-horizontally-fixed-top
tags: window, center horizontally, positioning, blazor, fixed top
res_type: kb
ticketid: 1672113
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

I want to center a Telerik Window horizontally in my Blazor application but keep it at a fixed distance from the top without using JavaScript for calculations.

This knowledge base article answers the following questions:
- How can I center a Telerik Window only horizontally in Blazor?
- Is it possible to position a Telerik Window at a fixed distance from the top in Blazor while centering it horizontally?

## Solution

To center a Telerik Window horizontally while maintaining a fixed distance from the top, follow these steps:
1. Apply a [custom CSS class](slug:themes-override) to the Window. 
1. Use this CSS class to set the initial top value, manage the horizontal centering and override the default vertical transformation. 

>caption Telerik Blazor Window Centered Horizontally with Fixed Top Value

````RAZOR
<TelerikButton OnClick="@(() => WindowVisible = !WindowVisible)">Toggle Window</TelerikButton>
<TelerikButton OnClick="@OnResetButtonClick">Reset Position</TelerikButton>

<style>
    .k-centered.centered-top {
        top: 100px;
        transform: translate(-50%, -0);
    }
</style>

<TelerikWindow @ref="@WindowRef"
               Class="centered-top"
               @bind-Top="@WindowTop"
               @bind-Left="@WindowLeft"
               @bind-Visible="@WindowVisible">
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

@code {
    private TelerikWindow? WindowRef { get; set; }
    private bool WindowVisible { get; set; } = true;
    private string WindowTop { get; set; } = string.Empty;
    private string WindowLeft { get; set; } = string.Empty;

    private void OnResetButtonClick()
    {
        WindowTop = string.Empty;
        WindowLeft = string.Empty;
        WindowRef!.Refresh();
    }
}
````

## See Also
- [Telerik Window for Blazor - Overview](slug:window-overview)
