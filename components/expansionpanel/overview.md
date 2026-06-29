---
title: Overview
page_title: ExpansionPanel Overview
description: Learn the basics of the Telerik ExpansionPanel component for Blazor. See an overview of the component features and functionality.
slug: expansionpanel-overview
tags: blazor,expansionpanel
components: ["expansionpanel"]
published: True
position: 0
---

# Blazor ExpansionPanel Overview

The [Telerik ExpansionPanel component for Blazor](https://www.telerik.com/blazor-ui/expansionpanel)

## Comparison with PanelBar

The ExpansionPanel and [PanelBar](slug:panelbar-overview) are similar and interchangeable in some aspects. The major differences between the two components are:

@[template](/_contentTemplates/expansionpanel/notes.md#comparison-with-panelbar)

## Creating Blazor ExpansionPanel

1. Add a `<TelerikExpansionPanel>` tag to your Razor file.
1. Set the `Expanded` parameter to a boolean value. If users will be able to toggle the component, use two-way binding or the [ExpansionPanel `ExpandedChanged` event](slug:expansionpanel-events#expandedchanged).
1. Set the `Title` parameter.
1. (optional) Set the `SubTitle` parameter to a label that will appear next to the expand/collapse arrow.
1. (optional) If you need to programmatically expand or collapse the ExpansionPanel, use the [component methods](#expansionpanel-api). Updating the `Expanded` parameter also works, but without animations.

````RAZOR
<TelerikExpansionPanel @bind-Expanded="@ExpansionPanelExpanded"
                       SubTitle="Sub Title"
                       Title="Expansion Panel Title">
    <Content>
        Expansion Panel Content
    </Content>
</TelerikExpansionPanel>

@code {
    private bool ExpansionPanelExpanded { get; set; }
}
````

## Icons

The ExpansionPanel uses [`ChevronDown` and `ChevronUp` icons](slug:common-features-icons) in the header to communicate its current state and hint the users that they can expand and collapse the component. You can customize the icons with the ExpansionPanel `CollapseIcon` and `ExpandIcon` parameters.

````RAZOR
<TelerikExpansionPanel CollapseIcon="@SvgIcon.ArrowUp"
                       ExpandIcon="@SvgIcon.ArrowDown"
                       @bind-Expanded="@ExpansionPanelExpanded"
                       Title="Expansion Panel Title">
    <Content>
        ExpansionPanel Content
    </Content>
</TelerikExpansionPanel>

@code {
    private bool ExpansionPanelExpanded { get; set; }
}
````

## User Interaction

The ExpansionPanel provides two parameters that affect the users' ability to interact with the component:

* `Toggleable`&mdash;If set to `false`, users are not be able to expand and collapse the component. Only the app can do that through the [component methods](#expansionpanel-api).
* `Enabled`&mdash;Similar to `Toggleable`, but when `false`, the component applies additional styling to hint users that it's disabled.

## Templates

The [ExpansionPanel templates](slug:expansionpanel-templates) allow you to customize the component rendering. For example, you can use rich content and child components instead of the default plain text title and subtitle.

## Events

The [ExpansionPanel exposes events](slug:expansionpanel-events) that enable the app to detect and react to user actions.

## ExpansionPanel API

Consult the [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.TelerikExpansionPanel) to see all available component parameters, methods, and events.

Use `@ref` to add a reference to the component instance and use the ExpansionPanel methods. The earliest possible time to use Blazor component references is in `OnAfterRender` or `OnAfterRenderAsync`.

The ExpansionPanel methods `ExpandAsync`, `CollapseAsync`, and `ToggleAsync` provide the following benefits:

* The app can expand and collapse the ExpansionPanel programmatically even if the `Toggleable` parameter is set to `false`.
* When using the methods, the ExpansionPanel changes its state with an animation. When only updating the `Expanded` parameter value, there is no animation.

>caption Using ExpansionPanel methods

````RAZOR.skip-repl
<TelerikButton OnClick="@OnExpandButtonClick">Expand</TelerikButton>
<TelerikButton OnClick="@OnCollapseButtonClick">Collapse</TelerikButton>
<TelerikButton OnClick="@OnToggleButtonClick">Toggle</TelerikButton>

<TelerikExpansionPanel @ref="ExpansionPanelRef"
                       @bind-Expanded="@ExpansionPanelExpanded"
                       Title="Expansion Panel Title"
                       Toggleable="false">
    <Content>
        Expansion Panel Content
    </Content>
</TelerikExpansionPanel>

@code {
    private TelerikExpansionPanel? ExpansionPanelRef;

    private bool ExpansionPanelExpanded { get; set; }

    private async Task OnExpandButtonClick()
    {
        await ExpansionPanelRef!.ExpandAsync();
    }

    private async Task OnCollapseButtonClick()
    {
        await ExpansionPanelRef!.CollapseAsync();
    }

    private async Task OnToggleButtonClick()
    {
        await ExpansionPanelRef!.ToggleAsync();
    }
}
````

## Next Steps

* [Handle ExpansionPanel Events](slug:expansionpanel-events)

## See Also

* [ExpansionPanel Live Demos](https://demos.telerik.com/blazor-ui/expansionpanel/overview)
* [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.TelerikExpansionPanel)
