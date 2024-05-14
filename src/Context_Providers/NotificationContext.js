import { createContext } from "react";

const NotificationContext = createContext({
    show : true,
    message: "",
    time : 0,
    messageType : "info",
    showMessage : ()=>{},
    hide : ()=>{}
})

export default NotificationContext;