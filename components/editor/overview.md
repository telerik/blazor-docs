---
title: Overview
page_title: Editor Overview
description: Overview of the Editor for Blazor.
slug: editor-overview
tags: telerik,blazor,editor
published: True
position: 0
---

# Editor Overview

The Blazor HTML Editor component enables your users to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and delivers a set of tools for creating, editing, and formatting text, paragraphs, lists, and other HTML elements.

To use the Telerik Editor for Blazor:

1. Add the `<TelerikEditor>` tag.
1. Bind its `Value` to the `string` field you want to get the HTML content in.

````CSHTML
@* This sample simulates loading some content from a data source and lets the Editor alter it in the view-model *@

<TelerikEditor @bind-Value="@TheEditorValue" Width="650px" Height="400px"></TelerikEditor>

@code{
    string TheEditorValue { get; set; }

    protected override Task OnInitializedAsync()
    {
        TheEditorValue = @"
            <p>
                The Blazor Editor allows your users to edit HTML in a familiar, user-friendly way. Your users do not have to understand HTML in order to create it.
            </p>
            <p>
                The widget <strong>outputs identical HTML</strong> across all major browsers, follows
                accessibility standards, and provides API for content manipulation.
            </p>
            <p>Features include:</p>
            <ul>
                <li>Text formatting</li>
                <li>Bulleted and numbered lists</li>
                <li>Hyperlinks</li>
                <li>Cross-browser support</li>
                <li>Identical HTML output across browsers</li>
                <li>Ability to create custom tools, dropdowns, dialogs</li>
            </ul>
        ";
        return base.OnInitializedAsync();
    }
}
````

>caption The result from the code snippet above

![Editor first look](images/editor-overview.png)


## Component reference

You can use the component reference to call its [Methods](#methods), especially when creating [custom tools]({%slug editor-custom-tool%}). This snippet shows how to obtain a reference and its namespace.


````CSHTML
@using Telerik.Blazor.Components 

<TelerikEditor @ref="@TheEditorReference"></TelerikEditor>

@code{
    TelerikEditor TheEditorReference { get; set; }
}
````



## Dependencies

Authoring HTML content happens in the browser and relies on the browser HTML editing engine (see the [contenteditable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content) attribute). Thus, an HTML Editor component must rely on that and use JavaScript.

The Telerik UI for Blazor Editor uses the ProseMirror engine and it depends on it. You do not need to add any assets or references yourself, the Editor registers them for you when it initializes, and it takes points them to the static assets of the Telerik UI for Blazor package. This approach improves the initial load time of your app and removes the dependency management task from you.



## Get/Set Content

The Blazor HTML Editor interacts with its content (value) like all standard components - through its `Value` parameter. You can use it to get and set the HTML string the editor will work with. You can read more about value binding and data binding [here]({%slug get-started-value-vs-data-binding%}).

You can use the following features to get or set the editor content:

* `@bind-Value` - the recommended approach of using two-way binding to get and set the content of the editor. It lets your view-model provide the initial value, and it will update the view-model as the user alters the HTML.

* `UpdateInterval` - the time in milliseconds that passes between updates on the `Value`. The default is `100ms` and if that causes performance issues with many repaints on your view, you can increase it. Since the editor is expected to handler longer editing sessions and larger content than regular inputs, we added this parameter to debounce the view-model updates and events.

* [Validation]({%slug common-features/input-validation%}#editor) - the standard Data Annotation attributes are supported for validation, but for the performance reasons listed above, validation happens with the `UpdateInterval` delay, not immediately on every keystroke, like simpler inputs. 

* The `ValueChanged` and `OnChange` [events]({%slug editor-events%}) let you receive the value and act on it. If you use the `ValueChanged` event (no two-way binding), you can effectively cancel the user's input by not updating the view-model, or you can even alter it with something else.

>important The application must sanitize the content before passing it to the editor and, optionally, before saving it to its storage after obtaining it from the editor. It is up to the application to ensure there is no malicious content (such as input sanitization, XSS attack prevention and other security concerns).


## Methods

talk about ExecuteAsync, where to find the command arguments and names, snippet with "paste at cursor position".


## Features

consider - maybe link toolbars, import/export, custom commands, events, validation. There isn't much left so this may drop out.


## See Also

  * [Live Demo: Editor](https://demos.telerik.com/blazor-ui/editor/overview)
  * [Toolbar]({%slug editor-toolbars%})
  * [Events]({%slug editor-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikEditor)
   
