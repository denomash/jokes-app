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
const LoginLayout = ({ children }: RootLayoutProps) => (
  <section className="flex-center w-full h-[calc(80vh)]	">
    <div className="w-96 p-6 shadow-2xl bg-white rounded-md border-b-8	border-b-pink-600">{children}</div>
  </section>
);

export default LoginLayout;
