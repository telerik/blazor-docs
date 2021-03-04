---
title: Chrome autofills the Form and the floating label overlaps the values
description: Chrome autofills the Form and the floating label overlaps the values.
type: troubleshooting
page_title: Chrome autofills the Form and the floating label overlaps the values
slug: form-chrome-autofill
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Form for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I am using the Telerik Form for Blazor. When the application is rendered in Chrome the browser automatically completes the fields of the Form. The floating labels are not moved and the autofilled values are overlapped by the text from the label.

#### Problematic configuration

![](images/problematic-example-chrome-form-autofill.png)

````CSHTML
@* This example showcases the problematic configuration *@ 

<TelerikForm Model="@person" OnValidSubmit="@HandleValidSubmit" Width="50%">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <TelerikTextBox PlaceHolder="john@smith.com" Title="Email" @bind-Value="@person.LoginId"
                                Label="Enter Email" InputMode="email" Id="email" AutoComplete="email" Name="email">
                </TelerikTextBox>
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <TelerikTextBox Password="true"
                                Label="Enter Password"
                                @bind-Value="@person.Password"
                                AutoComplete="new-password" Name="password" Id="password">
                </TelerikTextBox>
            </Template>
        </FormItem>
    </FormItems>
    <FormButtons>
        <TelerikButton ButtonType="ButtonType.Submit" Primary="true">Login</TelerikButton>
    </FormButtons>
</TelerikForm>


@code {
    public Person person = new Person();

    public class Person
    {
        public string LoginId { get; set; }
        public string Password { get; set; }
    }
    private async Task HandleValidSubmit()
    {
        // On valid submit
    }
}
````


## Solution

When Chrome autofills the values in the fields in the form the `oninput` and `onfocus` events are not fired. This means that the browser does not notify the fields that their values have changed and thus the floating label remains inside the TelerikTextbox. To solve this you can either [Use the standard HTML label](#use-the-standard-html-label) or disable it altogether. 

### Use the standard HTML label

You can use the standard HTML `<label>` tag instead of the floating label that the TelerikTextbox provides.

````CSHTML
@* Provide labels for the Textboxes *@

<TelerikForm Model="@person" OnValidSubmit="@HandleValidSubmit" Width="50%">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <label for="email">Enter your email</label>
                <TelerikTextBox PlaceHolder="john@smith.com" Title="Email" @bind-Value="@person.LoginId"
                                InputMode="email" Id="email" AutoComplete="email" Name="email">
                </TelerikTextBox>
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="password">Enter your password</label>
                <TelerikTextBox Password="true"
                                @bind-Value="@person.Password"
                                AutoComplete="password" 
                                Name="password" 
                                Id="password">
                </TelerikTextBox>
            </Template>
        </FormItem>
    </FormItems>
    <FormButtons>
        <TelerikButton ButtonType="ButtonType.Submit" Primary="true">Login</TelerikButton>
    </FormButtons>
</TelerikForm>


@code {
    public Person person = new Person();

    public class Person
    {
        public string LoginId { get; set; }
        public string Password { get; set; }
    }
    private async Task HandleValidSubmit()
    {
        // On valid submit
    }
}
````