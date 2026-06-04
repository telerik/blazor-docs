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

````RAZOR
<p>Last Popup Event: @PopupEventLog</p>

<TelerikPopup @ref="@PopupRef"
              AnchorSelector=".popup-target"
              HideOnOutsideClick="true"
              OnHide="@OnPopupHide"
              Width="200px"
              Height="100px">
    <div style="height: 100%; background: var(--kendo-color-primary-subtle);"></div>
</TelerikPopup>

<TelerikButton OnClick="@TogglePopup"
               Class="popup-target">@ButtonText</TelerikButton>

@code {
    private TelerikPopup? PopupRef { get; set; }

    private bool PopupVisible { get; set; }

    private string ButtonText => PopupVisible ? "Hide Popup" : "Show Popup";

    private string PopupEventLog { get; set; } = string.Empty;

    private void OnPopupHide()
    {
        PopupVisible = false;
        PopupEventLog = $"Popup OnHide event fired at {DateTime.Now.ToString("HH:mm:ss")}";
    }

    private void TogglePopup()
    {
        if (PopupVisible)
        {
            PopupRef?.Hide();
        }
        else
        {
            PopupRef?.Show();
        }

        PopupVisible = !PopupVisible;
    }
}
````

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug:Telerik.Blazor.Components.TelerikPopup)
