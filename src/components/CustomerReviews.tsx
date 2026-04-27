import { useState } from "react";
import { Star, ThumbsUp, User, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

const initialReviews: Review[] = [
  {
    id: "r1",
    author: "Rajesh K.",
    rating: 5,
    date: "12 Mar 2026",
    title: "Excellent picture quality!",
    body: "Setup was easy and the image quality is outstanding. Watching movies at home feels like a cinema now. Highly recommend for home theater enthusiasts.",
    helpful: 24,
    verified: true,
  },
  {
    id: "r2",
    author: "Priya S.",
    rating: 4,
    date: "28 Feb 2026",
    title: "Great value for the price",
    body: "Very good product overall. Works well in both dim and moderately lit rooms. The built-in speaker is decent but I'd recommend pairing with an external soundbar for the best experience.",
    helpful: 18,
    verified: true,
  },
  {
    id: "r3",
    author: "Amit D.",
    rating: 5,
    date: "15 Jan 2026",
    title: "Perfect for office presentations",
    body: "We bought 3 units for our conference rooms. Bright, sharp, and reliable. The team loves it. Delivery was super fast too.",
    helpful: 12,
    verified: true,
  },
  {
    id: "r4",
    author: "Sneha M.",
    rating: 3,
    date: "5 Jan 2026",
    title: "Good but fan noise is noticeable",
    body: "Picture quality is great, but the fan can be heard in quiet scenes. Eco mode helps a bit. Otherwise a solid purchase.",
    helpful: 9,
    verified: false,
  },
];

const RatingBar = ({ stars, percent }: { stars: number; percent: number }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="w-6 text-right text-muted-foreground">{stars}</span>
    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${percent}%` }} />
    </div>
    <span className="w-10 text-right text-xs text-muted-foreground">{percent}%</span>
  </div>
);

const StarRatingInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "h-7 w-7 transition-colors",
              s <= (hover || value) ? "text-warning fill-warning" : "text-muted-foreground/30"
            )}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {value === 1 ? "Poor" : value === 2 ? "Fair" : value === 3 ? "Good" : value === 4 ? "Very Good" : "Excellent"}
        </span>
      )}
    </div>
  );
};

interface CustomerReviewsProps {
  rating: number;
  reviewCount: number;
}

const CustomerReviews = ({ rating, reviewCount }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 0, title: "", body: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rating || !formData.title || !formData.body) {
      toast({ title: "Please fill all fields", description: "All fields including star rating are required.", variant: "destructive" });
      return;
    }
    const newReview: Review = {
      id: `r${Date.now()}`,
      author: formData.name,
      rating: formData.rating,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      title: formData.title,
      body: formData.body,
      helpful: 0,
      verified: false,
    };
    setReviews([newReview, ...reviews]);
    setFormData({ name: "", rating: 0, title: "", body: "" });
    setShowForm(false);
    toast({ title: "Review submitted!", description: "Thank you for your feedback." });
  };

  return (
    <div className="space-y-8">
      {/* Summary + Write Review button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Customer Reviews</h3>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Your Rating *</label>
            <StarRatingInput value={formData.rating} onChange={(v) => setFormData({ ...formData, rating: v })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Your Name *</label>
            <Input placeholder="e.g. Rajesh K." value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Review Title *</label>
            <Input placeholder="Summarize your experience" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Your Review *</label>
            <Textarea placeholder="Tell others what you think about this product..." rows={4} value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
          </div>
          <Button type="submit" className="gap-2">
            <Send className="h-4 w-4" /> Submit Review
          </Button>
        </form>
      )}

      {/* Summary */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <div className="text-5xl font-bold text-foreground mb-1">{rating}</div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={cn("h-5 w-5", s <= Math.round(rating) ? "text-warning fill-warning" : "text-muted")} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{reviewCount} ratings</p>
        </div>
        <div className="space-y-2 flex flex-col justify-center">
          <RatingBar stars={5} percent={62} />
          <RatingBar stars={4} percent={22} />
          <RatingBar stars={3} percent={10} />
          <RatingBar stars={2} percent={4} />
          <RatingBar stars={1} percent={2} />
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{review.author}</span>
                  {review.verified && (
                    <span className="text-[10px] font-medium bg-success/10 text-success px-1.5 py-0.5 rounded">Verified</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn("h-3.5 w-3.5", s <= review.rating ? "text-warning fill-warning" : "text-muted")} />
              ))}
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{review.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors">
              <ThumbsUp className="h-3.5 w-3.5" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
