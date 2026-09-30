---
title: Editor
page_title: TreeList - Editor Template
description: Use custom editor templates in treelist for Blazor.
slug: treelist-templates-editor
tags: telerik,blazor,treelist,templates,editor
published: True
position: 15
components: ["treelist"]
---

# Edit Template

The column's `EditTemplate` defines the inline template or component that will be rendered when the user is [editing](slug:treelist-overview#editing) the field. It is also used when inserting a new item.

You can data bind components in it to the current context, which is an instance of the model the treelist is bound to. You will need a global variable that is also an instance of the model to store those changes. The model the template receives is a copy of the original model, so that changes can be canceled (the `Cancel` command).

If you need to perform logic more complex than simple data binding, use the change event of the custom editor component to perform it. You can also consider using a custom edit form outside of the treelist.

The TreeList row creates an `EditContext` and passes it to the `EditorTemplate`. You can read more about it in the [Notes section of the Editing Overview](slug:gantt-tree-editing#notes) article).

@[template](/_contentTemplates/common/inputs.md#edit-debouncedelay)

>caption Using TreeList Editor Template

<demo metaUrl="client/treelist/templates/editor/example-1/" height="720"></demo>

, after Edit was clicked on the row with ID 4, and the user expanded the dropdown from the template
## See Also

* [TreeList Editing](slug:treelist-editing-overview)
* [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
* [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/custom-editor)

