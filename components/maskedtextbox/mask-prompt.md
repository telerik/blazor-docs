---
title: Mask and Prompt
page_title: MaskedTextbox - Mask and Prompt
description: The relationship and configuration options for the mask, prompt and value in the Masked Textbox for Blazor.
slug: maskedtextbox-mask-prompt
tags: telerik,blazor,masked,textbox,mask,prompt,value
published: true
position: 10
---

# Mask and Prompt

This article explains the relationship and the configuration options that tie the Mask, the prompts and the Value of the Telerik MaskedTextbox for Blazor. The settings and behaviors described below let you customize the behavior of the component and what data you will get out of it.

This article contains the following sections:

* [Mask](#mask)
	* [Rules](#rules)
	* [Literals](#literals)
	* [Include Literals in the Value](#include-literals-in-the-value)
	* [Mask on Focus, Label and Placeholder](#mask-on-focus-label-and-placeholder)
* [Prompt](#prompt)

## Mask

The `Mask` is the main feature of the component. It defines what input is allowed from the user at what positions so they must obey those requirements. By default, the mask is constantly shown, but you can change that to also show a label or placeholder.

You can use special characters called `Rules` in the Mask to define its behavior. The other characters that have no special meaning but are always shown and the user cannot change them are called `Literal` characters.

* [Rules](#rules)
* [Literals](#literals)
* [Include Literals in the Value](#include-literals-in-the-value)
* [Mask on Focus, Label and Placeholder](#mask-on-focus-label-and-placeholder)

### Rules

The Telerik MaskedTextbox provides a set of built-in rules that it recognizes as special characters when encountered in the `Mask` and they are the main feature of the component that determines how the user writes their input. The reference list below shows the rules and what they do.

>caption List of Rules (special characters) that define a mask behavior

- `0` - Digit (0-9)
- `9` - Digit (0-9) or `space`
- `#` - Digit (0-9), `space`, plus (`+`) and minus (`-`) signs
- `L` - Letter (a-Z)
- `?` - Letter (a-Z) or `space`
- `A` - Alphanumeric (0-9, a-Z)
- `a` - Alphanumeric (0-9, a-Z) or `space`
- `&` - Character (excluding `space`)
- `C` - Character or `space`

>tip You can find some examples of different masks in the [Masks Live Demo](https://demos.telerik.com/blazor-ui/maskedtextbox/masks) and in the [Some Sample Masks]({%slug maskedtextbox-overview%}#some-sample-masks) section of the documentation.

### Literals

Apart from the rules, you can also use static symbols in the mask pattern that are also known as literals. In the masked value, a literal is always rendered on the same position as the position where it is defined in the mask property and the user cannot change it. You can use them to show a more user-friendly format of the message, or to predefine some of the input for your user.

In some cases, you may want to include a literal that matches a Rule, however. To do that, you need to escape the symbol with the slash (`\`) character. An escaped rule turns into a literal.

>caption Literals and escaped rules as part of the mask

````CSHTML
@* The user will see "ABC---1209" in this example and only the part "12" is editable. The other symbols are escaped rules - "A", "C", "0" and "9" or literals - the "B" and the three dashes "-" *@

@invoiceNumber

<TelerikMaskedTextBox Mask="\AB\C---00\0\9" @bind-Value="@invoiceNumber"></TelerikMaskedTextBox>

@code{
    string invoiceNumber { get; set; } = "12";
}
````

### Include Literals in the Value

By default, the `Value` of the component only includes the rules from the mask. You can, however, also include the literal characters by setting the `IncludeLiterals` parameter to true.

>caption Adding the literals to the value

![Include Literals behavior](images/include-literals.gif)

````CSHTML
@* Toggle the checkbox to see the behavior *@

<TelerikMaskedTextBox Mask="(+999) 000-0000"
                      @bind-Value="@TheValue"
                      IncludeLiterals="@ShouldAddLiterals">
</TelerikMaskedTextBox>

<span style="white-space: pre;">
    @TheValue
</span>
<label><input type="checkbox" @bind="@ShouldAddLiterals" /> Include literals</label>

@code{
    string TheValue { get; set; } = "44 5556666"; // the space accounts for three-digit codes
    bool ShouldAddLiterals { get; set; }
}
````

### Mask on Focus, Label and Placeholder

The `MaskOnFocus` parameter lets you instruct the component to show the mask only when the user is about to type in the input - when it is focused. This lets you show the `Label` or `Placeholder` that you can set so you can provide an easier to read prompt first, before you show the actual format to your users.

The `Label` will be rendered over the `Placeholder` and neither will be shown if there is a `Value` already. You should use the `Placeholder` over the `Label` if you do not want the animated effect or the increased height it causes.

If `MaskOnFocus` is set to `false` (its default value), the `Label` will always be above the input and never inside (over) the input itself - the mask takes precedence - and the "floating" feature of the label will not be available.

>caption Showing the mask on focus only

![Show mask only when the input is focused](images/show-mask-on-focus-only.gif)

````CSHTML
@* This is the non-default behavior where the user first sees the Label or Placeholder if there is no value *@

@TheValue
<br />
<TelerikMaskedTextBox MaskOnFocus="true"
                      Mask="0000-0000-0000-0000" @bind-Value="@TheValue">
</TelerikMaskedTextBox>
@code{
    string TheValue { get; set; }
}
````


## Prompt

The prompt characters are the hints that the user sees in the mask where they have not written values yet. By default, they are underscores `_`. You can change it by setting the `Prompt` parameter to the desired `char`.

When the user has not filled in all the blank spaces in the mask, the Telerik Masked Textbox will replace them with the `PromptPlaceholder` in the `Value` that it will set in the view-model. By default, the `char` that is used is a simple space (` `). If you don't want such characters in the `Value`, set `PromptPlaceholder="null"`. Note that HTML rendering combines spaces into one by default.

The `PromptPlaceholder` is useful when you need to process the user input at a later stage. For example, when you can have input that can vary in length like a phone country code (that can be one to three digits and the rest can be empty or spaces). For such cases, the masked textbox provides you with the value where places where the user did not input anything are replaced with the `PromptPlaceholder` to facilitate post-processing and parsing. For example, with the default space for a placeholder, you could remove all spaces from the input to get only the meaningful digits of the phone number.

>caption Prompt and PromptPlacehlolder behavior

![Prompt and PromptPlaceholder behavior](images/custom-promt-and-promptplaceholder.gif)

````CSHTML
@* Toggle the checkboxex and write a part of the card number to see the difference in the Value and input appearance *@

<div style="white-space: pre; text-decoration: underline;font-family: 'Courier New';">@TheValue</div>
<div>
    <label><input type="checkbox" @bind="@CustomPrompt" />Use custom Prompt</label>
    <br />
    <label><input type="checkbox" @bind="@CustomPromptPlaceholder" />Use custom PromptPlaceholder</label>
</div>
<TelerikMaskedTextBox PromptPlaceholder="@( CustomPromptPlaceholder ? "a"[0] : ' ' )"
                      Prompt="@( CustomPrompt ? "*"[0] : '_' )"
                      Mask="0000-0000-0000-0000" @bind-Value="@TheValue">
</TelerikMaskedTextBox>
@code{
    string TheValue { get; set; } 

    bool CustomPrompt { get; set; }
    bool CustomPromptPlaceholder { get; set; }
}
````

>tip You can see the behavior of the prompt features in the [Customization Live Demo](https://demos.telerik.com/blazor-ui/maskedtextbox/customization).

>important You should not set the `PromptPlaceholder` to a character that can be valid for the user input in the current mask. Doing so can result in those characters showing up in the user input without the user writing them.
>
>For example, if you have a mask `00-00` and `PromptPlaceholder` is `4`, when the user writes `1` in the input, the actual `Value` will become `14-44` even though the user sees `1_-__`, and when the component re-renders (for example, because an `EventCallback` fired), the user wil see `14-44` which is not what they entered or expected.

## See Also

* [MaskedTextbox Overview]({%slug maskedtextbox-overview%})
* [Live Demo: Masks](https://demos.telerik.com/blazor-ui/maskedtextbox/masks)
* [Live Demo: Customization](https://demos.telerik.com/blazor-ui/maskedtextbox/customization)
