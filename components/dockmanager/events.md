---
title: Events
page_title: DockManager - Events
description: Events in the DockManager for Blazor.
slug: dockmanager-events
tags: telerik,blazor,dockmanager,events
published: true
position: 20
---

# DockManager Events

This article explains the events available in the Telerik DockManager for Blazor:

* [OnDock](#ondock)
* [OnUndock](#ondock)
* [VisibleChanged](#visiblechanged)
* [UnpinnedSizeChanged](#unpinnedsizechanged)
* [SizeChanged](#sizechanged)
* [OnPaneResize](#onpaneresize)
* [State Events](#state-events)
* [OnPin](#onpin)
* [OnUnpin](#onunpin)

## OnDock

The `OnDock` event is fired when any pane is docked.

The event handler receives as an argument an `DockManagerDockEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `DockPosition` | `DockManagerDockPosition` | The position where the pane is being docked. The possible options are: `Left`, `Right`, `Top`, `Bottom`, `Middle`. |
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the floating pane that is being docked. |
| `TargetPaneId` | `string` | The Id of the target pane. |

## OnUndock

The `OnUndock` event is fired when any pane is undocked.

The event handler receives as an argument an `DockManagerUndockEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the floating pane that is being undocked. |

## VisibleChanged

The `VisibleChanged` event is fired when the user tries to hide a given pane. You can effectively cancel the event by not propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the pane visible.

## UnpinnedSizeChanged

The `UnpinnedSizeChanged` event is triggered when the `UnpinnedSize` parameter of the corresponding pane is changed.

## SizeChanged

The `SizeChanged` event is triggered when the `Size` parameter of the corresponding pane is changed.

## OnPaneResize

The `OnPaneResize` event is fired when any pane is resized. It lets you respond to that change if needed - for example, call the `.Refresh()` method of a chart or otherwise repaint a child component in the content. You can also use it to, for example, update the saved [state](slug:dockmanager-state) for your users.

The event handler receives as an argument an `DockManagerPaneResizeEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `PaneId` | `string` | The Id of the pane that is being resized. |
| `Size` | `string` | The new size of the resized pane. |

## State Events

The DockManager state lets you control through code the aspects of the DockManager the user can control in the UI - such as docking, undocking, resizing panes and etc. The DockManager provides two events related to the state:

* `OnStateInit` - fires when the DockManager initializes so you can provide a stored version of the grid.

* `OnStateChanged` - fires when the user performs an action so you can see what area was changed and, if needed, alter the component state.

Review the [DockManager state](slug:dockmanager-state) article for more details and examples on how the grid state works and what you can do with it.

## OnPin

The `OnPin` event is fired when any pane is pinned.

The event handler receives as an argument an `DockManagerPinEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the pane that is being pinned. |

## OnUnpin

The `OnUnpin` event is fired when any pane is unpinned.

The event handler receives as an argument an `DockManagerUnpinEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the pane that is being unpinned. |

## Example

>caption DockManager with all available events.

`````RAZOR
<TelerikDockManager @ref="@DockManagerRef"
                    Height="70vh"
                    Width="90vw"
                    OnDock="@OnPaneDock"
                    OnUndock="@OnPaneUndock"
                    OnPin="@OnPanePin"
                    OnPaneResize="@OnPaneResize"
                    OnUnpin="@OnPaneUnpin">
    <DockManagerPanes>

        <DockManagerSplitPane Orientation="@DockManagerPaneOrientation.Vertical"
                              Size="40%"
                              Id="SplitPane">
            <Panes>

                <DockManagerContentPane HeaderText="Pane 1"
                                        Id="Pane1"
                                        Size="50%"
                                        UnpinnedSize="@Pane1UnpinnedSize"
                                        UnpinnedSizeChanged="@Pane1UnpinnedSizeChanged"
                                        Closeable="false">
                    <Content>
                        Pane 1. Undocking is allowed. Docking over it is cancelled.
                        <code>UnpinnedSizeChanged</code> is handled.
                        Current <code>UnpinnedSize</code>: <strong>@Pane1UnpinnedSize</strong>
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane HeaderText="Pane 2"
                                        Id="Pane2"
                                        Size="50%"
                                        Closeable="false">
                    <Content>
                        Pane 2. Docking over it is allowed. Undocking is cancelled.
                        <br />
                        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                                       Enabled="@( !Pane4Visible || !FloatingPaneVisible )"
                                       OnClick="@( () => { Pane4Visible = true; FloatingPaneVisible = true; DockManagerRef?.Refresh(); })">
                            Restore Closed Panes
                        </TelerikButton>
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>

        <DockManagerTabGroupPane Id="TabGroupPane">
            <Panes>

                <DockManagerContentPane HeaderText="Pane 3"
                                        Id="Pane3"
                                        Closeable="false">
                    <Content>
                        Pane 3. Unpinning is possible, but pinning is cancelled.
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane HeaderText="Pane 4"
                                        Id="Pane4"
                                        Visible="@Pane4Visible"
                                        VisibleChanged="OnPane4VisibleChanged">
                    <Content>
                        Pane 4. Can be closed. Unpinning is cancelled.
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerTabGroupPane>
    </DockManagerPanes>

    <DockManagerFloatingPanes>
        <DockManagerSplitPane Id="FloatingSplitPane">
            <Panes>

                <DockManagerContentPane HeaderText="Floating Pane"
                                        Id="FloatingPane"
                                        Visible="@FloatingPaneVisible"
                                        VisibleChanged="OnFloatingPaneVisibleChanged">
                    <Content>
                        Floating Pane. Can be closed.
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>

<p style="color: var(--kendo-color-primary)">DockManager Events (latest on top):</p>

<div style="height: 20vh; border:1px solid var(--kendo-color-border); overflow: auto;">
    @foreach (var item in DockManagetEventLog)
    {
        <div>@( (MarkupString)item )</div>
    }
</div>

@code {
    private TelerikDockManager? DockManagerRef { get; set; }

    private string Pane1UnpinnedSize { get; set; } = "360px";
    private bool Pane4Visible { get; set; } = true;
    private bool FloatingPaneVisible { get; set; } = true;

    private List<string> DockManagetEventLog { get; set; } = new List<string>();

    private void OnPaneDock(DockManagerDockEventArgs args)
    {
        if (args.TargetPaneId == "Pane1")
        {
            args.IsCancelled = true;
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was about to dock to pane <strong>{args.TargetPaneId}</strong>. Event cancelled.");
        }
        else
        {
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was docked to pane <strong>{args.TargetPaneId}.");
        }
    }

    private void OnPaneUndock(DockManagerUndockEventArgs args)
    {
        if (args.PaneId == "Pane2")
        {
            args.IsCancelled = true;
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was about to undock. Event cancelled.");
        }
        else
        {
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was undocked.");
        }
    }

    private void OnPanePin(DockManagerPinEventArgs args)
    {
        if (args.PaneId == "Pane3")
        {
            args.IsCancelled = true;
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was about to pin. Event cancelled.");
        }
        else
        {
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was pinned.");
        }
    }

    private void OnPaneResize(DockManagerPaneResizeEventArgs args)
    {
        DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was resized to {args.Size}.");
    }

    private void Pane1UnpinnedSizeChanged(string newUnpinnedSize)
    {
        Pane1UnpinnedSize = newUnpinnedSize;
    }

    private void OnPaneUnpin(DockManagerUnpinEventArgs args)
    {
        if (args.PaneId == "Pane4")
        {
            args.IsCancelled = true;
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was about to unpin. Event cancelled.");
        }
        else
        {
            DockManagetEventLog.Insert(0, $"Pane <strong>{args.PaneId}</strong> was unpinned.");
        }
    }

    private void OnPane4VisibleChanged(bool newVisible)
    {
        Pane4Visible = newVisible;

        DockManagetEventLog.Insert(0, $"Pane <strong>Pane4</strong> was closed.");
    }

    private void OnFloatingPaneVisibleChanged(bool newVisible)
    {
        FloatingPaneVisible = newVisible;

        DockManagetEventLog.Insert(0, $"Pane <strong>FloatingPane</strong> was closed.");
    }
}
`````

## Next Steps

* [Manage the Dock Manager state](slug:dockmanager-state).


## See Also

* [DockManager Overview](slug:dockmanager-overview)
