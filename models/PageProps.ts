/**
 * Page props
 */
export interface PageProps {
  /**
   * Page params
   */
  params: { id: string };

  /**
   * Page saerch params
   */
  searchParams: { [key: string]: string | string[] | undefined };
}
