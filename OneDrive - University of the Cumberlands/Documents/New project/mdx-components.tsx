import type { ComponentType } from "react";

type MDXComponents = Record<string, ComponentType<Record<string, unknown>> | string>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components
  };
}
