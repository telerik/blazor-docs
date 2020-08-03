---
title: Iframe
page_title: Editor - Iframe Edit Mode
description: Iframe Edit Mode in the Editor for Blazor.
slug: editor-edit-modes-iframe
tags: telerik,blazor,edit,mode,iframe
published: True
position: 5
---


# Editor Iframe Edit Mode

The Iframe mode is the default [edit mode]({%slug editor-edit-modes-overview%}) of the editor. It creates a separate `document` for editing, because the editable area is an `<iframe>` HTML element.

This has the following implications:

* Styles from the current page do not affect the editor content. 

    * This includes rules that would match elements and classes you have in the content, so the content may not look like it would look if it were rendered on the current page.
    * Such behavior can be useful when the final styles for the content will be rather specific and significantly different from the styles on the current page hosting the editor.

* The Editor adds some CSS rules to create a more pleasant editing experience - for example, it adds some border rules for `<table>` elements so your users can see them easily (by default tables don't have borders).

* You cannot add custom styling to the content.

* Since the `<iframe>` is a separate document, it is possible that screen readers will omit it or not read it fully.

## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Editor Toolbar]({%slug editor-toolbars%})

