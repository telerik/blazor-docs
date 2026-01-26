---
title: Add Eye Icon to Reveal a TextBox Password
description: Learn how to implement an eye toggle button that reveals the typed password in a Telerik TextBox for Blazor.
type: how-to
page_title: How to Add Eye Icon to Telerik Password TextBox in Blazor
slug: textbox-kb-eye-reveal-password
tags: telerik, blazor, textbox
ticketid: 1673598, 1672864, 1656817, 1655436, 1640843, 1619127, 1584950
res_type: kb
components: ["textbox"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TextBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to add an eye icon to a text input and click the icon to show and hide the entered password?
* How to implement a button that reveals the password in a Telerik TextBox on click?
* How to make an eye toggle appear in a password textbox no matter if the textbox is focused or not?
* How to use `mouseup` and `mousedown` events on the `TelerikSvgIcon` control to toggle a password field?

## Solution

1. Add a [Button](slug:components/button/overview) or a [ToggleButton](slug:togglebutton-overview) with the desired [icon](slug:button-icons) next to the TextBox or inside the [TextBox `SuffixTemplate`](slug:common-features/input-adornments).
1. Use the [Button's `OnClick` event handler](slug:button-events) to toggle the [TextBox `Password` parameter](slug:components/textbox/overview#textbox-parameters) value.
1. (optional) Instead of Button `OnClick`, use `@onmousedown` and `@onmouseup` Blazor events on a generic HTML element to toggle the TextBox `Password` parameter. This approach allows using events with Telerik components that do not expose them, for example, a [Telerik SVG icon or a font icon](slug:common-features-icons).
1. To use the TextBox with a reveal button inside a [Telerik Form, use a `FormItem` `Template`](slug:form-formitems-template).

>caption Add an eye icon to reveal a password

````RAZOR
<p>Reveal password on Telerik Button OnClick</p>

<TelerikTextBox @bind-Value="@TextBoxValue1" Password="@TextBoxPassword1" Width="200px">
    <TextBoxSuffixTemplate>
        <TelerikToggleButton Icon="@( TextBoxPassword1 ? SvgIcon.Eye : SvgIcon.EyeSlash )"
                             OnClick="@( () => TextBoxPassword1 = !TextBoxPassword1 )"
                             Selected="@( !TextBoxPassword1 )" />
    </TextBoxSuffixTemplate>
</TelerikTextBox>

<p>Reveal password on HTML element @@onmousedown</p>

<TelerikTextBox @bind-Value="@TextBoxValue2" Password="@TextBoxPassword2" Width="200px">
    <TextBoxSuffixTemplate>
        <span @onmousedown="@( () => TextBoxPassword2 = false )"
              @onmouseup="@( () => TextBoxPassword2 = true )">
            <TelerikButton Icon="@SvgIcon.Eye" ButtonType="@ButtonType.Button" />
        </span>
    </TextBoxSuffixTemplate>
</TelerikTextBox>

<style>
    /* Hide native browser eye icon in Edge if enabled */
    input.k-input-inner[type="password"]::-ms-reveal,
    input.k-input-innerinput[type="password"]::-ms-clear {
        display: none;
    }
</style>

@code {
    private string TextBoxValue1 { get; set; } = "abcde1";
    private bool TextBoxPassword1 { get; set; } = true;

    private string TextBoxValue2 { get; set; } = "zyxwv2";
    private bool TextBoxPassword2 { get; set; } = true;
}
````

## See Also

* [Input Adornments](slug:common-features/input-adornments)
* [Form Item Templates](slug:form-formitems-template)