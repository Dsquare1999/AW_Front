import Cookies from "js-cookie";
import { ChatLayout } from "@/components/alm/chat/chat-layout";


const layout = Cookies.get(`react-resizable-panels:layout`);
const defaultLayout = layout ? JSON.parse(layout) : undefined;

const ChatContainer = () => {
    return ( 
        <div>
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={64} />
        </div>
     );
}
 
export default ChatContainer;