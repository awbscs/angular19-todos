const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// Basic CORS support for custom endpoints
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Custom middleware for authentication
server.use((req, res, next) => {
  // Handle login endpoint
  if (req.method === 'POST' && req.path === '/auth/login') {
    console.log('Login endpoint hit', req.body);
    const { username, password } = req.body;
    const db = router.db;
    const users = db.get('users').value();
    console.log('Users', users);
    const user = users.find(u => u.username === username && u.password === password);
    console.log('User', user);
    if (user) {
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      const { password: _, ...userWithoutPassword } = user;
      return res.json({
        token,
        user: userWithoutPassword
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
  }

  // Handle todos by user
  if (req.method === 'GET' && req.path.startsWith('/todos/user/')) {
    const userId = parseInt(req.path.split('/').pop());
    const db = router.db;
    const todos = db.get('todos').value();
    const userTodos = todos.filter(t => t.userId === userId);
    return res.json({ todos: userTodos });
  }

  next();
});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

