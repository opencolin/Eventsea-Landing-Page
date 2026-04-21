export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>
            
            <blockquote className="text-2xl lg:text-3xl font-medium leading-relaxed mb-8 text-slate-200" data-testid="testimonial-quote">
              "We used to juggle 5 tools to run a hackathon. Now we just tell Eventsy what kind of event we're running — and it builds the whole plan for us."
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Community organizer headshot" 
                className="w-12 h-12 rounded-full object-cover"
                data-testid="testimonial-avatar"
              />
              <div className="text-left">
                <div className="font-semibold text-white" data-testid="testimonial-author">Community Organizer</div>
                <div className="text-slate-400 text-sm" data-testid="testimonial-company">Frontier Tower SF</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
