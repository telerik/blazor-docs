---
title: Events
page_title: Form Events
description: Form for Blazor - Events.
slug: form-events
tags: telerik,blazor,form,edit,events
published: True
position: 15
---

# Form Events

The Form component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnSubmit](#onsubmit)
* [OnValidSubmit](#onvalidsubmit)
* [OnInvalidSubmit](#oninvalidsubmit)

## OnSubmit

The `OnSubmit` event fires when the user clicks on the Submit button in the Form. It takes as a parameter the `EditContext` object and is used to provide custom validation for the component. When this event is setup the `OnValidSubmit` and `OnInvalidSubmit` events will not be fired.

## See Also

  * [Toolbar]({%slug editor-toolbars%})
  * [Built-in Tools and Commands]({%slug editor-built-in-tools%})
  * [Custom Tools]({%slug editor-custom-tool%})
  * [Import and Export]({%slug editor-import-export%})
  * [Events]({%slug form-events%})
  * [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikEditor)
   
