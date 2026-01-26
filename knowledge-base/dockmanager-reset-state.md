---
title: Reset DockManager State on Button Click in Blazor
description: Learn how to reset the DockManager state in Blazor using a button click and save the default state after the initial render.
type: how-to
page_title: How to Reset DockManager State Dynamically in Blazor
meta_title: Reset DockManager State Dynamically in Blazor
slug: dockmanager-kb-reset-state
tags: dockmanager, blazor, state
res_type: kb
ticketid: 1691957
components: ["dockmanager"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DockManager for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I want to reset the [DockManager state](slug:dockmanager-state) on a button click. The DockManager currently only resets by reloading the page. I need a solution to reset its state dynamically.

This knowledge base article also answers the following questions:
- How to reset DockManager layout to its default state?
- How to refresh DockManager without reloading the page?
- How to implement a button to reset DockManager panes?

## Solution

To reset the DockManager state dynamically on a button click:

1. Capture and save the default DockManager state in the [`OnAfterRenderAsync`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.componentbase.onafterrenderasync?view=aspnetcore-9.0) lifecycle method.

2. Restore the previously saved default state when the button is clicked.

>caption Reset the DockManager layout to its default state

````RAZOR
Change something in the DockManager (move, resize, or close panes). Тhen click
<TelerikButton OnClick="@ResetDockState" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Reset Dock State</TelerikButton>
<TelerikDockManager @ref="@DockManagerRef"
                    Height="600px">
    <DockManagerPanes>
        <DockManagerSplitPane>
            <Panes>
                <DockManagerContentPane Id="TaskListPane" HeaderText="Task List">
                    <Content>
                        <ul>
                            <li>Fix login bug</li>
                            <li>Implement dark mode</li>
                            <li>Refactor API requests</li>
                        </ul>
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane Id="CalendarPane" HeaderText="Project Calendar">
                    <Content>
                        <p>Upcoming Meetings:</p>
                        <ul>
                            <li>UI Review - Feb 10</li>
                            <li>Code Freeze - Feb 15</li>
                            <li>Final Release - Mar 1</li>
                        </ul>
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane Id="ActivityFeedPane" HeaderText="Recent Activity">
                    <Content>
                        <p>User A updated Task 1</p>
                        <p>User B commented on Task 2</p>
                        <p>New PR merged for Feature X</p>
                    </Content>
                </DockManagerContentPane>
                <DockManagerTabGroupPane>
                    <Panes>
                        <DockManagerContentPane Id="NotificationsPane" HeaderText="Notifications">
                            <Content>
                                <p>New messages from Sarah</p>
                                <p>Server maintenance scheduled for Sunday</p>
                            </Content>
                        </DockManagerContentPane>
                        <DockManagerContentPane Id="SettingsPane" HeaderText="Settings">
                            <Content>
                                <p>Enable email notifications</p>
                                <p>Change password</p>
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
                <DockManagerContentPane Id="ChatPane" HeaderText="Team Chat">
                    <Content>
                        <p>Live chat with team members</p>
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane Id="DevConsolePane" HeaderText="Dev Console">
                    <Content>
                        <p>Logs and debugging tools</p>
                    </Content>
                </DockManagerContentPane>
            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>

@code {
    private TelerikDockManager? DockManagerRef { get; set; }
    private DockManagerState? DefaultState { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            DefaultState = DockManagerRef?.GetState();
        }
    }
    private void ResetDockState()
    {
        DockManagerRef?.SetState(DefaultState);
    }
}
````

## See Also

- [DockManager Overview](slug:dockmanager-overview)
- [DockManager State](slug:dockmanager-state)
