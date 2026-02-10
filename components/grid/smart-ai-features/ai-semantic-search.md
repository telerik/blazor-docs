---
title: AI Semantic Search
page_title: Grid - AI Semantic Search
description: Learn how to implement semantic search in the Blazor Grid using the GridToolBarSmartBoxTool.
slug: grid-ai-semantic-search
tags: telerik,blazor,grid,ai,semantic,search
published: True
position: 40
components: ["grid"]
---

# Grid AI Semantic Search

Semantic search allows users to search for data using natural language queries that understand the meaning and context of the search terms, rather than just matching exact keywords. The Grid provides a semantic search UI through the `GridToolBarSmartBoxTool`, but the actual semantic search functionality must be implemented by you.

## Overview

Telerik UI for Blazor provides:

* A user interface for entering semantic search queries
* A search history feature
* An `OnSearch` event for handling search requests

You must implement the semantic search logic yourself, for example, by integrating with an AI service of your choice. This gives you the flexibility to:

* Choose your preferred AI provider (OpenAI, Azure AI, Google AI, etc.)
* Customize the search logic to fit your data model
* Control costs and performance based on your requirements
* Implement caching and optimization strategies

## Setup Steps

1. Add GridToolBarSmartBoxTool

    Add the `GridToolBarSmartBoxTool` to your Grid toolbar and configure the semantic search settings:

    ````RAZOR
    <TelerikGrid Data="@GridData">
        <GridToolBar>
            <GridToolBarSmartBoxTool>
                <GridToolBarSmartBoxToolSettings>
                    <GridToolBarSmartBoxToolSemanticSearchSettings OnSearch="@OnSemanticSearch"
                                                                Placeholder="Search using natural language..."
                                                                DebounceDelay="500">
                        <GridToolBarSmartBoxToolSemanticSearchHistorySettings Size="10"
                                                                            TimestampFormat="g">
                        </GridToolBarSmartBoxToolSemanticSearchHistorySettings>
                    </GridToolBarSmartBoxToolSemanticSearchSettings>
                </GridToolBarSmartBoxToolSettings>
            </GridToolBarSmartBoxTool>
        </GridToolBar>

        <GridColumns>
            <GridColumn Field="@nameof(Product.Name)" />
            <GridColumn Field="@nameof(Product.Description)" />
            <GridColumn Field="@nameof(Product.Category)" />
            <GridColumn Field="@nameof(Product.Price)" />
        </GridColumns>
    </TelerikGrid>

    @code {
        private List<Product> GridData { get; set; } = new();

        private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
        {
            // Implement your semantic search logic here
        }
    }
    ````

2. Implement the OnSearch Event Handler

    In the `OnSearch` event handler, you need to:

    1. Receive the semantic search query from the event arguments
    1. Send the query to your AI service
    1. Process the AI service response
    1. Update the Grid data with the search results

    ````C#
    private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
    {
        string searchQuery = args.Text;

        if (string.IsNullOrWhiteSpace(searchQuery))
        {
            // Reset to original data if query is empty
            GridData = await LoadAllProductsAsync();
            return;
        }

        try
        {
            // Send the query to your AI service
            var searchResults = await PerformSemanticSearchAsync(searchQuery);

            // Update the Grid with the results
            GridData = searchResults;
        }
        catch (Exception ex)
        {
            // Handle errors appropriately
            Console.WriteLine($"Semantic search failed: {ex.Message}");
        }
    }

    private async Task<List<Product>> PerformSemanticSearchAsync(string query)
    {
        // Example: Connect to your AI service
        // This could be OpenAI, Azure AI, a custom ML model, etc.
        
        // Option 1: Use vector embeddings
        // 1. Generate embedding for the search query
        // 2. Search your vector database for similar items
        // 3. Return matching products
        
        // Option 2: Use AI to generate a structured query
        // 1. Send the natural language query to an AI service
        // 2. Get a structured filter/search criteria
        // 3. Apply it to your data
        
        // Placeholder implementation
        await Task.Delay(100); // Simulate API call
        
        return new List<Product>();
    }
    ````

