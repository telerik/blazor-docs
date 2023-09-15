---
title: Indicate that MaxLength is reached in TextArea
description: How to indicate that MaxLength is reached in TextArea? How to display a message showing that the user has typed the maximum allowed characters? How to show a character counter?
type: how-to
page_title: Indicate that MaxLength is reached in TextArea
slug: textarea-kb-indicate-when-maxlength-is-reached
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

How to display a counter, so the user knows how many characters they have left before reaching the `MaxLength` value?

## Solution

The `MaxLength` parameter of the TextArea maps to the `maxlength` attribute of the HTML `<textarea>` element. Its purpose is to prevent the user from typing beyond the specified maximum character count. It does not provide a visual indication out of the box.

To notify the user that they have reached the `MaxLength` value:

* Declare the desired message in an `if` block. 
* Display this message if the length of the TextArea value equals the specified `MaxLength` value. 
* Add the desired CSS rules or classes to style the message as needed.

To let the user know how many characters they have left to type, render the TextArea value length and the `MaxLength` value - this will serve as a character counter.

>caption Show a character counter and a message when max is reached

````CSHTML
@using System.ComponentModel.DataAnnotations

@if (string.IsNullOrEmpty(FormSubmitMessage))
{
    <TelerikForm Model="@FormModel"
                 OnValidSubmit="@OnValidSubmit"
                 OnInvalidSubmit="@OnInvalidSubmit"
                 Width="400px">
        <FormValidation>
            <DataAnnotationsValidator />
        </FormValidation>
        <FormItems>
            <FormItem>
                <Template>
                    <label for="sendInvitation">Send Invitation:</label>
                    <TelerikTextArea Id="sendInvitation"
                                     Value="@FormModel.Text"
                                     ValueExpression="@(() => FormModel.Text)"
                                     ValueChanged="@OnValueChanged"
                                     Placeholder="Enter your text here"
                                     MaxLength="@MaxLength">
                    </TelerikTextArea>
                    <div class="textarea-info">
                        <TelerikValidationMessage For="@(() => FormModel.Text)" />
                        @if (TextLength == MaxLength)
                        {
                            <div class="k-form-hint k-form-error">You reached the maximum allowed characters.</div>
                        }
                        <span class="character-counter k-form-hint @(TextLength == MaxLength ? "k-form-error" : "")">@($"{TextLength} / {MaxLength}")</span>
                    </div>
                </Template>
            </FormItem>
        </FormItems>
        <FormButtons>
            <TelerikButton ButtonType="@ButtonType.Submit" ThemeColor="primary">Send</TelerikButton>
        </FormButtons>
    </TelerikForm>
}
else
{
    @FormSubmitMessage
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

@code {
    public class ValidationModel
    {
        [Required(ErrorMessage = "Please enter a text.")]
        public string Text { get; set; }
    }

    public ValidationModel FormModel = new ValidationModel();

    public string FormSubmitMessage { get; set; }

    public int TextLength => FormModel?.Text?.Length ?? 0;

    public int MaxLength { get; set; } = 100;

    public async void OnValidSubmit()
    {
        FormSubmitMessage = "Form submitted successfully!";
        await Task.Delay(2000);
        FormSubmitMessage = "";
        FormModel.Text = "";

        StateHasChanged();
    }

    public void OnInvalidSubmit()
    {
        FormSubmitMessage = "";
    }

    public void OnValueChanged(string value)
    {
        FormSubmitMessage = "";
        FormModel.Text = value;
    }
}
````