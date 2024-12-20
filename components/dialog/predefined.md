---
title: Predefined Dialogs
page_title: Dialogs - Alert, Confirm, Prompt
description: Predefined dialogs for Blazor - popup message, alert, confirm, and prompt. Explore the Telerik UI documentation.
slug: dialog-predefined
tags: telerik,blazor,dialog,predefined,alert,confirm,prompt
published: true
position: 2
---

# Predefined Dialogs - Alert, Confirm, Prompt

Telerik UI for Blazor provides styled substitutes to the standard alert, confirm, and prompt dialogs of the browser. These Blazor popup messages match the theme of the components to make it obvious to the user that the modal dialog is coming from your application.


## Using Predefined Dialogs

To use the alert, confirm, and prompt dialogs (popup messages), receive a cascading parameter of type `Telerik.Blazor.DialogFactory`. This object exposes the methods you can use to display the predefined dialogs.

<div class="skip-repl"></div>

````RAZOR
[CascadingParameter]
public DialogFactory Dialogs { get; set; }
````

There are three available ready-made dialogs:

* [Alert](#alert)
* [Confirm](#confirm)
* [Prompt](#prompt)

### TelerikRootComponent Dependency

The `DialogFactory` cascading parameter can only be consumed inside child Razor components of the [`TelerikRootComponent`]({%slug rootcomponent-overview%}#purpose). This is easily achieved in standard Blazor apps where the `TelerikRootComponent` resides inside the layout file.

* To show predefined dialogs in `MainLayout.razor`, [add the `TelerikRootComponent` in a parent layout]({%slug rootcomponent-overview%}#using-telerikrootcomponent).
* When [using UI for Blazor in ASP.NET apps]({%slug telerik-blazor-in-asp-net-app%}), an additional child component is needed.

If the `TelerikRootComponent` is not available, or if it's at the wrong place in the app, [the `DialogFactory` will trigger a `NullReferenceException`]({%slug dialog-kb-dialogfactory-null%}).

### Using await

The `DialogFactory` methods must be awaited. Do not use them with [discard variables (`_`)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/discards). If you don't need to await the user response, then [use the `<TelerikDialog>` component]({%slug dialog-overview%}) declaratively. 

### Showing Multiple Predefined Dialogs

The `DialogFactory` supports only one open popup dialog at a time. Showing multiple predefined dialogs simultaneously can result in unexpected app behavior. If a long asynchronous operation can end with the display of a `DialogFactory` popup, the application should prevent the user from triggering additional predefined dialogs before the time consuming operation completes. Consider a [LoaderContainer]({%slug loadercontainer-overview%}) to block the whole user interface or a [specific component]({%slug loadercontainer-overview%}#fill-a-parent-container).


## Alert

The alert dialog is a Blazor popup message. It shows the user that something went wrong, such as a major error that requires their attention and blocks the UI, as opposed to a [notification]({%slug notification-overview%}) that is not modal and is small.

>caption Use an Alert dialog

````RAZOR
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


## Confirm

The confirm dialog returns a `bool` value that indicates which button the user clicked - `true` for the `OK` button and `false` for the `Cancel` button. This lets you `await` its execution, and then continue the application logic based on that decision. The method that calls it must be `async Task` and *not* `async void` in order to await the execution.

>caption Use a Confirm dialog

````RAZOR
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


## Prompt

The prompt dialog returns a `string` that the user enters when they press `OK`, and `null` when they press `Cancel`. This lets you `await` its execution, and then continue the application logic based on that decision. The method that calls it must be `async Task` and *not* `async void` in order to await the execution.

>caption Use a Prompt dialog

````RAZOR
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


## See Also

* [Live Demo: Predefined Dialogs](https://demos.telerik.com/blazor-ui/dialog/predefined-dialogs)
* [Using the `<TelerikDialog>` Component Declaratively]({%slug dialog-overview%})
* [Setting Width to Predefined Dialogs]({%slug dialog-kb-dialogfactory-alert-confirm-prompt-width%})
