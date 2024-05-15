import Cookies from "js-cookie";
import { ChatLayout } from "@/components/alm/chat/chat-layout";


const layout = Cookies.get(`react-resizable-panels:layout`);
const defaultLayout = layout ? JSON.parse(layout) : undefined;

const ChatContainer = ({ collapsedSidebar = true } : {collapsedSidebar ?: boolean}) => {
    return ( 
        <div>
            <ChatLayout defaultCollapsed={collapsedSidebar} defaultLayout={defaultLayout} navCollapsedSize={64} />
        </div>
     );
}
 
export default ChatContainer;