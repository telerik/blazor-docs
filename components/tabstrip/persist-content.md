---
title: Persist Content
page_title: TabStrip Persist Content
description: Persist Content of the TabStrip for Blazor.
slug: tabstrip-persist-content
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 30
components: ["tabstrip"]
---

# TabStrip Persist Content

The TabStrip always renders the content of a Tab when this Tab becomes active. Once the Tab is deactivated, its content is disposed and re-initialized again when the user selects the corresponding Tab later.

To keep Tab content in the DOM after the Tab is deactivated, set the `PersistContent` boolean parameter of the TabStrip to `true`. In this way the inactive TabStrip content will be hidden with CSS. This is useful when tab content includes stateful components, such as forms or text inputs, where you want to preserve the state across tab switches without the need to use additional parameters or a custom app state service.

>caption Persist the TabStrip content

<demo metaUrl="client/tabstrip/persist-content/example-1/" height="580"></demo>

## Next Steps

* [Reorder and pin tabs](slug:tabstrip-reordering-pinning)
* [Customize TabStrip UI with templates](slug:tabstrip-templates)
* [Change the number of tabs at runtime](slug:tabstrip-dynamic-tabs)
* [Manage TabStrip state](slug:tabstrip-state)
* [Handle TabStrip events](slug:tabstrip-events)

## See Also

* [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)
* [Render All TabStrip Tabs Initially](slug:tabstrip-kb-load-all-tabs)
