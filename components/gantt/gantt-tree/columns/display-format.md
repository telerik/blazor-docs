---
title: Display Format
page_title: Gantt Tree - Display Format
description: Use C# Format string to display values in the Gantt Tree for Blazor.
slug: gantt-columns-displayformat
tags: telerik,blazor,gantt,column,display,format
published: True
position: 2
components: ["gantt"]
---

# Column Display Format

@[template](/_contentTemplates/grid/common-link.md#display-format-basics)

## Example

>caption Use C# format strings in the Gantt Tree through the component markup

<demo metaUrl="client/gantt/display-format/example-1/" height="740"></demo>

## Notes

* `Numeric`, `DateTime` and Enum types can use such formats. String and Boolean types are displayed without such a format, however.

* The `CurrentInfo.CurrentCulture` is used when rendering the formats, so if you need specific formats for specific users, you must set the culture of the app accordingly.
