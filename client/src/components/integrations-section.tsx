import { Link, Zap, CheckCircle } from "lucide-react";

export default function IntegrationsSection() {
  const integrations = [
    { name: "Luma", description: "Tickets & RSVPs", color: "bg-orange-500", hoverColor: "hover:border-orange-500/30" },
    { name: "DocuSign", description: "Contracts", color: "bg-yellow-500", hoverColor: "hover:border-yellow-500/30" },
    { name: "Stripe", description: "Payments", color: "bg-purple-600", hoverColor: "hover:border-purple-500/30" },
    { name: "Resend", description: "Email API", color: "bg-green-500", hoverColor: "hover:border-green-500/30" },
    { name: "Slack", description: "Team Alerts", color: "bg-blue-500", hoverColor: "hover:border-blue-500/30" },
    { name: "Notion", description: "Planning Sync", color: "bg-red-500", hoverColor: "hover:border-red-500/30" }
  ];

  const workflowSteps = [
    {
      icon: Link,
      title: "Setup Once",
      description: "Connect your favorite tools in minutes",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "AI Automates",
      description: "EventPilot handles the cross-platform workflows",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: CheckCircle,
      title: "You Focus",
      description: "On creating amazing experiences for attendees",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            <span className="text-sm text-blue-300 font-medium">Works With</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Seamlessly integrates
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              with your stack
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            EventPilot connects with the tools you already use, creating a unified workflow for event management.
          </p>
        </div>

        {/* Integration logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <div key={index} className={`glass rounded-xl p-6 flex flex-col items-center justify-center ${integration.hoverColor} transition-all group`} data-testid={`integration-${index}`}>
              <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <span className="text-white font-bold text-lg">{integration.name[0]}</span>
              </div>
              <span className="text-sm font-medium text-slate-300">{integration.name}</span>
              <span className="text-xs text-slate-500 text-center mt-1">{integration.description}</span>
            </div>
          ))}
        </div>

        {/* Integration workflow */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">One workflow, endless possibilities</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {workflowSteps.map((step, index) => (
                <div key={index} data-testid={`workflow-step-${index}`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-slate-300 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
