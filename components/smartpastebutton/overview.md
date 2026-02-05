---
title: Overview
page_title: SmartPasteButton Overview
description: The Blazor SmartPasteButton is an AI-powered utility that parses unstructured text data and uses the result to populate form fields automatically.
slug: smartpastebutton-overview
tags: telerik, blazor, smartpastebutton, ai, forms, overview
published: True
position: 0
components: ["smartpastebutton"]
---

# Blazor SmartPasteButton Overview

The <a href="https://www.telerik.com/blazor-ui/smartpastebutton" target="_blank">UI for Blazor SmartPasteButton component</a> is an AI-powered utility designed to parse unstructured text data and use the result to populate form fields. It eliminates the "copy-paste-repeat" manual grind by using large language models to map raw text to specific data inputs.

The SmartPasteButton integrates seamlessly with EditForm, TelerikForm, and native HTML forms.

## Basic Usage

### Configuration without IChatClient

1. Use the `<TelerikSmartPasteButton>` tag to add the component to your razor page.

2. Handle the `OnRequestStart` event to specify the AI endpoint that processes clipboard content. The SmartPasteButton automatically sends the clipboard text and detected form field metadata to this endpoint.

4. Set the `EnableChatClient` to `false`. If enabled, the component will try to get a registered `IChatClient` service and use it to make the request.

5. (optional) Add the `DataSmartPasteDescriptionAttribute` to your input components to provide context for the AI.

>caption Example of using the SmartPasteButton without IChatClient service

````Razor
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions
@inject HttpClient HttpClient
@inject IJSRuntime JS

<div style="max-width: 600px; margin-bottom: 16px;">
    <p><strong>Sample text (copy this and click Smart Paste):</strong></p>

    <TelerikTextArea Value="@SampleText" Rows="3" ReadOnly="true" />

    <div style="margin-top: 8px;">
        <TelerikButton OnClick="@CopySampleText" Icon="SvgIcon.Copy">
            Copy
        </TelerikButton>
    </div>
</div>

<TelerikForm Model="@Model" OnSubmit="@HandleSubmit">
    <FormItems>
        <FormItem Field="@nameof(ContactModel.FirstName)" LabelText="First Name">
            <Template>
                <TelerikTextBox Id="first-name" @bind-Value="Model.FirstName" />
            </Template>
        </FormItem>

        <FormItem Field="@nameof(ContactModel.LastName)" LabelText="Last Name">
            <Template>
                <TelerikTextBox Id="last-name" @bind-Value="Model.LastName" />
            </Template>
        </FormItem>

        <FormItem Field="@nameof(ContactModel.Email)" LabelText="Email">
            <Template>
                <TelerikTextBox Id="email" @bind-Value="Model.Email" />
            </Template>
        </FormItem>

        <FormItem Field="@nameof(ContactModel.Phone)" LabelText="Phone">
            <Template>
                <TelerikTextBox Id="phone" @bind-Value="Model.Phone" />
            </Template>
        </FormItem>
    </FormItems>

    <FormButtons>
        <TelerikSmartPasteButton @ref="@SmartPasteButtonRef"
                                 EnableChatClient="false"
                                 Enabled="@(!Pasting)"
                                 OnRequestStart="@HandleRequestStart">
            Smart Paste
        </TelerikSmartPasteButton>
    </FormButtons>
</TelerikForm>


@code {
    private TelerikSmartPasteButton SmartPasteButtonRef { get; set; }
    private ContactModel Model { get; set; } = new();
    private bool Pasting { get; set; }

    private string SampleText =
        @"John Doe
john.doe@example.com
+1 555 123 4567";

    private async Task CopySampleText()
    {
        await JS.InvokeVoidAsync("navigator.clipboard.writeText", SampleText);
    }

    private void HandleSubmit()
    {
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(Model));
    }

    private async Task HandleRequestStart(SmartPasteButtonRequestStartEventArgs args)
    {
        Pasting = true;
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
            "https://sitdemos.telerik.com/service/v2/ai/smartpaste/smartpaste",
            payload
        );

        response.EnsureSuccessStatusCode();

        var smartPasteResponse =
            await response.Content.ReadFromJsonAsync<SmartPasteResponse>();

        if (smartPasteResponse?.FieldValues?.Count > 0)
        {
            await SmartPasteButtonRef.PasteAsync(smartPasteResponse);
        }
        Pasting = false;
    }

    public class ContactModel
    {
        public string FirstName { get; set; }
        public string LastName  { get; set; }
        public string Email     { get; set; }
        public string Phone     { get; set; }
    }
}
````

### Configuration with IChatClient

1. Use the `<TelerikSmartPasteButton>` tag to add the component to your razor page.

2. Set the `ChatClientKey` to specify the key of the registered `IChatClient` service to be used by the SmartPasteButton if `EnableChatClient` is set to `true`.

3. Register your `IChatClient`:

````CSharp.skip-repl
IChatClient gptChatClient = new AzureOpenAIClient(new Uri("https://blazor-models-ai-foundry.cognitiveservices.azure.com/"),
                            new AzureKeyCredential("your API key here")).GetChatClient("gpt-4.1");

services.AddKeyedChatClient("gpt-4.1", gptChatClient);
````

````Razor.skip-repl
<TelerikSmartPasteButton ChatClientKey="gpt-4.1" />
````

## Events

The SmartPasteButton fires events that you can handle to customize the AI processing workflow. [Read more about the SmartPasteButton events...](slug:smartpastebutton-events).

## SmartPasteButton Parameters

To review all available parameters for the SmartPasteButton component, see the [SmartPasteButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton#parameters).

## SmartPasteButton Reference and Methods

The SmartPasteButton component exposes several public methods that you can call from your code. For a full list and details, see the [SmartPasteButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton#methods).

>caption Example of Calling a Method by Reference

````RAZOR.skip-repl
<TelerikSmartPasteButton @ref="smartPasteButtonRef" />

@code {
    private async Task StartPasting()
    {
        var smartPasteResponse =
            await response.Content.ReadFromJsonAsync<SmartPasteResponse>();

        if (smartPasteResponse?.FieldValues?.Count > 0)
        {
            await SmartPasteButtonRef.PasteAsync(smartPasteResponse);
        }
    }
}
````

## Form Field Support

The SmartPasteButton works with both native HTML form fields and Telerik input components. The following Telerik components are supported:

* AutoComplete
* ComboBox
* DatePicker
* DateTimePicker
* DropDownList
* FormItem
* MaskedTextBox
* MultiColumnComboBox
* MultiSelect
* NumericTextBox
* Rating
* Switch
* TextBox
* TimePicker

## See Also

* [SmartPasteButton Live Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/overview)
* [SmartPasteButton API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton)
* [SmartPasteButton Events](slug:smartpastebutton-events)