const fs = require("fs");
const path = require("path");

// Define the base path for Kendo theme files
const basePath = "node_modules/@progress/kendo-theme";

// Define the theme types and file names
const themeFiles = [
    {
        theme: "default",
        files:
            [
                "default-blue.css",
                "default-green.css",
                "default-main.css",
                "default-main-dark.css",
                "default-nordic.css",
                "default-ocean-blue.css",
                "default-ocean-blue-a11y.css",
                "default-orange.css",
                "default-purple.css",
                "default-turquoise.css",
                "default-urban.css"
            ]
    },
    {
        theme: "bootstrap",
        files:
            [
                "bootstrap-main.css",
                "bootstrap-main-dark.css",
                "bootstrap-nordic.css",
                "bootstrap-urban.css",
                "bootstrap-vintage.css"
            ]
    },
    {
        theme: "material",
        files:
            [
                "material-main.css",
                "material-main-dark.css",
                "material-arctic.css",
                "material-lime-dark.css",
                "material-nova.css"
            ]
    },
    {
        theme: "fluent",
        files:
            [
                "fluent-main.css",
                "fluent-main-dark.css"
            ]
    },
];

// Ensure the destination directory exists
const destinationDir = "wwwroot/css";
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

// Function to copy files for a given theme
function copyThemeFiles(theme, files) {
    files.forEach((file) => {
        const src = path.join(`${basePath}-${theme}`, "dist", file);
        const dest = path.join(destinationDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Copied ${src} to ${dest}`);
        } else {
            console.warn(`Warning: ${src} not found.`);
        }
    });
}

// Loop through all theme files and copy them
themeFiles.forEach(({ theme, files }) => {
    copyThemeFiles(theme, files);
});
