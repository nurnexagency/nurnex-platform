"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallbackMessage?: string };
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[300px] p-8">
          <div className="bg-card border border-border rounded-xl p-8 max-w-md text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              Something went wrong
            </p>
            <p className="text-sm text-muted mb-4">
              {this.props.fallbackMessage ??
                "This section encountered an error. Please refresh the page."}
            </p>
            {this.state.message && (
              <p className="text-xs text-red-400 bg-red-900/10 rounded-lg p-3 break-words">
                {this.state.message}
              </p>
            )}
            <button
              onClick={() => this.setState({ hasError: false, message: "" })}
              className="mt-4 px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
