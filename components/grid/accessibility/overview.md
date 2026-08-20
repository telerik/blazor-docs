---
title: Accessibility Overview
page_title: Telerik UI for Blazor Grid Documentation | Grid Accessibility Overview
description: "Get started with the Telerik UI for Blazor Grid and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,grid
slug: grid-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Grid component is [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22) and [Section 508](https://www.section508.gov) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component [role](https://www.w3.org/TR/wai-aria/#roles), and is tested against the popular screen readers.

# Blazor Grid Accessibility Example

WCAG 2.2 introduces the ["Dragging Movements"](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

In our illustrative example below, we've showcased the grouping and column reorder actions, both achievable through our Column Menu functionality. We've demonstrated also the row reordering achievable through our [Context Menu](slug:contextmenu-integration#context-menu-for-a-grid-row). Our goal is to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Grid component](slug:grid-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption Grid accessibility compliance example

<demo metaUrl="client/grid/accessibility/"></demo>

## See also

 * [Live demo: Grid Accessibility](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)
 * [Blazor Grid](slug:grid-overview)