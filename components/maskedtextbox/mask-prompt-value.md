---
title: Mask, Prompt, Value
page_title: MaskedTextbox - Mask, Prompt, Value
description: The relationship and configuration options for the mask, prompt and value in the Masked Textbox for Blazor.
slug: maskedtextbox-mask-prompt-value
tags: telerik,blazor,masked,textbox,mask,prompt,value
published: true
position: 10
---

# Mask, Prompt, Value

This article explains the relationship and the configuration options that tie the Mask, the prompts and the Value of the Telerik MaskedTextbox for Blazor. The settings and behaviors described below let you customize the behavior of the component and what data you will get out of it


````CSHTML
<div style="white-space: pre;">@TheValue</div>
<TelerikMaskedTextBox IncludeLiterals="true" MaskOnFocus="true" PromptPlaceholder="@( "a"[0] )"
                      Prompt="@( "*"[0] )" Mask="0000-0000-0000-0000" @bind-Value="@TheValue"  
                      Label="Credit Card Number:">
</TelerikMaskedTextBox>
@code{
    string TheValue { get; set; }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
