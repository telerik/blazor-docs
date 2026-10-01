---
title: Popup Form Template
page_title: TreeList Popup Form Template
description: Learn how to define a custom popup create or edit template in the Blazor Data TreeList. The template allows you to customize the layout and the content of the create/edit popup.
slug: treelist-templates-popup-form
tags: telerik,blazor,treelist,templates,popup,edit,create
published: True
position: 50
components: ["treelist"]
---

# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the TreeList. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<TreeListPopupEditFormSettings>`.

You can use the `Context` attribute of the `<FormTemplate>` tag to set the name of the context variable. The context variable is of type `object` and can be cast to the model type to which the TreeList is bound.
    
>When using the template, the default Popup form is replaced by the declared content within the `FormTemplate` tag. Consequently, the default `Update` and `Cancel` buttons are removed. This means the [`OnUpdate` and `OnCancel`](slug:treelist-editing-overview#events) events cannot be triggered. To modify or cancel the update of a record, you need to include custom controls to manage these actions.

>caption Using a `FormTemplate` to modify the Edit/Create Popup window.
<demo metaUrl="client/treelist/templates/popup-form-template/example-1/" height="720"></demo>

## See Also

* [TreeList Popup Buttons Template](slug:treelist-templates-popup-buttons)
* [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/TreeList/templates)
* [Live Demo: TreeList Popup Edit Form Template](https://demos.telerik.com/blazor-ui/treelist/popup-edit-form-template)