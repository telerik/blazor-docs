---
title: Collapse Modes
page_title: Breadcrumb Collapse Modes
description: Collapse Modes of the Breadcrumb for Blazor.
slug: breadcrumb-collapse-modes
tags: telerik,blazor,breadcrumb,collapse,modes
published: True
position: 20
---


# Breadcrumb Collapse Modes

You can specify how the Breadcrumb items are visualized when their total width is larger than the width of the component through the `CollapseMode` parameter the Breadcrumb exposes. It takes a member of the `BreadcrumbCollapseMode` enum and provides the following options:

* `Auto` (the default) - Items are automatically collapsed based on the width of the Breadcrumb. First and last item always remain visible.

* `Wrap` — Items are wrapped on multiple rows when their total width is bigger than the width of the BreadCrumb.

* `None` — All items are expanded on the same row. This scenario is useful when the Breadcrumb needs to be scrolled.

> caption Set the Breadcrumb CollapseMode to `Wrap`. The result from the snippet below.

![Breadcrumb CollapseMode Wrap](images/)

````CSHTML

````

## See Also

* [Live Demo: Breadcrumb Collapse Modes](https://demos.telerik.com/blazor-ui/breadcrumb/collapse-modes)