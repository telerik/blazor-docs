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

This article describes the available events in the Telerik ExpansionPanel for Blazor:

* [`ExpandedChanged`](#)
* [`OnCollapse`](#)
* [`OnExpand`](#)

## ExpandedChanged

The ExpansionPanel `OnCardClick` event fires when the user:

* Clicks or taps a Card.
* Hits `Enter` while a Card is focused.

The event handler receives a generic [`TaskBoardCardClickEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardClickEventArgs-1) argument.

The [`OnExpand`](#) and [`OnCollapse`]() fire after `ExpandedChanged`.

>caption Using the ExpansionPanel ExpandedChanged event

````RAZOR.skip-repl
<TelerikExpansionPanel Expanded="@ExpansionPanelExpanded"
                       ExpandedChanged="@ExpansionPanelExpandedChanged" />

@code {
    private bool ExpansionPanelExpanded { get; set; }

    private void ExpansionPanelExpandedChanged(bool newExpanded)
    {
        ExpansionPanelExpanded = newExpanded;
    }
}
````

Also see the [runnable example](#example) below.

## OnCollapse

>caption Using the ExpansionPanel OnCollapse event

````RAZOR.skip-repl
<TelerikExpansionPanel OnCollapse="@OnExpansionPanelCollapse" />

@code {
    private void OnExpansionPanelCollapse()
    {

    }
}
````

Also see the [runnable example](#example) below.

## OnExpand

>caption Using the ExpansionPanel OnExpand event

````RAZOR.skip-repl
<TelerikExpansionPanel OnExpand="@OnExpansionPanelExpand" />

@code {
    private void OnExpansionPanelExpand()
    {

    }
}
````

## Example

>caption Using the ExpansionPanel events

````RAZOR
<p>Last Event: @ExpansionPanelEventLog</p>

<TelerikExpansionPanel Expanded="@ExpansionPanelExpanded"
                       ExpandedChanged="@ExpansionPanelExpandedChanged"
                       OnCollapse="@OnExpansionPanelCollapse"
                       OnExpand="@OnExpansionPanelExpand"
                       Title="Expansion Panel Title">
    <Content>
        ExpansionPanel Content
    </Content>
</TelerikExpansionPanel>

@code {
    private bool ExpansionPanelExpanded { get; set; }

    private string ExpansionPanelEventLog { get; set; } = string.Empty;

    private void ExpansionPanelExpandedChanged(bool newExpanded)
    {
        ExpansionPanelExpanded = newExpanded;
        ExpansionPanelEventLog = $"ExpansionPanel ExpandedChanged event fired with new value: {newExpanded}";
    }

    private void OnExpansionPanelCollapse()
    {
        ExpansionPanelEventLog = "ExpansionPanel OnCollapse event fired.";
    }

    private void OnExpansionPanelExpand()
    {
        ExpansionPanelEventLog = "ExpansionPanel OnExpand event fired.";
    }
}
````

## See Also

* [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.ExpansionPanel)
