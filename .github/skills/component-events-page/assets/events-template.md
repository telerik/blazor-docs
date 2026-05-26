---
title: Events
page_title: Component Name Events
description: Learn about the Telerik Component Name component events and event arguments.
slug: componentname-events
tags: telerik, blazor, component name
published: True
position: 100
---

# Component Name Events

This article describes the available events in the Telerik Component Name for Blazor:

* [Event 1](#event-1)
* [Event 2](#event-2)
* [Event 3](#event-3)

## Event 1

The Component Name `OnComponentEvent` event fires when the user ...

````RAZOR.skip-repl

<TelerikComponent OnComponentEvent="@OnComponentEventHandler" />

@code {
    private void OnComponentEventHandler(ComponentEventNameArgs args)
    {

    }
}
````

## Event 2

The Component Name `OnComponentEvent` event fires when the user ...

````RAZOR.skip-repl

<TelerikComponent OnComponentEvent="@OnComponentEventHandler" />

@code {
    private void OnComponentEventHandler(ComponentEventNameArgs args)
    {

    }
}
````

## Example

````RAZOR

<TelerikComponent />

@code {

}
````


## See Also

* [Live Component Name Demos](https://demos.telerik.com/blazor-ui/component-name)
* [Component Name API Reference](slug:Telerik.Blazor.Components.TelerikComponentName)
