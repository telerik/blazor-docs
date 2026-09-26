---
title: Data Binding
page_title: Gantt Dependencies - Data Binding
description: Data Binding in the Gantt Dependencies.
slug: gantt-dependencies-databind
tags: telerik,blazor,gantt,chart,dependency,databind,data,databound
published: True
position: 5
previous_url: /components/gantt/dependencies/types
components: ["gantt"]
---

# Dependencies Data Binding

To bind a collection of dependencies to the Gantt Chart you should use the `Data` parameter, available for the `GanttDependencies` tag. This article explains how to use the data binding schema for the Gantt Dependencies.

## Gantt Dependencies Features:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Feature | Type | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<object>` | The collection of dependencies. |
| `IdField` | `string` | Unique identifier for each task. Use it for editing and hierarchy. |
| `PredecessorField` | `string` | Points to the predecessor task. |
| `SuccessorField` | `string` | Points to the successor task. |
| `TypeField` | `GanttDependencyType` enum | Points to the dependency type, which is the relationship between the two affected tasks. The supported values include `FinishFinish`, `FinishStart`, `StartStart`, and `StartFinish`. |

>note To use the Data Binding for the Gantt Dependencies you must provide all data binding features listed above.

### Provide a collection of dependencies to the Gantt Chart

<demo metaUrl="client/gantt/databind/example-1/" height="740"></demo>

## Next Steps

* [Explore Gantt dependency editing](slug:gantt-dependencies-editing)
