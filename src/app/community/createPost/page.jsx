"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Hash, Type, MessageSquare, X } from "lucide-react";
import { useSession } from "next-auth/react";

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
const merge = (...classes) => classes.filter(Boolean).join(" ")
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

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"


function useToast() {
  const timeoutRef = useRef(null);

  const toast = useCallback(({ title, description, variant = "default" }) => {
    const toastId = Math.random().toString(36).substring(7);
    const toastElement = document.createElement("div");
    toastElement.className = `fixed top-6 right-6 z-[1000] max-w-xs p-4 rounded-lg shadow-md text-white text-sm transition-all duration-500 ${
      variant === "destructive" ? "bg-red-500" : "bg-deep-plum"
    }`;
    toastElement.innerHTML = `
      <strong class="block font-semibold">${title}</strong>
      <span class="block mt-1">${description}</span>
    `;
    document.body.appendChild(toastElement);

    timeoutRef.current = setTimeout(() => {
      toastElement.classList.add("opacity-0");
      setTimeout(() => {
        toastElement.remove();
      }, 500);
    }, 3000);
  }, []);

  return { toast };
}

const CreatePost = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularTags = [
    "SustainableFashion",
    "ThriftFinds",
    "VintageLook",
    "UpcycledFashion",
    "ThriftTips",
    "SecondHand",
    "OOTD",
    "ThriftHaul",
  ];

  const addTag = (tag) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const session = useSession();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim() || !content.trim()) {
    toast({ title: "Missing fields", description: "Fill in all fields.", variant: "destructive" });
    return;
  }

  const res = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      tags,
      authorEmail: session?.data?.user?.email,
      authorName: session?.data?.user?.name,
    }),
  });
   if (res.ok) {
    toast({ title: "Post created!", description: "Successfully added your post." });
    router.push("/community");
  }
};


  

  return (
    <div className="min-h-screen bg-off-white">
      <Button
              variant="ghost"
              onClick={() => router.push("/community")}
              className="text-deep-plum hover:bg-peach-pink/50 hover:text-hot-pink pt-10 pl-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </Button>

      <div className="pt-10 pb-16 bg-gradient-to-b from-butter-yellow/20 to-peach-pink/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
           
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-hot-pink mb-4">
              Start a New Discussion
            </h1>
            <p className="text-lg text-deep-plum/80">
              Share your thoughts, tips, or questions with the ThriftUp community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <form onSubmit={handleSubmit} >
          <Card className="bg-off-white border-2 border-peach-pink shadow-lg px-5 py-2.5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hot-pink">
                <MessageSquare className="h-5 w-5 text-hot-pink" />
                Create Your Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-deep-plum font-medium">
                  <Type className="h-4 w-4" />
                  Discussion Title
                </label>
                
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What would you like to discuss?"
                  className="w-full border border-peach-pink focus:border-hot-pink focus:ring-hot-pink bg-off-white text-deep-plum p-2 rounded-md"
                  maxLength={100}
                />
                <p className="text-xs text-deep-plum/60">{title.length}/100 characters</p>
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-deep-plum font-medium">
                  <MessageSquare className="h-4 w-4" />
                  Your Message
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, experiences, tips, or questions with the community..."
                  className="w-full min-h-[200px] border border-peach-pink focus:border-hot-pink focus:ring-hot-pink bg-off-white text-deep-plum resize-none p-2 rounded-md"
                  maxLength={2000}
                />
                <p className="text-xs text-deep-plum/60">{content.length}/2000 characters</p>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-deep-plum font-medium">
                  <Hash className="h-4 w-4" />
                  Tags (Optional)
                </label>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-peach-pink text-deep-plum flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-hot-pink/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  )}

                <div className="flex gap-2">
                  
                  <input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(currentTag);
                      }
                    }}
                    placeholder="Add a custom tag..."
                    className="w-1/2 p-2 rounded-md border border-peach-pink focus:border-hot-pink focus:ring-hot-pink bg-off-white text-deep-plum"
                    maxLength={20}
                    disabled={tags.length >= 5}
                  />
                   <Button
                    type="button"
                    onClick={() => addTag(currentTag)}
                    disabled={!currentTag || tags.length >= 5}
                    variant="outline"
                    className="btn-primary ml-5"
                  >
                    Add
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-deep-plum/70 mb-2">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addTag(tag)}
                        disabled={tags.includes(tag) || tags.length >= 5}
                        className="text-xs rounded-2xl bg-peach-pink px-2 py-1 text-deep-plum hover:bg-peach-pink/50 hover:text-hot-pink"
                      >
                        #{tag}
                      </Button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-deep-plum/60">You can add up to 5 tags</p>
              </div>

              
              <div className="flex gap-4 pt-6 border-t border-peach-pink">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/community")}
                  className="btn-secondary mr-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="btn-primary"
                >
                  {isSubmitting ? "Posting..." : "Post Discussion"}
                </Button>
              </div>
            </CardContent>
            </Card>
        </form>

        <Card className="mt-8 bg-off-white border-peach-pink border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-deep-plum">💡 Tips for Great Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-deep-plum/70">
              <li>• Be specific and descriptive in your title</li>
              <li>• Share personal experiences and tips</li>
              <li>• Ask questions to encourage engagement</li>
              <li>• Use relevant tags to help others find your post</li>
              <li>• Be respectful and supportive of all community members</li>
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default CreatePost;
