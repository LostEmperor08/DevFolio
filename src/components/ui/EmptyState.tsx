import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = "No Data Found", 
  description = "There is currently no information available for this section." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full text-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm border-dashed">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <FileQuestion className="w-6 h-6 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md">
        {description}
      </p>
    </div>
  );
}
