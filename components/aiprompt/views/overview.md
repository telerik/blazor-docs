---
title: Overview
page_title: AIPrompt - Views Overview
description: Views basics in the AIPrompt for Blazor.
slug: aiprompt-views-overview
tags: telerik,blazor,aiprompt,ai,prompt,view,overview
published: True
position: 0
components: ["aiprompt"]
---

# AIPrompt Views

The AIPrompt component provides three predefined views and also lets you create custom views. Through interaction with the component, the user can change the currently active view.

The available built-in views are:

* [Prompt View](slug:aiprompt-views-prompt)
* [Output View](slug:aiprompt-views-output)
* [Commands View](slug:aiprompt-views-commands)

## Parameters

The AIPrompt views provide various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `ButtonText` | `string` | The text rendered within the toolbar button associated with the view. |
| `ButtonIcon` | `object` | The [Telerik Font or SVG icon](slug:common-features-icons) rendered within the toolbar button associated with the view. |
| `ViewTemplate` | `RenderFragment` | The template controlling the rendering of the view's content. Read more in the [Templates](slug:aiprompt-views-templates#view-template) article. |
| `FooterTemplate` | `RenderFragment` | The template controlling the rendering of the view's footer. Read more in the [Templates](slug:aiprompt-views-templates#footer-template) article. |

By default, the AIPrompt will always render both the Prompt and the Output view. The Commands view will be rendered only if you pass a custom set of commands through the `Commands` parameter:


<demo metaUrl="client/aiprompt/views/example-2/" height="420"></demo>

>caption Using the `ButtonText` and `ButtonIcon` parameters to customize the appearance of the toolbar buttons


<demo metaUrl="client/aiprompt/views/toolbar-buttons-1/" height="420"></demo>

## See Also

* [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Prompt View](slug:aiprompt-views-prompt)
* [Output View](slug:aiprompt-views-output)
* [Commands View](slug:aiprompt-views-commands)
* [Views Templates](slug:aiprompt-views-templates)

