---
title: Overview
page_title: Accessibility Overview
description: Accessibility features in the Telerik UI for Blazor suite.
slug: accessibility-overview
tags: telerik,blazor,accessibility,overview
published: True
position: 1
previous_url: /accessibility/keyboard-navigation,/accessibility/accessibility-swatch
---

# Blazor Accessibility Overview

Websites and applications are accessible when they provide full control over their features by enabling users with disabilities to access their content through assistive technologies or keyboard navigation.

Web content accessibility includes several aspects:

* WCAG, Section 508, and WAI-ARIA standards
* [Keyboard Navigation](#keyboard-navigation)
* [Color Contrast](#color-contrast)
* [Globalization]({%slug globalization-overview%})

## Section 508

## Web Context Accessibility Guidelines

## WAI-ARIA Standards

## Keyboard Navigation

Normally, users can use the keyboard only to focus and navigate to HTML links, buttons, and form inputs. Telerik UI for Blazor has gone to the next level and provides focusable and navigable components, even though they represent complex structures. Users can use the keyboard to invoke actions such as opening DropDownLists, sorting Grid columns, resizing Splitter panes, and so on.

The keyboard support follows the normal flow of the web page content. Use the `Tab` key to focus a component and then use specific keyboard shortcuts to trigger specific actions. For example, use the arrow keys to move across cells in the Grid or hit `Enter` to invoke a button click.

Most components represent a single tab stop. Once users reach and focus a component, they can leave it with a single `Tab` key press. If the component is more complex, users can walk through its inner elements with the arrow keys, for example, Grid cells, Menu items, Toolbar buttons. Some complex components can accommodate multiple other components. For example, the Grid can host a Toolbar and a Pager. In this case, tab to move the focus from one nested component to another.

### Types of Keyboard Support

The Telerik UI for Blazor components may provide enhanced, standard, or no keyboard support. See the [compliance table]({%slug accessibility-compliance%}#compliance-table) for component-specific information.

* *Standard keyboard support* implies similar keyboard navigation capabilities as standard HTML elements. For example, the Button components support `Enter` and `Space` for clicking them. All components with standard keyboard support are reachable through the `Tab` key and provide focus styles.
* *Enhanced keyboard support* builds on top of the standard key combinations and provides additional built-in shortcuts for improved flexibility and user experience.
* Components with no keyboard support may serve a purely visual purpose, or be containers with no available interaction.

### Right-to-Left Support

When using [right-to-left text direction]({%slug rtl-support%}), the keyboard shortcuts for the components remain unchanged. The left and right arrow keys reverse their behavior to be consistent with the RTL mode.

## Color Contrast

WCAG sections <a href="https://www.w3.org/TR/WCAG22/#contrast-minimum" target="_blank">1.4.3 Contrast (Minimum)</a> and <a href="https://www.w3.org/TR/WCAG22/#contrast-enhanced" target="_blank">1.4.6 Contrast (Enhanced)</a> define contrast ratios for accessibility compliance. The built-in [*Default Ocean Blue A11y* theme swatch](https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/#ocean-blue-accessibility-swatch) in Telerik UI for Blazor conforms to WCAG Level AA, except success criterion <a href="https://www.w3.org/TR/WCAG22/#non-text-contrast" target="_blank">1.4.11 Non-text Contrast</a> in the ColorPalette component.

You can [obtain and use the Default Ocean Blue A11y swatch]({%slug themes-overview%}#swatch) starting from the following component and theme versions:

* [Telerik UI for Blazor version 4.0.1](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-4-0-1)
* [Themes version 6.0.3](https://github.com/telerik/kendo-themes/releases/tag/v6.0.3). Check section [Theme Version Compatibility]({%slug themes-overview%}#compatibility-and-maintenance) on how to align Telerik UI for Blazor versions with theme versions.

## Next Steps

* [Review Telerik UI for Blazor Accessibility Compliance Table]({%slug accessibility-compliance%})
* [Download Telerik UI for Blazor Accessibility Conformance Report (ACR)]({%slug accessibility-compliance%}#accessibility-conformance-report)

## See Also

* [Default Ocean Blue Accessibility Swatch]({%slug accessibility-overview%}#color-contrast)
