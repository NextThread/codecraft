export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  title: string;
  description: string;
  parameters?: ApiParameter[];
  requestBody?: {
    type: string;
    properties: ApiParameter[];
  };
  response: {
    status: number;
    body: string;
  };
  examples: {
    curl: string;
    javascript: string;
    python: string;
    ruby: string;
  };
}

export interface ApiResource {
  title: string;
  slug: string;
  description: string;
  baseUrl: string;
  endpoints: ApiEndpoint[];
}

export const apiResources: Record<string, ApiResource> = {
  users: {
    title: "Users",
    slug: "users",
    description: "Create, read, update, and delete user accounts.",
    baseUrl: "/v1/users",
    endpoints: [
      {
        method: "GET",
        path: "/v1/users",
        title: "List Users",
        description: "Returns a paginated list of all users in your account.",
        parameters: [
          { name: "limit", type: "integer", required: false, description: "Number of users to return (default: 20, max: 100)" },
          { name: "offset", type: "integer", required: false, description: "Number of users to skip (default: 0)" },
          { name: "sort", type: "string", required: false, description: "Sort order (e.g., 'createdAt:desc')" },
        ],
        response: {
          status: 200,
          body: `{
  "data": [
    {
      "id": "usr_1234567890",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}`,
        },
        examples: {
          curl: `curl https://api.acme.dev/v1/users \\
  -H "Authorization: Bearer your-api-key"`,
          javascript: `const users = await client.users.list({
  limit: 20,
  offset: 0,
});

console.log(users.data);`,
          python: `users = client.users.list(
    limit=20,
    offset=0
)

print(users.data)`,
          ruby: `users = client.users.list(
  limit: 20,
  offset: 0
)

puts users.data`,
        },
      },
      {
        method: "POST",
        path: "/v1/users",
        title: "Create User",
        description: "Creates a new user with the provided information.",
        requestBody: {
          type: "object",
          properties: [
            { name: "email", type: "string", required: true, description: "User's email address" },
            { name: "name", type: "string", required: true, description: "User's full name" },
            { name: "role", type: "string", required: false, description: "User role (default: 'user')" },
            { name: "password", type: "string", required: false, description: "User password (min 8 characters)" },
          ],
        },
        response: {
          status: 201,
          body: `{
  "id": "usr_1234567890",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}`,
        },
        examples: {
          curl: `curl -X POST https://api.acme.dev/v1/users \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }'`,
          javascript: `const user = await client.users.create({
  email: 'john@example.com',
  name: 'John Doe',
  role: 'user',
});

console.log(user.id);`,
          python: `user = client.users.create(
    email='john@example.com',
    name='John Doe',
    role='user'
)

print(user.id)`,
          ruby: `user = client.users.create(
  email: 'john@example.com',
  name: 'John Doe',
  role: 'user'
)

puts user.id`,
        },
      },
      {
        method: "GET",
        path: "/v1/users/:id",
        title: "Get User",
        description: "Retrieves a user by their unique ID.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The unique user ID" },
        ],
        response: {
          status: 200,
          body: `{
  "id": "usr_1234567890",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "user",
  "avatar": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}`,
        },
        examples: {
          curl: `curl https://api.acme.dev/v1/users/usr_1234567890 \\
  -H "Authorization: Bearer your-api-key"`,
          javascript: `const user = await client.users.get('usr_1234567890');

console.log(user.name);`,
          python: `user = client.users.get('usr_1234567890')

print(user.name)`,
          ruby: `user = client.users.get('usr_1234567890')

puts user.name`,
        },
      },
      {
        method: "PATCH",
        path: "/v1/users/:id",
        title: "Update User",
        description: "Updates an existing user with the provided fields.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The unique user ID" },
        ],
        requestBody: {
          type: "object",
          properties: [
            { name: "email", type: "string", required: false, description: "User's email address" },
            { name: "name", type: "string", required: false, description: "User's full name" },
            { name: "role", type: "string", required: false, description: "User role" },
          ],
        },
        response: {
          status: 200,
          body: `{
  "id": "usr_1234567890",
  "email": "john.updated@example.com",
  "name": "John Doe Updated",
  "role": "admin",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T12:00:00Z"
}`,
        },
        examples: {
          curl: `curl -X PATCH https://api.acme.dev/v1/users/usr_1234567890 \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe Updated",
    "role": "admin"
  }'`,
          javascript: `const user = await client.users.update('usr_1234567890', {
  name: 'John Doe Updated',
  role: 'admin',
});

console.log(user);`,
          python: `user = client.users.update(
    'usr_1234567890',
    name='John Doe Updated',
    role='admin'
)

print(user)`,
          ruby: `user = client.users.update(
  'usr_1234567890',
  name: 'John Doe Updated',
  role: 'admin'
)

puts user`,
        },
      },
      {
        method: "DELETE",
        path: "/v1/users/:id",
        title: "Delete User",
        description: "Permanently deletes a user. This action cannot be undone.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The unique user ID" },
        ],
        response: {
          status: 204,
          body: `// No content`,
        },
        examples: {
          curl: `curl -X DELETE https://api.acme.dev/v1/users/usr_1234567890 \\
  -H "Authorization: Bearer your-api-key"`,
          javascript: `await client.users.delete('usr_1234567890');

console.log('User deleted');`,
          python: `client.users.delete('usr_1234567890')

print('User deleted')`,
          ruby: `client.users.delete('usr_1234567890')

puts 'User deleted'`,
        },
      },
    ],
  },
  products: {
    title: "Products",
    slug: "products",
    description: "Manage your product catalog.",
    baseUrl: "/v1/products",
    endpoints: [
      {
        method: "GET",
        path: "/v1/products",
        title: "List Products",
        description: "Returns a paginated list of all products.",
        parameters: [
          { name: "limit", type: "integer", required: false, description: "Number of products to return (default: 20)" },
          { name: "offset", type: "integer", required: false, description: "Number of products to skip" },
          { name: "category", type: "string", required: false, description: "Filter by category" },
        ],
        response: {
          status: 200,
          body: `{
  "data": [
    {
      "id": "prod_1234567890",
      "name": "Premium Widget",
      "price": 29.99,
      "currency": "USD",
      "inventory": 150
    }
  ],
  "total": 156,
  "limit": 20,
  "offset": 0
}`,
        },
        examples: {
          curl: `curl https://api.acme.dev/v1/products \\
  -H "Authorization: Bearer your-api-key"`,
          javascript: `const products = await client.products.list({
  limit: 20,
  category: 'widgets',
});

console.log(products.data);`,
          python: `products = client.products.list(
    limit=20,
    category='widgets'
)

print(products.data)`,
          ruby: `products = client.products.list(
  limit: 20,
  category: 'widgets'
)

puts products.data`,
        },
      },
      {
        method: "POST",
        path: "/v1/products",
        title: "Create Product",
        description: "Creates a new product in your catalog.",
        requestBody: {
          type: "object",
          properties: [
            { name: "name", type: "string", required: true, description: "Product name" },
            { name: "description", type: "string", required: false, description: "Product description" },
            { name: "price", type: "number", required: true, description: "Price in cents" },
            { name: "currency", type: "string", required: false, description: "ISO currency code (default: USD)" },
            { name: "inventory", type: "integer", required: false, description: "Stock quantity" },
          ],
        },
        response: {
          status: 201,
          body: `{
  "id": "prod_1234567890",
  "name": "Premium Widget",
  "description": "A high-quality widget",
  "price": 29.99,
  "currency": "USD",
  "inventory": 100,
  "createdAt": "2024-01-15T10:30:00Z"
}`,
        },
        examples: {
          curl: `curl -X POST https://api.acme.dev/v1/products \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Premium Widget",
    "price": 2999,
    "inventory": 100
  }'`,
          javascript: `const product = await client.products.create({
  name: 'Premium Widget',
  price: 2999,
  inventory: 100,
});

console.log(product.id);`,
          python: `product = client.products.create(
    name='Premium Widget',
    price=2999,
    inventory=100
)

print(product.id)`,
          ruby: `product = client.products.create(
  name: 'Premium Widget',
  price: 2999,
  inventory: 100
)

puts product.id`,
        },
      },
    ],
  },
};
