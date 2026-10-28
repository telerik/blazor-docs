---
title: Editor
page_title: Gantt Tree - Editor Template
description: Use custom editor templates in Gantt Tree for Blazor.
slug: gantt-templates-editor
published: True
position: 15
components: ["gantt"]
---

# Editor Template

The column's `EditorTemplate` defines the inline template or component that will be rendered when the user is [editing](slug:gantt-tree-editing) the field. It is also used when inserting a new item. The template receives a copy of the model, so that changes can be canceled with the `Cancel` command.

In the Editor Template, you can data bind components to the current context, which is an instance to the model the Gantt is bound to.

@[template](/_contentTemplates/common/inputs.md#edit-debouncedelay)

>caption Using Gantt Editor Template

<demo metaUrl="client/gantt/editor/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)