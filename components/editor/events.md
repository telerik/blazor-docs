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

The `OnChange` event fires when the editor loses focus. It does not prevent two-way value binding.

>caption Handle the OnChange event

````CSHTML
@* The user moved focus away from the editor *@

<TelerikEditor @bind-Value="@TheEditorContent" OnChange="@OnChangeHandler">
</TelerikEditor>

@TheEditorContent

@code {
    string TheEditorContent { get; set; } = "<p>Lorem ipsum</p><p>Dolor sit amet.</p>";

    void OnChangeHandler(object value)
    {
        string currContent = (string)value;
        Console.WriteLine($"OnChange fired with {currContent}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [Editor Overview]({%slug editor-overview%})
