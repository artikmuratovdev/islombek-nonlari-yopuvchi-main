/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const InstallApp = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

        if (isStandalone || (window.navigator as any).standalone) {
            setShowButton(false);
            return;
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
        };

        const handleAppInstalled = () => {
            setShowButton(false);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            (deferredPrompt as any).prompt();
            (deferredPrompt as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                }
                setDeferredPrompt(null);
                setShowButton(false);
            });
        }
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleInstall}
            className="px-5 py-2 bg-white absolute top-3 right-3 z-10 rounded-lg text-main"
        >
            Install App
        </button>
    );
};
