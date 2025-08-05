---
title: State
page_title: DockManager - State
description: Save, load, change the DockManager for Blazor state - docking, undocking, resizing and so on.
slug: dockmanager-state
tags: telerik,blazor,dockmanager,state,save,load,layout,set,change,management
published: True
position: 15
---

# DockManager State

The DockManager lets you read, save, load, and change its state through code. The state includes the DockManager features that are controlled by the user, such as the pane resizing, orientation, pinning, docking, and many others.

This article describes:

* [The properties of the `DockManagerState` object](#information-in-the-dockmanager-state).
* [How to set initial DockManager configuration programmatically in `OnStateInit`](#onstateinit).
* [How to detect user changes in the DockManager state with `OnStateChanged`](#onstatechanged).
* [How to use DockManager methods to get and set the DockManager state](#methods).

## Information in the DockManager State

The `DockManagerState` object exposes a collection of all the floating panes including their [settings](slug:dockmanager-overview#dockmanager-parameters).

## Events

The DockManager features two events, which are related to its state.

* [OnStateInit](#onstateinit)
* [OnStateChanged](#onstatechanged)

### OnStateInit

The `OnStateInit` event fires when the DockManager is initializing. Use this event to:

* Define initial state, for example default initial panes position;
* Load and apply state that was previously saved in a database or in `localStorage`.

The event argument is of type `DockManagerStateEventArgs` and has a `DockManagerState` property. See [Information in the DockManager State](#information-in-the-dockmanager-state) for details.

### OnStateChanged

`OnStateChanged` fires when the user performs an action that changes the value of a [property in the DockManager state](#information-in-the-dockmanager-state). The event argument is of type `DockManagerStateEventArgs` and exposes the component current `DockManagerState`.

## Methods

The `GetState` and `SetState` methods of the [DockManager instance](slug:dockmanager-overview#dockmanager-reference) let you get and set the current DockManager state on demand at any time *after* [`OnStateInit`](#onstateinit).

* `GetState` returns the current DockManager state, so you can save it or [retrieve specific information](#information-in-the-dockmanager-state). For example, you can use `GetState` to get the current panes position. Or, you can get the current panes size.

* `SetStateAsync` receives an instance of a `DockManagerState` object and applies it to the DockManager. For example, you can have a button that puts the DockManager in a certain configuration programmatically, for example pane positioning, docking, etc.

If you want to make changes to the current DockManager state:

1. First, get the current state with the `GetState` method.
2. Apply the desired modifications to the obtained `DockManagerState` object.
3. Set the modified state object via the `SetState` method.

> Do not use `GetState()` in the [`OnStateInit`](#onstateinit) or [`OnStateChanged`](#onstatechanged) events. Do not use `SetState()` in `OnStateInit`. Instead, get or set the `DockManagerState` property of the event argument.

>tip To reset the DockManager state to its initial markup configuration, use the `GetState()` and `SetState()` methods. An example of such approach can be seen in the following KB article: [Reset DockManager State on Button Click in Blazor](slug:dockmanager-kb-reset-state)

## Example

The example below shows how to restore the previous state of the DockManager on page refresh.

>caption Using DockManager State Events and Methods

`````RAZOR
@using System.Text.Json.Serialization
@using System.Text.Json

<strong>Change something in the DockManager (move, resize, or close panes), then refresh the page. The layout should be restored to its previous state.</strong>
<TelerikButton OnClick="@GetDockManagerState">Get State</TelerikButton>
<TelerikButton OnClick="@SetDockManagerState">Set State</TelerikButton>

<TelerikDockManager @ref="DockManager"
                    Height="600px"
                    OnStateInit="@OnStateInit"
                    OnStateChanged="@OnStateChanged">
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

        <DockManagerTabGroupPane>
            <Panes>
                <DockManagerContentPane Id="ReportsPane" HeaderText="Reports">
                    <Content>
                        <p>View project progress reports</p>
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane Id="AnalyticsPane" HeaderText="Analytics">
                    <Content>
                        <p>Performance metrics and KPIs</p>
                    </Content>
                </DockManagerContentPane>
                <DockManagerContentPane Id="TeamPane" HeaderText="Team">
                    <Content>
                        <p>List of project team members</p>
                    </Content>
                </DockManagerContentPane>
            </Panes>
        </DockManagerTabGroupPane>
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
    [Inject]
    private IJSRuntime _jsRuntime { get; set; }
    private TelerikDockManager DockManager { get; set; }
    private DockManagerState CurrentState { get; set; }

    private void GetDockManagerState()
    {
        CurrentState = DockManager.GetState();
    }

    private void SetDockManagerState()
    {
        DockManager.SetState(CurrentState);
    }

    public async Task AddItem(string key, string value)
    {
        await _jsRuntime.InvokeVoidAsync("localStorage.setItem", key, value);
    }

    public async Task<string> GetItem(string key)
    {
        return await _jsRuntime.InvokeAsync<string>("localStorage.getItem", key);
    }

    public async Task OnStateInit(DockManagerStateEventArgs args)
    {
        try
        {
            var state = await GetItem("DockManagerState");
            if (!string.IsNullOrEmpty(state))
            {
                args.DockManagerState = JsonSerializer.Deserialize<DockManagerState>(state);
            }
        }
        catch (Exception) { }
    }

    public async Task OnStateChanged(DockManagerStateEventArgs args)
    {
        var state = JsonSerializer.Serialize(args.DockManagerState);
        await AddItem("DockManagerState", state);
    }
}
`````

## See Also

* [Live Demo: DockManager](https://demos.telerik.com/blazor-ui/dockmanager/overview)
* [DockManagerState API reference](slug:Telerik.Blazor.Components.TelerikDockManager)
* [Blazor DockManager](slug:dockmanager-overview)
* [Reset DockManager State on Button Click](slug:dockmanager-kb-reset-state)