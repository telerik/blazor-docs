---
title: AI Chat Assistant
page_title: Grid - AI Chat Assistant
description: Learn how to implement an AI Chat Assistant for the Telerik UI for Blazor Grid that enables natural language interactions to perform data operations through conversational commands.
slug: grid-ai-chat-assistant
tags: telerik,blazor,grid,ai,chat,assistant,conversational
published: True
position: 18
components: ["grid", "chat"]
---

# Grid AI Chat Assistant

The Blazor Grid can be enhanced with an AI-powered chat assistant that allows users to interact with Grid data using natural language commands. By integrating the [Chat component](slug:chat-overview) with the Grid's built-in AI helper methods, you can create an intuitive conversational interface where users can perform [Smart Grid operations](slug:grid-ai-overview) through simple text commands instead of navigating through multiple UI controls.

## Overview

The AI Chat Assistant provides a conversational interface for Grid operations. Users can:

* Apply data operations (sort, filter, group, page) through natural language
* Manage columns (show, hide, resize, reorder, lock)
* Export data to Excel, PDF, or CSV
* Receive confirmation messages for each operation

The integration leverages two key Grid methods:

* **`GetAIRequest()`**&mdash;Generates a properly formatted request containing the user's prompt and Grid column information to send to your AI service.
* **`ProcessAIResponseAsync()`**&mdash;Processes the AI service response and automatically applies all returned commands to the Grid.

>tip The demo in this article uses a Telerik-hosted AI service for demonstration purposes only. For production applications, you should [implement your own AI service](slug:grid-ai-service-setup) that understands your specific domain, data, and business requirements.

## Example

The following example demonstrates how to implement an AI Chat Assistant that enables users to manage Grid data through natural language commands. 

````RAZOR.skip-repl
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions

@using OrderService = TelerikBlazorDemos.Services.Data.OrderService;
@using OrderDto = TelerikBlazorDemos.Services.Data.OrderDto;
@inject OrderService OrderService
@inject HttpClient HttpClientInstance

<TelerikMediaQuery Media="(min-width: 769px)" OnChange="@OnLargeMediaQueryChange" />
<TelerikMediaQuery Media="(min-width: 561px)" OnChange="@((bool matches) => IsMediumScreen = matches)" />
<TelerikMediaQuery Media="(max-width: 560px)" OnChange="@((bool matches) => IsSmallScreen = matches)" />

<style>
    /* Allow Drawer to cover the whole Grid */
    @@media screen and (min-width: 769px) {
        div.k-drawer-expanded .k-drawer,
        div.k-drawer-expanded .k-drawer-wrapper {
            max-width: 100%;
        }
    }
    /* Show Drawer overlay only over the Grid */
    div.k-drawer-overlay .k-overlay,
    div.k-drawer-overlay .k-drawer {
        position: absolute;
    }

    /* Remove gap between Chat and Grid in Material theme */
    div.k-drawer-content {
        padding-inline: 0;
        padding-block: 0;
    }

    /* Chat Header styles */
    .k-chat-header .k-appbar-section {
        display; flex;
        gap: .4em;
        flex: 1;
    }
    .k-chat-header .k-appbar-section > div:nth-of-type(2) {
        flex: 1;
    }

    /* AI Grid Button */
    button.ai-button,
    button.ai-button.k-selected {
        background-color: #fff;
        color: #4b5ffa;
        border-color: #4b5ffa;
    }
    button.ai-button {
        background-color: #fff;
        color: #4b5ffa;
    }
    button.ai-button.k-selected {
        background: linear-gradient(134.88deg, rgba(172, 88, 255, 0.2) 15.09%, rgba(75, 95, 250, 0.2) 85.31%);
    }
    button.ai-button:hover {
        background: linear-gradient(134.88deg, rgba(172, 88, 255, 0.1) 15.09%, rgba(75, 95, 250, 0.1) 85.31%);
    }

    /* Use medium Grid ToolBar paddings */
    .k-grid .k-toolbar {
        padding-inline: var(--kendo-spacing-2);
        padding-block: var(--kendo-spacing-2);
    }

    /* Reduce vertical Chat header paddings in Fluent theme */
    .k-chat .k-appbar {
        padding-block: 0.5rem;
    }

    /* Remove Chat bubbles for the AI Assistant */
    .k-message-group-receiver .k-bubble {
        padding-inline: 0;
        border-width: 0;
        background-color: transparent;
    }

    /* Make Chat bubbles 100% wide for the AI Assistant */
    div.k-message-group-receiver {
        max-width: 100%;
    }
