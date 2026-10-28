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

This article describes the events available in the Telerik SmartPasteButton for Blazor:

* [OnRequestStart](#onrequeststart)
* [OnRequestStop](#onrequeststop)

## OnRequestStart

The `OnRequestStart` event fires before sending the Smart Paste request to the AI service. This event allows you to inspect and modify the content and form fields that will be processed by AI.

The event handler receives an argument of type [`SmartPasteButtonRequestStartEventArgs`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.SmartPasteButtonRequestStartEventArgs).

>caption Handle the OnRequestStart event to customize AI processing

<demo metaUrl="client/smartpastebutton/events/example-1/" height="520"></demo>

## OnRequestStop

The `OnRequestStop` event fires when the `IChatClient` is enabled and the stop state of the button is triggered. This event is only fired when `EnableChatClient` is set to `true`.

This event allows you to handle scenarios where the AI processing needs to be interrupted or when the user cancels the operation.

>caption Handle the OnRequestStop event to customize AI processing

<div class="skip-repl"></div>

````RAZOR Home.razor
<TelerikSmartPasteButton ChatClientKey="gpt-4o-mini"
                         OnRequestStop="@HandleRequestStop" />

@code {
    private async Task HandleRequestStop()
    {
        //handle the event when the user clicks the stop button
    }
}
````
````C# Program.cs
IChatClient gptChatClient = new AzureOpenAIClient(new Uri("your API endpoint here"),
                            new AzureKeyCredential("your API key here")).GetChatClient("gpt-4.1");

services.AddKeyedChatClient("gpt-4.1", gptChatClient);
````

## See Also

* [SmartPasteButton Live Events Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/events)
* [SmartPasteButton Overview](slug:smartpastebutton-overview)
* [SmartPasteButton Validation](slug:smartpastebutton-validation)
