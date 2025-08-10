<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up</title>
  <style>
    body {
      font-family: "Papyrus", "Lucida Handwriting", fantasy;
      background-color: #f3f4f6;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .signup-container {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      width: 300px;
      text-align: center;
    }

    .signup-container h1 {
      margin-bottom: 1rem;
      color: #2563eb;
    }

    .signup-container input {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .signup-container button {
      width: 100%;
      padding: 0.5rem;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }

    .signup-container button:hover {
      background-color: #1e4db7;
    }
  </style>
</head>
<body>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form>
      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Create Account</button>
    </form>
  </div>
</body>
</html>

