// import { Badge } from "./ui/badge"
import { MessageSquare, Heart, Users } from "lucide-react"
// import { Button } from "./ui/button"
import React from "react"
import Link from "next/link";

// ===== Badge Component =====
const Badge = ({ className = '', children, ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// ===== Button Component =====
const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`text-white font-bold cursor-pointer hover:text-deep-plum hover:bg-peach-pink p-0 flex items-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const discussionTopics = [
  {
    title: "Sustainable Fashion Trends 2025",
    description: "What are your predictions for sustainable fashion trends this year?",
    comments: 42,
    likes: 128,
    tag: "Trends"
  },
  {
    title: "Upcycling Old Jeans into New Looks",
    description: "Share your creative ideas for transforming old denim into fashionable new pieces.",
    comments: 38,
    likes: 95,
    tag: "DIY"
  },
  {
    title: "Finding Hidden Gems at Thrift Stores",
    description: "Tips and tricks for spotting valuable vintage pieces when thrifting.",
    comments: 27,
    likes: 83,
    tag: "Tips"
  },
  {
    title: "Building a Capsule Wardrobe with Thrifted Items",
    description: "How to create a versatile wardrobe with secondhand clothes.",
    comments: 35,
    likes: 112,
    tag: "Wardrobe"
  }
]

const merge = (...classes) => classes.filter(Boolean).join(" ")

export const Community = () => {
  return (
    <section className="py-20 bg-yellow-grad" id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-plum mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-deep-plum/80 max-w-3xl mx-auto">
            Connect with like-minded women passionate about sustainable fashion and thrifting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discussionTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 bg-off-white border-peach-pink">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-peach-pink text-deep-plum">
                    {topic.tag}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-deep-plum">{topic.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-deep-plum/70">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-deep-plum/60">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-hot-pink" />
                    <span>{topic.comments} comments</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-hot-pink" />
                    <span>{topic.likes} likes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-hot-pink text-hot-pink hover:bg-peach-pink">View Discussion</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center text-center mt-12">
          <Link href='/community'>
            <Button className="text-white bg-cotton-candy-gradient rounded-2xl p-2.5 hover:opacity-90 cursor-pointer flex justify-center items-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <Users className="mr-2 h-4 w-4 font-bold" />
              Explore All Discussions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Card Components (Pure JS with React.forwardRef)

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={merge("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={merge("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"
