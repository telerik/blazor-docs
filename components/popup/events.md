---
title: Events
page_title: Popup Events
description: Learn about the Telerik Popup component events and how to handle them in your Blazor application.
slug: popup-events
tags: telerik, blazor, popup, events
published: True
position: 100
components: ["popup"]
---

# Popup Events

This article describes the available events in the Telerik Popup for Blazor.

## OnHide

The `OnHide` event fires when the Popup closes automatically, as a result of a user click outside the Popup and outside the Popup anchor. The event fires only when the Popup `HideOnOutsideClick` parameter is set to `true`.

Use the event to execute business logic or track the Popup visibility state.

>caption Using the Popup OnHide event

````RAZOR.skip-repl

<TelerikPopup HideOnOutsideClick="true"
              OnHide="@OnPopupHide" />

@code {
    private bool PopupVisible { get; set; }

    private void OnPopupHide()
    {
        PopupVisible = false;
    }
}
````

## Example

The following runnable example demonstrates the Popup events in action.

>caption Using the Popup events

<demo metaUrl="client/popup/events/" height="300"></demo>

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug:Telerik.Blazor.Components.TelerikPopup)
