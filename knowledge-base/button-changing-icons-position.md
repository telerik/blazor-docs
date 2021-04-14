---
title: Changе icons position and add more than one icon in a button
description: 
type: how-to
page_title: Changе icons position and add more than one icon in a button
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
How to make the icon appear on the right side of the text instead of on the left side in the button?
How to have more than one icon in a button?

## Solution
You can change the [icons]({%slug general-information/font-icons%}) position and add more icons in the button, by nesting the `TelerikIcon` in the `TelerikButton` content.

````CSHTML
@*This button has two icons, one on the left and one on the right side of the text*@
<TelerikButton>
    <TelerikIcon Icon="check-outline" />
    Check it
    <TelerikIcon Icon="check-outline" />
</TelerikButton>
@code{
}
````
