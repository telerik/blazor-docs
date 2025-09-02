---
title: Wai-Aria Support
page_title: Telerik UI for Blazor AIPrompt Documentation | AIPrompt Accessibility
description: "Get started with the Telerik UI for Blazor AIPrompt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: aiprompt-wai-aria-support 
position: 50 
---

# Blazor AIPrompt Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor AI Prompt provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The AI Prompt is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### AI Prompt


The AI Prompt component is a composite one and integrates the accessibility of the Toolbar, TextArea, Card, Chip and FloatingActionButton.

### TextArea Component

[TextArea accessibility specification]({{textarea_a11y_link}})

### TextArea Adornments

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-textarea-prefix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-textarea-suffix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-textarea-suffix>.k-prompt-send.k-disabled` | `aria-disabled=true` | Announces send action as disabled if necessary. |

### Suggestion Component


The Suggestion list implements roving tabindex navigation. Meaning that only one suggestion has tabindex=0. The display of the suggestion list is controlled by the expand button.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-expander .k-button` | `aria-controls=.k-prompt-expander-content id` | Points to the controlled element based on the given `id`. |
|  | `aria-expanded=true/false` | Indicates the expanded state of the prompt expander content. |
| `.k-prompt-expander .k-suggestion-group` | `role=group` | Indicates that the suggestion container element is a group. |
| `.k-prompt-expander .k-suggestion` | `role=button` | Indicates that the suggestion element is a button. |
|  | `aria-label` or `title` | The suggestion elements must be properly labelled. |
|  | `tabindex=0` | The suggestion element should be focusable. |

### Button Component

[Button accessibility specification]({{button_a11y_link}})

### Adaptive Mode


When the AI Prompt component is in adaptive mode, the popup element follows the specifications of the ActionSheet component.

[ActionSheet accessibility specification]({{actionsheet_a11y_link}})

### Toolbar Component

[ToolBar accessibility specification]({{toolbar_a11y_link}})

### Card List Container

[CardList accessibility specification]({{cardlist_a11y_link}})

### Card Component

[Card accessibility specification]({{card_a11y_link}})

### Chip Component

[Chip accessibility specification]({{chip_a11y_link}})

### ChipList Component

[ChipList accessibility specification]({{chiplist_a11y_link}})

### ContextMenu Component

[ContextMenu accessibility specification]({{contextmenu_a11y_link}})

### FloatingActionButton Component

[FloatingActionButton accessibility specification]({{floatingactionbutton_a11y_link}})

### SpeechToTextButton Component

[SpeechToTextButton accessibility specification]({{speechtotextbutton_a11y_link}})

### More Actions View - PanelBar Component

[PanelBar accessibility specification]({{panelbar_a11y_link}})

## Section 508


The AI Prompt is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The AI Prompt has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The AI Prompt has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug:accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor AIPrompt Demos](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)