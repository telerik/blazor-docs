---
title: Change icons position and add more than one icon in a button
description: How to change icons position and add more than one icon in a button?
type: how-to
page_title: Change icons position and add more than one icon in a button
slug: button-kb-changе-icons-position
position: 
tags: telerik,blazor,icon,button,position
ticketid: 1514832
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Button for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
How to make an icon in a button appear on the right side of the text instead of on the left side?
How to include more than one icon in a button?

## Solution
You can change the [icons]({%slug general-information/font-icons%}) position and add more icons in the button, by nesting the `TelerikIcon` in the `TelerikButton` content.


>caption Change the position of the icon in a button and add more than one icon. The result from the snippet below.

![Button with two icons](images/button-change-icon-position-example.png)

````CSHTML
@*This button has two icons, one on the left and one on the right side of the text*@
<TelerikButton>
    <TelerikIcon Icon="check-outline" />
    Check it
    <TelerikIcon Icon="check-outline" />
</TelerikButton>
````
