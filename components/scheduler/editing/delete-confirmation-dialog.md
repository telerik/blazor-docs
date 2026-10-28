---
title: Delete Confirmation Dialog
page_title: Scheduler - Delete Confirmation Dialog
description: Delete Confirmation Dialog in the Scheduler for Blazor.
slug: scheduler-delete-confirmation-dialog
tags: telerik,blazor,scheduler,appointment,appointments,edit,editing,delete,confirmation,dialog
published: True
position: 5
components: ["scheduler"]
---

# Delete Confirmation Dialog

This article provides information on how to enable the built-in delete confirmation dialog and how you can create a custom dialog:
* [Basics](#basics)
* [Custom Delete Confirmation Dialog](#custom-delete-confirmation-dialog)

## Basics

The built-in delete confirmation dialog triggers before event deletion. You can enable it by setting the `ConfirmDelete` parameter of the Scheduler to `true`. The default texts of the dialog are exposed in the [localization](slug:globalization-localization) messages of the component, and you can customize them.

>important This dialog displays only for **single** events, **not** for recurring. The built-in delete confirmation dialog for recurring events is **not** changed.

>caption Enabling of the Delete Confirmation Dialog

<demo metaUrl="client/scheduler/delete-confirmation-dialog/example-1/" height="780"></demo>

## Custom Delete Confirmation Dialog

@[template](/_contentTemplates/grid/built-in-dialogs.md#delete-confirmation)


## See Also

* [Data Binding](slug:scheduler-appointments-databinding)
* [Live Demo: Appointment Editing](https://demos.telerik.com/blazor-ui/scheduler/appointment-editing)
* [Custom Edit Form](https://github.com/telerik/blazor-ui/tree/master/scheduler/custom-edit-form)
* [Customize the Delete Confirmation Dialog](slug:grid-kb-customize-delete-confirmation-dialog)

