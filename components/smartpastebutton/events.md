---
title: Events
page_title: SmartPasteButton - Events
description: Events of the SmartPasteButton for Blazor.
slug: smartpastebutton-events
tags: telerik, blazor, smartpastebutton, events, ai
published: True
position: 20
components: ["smartpastebutton"]
---

# SmartPasteButton Events

This article explains the events available in the Telerik SmartPasteButton for Blazor:

* [OnRequestStart](#onrequeststart)
* [OnRequestStop](#onrequeststop)

## OnRequestStart

The `OnRequestStart` event fires before sending the Smart Paste request to the AI service. This event allows you to inspect and modify the content and form fields that will be processed by the AI.

The event handler receives an argument of type `SmartPasteButtonRequestStartEventArgs` with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Content` | `string` | The content to be processed by the Smart Paste Button. Contains the clipboard content of the user. |
| `FormFields` | `SmartPasteFormField[]` | Array of form fields that should be populated with the AI response using the content provided. |

>caption Handle the OnRequestStart event to customize AI processing

````Razor
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions
@inject HttpClient HttpClient
@inject IJSRuntime JS

<div style="display: flex; max-width: 600px; margin-bottom: 16px;">
    <div style="flex: 1; margin-right: 16px;">
        <p><strong>Sample Book Data (copy this and click Smart Paste):</strong></p>
        <TelerikTextArea Value="@SampleText" Rows="3" ReadOnly="true" />
        <TelerikButton OnClick="@CopySampleText" Icon="SvgIcon.Copy">Copy</TelerikButton>
    </div>

    <TelerikForm Model="@Model" OnSubmit="@HandleSubmit">
        <FormItems>
            <FormItem Field="@nameof(BookModel.Title)" LabelText="Title">
                <Template>
                    <TelerikTextBox Id="title" @bind-Value="Model.Title" />
                </Template>
            </FormItem>

            <FormItem Field="@nameof(BookModel.Author)" LabelText="Author">
                <Template>
                    <TelerikTextBox Id="author" @bind-Value="Model.Author" />
                </Template>
            </FormItem>

            <FormItem Field="@nameof(BookModel.ISBN)" LabelText="ISBN">
                <Template>
                    <TelerikTextBox Id="isbn" @bind-Value="Model.ISBN" />
                </Template>
            </FormItem>

            <FormItem Field="@nameof(BookModel.Publisher)" LabelText="Publisher">
                <Template>
                    <TelerikTextBox Id="publisher" @bind-Value="Model.Publisher" />
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
</div>

@code {
    private TelerikSmartPasteButton SmartPasteButtonRef { get; set; }
    private BookModel Model { get; set; } = new();
    private bool Pasting { get; set; }

    private string SampleText =
        @"The Great Gatsby
F. Scott Fitzgerald
978-0743273565
Scribner";

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

        var smartPasteResponse = await response.Content.ReadFromJsonAsync<SmartPasteResponse>();

        if (smartPasteResponse?.FieldValues?.Count > 0)
        {
            await SmartPasteButtonRef.PasteAsync(smartPasteResponse);
        }
        Pasting = false;
    }

    public class BookModel
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public string Publisher { get; set; }
    }
}
````

## OnRequestStop

The `OnRequestStop` event fires when the `IChatClient` is enabled and the stop state of the button is triggered. This event is only fired when `EnableChatClient` is set to `true`.

This event allows you to handle scenarios where the AI processing needs to be interrupted or when the user cancels the operation.

## See Also

* [SmartPasteButton Live Events Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/events)
* [SmartPasteButton Overview](slug:smartpastebutton-overview)
* [SmartPasteButton Validation](slug:smartpastebutton-validation)