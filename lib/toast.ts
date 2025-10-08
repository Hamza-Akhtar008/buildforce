import toast from "react-hot-toast";

export const notifyError = (message: string) => toast.error(message, {
  position: 'top-right',  // Positioning at the top-right corner
  style: {
    background: 'rgba(255, 0, 0, 0.1)',  // Semi-transparent red background for error
    backdropFilter: 'blur(15px)',  // Stronger blur for the glass effect
    borderRadius: 'var(--radius)',  // Rounded corners from theme
    padding: '12px 20px',
    fontWeight: '500',
    color: 'var(--foreground)',  // Text color from theme
    border: '1px solid rgba(255, 0, 0, 0.2)',  // Soft red border for emphasis
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  // Subtle shadow for depth
    fontFamily: 'Inter, Arial, sans-serif',  // Modern font (Inter)
    transition: 'all 0.3s ease',  // Smooth transition for toast appearance
  },
});

export const notifySuccess = (message: string) => toast.success(message, {
  position: 'top-right',  // Positioning at the top-right corner
  style: {
    background: 'rgba(0, 204, 0, 0.1)',  // Semi-transparent green background for success
    backdropFilter: 'blur(15px)',  // Stronger blur for the glass effect
    borderRadius: 'var(--radius)',  // Consistent rounded corners with the theme
    padding: '12px 20px',
    fontWeight: '500',
    color: 'var(--foreground)',  // Text color from theme
    border: '1px solid rgba(0, 204, 0, 0.2)',  // Soft green border for emphasis
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  // Subtle shadow for depth
    fontFamily: 'Inter, Arial, sans-serif',  // Modern font (Inter)
    transition: 'all 0.3s ease',  // Smooth transition for toast appearance
  },
});
