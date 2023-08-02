import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-4xl h-full w-full">
      {/* <Navbar /> */}

      <main>{children}</main>
    </div>
  );
};

export default ChatLayout;
