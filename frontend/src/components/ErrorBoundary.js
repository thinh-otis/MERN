import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Cập nhật state để hiển thị fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Bạn có thể ghi lại lỗi ở đây
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Hiển thị UI fallback khi có lỗi
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary