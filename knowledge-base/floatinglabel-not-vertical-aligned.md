---
title: Aligning FloatingLabel Vertically in TextBox
description: Learn how to align the FloatingLabel vertically in the TextBox component in UI for Blazor.
type: how-to
page_title: How to Align FloatingLabel in UI for Blazor TextBox
meta_title: Align FloatingLabel in UI for Blazor TextBox
slug: aligning-floating-label-vertically-in-textbox
tags: blazor, textbox, floatinglabel, alignment
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for Blazor TextBox</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

When using the [TextBox](https://docs.telerik.com/blazor-ui/components/textbox/overview) component in UI for Blazor, the FloatingLabel may not align vertically as expected. This misalignment can affect the appearance and usability of the input field.

This knowledge base article also answers the following questions:
- How to fix FloatingLabel alignment issues in TextBox?
- How to adjust vertical alignment of FloatingLabel in UI for Blazor TextBox?
- How to ensure proper FloatingLabel placement in Blazor TextBox?

## Solution

To align the FloatingLabel vertically in the TextBox component, customize the CSS styles applied to the FloatingLabel. Use the steps below:

1. Create a custom CSS class to adjust the vertical alignment of the FloatingLabel.

    ```css
    .custom-floating-label {
        line-height: normal;
        display: flex;
        align-items: center;
    }
    ```

2. Apply this custom CSS class to the `FloatingLabel` property of the TextBox.

    ```razor
    <TelerikTextBox FloatingLabel="Your Label" Class="custom-floating-label" />
    ```

3. Test the TextBox to ensure the FloatingLabel aligns correctly.

## See Also

- [TextBox Documentation](https://docs.telerik.com/blazor-ui/components/textbox/overview)
- [FloatingLabel Overview](https://docs.telerik.com/blazor-ui/components/textbox/floatinglabel)
- [UI for Blazor Styling and Theming](https://docs.telerik.com/blazor-ui/styling-and-theming/overview) 
