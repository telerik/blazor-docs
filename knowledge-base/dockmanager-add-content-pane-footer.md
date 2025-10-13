---
title: Add Fixed Footer to Scrollable DockManager Content Pane
description: Learn how to add a fixed footer at the bottom of a scrollable DockManagerContentPane in a Telerik DockManager for Blazor.
type: how-to
page_title: How to Add Fixed Footer to Scrollable DockManager Content Pane
meta_title: How to Add Fixed Footer to Scrollable DockManager Content Pane
slug: dockmanager-kb-add-content-pane-footer
tags: blazor, dockmanager, footer
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
        <DockManagerSplitPane Orientation="@DockManagerPaneOrientation.Vertical">
            <Panes>
                <DockManagerContentPane Size="50%" HeaderText="Pane 1.1" Class="scrollable-pane">
                    <Content>
                        <div class="pane-content-outer">
                            <div class="pane-content-inner">
                                @for (int i = 1; i <= 30; i++)
                                {
                                    <div>Scrollable content line @i</div>
                                }
                            </div>
                            <div class="pane-footer">
                                Fixed Pane Footer
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
    </DockManagerPanes>
</TelerikDockManager>

<style>
    .scrollable-pane .k-pane-content {
        padding: 0;
    }
    .scrollable-pane .pane-content-outer {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .scrollable-pane .pane-content-inner {
        padding: var(--kendo-spacing-4);
        flex: 1;
        overflow-y: auto;
    }
    .pane-footer {
        background: var(--kendo-color-surface);
        padding: var(--kendo-spacing-2) var(--kendo-spacing-4);
        border-top: 1px solid var(--kendo-color-border);
        font-weight: bold;
    }
</style>
````

## See Also
- [DockManager Documentation](slug:dockmanager-overview)
