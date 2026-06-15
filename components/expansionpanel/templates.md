---
title: Templates
page_title: ExpansionPanel Templates
description: Learn how to use rich content templates in the Telerik ExpansionPanel component for Blazor, also known as a Kanban Board. See how to customize the card content, column headers, and edit form.
slug: expansionpanel-templates
tags: blazor,expansionpanel
components: ["expansionpanel"]
published: True
position: 50
---

# ExpansionPanel Templates

The Telerik ExpansionPanel component for Blazor exposes templates for more flexible content customization. This article lists the available templates and describes how to use them.

* [`HeaderTemplate`](#cardbodytemplate)
* [`SubHeaderTemplate`](#cardtemplate)

## HeaderTemplate

Do not use `Title` and `HeaderTemplate` at the same time. If the app defines both, the ExpansionPanel will use the `HeaderTemplate`.

>caption Using ExpansionPanel Header

````RAZOR.skip-repl
<TelerikExpansionPanel>
    <HeaderTemplate>
        Expansion Panel Header Template
    </HeaderTemplate>
</TelerikTaskBoard>
````

Also see the [runnable example below](#example).

## SubHeaderTemplate

Do not use `SubTitle` and `SubHeaderTemplate` at the same time. If the app defines both, the ExpansionPanel will use the `SubHeaderTemplate`.

>caption Using ExpansionPanel Header

````RAZOR.skip-repl
<TelerikExpansionPanel>
    <SubHeaderTemplate>
        Expansion Panel SubHeader Template
    </SubHeaderTemplate>
</TelerikTaskBoard>
````

## Example

>caption Using ExpansionPanel templates

````RAZOR

````

## Next Steps

* [Handle ExpansionPanel events](slug:expansionpanel-events)

## See Also

* [Live Demo: ExpansionPanel](https://demos.telerik.com/blazor-ui/expansionpanel/overview)
* [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.ExpansionPanel)
