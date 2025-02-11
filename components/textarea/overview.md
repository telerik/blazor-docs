---
title: Overview
page_title: TextArea Overview
description: Overview of the TextAre for Blazor.
slug: textarea-overview
tags: telerik,blazor,textarea,multiline,text,overview
published: True
position: 0
---

# Blazor TextArea Overview

The Telerik <a href ="https://www.telerik.com/blazor-ui/textarea" target="_blank">Blazor TextArea component</a> is a highly customizable multi-line text input area. It provides features like auto resizing based on the user input and [events](slug:textarea-events) to respond to user actions.

## Creating Blazor TextArea

1. Add the `<TelerikTextArea>` tag to a Razor file.
1. Set the `Value` parameter to a `string` object. It supports one-way and two-way binding.
1. (optional) Set the `MaxLength ` property to control the maximum amount of characters that the user can type in the component.
1. (optional) Set the `Rows` property to adjust the TextArea height.

>caption Basic TextArea with two-way value binding

````RAZOR
<TelerikTextArea @bind-Value="@TextAreaValue"
                 MaxLength="200"
                 Rows="5" />

<p>TextArea value: @TextAreaValue</p>

@code {
    public string TextAreaValue { get; set; }
}
````

## Appearance

The TextArea component provides settings to control its appearance. [Read more about the Blazor TextArea appearance settings](slug:TextArea-appearance).

>tip To learn more about the appearance, anatomy, and accessibility of the TextArea, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/textarea/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

@[template](/_contentTemplates/common/inputs.md#adornments)

## Events

The Blazor TextArea fires **blur** and value **change** events to respond to user actions. [Read more about the Blazor TextArea events](slug:textarea-events).

## TextArea Parameters

The Blazor TextArea provides various parameters to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `AutoCapitalize` | `string` | A `string` that maps to the [`autocapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize) attribute of the HTML element. It's applicable only for touch devices and virtual keyboards. |
| `AutoComplete` | `bool` | Maps to the autocomplete attribute of the HTML `<textarea>`. |
| `ResizeMode` | `TextAreaResizeMode?` | Specifies the TextArea's resize behavior. The default behavior is the one set by the browser. You can also [use CSS to limit the resizing up to a max height](slug:textarea-kb-autosize-max-height). |
| `Class` | `string` | The custom CSS class to be rendered on the `<span class="k-textarea">` element. |
| `Cols` | `int?` | Maps to the `cols` attribute of the HTML `<textarea>` element. Do not use together with `Width`.
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the TextArea is enabled. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Id` | `string` | Renders as the `id` attribute on the `<textarea>` element, so you can attach a `<label for="">`. |
| `MaxLength` | `int?` | Maps to the `maxlength` attribute of the HTML `<textarea>` element. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `Placeholder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `Rows` | `int?` | Maps to the `rows` attribute of the HTML `<textarea>` element.
| `SpellCheck` | `string` | A `string` that maps to the [`spellcheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) attribute of the HTML element. Use it to disable browser spellchecking if it's intrusive to the user or due to [privacy and security concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns). |
| `TabIndex` | `Nullable<int>` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [Blazor Tooltip](slug:tooltip-overview). |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs](slug:common-features/input-validation#validation-modes-for-simple-inputs). |
| `Value` | `string` | The value of the component. Supports two-way binding. |
| `Width` | `string` | The component width. See [Dimensions](slug:common-features/dimensions). The `Width` parameter has no default value, but the theme applies a `width: 100%` style. Do not use together with `Cols`.|

See the [Input Validation](slug:common-features/input-validation) article.

## TextArea Reference and Methods

The TextArea provides a `FocusAsync` method that allows the application to focus the component programmatically. First, obtain reference to the component through its `@ref` attribute.
@[template](/_contentTemplates/common/inputs.md#focus-kb)

>caption Use TextArea methods

````RAZOR.skip-repl
<TelerikButton OnClick="@FocusTextArea">Focus TextArea</TelerikButton>

<TelerikTextArea @ref="@TextAreaRef"
                 @bind-Value="@TextAreaValue"
                 Width="200px" />

@code {
    private TelerikTextArea TextAreaRef { get; set; }

    private string TextAreaValue { get; set; }

    async Task FocusTextArea()
    {
        await TextAreaRef.FocusAsync();
    }
}
````

## Next Steps

* [Handle the TextArea Events](slug:textarea-events)
* [Explore the TextArea Appearance Settings](slug:TextArea-appearance)

## See Also

  * [Live TextArea Demos](https://demos.telerik.com/blazor-ui/textarea/overview)
  * [TextArea API Reference](slug:Telerik.Blazor.Components.TelerikTextArea)
