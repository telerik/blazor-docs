---
title: Validation
page_title: SmartPasteButton Validation
description: The Blazor SmartPasteButton is an AI-powered utility that parses unstructured text data and uses the result to populate form fields automatically. It also allows you to handle cancellation scenarios.
slug: smartpastebutton-Validation
tags: telerik, blazor, smartpastebutton, ai, forms, validation
published: True
position: 10
components: ["smartpastebutton"]
---

## SmartPasteButton Validation

While the SmartPasteButton handles most AI service errors internally, you can use the [`OnRequestStart`](slug:smartpastebutton-events#onrequeststart) event to validate the input content and the [`OnRequestStop`](slug:smartpastebutton-events#onrequeststop) event to handle cancellation scenarios.

>caption Example demonstrating form validation within the OnRequestStart event

````Razor
@using System.ComponentModel.DataAnnotations
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions
@inject HttpClient HttpClient
@inject IJSRuntime JS

<div style="max-width: 500px; display: flex; flex-direction: column; gap: 12px;">
    <TelerikTextArea @bind-Value="SourceText"
                     Placeholder="Paste or edit text here" />
    <TelerikButton OnClick="@CopyToClipboard">
        Copy Text
    </TelerikButton>

    <TelerikForm Model="@FormModel"
                 EditContext="@FormEditContext"
                 OnSubmit="@HandleSubmit">
        <FormValidation>
            <DataAnnotationsValidator />
        </FormValidation>

        <FormItems>
            <FormItem Field="@nameof(FormData.Name)" LabelText="Name">
                <Template>
                    <label for="name" class="k-label k-form-label">Full Name</label>
                    <div class="k-form-field-wrap">
                        <TelerikTextBox Id="name" @bind-Value="FormModel.Name" />
                    </div>
                </Template>
            </FormItem>

            <FormItem Field="@nameof(FormData.Email)" LabelText="Email">
                <Template>
                    <label for="email" class="k-label k-form-label">Email</label>
                    <div class="k-form-field-wrap">
                        <TelerikTextBox Id="email" @bind-Value="FormModel.Email" />
                        <TelerikValidationMessage For="@(() => FormModel.Email)" />
                    </div>
                </Template>
            </FormItem>
        </FormItems>

        <FormButtons>
            <TelerikSmartPasteButton @ref="@SmartPasteButtonRef"
                                     EnableChatClient="false"
                                     Enabled="@(!IsPasting)"
                                     OnRequestStart="@HandleRequestStart">
                Smart Paste
            </TelerikSmartPasteButton>
        </FormButtons>
    </TelerikForm>
</div>

@code {
    private TelerikSmartPasteButton SmartPasteButtonRef { get; set; }
    private FormData FormModel { get; set; } = new();
    private EditContext FormEditContext { get; set; }

    private bool IsPasting { get; set; }

    private string SourceText { get; set; } = "My name is Sarah Connor.";

    protected override void OnInitialized()
    {
        FormEditContext = new EditContext(FormModel);
    }

    private async Task CopyToClipboard()
    {
        await JS.InvokeVoidAsync("navigator.clipboard.writeText", SourceText);
    }

    private async Task HandleRequestStart(SmartPasteButtonRequestStartEventArgs args)
    {
        IsPasting = true;
        var payload = new
        {
            content = args.Content,
            formFields = args.FormFields?.Select(f => new
            {
                field = f.Field,
                description = f.Description,
                type = f.Type,
                allowedValues = f.AllowedValues
            })
        };

        var response = await HttpClient.PostAsJsonAsync(
            "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
            payload
        );

        response.EnsureSuccessStatusCode();

        var smartPasteResponse =
            await response.Content.ReadFromJsonAsync<SmartPasteResponse>();

        if (smartPasteResponse?.FieldValues?.Count > 0)
        {
            await SmartPasteButtonRef.PasteAsync(smartPasteResponse);
        }
        IsPasting = false;
        FormEditContext.Validate();
    }

    private void HandleSubmit()
    {
        Console.WriteLine("Form submitted!");
    }

    public class FormData
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }
    }
}
````

## See Also

* [SmartPasteButton Live Validation Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/validation)
* [SmartPasteButton Overview](slug:smartpastebutton-overview)
* [SmartPasteButton Events](slug:smartpastebutton-events)