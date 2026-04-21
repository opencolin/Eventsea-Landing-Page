import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Organizers from "@/pages/organizers";
import Sponsors from "@/pages/sponsors";
import Builders from "@/pages/builders";
import Events from "@/pages/events";
import Pricing from "@/pages/pricing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/organizers" component={Organizers}/>
      <Route path="/sponsors" component={Sponsors}/>
      <Route path="/builders" component={Builders}/>
      <Route path="/events" component={Events}/>
      <Route path="/pricing" component={Pricing}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
