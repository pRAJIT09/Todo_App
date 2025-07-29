export function Spinner({ size = 24 }) {
  return (
    <div
      className="inline-block animate-spin rounded-full border-4 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
    />
  );
}