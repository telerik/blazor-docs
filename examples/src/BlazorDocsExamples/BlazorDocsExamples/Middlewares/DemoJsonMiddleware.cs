namespace BlazorDocsExamples.Middlewares
{
    public class DemoJsonMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _environment;

        public DemoJsonMiddleware(RequestDelegate next, IHostEnvironment environment)
        {
            _next = next;
            _environment = environment;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext.Request.Path.HasValue && httpContext.Request.Path.Value.EndsWith("demo.json", StringComparison.OrdinalIgnoreCase))
            {
                var filePath = Path.Combine(_environment.ContentRootPath, "wwwroot", "demo.json");

                if (File.Exists(filePath))
                {
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.SendFileAsync(filePath);
                    return;
                }
                else
                {
                    httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                    await httpContext.Response.WriteAsync("File not found.");
                    return;
                }
            }

            await _next(httpContext);
        }
    }
}
