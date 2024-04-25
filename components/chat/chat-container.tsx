import { cookies } from "next/headers";
import { ChatLayout } from "./chat-layout";

const layout = cookies().get("react-resizable-panels:layout");
const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

const ChatContainer = () => {
    return ( 
        <div>
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={64} />
        </div>
     );
}
 
export default ChatContainer;