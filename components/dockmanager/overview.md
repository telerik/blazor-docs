---
title: Overview
page_title: DockManager Overview
description: Overview of the DockManager for Blazor.
slug: dockmanager-overview
tags: telerik,blazor,dockmanager,overview
published: True
position: 0
---

# Blazor DockManager Overview

The <a href="https://www.telerik.com/blazor-ui/dockmanager" target="_blank">Blazor DockManager component</a> is a versatile tool that enables users to manage and organize multiple panes within a single container. It supports features like docking, undocking, resizing, and repositioning, offering a flexible and customizable layout.

The DockManager is best suited for desktop-like interfaces and applications designed for larger screens, where users can take full advantage of its advanced layout management capabilities.

## Creating Blazor DockManager

1. Add the `TelerikDockManager` tag.
2. Use `<DockManagerPanes>` to structure the main docked layout.
3. Within `<DockManagerPanes>`, add:
    * `<DockManagerContentPane>` for standalone panes.
    * `<DockManagerSplitPane>` to create sections with multiple resizable panes.
    * `<DockManagerTabGroupPane>` to enable tabbed panes.
4. Define `HeaderTemplate` tag inside each pane to set the headers text.
5. Populate the `Content` tag section of each pane with the desired UI elements.
6. Optionally, add `<DockManagerFloatingPanes>` to create panes that can float outside the main dock layout.

>caption Telerik Blazor DockManager

````RAZOR
<TelerikDockManager Height="90vh">
    <DockManagerPanes>

        <DockManagerSplitPane Orientation="@DockManagerPaneOrientation.Vertical"
                              Size="40%">
            <Panes>

                <DockManagerContentPane Size="55%" HeaderText="Pane 1.1">
                    <Content>
                        First Content Pane in Split configuration
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane HeaderText="Pane 1.2">
                    <Content>
                        Second Content Pane in Split configuration
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>

        <DockManagerTabGroupPane>
            <Panes>

                <DockManagerContentPane HeaderText="Tab 2.1">
                    <Content>
                        First Tab Content
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane HeaderText="Tab 2.2">
                    <Content>
                        Second Tab Content
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerTabGroupPane>
    </DockManagerPanes>

    <DockManagerFloatingPanes>
        <DockManagerSplitPane>
            <Panes>

                <DockManagerContentPane HeaderText="Floating Pane">
                    <Content>
                        Floating Pane Content
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>
````

## State

The [Dock Manager allows getting and setting its state](slug:dockmanager-state). The DockManager state contains information about the pane hierarchy, floating panes, current pane settings, and the DockManager configuration, such as its orientation.

## Docking Types

The DockManager exposes the ability to dock globally or within other panes. [Read more about the available DockManager dock types...](slug:dockmanager-dock-types)

## Pane Types

The DockManager exposes the ability to configure different pane types. [Read more about the DockManager pane types...](slug:dockmanager-pane-types)

## Events

The Dock Manager fires [events when the user changes the panes layout](slug:dockmanager-events). This allows custom logic execution, refreshing of nested components and saving the [DockManager state](slug:dockmanager-state) for later restore.

## DockManager Parameters

The following table lists the Dock Manager parameters. Also check the [DockManager API Reference](slug:Telerik.Blazor.Components.TelerikDockManager) for a full list of all properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class of the `<div class="k-dockmanager">` element. Use it to [override theme styles](slug:themes-override). |
| `Height` | `string` | The Dock Manager height. If not set, the component will expand automatically to cover the available space. |
| `Orientation`  | `DockManagerPaneOrientation` enum <br /> (`Vertical`) | Determines the orientation of the root splitter. |
| `Width` | `string` | The Dock Manager width. If not set, the component will expand horizontally to fill its parent. |

