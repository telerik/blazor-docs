---
title: Changing the Icon Position and Add Two or More Icons in a Button
description: Learn how to change the position of the icons inside the Telerik UI for Blazor Button and add more than one icon to the component.
type: how-to
page_title: Repositioning Icons and Add More Icons to Button Components
slug: button-kb-changе-icons-position
tags: telerik,blazor,icon,button,position
ticketid: 1514832
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Telerik® UI for Blazor Button</td>
		</tr>
	</tbody>
</table>


## Description

How can I show an icon in a Telerik UI for Blazor Button on the right side of the text instead of on the left side?
How can I also include more than one icon in the Button?

## Solution

You can change the position of the [icons]({%slug general-information/font-icons%}) and add more icons in the button by nesting the `TelerikIcon` in the `TelerikButton` content.

>caption Reposition the Button icon and add more than one icon to the component

![Telerik UI for Blazor Button with two icons](images/button-change-icon-position-example.png)

````CSHTML
@*This button has two icons, one on the left and one on the right side of the text*@
<TelerikButton>
    <TelerikSvgIcon Icon="@SvgIcon.CheckOutline" />
    Check it
    <TelerikSvgIcon Icon="@SvgIcon.CheckOutline" />
</TelerikButton>
````
