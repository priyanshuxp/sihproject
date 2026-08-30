"use client";

import React from "react";
import { RecommendationItem } from "@/types/platform";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Building2, BookOpen, Briefcase } from "lucide-react";

interface RecommendationCardProps {
  item: RecommendationItem;
  onAction?: (item: RecommendationItem) => void;
}

export function RecommendationCard({ item, onAction }: RecommendationCardProps) {
  const getEntityIcon = () => {
    switch (item.entityType) {
      case "job":
        return <Briefcase className="size-5 text-black" />;
      case "internship":
        return <Building2 className="size-5 text-black" />;
      case "course":
        return <BookOpen className="size-5 text-black" />;
      default:
        return <Sparkles className="size-5 text-black" />;
    }
  };

  return (
    <Card className="group rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200 flex flex-col justify-between">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-none bg-[#FFD93D] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              {getEntityIcon()}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-black">
              {item.entityType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={`text-[10px] font-black uppercase rounded-none border-2 border-black px-2 py-0.5 ${
                item.badgeType === "Paid"
                  ? "bg-[#FF6B6B] text-black"
                  : "bg-emerald-300 text-black"
              }`}
            >
              {item.badgeType.toUpperCase()}
            </Badge>
            <Badge className="text-[10px] font-black uppercase rounded-none border-2 border-black bg-[#FFD93D] text-black px-2 py-0.5">
              {item.matchScore}% Match
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-black text-black uppercase tracking-tight group-hover:text-[#FF6B6B] transition-colors">
            {item.title}
          </h4>
          <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mt-0.5">{item.organization}</p>
        </div>

        <p className="text-sm font-bold text-muted-foreground leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-none bg-[#FFFDF5] text-[11px] font-black uppercase text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <div className="px-6 pb-6 pt-0">
        <Button
          className="w-full font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all gap-2"
          onClick={() => onAction && onAction(item)}
        >
          {item.ctaText}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
