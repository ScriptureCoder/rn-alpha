# Hook Usage Examples

This document provides comprehensive examples of how to use the data fetching and mutation hooks in `rn-alpha`, including advanced features like Content-Type switching, request cancellation, and error handling.

## Table of Contents

- [useQuery - Data Fetching with Cache](#usequery---data-fetching-with-cache)
- [useQueryAsync - Async Data Fetching](#usequeryasync---async-data-fetching)
- [useMutation - Data Mutations](#usemutation---data-mutations)
- [useMutationAsync - Async Mutations](#usemutationasync---async-mutations)
- [Content-Type Examples](#content-type-examples)
- [Request Cancellation](#request-cancellation)
- [Advanced Patterns](#advanced-patterns)

---

## useQuery - Data Fetching with Cache

### Basic Usage

```typescript
import { useQuery } from '@scripturecoder/rn-alpha';

function UserProfile() {
  const { data, loading, error, refetch } = useQuery('getUser', {
    variables: { userId: '123' }
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ProfileView user={data} onRefresh={refetch} />;
}
```

### Network Policies

Control when data is fetched:

```typescript
// Cache-first (default): Use cache if available, otherwise fetch
const { data } = useQuery('getUsers', {
  networkPolicy: 'cache-first'
});

// Network-only: Always fetch from network
const { data } = useQuery('getUsers', {
  networkPolicy: 'network-only'
});

// Cache-only: Never fetch, only use cache
const { data } = useQuery('getUsers', {
  networkPolicy: 'cache-only'
});

// Network-and-cache: Show cache while fetching fresh data
const { data } = useQuery('getUsers', {
  networkPolicy: 'network-and-cache'
});
```

### Callbacks

```typescript
const { data } = useQuery('getUser', {
  variables: { userId: '123' },
  onCompleted: (data) => {
    console.log('User loaded:', data);
  },
  onError: (error, status) => {
    console.error('Failed to load user:', error, status);
  }
});
```

### Cache Manipulation

```typescript
const { 
  data, 
  update,      // Replace entire cache
  updateValue, // Update single field
  updateItem,  // Update array item by id
  deleteItem,  // Remove array item by id
  prepend,     // Add to start of array
  append       // Add to end of array
} = useQuery('getUsers');

// Update entire data
update({ name: 'John', age: 30 });

// Update single field
updateValue('name', 'Jane');

// Update multiple fields
updateValues({ name: 'Jane', age: 25 });

// Update item in array
updateItem('user-123', { name: 'Updated Name' });

// Delete item from array
deleteItem('user-123');

// Add to start
prepend({ id: 'new-1', name: 'New User' });

// Add to end
append({ id: 'new-2', name: 'Another User' });
```

### Pagination

```typescript
const { data, fetchMore } = useQuery('getPosts', {
  variables: { page: 1, limit: 10 }
});

// Load more and append
const loadMore = async () => {
  await fetchMore(
    { page: 2, limit: 10 },
    'end' // 'start' | 'end' | 'pagination'
  );
};

// Pagination with key
const { data, fetchMore } = useQuery('getPosts');

const loadNextPage = async () => {
  await fetchMore(
    { page: 2 },
    'pagination',
    'data' // The key containing the array in response
  );
};
```

### Request Cancellation

```typescript
import { useEffect } from 'react';

function SearchResults({ searchTerm }) {
  const { data, loading, abort } = useQuery('searchUsers', {
    variables: { query: searchTerm }
  });

  // Abort when component unmounts or search term changes
  useEffect(() => {
    return () => abort(); // Cleanup
  }, [searchTerm]);

  // Manual abort
  const handleCancel = () => {
    abort();
  };

  return (
    <View>
      {loading && <Button onPress={handleCancel}>Cancel</Button>}
      <Results data={data} />
    </View>
  );
}
```

---

## useQueryAsync - Async Data Fetching

### Basic Usage

```typescript
import { useQueryAsync } from '@scripturecoder/rn-alpha';

function UserActions() {
  const fetchUser = useQueryAsync();

  const handleFetch = async () => {
    const result = await fetchUser('getUser', { userId: '123' });
    
    if ('error' in result) {
      console.error('Error:', result.error);
    } else {
      console.log('User:', result.data);
    }
  };

  return <Button onPress={handleFetch}>Fetch User</Button>;
}
```

### With Custom Auth Token

```typescript
const fetchUser = useQueryAsync();

// Legacy way (string)
await fetchUser('getUser', { userId: '123' }, customToken);

// New way (options object)
await fetchUser('getUser', { userId: '123' }, {
  authToken: customToken
});
```

### With Abort Signal

```typescript
function SearchComponent() {
  const fetchSearch = useQueryAsync();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (query: string) => {
    // Cancel previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller
    abortControllerRef.current = new AbortController();

    const result = await fetchSearch('searchUsers', 
      { query }, 
      { signal: abortControllerRef.current.signal }
    );

    if ('error' in result && result.error === 'Request cancelled') {
      console.log('Search cancelled');
    } else if ('data' in result) {
      console.log('Results:', result.data);
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return <SearchInput onSearch={handleSearch} />;
}
```

---

## useMutation - Data Mutations

### Basic Usage

```typescript
import { useMutation } from '@scripturecoder/rn-alpha';

function CreateUserForm() {
  const [createUser, { loading, error, data }] = useMutation('createUser');

  const handleSubmit = async (formData) => {
    const result = await createUser(formData);
    
    if ('error' in result) {
      Alert.alert('Error', result.error);
    } else {
      Alert.alert('Success', 'User created!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Spinner />}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}
```

### Options

```typescript
// Prevent keyboard dismiss
const [updateUser, { loading }] = useMutation('updateUser', {
  keyboard: false
});

// Get text response instead of JSON
const [downloadFile, { data }] = useMutation('downloadFile', {
  text: true
});
```

### Cancelling Mutations

```typescript
function UploadComponent() {
  const [uploadFile, { loading, cancel }] = useMutation('uploadFile');

  const handleUpload = async (file) => {
    const result = await uploadFile({ file });
    
    if ('error' in result && result.error === 'Request cancelled') {
      console.log('Upload cancelled');
    }
  };

  return (
    <View>
      <Button onPress={() => handleUpload(file)}>Upload</Button>
      {loading && (
        <Button onPress={cancel}>Cancel Upload</Button>
      )}
    </View>
  );
}
```

---

## useMutationAsync - Async Mutations

### Basic Usage

```typescript
import { useMutationAsync } from '@scripturecoder/rn-alpha';

function LoginForm() {
  const [login, { loading, error }] = useMutationAsync('POST:/auth/login');

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    
    if ('data' in result) {
      // Success
      navigation.navigate('Home');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {loading && <Spinner />}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}
```

### With Cancellation

```typescript
function UpdateProfile() {
  const [updateProfile, { loading, cancel }] = useMutationAsync(
    'PUT:/users/:userId'
  );

  const handleUpdate = async (userId, data) => {
    const result = await updateProfile({ userId, ...data });
    
    if ('error' in result) {
      if (result.error !== 'Request cancelled') {
        Alert.alert('Error', result.error);
      }
    }
  };

  return (
    <View>
      <Form onSubmit={handleUpdate} />
      {loading && <Button onPress={cancel}>Cancel</Button>}
    </View>
  );
}
```

---

## Content-Type Examples

### JSON (Default)

Most modern APIs use JSON:

```typescript
// Query with JSON response
const { data } = useQuery('getUsers');

// Mutation with JSON body
const [createUser] = useMutation('createUser');
await createUser({ name: 'John', email: 'john@example.com' });
```

### URL-Encoded Form Data

For legacy APIs or form submissions:

```typescript
// The http service automatically handles this based on your API setup
// If you need to explicitly use urlencoded, configure your http service

const [login] = useMutation('login');
await login({ 
  username: 'john', 
  password: 'secret123' 
});

// The service.ts will handle content-type based on your configuration
```

### Multipart Form Data

For file uploads:

```typescript
const [uploadAvatar] = useMutation('uploadAvatar');

const handleUpload = async (imageUri) => {
  const formData = {
    avatar: {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg'
    },
    userId: '123'
  };

  const result = await uploadAvatar(formData);
};
```

---

## Request Cancellation

### Pattern 1: Auto-Cancel on Search

```typescript
function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, loading, abort } = useQuery('search', {
    variables: { query },
    networkPolicy: 'network-only'
  });

  // Automatically cancels previous request when query changes
  useEffect(() => {
    return () => abort();
  }, [query]);

  return (
    <View>
      <SearchInput value={query} onChangeText={setQuery} />
      {loading && <Spinner />}
      <Results data={data} />
    </View>
  );
}
```

### Pattern 2: Manual Cancellation

```typescript
function FileDownload({ fileId }) {
  const [download, { loading, cancel }] = useMutation('downloadFile');
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    const result = await download({ fileId });
    // Handle result
  };

  return (
    <View>
      <Button onPress={handleDownload}>Download</Button>
      {loading && (
        <>
          <ProgressBar value={progress} />
          <Button onPress={cancel}>Cancel</Button>
        </>
      )}
    </View>
  );
}
```

### Pattern 3: Race Condition Prevention

```typescript
function UserProfile({ userId }) {
  const { data, loading } = useQuery('getUser', {
    variables: { userId },
    networkPolicy: 'network-only'
  });

  // When userId changes rapidly, old requests are automatically cancelled
  // Only the latest request's data will be shown
  
  return <Profile user={data} loading={loading} />;
}
```

### Pattern 4: Timeout with Cancellation

```typescript
import { createTimeoutController } from '@scripturecoder/rn-alpha';

function SlowApiCall() {
  const fetchData = useQueryAsync();

  const handleFetch = async () => {
    const { controller, cleanup } = createTimeoutController(5000);

    try {
      const result = await fetchData('slowEndpoint', {}, {
        signal: controller.signal
      });

      if ('data' in result) {
        console.log('Success:', result.data);
      }
    } finally {
      cleanup();
    }
  };

  return <Button onPress={handleFetch}>Fetch (5s timeout)</Button>;
}
```

---

## Advanced Patterns

### Optimistic Updates

```typescript
function TodoList() {
  const { data, updateItem, refetch } = useQuery('getTodos');
  const [toggleTodo] = useMutation('toggleTodo');

  const handleToggle = async (todoId) => {
    // Optimistically update UI
    const todo = data.find(t => t.id === todoId);
    updateItem(todoId, { ...todo, completed: !todo.completed });

    // Make request
    const result = await toggleTodo({ todoId });

    // Revert on error
    if ('error' in result) {
      refetch();
    }
  };

  return <TodoItems todos={data} onToggle={handleToggle} />;
}
```

### Dependent Queries

```typescript
function UserPosts({ userId }) {
  const { data: user } = useQuery('getUser', {
    variables: { userId }
  });

  const { data: posts } = useQuery('getUserPosts', {
    variables: { userId },
    networkPolicy: user ? 'network-only' : 'cache-only'
  });

  return <PostList posts={posts} author={user} />;
}
```

### Polling

```typescript
function LiveData() {
  const { data, refetch } = useQuery('getLiveStats');

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  return <Stats data={data} />;
}
```

### Retry Logic

```typescript
import { shouldRetry } from '@scripturecoder/rn-alpha';

function RobustFetch() {
  const fetchData = useQueryAsync();
  const [retries, setRetries] = useState(0);
  const maxRetries = 3;

  const handleFetch = async () => {
    const result = await fetchData('unreliableEndpoint', {});

    if ('error' in result && shouldRetry(result) && retries < maxRetries) {
      setRetries(r => r + 1);
      setTimeout(handleFetch, 1000 * Math.pow(2, retries)); // Exponential backoff
    }
  };

  return <Button onPress={handleFetch}>Fetch (with retry)</Button>;
}
```

### Combining Multiple Signals

```typescript
import { combineAbortSignals } from '@scripturecoder/rn-alpha';

function ComplexFetch() {
  const fetchData = useQueryAsync();
  const userController = useRef(new AbortController());
  const timeoutController = useRef(new AbortController());

  useEffect(() => {
    // Timeout after 10 seconds
    setTimeout(() => timeoutController.current.abort(), 10000);

    return () => {
      userController.current.abort();
      timeoutController.current.abort();
    };
  }, []);

  const handleFetch = async () => {
    const combined = combineAbortSignals([
      userController.current.signal,
      timeoutController.current.signal
    ]);

    const result = await fetchData('endpoint', {}, {
      signal: combined.signal
    });
  };

  return (
    <View>
      <Button onPress={handleFetch}>Fetch</Button>
      <Button onPress={() => userController.current.abort()}>
        Cancel
      </Button>
    </View>
  );
}
```

---

## Best Practices

1. **Always handle cancellation**: Check for cancellation errors to avoid showing error messages for intentional cancellations.

2. **Cleanup on unmount**: Use `useEffect` cleanup to abort requests when components unmount.

3. **Use appropriate network policies**: Choose the right policy for your use case to optimize performance.

4. **Handle errors gracefully**: Always check if the result contains an error before accessing data.

5. **Leverage cache operations**: Use cache manipulation functions for optimistic updates and instant UI feedback.

6. **Cancel in-flight requests**: When making rapid requests (like search), cancel previous requests to avoid race conditions.

7. **Use TypeScript**: Take advantage of type safety by providing types to hooks:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const { data } = useQuery<User>('getUser', { variables: { id: '123' } });
const [createUser] = useMutation<User>('createUser');
```

---

## Migration from Old API

If you're migrating from the old HTTP service:

### Before (Legacy)
```typescript
const res = await http(path, 'POST', data, true, token, false);
```

### After (New)
```typescript
const res = await http(path, 'POST', data, {
  returnStatus: true,
  auth: token,
  returnText: false,
  signal: abortController.signal
});
```

The new API is backward compatible, but using the new options object format is recommended for better clarity and access to new features like request cancellation.

