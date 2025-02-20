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

Web applications are accessible when they provide control over their features to users with physical or situational disabilities. These disabilities can include various categories, for example, user who are:

* Unable to perceive content visually or auditory.
* Unable to use a mouse or a keyboard for any reason.
* Consuming electronic content through assistive technologies.

>tip Accessibility compliance is a strategic and ongoing commitment for Telerik UI for Blazor.

## Legal and Technical Compliance

Accessibility compliance can be considered from a legal and technical perspective, but these ultimately merge. <a href="https://www.w3.org/WAI/policies/" target="_blank">Different countries have different regulations about web content accessibility compliance</a>, for example:

* Section 508 of the US Rehabilitation Act
* The EU European Accessibility Act

The national regulations normally share the following characteristics:

* The legal requirements boil down to common technical standards such as a specific version of [WCAG](#web-context-accessibility-guidelines).
* The national legislations are slower to adopt newer accessibility standards, compared to Telerik UI for Blazor.

As a result, Telerik UI for Blazor does not review or aim to comply with specific national accessibility legislations. The components [target compliance with the latest official standard WCAG 2.2](slug:accessibility-compliance#compliance-table), which is enough to claim compliance with national legal requirements.

From technical point of view, Telerik UI for Blazor achieves accessibility through the following features:

* [Compliance with WCAG success criteria](#web-context-accessibility-guidelines)
* [WAI-ARIA attributes](#wai-aria)
* [Keyboard navigation](#keyboard-navigation)
* [Color contrast](#color-contrast)
* [Best practices in component development and testing](#development-practices)

## Web Context Accessibility Guidelines

<a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">Web Context Accessibility Guidelines (WCAG)</a> is an international standard that specifies how to make web content more accessible to people with disabilities. The guidelines are organized under <a href="https://www.w3.org/WAI/WCAG22/Understanding/intro#understanding-the-four-principles-of-accessibility" target="_blank">four principles: perceivable, operable, understandable, and robust</a>.

Telerik UI for Blazor targets <a href="https://www.w3.org/TR/WCAG22/" target="_blank">WCAG version 2.2</a>.

## WAI-ARIA

<a href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank">WAI-ARIA</a> provides a framework for adding HTML attributes to identify features for user interaction, how they relate to each other, and their current state. The WAI-ARIA standard defines HTML element roles and states, which help with dynamic content and advanced user interface controls.

Telerik UI for Blazor targets <a href="https://www.w3.org/TR/wai-aria/" target="_blank">WAI-ARIA version 1.2</a>. The [Compliance Table](slug:accessibility-compliance#compliance-table) provides links to documentation articles, which describe the WAI-ARIA attributes of each applicable component.

## Keyboard Navigation

Normally, users can use the keyboard only to focus and navigate to HTML links, buttons, and form inputs. Telerik UI for Blazor has gone to the next level and provides focusable and navigable components, even though they represent complex structures. Users can use the keyboard to invoke actions such as opening DropDownLists, sorting Grid columns, resizing Splitter panes, and so on. <a href="https://www.w3.org/WAI/WCAG22/quickref/#keyboard-accessible" target="_blank">Keyboard accessibility is part of WCAG</a>.

The keyboard support follows the normal flow of the web page content. Use the `Tab` key to focus a component and then use specific keyboard shortcuts to trigger specific actions. For example, use the arrow keys to move across cells in the Grid or hit `Enter` to invoke a button click.

Most components represent a single tab stop. Once users reach and focus a component, they can leave it with a single `Tab` key press. If the component is more complex, users can walk through its inner elements with the arrow keys, for example, Grid cells, Menu items, Toolbar buttons. Some complex components can accommodate multiple other components. For example, the Grid can host a Toolbar and a Pager. In this case, tab to move the focus from one nested component to another.

### Types of Keyboard Support

The Telerik UI for Blazor components may provide enhanced, standard, or no keyboard support. See the [compliance table](slug:accessibility-compliance#compliance-table) for component-specific information.

* *Standard keyboard support* implies similar keyboard navigation capabilities as standard HTML elements. For example, the Button components support `Enter` and `Space` for triggering clicks. All components with standard keyboard support are reachable through the `Tab` key and provide focus styles.
* *Enhanced keyboard support* builds on top of the standard key combinations and provides additional built-in shortcuts for improved flexibility and user experience.
* Components with no keyboard support may serve a purely visual purpose, or be containers with no available interaction.

### Right-to-Left Support

When using [right-to-left text direction](slug:rtl-support), the keyboard shortcuts for the components remain unchanged. The left and right arrow keys reverse their behavior to be consistent with the RTL mode.

## Color Contrast

WCAG sections <a href="https://www.w3.org/TR/WCAG22/#contrast-minimum" target="_blank">1.4.3 Contrast (Minimum)</a> and <a href="https://www.w3.org/TR/WCAG22/#contrast-enhanced" target="_blank">1.4.6 Contrast (Enhanced)</a> define contrast ratios for accessibility compliance. The built-in [*Default Ocean Blue A11y* theme swatch](https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/#ocean-blue-accessibility-swatch) in Telerik UI for Blazor conforms to WCAG Level AA, except success criterion <a href="https://www.w3.org/TR/WCAG22/#non-text-contrast" target="_blank">1.4.11 Non-text Contrast</a> in the ColorPalette component.

You can [obtain and use the Default Ocean Blue A11y swatch](slug:themes-overview#what-is-a-swatch) starting from the following component and theme versions:

* [Telerik UI for Blazor version 4.0.1](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-4-0-1)
* [Themes version 6.0.3](https://github.com/telerik/kendo-themes/releases/tag/v6.0.3). Check section [Theme Version Compatibility](slug:themes-overview#compatibility-and-maintenance) on how to align Telerik UI for Blazor versions with theme versions.

## Development Practices

When implementing a Telerik Blazor component, the team:

* Benefits from the know-how of dedicated accessibility professionals at Progress Software.
* Follows the WCAG standard and WAI-ARIA specification to lay the right foundation for the component accessibility.
* Implements automated unit tests to guarantee accessible and semantically correct rendering.
* Localizes messages for labels, titles, and other elements.
* Manually tests the component with regard to its keyboard navigation and usage with screen readers.

### Screen Readers

There are a lot of existing screen readers, for example:

* Apple VoiceOver
* JAWS
* Microsoft Narrator
* NVDA
* and many others

Each of them provides a different level of interoperability with the different web browsers, and some combinations may handle dynamic web content more effectively. Telerik UI for Blazor aims to comply with official accessibility standards and is not able to provide built-in fixes for missing features or non-standard behaviors in assistive technologies.

Telerik UI for Blazor components are tested in the following environments:

| Browser | Screen Reader |
| --- | --- |
| Chrome | JAWS |
| Microsoft Edge | JAWS |
| Firefox | NVDA |

## Next Steps

* [Review Telerik UI for Blazor Accessibility Compliance Table](slug:accessibility-compliance#compliance-table)
* [Download Telerik UI for Blazor Accessibility Conformance Report (ACR)](slug:accessibility-compliance#accessibility-conformance-report)
