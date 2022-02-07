// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  accessToken?: string;
  siteId?: string;
};

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  path: Array<string | number>;
  message: string;
  extensions: Record<string, unknown>;
};

export type ExampleQueryInput = { owner: string; name: string; first: number };

export type ExampleQuery = {
  /**
   * Any data from the function will be returned here
   */
  data: {
    gitHub: {
      /**
       * Lookup a given repository by the owner and repository name.
       */
      repository: {
        /**
         * A list of issues that have been opened in the repository.
         */
        issues: {
          /**
           * A list of nodes.
           */
          nodes: Array<{
            /**
             * The actor who authored the comment.
             */
            author: {
              /**
               * The username of the actor.
               */
              login: string;
            };
            id: string;
            /**
             * Identifies the issue title.
             */
            title: string;
            /**
             * The HTTP URL for this issue
             */
            url: string;
            /**
             * The body rendered to HTML.
             */
            bodyHTML: unknown;
          }>;
        };
      };
    };
  };
  /**
   * Any errors from the function will be returned here
   */
  errors: Array<GraphQLError>;
};

/**
 * List GitHub Issues
 */
export function fetchExampleQuery(
  variables: ExampleQueryInput,
  options?: NetlifyGraphFunctionOptions
): Promise<ExampleQuery>;
