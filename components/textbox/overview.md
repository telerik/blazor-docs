---
title: Overview
page_title: Textbox for Blazor Overview
description: Overview of the Textbox for Blazor
slug: components/textbox/overview
tags: telerik,blazor,textbox,overview
published: True
position: 0
---

# Textbox Overview

The Textbox component allows the user to enter a generic plain text message. You can also add a label or class.

To use a Telerik Textbox for Blazor, add the `TelerikTextBox` tag.

>caption Basic textbox with value binding, namespace and reference

````CSHTML
@theTbValue
<br />

<TelerikTextBox @bind-Value="theTbValue" Label="Enter Information" @ref="theTextBoxRef"></TelerikTextBox>

@code {
    string theTbValue { get; set; } = "lorem ipsum";

    Telerik.Blazor.Components.TelerikTextBox theTextBoxRef;
}
````


>caption The textbox provides the following features:

* `Class` - the CSS class that will be rendered on the `input` element.
* `Enabled` - whether the `input` is enabled.
* `Id` - renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.
* `Label` - the `label` element rendered next to the `input` to provide the user with information on its purpose.
* `Value` - get/set the value of the input, can be used for binding.
* `Width` - the width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.


## See Also

  * [Live Demo: Textbox](https://demos.telerik.com/blazor-ui/textbox/index)
  * [Live Demo: Textbox Validation](https://demos.telerik.com/blazor-ui/textbox/validation)
  * [Input Validation]({%slug common-features/input-validation%})
