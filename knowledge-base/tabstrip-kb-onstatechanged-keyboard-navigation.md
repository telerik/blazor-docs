---
title: TabStrip OnStateChanged Not Raised When Active Tab Changes via Keyboard Navigation
description: Learn why the OnStateChanged event does not fire when changing active tabs with keyboard navigation in the UI for Blazor TabStrip and how to work around the issue.
type: troubleshooting
page_title: OnStateChanged Missing for Keyboard Navigation in Blazor TabStrip
meta_title: OnStateChanged Not Triggered for Keyboard Navigation in Blazor TabStrip
slug: tabstrip-kb-onstatechanged-keyboard-navigation
tags: telerik, blazor, tabstrip, onstatechanged, activetabidchanged, keyboard navigation
ticketid: 1718946
res_type: kb
components: ["tabstrip"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TabStrip for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>14.0.0</td>
        </tr>
    </tbody>
</table>

## Description

The TabStrip exhibits different behavior when the active tab changes with a mouse click or keyboard navigation.

The `OnStateChanged` event does not fire when you navigate between tabs with the arrow keys, `Home`, or `End` keys. The `ActiveTabIdChanged` event fires instead.

This behavior affects applications that use `OnStateChanged` to persist and restore the TabStrip state. A tab selected with keyboard navigation is not persisted, and the TabStrip restores the last tab that was selected with a mouse click after reload.

### Steps to Reproduce

1. Add a `TelerikTabStrip` with `OnStateChanged` bound to a handler that logs or persists the `TabStripState`.
1. Add three or more `TabStripTab` components.
1. Click the tab header area to focus it.
1. Use the arrow keys, `Home`, or `End` keys to navigate between tabs.
1. Confirm that the active tab panel changes, but the `OnStateChanged` handler does not run.
1. Click a tab header and confirm that the `OnStateChanged` handler runs.

## Expected Behavior

The `OnStateChanged` event fires for every active tab change, regardless of whether the change results from a mouse click or keyboard navigation.

## Actual Behavior

The `OnStateChanged` event fires when a user activates a tab with a mouse click. When a user navigates with the keyboard, only the `ActiveTabIdChanged` event fires.

## Cause

The `InvokeOnStateChanged` method is not called when keyboard navigation triggers the `HandleActiveTabIdNavigationAsync` method. This is a known issue in the TabStrip component.

## Solution

No verified product fix is available for version 14.0.0. Use the workaround in the [Suggested Workarounds](#suggested-workarounds) section to persist the active tab when users navigate with the keyboard.

The issue is planned to be fixed in a future release. Verify the release notes for the exact fix version before relying on the fix.

## Suggested Workarounds

### Handle ActiveTabIdChanged Alongside OnStateChanged

1. Bind both the `OnStateChanged` and `ActiveTabIdChanged` events.
1. In the `OnStateChanged` handler, store the `TabStripState` from the `TabStripStateEventArgs` argument.
1. In the `ActiveTabIdChanged` handler, update the stored state's `ActiveTabId` property with the new tab ID.
1. Persist the updated state in both handlers.

The following example demonstrates the workaround:

>caption Persist the active TabStrip tab after keyboard navigation

````RAZOR
<TelerikTabStrip OnStateChanged="@HandleStateChanged"
                 ActiveTabIdChanged="@HandleActiveTabIdChanged">
    <TabStripTab Title="Tab 1">
        Content 1
    </TabStripTab>
    <TabStripTab Title="Tab 2">
        Content 2
    </TabStripTab>
    <TabStripTab Title="Tab 3">
        Content 3
    </TabStripTab>
</TelerikTabStrip>

@code {
    private TabStripState State { get; set; } = new();

    private void HandleStateChanged(TabStripStateEventArgs args)
    {
        State = args.TabStripState;

        // Persist or log the state here.
    }

    private void HandleActiveTabIdChanged(string newActiveTabId)
    {
        State.ActiveTabId = newActiveTabId;

        // Persist or log the updated state here.
    }
}
````

This workaround keeps the active tab ID up to date when users change tabs with a mouse or keyboard.

## See Also

* [TabStrip Overview](slug:tabstrip-overview)
* [TabStrip Events](slug:tabstrip-events)
* [TabStrip State Management](slug:tabstrip-state)
