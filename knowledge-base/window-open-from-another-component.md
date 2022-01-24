---
title: Open a Window from another component
description: How to open a Window from another component?
type: how-to
page_title: Open a Window from another component
slug: window-kb-open-from-another-component
position: 
tags: telerik, blazor, window, open, show, another, page, component
ticketid:
res_type: kb
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

I want to make a separate razor page to hold the markup and code for the Window component and be able to open it from another page. How to achieve that?

## Solution

You can get a reference to the component hosting the Window and use that to toggle the field that is bound to the Visible parameter of the window.

Another option would be to send such a reference as a cascading parameter if you have a more complex hierarchy and you need to go up and not down.


>caption Open a Window from another component


````MainPage.razor
@* The page/component that you want to open the Window from *@

<TelerikButton OnClick="@ToggleWindow" ThemeColor="primary">Toggle Window</TelerikButton>

<Window @bind-WindowIsVisible="@Visible"></Window>


@code {
    bool Visible { get; set; }

    void ToggleWindow()
    {
        Visible = !Visible;
    }
}
````
````Window.razor
@* Separate component hosting the markup and logic for the TelerikWindow *@

<TelerikWindow Visible="@WindowIsVisible" VisibleChanged="@WindowIsVisibleChanged">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my Window from another component.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code {
    [Parameter]
    public bool WindowIsVisible { get; set; }

    [Parameter]
    public EventCallback<bool> WindowIsVisibleChanged { get; set; }
}
````
