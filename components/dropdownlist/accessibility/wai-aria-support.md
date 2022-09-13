---
title: Wai-Aria Support
page_title: Telerik UI for Blazor DropDownList Documentation | DropDownList  Accessibility
description: "Get started with the Telerik UI for Blazor DropDownList and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: dropdownlist-wai-aria-support 
position: 50 
---

# Blazor DropDownList Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor DropDownList component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### DropDownList wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-dropdownlist | `role=combobox` | Announces the button dropdown element. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the presence of a listbox popup. |
|  | `aria-expanded=true/false` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-list-ul id` | Points to the popup element. Signifies that the `combobox` element controls the `listbox`. |
|  | `aria-describedby=.k-input-inner id` | Announces the selected value of the dropdown. |
|  | `aria-activedescendent=.k-list-item id` | Points to the focused item in the popup. The focused item is changed via keyboard navigation. If the popup is not visible, the attribute should not point to any element or should be removed. |
|  | `aria-readonly=true` | Attribute is rendered only when the dropdown is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the dropdown is in form and announces the valid state of the component. |
|  | `aria-busy=true` | Attribute is rendered only when the dropdown is loading data. |
|  | `tabindex=0` | The element should be focusable. |
| .k-dropdownlist.k-disabled | `aria-disabled=true` | Attribute is rendered only when the dropdown is disabled. |
| .k-input-button | `role=button` or `nodeName=button` | The element should either be a `<button>` element or should have `role="button"` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element should not be focusable. |

### Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-list-filter>.k-searchbox>.k-input-inner | `role=searchbox` | Announces the searchbox capability of the input. |
|  | `aria-label` | Points to search label. |
|  | `aria-activedescendent=.k-list-item.k-selected id` | Points to the focused item. Either an item from the popup. |
|  | `aria-autocomplete=list` | Indicates the list filtering capabilities of the select. |
|  | `aria-controls=.k-list-ul id` | Points to the popup element. Builds relationship between the input and the popup. |
|  | `aria-haspopup=listbox` | Indicates the presence of a listbox popup. |
| .k-list-ul | `aria-live=polite/off` | Assures the live updates on the selected value of the popup. |


The ListBox placed in the Popup element of the component should implement the specification for a **PopuList** component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-animation-container | `role=region` | When the component container is appended to the `<body>` element of the document, it needs a landmark role to be assigned to it. Otherwise, it should be appended to an element with an appropriate landmark role. |
|  | `aria-label` or `aria-labelledby` | Provides a label when the container has a `region` role assigned. |
| .k-list-ul | `role=listbox` | Identifies the ul element as a listbox. |
|  | `aria-label` or `aria-labelledby` |  Provides a label for the listbox of the combobox. |
| .k-list-item | `role=option` | Identifies the li element as a listbox option. |
| .k-list-item.k-selected | `aria-selected=true` | Indicates the selected state of the item. |

## Resources

[ARIA practices: Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html)

## Section 508


The DropDownList is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor DropDownList Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})