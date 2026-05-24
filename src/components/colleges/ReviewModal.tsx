"use client";

import { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewModal({
  collegeId,
  collegeName,
  onClose,
}: {
  collegeId: string;
  collegeName: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please provide a rating out of 5 stars.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a review comment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/colleges/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId, rating, comment, batch }),
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review");
      }
      
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-elevated relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border bg-muted/50">
          <h2 className="font-bold text-lg text-foreground">Review {collegeName}</h2>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-background transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Your Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-muted-foreground/30"
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Graduating Batch (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., 2024"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Review Comment</label>
            <textarea 
              placeholder="What do you think about the faculty, campus, and placements?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[120px] rounded-lg border border-border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
            />
          </div>
          
          <div className="pt-2 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 h-11 rounded-lg bg-muted text-foreground font-bold text-sm hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
