export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  content: string;
  lastUpdated: string;
  readingTime: number;
}

export interface DocCategory {
  title: string;
  slug: string;
  emoji?: string;
  articles: { title: string; slug: string }[];
}

export const navigation: DocCategory[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    emoji: "🚀",
    articles: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
      { title: "Quick Start", slug: "quick-start" },
    ],
  },
  {
    title: "Guides",
    slug: "guides",
    emoji: "📖",
    articles: [
      { title: "Authentication", slug: "authentication" },
      { title: "Error Handling", slug: "error-handling" },
      { title: "Rate Limiting", slug: "rate-limiting" },
      { title: "Webhooks", slug: "webhooks" },
      { title: "Pagination", slug: "pagination" },
    ],
  },
  {
    title: "API Reference",
    slug: "api-reference",
    emoji: "⚡",
    articles: [
      { title: "Users", slug: "users" },
      { title: "Products", slug: "products" },
    ],
  },
  {
    title: "Examples",
    slug: "examples",
    emoji: "💡",
    articles: [
      { title: "Basic Usage", slug: "basic-usage" },
    ],
  },
];

export const articles: Record<string, DocArticle> = {
  "introduction": {
    slug: "introduction",
    title: "Introduction",
    description: "Learn what Acme API is and how it can help you build amazing products.",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-01-06",
    readingTime: 3,
    content: `
# Introduction

Welcome to the Acme API documentation! Acme API is a powerful, developer-friendly platform that helps you build amazing products faster.

## What is Acme API?

Acme API provides a comprehensive set of tools and endpoints that enable you to:

- **Manage Users**: Create, update, and authenticate users with ease
- **Handle Products**: Full CRUD operations for your product catalog
- **Process Payments**: Secure payment processing with multiple providers
- **Send Notifications**: Email, SMS, and push notifications

## Why Choose Acme API?

### Developer Experience
We've built Acme API with developers in mind. Our SDKs are available in multiple languages, and our documentation includes real-world examples for every endpoint.

### Scalability
Whether you're a startup or an enterprise, Acme API scales with your needs. Our infrastructure handles millions of requests per day.

### Security
Security is our top priority. All API communications are encrypted, and we offer multiple authentication methods including OAuth 2.0 and API keys.

## Getting Help

If you need help, you have several options:

1. **Documentation**: You're already here! Browse through our comprehensive guides and API reference.
2. **Community**: Join our [Discord community](https://discord.gg/acme) to connect with other developers.
3. **Support**: For enterprise customers, reach out to our dedicated support team.

Ready to get started? Head over to the [Installation](/docs/installation) guide.
    `,
  },
  "installation": {
    slug: "installation",
    title: "Installation",
    description: "Step-by-step guide to installing the Acme API SDK in your project.",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-01-05",
    readingTime: 5,
    content: `
# Installation

Get the Acme API SDK installed in your project in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18.x or higher
- npm, yarn, or pnpm
- An Acme API account ([sign up here](https://acme.dev/signup))

## Install the SDK

Choose your preferred package manager:

\`\`\`bash
# Using npm
npm install @acme/api-sdk

# Using yarn
yarn add @acme/api-sdk

# Using pnpm
pnpm add @acme/api-sdk
\`\`\`

## Configuration

After installation, you'll need to configure the SDK with your API key:

\`\`\`javascript
import { AcmeClient } from '@acme/api-sdk';

const client = new AcmeClient({
  apiKey: process.env.ACME_API_KEY,
  environment: 'production', // or 'sandbox' for testing
});
\`\`\`

:::info
Never commit your API key to version control. Use environment variables instead.
:::

## Verify Installation

Test your installation by making a simple API call:

\`\`\`javascript
async function testConnection() {
  try {
    const status = await client.health.check();
    console.log('API Status:', status);
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testConnection();
\`\`\`

You should see a response like:

\`\`\`json
{
  "status": "healthy",
  "version": "3.0.0",
  "timestamp": "2026-01-06T10:30:00Z"
}
\`\`\`

## Next Steps

Now that you've installed the SDK, proceed to the [Quick Start](/docs/quick-start) guide to make your first API call.
    `,
  },
  "quick-start": {
    slug: "quick-start",
    title: "Quick Start",
    description: "Get up and running with Acme API in under 5 minutes.",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-01-06",
    readingTime: 4,
    content: `
# Quick Start

This guide will have you making API calls in under 5 minutes.

## Step 1: Get Your API Key

1. Log in to your [Acme Dashboard](https://dashboard.acme.dev)
2. Navigate to **Settings** → **API Keys**
3. Click **Create New Key**
4. Copy your key and store it securely

## Step 2: Initialize the Client

\`\`\`javascript
import { AcmeClient } from '@acme/api-sdk';

const client = new AcmeClient({
  apiKey: 'your-api-key-here',
});
\`\`\`

## Step 3: Make Your First Request

Let's create a user:

\`\`\`javascript
async function createUser() {
  const user = await client.users.create({
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
  });
  
  console.log('Created user:', user);
  return user;
}
\`\`\`

## Step 4: List All Users

\`\`\`javascript
async function listUsers() {
  const users = await client.users.list({
    limit: 10,
    offset: 0,
  });
  
  console.log('Users:', users.data);
  console.log('Total:', users.total);
}
\`\`\`

## Complete Example

Here's a complete example putting it all together:

\`\`\`javascript
import { AcmeClient } from '@acme/api-sdk';

const client = new AcmeClient({
  apiKey: process.env.ACME_API_KEY,
});

async function main() {
  // Create a new user
  const newUser = await client.users.create({
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'admin',
  });
  
  console.log('Created:', newUser);
  
  // Fetch the user by ID
  const user = await client.users.get(newUser.id);
  console.log('Fetched:', user);
  
  // Update the user
  const updated = await client.users.update(newUser.id, {
    name: 'Jane Doe',
  });
  console.log('Updated:', updated);
  
  // List all users
  const allUsers = await client.users.list();
  console.log('All users:', allUsers.data.length);
}

main().catch(console.error);
\`\`\`

## What's Next?

- Learn about [Authentication](/docs/authentication) to secure your API calls
- Explore the [API Reference](/docs/api-reference/users) for all available endpoints
- Check out [Examples](/docs/examples/basic-usage) for more use cases
    `,
  },
  "authentication": {
    slug: "authentication",
    title: "Authentication",
    description: "Learn how to authenticate your API requests securely.",
    category: "Guides",
    categorySlug: "guides",
    lastUpdated: "2026-01-04",
    readingTime: 6,
    content: `
# Authentication

Acme API supports multiple authentication methods to fit your use case.

## API Key Authentication

The simplest way to authenticate is with an API key:

\`\`\`javascript
const client = new AcmeClient({
  apiKey: 'your-api-key',
});
\`\`\`

Include the API key in the \`Authorization\` header:

\`\`\`bash
curl https://api.acme.dev/v1/users \\
  -H "Authorization: Bearer your-api-key"
\`\`\`

:::warning
API keys provide full access to your account. Keep them secret and never expose them in client-side code.
:::

## OAuth 2.0

For user-facing applications, we recommend OAuth 2.0:

### Step 1: Redirect to Authorization

\`\`\`javascript
const authUrl = client.oauth.getAuthorizationUrl({
  clientId: 'your-client-id',
  redirectUri: 'https://yourapp.com/callback',
  scope: ['users:read', 'users:write'],
});

// Redirect the user to authUrl
\`\`\`

### Step 2: Exchange Code for Token

\`\`\`javascript
const { accessToken, refreshToken } = await client.oauth.exchangeCode({
  code: 'authorization-code-from-callback',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://yourapp.com/callback',
});
\`\`\`

### Step 3: Use the Access Token

\`\`\`javascript
const client = new AcmeClient({
  accessToken: accessToken,
});

// Make authenticated requests
const user = await client.users.me();
\`\`\`

## Refresh Tokens

Access tokens expire after 1 hour. Use refresh tokens to get new access tokens:

\`\`\`javascript
const { accessToken: newToken } = await client.oauth.refreshToken({
  refreshToken: 'your-refresh-token',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});
\`\`\`

## Scopes

| Scope | Description |
|-------|-------------|
| \`users:read\` | Read user information |
| \`users:write\` | Create and update users |
| \`products:read\` | Read product catalog |
| \`products:write\` | Manage products |
| \`orders:read\` | View orders |
| \`orders:write\` | Create and manage orders |

## Best Practices

1. **Rotate keys regularly**: Generate new API keys every 90 days
2. **Use environment variables**: Never hardcode secrets
3. **Limit scopes**: Request only the permissions you need
4. **Monitor usage**: Check your dashboard for unusual activity
    `,
  },
  "error-handling": {
    slug: "error-handling",
    title: "Error Handling",
    description: "Learn how to handle API errors gracefully in your application.",
    category: "Guides",
    categorySlug: "guides",
    lastUpdated: "2026-01-03",
    readingTime: 5,
    content: `
# Error Handling

The Acme API uses standard HTTP status codes and returns detailed error messages.

## Error Response Format

All errors follow this structure:

\`\`\`json
{
  "error": {
    "code": "validation_error",
    "message": "The request body is invalid",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
\`\`\`

## HTTP Status Codes

| Code | Description |
|------|-------------|
| \`400\` | Bad Request - Invalid parameters |
| \`401\` | Unauthorized - Invalid or missing API key |
| \`403\` | Forbidden - Insufficient permissions |
| \`404\` | Not Found - Resource doesn't exist |
| \`409\` | Conflict - Resource already exists |
| \`422\` | Unprocessable Entity - Validation failed |
| \`429\` | Too Many Requests - Rate limit exceeded |
| \`500\` | Internal Server Error - Something went wrong |

## Error Codes

Common error codes you'll encounter:

- \`invalid_api_key\` - The API key is invalid or expired
- \`validation_error\` - Request validation failed
- \`resource_not_found\` - The requested resource doesn't exist
- \`rate_limit_exceeded\` - Too many requests
- \`insufficient_permissions\` - Missing required scope

## Handling Errors in JavaScript

\`\`\`javascript
import { AcmeClient, AcmeError } from '@acme/api-sdk';

const client = new AcmeClient({ apiKey: 'your-key' });

async function createUser(data) {
  try {
    const user = await client.users.create(data);
    return user;
  } catch (error) {
    if (error instanceof AcmeError) {
      switch (error.code) {
        case 'validation_error':
          console.error('Validation failed:', error.details);
          break;
        case 'rate_limit_exceeded':
          console.error('Rate limited. Retry after:', error.retryAfter);
          break;
        default:
          console.error('API error:', error.message);
      }
    } else {
      console.error('Network error:', error.message);
    }
    throw error;
  }
}
\`\`\`

## Retry Logic

For transient errors, implement exponential backoff:

\`\`\`javascript
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.code === 'rate_limit_exceeded' && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

// Usage
const user = await withRetry(() => client.users.get(userId));
\`\`\`

:::info
Our SDK includes built-in retry logic for rate limits and transient errors. You can configure this behavior in the client options.
:::
    `,
  },
  "rate-limiting": {
    slug: "rate-limiting",
    title: "Rate Limiting",
    description: "Understand and work with Acme API rate limits.",
    category: "Guides",
    categorySlug: "guides",
    lastUpdated: "2026-01-05",
    readingTime: 4,
    content: `
# Rate Limiting

Acme API implements rate limiting to ensure fair usage and maintain service stability for all users.

## Rate Limit Tiers

| Plan | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 600 | 50,000 |
| Enterprise | 6,000 | Unlimited |

## Rate Limit Headers

Every API response includes headers to help you track your usage:

\`\`\`
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 599
X-RateLimit-Reset: 1704531600
\`\`\`

## Handling Rate Limits

When you exceed the rate limit, the API returns a \`429 Too Many Requests\` response:

\`\`\`json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 45 seconds.",
    "retryAfter": 45
  }
}
\`\`\`

### Implementing Backoff

\`\`\`javascript
async function apiCallWithBackoff(fn) {
  try {
    return await fn();
  } catch (error) {
    if (error.code === 'rate_limit_exceeded') {
      const retryAfter = error.retryAfter || 60;
      console.log(\`Rate limited. Waiting \${retryAfter}s...\`);
      await sleep(retryAfter * 1000);
      return await fn();
    }
    throw error;
  }
}
\`\`\`

## Best Practices

1. **Cache responses**: Reduce API calls by caching data locally
2. **Use webhooks**: Subscribe to events instead of polling
3. **Batch requests**: Combine multiple operations when possible
4. **Monitor usage**: Track your rate limit headers
5. **Implement queuing**: Queue requests during high traffic periods

## Requesting Higher Limits

Enterprise customers can request custom rate limits. Contact sales@acme.dev to discuss your needs.
    `,
  },
  "webhooks": {
    slug: "webhooks",
    title: "Webhooks",
    description: "Receive real-time notifications when events occur in your account.",
    category: "Guides",
    categorySlug: "guides",
    lastUpdated: "2026-01-04",
    readingTime: 7,
    content: `
# Webhooks

Webhooks allow you to receive real-time notifications when events occur in your Acme account.

## Setting Up Webhooks

### 1. Create a Webhook Endpoint

First, create an endpoint in your application to receive webhook events:

\`\`\`javascript
import express from 'express';

const app = express();

app.post('/webhooks/acme', express.raw({ type: 'application/json' }), (req, res) => {
  const event = JSON.parse(req.body);
  
  console.log('Received event:', event.type);
  
  // Handle the event
  switch (event.type) {
    case 'user.created':
      handleUserCreated(event.data);
      break;
    case 'order.completed':
      handleOrderCompleted(event.data);
      break;
  }
  
  res.json({ received: true });
});
\`\`\`

### 2. Register Your Endpoint

Register your webhook endpoint in the Acme Dashboard or via API:

\`\`\`javascript
const webhook = await client.webhooks.create({
  url: 'https://yourapp.com/webhooks/acme',
  events: ['user.created', 'user.updated', 'order.completed'],
});
\`\`\`

## Verifying Signatures

Always verify webhook signatures to ensure requests are from Acme:

\`\`\`javascript
import crypto from 'crypto';

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhooks/acme', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-acme-signature'];
  
  if (!verifyWebhookSignature(req.body, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process the verified event
});
\`\`\`

## Available Events

| Event | Description |
|-------|-------------|
| \`user.created\` | A new user was created |
| \`user.updated\` | A user was updated |
| \`user.deleted\` | A user was deleted |
| \`order.created\` | A new order was placed |
| \`order.completed\` | An order was fulfilled |
| \`payment.succeeded\` | A payment was successful |
| \`payment.failed\` | A payment failed |

## Retry Policy

If your endpoint returns a non-2xx status code, we'll retry the webhook:

- 1st retry: 5 minutes
- 2nd retry: 30 minutes
- 3rd retry: 2 hours
- 4th retry: 24 hours

After 4 failed attempts, the webhook is marked as failed.
    `,
  },
  "pagination": {
    slug: "pagination",
    title: "Pagination",
    description: "Learn how to paginate through large data sets efficiently.",
    category: "Guides",
    categorySlug: "guides",
    lastUpdated: "2026-01-03",
    readingTime: 4,
    content: `
# Pagination

When working with large datasets, Acme API uses cursor-based pagination for optimal performance.

## Basic Pagination

All list endpoints support pagination with \`limit\` and \`offset\` parameters:

\`\`\`javascript
const users = await client.users.list({
  limit: 20,   // Number of items per page (max: 100)
  offset: 0,   // Number of items to skip
});

console.log(users.data);    // Array of users
console.log(users.total);   // Total count
console.log(users.hasMore); // Whether more items exist
\`\`\`

## Cursor-Based Pagination

For better performance with large datasets, use cursor-based pagination:

\`\`\`javascript
let cursor = null;
const allUsers = [];

do {
  const response = await client.users.list({
    limit: 100,
    cursor: cursor,
  });
  
  allUsers.push(...response.data);
  cursor = response.nextCursor;
} while (cursor);
\`\`\`

## Response Format

Paginated responses include metadata:

\`\`\`json
{
  "data": [...],
  "total": 1234,
  "limit": 20,
  "offset": 0,
  "hasMore": true,
  "nextCursor": "eyJpZCI6MTIzfQ=="
}
\`\`\`

## Sorting

Combine pagination with sorting:

\`\`\`javascript
const users = await client.users.list({
  limit: 20,
  sort: 'createdAt:desc',  // or 'name:asc'
});
\`\`\`

## Filtering

Apply filters to narrow results:

\`\`\`javascript
const activeUsers = await client.users.list({
  limit: 20,
  filter: {
    status: 'active',
    role: 'admin',
  },
});
\`\`\`

## Best Practices

1. **Use reasonable page sizes**: 20-100 items is optimal
2. **Prefer cursors for large datasets**: More efficient than offset
3. **Cache total counts**: Avoid recalculating on every request
4. **Implement infinite scroll**: Better UX for lists
    `,
  },
  "users": {
    slug: "users",
    title: "Users API",
    description: "Complete reference for the Users API endpoints.",
    category: "API Reference",
    categorySlug: "api-reference",
    lastUpdated: "2026-01-06",
    readingTime: 8,
    content: `
# Users API

The Users API allows you to create, read, update, and delete user accounts.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/v1/users\` | List all users |
| POST | \`/v1/users\` | Create a new user |
| GET | \`/v1/users/:id\` | Get a user by ID |
| PATCH | \`/v1/users/:id\` | Update a user |
| DELETE | \`/v1/users/:id\` | Delete a user |

## User Object

\`\`\`json
{
  "id": "usr_1234567890",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "user",
  "avatar": "https://cdn.acme.dev/avatars/usr_1234567890.jpg",
  "createdAt": "2026-01-06T10:30:00Z",
  "updatedAt": "2026-01-06T10:30:00Z"
}
\`\`\`
    `,
  },
  "products": {
    slug: "products",
    title: "Products API",
    description: "Complete reference for the Products API endpoints.",
    category: "API Reference",
    categorySlug: "api-reference",
    lastUpdated: "2026-01-05",
    readingTime: 7,
    content: `
# Products API

The Products API allows you to manage your product catalog.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/v1/products\` | List all products |
| POST | \`/v1/products\` | Create a new product |
| GET | \`/v1/products/:id\` | Get a product by ID |
| PATCH | \`/v1/products/:id\` | Update a product |
| DELETE | \`/v1/products/:id\` | Delete a product |

## Product Object

\`\`\`json
{
  "id": "prod_1234567890",
  "name": "Premium Widget",
  "description": "A high-quality widget for all your needs",
  "price": 29.99,
  "currency": "USD",
  "inventory": 150,
  "category": "widgets",
  "images": [
    "https://cdn.acme.dev/products/widget-1.jpg"
  ],
  "metadata": {},
  "createdAt": "2026-01-05T10:30:00Z",
  "updatedAt": "2026-01-05T10:30:00Z"
}
\`\`\`
    `,
  },
  "basic-usage": {
    slug: "basic-usage",
    title: "Basic Usage",
    description: "Real-world examples of common Acme API use cases.",
    category: "Examples",
    categorySlug: "examples",
    lastUpdated: "2026-01-04",
    readingTime: 6,
    content: `
# Basic Usage Examples

This guide covers common use cases with complete code examples.

## User Registration Flow

\`\`\`javascript
import { AcmeClient } from '@acme/api-sdk';

const client = new AcmeClient({
  apiKey: process.env.ACME_API_KEY,
});

async function registerUser(email, name, password) {
  // Create the user
  const user = await client.users.create({
    email,
    name,
    password,
    role: 'user',
  });
  
  // Send welcome email
  await client.emails.send({
    to: email,
    template: 'welcome',
    data: { name },
  });
  
  return user;
}
\`\`\`

## Product Catalog with Pagination

\`\`\`javascript
async function* getAllProducts() {
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await client.products.list({
      limit,
      offset,
      sort: 'createdAt:desc',
    });
    
    for (const product of response.data) {
      yield product;
    }
    
    if (response.data.length < limit) {
      break;
    }
    
    offset += limit;
  }
}

// Usage
for await (const product of getAllProducts()) {
  console.log(product.name);
}
\`\`\`

## Webhook Handler

\`\`\`javascript
import express from 'express';
import { AcmeWebhooks } from '@acme/api-sdk';

const app = express();
const webhooks = new AcmeWebhooks(process.env.WEBHOOK_SECRET);

app.post('/webhooks/acme', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-acme-signature'];
  
  try {
    const event = webhooks.verify(req.body, signature);
    
    switch (event.type) {
      case 'user.created':
        console.log('New user:', event.data.user);
        break;
      case 'order.completed':
        console.log('Order completed:', event.data.order);
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: 'Invalid signature' });
  }
});
\`\`\`

## Search with Filters

\`\`\`javascript
async function searchProducts(query, filters = {}) {
  const products = await client.products.search({
    query,
    filters: {
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      inStock: filters.inStock ?? true,
    },
    sort: 'relevance',
    limit: 20,
  });
  
  return products;
}

// Usage
const results = await searchProducts('widget', {
  category: 'electronics',
  minPrice: 10,
  maxPrice: 100,
});
\`\`\`
    `,
  },
};

// Build search index
export interface SearchResult {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  excerpt: string;
}

export function getSearchableContent(): SearchResult[] {
  return Object.values(articles).map(article => ({
    title: article.title,
    slug: article.slug,
    category: article.category,
    categorySlug: article.categorySlug,
    excerpt: article.content.replace(/[#*`]/g, '').substring(0, 200),
  }));
}

export function getArticle(slug: string): DocArticle | undefined {
  return articles[slug];
}

export function getNextPrevArticles(currentSlug: string): { prev?: { title: string; slug: string }; next?: { title: string; slug: string } } {
  const allArticles = navigation.flatMap(cat => cat.articles);
  const currentIndex = allArticles.findIndex(a => a.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? allArticles[currentIndex - 1] : undefined,
    next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined,
  };
}
