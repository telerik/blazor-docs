---
title: How to minimize a popup window to the bottom of the page?
description: 
type: how-to
page_title: How to minimize a popup window to the bottom of the page?
slug: window-modal-minimize-popup
position: 
tags: window,modal,popup,collapse,minimize
ticketid: 1542823
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
Is there any way to collapse a window to the bottom of a page? How to create a responsive modal that can be minimized? How can I minimize Modal Window as a chat for messages?

## Solution
To implement a responsible popup that can be minimized to the bottom of the page:

1. Implement custom HTML div that presents the Modal Window minimized.
2. Use boolean flags to show and hide the popup.
3. Use the [MediaQuery](https://docs.telerik.com/blazor-ui/components/mediaquery/overview) component to make the modal window responsive.

>caption The result from the code snippet below on a big screen.

![](images/window-big-screen.gif)

>caption The result from the code snippet below on a small screen.

![](images/window-small-screen.gif)

````Razor
@*Responsive minimizable popup.*@

<TelerikMediaQuery Media="(max-width: 960px)" OnChange="((changed) => Small = changed)"></TelerikMediaQuery>

<TelerikWindow Modal="true" @bind-Visible="@isModalVisible">
    <WindowTitle>
        <strong>@Title</strong>
    </WindowTitle>
    <WindowContent>
        ---------- Welcome to our Minimized/Collapsed popup! ----------
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

@if (isModalVisible == false)
{
    @if (Small)
    {
        <br />
        <div @onclick="@( _ => isModalVisible = true )" class="minimized"><strong>@Title[0]</strong></div>
    }
    else
    {
        <div @onclick="@( _ => isModalVisible = true )" class="k-window-titlebar k-dialog-titlebar k-header" style="width:15%;justify-content: space-between;margin-top: 49%">
            <strong>@Title</strong>
            <button @onclick="@( _ => isModalVisible = true )" class="k-flat k-button telerik-blazor k-icon-button"><span class="k-icon k-i-window-maximize"></span></button>
        </div>
    }
}

@code {
    string Title = "My Responsive Popup";
    bool isModalVisible { get; set; } = true;

    private bool Small { get; set; }
}

<style>
    .minimized {
        background-color: #ff6358;
        color: white;
        display: inline;
        padding: 23px;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
    }
</style>
````