### DockManagerContentPane Parameters

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AllowFloat` | `bool` | Determines whether the pane can be dragged from the dock manager layout to create a new floating pane. |
| `Class` | `string` | The custom CSS class of the `<div class="k-pane-scrollable">` element. Use it to [override theme styles](slug:themes-override). |
| `Closeable` | `bool` <br /> (`true`) | If false, the close button is hidden and closing via **Esc** key or code is disabled. |
| `Dockable` | `bool` | Specifies whether the pane allows other panes to be docked to or over it. This determines if the end user can drop other panes over it or next to it, creating a DockManagerSplitPane (Splitter) or a DockManagerTabGroupPane (TabStrip). |
| `HeaderText` | `string` | The pane title, displayed in the pane header and as the button text in the DockManager toolbar when the pane is unpinned. |
| `Id` | `string` <br /> (`Guid`) | The id of the pane. |
| `Maximizable` | `bool` | Determines whether the pane can be maximized. |
| `Size` | `string` | Determines the size of the splitter pane. Supports two-way binding. |
| `Unpinnable` | `bool` | Determines whether the pane can be unpinned. |
| `Unpinned` | `bool` | Determines whether the pane is unpinned. Supports two-way binding. |
| `UnpinnedSize` | `string` | Determines the size of the splitter pane when it is unpinned. Supports two-way binding. |
| `Visible` | `bool` <br /> (`true`) | Determines whether the tab/pane is rendered. Supports two-way binding. |

### DockManagerSplitPane Parameters

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AllowEmpty` | `bool` | Determines whether a splitter pane is shown as empty when a child pane is removed (dragged out, closed, etc.). If set to false, the splitter is re-rendered without the removed child pane. |
| `Class` | `string` | The custom CSS class of the `<div class="k-dock-manager-splitter">` element. Use it to [override theme styles](slug:themes-override). |
| `Id` | `string` <br /> (`Guid`) | The id of the pane. |
| `Orientation`  | `DockManagerPaneOrientation` enum <br /> (`Vertical`) | Determines the orientation of the rendered splitter. |
| `Size` | `string` | Determines the size of the splitter pane. Supports two-way binding. |
| `Visible` | `bool` <br /> (`true`) | Determines whether the tab/pane is rendered. Supports two-way binding. |

#### DockManagerSplitPane Parameters (only when defined as a floating pane)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FloatingHeight` | `string` | The height of the rendered window. Supports two-way binding. |
| `FloatingLeft` | `string` | The CSS `left` value of the rendered window, relative to the dock manager element (`k-dockmanager`). Supports two-way binding. |
| `FloatingResizable` | `bool` <br /> (`true`) | Determines whether the rendered window is resizable. |
| `FloatingTop` | `string` | The CSS `top` value of the rendered window, relative to the dock manager element (`k-dockmanager`). Supports two-way binding. |
| `FloatingWidth`  | `string` | The width of the rendered window. Supports two-way binding. |

### DockManagerTabGroupPane Parameters

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AllowEmpty` | `bool` | Determines whether an empty space is left when all tabs are removed (unpinned, closed, etc.), allowing you to drop content panes and create a new tab. |
| `Id` | `string` <br /> (`Guid`) | The id of the pane. |
| `SelectedPaneId` | `int` | The `id` of the initially selected tab pane. |
| `Size` | `string` | Determines the size of the splitter pane. Supports two-way binding. |
| `Visible` | `bool` <br /> (`true`) | Determines whether the tab/pane is rendered. Supports two-way binding. |

## DockManager Reference

Use the component reference to execute methods and [get or set the DockManager state](slug:dockmanager-state).

| Method | Description |
| --- | --- |
| `GetState` | Returns the current state of the Dock Manager as a [`DockManagerState` object](slug:Telerik.Blazor.Components.DockManagerState). |
| `Refresh` | Use the method to programmatically re-render the component.  |
| `SetState` | Applies the provided `DockManagerState` argument as a new state of the Dock Manager. |

<div class="skip-repl"></div>

````RAZOR
<TelerikDockManager @ref="@DockManagerRef" />

<TelerikButton OnClick="@GetDockManagerState">Get DockManager State</TelerikButton>

@code{
    private TelerikDockManager? DockManagerRef { get; set; }

    private void GetDockManagerState()
    {
        var dockState = DockManagerRef?.GetState();
    }
}
````

## Next Steps

* [Explore the DockManager Docking Types](slug:dockmanager-dock-types)
* [Explore the DockManager Pane Types](slug:dockmanager-pane-types)
* [Configure the DockManager State](slug:dockmanager-state)
* [Handle the DockManager Events](slug:dockmanager-events)


## See Also

* [DockManager API](slug:Telerik.Blazor.Components.TelerikDockManager)
* [Live Demo: DockManager](https://demos.telerik.com/blazor-ui/dockmanager/overview)