</style>

<div style="position:relative;">
    <TelerikDrawer @ref="@DrawerRef"
                   Data="@(new List<object>())"
                   Expanded="@DrawerExpanded"
                   ExpandedChanged="@OnDrawerExpandedChanged"
                   Mode="@(IsLargeScreen ? DrawerMode.Push : DrawerMode.Overlay)"
                   Position="@DrawerPosition.End"
                   Width="@GetDrawerWidth()">
        <Template>
            <TelerikChat @ref="@ChatRef"
                         AuthorId="@ChatAuthors["user"].Id"
                         Data="@ChatData"
                         Height="600px"
                         InputValue="@ChatInputValue"
                         OnInputValueChanged="@((string newValue) => ChatInputValue = newValue)"
                         OnSendMessage="@OnChatSendMessage"
                         Suggestions="@ChatSuggestions"
                         SuggestionsLayoutMode="@ChatSuggestionsLayoutMode.ScrollButtons"
                         OnSuggestionClick="@((ChatSuggestionClickEventArgs args) => ChatInputValue = args.Suggestion)">
                <HeaderTemplate>
                    <div>
                        <TelerikSvgIcon Icon="@CustomSvgIcons.AISpakles" Size="@ThemeConstants.SvgIcon.Size.ExtraExtraLarge" />
                    </div>
                    <div>
                        <strong>Ask AI Grid Assistant</strong>
                    </div>
                    <div>
                        <TelerikButton Icon="@SvgIcon.X"
                                       OnClick="@OnChatButtonClick"
                                       FillMode="@ThemeConstants.Button.FillMode.Clear" />
                    </div>
                </HeaderTemplate>
            </TelerikChat>
        </Template>
        <DrawerContent>
            <TelerikGrid @ref="@GridRef"
                         Data="@GridData"
                         FilterMode="GridFilterMode.FilterMenu"
                         Groupable="true"
                         Height="600px"
                         LoadGroupsOnDemand="true"
                         PageSize="24"
                         Reorderable="true"
                         Resizable="true"
                         RowHeight="40"
                         ScrollMode="@GridScrollMode.Virtual"
                         ShowColumnMenu="true"
                         Size="@ThemeConstants.Grid.Size.Small"
                         Sortable="true">
                <GridSettings>
                    <GridPdfExport PageOrientation="@GridPdfExportPageOrientation.Landscape" />
                </GridSettings>
                <GridToolBar>
                    <GridToolBarCustomTool>
                        <TelerikButton Icon="@nameof(SvgIcon.ArrowRotateCcw)"
                                       FillMode="@ThemeConstants.Button.FillMode.Flat"
                                       OnClick="@OnResetButtonClick"
                                       Rounded="@ThemeConstants.Button.Rounded.Full">Reset Changes</TelerikButton>
                    </GridToolBarCustomTool>
                    <GridToolBarSpacerTool />
                    <GridToolBarCustomTool>
                        <TelerikToggleButton OnClick="@OnChatButtonClick"
                                       Class="ai-button"
                                       Rounded="@ThemeConstants.Button.Rounded.Full"
                                       Icon="@CustomSvgIcons.AIGrid"
                                       Selected="@DrawerExpanded">AI Grid</TelerikToggleButton>
                    </GridToolBarCustomTool>
                </GridToolBar>
                <GridColumns>
                    <GridColumn Field="@nameof(OrderDto.Account)" Id="Account" Width="180px" />
                    <GridColumn Field="@nameof(OrderDto.Region)" Id="Region" Width="140px" />
                    <GridColumn Field="@nameof(OrderDto.Bookings)" Id="Bookings" DisplayFormat="{0:c0}" Width="140px" />
                    <GridColumn Field="@nameof(OrderDto.Status)" Id="Status" Width="130px">
                        <Template>
                            @{ var order = (OrderDto)context; }
                            <TelerikChip Selectable="false"
                                         Size="@ThemeConstants.Chip.Size.Small"
                                         Text="@order.Status"
                                         ThemeColor="@GetStatusThemeColor(order.Status)" />
                        </Template>
                    </GridColumn>
                    <GridColumn Field="@nameof(OrderDto.OrderType)" Id="OrderType" Title="Order Type" Width="140px">
                        <Template>
                            @{ var order = (OrderDto)context; }
                            <TelerikChip FillMode="@ThemeConstants.Chip.FillMode.Outline"
                                         Icon="@GetOrderTypeIcon(order.OrderType)"
                                         Selectable="false"
                                         Size="@ThemeConstants.Chip.Size.Small"
                                         Text="@order.OrderType" />
                        </Template>
                    </GridColumn>
                    <GridColumn Field="@nameof(OrderDto.OrderDate)" Id="OrderDate" Title="Date" DisplayFormat="{0:D}" Width="230px" />
                    <GridColumn Field="@nameof(OrderDto.Rating)" Id="Rating" Width="230px">
                        <Template>
                            @{ var order = (OrderDto)context; }
                            <TelerikRating Value="@order.Rating" ReadOnly="true" />
                        </Template>
                    </GridColumn>
                    <GridColumn Field="@nameof(OrderDto.SalesPerson)" Id="SalesPerson" Title="Sales Person" Width="180px" />
                    <GridColumn Field="@nameof(OrderDto.Product)" Id="Product" Width="160px" />
                    <GridColumn Field="@nameof(OrderDto.Discount)" Id="Discount" DisplayFormat="{0:p0}" Width="140px" />
                    <GridColumn Field="@nameof(OrderDto.Industry)" Id="Industry" Width="140px" />
                </GridColumns>
            </TelerikGrid>
        </DrawerContent>
    </TelerikDrawer>
