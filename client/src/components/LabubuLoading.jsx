const LabubuLoading = ({
  size = "medium",
  text = "",
  textColor = "hsl(var(--muted-foreground))",
}) => {
  const sizeClass = {
    small: "w-10 h-10 text-2xl",
    medium: "w-16 h-16 text-4xl",
    large: "w-24 h-24 text-6xl",
  }[size];

  const textSizeClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }[size];

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizeClass} flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-labubu animate-pulse-slow`}
      >
        <span role="img" aria-label="Labubu teddy bear">🧸</span>
      </div>
      {text && (
        <p className={`${textSizeClass} font-medium text-center`} style={{ color: textColor }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LabubuLoading; 