## Integration Approaches

You can implement semantic search using different approaches depending on your requirements and infrastructure. The following sections describe common integration methods you can use with the Grid.

### Vector Embeddings

Use vector embeddings to find semantically similar items in your data:

1. **Pre-process your data**: Generate embeddings for your product descriptions or relevant fields using an embedding model (e.g., OpenAI's text-embedding model).
1. **Store embeddings**: Save the embeddings in a vector database (e.g., Azure AI Search, Pinecone, Qdrant).
1. **Process search queries**: When a user searches, generate an embedding for their query and find the most similar items in your vector database.
1. **Update the Grid**: Display the matching results in the Grid.

````C#.skip-repl
private async Task<List<Product>> PerformSemanticSearchAsync(string query)
{
    // Generate embedding for the search query
    var queryEmbedding = await _embeddingService.GenerateEmbeddingAsync(query);
    
    // Search vector database for similar items
    var similarItems = await _vectorDatabase.SearchAsync(queryEmbedding, topK: 20);
    
    // Retrieve full product data for matching items
    var productIds = similarItems.Select(x => x.Id).ToList();
    var products = await _productRepository.GetByIdsAsync(productIds);
    
    return products;
}
````

The example below shows a semantic search implementation with vector embeddings:

````RAZOR.skip-repl
@inject IEmbeddingService EmbeddingService
@inject IVectorDatabase VectorDatabase
@inject IProductRepository ProductRepository

<TelerikGrid Data="@GridData">
    <GridToolBar>
        @if (IsSearching)
        {
            <span>Searching...</span>
        }
        
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolSemanticSearchSettings OnSearch="@OnSemanticSearch"
                                                               Placeholder="Search products by description..."
                                                               DebounceDelay="500"
                                                               Enabled="@(!IsSearching)">
                    <GridToolBarSmartBoxToolSemanticSearchHistorySettings Size="10">
                    </GridToolBarSmartBoxToolSemanticSearchHistorySettings>
                </GridToolBarSmartBoxToolSemanticSearchSettings>
            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>
    </GridToolBar>

    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Description)" />
        <GridColumn Field="@nameof(Product.Category)" />
        <GridColumn Field="@nameof(Product.Price)" />
    </GridColumns>
</TelerikGrid>

@if (!string.IsNullOrEmpty(SearchError))
{
    <div class="alert alert-danger">@SearchError</div>
}

