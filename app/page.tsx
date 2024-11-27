import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/dashboard/Dashboard";
export default function Home() {
  return (
    <div className="h-svh flex-col flex">
      {/* <WrappedMail
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
        /> */}
      <Dashboard posts={[]} defaultLayout={undefined}></Dashboard>
    </div>
  );
}

// <div>
//   <ModeToggle />
//   <Button>Hello</Button>
// </div>
