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



## Get/Set content

value binding - one and two-way (link value bind vs data bind article, link validation article); the UpdateInterval parameter.

Maybe a note that you must sanitize the html string before storing to DB and after getting it from DB to ensure it does not contain malicious content.


## Methods

talk about ExecuteAsync, where to find the command arguments and names, snippet with "paste at cursor position".


## Features

consider - maybe link toolbars, import/export, custom commands, events, validation. There isn't much left so this may drop out.


## See Also

  * [Live Demo: Editor](https://demos.telerik.com/blazor-ui/editor/overview)
  * [Toolbar]({%slug editor-toolbars%})
  * [Events]({%slug editor-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikEditor)
   
