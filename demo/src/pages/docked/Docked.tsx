import { useDocked } from "openfin-react-hooks";
import { _Window } from "openfin/_v2/api/window/window";
import * as Prism from "prismjs";
import React, { useEffect } from "react";
import uuidv4 from "uuid/v4";
import styles from "./Docked.module.css";

const codeExample = `import {useMaximized} from "openfin-react-hooks";

const Component = () => {
    const [isDocked, undock] = useDocked();

    return (
        <div>
            <div>Window is <strong>{isDocked ? "docked" : "not docked"}</strong></div>
            <button type="button" disabled={!isDocked} onClick={undock}>Undock Window</button>
        </div>
    )
}
`;

const Docked: React.FC = () => {
    const [isDocked, undock] = useDocked();

    const showNotification = () => {
        new window.fin.desktop.Notification({ url: "/dock-window.html", message: { securityId: "123456789b", messageText: "moved to the top" }, onMessage: (message: any) => console.log('you got a message!', message) });
    }

    useEffect(() => {
        Prism.highlightAll();

        let win: _Window;
        const createWindow = async () => {
            win = await window.fin.Window.create({
                autoShow: true,
                defaultHeight: 200,
                defaultWidth: 500,
                name: uuidv4(),
                url: "about:blank",
            });
        };

        createWindow();

        return () => {
            if (win) {
                win.close();
            }
        };

    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>useDocked</h1>
            <div className={styles.description}>
                Try docking / undocking the window to the opened child window to demonstrate this hook
            </div>
            <h2>Code Example</h2>
            <pre>
                <code className="language-jsx">
                    {codeExample}
                </code>
            </pre>
            <h2>Try it out</h2>
            <div>Window is <strong>{isDocked ? "docked" : "not docked"}</strong></div>
            <button type="button" disabled={!isDocked} onClick={undock}>Undock Window</button>
            <button type="button" onClick={() => showNotification()}>Show Notification</button>
        </div>
    );
};

export default Docked;
