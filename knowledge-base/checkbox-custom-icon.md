---
title: Change Checkbox Icon
description: How to change the CheckBox icon to a custom one.
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

Add a `Class` to the CheckBox component. [Override the theme styles]({%slug themes-override%}) and change the default font icon glyphs.

You can replace the icons with different glyphs, even from a different font. You can also change the icon size and color.

The `k-icon` CSS class applies the custom font, which contains all [built-in Telerik font icons]({%slug common-features-icons%}). If you will use a different font, remove `k-icon`.

>caption How to change the checkbox icon

````CSHTML
<TelerikCheckBox Value="true" Class="k-icon heart-icon" />
<TelerikCheckBox Value="false" Class="k-icon heart-icon" />
<TelerikCheckBox Value="false" Indeterminate="true" Class="k-icon heart-icon" />

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

