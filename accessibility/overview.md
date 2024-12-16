---
title: Overview
page_title: Accessibility Overview
description: Accessibility features in the Telerik UI for Blazor suite.
slug: accessibility-overview
tags: telerik,blazor,accessibility,overview
published: True
position: 0
previous_url: /accessibility/keyboard-navigation,/accessibility/accessibility-swatch
---

# Blazor Accessibility Overview

Websites and applications are accessible when they provide full control over their features by enabling users with disabilities to access their content through assistive technologies or keyboard navigation.

Accessibility consists of several aspects:

* [WCAG, Section 508, and WAI-ARIA standards]({%slug accessibility-standards%})
* [Keyboard Navigation](#keyboard-navigation)
* [Color Contrast](#color-contrast)
* [Globalization]({%slug globalization-overview%})

## Section 508

## Web Context Accessibility Guidelines

## WAI-ARIA Standards

## Keyboard Navigation

The Telerik UI for Blazor components support keyboard navigation and the end users can use the keyboard to walk through them and invoke actions such as clicking buttons, paging the Grid, and so on.

Generally, to focus a component, use the `Tab` key as the keyboard support of the page follows the normal flow of the content. Once inside a component, you can use specific keyboard shortcuts to trigger specific actions such as using the `Arrow` keys to focus different cells in the Grid, or the `Enter` key to click a button.

Normally, users can use the keyboard to navigate only to HTML links, buttons, and form controls. The Telerik UI for Blazor library has gone to the next level and the components it delivers are focusable. In this way, even though the components represent complex structures, users can interact with them too.

The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, the focus has to follow the visual horizontal and vertical flow of the page. For example, left-to-right and top-to-bottom, header first followed by the main and, then, page navigation.

Most of the components in the library represent a single `Tab` stop. Once users reach and focus a component, they can leave it with a single tab. If the component is more complex, users can walk though its inside elements with the `Arrow` keys, for example, Grid cells, Menu items, Toolbar buttons. Some complex components can accommodate multiple other components. For example, the Grid can host a Toolbar and a Pager. In this case, you can tab to move the focus from one nested component to another.

### Types of Keyboard Support

The Telerik UI for Blazor components may provide enhanced, standard, or no keyboard support. See the [compliance table]({%slug accessibility-compliance%}) for component-specific information.

* *Standard keyboard support* implies similar keyboard navigation capabilities as standard HTML elements. For example, the Button components support `Enter` and `Space` for clicking them. All components with standard keyboard support are reachable through the `Tab` key and provide focus styles.
* *Enhanced keyboard support* builds on top of the standard key combinations and provides additional built-in shortcuts for improved flexibility and user experience.
* The components with no keyboard support serve a purely visualization purpose, are just content containers, provide no interaction, or provide only mouse and touch interaction by design.

### Right-to-Left Support

When the [right-to-left direction is enabled]({%slug rtl-support%}), the keyboard shortcuts for the components that support keyboard navigation remain unchanged except for the `Left arrow` and `Right arrow` keys—their functionality is reversed to follow the right-to-left direction.

## Color Contrast

WCAG sections [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum) and [1.4.6 Contrast (Enhanced)](https://www.w3.org/TR/WCAG21/#contrast-enhanced) define contrast ratios for accessibility compliance. The *Default Ocean Blue A11y* [theme swatch]({%slug themes-overview%}#basics) in Telerik UI for Blazor conforms to WCAG Level AA, which requires contrast ratios of at least:

* 4.5:1 for normal text
* 3:1 for large text

To preview the Default Ocean Blue A11y swatch, visit the [Telerik UI for Blazor live demos](https://demos.telerik.com/blazor-ui/grid/overview). Select the swatch from the **Change Theme** dropdown above any of the examples.

The Default Ocean Blue A11y swatch is built on top of the Default Ocean Blue swatch. The main difference is that the Ocean Blue A11y swatch has high-contrast focus indicators to comply with WCAG requirements.

### Using the Ocean Blue Accessibility Swatch

You can [obtain and use the Default Ocean Blue A11y swatch]({%slug themes-overview%}#swatch) starting from the following component and theme versions:

* [Telerik UI for Blazor version 4.0.1](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-4-0-1)
* [Themes version 6.0.3](https://github.com/telerik/kendo-themes/releases/tag/v6.0.3). Check section [Theme Version Compatibility]({%slug themes-overview%}#compatibility-and-maintenance) for more information about how to align Telerik UI for Blazor versions with theme versions.

> An existing limitation is that the ColorPalette component fails WCAG success criterion 1.4.11. "Non-text contrast for the focus indicator on its items".

## See Also

* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})
* [Default Ocean Blue Accessibility Swatch]({%slug accessibility-overview%}#color-contrast)
