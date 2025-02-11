---
title: Overview
page_title: Editor Overview
description: Overview of the Editor for Blazor.
slug: editor-overview
tags: telerik,blazor,editor
published: True
position: 0
---

# Blazor Editor Overview

The <a href = "https://www.telerik.com/blazor-ui/editor" target="_blank">Blazor HTML Editor component</a> enables your users to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and delivers a set of tools for creating, editing, and formatting text, paragraphs, lists, and other HTML elements.

## Creating Editor

1. Use the `TelerikEditor` tag to add the component to your razor page.
1. Bind its `Value` to the `string` field you want to get the HTML content in.

````RAZOR
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

## Get/Set Content

The Blazor HTML Editor has a `Value` parameter, similar to other input components. Use the `Value` parameter to get or set the HTML string that shows inside the Editor content area.

An empty string is a valid initial Editor `Value`, but after the user interacts with the component, the minimal component `Value` is at least an empty element (usually `"<p></p>"`). Note that [the Editor and the browser treat empty paragraphs differently](slug:editor-kb-missing-br-tags-in-value).

The Editor manages its content and `Value` depending on a [customizable schema](#prosemirror-schema-and-plugins), which defines the allowed HTML tags and attributes. The component strips all other tags and attributes for compliance and security reasons.


## Security

@[template](/_contentTemplates/editor/general.md#app-must-sanitize-content)


## Validation

You can use the standard Data Annotation attributes to validate the content of the Editor. For the performance reasons listed above, validation happens with the `DebounceDelay` delay, not immediately on every keystroke, like simpler inputs. [See the Validation article for an example on how to validate the content of the Editor...](slug:common-features/input-validation#editor)

## Large Content Support 

@[template](/_contentTemplates/editor/general.md#content-size-signalr)

## Resizing

The Editor allows you to resize:

#### Tables

Tables, their columns, and rows in the content area of Editor are resizable. To grab the resize handles, hover on the column or row borders. 

#### Images

Images in the content area of the Editor are resizable. To grab the resize handles, hover on the borders of the image.

## Dependencies

The Telerik UI for [Blazor Editor](https://www.telerik.com/blazor-ui/editor) uses the ProseMirror engine and it depends on it. You do not need to add any extra assets or references yourself, though, we have taken care of everything internally.

## ProseMirror Schema and Plugins

The Editor uses a built-in <a href="https://prosemirror.net/docs/guide/#schema" target="_blank">ProseMirror Schema</a> containing some of the most common HTML tags and a set of predefined <a href="https://prosemirror.net/docs/ref/#state.Plugin_System" target="_blank">ProseMirror Plugins</a> for its basic functionalities. You can customize the default ProseMirror [Schema](slug:editor-prosemirror-schema-overview) and [Plugins](slug:editor-prosemirror-plugins) to achieve the desired functionality in the Editor for Blazor. 

## Editor Parameters

The following table lists Editor parameters, which are not discussed elsewhere in the component documentation. 

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Value`  | `string` | The value of the component. It supports two-way binding or alternatively, use it with the [`ValueChanged` event](slug:editor-events#valuechanged). |
| `DebounceDelay`  | `int` <br /> (`100`) | The time in milliseconds that passes between updates on the `Value`. The default is `100ms` and if that causes performance issues with many repaints on your view, you can increase it. Since the editor is expected to handle longer editing sessions and larger content than regular inputs, we added this parameter to debounce the view-model updates and events. |
| `Adaptive`  | `bool` | Defines if the [toolbar](slug:editor-toolbar) should adapt to changes in the width of the component and automatically hide and show the overflowing items in a popup. |
| `Width`  | `string` | Defines the width of the Editor. The default width is `null` but the themes apply `100%`. |
| `Height`  | `string` <br /> (`250px`) | Defines the height of the Editor. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `AriaLabelledBy`  | `string` | Maps to the `area-labelledby` attribute. Use this parameter to reference another element to define its accessible name. |
| `AriaDescribedBy`  | `string` | Maps to the `area-describedby` attribute. Use this parameter to establish a relationship between widgets or groups and the text that describes them. |

## Editor Reference and Methods

The Editor provides methods for programmatic operation. To use them, obtain a reference to the component through its `@ref` attribute.

| Method | Description |
| --- | --- |
| `ExecuteAsync` | Executes a [built-in Editor command programmatically](slug:editor-built-in-tools#programmatic-execution). You can also use this method to call built-in commands that are part of a [custom tool](slug:editor-custom-tools). |
| `FocusAsync` | Focuses the editable area of the component. Always `await` this call, as it relies on `JSInterop`. @[template](/_contentTemplates/common/inputs.md#focus-kb) |

>caption Paste in the Editor at the cursor position

````RAZOR
@* This snippet shows how to insert a horizontal rule (<hr /> tag) at the cursor position.
You can replace that string with any other content you can generate/obtain according to your application needs*@

@using Telerik.Blazor.Components.Editor

<TelerikButton OnClick="@InsertHr">insert hr</TelerikButton>

<TelerikEditor @ref="@TheEditor" @bind-Value="@TheContent"></TelerikEditor>

@code{
    TelerikEditor TheEditor { get; set; }

    string TheContent { get; set; } = "<p>Lorem ipsum.</p><p>Dolor sit amet.</p>";

    async Task InsertHr()
    {
        await TheEditor.ExecuteAsync(new HtmlCommandArgs("insertHtml", "<hr />"));
    }
}
````

## Next Steps

* [Explore the Built-in Tools and Commands](slug:editor-built-in-tools)
* [Create Custom Tools](slug:editor-custom-tools)
* [Explore the Editor Edit Modes](slug:editor-edit-modes-overview)
* [Import and Export Data](slug:editor-import-export)
* [Learn more about the Editor Events](slug:editor-events)

## See Also

* [Live Demo: Editor](https://demos.telerik.com/blazor-ui/editor/overview)
* [Editor API Reference](slug:Telerik.Blazor.Components.TelerikEditor)
