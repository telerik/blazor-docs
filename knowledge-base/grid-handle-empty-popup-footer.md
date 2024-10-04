---
title:  How to handle the empty popup footer when using the Popup Form Template
description: Learn how to either hide the empty footer in the edit popup of the Grid for Blazor or use it to display custom Form buttons.
type: how-to
page_title: How to handle the empty popup footer when using the Popup Form Template
slug: grid-kb-handle-empty-popup-footer
tags: grid, blazor, edit form, popup form template, footer, custom buttons, empty
res_type: kb
ticketid: 1665785
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When using the Popup Form Template in the Grid for Blazor, the footer remains empty, creating unnecessary space and affecting the UI's aesthetics. The requirement is to either hide this empty footer or utilize it by placing custom form buttons within. This KB article also answers the following questions:
- How to hide the empty footer in the Popup Form Template of the Grid for Blazor?
- How to display custom buttons in the footer of the Popup Form Template?
- How to manage form submission with custom buttons in the Grid for Blazor?

## Solution

There are two approaches to address this requirement with the [Grid](https://docs.telerik.com/blazor-ui/components/grid/editing/popup) component for Blazor:

### Option 1: Display Custom Buttons in the Footer

To display custom buttons in the footer and handle form submission, follow these steps:

1. Keep the `<FormButtons>` tag inside the custom Form empty to prevent it from rendering its default buttons.
2. Declare custom buttons in the `<ButtonsTemplate>` and manage their `OnClick` events for form submission.

Here is an example demonstrating this approach:

```razor
<Grid>
    ...
    <GridEditForm Popup="true">
        <PopupFormTemplate>
            ...
            <FormButtons></FormButtons>
        </PopupFormTemplate>
        <ButtonsTemplate>
            <!-- Declare custom buttons here -->
        </ButtonsTemplate>
    </GridEditForm>
</Grid>
```
[View Sample in Telerik REPL](https://blazorrepl.telerik.com/cIuNHkbv33TPbOw234)

### Option 2: Remove the Footer and Keep Buttons in the FormTemplate

To remove the footer while keeping the buttons within the `<FormTemplate>`, use CSS to hide the empty footer.

Here is an example demonstrating how to hide the footer:

```css
/* Add this CSS to hide the empty footer */
.your-custom-class .k-popup-footer {
    display: none;
}
```
[View Sample in Telerik REPL](https://blazorrepl.telerik.com/GIEXdYkj2896rYiO43)

## See Also

- [Grid Editing - Popup Mode Documentation](https://docs.telerik.com/blazor-ui/components/grid/editing/popup)
- [Customizing the Grid's Edit Form](https://docs.telerik.com/blazor-ui/knowledge-base/grid-custom-edit-form)
