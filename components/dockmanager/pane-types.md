---
title: Pane Types
page_title: DockManager - Pane Types
description: Pane Types in the DockManager for Blazor.
slug: dockmanager-pane-types
tags: telerik,blazor,dockmanager,pane,types
published: true
position: 15
---

# Pane Types

The Blazor DockManager component exposes the ability to configure different pane types.

## Panes Nested Tags Settings

When defining pane types, the naming convention follows the structure `<DockManager*Type*Pane>`, where **Type** specifies the behavior of the pane. The available types are:

#### DockManagerContentPane

Provides full control over explicitly defining custom content to be rendered for a given pane based on specific requirements. 

* It can be a direct child of all other panes and the `<DockManagerPanes>` tag.

#### DockManagerTabGroupPane

Groups panes in a tab strip, similar to the [TabStrip component](slug://components/tabstrip/overview). Users can navigate through panes using tabs in the header. 

* It can be a direct child of `<DockManagerSplitPane>` and the `<DockManagerPanes>` tag. 
* It can only contain `<DockManagerContentPane>` children.

#### DockManagerSplitPane

Organizes panes in a [Splitter-like](slug://splitter-overview) manner, allowing the container pane to be split either horizontally or vertically. 

* It can be a direct child of another `<DockManagerSplitPane>` and the `<DockManagerPanes>` tag. 
* It can contain `<DockManagerTabGroupPane>`, `<DockManagerContentPane>`, and other `<DockManagerSplitPane>` tags as children. 
* Only this pane type can be declared as a direct child of the `<DockManagerFloatingPanes>` tag.

>caption DockManager with all pane types.

`````RAZOR
<TelerikDockManager>
    <DockManagerPanes>

        <DockManagerContentPane>
            <HeaderTemplate>
                Patient Management
            </HeaderTemplate>
            <Content>
                <ul>
                    <li>Patient Records</li>
                    <li>Appointments</li>
                    <li>Billing</li>
                    <li>Medical Reports</li>
                </ul>
            </Content>
        </DockManagerContentPane>

        <DockManagerSplitPane>
            <Panes>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>Patient Overview</strong>
                    </HeaderTemplate>
                    <Content>
                        <ul>
                            <li>John Doe - Room 202</li>
                            <li>Jane Smith - Room 305</li>
                            <li>Michael Lee - ICU</li>
                        </ul>
                    </Content>
                </DockManagerContentPane>

                <DockManagerContentPane Unpinned="true">
                    <HeaderTemplate>
                        <strong>Recent Visits</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>Dr. Adams checked John Doe - Blood Pressure Monitoring</p>
                        <p>Dr. Brown examined Jane Smith - Flu Symptoms</p>
                        <p>Dr. Carter performed surgery on Michael Lee</p>
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
                                <strong>Doctor Schedule</strong>
                            </HeaderTemplate>
                            <Content>
                                <p>Dr. Adams - 10:00 AM - 4 Appointments</p>
                                <p>Dr. Brown - 12:30 PM - Surgery</p>
                                <p>Dr. Carter - 2:00 PM - Follow-up Consultations</p>
                            </Content>
                        </DockManagerContentPane>

                        <DockManagerContentPane>
                            <HeaderTemplate>
                                <strong>Lab Results</strong>
                            </HeaderTemplate>
                            <Content>
                                <p>John Doe - Blood Test - Normal</p>
                                <p>Jane Smith - X-ray - No fractures detected</p>
                                <p>Michael Lee - MRI - Awaiting review</p>
                            </Content>
                        </DockManagerContentPane>

                    </Panes>
                </DockManagerTabGroupPane>

                <DockManagerContentPane>
                    <HeaderTemplate>
                        <strong>System Alerts</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>Emergency alert: ICU patient needs immediate attention.</p>
                        <p>Maintenance scheduled for radiology equipment at 5 PM.</p>
                        <p>New health protocol updates available.</p>
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
                        <strong>Staff Chat</strong>
                    </HeaderTemplate>
                    <Content>
                        <p>Secure messaging for doctors, nurses, and admin staff.</p>
                        <TelerikTextBox @bind-Value="@ChatMessage"></TelerikTextBox>
                    </Content>
                </DockManagerContentPane>

            </Panes>
        </DockManagerSplitPane>
    </DockManagerFloatingPanes>
</TelerikDockManager>

@code {
    private string ChatMessage { get; set; }
}
`````