---
title: Accessibility Overview
page_title: Telerik UI for Blazor Grid Documentation | Grid Accessibility Overview
description: "Learn how the Telerik UI for Blazor Grid supports WCAG 2.2, Section 508, and WAI-ARIA accessibility requirements."
tags: telerik,blazor,accessibility,wai-aria,wcag,grid
slug: grid-accessibility-overview
position: 0
---

# Grid Accessibility Overview

The Telerik UI for Blazor Grid meets the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22) and [Section 508](https://www.section508.gov) requirements. It follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA) Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for keyboard navigation and component [roles](https://www.w3.org/TR/wai-aria/#roles). The Grid is also tested with popular screen readers.

## Blazor Grid Accessibility Example

WCAG 2.2 introduces the [Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) criterion as part of the Operable principle. It requires features that rely on drag actions to provide an alternative method that users can complete with a single click.

The example demonstrates grouping and column reordering through the **Column Menu**. It also demonstrates row reordering through the **[Context Menu](slug:contextmenu-integration#context-menu-for-a-grid-row)**. These interactions can be triggered programmatically or externally to support different accessibility requirements.

The following example demonstrates the [Grid accessibility compliance](slug:grid-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption Grid accessibility compliance example

<demo metaUrl="client/grid/accessibility/" height="650"></demo>

## See Also

 * [Live demo: Grid Accessibility](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)
 * [Blazor Grid](slug:grid-overview)