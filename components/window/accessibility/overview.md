---
title: Accessibility Overview
page_title: Telerik UI for Blazor Window Documentation | Window Accessibility Overview
description: "Get started with the Telerik UI for Blazor Window and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,window
slug: window-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Window component is <a href="https://www.w3.org/TR/WCAG22" target="_blank">WCAG 2.2 AA</a> and <a href="https://www.section508.gov" target="_blank">Section 508</a> compliant. The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">WAI-ARIA best practices</a> for implementing the keyboard navigation for its component <a href="https://www.w3.org/TR/wai-aria/#roles" target="_blank">role</a>, and is tested against the popular screen readers.

# Blazor Window Accessibility Example

WCAG 2.2 introduces the <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" target="_blank">"Dragging Movements"</a> criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

The illustrative example below shows the window resize action, achievable through the [Dialog](slug:dialog-overview) and window position change through a button. Telerik UI for Blazor to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Window component](slug:window-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption Window accessibility compliance example

<demo metaUrl="client/window/accessibility/overview/example-1/" height="420"></demo>

## See also

 * [Live demo: Window Accessibility](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)
 * [Live demo: Window Overview](https://demos.telerik.com/blazor-ui/window/overview)
 * [Live demo: Blazor Accessibility Overview](https://docs.telerik.com/blazor-ui/accessibility/overview)