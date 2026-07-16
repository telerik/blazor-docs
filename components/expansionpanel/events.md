---
title: Events
page_title: ExpansionPanel Events
description: Learn about the Telerik ExpansionPanel component events and event arguments.
slug: expansionpanel-events
tags: blazor,expansionpanel,events
components: ["expansionpanel"]
published: True
position: 100
---

# ExpansionPanel Events

This article describes the available events in the Telerik ExpansionPanel for Blazor.

## ExpandedChanged

The ExpansionPanel `ExpandedChanged` event fires when:

* The user expands or collapses the component.
* The app executes the component's `ExpandAsync`, `CollapseAsync`, or `ToggleAsync` method.

Make sure to update the value of the `Expanded` parameter by using the boolean argument that the event handler receives.

>caption Using the ExpansionPanel events

````RAZOR
<p>Last Event: @ExpansionPanelEventLog</p>

<p><TelerikButton OnClick="@OnToggleButtonClick">Toggle</TelerikButton></p>

<TelerikExpansionPanel @ref="ExpansionPanelRef"
                       Expanded="@ExpansionPanelExpanded"
                       ExpandedChanged="@ExpansionPanelExpandedChanged"
                       Title="Expansion Panel Title">
    <Content>
        ExpansionPanel Content
    </Content>
</TelerikExpansionPanel>

@code {
    private TelerikExpansionPanel? ExpansionPanelRef;

    private bool ExpansionPanelExpanded { get; set; }

    private string ExpansionPanelEventLog { get; set; } = string.Empty;

    private void ExpansionPanelExpandedChanged(bool newExpanded)
    {
        ExpansionPanelExpanded = newExpanded;
        ExpansionPanelEventLog = $"ExpansionPanel ExpandedChanged event fired with new value: {newExpanded}";
    }

    private async Task OnToggleButtonClick()
    {
        await ExpansionPanelRef!.ToggleAsync();
    }
}
````

## See Also

* [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.TelerikExpansionPanel)
