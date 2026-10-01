---
title: Overview
page_title: SmartPasteButton Overview
description: The Blazor SmartPasteButton is an AI-powered utility that parses unstructured text data and uses the result to populate form fields automatically.
slug: smartpastebutton-overview
tags: telerik, blazor, smartpastebutton, ai, form
published: True
position: 0
components: ["smartpastebutton"]
---

# Blazor SmartPasteButton Overview

The <a href="https://www.telerik.com/blazor-ui/smartpastebutton" target="_blank">UI for Blazor SmartPasteButton component</a> is an AI-powered utility designed to parse unstructured text data and use the result to populate form fields. It eliminates the "copy-paste-repeat" manual grind by using large language models to map raw text to specific data inputs.

The SmartPasteButton integrates seamlessly with the [Telerik Form](slug:form-overview), Blazor EditForm, and native HTML forms.

## Creating Blazor SmartPasteButton

### Configuration without IChatClient

1. Use the `<TelerikSmartPasteButton>` tag to add the component to your razor page.

2. Handle the `OnRequestStart` event to specify the AI endpoint that processes clipboard content. The SmartPasteButton automatically sends the clipboard text and detected form field metadata to this endpoint.

4. Set the `EnableChatClient` to `false`. By default, the component tries to get a registered `IChatClient` service and use it to make the request.

5. (optional) Add the `DataSmartPasteDescriptionAttribute` to your input components to provide context for the AI.

>caption Example of using the SmartPasteButton without IChatClient service

<demo metaUrl="client/smartpastebutton/overview/example-1/" height="620"></demo>

### Configuration with IChatClient

1. Use the `<TelerikSmartPasteButton>` tag to add the component to your razor page.

2. Set the `ChatClientKey` to specify the key of the registered `IChatClient` service to be used by the SmartPasteButton. The `EnableChatClient` parameter needs to be `true`, which is its default value.

3. Register your `IChatClient`:

<div class="skip-repl"></div>

````C# Program.cs
IChatClient gptChatClient = new AzureOpenAIClient(new Uri("your API endpoint here"),
                            new AzureKeyCredential("your API key here")).GetChatClient("gpt-4.1");

services.AddKeyedChatClient("gpt-4.1", gptChatClient);
````
````RAZOR Home.razor
<TelerikSmartPasteButton ChatClientKey="gpt-4.1" />
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

## Validation

The SmartPasteButton allows you to validate the input content and handle cancellation scenarios. [Read more about the SmartPasteButton validation...](slug:smartpastebutton-validation).

## Events

The SmartPasteButton fires events that you can handle to customize the AI processing workflow. [Read more about the SmartPasteButton events...](slug:smartpastebutton-events).

## SmartPasteButton API

To review all available parameters, methods, and events of the SmartPasteButton component, see the [SmartPasteButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton#parameters).

## SmartPasteButton Reference and Methods

The SmartPasteButton component exposes several public methods that you can call from your code. For a full list and details, see the [SmartPasteButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton#methods).

>caption Example of Calling a Method by Reference

````RAZOR.skip-repl
<TelerikSmartPasteButton @ref="@SmartPasteButtonRef" />

@code {
    private TelerikSmartPasteButton? SmartPasteButtonRef { get; set; }

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

## See Also

* [SmartPasteButton Live Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/overview)
* [SmartPasteButton API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSmartPasteButton)
* [SmartPasteButton Events](slug:smartpastebutton-events)
