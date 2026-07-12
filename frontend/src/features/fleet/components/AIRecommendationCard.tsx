import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, AlertTriangle, Settings, Droplet } from "lucide-react"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { AIRecommendation } from "../types"
import { cn } from "../../../shared/utils/cn"

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ recommendation }) => {
  const getIcon = () => {
    switch (recommendation.type) {
      case "Maintenance": return Settings;
      case "Fuel": return Droplet;
      case "Safety": return AlertTriangle;
      default: return Sparkles;
    }
  }

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="h-4 w-4 text-primary/40" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-2 rounded-lg mt-1",
              recommendation.priority === "High" ? "bg-danger-500/10 text-danger-500" :
              recommendation.priority === "Medium" ? "bg-warning-500/10 text-warning-500" :
              "bg-primary/10 text-primary"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="font-semibold text-text-primary flex items-center gap-2">
                {recommendation.title}
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                  recommendation.priority === "High" ? "bg-danger-500 text-white" :
                  recommendation.priority === "Medium" ? "bg-warning-500 text-white" :
                  "bg-primary text-white"
                )}>
                  {recommendation.priority}
                </span>
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                {recommendation.description}
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                  {recommendation.actionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