@code {
    private List<Product> GridData { get; set; } = new();
    private List<Product> AllProducts { get; set; } = new();
    private bool IsSearching { get; set; }
    private string SearchError { get; set; }

    protected override async Task OnInitializedAsync()
    {
        AllProducts = await ProductRepository.GetAllAsync();
        GridData = AllProducts;
    }

    private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
    {
        if (string.IsNullOrWhiteSpace(args.Text))
        {
            GridData = AllProducts;
            return;
        }

        IsSearching = true;
        SearchError = null;
        StateHasChanged();

        try
        {
            // Generate embedding for the search query
            var queryEmbedding = await EmbeddingService.GenerateEmbeddingAsync(args.Text);

            // Search vector database for similar items
            var similarItems = await VectorDatabase.SearchAsync(queryEmbedding, topK: 50);

            // Retrieve full product data
            var productIds = similarItems.Select(x => x.ProductId).ToList();
            GridData = AllProducts.Where(p => productIds.Contains(p.Id)).ToList();
        }
        catch (Exception ex)
        {
            SearchError = $"Semantic search failed: {ex.Message}";
            GridData = AllProducts; // Fallback to showing all products
        }
        finally
        {
            IsSearching = false;
            StateHasChanged();
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
````

### AI-Generated Queries

Use an AI service to interpret natural language and generate structured queries:

1. **Send natural language query to AI**: Pass the user's search text to an AI service (e.g., OpenAI GPT) along with your data schema.
1. **Get structured filter criteria**: The AI returns filter conditions, sort orders, or other query parameters.
1. **Apply to your data**: Use the structured criteria to filter and sort your data.
1. **Update the Grid**: Display the filtered results.

````C#.skip-repl
private async Task<List<Product>> PerformSemanticSearchAsync(string query)
{
    // Send query to AI service for interpretation
    var filterCriteria = await _aiService.InterpretSearchQueryAsync(query, _dataSchema);
    
    // Apply the criteria to your data source
    var filteredData = _allProducts
        .Where(filterCriteria.FilterExpression)
        .OrderBy(filterCriteria.SortExpression)
        .ToList();
    
    return filteredData;
}
````

### Hybrid Search

Combine traditional keyword search with semantic search for better results:

1. Perform both keyword matching and semantic similarity search
1. Combine and rank the results
1. Display the merged results in the Grid

## Configuration Options

The semantic search settings provide several configuration options:

### Placeholder

Set a helpful placeholder to guide users on how to use semantic search:

````RAZOR.skip-repl
<GridToolBarSmartBoxToolSemanticSearchSettings Placeholder="Try: 'affordable products for outdoor activities'"
                                               OnSearch="@OnSemanticSearch">
</GridToolBarSmartBoxToolSemanticSearchSettings>
````

### Debounce Delay

Adjust the debounce delay to control how quickly searches are triggered:

````RAZOR.skip-repl
<GridToolBarSmartBoxToolSemanticSearchSettings DebounceDelay="500"
                                               OnSearch="@OnSemanticSearch">
</GridToolBarSmartBoxToolSemanticSearchSettings>
````

A longer delay (e.g., 500ms) reduces the number of API calls to your AI service but may feel less responsive.

### Search History

Configure the search history to help users revisit previous queries:

````RAZOR.skip-repl
<GridToolBarSmartBoxToolSemanticSearchHistorySettings Size="10"
                                                      TimestampFormat="g">
</GridToolBarSmartBoxToolSemanticSearchHistorySettings>
````

You can also customize the history item appearance using the `ItemTemplate` parameter.

## Best Practices

### Handle Empty Queries

Reset the Grid to show all data when the search query is empty:

````C#.skip-repl
private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
{
    if (string.IsNullOrWhiteSpace(args.Text))
    {
        GridData = await LoadAllProductsAsync();
        return;
    }
    
    // Perform semantic search
}
````

### Provide User Feedback

Show loading indicators and error messages to keep users informed:

````C#.skip-repl
private bool IsSearching { get; set; }
private string SearchError { get; set; }

private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
{
    IsSearching = true;
    SearchError = null;
    StateHasChanged();
    
    try
    {
        GridData = await PerformSemanticSearchAsync(args.Text);
    }
    catch (Exception ex)
    {
        SearchError = "Search failed. Please try again.";
    }
    finally
    {
        IsSearching = false;
        StateHasChanged();
    }
}
````

### Optimize AI Service Calls

Implement caching and rate limiting to reduce costs:

````C#.skip-repl
private Dictionary<string, List<Product>> _searchCache = new();

private async Task<List<Product>> PerformSemanticSearchAsync(string query)
{
    // Check cache first
    if (_searchCache.TryGetValue(query.ToLower(), out var cachedResults))
    {
        return cachedResults;
    }
    
    // Perform search
    var results = await CallAIServiceAsync(query);
    
    // Cache the results
    _searchCache[query.ToLower()] = results;
    
    return results;
}
````

### Consider Performance

For large datasets, implement pagination or limit the number of results:

````C#.skip-repl
private async Task<List<Product>> PerformSemanticSearchAsync(string query)
{
    var allResults = await _vectorDatabase.SearchAsync(query);
    
    // Limit to top 100 results
    return allResults.Take(100).ToList();
}
````

## See Also

* [Grid AI Smart Box](slug:grid-ai-smart-box)
* [Grid AI Features Overview](slug:grid-ai-overview)
* [Grid SearchBox](slug:grid-searchbox)
