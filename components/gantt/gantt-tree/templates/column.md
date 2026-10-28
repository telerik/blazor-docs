---
title: Column (Cell)
page_title: Gantt Tree - Column (Cell) Template
description: Use custom column and cell templates in Gantt Tree for Blazor.
slug: gantt-templates-column
published: True
position: 5
components: ["gantt"]
---

# Column Template

By default, the Gantt Tree renders the value of the field in the column, as it is provided from the data source. You can change this behavior by using the `Template` of the column and add you own content or logic to make a string out of the object.

The example below shows how to:

* add the `Template` (make sure to use the capital `T`)
* access the context of the model item so you employ your own logic
* render a field from the model

>caption Using cell (column) Template

<demo metaUrl="client/gantt/column/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)
