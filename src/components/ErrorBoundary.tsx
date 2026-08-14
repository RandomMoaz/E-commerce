import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocale } from "../context/LocaleContext";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * The visible fallback. Split out as a function component so it can read the
 * active locale — class components can't use hooks.
 */
function ErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  const { t } = useLocale();
  return (
    <div className="section container state state--tall">
      <p className="state__title">{t("error.title")}</p>
      <p className="muted">{t("error.text")}</p>
      <pre className="error-details" dir="ltr">
        {error.message}
      </pre>
      <div className="pdp__actions">
        <button className="btn btn--primary btn--lg" onClick={onRetry}>
          {t("action.tryAgain")}
        </button>
        <button
          className="btn btn--ghost btn--lg"
          onClick={() => window.location.assign("/")}
        >
          {t("action.backHome")}
        </button>
      </div>
    </div>
  );
}

/**
 * Catches render-time errors anywhere below it so a single bad component
 * shows a recoverable message instead of blanking the whole app.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Swap this for your error reporting service (Sentry, etc.).
    console.error("ShopWave crashed:", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <ErrorFallback error={error} onRetry={() => this.setState({ error: null })} />
    );
  }
}
