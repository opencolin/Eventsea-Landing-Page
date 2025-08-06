import { Building, Lightbulb, GraduationCap, Atom, Share2, Users } from "lucide-react";

export default function BuiltForSection() {
  const eventTypes = [
    {
      icon: Building,
      title: "Developer Conferences",
      description: "Large-scale summits, tech talks, and workshops",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "University Hackathons",
      description: "Student competitions, tech meetups, innovation labs",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-emerald-500"
    },
    {
      icon: Share2,
      title: "DAO Global Events",
      description: "Distributed community gatherings, crypto meetups",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-purple-500"
    },
    {
      icon: Atom,
      title: "Bio/AI/Crypto Demo Days",
      description: "Cutting-edge showcases, investor pitches, product launches",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Open Source Showcases",
      description: "Unconferences, contributor meetups, project showcases",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-teal-500"
    },
    {
      icon: Users,
      title: "Tech Meetups",
      description: "Local chapters, networking events, lightning talks",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      color: "bg-pink-500"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span className="text-sm text-purple-300 font-medium">Built For</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Perfect for tech
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              communities & events
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((eventType, index) => (
            <div key={index} className="relative group" data-testid={`event-type-${index}`}>
              <img 
                src={eventType.image} 
                alt={eventType.title} 
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-8 h-8 ${eventType.color} rounded-lg flex items-center justify-center`}>
                    <eventType.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">{eventType.title}</span>
                </div>
                <p className="text-slate-300">{eventType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
