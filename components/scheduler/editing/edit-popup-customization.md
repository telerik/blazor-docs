---
title: Edit Popup Customization
page_title: Scheduler - Edit Popup Customization
description: Edit Popup Customization in the Scheduler for Blazor.
slug: scheduler-edit-popup-customization
tags: telerik,blazor,scheduler,edit,popup,customization
published: True
position: 10
components: ["scheduler"]
---

# Edit Popup Customization

The Scheduler allows customization of the edit popup and its form. You can define your desired configuration in the `SchedulerPopupEditSettings` and `SchedulerPopupEditFormSettings` tags under the `SchedulerSettings` tag.

### Popup Customization

The `SchedulerPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

### Edit Form Customization

The `SchedulerPopupEditFormSettings` nested tag exposes a `ButtonsLayout` parameter of type [`FormButtonsLayout`](slug:telerik.blazor.formbuttonslayout) that controls the horizontal alignment of the edit form buttons. The default value is `End`.

>caption Customize the popup edit form

<demo metaUrl="client/scheduler/edit-popup-customization/example-1/" height="780"></demo>


## See Also

* [Data Binding](slug:scheduler-appointments-databinding)
* [Live Demo: Appointment Editing](https://demos.telerik.com/blazor-ui/scheduler/appointment-editing)
* [Custom Edit Form](https://github.com/telerik/blazor-ui/tree/master/scheduler/custom-edit-form)
