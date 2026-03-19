---
title: Hide NumericTextBox Spinner Buttons
description: Learn how to hide the Telerik Blazor numeric textbox spinner buttons in Forms, Grid edit forms, or popup Windows.
type: how-to
page_title: How to Hide NumericTextBox Spinner Buttons
slug: numerictextbox-kb-hide-spinner-arrows
tags: blazor, numerictextbox, grid, css
ticketid: 1711765
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                NumericTextBox for Blazor, <br />
                Form for Blazor, <br />
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

The Telerik Grid for Blazor automatically displays numeric textboxes in edit cells with spinner controls. How do I not display the spinner control by default?

This KB also answers the following questions:

* How to remove the NumericTextBox spinners inside Grid and TreeList components?
* How to hide the spinner buttons in multiple or all Blazor NumericTextBoxes in the app?

## Solution

The optimal way to hide numeric textbox spinners depends on the scenario. The following sections discuss different options that use NumericTextBox parameters or CSS.

> The CSS approach does not prevent users from changing the numeric value with the keyboard `Up` and `Down` arrow keys.

### Standalone NumericTextBoxes

Set `Arrows="false"` and `Step="0"` to hide the spinners of a specific NumericTextBox and disable value incrementing and decrementing with the keyboard arrow keys.

>caption Hide NumericTextBox spinners and disable value changes with the keyboard arrow keys

````RAZOR
<TelerikNumericTextBox @bind-Value="@NumericValue"
                       Arrows="false"
                       Step="0"
                       Width="120px" />

@code {
    private decimal NumericValue { get; set; } = 1.23m;
}
````

You can also use CSS to hide the spinners of all NumericTextBoxes in the app.

>caption Hide all NumericTextBox spinners

````CSS.skip-repl
.k-numerictextbox .k-input-spinner {
    display: none;
}
````

### NumericTextBoxes in Forms

In Form scenarios, use a [`FormItem` `Template`](slug:form-formitems-template), which falls back to the [standalone NumericTextBox](#standalone-numerictextboxes) option above.

>caption Hide NumericTextBox spinners in a Form item template

````RAZOR.skip-repl
<TelerikForm>
    <FormItems>
        <FormItem>
            <Template>
                <TelerikNumericTextBox Arrows="false"
                                       Step="0" />
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>
````

You can also hide the NumericTextBox spinners in Forms with CSS. You can target:

* Specific Form items
* Specific Forms
* All Forms

>caption Hide NumericTextBox spinners in specific Form items

````RAZOR.skip-repl
<TelerikForm>
    <FormItems>
        <FormItem Class="no-numeric-spinners" />
    </FormItems>
</TelerikForm>

<style>
    .no-numeric-spinners .k-numerictextbox .k-input-spinner {
        display: none;
    }
</style>
````

>caption Hide NumericTextBox spinners in specific Forms

````RAZOR.skip-repl
<TelerikForm Class="no-numeric-spinners" />

<style>
    .no-numeric-spinners .k-numerictextbox .k-input-spinner {
        display: none;
    }
</style>
````

>caption Hide NumericTextBox spinners in all Forms

````CSS.skip-repl
.k-form .k-numerictextbox .k-input-spinner {
    display: none;
}
````

### NumericTextBoxes in Grids

In Grid and TreeList editing scenarios, use a [column `EditorTemplate`](slug:grid-templates-editor), which falls back to the [standalone NumericTextBox](#standalone-numerictextboxes) option above. [Popup `FormTemplate`](slug:grid-templates-popup-form) scenarios are equivalent to [NumericTextBoxes in a Form](#numerictextboxes-in-forms).

>caption Hide NumericTextBox spinners in a Grid editor template

````RAZOR.skip-repl
<TelerikGrid>
    <GridColumns>
        <GridColumn>
            <EditorTemplate>
                <TelerikNumericTextBox Arrows="false"
                                       Step="0" />
            </EditorTemplate>
        </GridColumn>
</TelerikGrid>
````

You can also hide the NumericTextBox spinners in Grids with CSS. You can target:

* Specific Grids or all Grids.
* Grids in popup, inline, and in-cell edit mode.

>caption Hide NumericTextBox spinners in specific Grids in inline or in-cell edit mode

````RAZOR.skip-repl
<TelerikGrid Class="no-numeric-spinners" />

<style>
    .no-numeric-spinners .k-numerictextbox .k-input-spinner {
        display: none;
    }
</style>
````

>caption Hide NumericTextBox spinners in all Grids in inline or in-cell edit mode

````CSS.skip-repl
.k-grid .k-numerictextbox .k-input-spinner {
    display: none;
}
````

>caption Hide NumericTextBox spinners in specific Grids in popup edit mode

````RAZOR.skip-repl
<TelerikGrid>
    <GridSettings>
        <GridPopupEditSettings Class="no-numeric-spinners" />
    </GridSettings>
</TelerikGrid>

<style>
    .no-numeric-spinners .k-numerictextbox .k-input-spinner {
        display: none;
    }
</style>
````

>caption Hide NumericTextBox spinners in all popup Forms and Windows

````CSS.skip-repl
.k-window .k-numerictextbox .k-input-spinner {
    display: none;
}
````

## See Also

* [Disable NumericTextBox Arrows on Min or Max Value](slug:numerictextbox-disable-arrows)
* [NumericTextBox Overview](slug:components/numerictextbox/overview)
