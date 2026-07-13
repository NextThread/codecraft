import { useParams } from 'react-router-dom';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { TabbedCodeBlock } from '@/components/docs/TabbedCodeBlock';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { MethodBadge } from '@/components/docs/MethodBadge';
import { apiResources } from '@/data/apiReference';

export default function ApiReferencePage() {
  const { resource = 'users' } = useParams();
  const api = apiResources[resource];

  if (!api) {
    return <DocsLayout><div className="text-center py-16"><h1>API Resource Not Found</h1></div></DocsLayout>;
  }

  return (
    <DocsLayout>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{api.title} API</h1>
        <p className="text-muted-foreground">{api.description}</p>
        <div className="mt-4 px-4 py-2 bg-muted rounded-lg font-mono text-sm">Base URL: {api.baseUrl}</div>
      </header>

      <div className="space-y-16">
        {api.endpoints.map((endpoint, idx) => (
          <section key={idx} className="scroll-mt-24" id={endpoint.title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex items-center gap-3 mb-4">
              <MethodBadge method={endpoint.method} />
              <code className="text-lg font-mono">{endpoint.path}</code>
            </div>
            <h2 className="text-2xl font-bold mb-2">{endpoint.title}</h2>
            <p className="text-muted-foreground mb-6">{endpoint.description}</p>

            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Parameters</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="bg-muted"><th className="text-left p-3 text-sm font-semibold">Name</th><th className="text-left p-3 text-sm font-semibold">Type</th><th className="text-left p-3 text-sm font-semibold">Required</th><th className="text-left p-3 text-sm font-semibold">Description</th></tr></thead>
                    <tbody>
                      {endpoint.parameters.map((param) => (
                        <tr key={param.name} className="border-t border-border">
                          <td className="p-3 font-mono text-sm">{param.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{param.type}</td>
                          <td className="p-3 text-sm">{param.required ? <span className="text-destructive">Required</span> : 'Optional'}</td>
                          <td className="p-3 text-sm text-muted-foreground">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {endpoint.requestBody && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Request Body</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="bg-muted"><th className="text-left p-3 text-sm font-semibold">Field</th><th className="text-left p-3 text-sm font-semibold">Type</th><th className="text-left p-3 text-sm font-semibold">Required</th><th className="text-left p-3 text-sm font-semibold">Description</th></tr></thead>
                    <tbody>
                      {endpoint.requestBody.properties.map((prop) => (
                        <tr key={prop.name} className="border-t border-border">
                          <td className="p-3 font-mono text-sm">{prop.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{prop.type}</td>
                          <td className="p-3 text-sm">{prop.required ? <span className="text-destructive">Required</span> : 'Optional'}</td>
                          <td className="p-3 text-sm text-muted-foreground">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Code Examples</h3>
              <TabbedCodeBlock examples={[
                { language: 'bash', label: 'cURL', code: endpoint.examples.curl },
                { language: 'javascript', label: 'JavaScript', code: endpoint.examples.javascript },
                { language: 'python', label: 'Python', code: endpoint.examples.python },
                { language: 'ruby', label: 'Ruby', code: endpoint.examples.ruby },
              ]} />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Response ({endpoint.response.status})</h3>
              <CodeBlock code={endpoint.response.body} language="json" />
            </div>
          </section>
        ))}
      </div>
    </DocsLayout>
  );
}
