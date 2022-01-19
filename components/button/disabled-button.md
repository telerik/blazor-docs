---
title: Disabled Button
page_title: Disabled Button
description: Learn how to configure a disabled Blazor Button component by Telerik UI.
slug: button-disabled
tags: telerik,blazor,disabled,button,
published: True
position: 5
---

# Disabled Button

Sometimes specific buttons in an application must be temporarily disabled. To control the enabled state of the component, use the `Enabled` Boolean attribute.

The following example demonstrates how to enable and disable the Button.

>caption Toggle Telerik Button Enabled State

````CSHTML
<p>
    <label>
        <TelerikCheckBox @bind-Value="@ButtonIsEnabled" /> Toggle Button State
    </label>
</p>

<TelerikButton Enabled="@ButtonIsEnabled">@ButtonText</TelerikButton>

@code {
    bool ButtonIsEnabled { get; set; } = false;
    string ButtonText => ButtonIsEnabled ? "Enabled Button" : "Disabled Button";
}

>caption Comparison between disabled and enabled button

![](images/disabled-button.png)