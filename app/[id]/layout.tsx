/**
 * Props
 */
type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * The root layout
 * @param children Children
 * @returns Node to render
 */
const JokeLayout = ({ children }: RootLayoutProps) => (
  <section className="mt-16">{children}</section>
);

export default JokeLayout;
