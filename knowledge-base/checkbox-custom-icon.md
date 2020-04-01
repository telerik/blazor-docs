---
title: Change Checkbox Icon
description: How to change the CheckBox icon to a custom one
type: how-to
page_title: Custom Checkbox Icon
slug: checkbox-kb-custom-icon
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Checkbox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How do I change the checkbox icon? I want to use another icon, not the default checkmark.

## Solution

Add a `Class` to the component and cascade through it to alter the font icon glyph that is used.

You can replace it with a different glyph, even froma different font, you can chang the size of the icon and the checkbox and its color.

>caption How to change the checkbox icon

````CSHTML
<TelerikCheckBox Value="true" Class="heart-icon">
</TelerikCheckBox>
<TelerikCheckBox Value="false" Class="heart-icon">
</TelerikCheckBox>
<TelerikCheckBox Value="false" Indeterminate="true" Class="heart-icon">
</TelerikCheckBox>

<style>
    /* remove some built-in styles */
    .heart-icon.k-checkbox,
    .heart-icon.k-checkbox:focus,
    .heart-icon.k-checkbox:checked,
    .heart-icon.k-checkbox:checked:focus {
        border: none;
        background: none;
        box-shadow: none;
    }

        .heart-icon.k-checkbox::before,
        .heart-icon.k-checkbox:checked::before,
        .heart-icon.k-checkbox:indeterminate::before {
            transform: none;
            top: 0;
            left: 0;
            width: auto;
            height: auto;
            font-size: 30px; /* used for dimensions, see the next section */
        }

    /* set desired dimensions */
    .heart-icon.k-checkbox {
        width: 30px;
        height: 30px;
    }

        /* change the font icon glyph to a different one - in this case - a heart icon from the Telerik font
        we also change the colors here to denote states, you can alter this further - like using your own fonts or colors
        */
        .heart-icon.k-checkbox:checked::before {
            content: "\e301";
            color: #ff6358;
        }

        .heart-icon.k-checkbox:indeterminate::before {
            content: "\e300";
            color: #ff6358;
            background: none;
        }

        .heart-icon.k-checkbox::before {
            content: "\e300";
            color: #656565;
        }
</style>
````

