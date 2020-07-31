---
title: Events
page_title: Editor - Events
description: Events of the Editor for Blazor.
slug: editor-events
tags: telerik,blazor,editor,event
published: True
position: 150
---

# Editor Events

This article explains the events available in the Telerik Editor for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)

## ValueChanged

The `ValueChanged` event in the editor is debounced with the `UpdateInterval` value (100ms by default). Every time the use changes the content and that interval elapses, the event will fire and will provide you with the new content.

When you use that event, you cannot use two-way binding and so you must update the view-model field yourself. If you do not do that, you can effectively cancel the user input, or you can even alter the content.

>caption Handle the ValueChanged event

````CSHTML
@* Provide an initial value and update the view-model through the ValueChanged event *@

<TelerikEditor Value="@TheEditorContent" ValueChanged="@ValueChangedHandler">
</TelerikEditor>

@TheEditorContent

@code {
    string TheEditorContent { get; set; } = "<p>Lorem ipsum</p><p>Dolor sit amet.</p>";

    void ValueChangedHandler(string value)
    {
        // update the view-model
        TheEditorContent = value;

        Console.WriteLine("ValueChanged fired");
    }
}
````

## OnChange

The `OnChange` parameter is inherited and while it may appear in the Intellisense, it will not function for the Editor component. In our other input components, it denotes a confirmation from the user that this is the content they want, and fires when the input loses focus or the user presses `Enter`. Both of these actions have different meaning in the editor - enter adds a new paragraph, and focus is lost all the time when you use the toolbar but this does not mean you are done writing. Thus, this event would not provide usable hooks for the application and shows up because Blazor does not allow you to hide inherited members.


## See Also

  * [Editor Overview]({%slug editor-overview%})
