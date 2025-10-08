---
title: How to Add a Footer to the DockManagerContentPane
description: Learn how to add a fixed footer to the DockManagerContentPane.
type: how-to
page_title: How to Add a Fixed Footer to DockManagerContentPane in UI for Blazor
meta_title: How to Add a Fixed Footer to DockManagerContentPane in UI for Blazor
slug: dockmanager-kb-add-content-pane-footer
tags: dockmanager, content, pane, footer, header, fixed
res_type: kb
ticketid: 1700189
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

I want to add a footer below the content block in the [`DockManagerContentPane`](slug:dockmanager-pane-types) component. The footer should remain fixed while the content block is scrollable.

## Solution

To add a fixed footer below a scrollable content in a `DockManagerContentPane`, define a `div` container with `display: flex; flex-direction: column;` and set the scrollable content and footer as separate sections.

````Razor
<TelerikDockManager Height="90vh">
    <DockManagerPanes>

        <DockManagerSplitPane Orientation="@DockManagerPaneOrientation.Vertical" Size="40%">
            <Panes>

                <DockManagerContentPane Size="55%" HeaderText="Pane 1.1">
                    <HeaderTemplate>
                        <div style="color: darkblue; font-weight: bold;">
                            Custom Header for Pane 1.1
                        </div>
                    </HeaderTemplate>
                    <Content>
                        <div style="display: flex; flex-direction: column; height: 100%;">
                            <!-- Scrollable content -->
                            <div style="flex: 1; overflow-y: auto; padding: 0.5rem;">
                                @for (int i = 1; i <= 30; i++)
                                {
                                    <div>Scrollable content line @i</div>
                                }
                            </div>

                            <!-- Fixed footer -->
                            <div style="background: #f0f0f0; padding: 0.5rem; border-top: 1px solid #ccc;">
                                <strong>Custom Footer (Fixed)</strong>
                            </div>
                        </div>
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
</TelerikDockManager>
````

## See Also
- [DockManager Documentation](slug:dockmanager-overview)
