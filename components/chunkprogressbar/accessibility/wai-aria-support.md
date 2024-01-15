---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ChunkProgressBar Documentation | ChunkProgressBar Accessibility
description: "Get started with the Telerik UI for Blazor ChunkProgressBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: chunkprogressbar-wai-aria-support 
position: 50 
---

# Blazor ChunkProgressBar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ChunkProgressBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ChunkProgressBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The ChunkProgressBar follows the specification for the ProgressBar component.

[ProgressBar accessibility specification]({{progressbar_a11y_link}})

## Resources

[WAI-ARIA specification for progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

[MDN reference for the progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role#associated_wai-aria_roles_states_and_properties)

## Section 508


The ChunkProgressBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ChunkProgressBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ChunkProgressBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor ChunkProgressBar Overview (Demo)](https://demos.telerik.com/blazor-ui/chunkprogressbar/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})