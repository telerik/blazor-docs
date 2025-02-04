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

## OnPaneResize

The `OnPaneResize` event is fired when any pane is resized. It lets you respond to that change if needed - for example, call the `.Refresh()` method of a chart or otherwise repaint a child component in the content. You can also use it to, for example, update the saved [state](slug://dockmanager-state) for your users.

The event handler receives as an argument an `DockManagerPaneResizeEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `PaneId` | `string` | The Id of the pane that is being resized. |
| `Size` | `string` | The new size of the resized pane. |

## State Events

The DockManager state lets you control through code the aspects of the DockManager the user can control in the UI - such as docking, undocking, resizing panes and etc. The DockManager provides two events related to the state:

* `OnStateInit` - fires when the DockManager initializes so you can provide a stored version of the grid.

* `OnStateChanged` - fires when the user performs an action so you can see what area was changed and, if needed, alter the component state.

Review the [DockManager state](slug://dockmanager-state) article for more details and examples on how the grid state works and what you can do with it.

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
<strong>The events log is below the component.</strong>

<TelerikDockManager Height="800px"
                    Width="90%"
                    OnDock="@OnPaneDock"
                    OnUndock="@OnPaneUndock"
                    OnPin="@OnPanePin"
                    OnPaneResize="@OnPaneResize"
                    OnUnpin="@OnPaneUnpin">
    <DockManagerPanes>
        <DockManagerSplitPane AllowEmpty="true">
            <Panes>
                <DockManagerContentPane HeaderText="Task Details"
                                        Id="taskDetails">
                    <Content>
                        This pane displays task details like description, assignee, and status.
                        Task 1: Update website UI
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane HeaderText="Assigned To"
                                        Id="assignedTo">
                    <Content>
                        This pane shows which team members are assigned to the tasks.
                        Team Member: John Doe
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane HeaderText="Due Date"
                                        Id="dueDate">
                    <Content>
                        This pane contains the task deadline and the progress bar.
                        Due Date: 03/20/2025
                    </Content>
                </DockManagerContentPane>
                <DockManagerTabGroupPane>
                    <Panes>
                        <DockManagerContentPane HeaderText="Comments"
                                                Id="comments">
                            <Content>
                                This pane allows team members to leave comments and feedback.
                                Comment: "Looks good, but needs more details."
                            </Content>
                        </DockManagerContentPane>
                        <DockManagerContentPane HeaderText="Attachments"
                                                Id="attachments">
                            <Content>
                                This pane shows files attached to the task, such as documents and screenshots.
                                Attachment: Project_Mockup.pdf
                            </Content>
                        </DockManagerContentPane>
                    </Panes>
                </DockManagerTabGroupPane>
            </Panes>
        </DockManagerSplitPane>
    </DockManagerPanes>

    <DockManagerFloatingPanes>
        <DockManagerSplitPane>
            <Panes>
                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>Live Updates</strong>
                    </HeaderTemplate>
                    <Content>
                        Displays real-time progress updates on the task.
                        Task 1 - 50% Completed
                    </Content>
                </DockManagerContentPane>
            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>

<div class="col">
    @((MarkupString)Log)
</div>

@code {
    private string Log { get; set; }

    private void OnPaneDock(DockManagerDockEventArgs args)
    {
        if (args.TargetPaneId == "taskDetails")
        {
            args.IsCancelled = true;
            Log += $"<br /> Task pane with ID {args.PaneId} was about to dock to task pane with ID {args.TargetPaneId}. The event is cancelled.";
        }
        else
        {
            Log += $"<br /> Task pane with ID {args.PaneId} was docked to task pane with ID {args.TargetPaneId}.";
        }
    }

    private void OnPaneUndock(DockManagerUndockEventArgs args)
    {
        if (args.PaneId == "assignedTo")
        {
            args.IsCancelled = true;
            Log += $"<br /> Task pane with ID {args.PaneId} was about to undock. The event is cancelled.";
        }
        else
        {
            Log += $"<br /> Task pane with ID {args.PaneId} was undocked.";
        }
    }

    private void OnPanePin(DockManagerPinEventArgs args)
    {
        if (args.PaneId == "dueDate")
        {
            args.IsCancelled = true;
            Log += $"<br /> Task pane with ID {args.PaneId} was about to pin. The event is cancelled.";
        }
        else
        {
            Log += $"<br /> Task pane with ID {args.PaneId} was pinned.";
        }
    }

    private void OnPaneResize(DockManagerPaneResizeEventArgs args)
    {
        Log += $"<br /> Task pane with ID {args.PaneId} was resized. The new size is {args.Size}.";
    }

    private void OnPaneUnpin(DockManagerUnpinEventArgs args)
    {
        if (args.PaneId == "comments")
        {
            args.IsCancelled = true;
            Log += $"<br /> Task pane with ID {args.PaneId} was about to unpin. The event is cancelled.";
        }
        else
        {
            Log += $"<br /> Task pane with ID {args.PaneId} was unpinned.";
        }
    }
}
`````

## Next Steps

* [Manage the Dock Manager state](slug://dockmanager-state).


## See Also

* [DockManager Overview](slug://dockmanager-overview)