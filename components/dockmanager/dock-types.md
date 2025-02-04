---
title: Dock Types
page_title: DockManager - Dock Types
description: Dock Types in the DockManager for Blazor.
slug: dockmanager-dock-types
tags: telerik,blazor,dockmanager,dock,types
published: true
position: 10
---

# Docking Panes

The Blazor DockManager component exposes the ability to dock globally or within other panes.

## Docking Types

### Global Docking

When a user drags a pane, a global docking navigator always appears. This allows the user to dock the pane to one of the component's edges, making it a root pane.

### Inner Docking

When a user drags a pane and hovers over another pane, a dock navigator for that pane appears. The user can then choose to:

* Drop the pane on any of the parent pane’s outer edges, splitting it.
* Drop it in the center of the navigator to add it as a tab within the parent pane.

## Disable Docking over Individual Panes

To disable docking over a specific pane, set its `Dockable` parameter to `false`.

>caption DockManager with disabled docking option over some panes.

`````RAZOR
<TelerikDockManager>
    <DockManagerPanes>

        <DockManagerContentPane Dockable="false">
            <HeaderTemplate>
                Customer Support
            </HeaderTemplate>
            <Content>
                <ul>
                    <li>Inbox</li>
                    <li>Open Tickets</li>
                    <li>Reports</li>
                    <li>Settings</li>
                </ul>
            </Content>
        </DockManagerContentPane>

        <DockManagerSplitPane Dockable="false">
            <Panes>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>Open Tickets</strong>
                    </HeaderTemplate>
                    <Content>
                        <ul>
                            <li>Ticket #1245 - Payment issue</li>
                            <li>Ticket #1246 - Login failure</li>
                            <li>Ticket #1247 - Refund request</li>
                        </ul>
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>Recent Interactions</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>John Doe: "I need help with my subscription."</p>
                        <p>Jane Smith: "My order hasn’t arrived yet."</p>
                        <p>Michael Lee: "How do I reset my password?"</p>
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>

        <DockManagerSplitPane>
            <Panes>
                <DockManagerTabGroupPane>
                    <Panes>

                        <DockManagerContentPane>
                            <HeaderTemplate>
                                <strong>Analytics</strong>
                            </HeaderTemplate>
                            <Content>
                                <p>Overview of ticket resolution time, customer satisfaction, and response rates.</p>
                            </Content>
                        </DockManagerContentPane>

                        <DockManagerContentPane>
                            <HeaderTemplate>
                                <strong>Team Performance</strong>
                            </HeaderTemplate>
                            <Content>
                                <p>Live statistics on agent response times and workload distribution.</p>
                            </Content>
                        </DockManagerContentPane>

                    </Panes>
                </DockManagerTabGroupPane>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>System Alerts</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>New feature rollout scheduled for February 15.</p>
                        <p>Service downtime reported in Europe region.</p>
                        <p>Security update required for agent login system.</p>
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>
    </DockManagerPanes>

    <DockManagerFloatingPanes>
        <DockManagerSplitPane>
            <Panes>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>Live Chat</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>Instant messaging with support team members.</p>
                        <TelerikTextBox @bind-Value="Message"></TelerikTextBox>
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>

@code {
    private string Message { get; set; }
}
`````