import React from "react"
// import { Button } from "./ui/button"

// ===== Button Component =====
const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`text-white font-bold hover:text-deep-plum hover:bg-peach-pink p-0 flex items-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Contact = () => {
  return (
    <section className="py-20 bg-off-white" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-plum mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-deep-plum/80">
            Questions about ThriftUp? We'd love to hear from you!
          </p>
        </div>

        <div className="bg-yellow-grad p-8 rounded-2xl shadow-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-deep-plum">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="focus:border-hot-pink focus:ring-hot-pink bg-off-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-deep-plum">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="focus:border-hot-pink focus:ring-hot-pink bg-off-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-deep-plum">Message</Label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-input bg-off-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink focus-visible:ring-offset-2 text-deep-plum"
                placeholder="Tell us what you're thinking..."
              ></textarea>
            </div>

            <div className="text-center">
              <Button className="bg-cotton-candy-gradient cursor-pointer flex justify-center text-center rounded-2xl p-2.5 hover:opacity-90 text-white w-full md:w-auto shadow-lg transform hover:scale-105 transition-all duration-300">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// Input Component (pure JSX)
const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => (
  <input
    type={type}
    className={
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
      className
    }
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

// Label Component (pure JSX)
const Label = React.forwardRef(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 " +
      className
    }
    {...props}
  />
))
Label.displayName = "Label"
