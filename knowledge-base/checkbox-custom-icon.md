---
title: How to Change Checkbox Icons
description: Learn how to change the Checkbox icon, modify the default check mark and indeterminate icons, and integrate third-party icons.
type: how-to
page_title: How to Change Checkbox Icons
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

This knowledge base article answers the following questions:

* How do I change the Checkbox icon?
* How to change the default check mark icon?
* How to change the icon of the indeterminate state?
* How to integrate custom icons from a third-party library into a Telerik Checkbox component?

## Solution
1. Set a custom CSS class to the Tooltip through the `Class` parameter. This configuration will allow you to target specific Checkbox instances.
2. Use the defiend class to [override the theme styles](slug://themes-override) with the following CSS approach.

>caption How to change the Checkbox icons

````RAZOR
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />

<p>
    <label>
        <TelerikCheckBox @bind-Value="@CheckBoxValue"
                         Size="@ThemeConstants.CheckBox.Size.Large"
                         Indeterminate="@( !CheckBoxValue.HasValue )"
                         Class="custom-icons" />
        Custom CheckBox
    </label>

    <TelerikButton OnClick="@( () => CheckBoxValue = null )">Make Indeterminate</TelerikButton>
</p>

<style>
    /* Set the Font Awesome family and weight for custom checkbox icons */
    .custom-icons.k-checkbox:before {
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
    }

    /* Remove the default background image for checked state */
    .custom-icons.k-checkbox:checked {
        background-image: none;
    }

        /* Set the Font Awesome check mark icon for the checked state */
        .custom-icons.k-checkbox:checked:before {
            content: "\f058"; /* Check Circle icon */
        }

    /* Remove the default background image for indeterminate state */
    .custom-icons.k-checkbox:indeterminate {
        background-image: none;
    }

        /* Set the Font Awesome question icon for the indeterminate state */
        .custom-icons.k-checkbox:indeterminate:before {
            content: "\3f"; /* Question icon */
            margin-left: 3px;
        }
</style>

@code {
    private bool? CheckBoxValue { get; set; }
}
````

## See Also
* [Built-in Font and SVG Icons](slug://common-features-icons)
* [Checkbox Indeterminate State](slug://checkbox-indeterminate-state)

