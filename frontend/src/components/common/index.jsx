export const Spinner = ({ size = "md" }) => {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`${sizes[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`} />
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <Spinner size="lg" />
  </div>
);

export const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    {Icon && <Icon className="w-16 h-16 text-dark-muted mb-4" />}
    <h3 className="text-lg font-semibold text-dark-text mb-1">{title}</h3>
    {subtitle && <p className="text-dark-muted text-sm">{subtitle}</p>}
  </div>
);