</div>

@code {
    #nullable enable

    private TelerikDrawer<object>? DrawerRef { get; set; }
    private TelerikGrid<OrderDto>? GridRef { get; set; }
    private List<OrderDto> GridData { get; set; } = new();
    private TelerikChat<Message>? ChatRef { get; set; }
    private List<Message> ChatData { get; set; } = new();
    private string ChatInputValue { get; set; } = string.Empty;
    private readonly Dictionary<string, Author> ChatAuthors = new() {
        { "ai", new Author() { Id = "ai", Name = "AI Assistant" } },
        { "user", new Author() { Id = "user", Name = "Grid User", ImageUrl = "https://demos.telerik.com/blazor-ui/images/chat/avatar-placeholder.png" } }
    };

    private List<string> ChatSuggestions = new() {
        "Sort by Bookings descending",
        "Group by Sales Person",
        "Export to PDF",
        "Filter by North America",
        "Hide Rating column"
    };

    private bool DrawerExpanded { get; set; }
    private bool IsLargeScreen { get; set; }
    private bool IsMediumScreen { get; set; }
    private bool IsSmallScreen { get; set; }
    private bool FirstMediaQueryChange { get; set; } = true;

    private string GetDrawerWidth()
    {
        if (IsLargeScreen)
        {
            return "360px";
        }
        if (IsSmallScreen)
        {
            return "calc(100vw - 70px)";
        }
        else
        {
            return "min(calc(100vw - 70px), 360px)";
        }
    }

    private async Task OnChatButtonClick()
    {
        if (DrawerRef is not null)
        {
            // Toggle DrawerExpanded here if this doesn't happen in OnDrawerExpandedChanged.
            if (IsLargeScreen)
            {
                DrawerExpanded = !DrawerExpanded;
            }
            await DrawerRef!.ToggleAsync();
        }
    }

    private void OnDrawerExpandedChanged(bool newExpanded)
    {
        // Prevent Drawer collapse if the user clicks outside it.
        if (!IsLargeScreen)
        {
            DrawerExpanded = newExpanded;
        }
    }

    private async Task OnLargeMediaQueryChange(bool matches)
    {
        IsLargeScreen = matches;

        if (FirstMediaQueryChange && IsLargeScreen && DrawerRef is not null)
        {
            FirstMediaQueryChange = false;
            DrawerExpanded = true;
            await DrawerRef.ExpandAsync();
        }
    }

    private async Task OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Message prompt = new Message()
        {
            AuthorId = ChatAuthors["user"].Id,
            AuthorName = ChatAuthors["user"].Name,
            AuthorImageUrl = ChatAuthors["user"].ImageUrl,
            Text = args.Message
        };
        ChatData.Add(prompt);

        Message response = new Message()
        {
            AuthorId = ChatAuthors["ai"].Id,
            AuthorName = ChatAuthors["ai"].Name,
            IsTyping = true
        };
        ChatData.Add(response);

        ChatRef!.Refresh();

        try
        {
            GridAIRequestDescriptor? aiRequest = GridRef!.GetAIRequest(args.Message);
            HttpResponseMessage? requestResult = await this.HttpClientInstance.PostAsJsonAsync("https://demos.telerik.com/service/v2/ai/grid/smart-state", aiRequest);
            string? aiResultContent = await requestResult.Content.ReadAsStringAsync();
            GridAIResponse? gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(aiResultContent);

            string? commandMessages = string.Join(" ", gridAIResponse!.Commands.Select(x => x.Message));

            await GridRef!.ProcessAIResponseAsync(aiResultContent);

            response.IsTyping = false;
            response.Text = commandMessages ?? "The request returned no response. Try another request from the Chat suggestions.";
        }
        catch (Exception)
        {
            response.Text = "The request returned no results. Try another request from the Chat suggestions.";
        }

        ChatRef!.Refresh();
    }

    private async Task OnResetButtonClick()
    {
        await GridRef!.SetStateAsync(null);
    }

    private string GetStatusThemeColor(string status)
    {
        switch(status)
        {
            case "Active":
                return ThemeConstants.Chip.ThemeColor.Warning;
            case "Complete":
                return ThemeConstants.Chip.ThemeColor.Success;
            case "In Review":
                return ThemeConstants.Chip.ThemeColor.Info;
            case "Pending":
            default:
                return ThemeConstants.Chip.ThemeColor.Base;
        }
    }

    private ISvgIcon GetOrderTypeIcon(string orderType)
    {
        switch(orderType)
        {
            case "Existing":
                return SvgIcon.Check;
            case "New":
                return SvgIcon.Plus;
            case "Renewal":
                return SvgIcon.ArrowRotateCw;
            default:
                return SvgIcon.QuestionCircle;
        }
    }

    protected override void OnInitialized()
    {
        GridData = OrderService.GetData();

        ChatData.Add(new Message()
        {
            AuthorId = ChatAuthors["ai"].Id,
            AuthorName = ChatAuthors["ai"].Name,
            Text = "👋 Hi! I'm your AI Grid Assistant. I can help you work with your data faster and more easily. Try asking me to:\n\n• Sort, filter, or group by a field.\n• Resize, reorder, or lock columns.\n• Export to Excel, PDF, or CSV.\n\nStart with one of the suggestions below or type your own request."
        });
    }

    public class AIGrid : SvgIconBase
    {
        public AIGrid()
        {
            Name = "ai-grid";
            Content = "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 6C14.6569 6 16 7.34315 16 9V15H8L7.8457 14.9961C6.31166 14.9184 5.08163 13.6883 5.00391 12.1543L5 12V11H2V6.1748L3 8.94531V10H5V9C5 7.34315 6.34315 6 8 6H12V5C12 3.89543 11.1046 3 10 3H8.94531L6.1748 2H10C11.6569 2 13 3.34315 13 5V6ZM8 7C6.89543 7 6 7.89543 6 9V12C6 13.1046 6.89543 14 8 14H15V9C15 7.89543 14.1046 7 13 7H8Z\" /><path d=\"M2.20438 2.20438L0 3L2.20438 3.79562L3 6L3.79562 3.79562L6 3L3.79562 2.20438L3 0L2.20438 2.20438Z\" /><path d=\"M8 9.5C8 9.22386 8.22386 9 8.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H8.5C8.22386 10 8 9.77614 8 9.5Z\" /><path d=\"M8 11.5C8 11.2239 8.22386 11 8.5 11H12.5C12.7761 11 13 11.2239 13 11.5C13 11.7761 12.7761 12 12.5 12H8.5C8.22386 12 8 11.7761 8 11.5Z\" />";
            ViewBox = "0 0 16 17";
        }
    }

    public class AISparkles : SvgIconBase
    {
        public AISparkles()
        {
            Name = "ai-sparkles";
            Content = "<foreignObject x=\"0\" y=\"0\" width=\"32\" height=\"32\"><div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"backdrop-filter:blur(2px);clip-path:url(#bgblur_0_2237_1717_clip_path);height:100%;width:100%\"></div></foreignObject><g filter=\"url(#filter0_d_2237_1717)\" data-figma-bg-blur-radius=\"4\"><path d=\"M22 9L23.6972 13.3028L28 15L23.6972 16.6972L22 21L20.3028 16.6972L16 15L20.3028 13.3028L22 9ZM14.9394 18.9394L12 20L14.9394 21.0606L16 24L17.0606 21.0606L20 20L17.0606 18.9394L16 16L14.9394 18.9394ZM14.2044 10.2044L12 11L14.2044 11.7956L15 14L15.7956 11.7956L18 11L15.7956 10.2044L15 8L14.2044 10.2044Z\" fill=\"url(#paint0_linear_2237_1717)\"/></g><defs><filter id=\"filter0_d_2237_1717\" x=\"0\" y=\"0\" width=\"32\" height=\"32\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/><feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/><feOffset dy=\"4\"/><feGaussianBlur stdDeviation=\"6\"/><feComposite in2=\"hardAlpha\" operator=\"out\"/><feColorMatrix type=\"matrix\" values=\"0 0 0 0 0.0509804 0 0 0 0 0.0392157 0 0 0 0 0.172549 0 0 0 0.08 0\"/><feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2237_1717\"/><feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2237_1717\" result=\"shape\"/></filter><clipPath id=\"bgblur_0_2237_1717_clip_path\" transform=\"translate(0 0)\"><path d=\"M22 9L23.6972 13.3028L28 15L23.6972 16.6972L22 21L20.3028 16.6972L16 15L20.3028 13.3028L22 9ZM14.9394 18.9394L12 20L14.9394 21.0606L16 24L17.0606 21.0606L20 20L17.0606 18.9394L16 16L14.9394 18.9394ZM14.2044 10.2044L12 11L14.2044 11.7956L15 14L15.7956 11.7956L18 11L15.7956 10.2044L15 8L14.2044 10.2044Z\"/></clipPath><linearGradient id=\"paint0_linear_2237_1717\" x1=\"14.1354\" y1=\"10.337\" x2=\"22.1053\" y2=\"20.9343\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#C158E4\"/><stop offset=\"1\" stop-color=\"#4B5FFA\"/></linearGradient></defs>";
            ViewBox = "0 0 32 32";
        }
    }

    public static class CustomSvgIcons
    {
        public static ISvgIcon AIGrid => new AIGrid();
        public static ISvgIcon AISpakles => new AISparkles();
    }

    public class Author
    {
        public string Id { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
    }

    public class Message
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string AuthorId { get; set; } = string.Empty;

        public string AuthorName { get; set; } = string.Empty;

        public string AuthorImageUrl { get; set; } = string.Empty;

        public string Text { get; set; } = string.Empty;

        public string ReplyToId { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public bool IsDeleted { get; set; }

        public bool IsPinned { get; set; }

        public bool IsTyping { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.Now;

        public List<string> SuggestedActions { get; set; } = new();

        public IEnumerable<FileSelectFileInfo> Files { get; set; } = new List<FileSelectFileInfo>();
    }
}
````

View the [complete live demo](https://demos.telerik.com/blazor-ui/grid/ai-chat-assistant).

## Implementation Steps

To implement an AI Chat Assistant for your Grid, follow the steps below:

1. Configure Grid Features

    Configure the Grid with the features you want to make available through AI commands. Enable sorting, filtering, grouping, paging, column operations, and export functionality:

    ````RAZOR.skip-repl
    <TelerikGrid @ref="@GridRef"
                Data="@GridData"
                FilterMode="GridFilterMode.FilterMenu"
                Groupable="true"
                Pageable="true"
                Reorderable="true"
                Resizable="true"
                ShowColumnMenu="true"
                Sortable="true">
        <GridSettings>
            <GridPdfExport PageOrientation="@GridPdfExportPageOrientation.Landscape" />
        </GridSettings>
        <GridColumns>
            <!-- Define columns -->
        </GridColumns>
    </TelerikGrid>
    ````

2. Set Up the Chat Component

    Add a Chat component to collect user prompts. Handle the `OnSendMessage` event to process user input. Use the Chat's `Suggestions` parameter to provide helpful prompt examples:

    ````RAZOR.skip-repl
    <TelerikChat @ref="@ChatRef"
                AuthorId="@CurrentUser.Id"
                Data="@ChatData"
                OnSendMessage="@OnChatSendMessage"
                Suggestions="@ChatSuggestions"
                Placeholder="Ask me to sort, filter, or analyze your data.">
    </TelerikChat>

    @code {
        private TelerikChat<Message> ChatRef { get; set; }
        private List<Message> ChatData { get; set; } = new();
        
        private List<string> ChatSuggestions = new() {
            "Sort by Bookings descending",
            "Group by Sales Person",
            "Export to PDF",
            "Filter by North America"
        };
        
        private Author CurrentUser = new() { 
            Id = "user", 
            Name = "Grid User" 
        };
    }
    ````

3. Process User Prompts

    Implement the `OnSendMessage` event handler to process user prompts and send them to your AI service. Use the Grid's `GetAIRequest()` method to generate a properly formatted request:

    ````C#.skip-repl
    private async Task OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        // Add user message to Chat
        Message userMessage = new Message()
        {
            AuthorId = CurrentUser.Id,
            AuthorName = CurrentUser.Name,
            Text = args.Message
        };
        ChatData.Add(userMessage);

        // Add AI response placeholder with typing indicator
        Message aiResponse = new Message()
        {
            AuthorId = "ai",
            AuthorName = "AI Assistant",
            IsTyping = true
        };
        ChatData.Add(aiResponse);
        ChatRef.Refresh();

        try
        {
            // Generate AI request from Grid
            GridAIRequestDescriptor aiRequest = GridRef.GetAIRequest(args.Message);
            
            // Send to AI service
            HttpResponseMessage requestResult = await HttpClientInstance.PostAsJsonAsync(
                "https://your-ai-service.com/api/grid/smart-state", 
                aiRequest);
            
            string aiResultContent = await requestResult.Content.ReadAsStringAsync();
            
            // Process AI response and apply to Grid
            await GridRef.ProcessAIResponseAsync(aiResultContent);
            
            // Extract messages from response
            GridAIResponse gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(aiResultContent);
            string commandMessages = string.Join(" ", gridAIResponse.Commands.Select(x => x.Message));
            
            // Update AI response message
            aiResponse.IsTyping = false;
            aiResponse.Text = commandMessages ?? "Grid updated successfully.";
        }
        catch (Exception)
        {
            aiResponse.IsTyping = false;
            aiResponse.Text = "The request failed. Please try another request.";
        }

        ChatRef.Refresh();
    }
    ````

4. Display AI Responses

    Extract messages from the AI service response to display in the Chat. The `GridAIResponse` contains a `Commands` collection where each command has a `Message` property describing what operation was performed:

    ````C#.skip-repl
    // Deserialize the AI response
    GridAIResponse gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(aiResultContent);

    // Extract messages from each command
    string commandMessages = string.Join(" ", gridAIResponse.Commands.Select(x => x.Message));

    // Update the Chat message
    aiResponse.Text = commandMessages ?? "Grid updated successfully.";
    ````

5. Optional: Add Layout Components

    For a better user experience, consider using layout components like the Drawer to show/hide the Chat interface:

    ````RAZOR.skip-repl
    <TelerikDrawer @ref="@DrawerRef"
                Expanded="@DrawerExpanded"
                Mode="@DrawerMode.Push"
                Position="@DrawerPosition.End"
                Width="360px">
        <Template>
            <TelerikChat @ref="@ChatRef" ...>
            </TelerikChat>
        </Template>
        <DrawerContent>
            <TelerikGrid @ref="@GridRef" ...>
                <GridToolBar>
                    <GridToolBarCustomTool>
                        <TelerikToggleButton OnClick="@ToggleChat"
                                            Selected="@DrawerExpanded">
                            AI Assistant
                        </TelerikToggleButton>
                    </GridToolBarCustomTool>
                </GridToolBar>
            </TelerikGrid>
        </DrawerContent>
    </TelerikDrawer>

    @code {
        private bool DrawerExpanded { get; set; }
        
        private async Task ToggleChat()
        {
            await DrawerRef.ToggleAsync();
        }
    }
    ````

## Best Practices

### Provide Initial Guidance

Add a welcome message to the Chat when it initializes to guide users on what they can ask:

````C#.skip-repl
protected override void OnInitialized()
{
    ChatData.Add(new Message()
    {
        AuthorId = "ai",
        AuthorName = "AI Assistant",
        Text = "👋 Hi! I'm your AI Grid Assistant. I can help you:\n\n• Sort, filter, or group data\n• Manage columns\n• Export to Excel, PDF, or CSV\n\nTry one of the suggestions below!"
    });
}
````

### Use Chat Suggestions

Provide common prompts as suggestions to help users understand the AI's capabilities:

````C#.skip-repl
private List<string> ChatSuggestions = new() {
    "Sort by sales descending",
    "Filter orders from last month",
    "Group by region",
    "Export to Excel",
    "Hide the discount column"
};
````

### Handle Errors

Always wrap AI service calls in try-catch blocks and provide helpful error messages:

````C#.skip-repl
try
{
    // AI processing logic
}
catch (Exception ex)
{
    aiResponse.Text = "I couldn't process that request. Please try rephrasing or use one of the suggestions.";
    Console.WriteLine($"AI request failed: {ex.Message}");
}
````

### Show Typing Indicators

Use the Chat's `IsTyping` property to indicate when the AI is processing:

````C#.skip-repl
Message aiResponse = new Message()
{
    AuthorId = "ai",
    IsTyping = true  // Shows typing indicator
};
ChatData.Add(aiResponse);
ChatRef.Refresh();

// After processing...
aiResponse.IsTyping = false;
aiResponse.Text = "Operation completed!";
ChatRef.Refresh();
````

## See Also

* [Grid Smart AI Features Overview](slug:grid-ai-overview)
* [Grid AI Assistant Tools Setup](slug:grid-ai-assistant-tools-setup)
* [Grid AI Service Setup](slug:grid-ai-service-setup)
* [Chat Component](slug:chat-overview)
* [Drawer Component](slug:drawer-overview)
