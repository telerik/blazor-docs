---
title: Enabling Checkbox Selection Only in Edit Mode for Blazor TreeList
description: Learn how to show the Checkbox Column in the Telerik Blazor TreeList only during the edit mode and hide it in display mode.
type: how-to
page_title: How to Enable Checkbox Selection Only in Edit Mode in Blazor TreeList
slug: treelist-enable-checkbox-selection-only-edit-mode
tags: treelist, blazor, checkbox, selection, edit mode, visibility, checkboxcolumn
res_type: kb
ticketid: 1657252
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to disable the Checkbox selection in display mode and allow the user to select items only when editing. Is it possible to hide the Checkbox Column in display mode and only show it in the edit mode?

This KB article also answers the following questions:
- How can I toggle the visibility of the Checkbox Column in the Blazor TreeList?
- Is it possible to enable Checkbox selection only during edit mode in TreeList?
- Can I hide the Checkbox Column in display mode for the TreeList?

## Solution

To enable the Checkbox selection only in edit mode in the [TreeList](https://docs.telerik.com/blazor-ui/components/treelist/overview) component, follow these steps:

1. Enable the `CheckBoxOnlySelection` parameter of the `TreeListCheckboxColumn` to prevent users from selecting rows with a click outside of edit mode.
2. Bind the `Visible` parameter of the `TreeListCheckboxColumn` to a variable. This allows toggling its visibility based on whether the TreeList is in edit mode.
3. Handle the CUD (Create, Update, Delete) events to manage the visibility of the `TreeListCheckboxColumn`.
4. For Inline and Popup edit modes, this approach works directly. For Incell edit mode, adjust the logic according to the event sequence described [here](https://docs.telerik.com/blazor-ui/components/treelist/editing/incell#event-sequence).

Below is an example implementation that toggles the visibility of the CheckboxColumn:

```CSHTML

```

For a live example, visit: [https://blazorrepl.telerik.com/QSELaeOs41T0gvNP24](https://blazorrepl.telerik.com/QSELaeOs41T0gvNP24).

Alternatively, if you prefer not to toggle the `CheckboxColumn` visibility but just disable it, you can apply conditional custom CSS based on the flag that you set in the `OnEdit`/`OnAdd` handlers.

## See Also

- [TreeList Overview](https://docs.telerik.com/blazor-ui/components/treelist/overview)
- [TreeList Editing](https://docs.telerik.com/blazor-ui/components/treelist/editing/overview)
- [TreeList Incell Editing Event Sequence](https://docs.telerik.com/blazor-ui/components/treelist/editing/incell#event-sequence)
