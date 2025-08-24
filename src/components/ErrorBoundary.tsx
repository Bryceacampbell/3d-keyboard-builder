import { Component, type ReactNode, type ErrorInfo } from "react";
import type { ModelLoadError } from "@/types";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: "20px",
            background: "rgba(255, 0, 0, 0.1)",
            border: "1px solid #ff0000",
            borderRadius: "4px",
            color: "#ff0000",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          <h3>Something went wrong</h3>
          <details>
            <summary>Error Details</summary>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "11px" }}>
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ModelErrorBoundaryProps {
  children: ReactNode;
  modelPath?: string;
  onModelError?: (error: ModelLoadError) => void;
}

interface ModelErrorState {
  hasError: boolean;
  modelError?: ModelLoadError;
}

export class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorState
> {
  constructor(props: ModelErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ModelErrorState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const modelError: ModelLoadError = {
      path: (this.props.modelPath || "unknown") as any,
      message: error.message,
      timestamp: Date.now(),
    };

    this.setState({ modelError });
    this.props.onModelError?.(modelError);

    console.error(
      `Failed to load model: ${this.props.modelPath}`,
      error,
      errorInfo
    );
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            background: "rgba(255, 165, 0, 0.1)",
            border: "1px dashed #ffa500",
            borderRadius: "4px",
            color: "#ff8c00",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          <div>⚠️ Model failed to load</div>
          {this.props.modelPath && (
            <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "4px" }}>
              {this.props.modelPath}
            </div>
          )}
          <button
            onClick={this.handleRetry}
            style={{
              marginTop: "8px",
              padding: "4px 8px",
              background: "#ff8c00",
              color: "white",
              border: "none",
              borderRadius: "2px",
              fontSize: "10px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
