const { app, BrowserWindow, TouchBar, Tray } = require("electron");

const { TouchBarButton, TouchBarSpacer } = TouchBar;
const primaryBackgroundColor = "#0f9d58";

let mainWindow;

const resetTouchBarButtonSelectedState = () => {
    contactsTouchBarButton.label = "👥";
    conversationsTouchBarButton.label = "💬";
    callTouchBarButton.label = "📞";
};

const contactsTouchBarButton = new TouchBarButton({
    label: "👥",
    click: () => {
        resetTouchBarButtonSelectedState();

        mainWindow.webContents.executeJavaScript("document.querySelector(\"div[data-tooltip=Contacts]\").click();");

        contactsTouchBarButton.label = "> 👥 <";
    },
});
const conversationsTouchBarButton = new TouchBarButton({
    label: "> 💬 <",
    click: () => {
        resetTouchBarButtonSelectedState();

        mainWindow.webContents.executeJavaScript("document.querySelector(\"div[data-tooltip=Conversations]\").click();");

        conversationsTouchBarButton.label = "> 💬 <";
    },
});
const callTouchBarButton = new TouchBarButton({
    label: "📞",
    click: () => {
        resetTouchBarButtonSelectedState();

        mainWindow.webContents.executeJavaScript("document.querySelector(\"div[data-tooltip~=téléphoniques]\").click();");

        callTouchBarButton.label = "> 📞 <";
    },
});

const newConversationTouchBarButton = new TouchBarButton({
    label: "✚",
    backgroundColor: primaryBackgroundColor,
    click: () => {
        console.log("newConversationTouchBarButton is not yet implemented");
        // mainWindow.webContents.executeJavaScript("document.querySelector(\"button\").click();");
    },
});
const mainTouchBar = new TouchBar([
    contactsTouchBarButton,
    conversationsTouchBarButton,
    callTouchBarButton,
    new TouchBarSpacer("large"),
    newConversationTouchBarButton,
]);


app.setName("Hangouts");
app.dock.setIcon("hangouts_64dp@2x.png");
app.setAboutPanelOptions({
    applicationName: "Google Hangouts",
    applicationVersion: "1",
    copyright: "floverdevel",
    credits: "Google",
    version: "1.0.0",
});
app.once("ready", () => {
    const appIcon = new Tray("hangouts_16dp@2x.png");
    appIcon.on("click", () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });

    mainWindow = new BrowserWindow({
        title: "Google Hangouts",
        frame: true,
        movable: true,
        width: 1280,
        height: 720,
        backgroundColor: "#000",
    });
    mainWindow.setTouchBar(mainTouchBar);
    mainWindow.loadURL("https://hangouts.google.com/");
});
