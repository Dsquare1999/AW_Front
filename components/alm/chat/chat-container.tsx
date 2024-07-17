import Cookies from "js-cookie";
import { ChatLayout } from "@/components/alm/chat/chat-layout";
import Section from "@/components/common/Section";

const layout = Cookies.get(`react-resizable-panels:layout`);
const defaultLayout = layout ? JSON.parse(layout) : undefined;

const ChatContainer = ({
  collapsedSidebar = true,
}: {
  collapsedSidebar?: boolean;
}) => {
  return (
    <Section title="Chat" description="This is a chat section ...">
      <ChatLayout
        defaultCollapsed={collapsedSidebar}
        defaultLayout={defaultLayout}
        navCollapsedSize={64}
      />
    </Section>
  );
};

export default ChatContainer;
