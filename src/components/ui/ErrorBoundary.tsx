"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl glass-panel border border-red-500/20 bg-red-500/5">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-4 opacity-80" />
          <h2 className="text-lg font-bold text-foreground mb-2">Component Error</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Something went wrong while loading this section.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
