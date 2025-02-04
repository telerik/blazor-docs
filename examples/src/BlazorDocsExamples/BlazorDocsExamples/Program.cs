using BlazorDocsExamples.Components;
using BlazorDocsExamples.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddTelerikBlazor();

builder.Services.AddCors(options =>
{
    options.AddPolicy("my-policy", policy =>
    {
        policy.WithOrigins("http://localhost:8000", "wwwsit.telerik.com", "www.telerik.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("my-policy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAntiforgery();

// Middleware to allow embedding in iframe
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy", "frame-ancestors 'self' localhost:8000 http://localhost:8000");
    await next();
});

app.UseMiddleware<DemoJsonMiddleware>();
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(BlazorDocsExamples.Client._Imports).Assembly);

app.Run();
