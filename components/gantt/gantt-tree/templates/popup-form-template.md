---
title: Popup Form Template
page_title: Gantt Tree - Gantt Popup Form Template
description: Learn how to define a custom create or edit popup template in the Blazor Gantt. The template allows you to customize the layout and the content of the create/edit popup.
slug: gantt-templates-popup-form
tags: telerik,blazor,gantt,ganttchart,templates,popup,edit,create
published: True
position: 50
components: ["gantt"]
---

# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the Gantt. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<GanttPopupEditFormSettings>`.

You can use the `Context` attribute of the `<FormTemplate>` tag to set the name of the context variable. The context variable is of type `object` and can be cast to the model type to which the Gantt is bound.


>caption Using a `FormTemplate` to modify the Edit/Create Popup window.

<demo metaUrl="client/gantt/popup-form-template/example-1/" height="740"></demo>
