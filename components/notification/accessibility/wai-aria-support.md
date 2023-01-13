---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Notification Documentation | Notification  Accessibility
description: "Get started with the Telerik UI for Blazor Notification and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: notification-wai-aria-support 
position: 50 
---

# Blazor Notification Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Notification component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-notification | `role=alert` | Notification element should be marked as an alert. |
|  | `aria-live=polite` | The aria-live value must be set to `polite`, so that it will not obscure other essential information while announced. |
|  | `aria-label` or `aria-labelledby` | The Notification needs an accessible name to be assigned to it. The label holds info about the type of the Notification (error, warning, info, etc.) |
|  | `aria-describedby=.k-notification-content id` | USed so that the content of the Notification will be announced by the assistive technologies. |
| .k-i-close | `aria-hidden=true` | The close button of the notification (if any) should not be present in the accessibility tree. |

## Resources

[WAI-ARIA spec: Role Alert](https://www.w3.org/TR/wai-aria-1.2/#alert)

[ARIA Practices: Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

## Section 508


The Notification is compliant with the [Section 508](http://www.section508.gov/) requirements

## Testing


The component has been extensively tested automatically with static code analyzers and manually with the most popular screen readers.

> Any Accessibility Issues could be reported in [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Notification Overview (Demo)](https://demos.telerik.com/blazor-ui/notification/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})