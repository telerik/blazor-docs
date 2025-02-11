---
title: TextArea with MaxLength and character counter
description: How to indicate that MaxLength is reached in TextArea? How to display a message showing that the user has typed the maximum allowed characters? How to show a character counter?
type: how-to
page_title: TextArea with MaxLength and character counter
slug: textarea-kb-maxlength-and-character-counter
position: 
tags: telerik, blazor, textarea, maxlength, counter
ticketid:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TextArea for Blazor</td>
		</tr>
	</tbody>
</table>


## Description


This how-to article answers the following questions:

* The TextArea has a `MaxLength` parameter but it does not show when the maximum allowed characters count is reached. How to notify the user they have reached the `MaxLength` value?
* How to display a counter, so the user knows how many characters they have left before reaching the `MaxLength` value?


## Solution

This article provides two different solutions. Choose the more suitable one depending on how you want to use the TextArea:
* [TextArea as a standalone component](#textarea-as-a-standalone-component)
* [TextArea inside a Form](#textarea-inside-a-form)

### TextArea as a standalone component

To set maximum allowed characters when using the TextArea as a standalone component, use its `MaxLength` property. 

The `MaxLength` parameter of the TextArea maps to the `maxlength` attribute of the HTML `<textarea>` element. Its purpose is to prevent the user from typing beyond the specified maximum character count. It does not provide a visual indication out of the box.

To notify the user that they have reached the `MaxLength` value:

* Declare the desired message in an `if` block. 
* Display this message if the length of the TextArea value equals the specified `MaxLength` value. 
* Add the desired CSS rules or classes to style the message as needed.

To inform the user about the remaining characters, render the TextArea value length and the `MaxLength` value—this will serve as a character counter.

>caption TextArea with counter, MaxLength and conditional message

````RAZOR
<div style="width:400px">
    <TelerikTextArea @bind-Value="@TextValue"
                     Placeholder="Enter your text here"
                     MaxLength="@MaxLength">
    </TelerikTextArea>
    <div class="textarea-info">
        @if (TextLength == MaxLength)
        {
            <div class="k-form-hint k-form-error">You reached the maximum allowed characters.</div>
        }
        <span class="character-counter k-form-hint @(TextLength == MaxLength ? "k-form-error" : "")">@($"{TextLength} / {MaxLength}")</span>
    </div>
</div>

@code {
    private string TextValue { get; set; }
    private int MaxLength { get; set; } = 40;
    private int TextLength => TextValue?.Length ?? 0;
}

<style>
    .textarea-info {
        display: flex;
        justify-content: space-between;
    }

    .character-counter {
        margin-left: auto;
    }
</style>
````

### TextArea inside a Form

When the TextArea is inside a Form, you can use the built-in Form validation and [DataAnnotations](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-7.0). To restrict the user from submitting more that the desired characters, decorate the field bound to the TextArea with the [MaxLengthAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.maxlengthattribute?view=net-7.0). 

With this setup, the user will be able to type more than the allowed characters, but in this case they will get a validation error. An error message will be automatically displayed for this field, if you have provided such in the `MaxLength` attribute.

If you are declaring the TextArea inside a [`FormItem Template`](slug:form-formitems-template), such a validation message will not be displayed out of the box. In this case, add a [ValidationMessage component](slug:validation-tools-message).

To inform the user about the remaining characters, render the TextArea value length and the `MaxLength` value—this will serve as a character counter. Add the desired CSS rules or classes to style the counter as needed.

>caption TextArea in Form with counter and validation

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@FormModel"
             OnValidSubmit="@OnValidSubmit"
             Width="400px">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <label for="sendInvitation">Send Invitation:</label>
                <TelerikTextArea Id="sendInvitation"
                                 @bind-Value="@FormModel.Text"
                                 Placeholder="Enter your text here">
                </TelerikTextArea>
                <div class="textarea-info">
                    <TelerikValidationMessage For="@(() => FormModel.Text)" />  
                    <span class="character-counter k-form-hint @(TextLength > MaxLength ? "k-form-error" : "")">@($"{TextLength} / {MaxLength}")</span>
                </div>
            </Template>
        </FormItem>
    </FormItems>
    <FormButtons>
        <TelerikButton ButtonType="@ButtonType.Submit" ThemeColor="primary">Send</TelerikButton>
    </FormButtons>
</TelerikForm>

<br />

@FormSubmitMessage

@code {
    public class ValidationModel
    {
        [Required(ErrorMessage = "Please enter a text.")]
        [MaxLength(40, ErrorMessage = "Maximum allowed characters is 40")]
        public string Text { get; set; }
    }

    private ValidationModel FormModel = new ValidationModel();

    private int MaxLength { get; set; } = 40;

    private int TextLength => FormModel?.Text?.Length ?? 0;

    private string FormSubmitMessage { get; set; }

    private async void OnValidSubmit()
    {
        FormSubmitMessage = "Form submitted successfully!";
        FormModel.Text = "";
    }
}

<style>
    .textarea-info {
        display: flex;
        justify-content: space-between;
    }

    .character-counter {
        margin-left: auto;
    }
</style>
````
