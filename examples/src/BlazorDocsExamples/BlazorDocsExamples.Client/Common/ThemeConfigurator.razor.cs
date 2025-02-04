using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Web;

namespace BlazorDocsExamples.Client.Common
{
    public partial class ThemeConfigurator : ComponentBase
    {
        private const string DEFAULT_THEME = "default-ocean-blue-a11y";

        [Inject]
        public required NavigationManager NavigationManager { get; set; }

        [Inject]
        public required IJSRuntime JsRuntime { get; set; }

        private bool IsDisposed { get; set; }
        private DotNetObjectReference<ThemeConfigurator>? DotNetInstance { get; set; }

        protected override async Task OnParametersSetAsync()
        {
            var theme = GetThemeQueryFromUrl();

            if (theme != Theme)
            {
                await SetTheme(theme);
            }

            await base.OnParametersSetAsync();
        }

        private string GetThemeQueryFromUrl()
        {
            var uri = new Uri(NavigationManager.Uri);
            var queryParams = HttpUtility.ParseQueryString(uri.Query);
            var theme = queryParams["theme"];
            theme ??= DEFAULT_THEME;

            return theme;
        }

        private async Task SetTheme(string theme)
        {
            Theme = $"/css/{theme}.css";
            Console.WriteLine(Theme);
            await InvokeAsync(StateHasChanged);
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await InitMessageService();
                await JsRuntime.InvokeVoidAsync("TelerikMessageService.appLoaded", DotNetInstance);
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        public async void Dispose()
        {
            await DisposeMessageService();
        }

        private async Task InitMessageService()
        {
            DotNetInstance ??= DotNetObjectReference.Create(this);

            await JsRuntime.InvokeVoidAsync("TelerikMessageService.init", DotNetInstance);
        }

        private async Task DisposeMessageService()
        {
            // refer to https://github.com/dotnet/aspnetcore/issues/33535#issuecomment-861484714
            try
            {
                if (!IsDisposed)
                {
                    await JsRuntime.InvokeVoidAsync("TelerikMessageService.dispose", DotNetInstance);
                }
            }
            catch (Exception) { }

            DotNetInstance?.Dispose();
        }

        private string Theme { get; set; } = $"/css/{DEFAULT_THEME}.css";
    }
}
