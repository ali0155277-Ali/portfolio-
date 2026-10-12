import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('The application encountered a rendering error.', error, errorInfo)
    }

    render() {
        if (this.state.error) {
            return (
                <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-bg)] px-6 py-12 text-[var(--color-text-primary)]">
                    <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl">
                        <h1 className="text-xl font-bold">Something went wrong</h1>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                            The portfolio could not be displayed. Please reload the page.
                        </p>
                        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-black/10 p-3 text-sm">
                            {this.state.error.message}
                        </pre>
                    </div>
                </main>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
