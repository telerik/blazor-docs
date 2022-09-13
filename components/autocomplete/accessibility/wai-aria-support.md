---
title: Wai-Aria Support
page_title: Telerik UI for Blazor AutoComplete Documentation | AutoComplete  Accessibility
description: "Get started with the Telerik UI for Blazor AutoComplete and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: autocomplete-wai-aria-support 
position: 50 
---

# Blazor AutoComplete Accessibility



The Telerik UI for Blazor AutoComplete component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### AutoComplete wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=combobox` | Announces the presence of a autocomplete as inner element of the autocomplete used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the component has a listbox Popup. |
|  | `aria-expanded=true/false` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the `listbox`. |
|  | `aria-activedescendent=.k-list-item id` | Points to the focused item in the popup. The focused item is changed via keyboard navigation. If the popup is not visible, the attribute should not point to any element or should be removed. |
|  | `aria-autocomplete=list` | Attribute is rendered and value is set to list when **filtering** feature is enabled. |
|  | `aria-autocomplete=both` | Attribute is rendered and value is set to both when both **filtering** and **suggest** features are enabled. |
|  | `aria-autocomplete=inline` | Attribute is rendered and value is set to only **suggest** feature is enabled. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the autocomplete is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the autocomplete is in form and announces the valid state of the component. |
|  | `aria-busy=true` | Attribute is rendered only when the autocomplete is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the autocomplete is disabled. |

### ListBox Popup


The Popup element of the component should implement the specification for a **PopuList** component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-animation-container | `role=region` | When the component container is appended to the `<body>` element of the document, it needs a landmark role to be assigned to it. Otherwise, it should be appended to an element with an appropriate landmark role. |
|  | `aria-label` or `aria-labelledby` | Provides a label when the container has a `region` role assigned. |
| .k-list-ul | `role=listbox` | Identifies the ul element as a listbox. |
|  | `aria-label` or `aria-labelledby` |  Provides a label for the listbox of the combobox. |
| .k-list-item | `role=option` | Identifies the li element as a listbox option. |
| .k-list-item.k-selected | `aria-selected=true` | Indicates the selected state of the item. |

## Resources

[ARIA practices: Editable Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html)

[ARIA Practices: Editable Combobox With List Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)

## Section 508


The AutoComplete is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor AutoComplete Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})