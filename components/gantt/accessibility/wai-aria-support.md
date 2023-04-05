---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Gantt Documentation - Gantt  Accessibility
description: "Get started with the Telerik UI for Blazor Gantt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: gantt-wai-aria-support
position: 50
---

# Blazor Gantt Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Gantt component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The Gantt component is a composite component that is used to represent project planning.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-gantt | `role=application` | Indicates the Gantt's role as an application. |


The Gantt component integrates the toolbar component and follows its wai-aria support.

[toolbar accessibility specification]({{toolbar_a11y_link}})


The main inner component in the Gantt is the TreeList.

[treelist accessibility specification]({{treelist_a11y_link}})


Another part of the component is the Splitter component and Wai-Aria support.

[splitter accessibility specification]({{splitter_a11y_link}})


The following Wai-Aria support is implemented in the TimeLine of the Gantt.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-gantt-timeline .k-grid-content | `role=tree` | Associates the role of the timeline as a tree. |
| .k-gantt-timeline .k-gantt-rows | `role=presentation` | Used to build the accessibility tree. |
| .k-gantt-timeline .k-gantt-columns | `role=presentation` | Used to build the accessibility tree. |
| .k-gantt-timeline .k-gantt-tasks | `role=presentation` | Used to build the accessibility tasks. |
| .k-gantt-timeline .k-task | `role=treeitem` | Associates the role of the timeline task as a tree item. |
|  | `aria-level` | Specifies the level of the task. |
|  | `aria-describedby=.k-tooltip id` | Gives more details for the task through its tooltip. |
| .k-gantt-timeline .k-task .k-task-complete | `aria-hidden=true` | Hides the status element from the task. |
| .k-gantt-timeline .k-task .k-task-actions | `aria-hidden=true` | Hides the actions element from the task. |

## Section 508


The Gantt is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Gantt Overview (Demo)](https://demos.telerik.com/blazor-ui/gantt/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
