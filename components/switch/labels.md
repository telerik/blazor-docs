---
title: Labels
page_title: Switch Labels
description: Labels in the Switch for Blazor.
slug: switch-labels
tags: telerik,blazor,labels,on,off
published: True
position: 10
components: ["switch"]
---
# Switch Labels

`On` or `Off` labels are rendered inside the Switch based on its value:

* `OnLabel` will be shown when the Switch `Value` is `true` 
* `OffLabel` will be shown when the Switch `Value` is `false`

The component allows customization of the labels text through the dedicated parameters. [Provide your desired strings](#customize-labels-text) for the Switch labels or [use a blank space to remove visible labels](#remove-labels).

## Customize Labels Text

Provide the desired text for the On and Off labels through the corresponding parameters. If the text is longer, you can increase the component `Width` to ensure the label will be visible.

````RAZOR
@* Use the OnLabel and OffLabel to customize the labels of the Switch. Use the Width parameter to manipulate the width of the component. *@
<p>
    I agree to the terms and conditions
</p>

<TelerikSwitch @bind-Value="@hasAgreed"
               OnLabel="@myOnLabel"
               OffLabel="@myOffLabel"
               Width="100px">
</TelerikSwitch>

@code {
    public bool hasAgreed { get; set; }
    public string myOnLabel { get; set; } = "Agree";
    public string myOffLabel { get; set; } = "Disagree";
}
````

## Remove Labels

To remove the Switch labels, use a blank space for the `OnLabel` and `OffLabel` parameters.

````RAZOR
@* Use a blank space to remove visible labels *@

<TelerikSwitch @bind-Value="@isSelected" OnLabel=" " OffLabel=" " />

@code {
    private bool isSelected { get; set; }
}
````

## See Also
* [Live Demo: Switch Labels](https://demos.telerik.com/blazor-ui/switch/labels)
* [Switch Events](slug:switch-events)