---
title: Blazor Dialogs - Alert, Confirm, Prompt | Telerik UI for Blazor
page_title: Predefined Dialogs - Alert, Confirm, Prompt
description: Predefined dialogs for Blazor - popup message, alert, confirm, and prompt. Explore the Telerik UI documentation.
slug: dialog-predefined
tags: telerik,blazor,dialog,predefined,alert,confirm,prompt
published: true
position: 2
---

# Predefined Dialogs - Alert, Confirm, Prompt

Telerik UI for Blazor provides styled substitutes to the standard confirm, alert and prompt dialogs. The Blazor popup messages match the Theme of the components to make it obvious to the user that the modal dialog is coming from your application.

To use these dialogs, receive a cascading parameter of type `Telerik.Blazor.DialogFactory`. It exposes the methods you can use in your method calls.

<div class="skip-repl"></div>

````CSHTML
[CascadingParameter]
public DialogFactory Dialogs { get; set; }
````

The predefined dialogs can only be used inside child Razor components of the [`TelerikRootComponent`]({%slug rootcomponent-overview%}). This is easily achieved in standard Blazor apps where the `TelerikRootComponent` resides inside the layout file. When [using UI for Blazor in ASP.NET apps]({%slug telerik-blazor-in-asp-net-app%}), an additional child component is needed.

There are three available ready-made dialogs:

* [Alert](#alert)
* [Confirm](#confirm)
* [Prompt](#prompt)

## Alert

The alert dialog is a Blazor popup message. It shows the user that something went wrong, such as a major error that requires their attention and blocks the UI, as opposed to a [notification]({%slug notification-overview%}) that is not modal and is small.

>caption Use an Alert dialog

````CSHTML
@* Use Alert dialogs, monitor the console for when the code continues *@

<TelerikButton OnClick="@ShowAlert">Show Alert</TelerikButton>
<TelerikButton OnClick="@ShowAlertWithTitle">Show Alert with Custom Title</TelerikButton>
<TelerikButton OnClick="@ShowAlertWithTitleAndButton">Show Alert with Custom Title and Custom Button</TelerikButton>

@code {
    [CascadingParameter]
    private DialogFactory Dialogs { get; set; }

    private async Task ShowAlert()
    {
        await Dialogs.AlertAsync("Something went wrong!");

        Console.WriteLine("The user dismissed the alert box.");
    }

    private async Task ShowAlertWithTitle()
    {
        await Dialogs.AlertAsync("Something went wrong!", "Read this!");

        Console.WriteLine("The user dismissed the alert box with the custom title.");
    }
    
    private async Task ShowAlertWithTitleAndButton()
    {
        await Dialogs.AlertAsync("Something went wrong!", "Read this!", "DONE");

        Console.WriteLine("The user dismissed the alert box with the custom title and custom button.");
    }
}
````

![Telerik Alert dialog first look](images/alert-first-look.gif)

## Confirm

The confirm dialog returns a `bool` value that indicates which button the user clicked - `true` for the `OK` button and `false` for the `Cancel` button. This lets you `await` its execution, and then continue the application logic based on that decision. The method that calls it must be `async Task` and *not* `async void` in order to await the execution.

>caption Use a Confirm dialog

````CSHTML
@* Use Confirm dialogs, monitor the console for when and how the code continues *@

<TelerikButton OnClick="@ShowConfirm">Show Confirm</TelerikButton>
<TelerikButton OnClick="@ShowConfirmWithTitle">Show Confirm with Custom Title</TelerikButton>
<TelerikButton OnClick="@ShowConfirmWithTitleAndButtons">Show Confirm with Custom Title and Custom Buttons</TelerikButton>

@code {
    [CascadingParameter]
    private DialogFactory Dialogs { get; set; }

    private async Task ShowConfirm()
    {
        bool isConfirmed = await Dialogs.ConfirmAsync("Are you sure?");

        if (isConfirmed)
        {
            Console.WriteLine("The user is sure, continue.");
        }
        else
        {
            Console.WriteLine("The user changed their mind");
        }
    }

    private async Task ShowConfirmWithTitle()
    {
        bool isConfirmed = await Dialogs.ConfirmAsync("Are you sure?", "Confirmation!");

        Console.WriteLine($"The user is sure: {isConfirmed}.");
    }
    
    private async Task ShowConfirmWithTitleAndButtons()
    {
        bool isConfirmed = await Dialogs.ConfirmAsync("Are you sure?", "Confirmation!", "YES, I'm sure", "NO, I'm not sure");

        Console.WriteLine($"The user is sure: {isConfirmed}.");
    }
}
````

![Telerik Confirm dialog first look](images/confirm-first-look.gif)


## Prompt

The prompt dialog returns a `string` that the user enters when they press `OK`, and `null` when they press `Cancel`. This lets you `await` its execution, and then continue the application logic based on that decision. The method that calls it must be `async Task` and *not* `async void` in order to await the execution.

>caption Use a Prompt dialog

````CSHTML
@* Use Prompt as Blazor popup message, monitor the console for when and how the code continues *@

<TelerikButton OnClick="@ShowPrompt">Show Prompt</TelerikButton>
<TelerikButton OnClick="@ShowPromptWithTitle">Show Prompt with Custom Title</TelerikButton>
<TelerikButton OnClick="@ShowPromptWithTitleAndDefaultText">Show Prompt with Title and Default Input Text</TelerikButton>
<TelerikButton OnClick="@ShowPromptWithTitleDefaultTextAndButtons">Show Prompt with Title, Default Input Text and Custom Buttons</TelerikButton>

@code {
    [CascadingParameter]
    private DialogFactory Dialogs { get; set; }

    private async Task ShowPrompt()
    {
        string userInput = await Dialogs.PromptAsync("Enter your answer.");

        if (userInput == null)
        {
            Console.WriteLine("The user will not answer.");
        }
        else
        {
            Console.WriteLine($"The user said: {userInput}");
        }
    }

    private async Task ShowPromptWithTitle()
    {
        string userInput = await Dialogs.PromptAsync("Enter answer:", "Input needed");

        Console.WriteLine($"The user answer: {userInput}");
    }

    private async Task ShowPromptWithTitleAndDefaultText()
    {
        string userInput = await Dialogs.PromptAsync("Enter answer:", "Input needed", "Default Text");

        Console.WriteLine($"The user answer: {userInput}");
    }
    
    private async Task ShowPromptWithTitleDefaultTextAndButtons()
    {
        string userInput = await Dialogs.PromptAsync("Enter answer:", "Input needed", "Default Text", "READY", "REJECT");

        Console.WriteLine($"The user answer: {userInput}");
    }
}
````

![Telerik Prompt dialog first look](images/prompt-first-look.gif)


## See Also

* [Live Demo: Predefined Dialogs](https://demos.telerik.com/blazor-ui/dialog/predefined-dialogs)

