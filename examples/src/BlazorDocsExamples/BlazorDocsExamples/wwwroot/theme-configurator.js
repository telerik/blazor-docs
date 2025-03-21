const createAppLoadingMessage = (loading) => ({
    type: "loading",
    loading
});

// Don't show loader
const APP_LOADED_TRUE = createAppLoadingMessage(false);

// Show loader
const APP_LOADED_FALSE = createAppLoadingMessage(true);

// Needed for PostMessage allowedOrigin
const uris = {
    "https://demos.telerik.com": "https://www.telerik.com",
    "https://sitdemos.telerik.com": "https://wwwsit.telerik.com",
    "https://localhost:7170": "http://localhost:8000"
}

window.TelerikMessageService = window.TelerikMessageService || (function () {
    return {
        init: function (DotNetInstance) {
            window.TelerikMessageService.DotNetInstance = DotNetInstance;
            window.addEventListener('message', this.onMessage);
        },
        dispose: function () {
            window.removeEventListener('message', this.onMessage);
        },
        appLoaded: function () {
            // Limit posting the message to allowed origins only depending on the enviroment
            window.parent.postMessage(APP_LOADED_TRUE, uris[window.origin]);
        },
        loadTheme: async function (themeId) {
            // theme is set entirely in the demo app.
        },
        onMessage(event) {
            if (!event.origin === uris[window.origin]) {
                return;
            }

            const eventType = event.data.type;

            if (eventType === 'theme-changed') {
                window.parent.postMessage(APP_LOADED_FALSE, uris[window.origin]);

                window.TelerikMessageService.loadTheme(event.data.themeId).then(() => {

                    const xurl = (new URL(window.location.toString()));
                    xurl.searchParams.delete('theme');
                    xurl.searchParams.set("theme", event.data.themeId);

                    window.history.pushState({}, "", xurl.toString());
                    window.location.reload();

                });
            }
        }
    }
}());