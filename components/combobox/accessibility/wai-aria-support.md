---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ComboBox Documentation | ComboBox Accessibility
description: "Get started with the Telerik UI for Blazor ComboBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: combobox-wai-aria-support 
position: 50 
---

# Blazor ComboBox Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ComboBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ComboBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### ComboBox Wrapping Element


The following table summarizes the selectors and attributes supported by the ComboBox wrapper element:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | Announces the presence of a combobox as an inner element of the combobox used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates that the component has a listbox popup. |
|  | `aria-expanded=true/false` | Announces the visibility state of the popup. |
|  | `aria-controls=[role='listbox'] id` | Points to the listbox element. Signifies that the `combobox` controls the `listbox` element. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item in the popup. The focused item is changed through keyboard navigation. If the popup is not visible, the attribute must not point to any element or must be removed. |
|  | `aria-autocomplete=list` | When filtering is enabled, the attribute is rendered and the value is set to `list`. |
|  | `aria-autocomplete=both` | When both the filtering and the suggest featutres are enabled, the attribute is rendered and the value is set to `both`. |
|  | `aria-autocomplete=inline` | When the suggest feature is enabled, the attribute is rendered and the value is set to `inline`. |
|  | `readonly=readonly` or `aria-readonly=true` | The attribute is rendered only when the ComboBox is read-only. |
|  | `aria-busy=true` | The attribute is rendered only when the ComboBox is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | The attribute is rendered only when the ComboBox is in a form, and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the ComboBox is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have the `role="button"` assigned. |
|  | `aria-label` | The button element must have discernible text. |
|  | `tabindex=-1` | The button element must not be focusable. |
| `.k-combobox.k-disabled .k-button` | `disabled` or `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |

### Popup Listbox


The popup element of the ComboBox has to implement the WAI-ARIA specification for a Popup List component. The following table summarizes the selectors and attributes supported by the listbox popup of the ComboBox:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-animation-container` | `role=region` | When the component container is appended to the `<body>` element of the document, it requires you to assing a `landmark` role to it. Otherwise, append it to an element with an appropriate `landmark` role. |
|  | `aria-label` or `aria-labelledby` | When the container has a `region` role assigned, povides a label. |
| `.k-list .k-no-data` | `aria-live=polite` | Identifies the element as a live region in the `polite` state, meaning assistive technology users are informed about changes to the region at the next available opportunity. |
| `.k-list-item-icon-wrapper` | `role=presentation` | Indicates that the icon wrapper is decorative and should be ignored by assistive technologies. |
| `.k-list-item-icon` | `aria-hidden=true` | Ensures that the icon itself is hidden from assistive technologies since it is decorative. |
| `.k-list-item.k-selected` | `aria-selected=true` | Indicates the selected state of the item. |
| `.k-list-content` | `role=listbox` | When data is grouped, role is listbox. |
|  | `aria-multiselectable=true` | Signifies that the grouped list allows multiple selection. |
| `.k-list-ul` | `role=listbox/group` | When data is grouped, role is group, otherwise - listbox. |
|  | `aria-multiselectable=true` | Signifies that the list allows multiple selection. |
|  | `aria-labelledby=id of group header` | References the id of the group header element that labels this group. |
| `.k-list-group-item` | `role=presentation` | The group header has role='presentation' since the grouping semantics are provided by the ul[role=group]. |
|  | `id` | Provides an id for the group header that is referenced by the group's aria-labelledby attribute. |
| `.k-list-ul .k-list-item` | `role=option` | Items within a group maintain the option role. |

### Adaptive Mode


When the component is in adaptive mode, the popup element follows the specifications of the ActionSheet component.

[ActionSheet accessibility specification]({{actionsheet_a11y_link}})

## Resources

[WAI-ARIA Authoring Practices: Editable Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html)

[WAI-ARIA Authoring Practices: Editable Combobox With List Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)

## Section 508


The ComboBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ComboBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ComboBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the ComboBox keyboard navigation works, refer to the [Blazor ComboBox Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)